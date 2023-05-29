const rdl = require("readline");
const stdout = process.stdout;
const stdin = process.stdin;
const { exit } = require('../utils.js');

class QuestionLine {
    constructor(args, nextFunc, userdata = undefined)
    {
        this.question       = args.question;
        this.gotoFunc       = nextFunc;
        this.user           = userdata;
        this.maxlength      = args.maxlength;
        this.begin = {
            x: args.x,
            y: args.y
        };
        this.answer = '';
    }
    show() {
        rdl.cursorTo(stdout, this.begin.x, this.begin.y);
        stdout.write(this.question + '\n');
        this.begin.y += this.question.match((/\n/g) || []) ? this.question.match((/\n/g) || []).length : 1;
        rdl.cursorTo(stdout, this.begin.x, this.begin.y+1);
        stdin.setRawMode(true);
        stdin.setEncoding('utf-8');
        stdin.on("data", this.pn(this));        
    }
    pn(self) {
        return (key) => {
            if(key == '\u0004' || key == '\r' || key == '\n'){
                return self.enter()
            }
            if(key == '\u0003'){
                return exit();
            }
            rdl.cursorTo(stdout, this.begin.x, this.begin.y+1);
            if(key == '\b'){
                if(this.answer.length > 0){
                    this.answer = this.answer.slice(0, -1);
                    console.log(`[${this.answer}] `);
                }
                return;
            }
            if(this.answer.length >= this.maxlength || key.toString().trim().length > 1)
                return;
            this.answer += key.toString().trim();
            console.log(`[${this.answer}]`);
        }
    }
    enter() {
        stdin.removeAllListeners('data');
        stdin.setRawMode(false);
        console.clear();
        rdl.cursorTo(stdout, 0, 0);
        this.gotoFunc(this.user, this.answer.length > 0 ? this.answer : 'None');
    }
}

module.exports = {
    QuestionLine
}