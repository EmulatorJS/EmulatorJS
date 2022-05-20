<br>

# Data Folder

<br>

## Cores    [![Badge GPLv3]][GPLv3]

All files ending in `.data` have been compiled with **[RetroArch]**.

*Check my **[Fork]** for changes made to the original software.*

<br>
<br>
<br>

## Building

*Instructions have only been confirmed working for **Ubuntu**.*

<br>

### Dependencies

- **[Build Essential]**
- **[PkgConf]**
- **[BinUtils]**
- **[Python]**
- **[Git]**

<br>

```sh
sudo apt install -y         \
    binutils-mips-linux-gnu \
    build-essential         \
    pkgconf                 \
    python3                 \
    git 
```

<br>
<br>

### WASM

1. **Clone** the repository.

    ```sh
    git clone https://github.com/ethanaobrien/RetroArch.git
    ```
    
<br>    

2. Navigate to `/dist-scripts/`

<br>

3. Build with:

    ```sh
    emmake ./dist-cores.sh emscripten
    ```

<br>
<br>

### LibRetro

1. **Clone** the repository.

    ```sh
    git clone https://github.com/libretro/libretro-fceumm.git
    ```

<br>

2. The next steps depend on whether or <br>
   not you have a `Makefile.libretro` .
   
   <br>
   
   #### With
   
   - Navigate to the folder with the makefile.
   
   - Build with:
   
       ```sh
       emmake make -f Makefile.libretro platform=emscripten
       ```
   
   <br>
   
   #### Without
   
   - Stay in the base directory of the project.
   
   - Build with:
   
       ```sh
       emmake make platform=emscripten
       ```

<br>

3. Copy the `.bc` file to the `/dist-cores/` folder.

<br>


<!----------------------------------------------------------------------------->

[RetroArch]: https://github.com/libretro/RetroArch
[Fork]: https://github.com/ethanaobrien/RetroArch

[GPLv3]: cores/LICENSE

<!-------------------------------{ Dependencies }------------------------------>

[Build Essential]: https://packages.ubuntu.com/focal/build-essential
[BinUtils]: https://www.gnu.org/software/binutils/
[PkgConf]: http://pkgconf.org/
[Python]: https://www.python.org/
[Git]: https://git-scm.com/

<!---------------------------------{ Badges }---------------------------------->

[Badge GPLv3]: https://img.shields.io/badge/License-GPL_3-blue.svg?style=flat
