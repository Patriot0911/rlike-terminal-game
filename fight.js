const { takeDamage, printUserdata } = require('./utils');

const FightMain = (pack, userdata) => {
    printUserdata(userdata, {x: 40, y: 2}, 1, 1);
    if(userdata.health <= 0){
        pack.gotoFunc(pack.arg);
    }
    
}

module.exports = {
    FightMain
};