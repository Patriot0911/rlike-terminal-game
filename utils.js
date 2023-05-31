const fs = require('node:fs');
const rdl = require('node:readline');
const stdout = process.stdout;
const globals = require('./globals');


const replaceClr = (str, index = 0) => {
    index = str.indexOf('{', index)+1;
    if(index !== -1){
        const buffer = str.slice(index, str.indexOf('}'));
        if(globals.clrs[buffer]){ 
            str = str.replace(`{${buffer}}`, globals.clrs[buffer]).replace(`{/${buffer}}`, globals.clrs['default']);
        }
    }
    return str.indexOf('{', index) !== -1 ? replaceClr(str, index) : str;
};

const deleteClrs = (str, index = 0) => {
    index = str.indexOf('{', index)+1;
    if(index !== -1){
        const buffer = str.slice(index, str.indexOf('}'));
        if(globals.clrs[buffer]){ 
            str = str.replace(`{${buffer}}`, '').replace(`{/${buffer}}`, '');
        }
    }
    return str.indexOf('{', index) !== -1 ? replaceClr(str, index) : str;
};

const clrlog = (str) => {
    console.log(replaceClr(str));
}

const hideCursor = () => {
    stdout.write("\x1B[?25l")
}
const showCursor = () => {
    stdout.write("\x1B[?25h")
}

const exit = () => {
    showCursor();
    process.exit();
}
const sleep = (time) => new Promise(resolve => {
    setTimeout(resolve, time);
});

const longest = (arr) => {
    let len = 0, arrlen = 0;
    for(const i of arr){
        if(arrlen < i.length){
            arrlen = i.length;
        }
        for(const l of i){
            if(deleteClrs(l).length > len){
                len = deleteClrs(l).length;
            }
        }
    }
    return [len, arrlen];
}

const parseFile = (path) =>{
    const saveFile = fs.readFileSync(path, { 
        encoding: 'utf8',
        flag: 'r'
    });
    return JSON.parse(saveFile);
} 

const saveSave = (userdata) => {
    const saveFile = parseFile(`./${globals.game_configs['saves']}`);
    saveFile[userdata.temp.keyname] = {...userdata};
    delete saveFile[userdata.temp.keyname].temp;
    fs.writeFileSync(`./${globals.game_configs['saves']}`, JSON.stringify(saveFile), {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    });

}

const deleteSave = (key) => {
    const saveFile = parseFile(`./${globals.game_configs['saves']}`);
    delete saveFile[key];
    fs.writeFileSync(`./${globals.game_configs['saves']}`, JSON.stringify(saveFile), {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    });
}

const printUserdata = (userdata, coords = { x: 0, y: 0 }, tempbar = 0, enemybar = 0) => {
    const max = userdata.name.length+40;
    if(tempbar && userdata.temp){
        let scoords = {...coords};
        scoords.x += max+2;
        rdl.cursorTo(stdout, scoords.x, scoords.y);
        stdout.write('╔'.padEnd(25, '═') + '╗\n');
        rdl.cursorTo(stdout, scoords.x, ++scoords.y);
        stdout.write(`║❤️  ${userdata.temp.health}/${globals.maxhealth(userdata.lvl, userdata.ups.health)}`.padEnd(25, ' ') + ' ║\n');
        rdl.cursorTo(stdout, scoords.x, ++scoords.y);
        stdout.write(`║🔮 ${userdata.temp.mana}/${globals.maxmana(userdata.lvl, userdata.ups.intelligence)}`.padEnd(25, ' ') + '║\n');
        rdl.cursorTo(stdout, scoords.x, ++scoords.y);
        stdout.write('╚'.padEnd(25, '═') + '╝\n');
        if(enemybar && userdata.temp.enemy){
            scoords = {...coords};
            scoords.x += max +30;
            rdl.cursorTo(stdout, scoords.x, scoords.y);
            stdout.write('╔'.padEnd(25, '═') + '╗\n');
            rdl.cursorTo(stdout, scoords.x, ++scoords.y);
            stdout.write(` ║Name: ${userdata.temp.enemy.name}`.padEnd(25, ' ') + ' ║\n');
            rdl.cursorTo(stdout, scoords.x, ++scoords.y);
            stdout.write(`║❤️  ${userdata.temp.enemy.health}/${userdata.temp.enemy.maxhealth}`.padEnd(25, ' ') + ' ║\n');
            rdl.cursorTo(stdout, scoords.x, ++scoords.y);
            stdout.write(`║⚔️  ${userdata.temp.enemy.dmg.min}~${userdata.temp.enemy.dmg.max}`.padEnd(25, ' ') + ' ║\n');
            rdl.cursorTo(stdout, scoords.x, ++scoords.y);
            stdout.write('╚'.padEnd(25, '═') + '╝\n');
        }
    }
    rdl.cursorTo(stdout, coords.x, coords.y);
    stdout.write('╔'.padEnd(max, '═') + '╗\n');
    rdl.cursorTo(stdout, coords.x, ++coords.y);
    stdout.write(('║Name: ' + userdata.name).padEnd(max, ' ') + '║\n');
    rdl.cursorTo(stdout, coords.x, ++coords.y);
    stdout.write(('║Level: ' + userdata.lvl).padEnd(max, ' ') + '║\n');
    rdl.cursorTo(stdout, coords.x, ++coords.y);
    stdout.write(('║Xp: ' + userdata.xp + '/' + globals.lvlxp(userdata.lvl)).padEnd(max, ' ') + '║\n');
    rdl.cursorTo(stdout, coords.x, ++coords.y);
    stdout.write('║Stats:'.padEnd(max, ' ') + '║\n');
    rdl.cursorTo(stdout, coords.x, ++coords.y);
    stdout.write('║╔'.padEnd(max-1, '═') + '╗║\n');
    ++coords.y;
    const keys = Object.keys(userdata.ups);
    for(let i = 0; i < keys.length; i++){
        rdl.cursorTo(stdout, coords.x, coords.y+i);
        stdout.write(`║║${keys[i]}: ${userdata.ups[keys[i]]}`.padEnd(max-1, ' ') + '║║\n');
    }
    rdl.cursorTo(stdout, coords.x, coords.y+keys.length);
    stdout.write('║╚'.padEnd(max-1, '═') + '╝║\n');
    rdl.cursorTo(stdout, coords.x, ++coords.y+keys.length);
    stdout.write('╚'.padEnd(max, '═') + '╝\n');
}

