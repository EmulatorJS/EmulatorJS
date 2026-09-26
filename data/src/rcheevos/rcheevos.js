/**
 * rcheevos JavaScript evaluator bridge
 * Implements RetroAchievements memory evaluation and Rich Presence evaluation
 */

export function parseMemAddr(memStr) {
    if (!memStr) return null;
    let type = 'byte';
    let size = 1;
    let isHex = true;
    let cleanStr = memStr.trim().toLowerCase();

    if (cleanStr.startsWith('0x')) {
        cleanStr = cleanStr.substring(2);
    }

    if (cleanStr.startsWith('h')) {
        // High 4 bits
        type = 'high_nibble';
        cleanStr = cleanStr.substring(1);
    } else if (cleanStr.startsWith('l')) {
        // Low 4 bits
        type = 'low_nibble';
        cleanStr = cleanStr.substring(1);
    } else if (cleanStr.startsWith('b')) {
        // Bit 0-7
        type = 'bit';
        cleanStr = cleanStr.substring(1);
    } else if (cleanStr.startsWith('w')) {
        type = 'word';
        size = 2;
        cleanStr = cleanStr.substring(1);
    } else if (cleanStr.startsWith('g')) {
        type = 'dword';
        size = 4;
        cleanStr = cleanStr.substring(1);
    }

    const addr = parseInt(cleanStr, 16);
    return isNaN(addr) ? null : { addr, type, size };
}

export function evaluateOperand(opStr, peek, deltaMap = {}) {
    if (!opStr) return 0;
    const str = opStr.trim();
    if (!isNaN(str)) return Number(str);
    if (str.startsWith('0x')) return parseInt(str, 16);

    const isDelta = str.startsWith('d') || str.startsWith('d0x');
    const cleanOp = isDelta ? (str.startsWith('d0x') ? str.substring(1) : str.substring(1)) : str;

    const parsed = parseMemAddr(cleanOp);
    if (!parsed) return 0;

    if (isDelta && deltaMap[parsed.addr] !== undefined) {
        return deltaMap[parsed.addr];
    }

    const val = peek(parsed.addr, parsed.size);
    if (parsed.type === 'high_nibble') return (val >> 4) & 0x0f;
    if (parsed.type === 'low_nibble') return val & 0x0f;
    return val;
}

export function rc_evaluate_richpresence(script, peek) {
    if (!script) return 'Playing game';

    const lines = script.split('\n');
    let displayFormat = '';
    const lookupTables = {};
    let currentTable = null;

    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith('?')) {
            // Conditional display line or comment
            if (line.startsWith('?')) {
                const parts = line.substring(1).split('?');
                if (parts.length >= 2) {
                    const formatCandidate = parts.slice(1).join('?').trim();
                    if (!displayFormat) displayFormat = formatCandidate;
                }
            }
            continue;
        }

        if (line.startsWith('Display:')) {
            displayFormat = line.substring(8).trim();
        } else if (line.startsWith('Lookup:')) {
            currentTable = line.substring(7).trim();
            lookupTables[currentTable] = {};
        } else if (currentTable && line.includes('=')) {
            const [k, v] = line.split('=').map(s => s.trim());
            lookupTables[currentTable][k] = v;
        }
    }

    if (!displayFormat) return 'Playing game';

    // Substitute expressions inside format
    return displayFormat.replace(/@([A-Za-z0-9_]+)\(([^)]+)\)/g, (match, tableName, expr) => {
        const val = evaluateOperand(expr, peek);
        const table = lookupTables[tableName];
        if (table && table[val] !== undefined) {
            return table[val];
        }
        if (table && table['*'] !== undefined) {
            return table['*'];
        }
        return val;
    }).replace(/@([A-Za-z0-9_]+)/g, (match, expr) => {
        return evaluateOperand(expr, peek);
    });
}
