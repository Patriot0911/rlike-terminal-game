const { Selector } = require('../classes/selector');
const { printUserdata, sleep, clrlog, addXp, parseFile, exit, takeDamage, randomInt } = require('../utils');
const { game_configs, gMenus } = require('../globals');
const { FightMain } = require('../fight');

const HndlSmallBattle = async (userdata, data) => {
    console.clear();
    const answer = data.split("|");
    if(!parseInt(answer[1])){
        if(Math.round(Math.random()*100) > 50){
            clrlog("Ви успішно змогли втекти від ворога!");
            clrlog("Отримано {green}5{/green} досвіду");
            addXp(userdata, 5);
        }else{
            clrlog("Ваша втеча не була настільки успішною, як вам би хотілося");
            let dmg = randomInt(userdata.temp.enemy.dmg.min, userdata.temp.enemy.dmg.max);
            dmg = await takeDamage(userdata, userdata.temp.enemy.dmgtype, dmg);
            clrlog(`Отримано {red}${dmg}{/red} шкоди`);
        }
        delete userdata.temp.enemy;
        await sleep(3000);
        console.log(answer[0]);
        gMenus.get('random_adv')(userdata, answer[0]).show();
        return;
    }
    const pack = {
        gotoFunc: gMenus.get('random_adv'),
        arg: answer[0],
    }
    FightMain(pack, userdata);
}

module.exports = {
    action(userdata, args){
        const enemies = parseFile(`./${game_configs["enemies"]}`);
        if(!enemies[`${args}_small`]){
            console.error(`Cannt find: "${enemies[`${args}_small`]}" in enemies list`);
            exit();
        }
        const kes = Object.keys(enemies[`${args}_small`]);
        const enemyid = Math.floor(Math.random()*kes.length);
        userdata.temp.enemy = enemies[`${args}_small`][kes[enemyid]];
        userdata.temp.enemy.name = kes[enemyid];
        userdata.temp.enemy.maxhealth = userdata.temp.enemy.health;
        printUserdata(userdata, {x: 40, y: 2}, 1, 1);
        return new Selector({
            question:   `Не все так просто у цьому житті...\nЗненацька на вас напав {red}${userdata.temp.enemy.name}{/red}`,
            options:    [['Дати Бій'], ['Втекти']],
            params:     [['1'], ['0']],
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