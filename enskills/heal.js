module.exports = {
    async callback(userdata, target, skill_lvl){
        console.log(target);
    }
};

module.exports.info = {
    name:           'heal',
    event:          'active'
};