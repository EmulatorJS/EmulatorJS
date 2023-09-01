# Sega 32X

I do not know the file extension limits for this system. <br>
There is no bios for this system.

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    EJS_core = 'sega32x';
    
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



