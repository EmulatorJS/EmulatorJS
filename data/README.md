## data directory


This is a note, All core files (files that end with `.data`) are compiled versions on [retroarch](https://github.com/libretro/RetroArch)

Changes from the original software can be viewed [here](https://github.com/ethanaobrien/RetroArch).

All core files are licensed with the GNU General Public License version 3.0


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
