const { printUserdata, saveSave } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, Skillmap, Skills_list } = require('../globals');

const HndlMainInspectMenu = async (userdata, data) => {
    if(data == 'Back') {
        gMenus.get('playstart')(userdata).show();
        return;
    }
    console.clear();
    gMenus.get(`skill_inspect`)(userdata, data).show();
}
module.exports = {
    menu(userdata, args){
        printUserdata(userdata, {x: 40, y: 1});
        const params = [];
        const options = [];
        const kes = Object.keys(userdata.skills);
        
        for(let i = 0; i < kes.length; i++){
            if(!Skills_list.includes(kes[i])){
                delete userdata.skills[kes[i]];
                saveSave(userdata);
                continue;
            }
            const skillname = userdata.skills[kes[i]].displayName;
            params[Math.floor(i/3)] ??= [];
            options[Math.floor(i/3)] ??= [];

            params[Math.floor(i/3)].push(kes[i]);
            options[Math.floor(i/3)].push(skillname.length < 10 ? skillname : skillname.slice(0, 8) + '.. ');
        }

        params.push(['Back']);
        options.push(['Back']);
        return new Selector({
            question:   'Select Skill to inspect:',
            options:    options,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlMainInspectMenu, userdata);
    }
};

module.exports.info = {
    name: "skills_inspection"
}