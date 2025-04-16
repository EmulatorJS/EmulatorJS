import fs from 'fs';
import path from 'path';
import Seven from 'node-7z';
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

    const npmIgnorePath = path.resolve('.npmignore');
    const distNpmIgnorePath = path.resolve('dist/.ignore');
    const npmIgnoreContent = fs.readFileSync(npmIgnorePath, 'utf8');
    const updatedNpmIgnoreContent = npmIgnoreContent.replace('data/cores/*', 'data/cores/logs/');
    fs.writeFileSync(distNpmIgnorePath, updatedNpmIgnoreContent, 'utf8');

    Seven.add(`dist/${version}.7z`, './', {
        $raw: ['-xr@dist/.ignore'],
        $progress: true
    }).on('progress', function (progress) {
        progressData['7z'] = progress.percent;
    }).on('end', function () {
        progressData['7z'] = 100;

    });

    Seven.add(`dist/${version}.zip`, './', {
        $raw: ['-xr@dist/.ignore'],
        $progress: true
    }).on('progress', function (progress) {
        progressData['zip'] = progress.percent;
    }).on('end', function () {
        progressData['zip'] = 100;
    });
} else if (build_type !== "emulatorjs" && build_type !== "cores") {
    console.log("Invalid argument. Use --npm=emulatorjs or --npm=cores.");
    process.exit(1);
} else {
    const removeLogo = (readme) => {
        const readmePath = path.resolve(readme);
        const readmeContent = fs.readFileSync(readmePath, 'utf8');
        const updatedContent = readmeContent
            .split('\n')
            .filter(line => !line.includes('docs/Logo-light.png#gh-dark-mode-only>'))
            .join('\n');
        fs.writeFileSync(readmePath, updatedContent, 'utf8');
    };
    
    const getCores = () => {
        const coresJsonPath = path.resolve('data', 'cores', 'cores.json');
        const coresJson = JSON.parse(fs.readFileSync(coresJsonPath, 'utf8'));
        const coreNames = coresJson.map(core => core.name);
        console.log("Core Names:", coreNames);
    };
    
    console.log(`Current EmulatorJS Version: ${version}`);
    if (build_type === "emulatorjs") {
        removeLogo('README.md');
    } else if (build_type === "cores") {
        removeLogo('data/cores/README.md');
        getCores();
    }
    
    console.log("Set configs and removed logo from README.md");
}