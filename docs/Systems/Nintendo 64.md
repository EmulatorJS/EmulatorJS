# Nintendo 64

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be mupen64plus_next
    EJS_core = 'n64';
    
    // URL to Game rom
    EJS_gameUrl = '';
    
    // Path to the data directory
    EJS_pathtodata = 'data/';
</script>
<script src='data/loader.js'></script>
```

### CORES

The *n64* system supports 1 core
- `mupen64plus_next`

If set to `n64`, emulator will use the `mupen64plus_next` core.
