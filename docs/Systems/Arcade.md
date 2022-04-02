# Arcade

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    EJS_core = 'arcade';

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

## ROMS

Only use **FBA ROMs** of version`0.2.97.42`

### ROM List

The following **ROMs** must use the listed name.

| Name | MD5 Checksum | Description |
|------|--------------|-------------|
| `neogeo.zip` | `410c65b2debdf4f2dac9ea2b23aa496e` | Required for **Neo Geo Games**
| `pgm.zip` | `653e991a39e867354d090c3394157d1c` | Required for **IGS Games**
| `isgsm.zip` | `4a56d56e2219c5e2b006b66a4263c01c` | **ISG Selection Master Type 2006 BIOS**

