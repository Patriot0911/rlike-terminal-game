const { Selector } = require('../classes/selector');
const { printUserdata, sleep, clrlog, addXp, countSpaces } = require('../utils');
const { game_configs, gMenus } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)

const HndlRabbitLeftEnd = async (userdata, data) => {
    console.clear();
    const xp = 15;
    if(userdata.relationship && userdata.relationship.rabbit){
        clrlog("Схоже, що ви вже колись зустрічали цього кролика.\nНавіть згадали його ім'я. Його звати {magenta}[Саймон]{/magenta}.\nЩо-ж, тоді привітаєтесь з ним іншим разом, а поки потрібно продовжувати свою подорож.");
        clrlog(`Отримано {green}[${xp}]{/green} досвіду, за зустріч зі старим знайомим`)
        addXp(userdata, xp);
    }else{
        clrlog("Розмови з дурними кролями ні до чого не призведуть, тож краще їх уникати...");
        clrlog(`Вилучено {red}${xp}{/red} досвіду, за асоціальність`);
        addXp(userdata, xp*-1);
    }
    await sleep(6000);
    gMenus.get('random_adv')(userdata, data).show();
}

const HndlRabbitEnd = async (userdata, data) => {
    console.clear();
    const xp = 30
    clrlog("Інформативні розмови з істотами цього світу ніколи не перестають вас дивувати, але чому б і ні?");
    clrlog(`Отримано {green}[${xp}]{/green} досвіду, за інформативну зустріч`);
    addXp(userdata, xp);
    await sleep(6000);
    gMenus.get('random_adv')(userdata, data).show();
}

const rabbit_3 = (userdata, data) => {
    console.clear();
    let str = phrases['rabbit_knowledge_3'];
    if(userdata.relationship && userdata.relationship.rabbit){
        str = phrases['rabbit_knowledge_again'];
    }else{
        userdata.relationship = {};
        userdata.relationship.rabbit = 1;
    }
    printUserdata(userdata, {x: 40, y: countSpaces(str)}, 1);
    return new Selector({
        question:   str,
        options:    [['Next']],
        params:     [['Next']],
        begin: {
            x: 0,
            y: 0
        }
    }, HndlRabbitEnd, userdata, data).show();
}

const rabbit_2 = (userdata, data) => {
    console.clear();
    const answer = data.split('|');
    if(answer[1] === '0'){
        return HndlRabbitLeftEnd(userdata, answer[0]);
    }
    const str = phrases['rabbit_knowledge_2'];
    printUserdata(userdata, {x: 40, y: countSpaces(str)}, 1);
    return new Selector({
        question:   str,
        options:    [['Next']],
        params:     [['Next']],
        begin: {
            x: 0,
            y: 0
        }
    }, rabbit_3, userdata, answer[0]).show();
}

module.exports = {
    action(userdata, args){
        const str = phrases['rabbit_knowledge_1'];
        printUserdata(userdata, {x: 40, y: countSpaces(str)}, 1);
        return new Selector({
            question:   str,
            options:    [['Почати бесіду'], ['Пройти повз']],
            params:     [[1], [0]],
            begin: {
                x: 0,
                y: 0
            }
        }, rabbit_2, userdata, `${args}|$data`);
    }
};

module.exports.info = {
    name: "rabbit_knowledge",
    cat:  "wander_the_world"
}