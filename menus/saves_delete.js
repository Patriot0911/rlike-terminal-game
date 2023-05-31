const { clrlog, sleep, deleteSave, parseFile } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs } = require('../globals');

const HndlSavesDeleteMenu = async (userdata, data) => {
    if(data == 'Back'){
        gMenus.get('savesmainmenu')().show();
        return;
    }
    clrlog(`{green} Deleting save '${data}'...{/green}`);
    deleteSave(data)
    await sleep(1000);
    clrlog(`{green}'${data}' has been deleted!{/green}`);
    await sleep(500);
    console.clear();
    gMenus.get('savesmainmenu')().show();
}

module.exports = {
    menu(userdata, args){
        const params = [];
        const savelist = parseFile(`./${game_configs['saves']}`);
        if(Object.keys(savelist).length){
            for(const item in savelist){
                params.push([item]);
            }
        }
        params.push(['Back']);
        return new Selector({
            question:   `Select Save to delete:`,
            options:    params,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlSavesDeleteMenu);        
    }
};

module.exports.info = {
    name: "savesdeletemenu"
}