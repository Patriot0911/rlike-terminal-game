const { countAbbLvl } = require('../utils');
const { Selector } = require('../classes/selector');

const HndllvlUpAbb = (userdata, data, pack) => {
    console.clear();
    if(data === 'Skip'){
        if(pack[2]){
            pack[0](userdata, pack[1]).show();
        }else{
            pack[0](userdata, pack[1]);
        }
        return;
    }
    ++userdata.skills[data].lvl;
    if(userdata.lvl > countAbbLvl(userdata)){
        gMenus.get('lvlupabb')(userdata, pack).show();
    }else{
        if(pack[2]){
            pack[0](userdata, pack[1]).show();
        }else{
            pack[0](userdata, pack[1]);
        }
    }
};

module.exports = {   
    menu(userdata, pack){
        const options = [];
        const params = [];
        const keys = Object.keys(userdata.skills);
        for (let i = 0; i < keys.length; i++) {
            options.push([`${userdata.skills[keys[i]].displayName} [${userdata.skills[keys[i]].lvl}]`]);
            params.push([keys[i]]);
        }
        options.push(['Skip']);
        params.push(['Skip']);
    
        return new Selector({
            question:   "Оберіть здібність для покращення:",
            options:    options,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndllvlUpAbb, userdata, `$data`, pack);
    }
};

module.exports.info = {
    name: "lvlupabb"
}