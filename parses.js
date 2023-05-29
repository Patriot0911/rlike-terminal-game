const { Skillmap, Skills_list, modEvents, gMenus } = require('./globals.js');
const fs = require('fs');

module.exports = {
    skills ()
    {
        let count_s = 0;
        const itemskills = fs.readdirSync('./skills');
        for (const file of itemskills){
            const skill = require(`./skills/${file}`);
            if(!skill.info || !skill.callback)
                continue;
            Skillmap.set(skill.info.name, {
                name:           skill.info.name,
                displayName:    skill.info.displayName,
                lvl:            skill.info.required,
                type:           skill.info.type,
                event:          skill.info.expected_event,
                callback:       skill.callback
            });
            Skills_list.push(skill.info.name);
            ++count_s;
            console.log(`Loaded ${skill.info.name}`);
        }
        return count_s;
    },
    menus ()
    {
        let count_m = 0;
        const fmenus = fs.readdirSync('./menus');
        for (const file of fmenus){
            const mn = require(`./menus/${file}`);
            if(!mn.info || !mn.menu)
                continue;
            gMenus.set(mn.info.name, mn.menu);
            ++count_m;
        }
        return count_m;
    },
    events ()
    {
        let count_e = 0;
        const fevents = fs.readdirSync('./events');
        for (const file of fevents){
            const ev = require(`./events/${file}`);
            if(!ev.info.cat || !ev.info.name)
                continue;
            if(!modEvents[ev.cat]){
                modEvents[ev.cat] = new Map();
                modEvents[`${ev.cat}_list`] = [];
            }
            modEvents[ev.cat].set(ev.name, ev.action);
            modEvents[`${ev.cat}_list`].push(ev.name);
            ++count_e;
        }
        return count_e;
    }
}