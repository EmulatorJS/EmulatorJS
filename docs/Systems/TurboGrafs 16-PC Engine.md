# TurboGrafs-16 | PC Engine

I do not know the file extension limits for this system.

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    EJS_core = 'pce';

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

syscard3.pce	Super CD-ROM2 System V3.xx - Required	`38179df8f4ac870017db21ebcbf53114`
