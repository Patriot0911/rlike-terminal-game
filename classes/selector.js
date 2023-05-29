const rdl = require('node:readline');
const { replaceClr, deleteClrs, exit, longest } = require('../utils.js');
const stdout = process.stdout;
const stdin = process.stdin;


class Selector {
    constructor(args, nextFunc, userdata = undefined, params = '$data')
    {
        this.question       = args.question;
        this.options        = args.options;
        this.params         = args.params;
        this.gotoFunc       = nextFunc;
        this.callbackArgs   = params;
        this.user           = userdata;
        this.cursor = {
            y: 0,
            x: 0
        };
        this.begin = {
            x: args.begin.x,
            y: args.begin.y
        };
    }
    
    setQuest(str) {
        this.question = str;
        return this;
    }
    setCoords(args) {
        this.begin.x = args.x ? args.x : this.begin.x;
        this.begin.y = args.y ? args.y : this.begin.y;
        return this;
    }
    setOptions(opt, params) {
        this.options = opt ? opt : this.options;
        this.params  = params ? params : this.options
        return this;
    }
    setCallback(func, params = '$data'){
        this.gotoFunc       = func;
        this.callbackArgs   = params;
        return this;
    }
    
    show() {
        rdl.cursorTo(stdout, this.begin.x, this.begin.y);
        stdout.write(this.question);
        this.begin.y += this.question.match((/\n/g) || []) ? this.question.match((/\n/g) || []).length : 0;
        rdl.cursorTo(stdout, this.begin.x, this.begin.y+1);
        const leng = longest(this.options);
        stdout.write('╔'.padEnd(leng[1]*leng[0]+(leng[1] === 1 ? 1 : 2*leng[1]), '═') + '╗\n');
        for(let i = 0; i < this.options.length; i++){
            if(typeof this.options[i] === 'object'){
                const item = this.options[i];
                if(item.length === 0 )
                    return;

                for(let k = 0; k < leng[1]; k++){
                    rdl.cursorTo(stdout, this.begin.x+(k === 0 ? 0 : k*leng[0]+1+k*2), this.begin.y+i+2)
                    const str = item[k] ? item[k] : ' ';
                    stdout.write((k === 0 ? '║' : ' ') +
                        (i === 0 && k === 0 ? replaceClr(`{green}${deleteClrs(str).padEnd(leng[0])}{/green}`) : replaceClr(str).padEnd(leng[0])) + 
                        (k === leng[1]-1 ?  '║\n' : '│'));
                }
            }
        }
        rdl.cursorTo(stdout, this.begin.x, this.begin.y+this.options.length+2)
        stdout.write('╚'.padEnd(leng[1]*leng[0]+(leng[1] === 1 ? 1 : 2*leng[1]), '═') + '╝\n');
        stdin.setRawMode(true)
        stdin.setEncoding('utf-8')
        stdin.on("data", this.pn(this))
    }

    pn(self) {
        return (key) => {
            if(key == '\u0004' || key == '\r' || key == '\n'){
                return self.enter()
            }else{
                if(key != '\u0003'){
                    return self.arrow(key);
                }
                return exit();
            }
        }
    }
    
    arrow(direction) {
        let y = this.cursor.y,
            x = this.cursor.x;
        const leng = longest(this.options);
        rdl.cursorTo(stdout, this.begin.x+(x === 0 ? 1 : x*leng[0]+1+x*2), this.begin.y+y+2)
        stdout.write((x === 0 ? '' : ' ') + replaceClr(this.options[y][x]))
        switch(direction){
            case '\u001b[A':
                if (this.cursor.y === 0) {
                    if(!this.options[this.options.length-1][x]) break;
                    this.cursor.y = this.options.length-1;
                } else {
                    if(!this.options[this.cursor.y-1][x]) break;
                    this.cursor.y--;
                }
            break;
            case '\u001b[B':
                if (this.cursor.y === this.options.length-1) {
                    if(!this.options[0][x]) break;
                    this.cursor.y = 0;
                } else {
                    if(!this.options[this.cursor.y+1][x]) break;
                    this.cursor.y++
                }
            break;
            case '\u001b[D':
                if(this.options[y].length > 1){
                    if (this.cursor.x === 0) {
                        this.cursor.x = this.options[y].length-1;
                    } else {
                        this.cursor.x--;
                    }
                }
            break;
            case '\u001b[C':
                if(this.options[y].length > 1){
                    if (this.cursor.x === this.options[y].length-1) {
                        this.cursor.x = 0;
                    } else {
                        this.cursor.x++;
                    }
                }
            break;
        }
        y = this.cursor.y;
        x = this.cursor.x;
        rdl.cursorTo(stdout, this.begin.x+(x === 0 ? 1 : x*leng[0]+1+x*2), this.begin.y+y+2)
        stdout.write(replaceClr((x === 0 ? '' : ' ') + `{green}${deleteClrs(this.options[y][x])}{/green}`))
    }

    enter() {
        stdin.removeAllListeners('data')
        stdin.setRawMode(false);
        console.clear();
        rdl.cursorTo(stdout, 0, 0);
        const answ_data = this.params[this.cursor.y].length > 0 ? this.params[this.cursor.y][this.cursor.x] : this.params[this.cursor.y];
        const args = this.callbackArgs.replace('$data', answ_data);
        this.gotoFunc(this.user, args);
    }
}

module.exports = {
    Selector
}