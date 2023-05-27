const fs = require('fs');
const stdout = process.stdout;
const { Item } = require('./classes/item');
const { clrs, game_configs } = require('./globals');


const getDisplayItemName = (name) => {
    return undefined;
}

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
            if(l.length > len){
                len = l.length;
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

const deleteSave = (key) => {
    const saveFile = parseFile(`./${game_configs['saves']}`);
    delete saveFile[key];
    fs.writeFileSync(`./${game_configs['saves']}`, JSON.stringify(saveFile), {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    });
}

module.exports = {
    getDisplayItemName,
    replaceClr,
    clrlog,
    hideCursor,
    showCursor,
    exit,
    sleep,
    longest,
    deleteSave,
    parseFile
};