const takeDamage = async (userdata, type = globals.dmg_types.absolute, count) => {
    let dmg = count,
        buffer;
    const kes = Object.keys(userdata.skills);
    for(let i = 0; i < kes.length; i++){
        if(!globals.Skills_list.includes(kes[i])){
            delete userdata.skills[kes[i]];
            continue;
        }
        buffer = globals.Skillmap.get(kes[i]);
        if(buffer.event === 'damage_taken'){
            dmg = await buffer.callback(userdata, userdata.skills[kes[i]].lvl, type, dmg);
        }
    }
    dmg = Math.round(dmg * 10) / 10;
    if(dmg < 0){
        if(userdata.temp.health+Math.abs(dmg) < globals.maxhealth(userdata.lvl, userdata.temp.health)){
            userdata.temp.health+=Math.abs(dmg);
        }else{
            userdata.temp.health = globals.maxhealth(userdata.lvl, userdata.temp.health);
        }
    }else{
        userdata.temp.health -= dmg;
    }
    userdata.temp.health =  Math.round(userdata.temp.health*10)/10;
    return dmg;
}

const dealDamage = async (userdata, type = dmg_types.physic, count) => {
    let dmg = count,
        buffer;
    const kes = Object.keys(userdata.temp.enemy.skills);
    for(let i = 0; i < kes.length; i++){
        if(!globals.enemiesSkills['skills_list'].includes(kes[i])){
            delete userdata.temp.enemy.skills[kes[i]];
            continue;
        }
        buffer = globals.enemiesSkills['skills'].get(kes[i]);
        if(buffer.event === 'damage_taken'){
            dmg = await buffer.callback(userdata, userdata.temp.enemy.skills[kes[i]].lvl, type, dmg);
        }
    }
    if(userdata.temp.enemy.resist !== 'none' && userdata.temp.enemy.resist.type === type){
        dmg *= (userdata.temp.enemy.resist.proc/100);
    }
    dmg = Math.round(dmg * 10) / 10;
    if(dmg < 0){
        if(userdata.temp.enemy.health+Math.abs(dmg) >= userdata.temp.enemy.maxhealth){
            userdata.temp.enemy.health = userdata.temp.enemy.maxhealth;
        }else{
            userdata.temp.enemy.health += Math.abs(dmg);
        }
    }else{
        userdata.temp.enemy.health -= dmg;
    }
    userdata.temp.enemy.health =  Math.round(userdata.temp.enemy.health*10)/10;
    return dmg;
}

const addXp = (userdata, count, print = 1) => {
    if(count < 0){
        if(userdata.xp >= count){
            userdata += count;
        }else{
            userdata.xp = 0;
        }
        return;
    }
    userdata.xp += count;
    const curlvl = userdata.lvl;
    while(globals.lvlxp(userdata.lvl) <= userdata.xp){
        userdata.xp-=globals.lvlxp(userdata.lvl);
        ++userdata.lvl;
    }
    if(curlvl !== userdata.lvl && print){
        clrlog(`{green}[LvlUp] ${curlvl} ➢  ${userdata.lvl}{/green}`);
    }
}

const parseExpres = (str) => {
    return Function(`'use strict'; return (${str})`)();
}

const randomInt = (min, max) => (min+Math.floor(Math.random()*(max-min)));

module.exports = {
    replaceClr, deleteClrs, clrlog,
    hideCursor, showCursor,
    exit, sleep,
    longest, parseExpres, randomInt,
    deleteSave, parseFile, saveSave,
    printUserdata, takeDamage, dealDamage, addXp
};