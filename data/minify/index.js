const UglifyJS = require("uglify-js");
const fs = require('fs');

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(a, b) {
        return this.split(a).join(b);
    }
}

var a = fs.readFileSync('../emu-main.js', 'utf8').substring(18);
var code = fs.readFileSync('../emulator.js', 'utf8').replaceAll('window.EJS_main', a);

function minify(source){
    var ast = UglifyJS.parse(source); 
    return UglifyJS.minify(ast).code;
}
console.log('minifying')
var min = minify(code);
console.log('done!')

fs.writeFileSync('../emu-min.js', min);
