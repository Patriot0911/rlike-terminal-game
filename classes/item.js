// 'use strict';

const { iTypes, wTypes } = require('../globals');
class Item {
    constructor (name, displayName, params = 0, type, weapon_type = undefined, skills = [undefined]) {
        if(!iTypes[type]){
            console.error(`Item creating error (cannot find a type [${type}])`);
            return;
        }
        if(type === 'weapon'){
            if(!wTypes[weapon_type]){
                console.error(`Item creating error (cannot find a weapon type [${weapon_type}])`);
                return;
            }
        }
        if(skills.length  <= 1){
            if(typeof skills[0] !== 'object'){
                skills = [ undefined ];
            }else{
                for(const key of skills){
                    if(typeof key.callback !== 'function' && !getDisplaySkillName(key.name)){
                        console.error(`Item creating error (skill struct error [${key}])`);
                        return;
                    }
                }
            }
        }
        this.name   = name;
        this.dname  = displayName;
        this.type   = type;
        this.wtype  = weapon_type;
        this.params = params;
        this.skills = skills;
    }
};

module.exports = {
    Item
};