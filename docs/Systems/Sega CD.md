# Sega CD

I do not know the file extension limits for this system.

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    EJS_core = 'segaCD';

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

You can search for the BIOS you need by utilizing the **MD5** checksum.

| Type | MD5 Checksum |
|------|--------------|
| MegaCD EU | `e66fa1dc5820d254611fdcdba0662372`
| SegaCD US | `854b9150240a198070150e4566ae1290`
| MegaCD EU | `278a9397d192149e84e820ac621a8edd`

<!-- Are those names correct / intended? -->
