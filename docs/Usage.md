# Usage

*For questions please use the* ***[Issue]*** *tab.*

<br>

## Setup

1. Download this repository.<br>
    *`Code ➞ Download As Zip`*

2. Use a **WebServer** to host the emulator.

3. Use your **Browser** to navigate to `localhost`

<br>

## ROMs

**ROMs** can be used as `zip` / `rar` / `7z` archives.

<br>

## Netplay

By default **Netplay** is ***disabled***, <br>
to enable it, add the following:

```js
// ID in your website, required for netplay. Each game in your site should have a different ID
EJS_gameID = 1;
```

<br>

by default, the netplay server url will be `emuserver.emulatorjs.ga`, but to default to the default `ws.emulatorjs.com` server add the following line

```js
EJS_oldEJSNetplayServer = true;
```

<br>

*To self host:*

1. Download the **[Server]**.

2. Specify the servers address with:

```js
EJS_netplayUrl = 'http://localhost:3000/'; // Absolute Url To Your Netplay Server
```

<br>

## Custom Save Filename

To customize the filename of save states <br>
simply add the following lines of code.

```js
EJS_gameName = 'Game Name';
```

**➞ Save Filename:** `Game Name.state`

<br>

## AD

To place an advertisement in front of the <br>
`play now` screen, include the following line:

```js
EJS_AdUrl = 'URL';
```

<br>

## Interface Color

To use a different color for the emulator interface, use:

```js
EJS_color = '#FF0000'; // Hex Color Code
```

<br>

## Direct Start

To start the emulator immediately, add this line:

```js
EJS_startOnLoaded = true;
```

*For audio to play the user still* <br>
*needs to interact with the page.*

<br>

## Custom Paths

Paths to emulator files can be customized with:

```js
EJS_paths = {
    'fileName' : '/somepath',
    'emulator.js' : 'https://example.com/emulator.js',
    'n64-asmjs.data' : '/asdfds.data'
};
```

*If a file is not defined, the default is used.*

<br>

## Localization

Please see [the localization README].

<br>

## Using MAME

To use the **MAME** system you will have to add:

```js
EJS_core = 'mame';
EJS_mameCore = '' // mame core options (example: '4|0')
```

to your code.

Set the mame core value to the mame core number ( `1` - `6` ) + `|` + save states supported ( `0` or `1` )


<!----------------------------------------------------------------------------->

[Issue]: https://github.com/ethanaobrien/emulatorjs/issues
[Server]: https://github.com/ethanaobrien/emuserver/releases
[the localization readme]: data/localization/
