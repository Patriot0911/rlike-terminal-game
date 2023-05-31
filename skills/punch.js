module.exports = {
    async callback(userdata, target, skill_lvl){
        return target.health - Math.round(Math.floor()*skill_lvl);
    }
};

module.exports.info = {
    name:           'punch',
    displayName:    'Punch',
    type:           'active',
    required:       0,
    expected_event: 'none'
};