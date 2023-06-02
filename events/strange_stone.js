const { Selector } = require('../classes/selector');
const { printUserdata, sleep, clrlog, takeDamage, addXp, countSpaces } = require('../utils');
const { game_configs, gMenus, dmg_types } = require('../globals');
const phrases = require(`../${game_configs["phrases"]}`)

const HndlStrangeStone = async (userdata, data) => {
    const answer = data.split(';')[0];
    console.clear();
    clrlog(phrases[`${data.split(';')[1]}_${answer.split('|')[1]}_${answer.split('|')[0]}`]);
    if(answer === '0|pick' || answer === '0|left'){
        const dmg = await takeDamage(userdata, dmg_types.physic, Math.round(Math.random()*4)+1);
        clrlog(`Ви отримали {red}[${dmg}]{/red} шкоди від укусу`);
    }else if(answer === '1|pick'){
        clrlog(`Ви отримали {green}[10]{/green} очків досвіда від рунічного слова`);
        addXp(userdata, 10);
    }
    await sleep(5000);
    console.clear();
    gMenus.get('random_adv')(userdata, data.split(';')[1]).show();
}

module.exports = {
    action(userdata, args){
        const str = phrases['strange_stone_quest'];
        printUserdata(userdata, {x: 40, y: countSpaces(str)}, 1);
        const options = [
            ['Підібрати'],
            ['Залишити його на землі']
        ];
        const params = Math.floor(Math.random()*2) ? [[`0|pick`], [`1|left`]] : [[`1|pick`], [`0|left`]];
        return new Selector({
            question:   str,
            options:    options,
            params:     params,
            begin: {
                x: 0,
                y: 0
            }
        }, HndlStrangeStone, userdata, `$data;${args}`);
    }
};

module.exports.info = {
    name: "strange_stone",
    cat:  "wander_the_world"
}