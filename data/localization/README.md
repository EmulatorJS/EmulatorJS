# Localization

Supported languages

`en-US` - English US<br>
`pt-BR` - Portuguese<br>
`es-ES` - Spanish<br>
`el-GR` - Greek<br>
`ja-JA` - Japanese<br>
`zh-CN` - Chinese<br>
`hi-HI` - Hindi<br>
`ar-AR` - Arabic<br>
`jv-JV` - Javanese<br>
`ben-BEN` - Bengali<br>
`ru-RU` - Russian<br>
`de-GER` - German<br>
`ko-KO` - Korean<br>
`af-FR` - French<br>
`it-IT` - Italian<br>
`tr-Tr` - Turkish<br>
`fa-AF` - Persian<br>
`ro-RO` - Romanian<br>

default: `en-US`

add the line to your code to use

```
EJS_language = ''; //language
```

If the language file is not found or there was an error fetching the file, the emulator will default to english.

## Credits

Translated for `es-ES` originally by [@cesarcristianodeoliveira](https://github.com/cesarcristianodeoliveira) and updated by [@angelmarfil](https://github.com/angelmarfil) <br>
Translated for `el-GR` by [@imneckro](https://github.com/imneckro) <br>
Translated for `pt-BR` by [@zmarteline](https://github.com/zmarteline)<br>
Translated for `zh-CN` by [@eric183](https://github.com/eric183)<br>
Translated for `pt-BR` by [@zmarteline](https://github.com/zmarteline) <br>
Translated for `it-IT` by [@IvanMazzoli](https://github.com/IvanMazzoli) <br>
Translated for `tr-Tr` by [@iGoodie](https://github.com/iGoodie) <br>
Translated for `fa-AF` by [@rezamohdev](https://github.com/rezamohdev) <br>
Translated for `af-FR` by [@t3chnob0y](https://github.com/t3chnob0y) <br>
Translated for `ro-RO` by [@jurcaalexandrucristian](https://github.com/jurcaalexandrucristian) <br>
Translated for `ja-JA` by [@noel-forester](https://github.com/noel-forester) <br>
Translated for `hi-HI`, `ar-AR`, `jv-JV`, `ben-BEN`, `ru-RU`, `de-GER`, `ko-KO` by [@allancoding](https://github.com/allancoding), using a translate application <br>

## Contributing

To contribute, please download the default `en-US.json` language file to use as a template, translate the strings and then submit the file with a Pull Request or Issue.

The EmulatorJS team will review and add your changes.

The `retroarch.json` are all the setting names for the menu. They will default to english if not found. You can set `EJS_settingsLanguage` to `true` to see the missing retroarch settings names for the current language. You can translate them and add the to the language file.

The control mapping translations for controllers are diffrent for each controller. They will need to be added to the language file if they are not in the default `en-US.json` file.

You can also use the [Translation Helper](https://emulatorjs.org/translate) tool to help you translate the file.

Please contribute!!

Enything that is incorrect or needs to be fix please perform a pull request!
