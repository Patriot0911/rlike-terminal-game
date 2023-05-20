const Skillmap = new Map();
const Skills_list = [];

const gMenus = new Map();

const game_configs = {
    'saves': 'configs/saves.json'
};

const iTypes = {
    'weapon':   1,
    'armor':    2,
    'amulet':   3
};

const wTypes = {
    'melee':    1,
    'ranged':   2,
    'spell':    3
};

const clrs = {
    default:    '\x1b[0m',
    red:        '\x1b[31m',
    green:      '\x1b[32m',
    yellow:     '\x1b[33m',
    blue:       '\x1b[34m',
    magenta:    '\x1b[35m',
    white:      '\x1b[37m',
    black:      '\x1b[30m',
};

module.exports = {
    iTypes, wTypes,
    clrs,
    Skillmap, Skills_list,
    game_configs,
    gMenus
};