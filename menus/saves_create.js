const { gMenus } = require('../globals');
const readline = require('readline');

const HndlSavesCreateMainMenu = (userdata, data) => {
    console.log(data);
    gMenus.get('mainmenu')().show();
}

module.exports = {   
    menu(userdata, args){

        // return QuestionLine;
    }
};

module.exports.info = {
    name: "savescreatemenu"
}