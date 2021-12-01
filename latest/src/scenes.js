
core.plugin("scenes",{
    about:`scene manager. Creates, deletes, updates scenes.`,
    version:'1.0.0',
    requires:{
        "events":"1.0.0",
        "actions":"1.0.0",
        "keybindings":"1.0.0",
    },
    exports:{
        events:[
            {event:"sceneCreated", title:"Creates a new scene", params:[
                {param:'scene', type:'CScene', info:'The created scene'},
                {param:'type', type:'SceneType', info:'The type of scene created.'},
                {param:'width', type:'Number', info:'The width of the scene'},
                {param:'height', type:'Number', info:'The height of the scene'},
            ]},
            {event:"sceneDeleted", title:"Deletes the current scene", params:[
                {param:'', type:'', info:''},
                {param:'', type:'', info:''},
            ]},
            {event:"sceneSelected", title:"Select a scene", params:[
                {param:'', type:'', info:'', short:''},
                {param:'', type:'', info:'', short:''},
            ]},
        ],
        actions:{},
        commands:[
            {command:"Scenes.Create", title:"Creates a new scene of the specified type.", params:[
                {param:'name', type:'String', info:'Name of the scene to be created.', short:'-n'},
                {param:'type', type:'SceneType', info:'', short:''},
            ]},
            {command:"Scenes.Delete", title:"Deletes the current scene", params:[
                {param:'', type:'', info:'', short:''},
                {param:'', type:'', info:'', short:''},
            ]},
            {command:"Scenes.Select", title:"Select a scene", params:[
                {param:'', type:'', info:'', short:''},
                {param:'', type:'', info:'', short:''},
            ]},
        ],
    }},
    (function(){
        /**
         * called when all the requirements are met.
         */
        const init = ( includes )=>{
            console.log('----------------------------- init -------------------------------');
            console.log(includes);
            const {events, actions, keybindings} = includes; 
            actions.Create('add','scene.add');
            // commands
            if(keybindings)
            keybindings.SetKeys('ctrl+n','document-state','scene.add');
        };
        const main = ( args )=>{
            console.log('----------------------------- main -------------------------------');
        };

        const quit = ( args )=>{

        };
    return {init, main, quit};
}));