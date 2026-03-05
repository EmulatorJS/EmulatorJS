export const version = "4.3.0-beta";

export const cores = {
    "atari5200": ["a5200"],
    "vb": ["beetle_vb"],
    "nds": ["melonds", "desmume", "desmume2015"],
    "arcade": ["fbneo", "fbalpha2012_cps1", "fbalpha2012_cps2", "same_cdi"],
    "nes": ["fceumm", "nestopia"],
    "gb": ["gambatte"],
    "coleco": ["gearcoleco"],
    "segaMS": ["smsplus", "genesis_plus_gx", "genesis_plus_gx_wide", "picodrive"],
    "segaMD": ["genesis_plus_gx", "genesis_plus_gx_wide", "picodrive"],
    "segaGG": ["genesis_plus_gx", "genesis_plus_gx_wide"],
    "segaCD": ["genesis_plus_gx", "genesis_plus_gx_wide", "picodrive"],
    "sega32x": ["picodrive"],
    "sega": ["genesis_plus_gx", "genesis_plus_gx_wide", "picodrive"],
    "lynx": ["handy"],
    "mame": ["mame2003_plus", "mame2003"],
    "ngp": ["mednafen_ngp"],
    "pce": ["mednafen_pce"],
    "pcfx": ["mednafen_pcfx"],
    "psx": ["pcsx_rearmed", "mednafen_psx_hw"],
    "ws": ["mednafen_wswan"],
    "gba": ["mgba"],
    "n64": ["mupen64plus_next", "parallel_n64"],
    "3do": ["opera"],
    "psp": ["ppsspp"],
    "atari7800": ["prosystem"],
    "snes": ["snes9x", "bsnes"],
    "atari2600": ["stella2014"],
    "jaguar": ["virtualjaguar"],
    "segaSaturn": ["yabause"],
    "amiga": ["puae"],
    "c64": ["vice_x64sc"],
    "c128": ["vice_x128"],
    "pet": ["vice_xpet"],
    "plus4": ["vice_xplus4"],
    "vic20": ["vice_xvic"],
    "dos": ["dosbox_pure"],
    "intv": ["freeintv"]
};

export const requiresThreads = ["ppsspp", "dosbox_pure"];

export const requiresWebGL2 = ["ppsspp"];
