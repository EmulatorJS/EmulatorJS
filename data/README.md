# Data

<br>

## Core Files    [![Badge GPLv3]][GPLv3]

All files ending in `.data` have been compiled with **[RetroArch]**.

*Check my **[Fork]** for changes made to the original software.*

<br>

### compiling the cores

I have only ever gotten this to work on ubuntu.


First, install dependencies

```
sudo apt install -y binutils-mips-linux-gnu build-essential git pkgconf python3
```

To build wasm:

clone the repository

```
git clone https://github.com/ethanaobrien/RetroArch.git
```

then, navigate to the `/dist-scripts/` direcotry, then, from here run

```
emmake ./dist-cores.sh emscripten
```

to build files to build the wasm:

clone the repository

```
git clone https://github.com/libretro/libretro-fceumm.git
```

then, enter whatever directory the Makefile.libretro is located in (there may not be a Makefile.libretro). In this case it is the base directory

then, run
```
emmake make -f Makefile.libretro platform=emscripten
```
if there is no Makefile.libretro file, then remove `-f Makefile.libretro`

Then, copy the `.bc` file to the dist-cores directory (see above)


<!----------------------------------------------------------------------------->

[RetroArch]: https://github.com/libretro/RetroArch
[Fork]: https://github.com/ethanaobrien/RetroArch

[Badge GPLv3]: https://img.shields.io/badge/License-GPL_3-blue.svg?style=for-the-badge
[GPLv3]: cores/LICENSE
