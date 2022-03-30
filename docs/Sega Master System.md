# Sega Master System

I do not know the file extension limits for this system.

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    EJS_core = 'segaMS';

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

(bootrom) - Optional

| Name | MD5 Checksum | Description |
|------|--------------|-------------|
| `bios_E.sms` | `840481177270d5642a14ca71ee72844c` | MasterSystem EU BIOS
| `bios_U.sms` | `840481177270d5642a14ca71ee72844c` | MasterSystem US BIOS
| `bios_J.sms` | `24a519c53f67b00640d0048ef7089105` | MasterSystem JP BIOS

<!-- EU & US have the same checksum? -->