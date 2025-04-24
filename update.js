import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const args = process.argv.slice(2);
const versionArg = args.find(arg => arg.startsWith('--ejs_v='));
const devArg = args.find(arg => arg.startsWith('--dev='));
const update_version = versionArg ? versionArg.split('=')[1] : process.env.ejs_v;
const dev = devArg ? devArg.split('=')[1] : null;
let version;

try {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    version = packageJson.version;
} catch(error) {
    console.error("Error reading version from package.json:", error.message);
    process.exit(1);
}

const updateDependencies = async () => {
    const socket_io = path.resolve('node_modules', 'socket.io', 'client-dist', 'socket.io.min.js');
    const ejs_socket_io = path.resolve('data', 'src', 'socket.io.min.js');
    const nipplejs = path.resolve('node_modules', 'nipplejs', 'dist', 'nipplejs.js');
    const ejs_nipplejs = path.resolve('data', 'src', 'nipplejs.js');

    try {
        fs.copyFileSync(socket_io, ejs_socket_io);
    } catch(error) {
        console.error("Error updating socket.io:", error.message);
    }

    try {
        fs.copyFileSync(nipplejs, ejs_nipplejs);
    } catch(error) {
        console.error("Error updating nipplejs:", error.message);
    }
    console.log("Updated socket.io and nipplejs.");
};

const updateVersion = async (newVersion) => {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n');
    console.log(`Updated version to ${newVersion} in package.json.`);

    const versionJsonPath = path.resolve('data', 'version.json');
    const versionJson = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));
    versionJson.version = newVersion;
    fs.writeFileSync(versionJsonPath, JSON.stringify(versionJson, null, 4) + '\n');
    console.log(`Updated version to ${newVersion} in data/version.json.`);

    const coresJsonPath = path.resolve('data', 'cores', 'package.json');
    const coresJson = JSON.parse(fs.readFileSync(coresJsonPath, 'utf8'));
    coresJson.version = newVersion;
    fs.writeFileSync(coresJsonPath, JSON.stringify(coresJson, null, 4) + '\n');
    console.log(`Updated version to ${newVersion} in data/cores/package.json.`);

    const emulatorJsPath = path.resolve('data', 'src', 'emulator.js');
    const emulatorJs = fs.readFileSync(emulatorJsPath, 'utf8');
    let updatedEmulatorJs = "";
    if (dev === "true") {
        updatedEmulatorJs = emulatorJs.replace(/this\.ejs_version\s*=\s*".*?";/, `this.ejs_version = "${newVersion}-dev";`);
    } else {
        updatedEmulatorJs = emulatorJs.replace(/this\.ejs_version\s*=\s*".*?";/, `this.ejs_version = "${newVersion}";`);
    }
    fs.writeFileSync(emulatorJsPath, updatedEmulatorJs);
    console.log(`Updated version to ${newVersion} in data/src/emulator.js.`);
};

const fetchContributors = async () => {
    const url = 'https://api.github.com/repos/EmulatorJS/EmulatorJS/contributors';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch contributors: ${response.statusText}`);
        }
        return await response.json();
    } catch(error) {
        console.error("Error fetching contributors:", error.message);
    }
};

const updateContributors = async () => {
    const contributors = await fetchContributors();
    const ignoredContributors = JSON.parse(fs.readFileSync(path.resolve('docs', 'contributors.json'), 'utf8')).ignore;
    const missingContributors = JSON.parse(fs.readFileSync(path.resolve('docs', 'contributors.json'), 'utf8')).missing;
    if (!contributors) return;
    const sortedContributors = contributors
        .concat(missingContributors)
        .sort((a, b) => b.contributions - a.contributions)
        .filter(contributor => !ignoredContributors.includes(contributor.login));
    const uniqueContributors = Array.from(new Set(sortedContributors.map(contributor => contributor.login)))
        .map(login => sortedContributors.find(contributor => contributor.login === login));
    const finalContributors = uniqueContributors.sort((a, b) => b.contributions - a.contributions);
    let contributorReadme = ""
    finalContributors
        .forEach(contributor => {
            contributorReadme += `<a href="${contributor.html_url}" target="_blank" title="${contributor.login} - Contributions: ${contributor.contributions}" alt="${contributor.login}"><img src="${contributor.avatar_url}&size=95" width="95px"></a>&nbsp;\n`;
        });
    const contributorsPath = path.resolve('docs', 'contributors.md');
    const contributorsReadme = fs.readFileSync(contributorsPath, 'utf8');
    const startLine = contributorsReadme.split('\n').findIndex(line => line.startsWith("<!-- Others -->")) + 1;
    const endLine = contributorsReadme.split('\n').findIndex(line => line.startsWith("<!-- Others End -->")) - 1;
    const updatedContributorsReadme = contributorsReadme.split('\n').filter((line, index) => index < startLine || index > endLine).join('\n');
    const newContributorsReadme = updatedContributorsReadme.replace("<!-- Others -->", `<!-- Others -->\n${contributorReadme}`);
    fs.writeFileSync(contributorsPath, newContributorsReadme);
    console.log("Updated Contributors.md with new contributors.");
}

console.log(`Current EmulatorJS Version: ${version}`);
if (!update_version) {
    console.warn("Warning: Version number not provided.");
} else {
    console.log(`Updating EmulatorJS Version number to: ${update_version}`);
}

console.log("Updating EmulatorJS dependencies...");
await updateDependencies();
if (update_version || dev === "false" || dev === "true") {
    console.log("Updating EmulatorJS version...");
    await updateVersion(update_version || version);
}
await updateContributors();
console.log("Updating EmulatorJS completed.");
