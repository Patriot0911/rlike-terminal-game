const { countStatsLvl } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs } = require('../globals');

const HndllvlUpStats = (userdata, data, pack) => {
    console.clear();
    if(data === 'Skip'){
        gMenus.get('lvlupabb')(userdata, pack).show();
        return;
    }
    ++userdata.ups[data];
    if(userdata.lvl > countStatsLvl(userdata)){
        gMenus.get('lvlupstats')(userdata, pack).show();
    }else{
        gMenus.get('lvlupabb')(userdata, pack).show();
    }
};

module.exports = {   
    menu(userdata, pack){
        userdata.temp.lvluped = false;
        console.clear();
        const options = [];
        const params = [];
        for (const [key, value] of Object.entries(userdata.ups)) {
            options.push([`${key} [${value}]`]);
            params.push([key]);
        }
        options.push(['Skip']);
        params.push(['Skip']);
    
        return new Selector({
            question:   "{green}Рівень Підвищено!{/green}\nОберіть параметр для покращення:",
            options:    options,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndllvlUpStats, userdata, `$data`, pack);
    }
};

module.exports.info = {
    name: "lvlupstats"
}