# Changes

# 4.0.8
- Fixed typo in virtual gamepad dpad.
- Added updated desmume core.
- Fixed key mapping (Thanks to [@allancoding](https://github.com/allancoding))
- Fixed adblock message (Thanks to [@allancoding](https://github.com/allancoding))
- Added `EJS_startButtonName` option.
- Re-Added ability to drag and drop save states.
- Fixed cheats menu.
- Added popup message for Safari mobile users if game is not running.
- Added `EJS_softLoad` option.
- Added amiga core.
- Added c64 core.

# 4.0.7 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/f579eb4c080f612723fd6a119b02173cafb37503)
- Added rewind (Thanks to [@n-at](https://github.com/n-at))
- Added slowdown (Thanks to [@n-at](https://github.com/n-at))
- Fixed "zone" object in front of settings menu.
- Fixed virtual gamepad alignment.
- Add `EJS_fullscreenOnLoaded` option.
- Add virtual gamepad toggle to the control menu (for touchscreen devices)
- Fix gamepad ID showing as "undefined".
- Added threaded cores.
- Added joystick translations (Thanks to [@allancoding](https://github.com/allancoding))
- Fixed fullscreen button tooltip (Thanks to [@allancoding](https://github.com/allancoding))
- Added TurboGrafx-16, SuperGrafx, PC Engine, neo geo pocket, WonderSwan, PC-FX, and ColecoVision support. (Thanks to [@n-at](https://github.com/n-at))
- Fixed cue file loading (Thanks to [@n-at](https://github.com/n-at))
- Fixed ability to hide volume slider (Thanks to [@n-at](https://github.com/n-at))
- Added new mame2003_plus core (now default mame2003 core)
- Use keycodes instead of labels (Thanks to [@allancoding](https://github.com/allancoding))

# 4.0.6 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/5e338e7a888480cea331f6d4656bc8986a7d6b28)
- Fixed n64 on iOS safari
- virtual gamepads for atari2600, atari7800, lynx, jaguar, vb, 3do (Thanks to [@n-at](https://github.com/n-at))
- control buttons for gba, vb, 3do, atari2600, atari7800, lynx, jaguar (Thanks to [@n-at](https://github.com/n-at))
- Added `EJS_controlScheme` (Thanks to [@n-at](https://github.com/n-at))
- Added Fast Forward

# 4.0.5 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/5307e6294ed9df5daabd6958b2b307bae01f59f1)
- Added `pcsx_rearmed` core
- Made `pcsx_rearmed` core the default `psx` core (better compatibility)
- Added `fbneo` core
- Made `fbneo` core the default `arcade` core (better compatibility)
- Added picodrive core (sega32x)
- Cleaned up documentation
- Fixed/updated rar de-compression
- Added segaMD, segaCD, sega32x button labels and virtual gamepad (Thanks to [@n-at](https://github.com/n-at))
- Added ability to use threads (pre compiled cores not yet available)
- Fixed reversed gamepad button events (down was up, up was down)
- Fixed Gamepad axis release not triggering
- Add ***highly beta*** psp core - see readme

# 4.0.4 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/41491a738cf92ef9cee7d53f323aa2ab9732c053)
- Fix cheats "x" button
- Optimize memory usage
- Added ability to set urls to blob/arraybuffer/uint8array if needed

# 4.0.3 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/5219ab51227bc0fb60cbc7b60e476b0145c932c9)
- Remove RetroArch messages
- Center video at top

# 4.0.2 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/06fe386e780bb55ef6baa4fbc6addd486bee747a)
- Add link to RetroArch License on about page
- Fix gamepad support for legacy browsers

# 4.0.1 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/efbb9dd462ee0e4f2120a6947af312e02fcf657c)
Complete application re-write. Everything changed. Although some changes to note are:
- Optimization for smaller screens.
- No more dead code.
- Fix Gamepad for firefox.
- Store srm in browser.
- Ability to import/export srm files.
- No more old cores

And much much more was changed...

# 3.1.5 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/f7fa5d41487a424233b40e903020455606d68fee)
- Fixed iOS bug for iPads
- Added netplay! (only working on old cores)

# 3.1.0 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/614f5cb55e2768199ba05b756b47d0ab7ab283fd)
- Added ability to drag and drop save states.
- Fixed some "update" and "cancel" and "close" button confustion
- Removed save state retroarch messages
- Beta netplay cleanup (not yet working)
- (Theoretically) fixed a bug that did not allow iOS devices to work

# 3.0.5 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/44c31371fb3c314cd8dea36ccbaad89fb3ab98e6)
- Fixed screen recording on devices that do not support getUserMedia api.
- Added C label buttons to nintendo 64 virtual gamepad.
- Fixed EJS_color bug.
- Savestates are pulled from the core itself, to always be correct.
- Several new cores. (a5200, beetle_vb, desmume2015, fbalpha2012_cps1, fbalpha2012_cps2, fceumm, gambatte, mame2003, mednafen_psx, mednafen_psx_hw, melonds, mgba, mupen64plus_next, nestopia, snes9x)
- D-pad for virtual gamepad.
- Updated translation files to include new menu options.
- Ability to add more than one zone object to virtual gamepads.
- Added ability to set custom menu options.
- Virtual gamepad left handed mode.
- Fixed Screen record svg.
- Updated svg icons.
- Cache "clear all" button.
- Cache button moved to menu bar.
- Added feature that will display the current downloaded size when the content length is not available.

# 2.3.9 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/088942083e44510f07133f2074a2d63a8af477cd)
- Fixed incorrect variable referencing when update bios download data callback.
- Fixed rom storage size limits.
- Fixed download percent not showing with some files.

# 2.3.8 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/5f176b963e4b2055983b82396378d1e3837a69c4)
- Remove broken shader.
- Add download percent message.
- Fixed UI "saving state" message not going away.

# 2.3.7 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/8b9607becfe0aaad42b8b8486c7d379821b72125)
- Add more shaders.
- Add bold fontsize option to custom virtual gamepad settings.
- No longer set "normalOptions" from localization file.

# 2.3.6 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/b2919bc2c3d2d4c9fe3ab4f4486790a376b7acfe)
- Remove default control mappings for gamepads.
- Upgraded invalid character regex to catch more characters.

# 2.3.5 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/a5a9916aba041e75ee73815376ed4fd2e22701bd)
- Use regex to detect and replace invalid characters in filename/gamename settings.

# 2.3.4 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/45d982b6362cfd29cb2eda9721066e03893ba0d8)
- Add new arcade core.
- Fix patch file game id set bug.

# 2.3.4 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/45d982b6362cfd29cb2eda9721066e03893ba0d8)
- Add new arcade core.

# 2.3.3 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/11bddd5a4277aa04f80b941f05cc024b3de58bfc)
- Make version in loader.js reasonable.
- Created function to return the game id to prevent unnecessary data stored.

# 2.3.2 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/e9e017435f2c41c6c2b127024cc88ac51bdf04d9)
- Fix reference error.
- Fix bug in custom virtual gamepad processor where if value is set to 0 it will see that as the value being missing.

# 2.3.1 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/0fd6d58e2011fa1a39bd2e11ba3d2f17773f0961)
- Use let instead of var.

# 2.3.0 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/2fd0f545285151524262cc799efef6d996d7c6c1)
- Added ability to customize virtual gamepad UI.
- Fixed bug where shader is not set on start.

# 2.2.9 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/018c39d4065b866487f8f18ca88c9488eab69a6d)
- Added feature to save save files to indexeddb every 5 minutes.

# 2.2.8 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/9860d662d02b56417044cca11937448041d9cf43)
- Re-write gamepad handler.

# 2.2.7 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/c03d18990b6536c1503bba2c640dbc13db982bb3)
- Removed un-needed FS proxy functions.

# 2.2.6 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/fd71b5dfc2bd44d8e1f0e7c6c7b3ee1a1127a696)
- Added fps counter.
- Fixed gba core aspect.

# 2.2.5 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/4b444ec23918149a6052807d778af82f79883c01)
- Added ability to set custom control mappings.
- Added ability to set custom default volume value.
- Fixed gamepad axis as button, gamepad varaible compared to incorrect value.
- Added ability to hide/show menu/context menu buttons.
- Added ability to set game url to other data types.

# 2.2.3 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/41eed05677b4927bd114613040bfe4572c92c4b4)
- Fixed rar unarchiving function reference.
- Updated rar header detection.
- Removed netplay.

# 2.2.1 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/19980deb12c3f0790176db6fc7b8b2de4069bf4e)
- Added core menu options for new cores.
- Added new mame2003 core.
- Added support for debug emscripten setting for new cores.

# 2.0.1 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/a72222c39a793c4ff470ebb2b71c04829fee4b5e)
- Control mapping for beta cores.
- Updated beta cores.
- Beta cores now the default option!
- Added a5200 core.
- Fixed save state for new n64 core.

# 1.2.2 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/8ab7bb3f49da373ed5d291c5f72039bbabf2fbc8)
- Moved virtual gamepad menu button to the top left as 3 lines.
- Added screen orientation lock.
- Added beta n64 core!

# 1.2.1 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/638658e6202fd39cb5c94bedcfa00ccdf8b25840)
- Updated beta core files.

# 1.1.6 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/fa153ba76791184d978f9fb8b69991b05b161bc8)
- Replaced axios module with custom script.
- Added pause/play for beta cores.
- Sepperated css into its own file.
- Renamed emu-min.js to emulator.min.js.

# 1.1.5 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/2767c635b8a6e05c57e054d2f9d01ae0c4ff6d47)
- Cleaned up fetch error function.
- Cleaned up virtual gamepad event listeners.
- Add code of conduct.

# 1.1.2 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/64731dd8219931155b4e698aa98dbf65c2120038)
- Fixed error where mame files were misnamed.
- Fixed bug where variable referenced was not defined in loader.js.
- Added .gitignore
- Added nodejs script to minify js files.
- Added audio to screen recording.
- Removed lots of dead code from emulator.js file.
- Update axios module.
- Added CORS error message
- Update nodejs buffer module.

# 1.1.0 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/715ded4ae23c2135bc9a8b9b7599f12c905393b3)
- Added minify feature.
- Added emulatorjs logo.
- Added beta nds and gb core.
- Fixed bug where when wasm was supported on the beta cores and not the old cores, a network error would appear if not using beta.
- Added volume setting and cheats to beta cores.

# 1.0 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/fde44b095bb89e299daaaa4c8d7deebc79019865)
- Official release of the beta cores.
- Ability to use beta cores in production.
- Ability to use the old emulatorjs netplay server.
- Set screen recording out file name to gamename if present.
- Set screenshot out file name to gamename if present.
- Fixed virtual gamepad bug where a function was referenced to as an array.

# 0.4.26 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/0709829a11266b6ab4bbbf3e61d6dd6d3c372133)
- Sepperated emulator.js file into 2 files.
- Added support for a custom netplay server.
- Fixed netplay room password input bug.
- Fixed bug on iOS where virtual gamepad zone was un-responsive.
- Added save state location feature.
- Added mame core setting.
- Added beta cores!
- Added localization.
- Re-wrote virtual gamepad code.
- Added EJS_terminate function.
- Exposed simulate_input function to window.
- Update webrtc adapter.

# 0.4.25 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/ef3200ef87bffe57241e05ae9646cc201142ec46)
- Moved load state on start from loader.js file to emulator.js file.
- Moved data path function from loader.js file to emulator.js file.
- Added ability to set custom path to data through `EJS_pathtodata` variable.
- Added support for custom paths.
- Expose the module and loader to window.
- Added `EJS_startOnLoaded` to start the emulator on load.
- Added quick save state slots.
- Added save state message.
- Only show save state slot in settings when save states are supported.
- Added ds pointer lock.
- Added menu button to virtual gamepad. Menu will only open when clicked on mobile.
- Created licenese
- Created official emulatorjs website.

# 0.4.24 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/73ff641616bcd10f088a004002183760832a1afc)
- Deobsfocuted emulator.js and loader.js files to the most of my extent.
- Added quick save/load hotkeys.
- Added ability to use gamepad axis as button.
- Fixed typo in controls title.
- Only show needed inputs per system in control settings.
- Re-write the loader.js file.
- Exposed some variables to window.
- Cleaned up context menu code.
- Cleaned up some syntax in emulator.js file.
- Declared `EJS_AdUrl` through loader.js file.
- Fixed bug where mapping an axis as a button didn't work.
- Added missing legacy n64 core.
- Updated n64 core.

# 0.4.23-07 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/83e148c82cbc8b4e835a808dcf84456975f82a7c)
- Removed not needed code.
- Added reset button to control settings.
- Added clear button to control settings.
- Added `EJS_AdUrl` option, the ability to add an ad to the emulator.
- Cleaned up some file fetching.
- Fixed RAR unarchiving.

# 0.4.23-05 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/018c787ccf6daca58c863d38fff61910f33f98ec)
- No longer cache games with the protocols of `file:`, and `chrome-extension:`.
- Changed default keymappings.
- Added screen recording button.

# 0.4.23-04 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/6464bbedc1cd58c023cd66656540fc174aedde8b)
- Added mame2003, snes2002, snes2005, snes2010, and vbanext cores.
- Added asmjs for all supported cores.

# 0.4.23-03 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/c883f267e1e56ed6b6472b891f78704c6e4b4c17)
- Start loader.js deobsfocuting.
- Deobsfocute extractzip.js.
- Added `EJS_gameName`, the ability to change the file name of save states.

# 0.4.23-02 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/5d97620b25a81e49c6ba313e586fb37a5ce66002)
- Start emulator.js  deobsfocuting.

# 0.4.23-01 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/42a7e129cfded266b72539e8d1b5978d5e4119d8)
- Added support for loading "blob:" urls.
- Added support for loading state on game start.

# 0.4.23 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/5f5cf5cbba29cfd772d525a4c73a4bc5ea26654c)
- Added update available message.
- Fixed a bug where the 'x' from the ad iframe was still visible on game start.
- Added a2600 and mame cores.
- Remove visible 'x'
- Add rar extraction support.

# 0.4.19 [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/4fd22871663e5896bb5d0ce29a50ad508462387a)
- Added support for 32x, 3do, a7800, arcade, bluemsx, jaguar, lynx, ngp, pce, saturn, sega, segacd, and ws cores.

# Initial release [View Tree](https://github.com/EmulatorJS/EmulatorJS/tree/be2db16cba8bd85bf901cd89ca6de51414cea792)
- Support for unzipping zip files.
- Support for unzipping 7zip files.
- Support for vb, snes, psx, nes, nds, n64, gba, and gb systems. Only support for WASM.
