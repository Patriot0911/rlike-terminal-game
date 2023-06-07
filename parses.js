'use strict';
const { Skillmap, Skills_list, modEvents, enemiesSkills, gMenus, game_configs } = require('./globals.js');
const fs = require('node:fs');
const { parseFile } = require('./utils.js');

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
                displayName:    skill.info.displayName,
                event:          skill.info.event,
                cat:            skill.info.cat,
                callback:       skill.callback
            });
            Skills_list.push(skill.info.name);
            ++count_s;
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
            if(!modEvents[ev.info.cat]){
                modEvents[ev.info.cat] = new Map();
                modEvents[`${ev.info.cat}_list`] = [];
            }
            modEvents[ev.info.cat].set(ev.info.name, ev.action);
            modEvents[`${ev.info.cat}_list`].push(ev.info.name);
            ++count_e;
        }
        const custFile = parseFile(`./${game_configs["custom_adv"]}`);
        const keys = Object.keys(custFile);
        const techcallback = modEvents['tech'] ? modEvents['tech'].get('custom_event') : null;
        if(keys.length > 0 && techcallback){
            for(let i = 0; i < keys.length; i++){
                if(!custFile[keys[i]].cat) continue;

                if(!modEvents[custFile[keys[i]].cat]){
                    modEvents[custFile[keys[i]].cat] = new Map();
                    modEvents[`${custFile[keys[i]].cat}_list`] = [];
                }
                modEvents[custFile[keys[i]].cat].set(keys[i], techcallback);
                modEvents[`${custFile[keys[i]].cat}_list`].push(keys[i]);
                ++count_e;                
            }
        }
        return count_e;
    },
    eskills ()
    {
        let count_es = 0;
        const fenskills = fs.readdirSync('./enskills');
        for (const file of fenskills){
            const skill = require(`./enskills/${file}`);
            if(!skill.info.name)
                continue;
            if(!enemiesSkills['skills']){
                enemiesSkills['skills'] = new Map();
                enemiesSkills['skills_list'] = []; 
            }
            enemiesSkills['skills'].set(skill.info.name, {callback: skill.callback, event: skill.info.event});
            enemiesSkills['skills_list'].push(skill.info.name);
            ++count_es;
        }
        return count_es;
    }
}