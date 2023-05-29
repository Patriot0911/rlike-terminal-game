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
        const params = [ ];
        const options = [ ];
        const buffer = [];
        buffer[0] = [], buffer[1] = [];
        const kes = Object.keys(userdata.skills);
        for(let i = 0; i < kes.length; i++){
            if(!Skills_list.includes(userdata.skills[kes[i]].skill_name)){
                delete userdata.skills[kes[i]];
                saveSave(userdata);
                continue;
            }
            buffer[0].push(userdata.skills[kes[i]].skill_name);
            buffer[1].push(Skillmap.get(userdata.skills[kes[i]].skill_name).displayName.slice(0, 10) + ' ');
            if((i !== 0 && (i+1)%3 === 0) || i == kes.length-1){
                params.push(buffer[0]);
                options.push(buffer[1]);
                buffer[1] = [];
                buffer[0] = [];
            }
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