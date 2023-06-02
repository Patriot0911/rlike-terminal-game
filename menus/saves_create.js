const { gMenus, game_configs } = require('../globals');
const { QuestionLine } = require('../classes/input_menu'); 
const { parseFile, clrlog, sleep } = require('../utils');
const fs = require('fs');

const HndlSavesCreateMainMenu = async (userdata, data) => {
    const menu = gMenus.get('savesmainmenu')();
    if(data == 'None'){
        console.log('U cannot create save with such name');
        menu.setCoords({
            y: 1
        }).show();
        return;
    }
    const saveFile = parseFile(`./${game_configs['saves']}`);
    if(saveFile[data]){
        console.log('U cannot create save with such name');
        menu.setCoords({
            y: 1
        }).show();
        return;
    }
    const conf = parseFile(`./${game_configs['gameconf']}`);
    saveFile[data] = {
        name: 'None',
        lvl:  conf.beginlvl,
        xp:   0,
        ups:
        {
            health:   0,
            strength: 0,
            agility:  0,
            intelligence: 0
        },
        skills: conf.beginskills
    }
    fs.writeFileSync(`./${game_configs['saves']}`, JSON.stringify(saveFile), {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
    });
    clrlog(`{green}Save '${data}' created Successfully!{/green}`);
    await sleep(1500);
    console.clear();
    menu.show();
}

module.exports = {   
    menu(userdata, args){
        return new QuestionLine({
            question: 'Enter the save name (Type "None" to go back)',
            maxlength: 8,
            x: 0,
            y: 0
        }, HndlSavesCreateMainMenu);
    }
};

module.exports.info = {
    name: "savescreatemenu"
}