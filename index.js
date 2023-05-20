const { hideCursor, exit } = require("./utils.js");
const parse = require("./parses.js");
const { gMenus } = require("./globals.js");


(async () => {
    hideCursor();
    if(!parse.skills() || !parse.menus())
        exit();
    console.clear();
    gMenus.get('mainmenu')().show();
}) ();