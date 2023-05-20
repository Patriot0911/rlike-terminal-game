const { Item } = require('./classes/item');
const { clrs } = require('./globals');
const stdout = process.stdout;


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
    let len = 0;
    for(const i of arr){
        if(i.length > len){
            len = i.length;
        }
    }
    return len;
}

const deleteSave = (name) => {
    //
}

module.exports = {
    // regRandom,
    getDisplayItemName,
    replaceClr,
    clrlog,
    hideCursor,
    showCursor,
    exit,
    sleep,
    longest,
    deleteSave
};