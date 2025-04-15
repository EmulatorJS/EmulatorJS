import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const args = process.argv.slice(2);
const versionArg = args.find(arg => arg.startsWith('--ejs_v='));
const update_version = versionArg ? versionArg.split('=')[1] : process.env.ejs_v;
let version;

try {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    version = packageJson.version;
} catch (error) {
    console.error("Error reading version from package.json:", error.message);
    process.exit(1);
}

const updateDependencies = () => {
    const socket_io = path.resolve('node_modules', 'socket.io', 'client-dist', 'socket.io.min.js');
    const ejs_socket_io = path.resolve('data', 'src', 'socket.io.min.js');
    const nipplejs = path.resolve('node_modules', 'nipplejs', 'dist', 'nipplejs.js');
    const ejs_nipplejs = path.resolve('data', 'src', 'nipplejs.js');

    try {
        fs.copyFileSync(socket_io, ejs_socket_io);
    } catch (error) {
        console.error("Error updating socket.io:", error.message);
    }

    try {
        fs.copyFileSync(nipplejs, ejs_nipplejs);
    } catch (error) {
        console.error("Error updating nipplejs:", error.message);
    }
    console.log("Updated socket.io and nipplejs.");
};

const updateVersion = (newVersion) => {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Updated version to ${newVersion} in package.json.`);

    const versionJsonPath = path.resolve('data', 'version.json');
    const versionJson = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));
    versionJson.version = newVersion;
    fs.writeFileSync(versionJsonPath, JSON.stringify(versionJson, null, 2));
    console.log(`Updated version to ${newVersion} in data/version.json.`);

    const coresJsonPath = path.resolve('data', 'cores', 'package.json');
    const coresJson = JSON.parse(fs.readFileSync(coresJsonPath, 'utf8'));
    coresJson.version = newVersion;
    fs.writeFileSync(coresJsonPath, JSON.stringify(coresJson, null, 2));
    console.log(`Updated version to ${newVersion} in data/cores/package.json.`);

    const emulatorJsPath = path.resolve('data', 'src', 'emulator.js');
    const emulatorJs = fs.readFileSync(emulatorJsPath, 'utf8');
    const updatedEmulatorJs = emulatorJs.replace(/this\.ejs_version\s*=\s*".*";/, `this.ejs_version = "${newVersion}";`);
    fs.writeFileSync(emulatorJsPath, updatedEmulatorJs);
    console.log(`Updated version to ${newVersion} in data/src/emulator.js.`);
};

console.log(`Current EmulatorJS Version: ${version}`);
if (!update_version) {
    console.warn("Warning: Version number not provided.");
} else {
    console.log(`Updating EmulatorJS Version number to: ${update_version}`);
}

console.log("Updating EmulatorJS dependencies...");
updateDependencies();
if (update_version) {
    console.log("Updating EmulatorJS version...");
    updateVersion(update_version);
}

try {
    const minifyProcess = spawn('node', ['minify/minify.js']);

    minifyProcess.stdout.on('data', (data) => {
        console.log(data.toString().trim());
    });

    minifyProcess.stderr.on('data', (data) => {
        console.error("Minify Errors:", data.toString().trim());
    });

    minifyProcess.on('close', () => {  
        console.log("EmulatorJS update complete!");
    });
} catch (error) {
    console.error("Error during minification:", error.message);
}