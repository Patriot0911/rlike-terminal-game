const { Selector } = require('../classes/selector');
const { gMenus, game_configs, Skills_list, Skillmap } = require('../globals');
const { parseFile, pushSkill, clrlog, sleep } = require('../utils');

const HndlAddSkillToSave = async (userdata, data) => {
    if(data === 'Back'){
        gMenus.get('editormainmenu')().show();
        return;
    }
    console.clear();
    pushSkill(userdata, data);
    clrlog(`Здібність {green}[${data}]{/green} була додана до переліку`);
    await sleep(2000);
    console.clear();
    gMenus.get('editormainmenu')().show();
};

const HndlChooseSave = (emp, data) => {
    console.clear();
    if(data === 'Back'){
        gMenus.get('editormainmenu')().show();
        return;
    }
    const userdata = parseFile(`./${game_configs['saves']}`)[data];
    userdata.temp = {};
    userdata.temp.keyname = data;    
    const params = [];
    const options = [];
    const skills = Object.keys(userdata.skills);
    for(let i = 0, k = 0; i < Skills_list.length; i++){
        if(skills.includes(Skills_list[i])) continue;
        ++k;
        const skillname = Skillmap.get(Skills_list[i]).displayName;
        options[Math.floor(k/3)] ??= [];
        params[Math.floor(k/3)] ??= [];

        options[Math.floor(k/3)].push(skillname.length < 10 ? skillname : skillname.slice(0, 8) + '.. ');
        params[Math.floor(k/3)].push(Skills_list[i]);
    }
    options.push(['Back']);
    params.push(['Back']);
    return new Selector({
        question:   "Оберіть здібність",
        options:    options,
        params:     params,
        begin: {
            x: 0,
            y: 0
        }
    }, HndlAddSkillToSave, userdata).show();
};

const chooseSave = () => {
    const sFile = parseFile(`./${game_configs['saves']}`);
    const params = [];
    const keys = Object.keys(sFile);
    for(let i = 0; i < keys.length; i++){
        params.push([keys[i]]);
    }
    params.push(['Back']);
    return new Selector({
        question:   "Оберіть запис для редактури",
        options:    params,
        params:     params,
        begin: {
            x: 0,
            y: 0
        }
    }, HndlChooseSave);
};


const HndlSaveMain = async (userdata, data) => {
    console.clear();
    switch(data){
        case 'Saves' :
            console.clear();
            chooseSave().show();
        break;
        case 'Back' :
            console.clear();
            gMenus.get('mainmenu')().show();
        break;
    };

};
module.exports = {   
    menu(){
        const params = [
            ['Saves'],
            ['Back']
        ];
        return new Selector({
            question:   " ",
            options:    params,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlSaveMain);
    }
};

module.exports.info = {
    name: "editormainmenu"
}