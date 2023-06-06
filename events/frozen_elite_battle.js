const { printUserdata, sleep, clrlog, addXp, pushEnemy, pushSkill } = require('../utils');
const { gMenus, Skills_list, Skillmap } = require('../globals');
const { beginFight } = require('../fight');
const { Selector } = require('../classes/selector');

const HndlselectSkill = async (userdata, data, pack) => {
    console.clear();
    if(data === 'Взяти'){
        clrlog(`Ви отримали нову здібність! [${Skillmap.get(pack[1]).displayName}]`);
        pushSkill(userdata, pack[1]);
    }else{
        clrlog('Ще трапиться можливість отримати цікаву здібність у свій арсенал...');
    }
    await sleep(2000);
    gMenus.get('random_adv')(userdata, pack[0]).show();
};

const selectSkill = async (userdata, data) => {
    console.clear();
    const params = [];
    const options = [];
    const skills = [];
    const sskills = Object.keys(userdata.skills);
    const listkeys = Object.keys(Skills_list);
    for(let i = 0; i < Skills_list.length; i++){
        if(Skillmap.get(Skills_list[i]).cat === 'uncommon' && !sskills.includes(Skills_list[i])){
            skills.push(Skills_list[i]);
        }
    }
    if(skills.length > 0){
        const skill = skills[Math.floor(Math.random()*skills.length)]; 
        return new Selector({
            question:   `Ви можете отримати [${Skillmap.get(skill).displayName}]`,
            options:    [['Взяти'], ['Відхилити']],
            params:     [['Взяти'], ['Відхилити']],
            begin: {
                x: 0,
                y: 0
            }
        }, HndlselectSkill, userdata, '$data', [data, skill]).show();
    }else{
        gMenus.get('random_adv')(userdata, data).show();
    }
};

const battleEnd = async (userdata, data, result, reward) => {
    console.clear();
    if(result){
        clrlog("{green}[Перемога!]{/green}\nВи перемогли Елітного ворога!");
        clrlog(`Отримано {green}[${reward}]{/green} досвіду`);
        addXp(userdata, reward);
        printUserdata(userdata, {x: 40, y: 1}, 1, 1);
        await sleep(3000);
    }else{
        gMenus.get('random_adv')(userdata, data).show();
        return
    }
    delete userdata.temp.enemy;
    selectSkill(userdata, data);
};

const HndlSmallBattle = async (userdata, data) => {
    console.clear();
    pushEnemy(userdata, 'frozen_elite_battle', { random: 1 });
    const pack = {
        gotoFunc: battleEnd,
        arg: data,
    }
    beginFight(userdata, pack);
}

module.exports = {
    action(userdata, args){
        return gMenus.get('phrase_menu')(userdata, args, HndlSmallBattle, 'frozen_way_2', 1);
    }
};

module.exports.info = {
    name: "frozen_elite_battle",
    cat:  "dungeon_frozen"
}