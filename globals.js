const Skills_list = [];
const modEvents = [];
const enemiesSkills = [];

const gMenus = new Map();
const Skillmap = new Map();

const lvlxp = (lvl) => lvl*5+10;
const maxhealth = (lvl, health) => 15+lvl*2+health*5;
const maxmana = (lvl, intelligence) => lvl+intelligence;

const game_configs = {
    'saves':        'configs/saves.json',
    'gameconf':     'configs/game_conf.json',
    'enemies':      'configs/enemies.json',
    'descript':     'configs/skills_descript.json',
    'phrases':      'configs/phrases.json',
    'adventures':   "configs/adventures.json"
};

const clrs = {
    default:    '\x1b[0m',
    red:        '\x1b[31m',
    green:      '\x1b[32m',
    yellow:     '\x1b[33m',
    blue:       '\x1b[34m',
    magenta:    '\x1b[35m',
    white:      '\x1b[37m',
    black:      '\x1b[30m'
};

const dmg_types = {
    absolute:   -1,
    physic:     0,
    magic:      1,
    poison:     2,
    fire:       3,
    advphysic:  4
};

module.exports = {
    clrs, dmg_types,
    Skillmap, Skills_list, modEvents, enemiesSkills,
    game_configs,
    lvlxp, maxhealth, maxmana,
    gMenus
};