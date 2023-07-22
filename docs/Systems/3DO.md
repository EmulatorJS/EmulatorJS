# 3DO

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be opera
    EJS_core = '3do';
    
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
| panafz1.bin | Panasonic FZ-1 | `f47264dd47fe30f73ab3c010015c155b`
| panafz10.bin | Panasonic FZ-10 | `51f2f43ae2f3508a14d9f56597e2d3ce`
| panafz10-norsa.bin | Panasonic FZ-10 [RSA Patch] | `1477bda80dc33731a65468c1f5bcbee9`
| panafz10e-anvil.bin | Panasonic FZ-10-E [Anvil] | `a48e6746bd7edec0f40cff078f0bb19f`
| panafz10e-anvil-norsa.bin | Panasonic FZ-10-E [Anvil RSA Patch] | `cf11bbb5a16d7af9875cca9de9a15e09`
| panafz1j.bin | Panasonic FZ-1J | `a496cfdded3da562759be3561317b605`
| panafz1j-norsa.bin | Panasonic FZ-1J [RSA Patch] | `f6c71de7470d16abe4f71b1444883dc8`
| goldstar.bin | Goldstar GDO-101M | `8639fd5e549bd6238cfee79e3e749114`
| sanyotry.bin | Sanyo IMP-21J TRY | `35fa1a1ebaaeea286dc5cd15487c13ea`
| 3do_arcade_saot.bin | Shootout At Old Tucson | `8970fc987ab89a7f64da9f8a8c4333ff`

### CORES

The *3do* system supports 1 core
- `opera`

If set to `3do`, emulator will use the `opera` core.
