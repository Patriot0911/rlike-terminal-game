const { printUserdata } = require('../utils');
const { Selector } = require('../classes/selector');
const { gMenus } = require('../globals');

const HndlDeadEndMenu = async (userdata, data) => {
    console.clear();
    gMenus.get('playstart')(userdata).show();
}
module.exports = {
    menu(userdata, args){
        userdata.xp = 0;
        printUserdata(userdata, {x: 40, y: 2}, 1);
        return new Selector({
            question:   `Схоже на цьому не простому шляху життя, вас спіткала невдача, і ви покинули цей світ...\nЯк добре, що цей дивний світ простіший за наш, тож ви всього-то втратили частину свого досвіду.`,
            options:    [["Next"]],
            params:     [["Next"]],
            begin: {
                x: 0,
                y: 0
            }
        }, HndlDeadEndMenu, userdata);
    }
};

module.exports.info = {
    name: "death_in_adv"
}