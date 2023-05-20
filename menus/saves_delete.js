const { clrlog, sleep, deleteSave } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs } = require('../globals');
const fs = require('fs');

const HndlSavesDeleteMenu = async (userdata, data) => {
    clrlog(`{green} Deleting save '${data}'...{/green}`);
    await sleep(5000);
    console.clear();
    // if(deleteSave(data))
    clrlog(`{green}'${data}' has been deleted!{/green}`);
}
module.exports = {   
    menu(userdata, args){
        const saveFile = fs.readFileSync(`./${game_configs['saves']}`,{ encoding: 'utf8', flag: 'r' });
        const params = [];
        const savelist = JSON.parse(saveFile);
        for(const item in savelist){
            params.push([item]);
        }
        return new Selector({
            question:   "Select Save to delete:",
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