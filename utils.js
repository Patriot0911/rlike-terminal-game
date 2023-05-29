const fs = require('node:fs');
const rdl = require('node:readline');
const stdout = process.stdout;
const { Item } = require('./classes/item');
const { clrs, game_configs, lvlxp } = require('./globals');


const replaceClr = (str, index = 0) => {
    index = str.indexOf('{', index)+1;
    if(index !== -1){
        const buffer = str.slice(index, str.indexOf('}'));
        if(clrs[buffer]){ 
            str = str.replace(`{${buffer}}`, clrs[buffer]).replace(`{/${buffer}}`, clrs['default']);
        }
    }
    return str.indexOf('{', index) !== -1 ? replaceClr(str, index) : str;
};

const deleteClrs = (str, index = 0) => {
    index = str.indexOf('{', index)+1;
    if(index !== -1){
        const buffer = str.slice(index, str.indexOf('}'));
        if(clrs[buffer]){ 
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
    const saveFile = parseFile(`./${game_configs['saves']}`);
    saveFile[userdata.temp.keyname] = userdata;
    delete saveFile[userdata.temp.keyname].temp;
    fs.writeFileSync(`./${game_configs['saves']}`, JSON.stringify(saveFile), {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    });    
}

const deleteSave = (key) => {
    const saveFile = parseFile(`./${game_configs['saves']}`);
    delete saveFile[key];
    fs.writeFileSync(`./${game_configs['saves']}`, JSON.stringify(saveFile), {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    });
}

const printUserdata = (userdata, coords = { x: 0, y: 0 }) => {
    rdl.cursorTo(stdout, coords.x, coords.y);
    const max = userdata.name.length+40;
    stdout.write('╔'.padEnd(max, '═') + '╗\n');
    rdl.cursorTo(stdout, coords.x, coords.y+1);
    stdout.write(('║Name: ' + userdata.name).padEnd(max, ' ') + '║\n');
    rdl.cursorTo(stdout, coords.x, coords.y+2);
    stdout.write(('║Level: ' + userdata.lvl).padEnd(max, ' ') + '║\n');
    rdl.cursorTo(stdout, coords.x, coords.y+3);
    stdout.write(('║Xp: ' + userdata.xp + '/' + lvlxp(userdata.lvl)).padEnd(max, ' ') + '║\n');
    rdl.cursorTo(stdout, coords.x, coords.y+4);
    stdout.write('║Stats:'.padEnd(max, ' ') + '║\n');

    rdl.cursorTo(stdout, coords.x, coords.y+5);
    stdout.write('║╔'.padEnd(max-1, '═') + '╗║\n');
    const keys = Object.keys(userdata.ups);
    for(let i = 0; i < keys.length; i++){
        rdl.cursorTo(stdout, coords.x, coords.y+6+i);
        stdout.write(`║║${keys[i]}: ${userdata.ups[keys[i]]}`.padEnd(max-1, ' ') + '║║\n');
    }
    rdl.cursorTo(stdout, coords.x, coords.y+6+keys.length);
    stdout.write('║╚'.padEnd(max-1, '═') + '╝║\n');
    rdl.cursorTo(stdout, coords.x, coords.y+7+keys.length);
    stdout.write('╚'.padEnd(max, '═') + '╝\n');
}

module.exports = {
    replaceClr, deleteClrs, clrlog,
    hideCursor, showCursor,
    exit, sleep,
    longest,
    deleteSave, parseFile, saveSave,
    printUserdata
};