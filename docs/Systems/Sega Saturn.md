# Sega Saturn

I do not know the file extension limits for this system.

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    EJS_core = 'segaSaturn';

    // URL to Bios file

    EJS_biosUrl = '';
    
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

## BIOS

|  File Name  |    md5sum   |
| ----------- | ----------- |
| saturn_bios.bin  | af5828fdff51384f99b3c4926be27762 |
| mpr-17933.bin | 3240872c70984b6cbfda1586cab68dbe |
| sega_101.bin | 85ec9ca47d8f6807718151cbcca8b964 |

