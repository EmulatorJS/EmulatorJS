# Contribute

There are several ways to contribute, be it directly to helping develop features for EmulatorJS, update the documentation, media assets or heading over to libretro and helping them develop the emulator cores that make the magic happen.

- EmulatorJS, take a look through the [issues](https://github.com/EmulatorJS/EmulatorJS/issues) on github and try to help out.

- Documentation [github page](https://github.com/EmulatorJS/emulatorjs.org).

Just wanna donate? That'd help too!

Donate to: [EmulatorJS](https://www.patreon.com/EmulatorJS)

Donate to: [libretro](https://retroarch.com/index.php?page=donate)

## Project Scripts

The project has several scripts that can be used to help with updating and deploying the project.

### Build Script

Runs the build script, which will compresses the project in 7z and zip output in dist/ folder. Note: Make sure you have the compiled cores in the `data/cores` folder before running this script.

```bash
npm run build
```

### Update Script

Runs the update script, which updates dependencies and can change version number of project. It also will update the list of contributors.

```bash
npm run update # Just updates contributors list
npm run update -- --ejs_v=4.3.1 # Updates contributors list and sets version to 4.3.1
npm run update -- --deps=true # Updates contributors list and updates dependencies
npm run update -- --dev=true # Updates contributors list and enables dev mode
npm run update -- --dev=false # Updates contributors list and disables dev mode
```

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
