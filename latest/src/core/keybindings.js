
core.plugin('keybindings', {
    about:"keybindings is a shortcuts manager that monitors all shortcuts assigned to actions.",
    version:"1.0.0",
    requires:{
        "xshell":"1.0.0"
    },
    extends:{
        panels:[
            {panel:"keybindings", layout:"keybindings"}
        ],
        layouts:[
            {layout:'keybindings', type:'CVFlex', items:[
                {item:'CFrame', width:500, height:20}
            ]}
        ]
    },
},(function( ...includes){
        //const { events, actions, signals} = includes; 
    /**
     * called when all the requirements are met.
     */
    let keys;
    const init = ( )=>{
        keys = {};
    };
    const main = ( args )=>{
        // keys -add -k 'ctrl+v' -s 'selection-state' -a 'clipboard.copy'
        // keys -add 'ctrl+v' 'selection-state' 'clipboard.copy'
        // keys -del 'ctrl+v' 'selection-state' 'clipboard.copy'
    };

    const quit = ( args )=>{

    };
    const IsSet = ( shortcut, state )=>{
        if( shortcut in keys ){
            if( state in keys[shortcut])
                return true;
            return false;
        }
        return false;
    }
    const SetKeys = ( shortcut, state, action )=>{
        if( !IsSet(shortcut, state)){
            keys[shortcut]= {state,action};
            console.log('shortcut set', {shortcut, state, action})
        }
        // keys('ctrl+c','selection-state', 'clipboard.copy')
    };
    const UnsetKeys = ( shortcut, state, action )=>{
        if( IsSet(shortcut, state)){
            keys[shortcut]= {state,action};
            console.log('shortcut set', {shortcut, state, action})
        }
        // keys('ctrl+c','selection-state', 'clipboard.copy')
    };
    const GetKeys = ( shortcut )=>{

    };
    const GetStates = ( shortcut )=>{

    };
    const GetAction = ( shortcut )=>{

    };
    const GetActionKeys = ( action )=>{
        //keybindings.GetStates('ctrl+c');
    };
    // shortcutkeys.RegisterShortcut('ctrl+v',)
    let exports = {
        ///// default
        init, main, quit, 

        ///// services
        SetKeys, 
        IsSet,
        UnsetKeys,
        GetKeys,
        GetStates,
        GetAction,
        GetActionKeys };
        
    return exports;
}));