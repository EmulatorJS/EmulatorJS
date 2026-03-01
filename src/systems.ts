/**
 * systems.ts — Supported emulation systems and file-extension mapping
 *
 * EmulatorJS supports many systems via RetroArch cores. Each system
 * definition here maps to an EmulatorJS core identifier plus metadata
 * used throughout the UI (badges, colours, performance settings).
 */

// ── System definition ─────────────────────────────────────────────────────────

export interface SystemInfo {
  /** EmulatorJS core/system name (value of EJS_core). */
  id: string;
  /** Full human-readable name. */
  name: string;
  /** Short label for library badges. */
  shortName: string;
  /** Accepted file extensions, lowercase without the leading dot. */
  extensions: string[];
  /** Badge background colour. */
  color: string;
  /** Whether PPSSPP (or another threads-dependent core) is used. */
  needsThreads: boolean;
  /** Whether the core requires a WebGL 2 context. */
  needsWebGL2: boolean;
  /**
   * EJS_Settings overrides applied in "performance" (low-spec) mode.
   * Keys are RetroArch core-option names; values are strings.
   */
  perfSettings: Record<string, string>;
  /**
   * EJS_Settings overrides applied in normal "quality" mode.
   */
  qualitySettings: Record<string, string>;
}

// ── Supported systems ─────────────────────────────────────────────────────────

export const SYSTEMS: SystemInfo[] = [
  {
    id: "psp",
    name: "PlayStation Portable",
    shortName: "PSP",
    extensions: ["iso", "cso", "elf"],
    color: "#0070cc",
    needsThreads: true,
    needsWebGL2: true,
    qualitySettings: {
      ppsspp_internal_resolution: "2",   // 2× (960×544)
      ppsspp_auto_frameskip: "disabled",
      ppsspp_frameskip: "0",
      ppsspp_fast_memory: "enabled",
    },
    perfSettings: {
      ppsspp_internal_resolution: "1",   // 1× native (480×272)
      ppsspp_auto_frameskip: "enabled",
      ppsspp_frameskip: "1",
      ppsspp_fast_memory: "enabled",
      ppsspp_block_transfer_gpu: "enabled",
    },
  },
  {
    id: "nes",
    name: "Nintendo Entertainment System",
    shortName: "NES",
    extensions: ["nes", "fds", "unf", "unif"],
    color: "#e52b2b",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
  {
    id: "snes",
    name: "Super Nintendo",
    shortName: "SNES",
    extensions: ["snes", "smc", "sfc", "fig", "bs"],
    color: "#7b3fae",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
  {
    id: "gba",
    name: "Game Boy Advance",
    shortName: "GBA",
    extensions: ["gba"],
    color: "#7c4dff",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {
      mgba_skip_bios: "ON",
    },
    perfSettings: {
      mgba_skip_bios: "ON",
    },
  },
  {
    id: "gbc",
    name: "Game Boy Color",
    shortName: "GBC",
    extensions: ["gbc"],
    color: "#e87d2a",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
  {
    id: "gb",
    name: "Game Boy",
    shortName: "GB",
    extensions: ["gb"],
    color: "#7a9e27",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
  {
    id: "n64",
    name: "Nintendo 64",
    shortName: "N64",
    extensions: ["n64", "v64", "z64"],
    color: "#1a7a1a",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {
      "mupen64plus-rdp-plugin": "gliden64",
      "mupen64plus-resolution-factor": "1",
    },
  },
  {
    id: "psx",
    name: "PlayStation 1",
    shortName: "PS1",
    extensions: ["pbp", "chd", "cue", "img", "mdf", "ccd"],
    color: "#003087",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
  {
    id: "segaMD",
    name: "Sega Genesis / Mega Drive",
    shortName: "Genesis",
    extensions: ["md", "smd", "gen"],
    color: "#1a1ae6",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
  {
    id: "segaGG",
    name: "Game Gear",
    shortName: "GG",
    extensions: ["gg"],
    color: "#e64a1a",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
  {
    id: "segaMS",
    name: "Sega Master System",
    shortName: "SMS",
    extensions: ["sms"],
    color: "#2255cc",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
  {
    id: "atari2600",
    name: "Atari 2600",
    shortName: "2600",
    extensions: ["a26"],
    color: "#c0392b",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
  {
    id: "arcade",
    name: "Arcade (MAME)",
    shortName: "Arcade",
    extensions: ["zip"],
    color: "#e67e22",
    needsThreads: false,
    needsWebGL2: false,
    qualitySettings: {},
    perfSettings: {},
  },
];

// ── Extension lookup tables ───────────────────────────────────────────────────

/** Extension → single unambiguous system. */
const UNIQUE_EXT: Map<string, SystemInfo> = new Map();
/** Extension → multiple candidate systems (ambiguous). */
const AMBIGUOUS_EXT: Map<string, SystemInfo[]> = new Map();

(function buildMaps() {
  const extToSystems = new Map<string, SystemInfo[]>();
  for (const sys of SYSTEMS) {
    for (const ext of sys.extensions) {
      if (!extToSystems.has(ext)) extToSystems.set(ext, []);
      extToSystems.get(ext)!.push(sys);
    }
  }
  for (const [ext, systems] of extToSystems) {
    if (systems.length === 1) UNIQUE_EXT.set(ext, systems[0]);
    else                      AMBIGUOUS_EXT.set(ext, systems);
  }
})();

/** All accepted extensions, for use in <input accept>. */
export const ALL_EXTENSIONS: string[] = [
  ...new Set(SYSTEMS.flatMap(s => s.extensions)),
];

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Detect the system(s) compatible with the given filename.
 *
 * - Returns a single SystemInfo when the extension is unambiguous.
 * - Returns an array of candidates when multiple systems share the extension.
 * - Returns null when the extension is unknown.
 */
export function detectSystem(
  fileName: string
): SystemInfo | SystemInfo[] | null {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  if (UNIQUE_EXT.has(ext))    return UNIQUE_EXT.get(ext)!;
  if (AMBIGUOUS_EXT.has(ext)) return AMBIGUOUS_EXT.get(ext)!;
  return null;
}

/** Look up a system by its EJS core identifier. */
export function getSystemById(id: string): SystemInfo | undefined {
  return SYSTEMS.find(s => s.id === id);
}
