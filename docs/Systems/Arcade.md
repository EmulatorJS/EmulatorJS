# Arcade

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be fbneo, fbalpha2012_cps1, or fbalpha2012_cps2
    EJS_core = 'arcade';
    
    // URL to Game rom
    EJS_gameUrl = '';
    
    // Path to the data directory
    EJS_pathtodata = 'data/';
</script>
<script src='data/loader.js'></script>
```

### CORES

The *arcade* system supports 3 cores
- `fbneo`
- `fbalpha2012_cps1`
- `fbalpha2012_cps2`

If set to `arcade`, emulator will use the `fbneo` core.

