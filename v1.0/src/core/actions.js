CModule('actions',{
    "about":"manages all the actions of the app. it also creates renames retargets actions.",
    version:"1.0.0",
    requires:{
        "keybindings":"1.0.0",
        "events":"1.0.0",
    }
},(function(){
    // events: action-created | action-group-created | 
    let events = {
        'action-created':{action:"CAction"}
    };
    const Create = ( name, command='<command>', icon='icon') =>{
        console.warn('created action =>', name, ',command:', command, ',icon:', icon);
    };
    const init = ( includes )=>{
        console.warn("@action initialized....");

    };
    const main = ( args )=>{

    };

    /**
     * quits the application.
     * @param args {String} - options for quiting the application.
     */
    const quit = ( args )=>{

    };
    return {init,main, quit, events, Create};
}));
