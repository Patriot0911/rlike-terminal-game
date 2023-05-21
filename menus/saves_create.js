const { gMenus } = require('../globals');
const { QuestionLine } = require('../classes/input_menu'); 
const readline = require('readline');

const HndlSavesCreateMainMenu = (userdata, data) => {
    console.log(data);
    // console.clear();
    if(data == 'None'){
        console.log('U cannot create save with such name');
        const menu = gMenus.get('savesmainmenu')(undefined, {
            x: 0,
            y: 2
        }).show();
    }
}

module.exports = {   
    menu(userdata, args){
        return new QuestionLine({
            question: 'Enter the save name:',
            maxlength: 16,
            x: 0,
            y: 0
        }, HndlSavesCreateMainMenu);
    }
};

module.exports.info = {
    name: "savescreatemenu"
}