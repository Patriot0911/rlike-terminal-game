const { Selector } = require('../classes/selector');
const { printUserdata, sleep, clrlog, addXp, takeDamage, randomInt, pushEnemy } = require('../utils');
const { gMenus } = require('../globals');
const { beginFight } = require('../fight');

const battleEnd = async (userdata, data, result, reward) => {
    console.clear();
    if(result){
        clrlog("Наші вітання!\nСуперник успішно переможений!");
        clrlog(`Отримано {green}[${reward}]{/green} досвіду`);
        addXp(userdata, reward);
        printUserdata(userdata, {x: 40, y: 1}, 1, 1);
        await sleep(2000);
    }
    delete userdata.temp.enemy;
    gMenus.get('random_adv')(userdata, data).show();
};

const HndlSmallBattle = async (userdata, data) => {
    console.clear();
    const answer = data.split("|");
    switch(answer[1]){
        case 'Дати Бій':
            const pack = {
                gotoFunc: battleEnd,
                arg: answer[0],
            }
            beginFight(userdata, pack);
        break;
        case 'Втекти':
            if(Math.round(Math.random()*100) > 50){
                clrlog("Ви успішно змогли втекти від ворога!");
                clrlog("Отримано {green}[5]{/green} досвіду");
                addXp(userdata, 5);
            }else{
                clrlog("Ваша втеча не була настільки успішною, як вам би хотілося");
                let dmg = randomInt(userdata.temp.enemy.dmg.min, userdata.temp.enemy.dmg.max);
                dmg = await takeDamage(userdata, userdata.temp.enemy.dmgtype, dmg);
                clrlog(`Отримано {red}${dmg}{/red} шкоди`);
            }
            delete userdata.temp.enemy;
            await sleep(3000);
            gMenus.get('random_adv')(userdata, answer[0]).show();
        break; 
    };
}

module.exports = {
    action(userdata, args){
        pushEnemy(userdata, 'forest_fight_small', { random: 1 });
        printUserdata(userdata, {x: 40, y: 2}, 1, 1);
        return new Selector({
            question:   `Не все так просто у цьому житті...\nЗненацька на вас напав {red}${userdata.temp.enemy.name}{/red}`,
            options:    [['Дати Бій'], ['Втекти']],
            params:     [['Дати Бій'], ['Втекти']],
            begin: {
                x: 0,
                y: 0
            }
        }, HndlSmallBattle, userdata, `${args}|$data`);
    }
};

module.exports.info = {
    name: "small_battle",
    cat:  "wander_the_world"
}