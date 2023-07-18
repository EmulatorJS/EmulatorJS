# Nintendo DS

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be desmume2015 or melonds
    EJS_core = 'nds';
    
    // URL to BIOS file
    EJS_biosUrl = '';
    
    // URL to Game rom
    EJS_gameUrl = '';
    
    // Path to the data directory
    EJS_pathtodata = 'data/';
</script>
<script src='data/loader.js'></script>
```

## ROM Type

Your **ROM** can have the following extensions:
- `nds`
- `bin` (desmume2015 core only)

### BIOS (melonds core only)

|  File Name  |  Description  |    md5sum   |
| ----------- | ------------- | ----------- |
| bios7.bin | NDS ARM7 BIOS - Required | df692a80a5b1bc90728bc3dfc76cd948 |
| bios9.bin | NDS ARM9 BIOS - Required | a392174eb3e572fed6447e956bde4b25 |
| firmware.bin | NDS Firmware - Required | 145eaef5bd3037cbc247c213bb3da1b3 |
| dsi_bios7.bin | DSi ARM7 BIOS - Optional |  |
| dsi_bios9.bin | DSi ARM9 BIOS - Optional |  |
| dsi_firmware.bin | DSi Firmware - Optional |  |
| dsi_nand.bin | DSi NAND - Optional |  |
| dsi_sd_card.bin | DSi SD Card - Optional |  |

### CORES

The *nds* system supports 2 cores
- `melonds`
- `desmume2015`

If set to `nds`, emulator will use the `melonds` core.

