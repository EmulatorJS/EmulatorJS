# Contribute

There are several ways to contribute, be it directly to helping develop features for EmulatorJS, update the documentation, media assets or heading over to libretro and helping them develop the emulator cores that make the magic happen.

- EmulatorJS, take a look through the [issues](https://github.com/EmulatorJS/EmulatorJS/issues) on github and try to help out.

- Documentation [github page](https://github.com/EmulatorJS/emulatorjs.org).

Just wanna donate? That'd help too!

Donate to: [EmulatorJS](https://www.patreon.com/EmulatorJS)

Donate to: [libretro](https://retroarch.com/index.php?page=donate)

## Attention Visual Studio Code Users

By default Visual Studio Code will apply formatting that is not consistent with the standard formatting used by this project.

Please disable the formatter *before* submitting a Pull Request.

The formatter can be disabled for this repo only (without affecting your own preferences) by creating a new file called `.vscode/settings.json` (if it doesn't already exist).

Add the following options to the settings.json file to disable the formatter while working on this repo:
```json
{
    "diffEditor.ignoreTrimWhitespace": false,
    "editor.formatOnPaste": false,
    "editor.formatOnSave": false,
    "editor.formatOnSaveMode": "modifications"
}
```
