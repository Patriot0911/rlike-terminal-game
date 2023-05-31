const { hideCursor, exit, longest } = require("./utils.js");
const parse = require("./parses.js");
const { gMenus } = require("./globals.js");


(async () => {
    hideCursor();
    if(!parse.skills() || !parse.menus() || !parse.events() || !parse.eskills())
        exit();
    console.clear();
    gMenus.get('mainmenu')().show();
}) ();