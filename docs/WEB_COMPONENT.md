# Web Component: `<emulator-js>`

EmulatorJS can be used as a custom element instead of the `window.EJS_*` + `data/loader.js`
flow. The legacy flow keeps working unchanged; both can be used side by side, and multiple
`<emulator-js>` elements can live on the same page.

## Quick start

```html
<script type="module" src="data/webcomponent.min.js"></script>
<emulator-js style="width:640px;height:480px" core="nes"
    game-url="https://example.com/mario.nes" data-path="data/"></emulator-js>
```

Run `npm run minify` once to build `data/webcomponent.min.js`.

## Attributes and properties

Every config option is a reactive element property named after its config key, with a
kebab-case attribute.

| Attribute | Property (config key) | Type |
| --- | --- | --- |
| `core` | `system` | string |
| `data-path` | `dataPath` | string |
| `game-url` | `gameUrl` | string (URL or `blob:`) |
| `bios-url` | `biosUrl` | string |
| `game-name` | `gameName` | string |
| `game-parent-url` | `gameParentUrl` | string |
| `game-patch-url` | `gamePatchUrl` | string |
| `load-state-url` | `loadState` | string |
| `game-id` | `gameId` | string |
| `language` | `language` | string |
| `settings-language` | `settingsLanguage` | string |
| `volume` | `volume` | number |
| `cache-limit` | `cacheLimit` | number |
| `color` | `color` | string |
| `background-img` | `backgroundImg` | string |
| `background-color` | `backgroundColor` | string |
| `background-blur` | `backgroundBlur` | boolean |
| `start-btn-name` | `startBtnName` | string |
| `align-start-button` | `alignStartButton` | string |
| `netplay-url` | `netplayUrl` | string |
| `start-on-load` | `startOnLoad` | boolean |
| `fullscreen-on-load` | `fullscreenOnLoad` | boolean |
| `threads` | `threads` | boolean |
| `debug` | `debug` | boolean |
| `ad-url` | `adUrl` | string |
| `ad-mode` | `adMode` | number |
| `ad-timer` | `adTimer` | number |
| `ad-size` | `adSize` | array (JSON, e.g. `ad-size='["300px","250px"]'`) |
| `virtual-gamepad-settings` | `VirtualGamepadSettings` | object (JSON) |
| `button-opts` | `buttonOpts` | object (JSON) |
| `default-controllers` | `defaultControllers` | object (JSON) |
| `file-paths` | `filePaths` | object (JSON) |
| `cache-config` | `cacheConfig` | object (JSON) |
| `cheats` | `cheats` | array (JSON) |
| `cheat-path` | `cheatPath` | string |
| `default-options` | `defaultOptions` | object (JSON) |
| `netplay-ice-servers` | `netplayICEServers` | array (JSON) |
| `control-scheme` | `controlScheme` | string |
| `disable-cue` | `disableCue` | boolean |
| `soft-load` | `softLoad` | number |
| `capture` | `capture` | object (JSON) |
| `external-files` | `externalFiles` | array (JSON) |
| `dont-extract-rom` | `dontExtractRom` | boolean |
| `dont-extract-bios` | `dontExtractBIOS` | boolean |
| `disable-local-storage` | `disableLocalStorage` | boolean |
| `force-legacy-cores` | `forceLegacyCores` | boolean |
| `no-auto-focus` | `noAutoFocus` | boolean |
| `video-rotation` | `videoRotation` | number |
| `hide-settings` | `hideSettings` | boolean |
| `browser-mode` | `browserMode` | number (`1` mobile, `2` desktop); as a JS property also `"mobile"` / `"desktop"` |
| `additional-shaders` | `additionalShaders` | object (JSON) |
| `fixed-save-interval` | `fixedSaveInterval` | number |
| `disable-auto-unload` | `disableAutoUnload` | boolean |
| `disable-batch-bootup` | `disableBatchBootup` | boolean |
| `ask-before-exit` | `askBeforeExit` | boolean |
| `retroarch-opts` | `retroarchOpts` | object/array (JSON) |
| `core-opts` | `coreOpts` | object (JSON) |

Property changes apply automatically before the first start. After the emulator has
started, change properties and then call `await el.reload()` to re-create the instance
with the new config:

```js
const el = document.querySelector("emulator-js");
el.system = "snes";
el.gameUrl = "https://example.com/game.smc";
await el.reload(); // only needed if the emulator already started
```

## Events

Emulator events are re-dispatched on the element as subclasses of `Event` named
`emulator-js:<kebab-name>`. Each event class exposes its payload as named properties:

| Event | Class | Payload properties |
| --- | --- | --- |
| `emulator-js:ready` | `ReadyEvent` | — |
| `emulator-js:start` | `StartEvent` | — |
| `emulator-js:exit` | `ExitEvent` | — |
| `emulator-js:load-state` | `LoadStateEvent` | — |
| `emulator-js:save-state` | `SaveStateEvent` | `state`, `screenshot`, `format` |
| `emulator-js:load-save` | `LoadSaveEvent` | — |
| `emulator-js:save-save` | `SaveSaveEvent` | `save`, `screenshot`, `format` |
| `emulator-js:save-update` | `SaveUpdateEvent` | `hash`, `save`, `screenshot`, `format` |
| `emulator-js:start-clicked` | `StartClickedEvent` | — |

```js
const el = document.querySelector("emulator-js");
el.addEventListener("emulator-js:ready", () => console.log("ready"));
el.addEventListener("emulator-js:save-update", (e) => console.log(e.hash, e.screenshot));
el.addEventListener("emulator-js:exit", () => console.log("exited"));
```

The event classes are also exported from the module:
`import { SaveStateEvent } from "./data/webcomponent.min.js"`.

## Instance access

- `el.emulator` — the `EmulatorJS` instance (available once `emulator-js:ready` fired).
  Removing the element from the DOM destroys the instance (`el.emulator` becomes `null`).
- `el.reload()` — destroy and re-create the instance on the same container with the
  current element properties.

## Multiple instances

Several `<emulator-js>` elements can share a page:

```html
<emulator-js id="p1" core="nes" game-name="game-a" game-url="roms/a.nes" data-path="data/"></emulator-js>
<emulator-js id="p2" core="snes" game-name="game-b" game-url="roms/b.smc" data-path="data/"></emulator-js>
```

Notes on shared page state:

- Settings in localStorage are keyed by gameId + core + gameName — the same game shares
  settings across instances.
- The IndexedDB databases (`EmulatorJS-Cache`, `EmulatorJS-states`) are shared between
  instances; concurrent eviction may race.
- Gamepad input is routed to the instance whose container has focus.
- Core scripts are loaded one at a time page-wide, so different cores on one page are
  safe; the primary use case is the same core in several instances.

## Frameworks

Custom elements work natively in React:

```jsx
<emulator-js
    core="nes"
    game-url="https://example.com/mario.nes"
    data-path="data/"
    ref={(el) => el && el.addEventListener("emulator-js:ready", () => console.log("ready"))}
/>
```
