import fs from 'fs';
import path from 'path';
import Seven from 'node-7z';
import { console } from 'inspector';
let version;

try {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    version = packageJson.version;
} catch (error) {
    console.error("Error reading version from package.json:", error.message);
    process.exit(1);
}

const args = process.argv.slice(2);
const npmArg = args.find(arg => arg.startsWith('--npm='));
const build_type = npmArg ? npmArg.split('=')[1] : process.env.npm;

if (!build_type) {
    const progressData = {
        '7z': 0,
        'zip': 0
    };
    
    const progressInterval = setInterval(() => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        if (progressData['7z'] < 100 && progressData['zip'] < 100) {
            process.stdout.write(`7z Progress: ${progressData['7z']}% | Zip Progress: ${progressData['zip']}%`);
        } else if (progressData['7z'] === 100) {
            console.log(`${version}.7z created successfully!`);
            process.stdout.write(`Zip Progress: ${progressData['zip']}%`);
            progressData['7z'] = 101;
        } else if (progressData['zip'] === 100) {
            console.log(`${version}.zip created successfully!`);
            process.stdout.write(`7z Progress: ${progressData['7z']}%`);
            progressData['zip'] = 101;
        } else if (progressData['zip'] >= 100 && progressData['7z'] >= 100) {
            process.stdout.write(`All archives for EmulatorJS version: ${version} created successfully!`);
            clearInterval(progressInterval);
            console.log('\nArchives are in the dist/ folder.');
        } else if (progressData['7z'] >= 100) {
            process.stdout.write(`Zip Progress: ${progressData['zip']}%`);
        } else if (progressData['zip'] >= 100) {
            process.stdout.write(`7z Progress: ${progressData['7z']}%`);
        }
    }, 100);

    console.log(`Creating archives for EmulatorJS version: ${version}`);

    Seven.add(`dist/${version}.7z`, './', {
        $raw: ['-xr@.npmignore'],
        $progress: true
    }).on('progress', function (progress) {
        progressData['7z'] = progress.percent;
    }).on('end', function () {
        progressData['7z'] = 100;
    });

    Seven.add(`dist/${version}.zip`, './', {
        $raw: ['-xr@.npmignore'],
        $progress: true
    }).on('progress', function (progress) {
        progressData['zip'] = progress.percent;
    }).on('end', function () {
        progressData['zip'] = 100;
    });
} else if (build_type != "emulatorjs" && build_type != "cores" && build_type != "nocores") {
    console.log("Invalid argument. Use --npm=emulatorjs, --npm=cores or --npm=nocores.");
    process.exit(1);
}

const removeIgnoreCores = () => {
    const ignorePath = path.resolve('.npmignore');
    const ignoreContent = fs.readFileSync(ignorePath, 'utf8');
    const updatedContent = ignoreContent
        .split('\n')
        .filter(line => line.trim() !== 'data/cores/')
        .join('\n');
    fs.writeFileSync(ignorePath, updatedContent, 'utf8');
}

const addIgnoreCores = () => {
    const ignorePath = path.resolve('.npmignore');
    const ignoreContent = fs.readFileSync(ignorePath, 'utf8');
    if (!ignoreContent.split('\n').includes('data/cores/')) {
        fs.appendFileSync(ignorePath, '\ndata/cores/');
    }
};

const removeLogo = (readme) => {
    const readmePath = path.resolve(readme);
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const updatedContent = readmeContent
        .split('\n')
        .filter(line => !line.includes('docs/Logo-light.png#gh-dark-mode-only>'))
        .join('\n');
    fs.writeFileSync(readmePath, updatedContent, 'utf8');
};

const setCores = () => {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = "@emulatorjs/emulatorjs-nocores";
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

const setEmulatorJS = () => {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = "@emulatorjs/emulatorjs";
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

const coresMessage = `<div id="nocores">\n\n## EmulatorJS-nocores\n\nThis package does not contain any cores.\n\nIf you want the bundled version: https://www.npmjs.com/package/@emulatorjs/emulatorjs\n\nJust the cores:\nhttps://www.npmjs.com/package/@emulatorjs/cores\n\n</div>`;

const addCoresMessage = () => {
    const readmePath = path.resolve('README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const updatedContent = readmeContent
        .split('\n')
        .map(line => line.includes('<!-- nocores -->') ? line + '\n' + coresMessage : line)
        .join('\n');
    fs.writeFileSync(readmePath, updatedContent, 'utf8');
}

const removeCoresMessage = () => {
    const readmePath = path.resolve('README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const updatedContent = readmeContent.replace(coresMessage +"\n", '');
    fs.writeFileSync(readmePath, updatedContent, 'utf8');
}

console.log(`Current EmulatorJS Version: ${version}`);
console.log(`Build Type: ${build_type}`);
console.log(`Building...`);
if (build_type == "emulatorjs") {
    setEmulatorJS();
    removeIgnoreCores();
    removeLogo('README.md');
    removeCoresMessage();
} else if (build_type == "nocores") {
    setCores();
    removeIgnoreCores();
    addIgnoreCores();
    removeLogo('README.md');
    addCoresMessage();
} else if (build_type == "cores") {
    removeLogo('data/cores/README.md');
}

console.log("Set config and removed logo from README.md");
