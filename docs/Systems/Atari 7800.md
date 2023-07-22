# Atari 7800

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be prosystem
    EJS_core = 'atari7800';
    
    // URL to Game rom
     
    EJS_gameUrl = '';
    
    /*
     *  Path to the WASM / JS files
     *  HAS TO BE in the same directory.
     */
    
    EJS_pathtodata = 'data/';
    
</script>

<script src='data/loader.js'></script>
```

### BIOS

|  File Name  |  Description  |    md5sum   |
| ----------- | ------------- | ----------- |
| 7800 BIOS (U).rom | 7800 BIOS - Optional | `0763f1ffb006ddbe32e52d497ee848ae`

### CORES

The *atari7800* system supports 1 core
- `prosystem`

If set to `atari7800`, emulator will use the `prosystem` core.
