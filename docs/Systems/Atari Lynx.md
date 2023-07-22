# Atari Lynx

I do not know the file extension limits for this system. <br>
There is no bios for this system.

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be handy
    EJS_core = 'lynx';
    
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
| lynxboot.img | Lynx Boot Image - Required | `fcd403db69f54290b51035d82f835e7b`

### CORES

The *lynx* system supports 1 core
- `handy`

If set to `lynx`, emulator will use the `handy` core.
