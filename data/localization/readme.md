
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

default: `en-US`


add the line to your code to use

```
EJS_language = ''; //language
```

If the language file is not found or there was an error fetching the file, the emulator will default to english.

## Credits

Translated for `es-ES` originally by [@cesarcristianodeoliveira](https://github.com/cesarcristianodeoliveira) and updated by [@angelmarfil](https://github.com/angelmarfil)  <br>
Translated for `el-GR` by [@imneckro](https://github.com/imneckro) <br>
Translated for `ja-JA`, `hi-HI`, `ar-AR`, `jv-JV`, `ben-BEN`, `ru-RU`, `de-GER`, `ko-KO`, `af-FR` by [@allancoding](https://github.com/allancoding) <br>
Translated for `pt-BR` originally by [@allancoding](https://github.com/allancoding) and updated by [@zmarteline](https://github.com/zmarteline)<br>
Translated for `zh-CN` originally by [@allancoding](https://github.com/allancoding) and updated by [@eric183](https://github.com/eric183)<br>
Translated for `pt-BR` originally by [@allancoding](https://github.com/allancoding) and updated by [@zmarteline](https://github.com/zmarteline) <br>
Translated for `it-IT` by [@IvanMazzoli](https://github.com/IvanMazzoli) <br>
Translated for `tr-Tr` by [@iGoodie](https://github.com/iGoodie) <br>

## Contributing

Download the default `en.json` file and simply translate all the words that start with the `-` (remove the dash afterwards) then perform a pull request or open an issue with the file uploaded and I will add your work.

The `retroarch.json` are all the setting names for the menu. They will default to english if not found. You can set `EJS_settingsLanguage` to `true` to see the missing retroarch settings names for the current language. You can translate them and add the to the language file. 

The control maping traslations for controllers are diffrent for each controller. They will need to be added to the language file if they are not in the default `en.json` file.

You can also use the [Translation Helper](Translate.html) tool to help you translate the file.

Please contribute!!

Enything that is incorrect or needs to be fix please perform a pull request!
