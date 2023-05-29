const { saveSave } = require('../utils');
const { QuestionLine } = require('../classes/input_menu');
const { gMenus } = require('../globals');

const HndlGameBegining = async (userdata, data) => {
    if(data == 'Back') {
        gMenus.get('mainmenu')().show();
        return;
    }
    console.clear();
    userdata.name = data;
    saveSave(userdata);
    gMenus.get('playstart')(userdata).show();
}
module.exports = {   
    menu(userdata, args){
        return new QuestionLine({
            question: 'Welcome to the new Adventure World!\nTo begin with, we wanna ask you to type your new Character name:',
            maxlength: 8,
            x: 0,
            y: 0
        }, HndlGameBegining, userdata);
    }
};

module.exports.info = {
    name: "game_beginning"
}