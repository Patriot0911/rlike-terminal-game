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
            question: 'Вітаємо вас у цьому чудовому світі!\nЦей всесвіт є далеко не таким нормальним у нашому розумінні. Приготуйтеся до зустрічі з доволі специфічними створіннями...\nДля початку, дайте ім`я своєму персонажу:',
            maxlength: 8,
            x: 0,
            y: 0
        }, HndlGameBegining, userdata);
    }
};

module.exports.info = {
    name: "game_beginning"
}