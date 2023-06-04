const { sleep, clrlog, takeDamage } = require('../utils');
const { gMenus, dmg_types } = require('../globals');

const HndlUnluckyEven = async (userdata, data) => {
    console.clear();
    const dmg = await takeDamage(userdata, dmg_types.poison, Math.round(Math.random()*5)+1)
    clrlog(`Отримано {red}${dmg}{/red} шкоди від отрути`);
    await sleep(1000);
    console.clear();
    gMenus.get('random_adv')(userdata, data).show();
}

module.exports = {
    action(userdata, args){
        return gMenus.get('phrase_menu')(userdata, args, HndlUnluckyEven, 'unlucky_evening', 1);
    }
};

module.exports.info = {
    name: "unlucky_evening",
    cat:  "wander_the_world"
}