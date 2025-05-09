import fs from 'fs';
import path from 'path';
import Seven from 'node-7z';
let version;

try {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    version = packageJson.version;
} catch(error) {
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
    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
    }
    const distNpmIgnorePath = path.resolve('dist', '.ignore');
    fs.copyFileSync(npmIgnorePath, distNpmIgnorePath);
    const npmIgnoreContent = fs.readFileSync(npmIgnorePath, 'utf8');
    const updatedNpmIgnoreContent = npmIgnoreContent.replace('data/cores/*', 'data/cores/core-README.md\ndata/cores/package.json');
    fs.writeFileSync(distNpmIgnorePath, updatedNpmIgnoreContent, 'utf8');

    Seven.add(`dist/${version}.7z`, './', {
        $raw: ['-xr@dist/.ignore'],
        $progress: true
    }).on('progress', function (progress) {
        progressData['7z'] = progress.percent;
    }).on('end', function() {
        progressData['7z'] = 100;

    });

    Seven.add(`dist/${version}.zip`, './', {
        $raw: ['-xr@dist/.ignore'],
        $progress: true
    }).on('progress', function (progress) {
        progressData['zip'] = progress.percent;
    }).on('end', function() {
        progressData['zip'] = 100;
    });
} else if (build_type !== "emulatorjs" && build_type !== "cores" && build_type !== "get-cores") {
    console.log("Invalid argument. Use --npm=emulatorjs, --npm=cores or --npm=get-cores.");
    process.exit(1);
} else {
    const removeLogo = () => {
        const readmePath = path.resolve('README.md');
        const readmeContent = fs.readFileSync(readmePath, 'utf8');
        const updatedContent = readmeContent
            .split('\n')
            .filter(line => !line.includes('docs/Logo-light.png#gh-dark-mode-only>'))
            .join('\n');
        fs.writeFileSync(readmePath, updatedContent, 'utf8');
    };

    const getCores = async () => {
        const coresJsonPath = path.resolve('data', 'cores', 'cores.json');
        if (!fs.existsSync(coresJsonPath)) {
            console.error(`Cores JSON file not found at ${coresJsonPath}`);
            return;
        }
        return JSON.parse(fs.readFileSync(coresJsonPath, 'utf8'));
    };

    if (build_type === "emulatorjs") {
        console.log(`Current EmulatorJS Version: ${version}`);
        removeLogo();
        console.log("Ready to build EmulatorJS!");
    } else if (build_type === "get-cores") {
        const cores = await getCores();
        console.log(JSON.stringify(cores.map(coreName => coreName.name)));
    } else if (build_type === "cores") {
        console.log(`Current EmulatorJS Version: ${version}`);
        console.log("Building cores...");
        const allCores = await getCores();
        console.log("Building EmulatorJS cores:");
        const coreNames = allCores.map(coreName => coreName.name);
        console.log(coreNames.join(', '));
        if (!coreNames) {
            console.error("No cores found.");
            process.exit(1);
        }
        const coresPath = path.resolve('data', 'cores');
        const coresFiles = fs.readdirSync(coresPath);
        const dataFiles = coresFiles.filter(file => file.endsWith('.data') || file.endsWith('.zip'));
        const cores = {};
        for (const core of coreNames) {
            const coreFiles = dataFiles.filter(file => file.startsWith(core + '-'));
            if (!cores[core]) {
                cores[core] = [];
            }
            cores[core].push(...coreFiles);
        }
        const packagePath = path.resolve('data', 'cores', 'package.json');
        const packageContent = fs.readFileSync(packagePath, 'utf8');
        const packageJson = JSON.parse(packageContent);
        packageJson.dependencies = {
            "@emulatorjs/emulatorjs": "latest"
        };
        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 4), 'utf8');
        for (const core in cores) {
            if (!fs.existsSync(path.resolve('data', 'cores', core))) {
                fs.mkdirSync(path.resolve('data', 'cores', core));
            }
            for (const file of cores[core]) {
                const sourcePath = path.resolve('data', 'cores', file);
                const destPath = path.resolve('data', 'cores', core, file);
                fs.copyFileSync(sourcePath, destPath);
                const reportsPath = path.resolve('data', 'cores', core, 'reports');
                if (!fs.existsSync(reportsPath)) {
                    fs.mkdirSync(reportsPath);
                }
            }
            const coreReportPath = path.resolve('data', 'cores', 'reports', `${core}.json`);
            const coreReportDestPath = path.resolve('data', 'cores', core, 'reports', `${core}.json`);
            fs.copyFileSync(coreReportPath, coreReportDestPath);

            const corePackagePath = path.resolve('data', 'cores', 'package.json');
            const corePackageDestPath = path.resolve('data', 'cores', core, 'package.json');
            const corePackageContent = fs.readFileSync(corePackagePath, 'utf8');
            const corePackageJson = JSON.parse(corePackageContent);
            corePackageJson.name = `@emulatorjs/core-${core}`;
            corePackageJson.description = `EmulatorJS Core: ${core}`;
            corePackageJson.license = allCores.find(c => c.name === core).license;
            corePackageJson.repository.url = allCores.find(c => c.name === core).repo + '.git';
            corePackageJson.bugs.url = allCores.find(c => c.name === core).repo + '/issues';
            corePackageJson.dependencies = {
                "@emulatorjs/emulatorjs": "latest"
            };
            fs.writeFileSync(corePackageDestPath, JSON.stringify(corePackageJson, null, 4), 'utf8');

            const coreReadmePath = path.resolve('data', 'cores', 'core-README.md');
            const coreReadmeDestPath = path.resolve('data', 'cores', core, 'README.md');
            const coreReadmeContent = fs.readFileSync(coreReadmePath, 'utf8');
            const updatedCoreReadmeContent = coreReadmeContent
                .replace(/<!-- EJS_CORE_NAME -->/g, `${core}`)
                .replace(/<!-- EJS_CORE_REPO -->/g, allCores.find(c => c.name === core).repo);
            fs.writeFileSync(coreReadmeDestPath, updatedCoreReadmeContent, 'utf8');

            packageJson.dependencies[`@emulatorjs/core-${core}`] = "latest";
            fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 4), 'utf8');
        }
        console.log("EmulatorJS cores built successfully!");
        console.log("Ready to build EmulatorJS!");
    }
}
