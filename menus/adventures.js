const { printUserdata, deleteClrs, parseFile } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus, game_configs } = require('../globals');

const HndlPlayAdvMainMenu = async (userdata, data) => {
    if(data == 'Back') {
        gMenus.get('playstart')(userdata).show();
        return;
    }
    console.clear();
    gMenus.get('begin_adventure')(userdata, data).show();
}
module.exports = {   
    menu(userdata, args){
        printUserdata(userdata, {x: 40, y: 2});
        const advfile = parseFile(`./${game_configs['adventures']}`);
        const options = [];
        const params = [];
        for (const [key, value] of Object.entries(advfile.list)) {
            options.push([value.replaceAll('$lvl', (advfile[key] && advfile[key].reqlvl) ? advfile[key].reqlvl : 0)]);
            params.push([key]);
        }
        options.push(['Back']);
        params.push(['Back']);
        return new Selector({
            question:   "Оберіть локацію для пригод:\nБудьте обережними, бо зберегти свій поточний прогрес можливо лише після пригоди",
            options:    options,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlPlayAdvMainMenu, userdata);
    }
};

module.exports.info = {
    name: "adventure"
}