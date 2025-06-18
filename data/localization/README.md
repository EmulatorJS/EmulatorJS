# Localization

Supported languages

`en-US` - English US<br>
`pt` - Portuguese<br>
`es` - Spanish<br>
`el` - Greek<br>
`ja` - Japanese<br>
`zh` - Chinese<br>
`hi` - Hindi<br>
`ar` - Arabic<br>
`jv` - Javanese<br>
`bn` - Bengali<br>
`ru` - Russian<br>
`de` - German<br>
`ko` - Korean<br>
`af` - French<br>
`it` - Italian<br>
`tr` - Turkish<br>
`fa` - Persian<br>
`ro` - Romanian<br>
`vi` - Vietnamese<br>

default: `en-US`

add the line to your code to use

```
EJS_language = ''; //language
```

If the language file is not found or there was an error fetching the file, the emulator will default to english.

## Credits

Translated for `es` originally by [@cesarcristianodeoliveira](https://github.com/cesarcristianodeoliveira) and updated by [@angelmarfil](https://github.com/angelmarfil) <br>
Translated for `el` by [@imneckro](https://github.com/imneckro) <br>
Translated for `pt` by [@zmarteline](https://github.com/zmarteline)<br>
Translated for `zh` by [@eric183](https://github.com/eric183)<br>
Translated for `pt` by [@zmarteline](https://github.com/zmarteline) <br>
Translated for `it` by [@IvanMazzoli](https://github.com/IvanMazzoli) <br>
Translated for `tr` by [@iGoodie](https://github.com/iGoodie) <br>
Translated for `fa` by [@rezamohdev](https://github.com/rezamohdev) <br>
Translated for `af` by [@t3chnob0y](https://github.com/t3chnob0y) <br>
Translated for `ro` by [@jurcaalexandrucristian](https://github.com/jurcaalexandrucristian) <br>
Translated for `ja` by [@noel-forester](https://github.com/noel-forester) <br>
Translated for `vi` by [@TimKieu](https://github.com/TimKieu) <br>
Translated for `hi`, `ar`, `jv`, `bn`, `ru`, `de`, `ko` by [@allancoding](https://github.com/allancoding), using a translate application <br>

## Contributing

To contribute, please download the default `en-US.json` language file to use as a template, translate the strings and then submit the file with a Pull Request or Issue.

The EmulatorJS team will review and add your changes.

As of version `4.2.2` it will default to the system language.

The `retroarch.json` are all the setting names for the menu. You can set `EJS_settingsLanguage` to `true` to see the missing retroarch settings names for the current language. You can translate them and add the to the language file.

The control mapping translations for controllers are diffrent for each controller. They will need to be added to the language file if they are not in the default `en-US.json` file.

You can also use the [Translation Helper](https://emulatorjs.org/translate) tool to help you translate the file.

Please contribute!!

Enything that is incorrect or needs to be fix please perform a pull request!
