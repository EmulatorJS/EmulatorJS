# NES / Famicom

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    EJS_core = 'nes';
    
    // Lightgun
    
    EJS_lightgun = false;

    // URL to Famicom Disk System bios

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

## ROM Type

Your **ROM** can have the following types:
- `fds`
- `nes`
- `unif`
- `unf`

### BIOS

You can find the **Famicon BIOS** by looking up the **MD5** checksum: <br>
`ca30b50f880eb660a320674ed365ef7a`
