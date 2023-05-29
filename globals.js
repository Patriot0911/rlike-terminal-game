const Skills_list = [];
const modEvents = [];

const gMenus = new Map();
const Skillmap = new Map();

const lvlxp = (lvl) => lvl*5+10;

const game_configs = {
    'saves': 'configs/saves.json',
    'gameconf': 'configs/game_conf.json',
    'descript': 'configs/skills_descript.json'
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
    clrs,
    Skillmap, Skills_list, modEvents,
    game_configs,
    lvlxp,
    gMenus
};