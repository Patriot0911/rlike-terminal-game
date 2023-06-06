'use strict';
const { takeDamage, printUserdata, clrlog, randomInt, sleep, addXp, lvlUpProcedure } = require('./utils');
const { Skills_list, Skillmap, enemiesSkills } = require('./globals');
const { Selector } = require('./classes/selector');

const clearTempFights = (userdata) => {
    delete userdata.temp.efects;
};

const HndlFightMain = async (userdata, data, pack) => {
    if(data === 'Run'){
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
        clearTempFights(userdata);
        await sleep(3000);
        pack.gotoFunc(userdata, pack.arg, false, 0);
        return;
    }
    Skillmap.get(data).callback(userdata, userdata.temp.enemy, userdata.skills[data].lvl);
    await sleep(5000);
    if(userdata.temp.enemy.health > 0){
        const activs = {...userdata.temp.enemy.skills};
        const startkeys = Object.keys(userdata.temp.enemy.skills);
        for(let i = 0; i < startkeys.length; i++){
            if(enemiesSkills['skills'].get(startkeys[i]).event !== 'active'){
                delete activs[startkeys[i]];
            }
        }
        const keys = Object.keys(activs);
        if(keys.length !== 0){
            const skill = keys[Math.floor(Math.random()*keys.length)];
            clrlog('{red}Хід Суперника{/red}');
            enemiesSkills['skills'].get(skill).callback(userdata, userdata.temp.enemy, userdata.temp.enemy.skills[skill].lvl);
            await sleep(6500);
        }
    }
    console.clear();
    FightMain(userdata, pack);
}

const FightMain = (userdata, pack) => {
    printUserdata(userdata, {x: 40, y: 1}, 1, 1);
    if(userdata.temp.health <= 0){
        pack.gotoFunc(userdata, pack.arg, false, 0);
        clearTempFights(userdata);
        return;
    }else if(userdata.temp.enemy.health <= 0){
        pack.gotoFunc(userdata, pack.arg, true, userdata.temp.enemy.xp);
        clearTempFights(userdata);
        return;
    }
    if(userdata.temp.lvluped){
        lvlUpProcedure(userdata, [FightMain, pack]).show();
        return;
    }
    const params = [];
    const options = [];
    const kes = Object.keys(userdata.skills);
    for(let i = 0; i < kes.length; i++){
        if(!Skills_list.includes(kes[i])){
            delete userdata.skills[kes[i]];
            saveSave(userdata);
            continue;
        }
        if(Skillmap.get(kes[i]).event !== 'active') continue;
        const skillname = userdata.skills[kes[i]].displayName;
        params[Math.floor(i/3)] ??= [];
        options[Math.floor(i/3)] ??= [];

        params[Math.floor(i/3)].push(kes[i]);
        options[Math.floor(i/3)].push(skillname.length < 10 ? skillname : skillname.slice(0, 8) + '.. ');
    }    
    options.push(['Втеча']);
    params.push(['Run']);    
    return new Selector({
        question:   'Оберіть дію:',
        options:    options,
        params:     params,
        begin: {
            x: 0,
            y: 0
        }
    }, HndlFightMain, userdata, '$data', pack).show();
}

const beginFight = (userdata, pack) => {
    userdata.temp.efects ??= {};
    FightMain(userdata, pack);
};

module.exports = {
    beginFight
};