# Atari 5200

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be a5200
    EJS_core = 'atari5200';
    
    // URL to Game rom
    EJS_gameUrl = '';
    
    // Path to the data directory
    EJS_pathtodata = 'data/';
</script>
<script src='data/loader.js'></script>
```

### CORES

The *atari5200* system supports 1 core
- `a5200`

If set to `atari5200`, emulator will use the `a5200` core.

