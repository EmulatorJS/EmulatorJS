# NES / Famicom

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be fceumm or nestopia
    EJS_core = 'nes';
    
    EJS_lightgun = false; // Lightgun
    
    // URL to BIOS file
    EJS_biosUrl = '';
    
    // URL to Game rom
    EJS_gameUrl = '';
    
    // Path to the data directory
    EJS_pathtodata = 'data/';
</script>
<script src='data/loader.js'></script>
```

### BIOS

|  File Name  |  Description  |    md5sum   |
| ----------- | ------------- | ----------- |
| disksys.rom | Family Computer Disk System BIOS -<br> Required for Famicom Disk System emulation  | `ca30b50f880eb660a320674ed365ef7a` |
| gamegenie.nes | Game Genie add-on cartridge -<br> Required for Game Genei Add-on emulation<br> (Only supported on the fceumm core) | `7f98d77d7a094ad7d069b74bd553ec98` |

### CORES

The *nes* system supports 2 cores
- `fceumm`
- `nestopia`

If set to `nes`, emulator will use the `fceumm` core.
