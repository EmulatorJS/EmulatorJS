# Virtual Boy

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be beetle_vb
    EJS_core = 'vb';
    
    // URL to Game rom
    EJS_gameUrl = '';
    
    // Path to the data directory
    EJS_pathtodata = 'data/';
</script>
<script src='data/loader.js'></script>
```

## ROM Type

Your **ROM** can have the following extensions:
- `vb`
- `vboy`
- `bin`

### CORES

The *vb* system supports 1 core
- `beetle_vb`

If set to `vb`, emulator will use the `beetle_vb` core.

