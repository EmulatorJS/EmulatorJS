const UglifyJS = require("uglify-js");
const fs = require('fs');
const uglifycss = require('uglifycss');

const scripts = [
    "emulator.js",
    "nipplejs.js",
    "shaders.js",
    "storage.js",
    "gamepad.js",
    "GameManager.js",
    "socket.io.min.js",
    "compression.js"
];
let code = "(function() {\n";
for (let i=0; i<scripts.length; i++) {
    code += fs.readFileSync('../src/'+scripts[i], 'utf8') + "\n";
}
code += "\n})();"

function minify(source){
    const ast = UglifyJS.parse(source);
    return UglifyJS.minify(ast).code;
}
console.log('minifying');
fs.writeFileSync('../emulator.min.css', uglifycss.processString(fs.readFileSync('../emulator.css', 'utf8')));
fs.writeFileSync('../emulator.min.js', minify(code));
console.log('done!');
