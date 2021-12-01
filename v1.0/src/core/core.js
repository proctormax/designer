console.log('----------------------------- CORE -------------------------------');
let core = (function(){ 
    let coreservice = {}, registery;
    const define = ( target, prop, value, setter=null, getter =null ) =>{
        let obj = {configurable: false, enumerable: false};
        obj.get = ()=>{
            return getter!== null? getter() : value;
        };
        //obj.enumerable = false; 
        if( setter != null && typeof setter == 'function' )
        obj.set = setter;
        Object.defineProperty(target,prop,obj);
    };

    function CRegistery( name, type ){
        

        const _names = [];
        const _items = {};
        const _this = this;
        define(this,"Items", ()=>Object.keys(_items));
        define(this,"Contains",function( item ){
            return item in _items;
        });

        define(this,"Register", function( item, value ){
            if( value.constructor.name !== type ){
                throw new Error(name+"Registery Error:: Failed to register '"+item+"'. A value must be of type "+type+".");
            }
            if( _this.Contains(item) ){
                console.error("------------------------------------------");
                console.error(name +" already contains: "+ item );
                console.error("------------------------------------------");
                
                console.error('Existing:',item);
                console.error((_items[item]));
                console.error('Conflict:',item);
                console.error((value));
                console.error("------------------------------------------");
                return;
            };
            _names.push(item);
            _items[item] = value;
            //console.log(name+"Registery has registered", item, value );
        });
    
        define(this,"Get", function( item ){
            if( !_this.Contains(item) ){
                throw new Error(name +" doesn't contain "+ item );
            };		
    
            return _items[item];
        });
    };
    function CSignalEmitter(){
            
        let m_listeners  = {};
        let m_signals  = new CRegistery("Signal","CSignal");
    
        Object.defineProperty(this,"signals",{
            get:()=>{
                return m_signals;
            }
        });
        /**
         * Dispatches an event/signal with the provided data.
         * @param {String} signal the event/signal to dispatch
         * @param {Array} data An array containing the data to pass to the signal listeners.
         */    
        this.Emit = function( signal, data ){
            
            // if there's no one listening to this signal...
            // return...
            if(!m_signals.Contains(signal)) return;
            if(!m_listeners[signal]) return;
    
    
            // look thru all the listeners of this 
            // signal and invoke their call backs....
            m_listeners[signal].forEach( callback => {
            
                callback(data);
            
            });
    
        };
        
        /**
         * Connects a function to a custom signal/event.
         * @param {String} signal the signal/event to connect the callback to.
         * @param {Function} callback the function connecting to the signal.
         * @param {Array} args the optional arguments to pass to the callback function
         * when this signal is emitted.
         */
        this.Connect = function( signal, callback ){
            if(typeof m_listeners[signal] !== "array" ) m_listeners[signal] = [callback];
            else m_listeners[signal].push(callback);
        };
    };
    
    function CPlugin( name, version ){
        var _startCallback;

        var _stopCallback;
        
        this.GetName = function(){
            return name;
        };
        this.GetVersion = function(){
            return version;
        };

        Object.defineProperty(this,"Start",{
            get:()=>{ return _startCallback; },
            Set:( callback )=>{ 
                _startCallback = callback; 
            }
        });

        Object.defineProperty(this,"Stop",{
            get:()=>{ return _stopCallback; },
            set:( callback )=>{ 
                _stopCallback = callback; 
            }
        });
    };
    function CConfiguration(){};
    function CConfigurationDefault(){};
    function CCommand(){};
    function CMenu(){};
    function CKeybinding(){};
    function CLanguage(){};
    function CDebugger(){};
    function CBreakpoint(){};
    function CGrammar(){};
    function CTheme(){};
    function CSnippet(){};
    function CJsonValidation(){};
    function CView(){};
    function CViewsContainer(){};
    function CProblemMatcher(){};
    function CProblemPattern(){};
    function CTaskDefinition(){};
    function CColor(){};
    function CTypescriptServerPlugin(){};
    function CResourceLabelFormatter(){};
    // CService( name, about, requires, module:{init, main, quit} )

    registery = new CRegistery('services','CService');

    function CService(name,schema, module = {}){
        let _createFunc = null;
        let _mainFunc   = null;
        let _quitFunc = null;
        let _deps = null;
        let {requires,version,about} = schema;
        let {init, main, quit} = module;
        define(this,'version', version);
        define(this,'name', name);
        define(this,'includes', _deps, includes =>{ _deps = includes; });
        define(this,'registery', new CRegistery('service','Function'));
        define(this,'Register', this.registery.Register);
        define(this,'Start', main);
        define(this,'Init',init );
        let defaults = ['main','init','quit','events','actions'];
        for( let f in module ){
            if( defaults.indexOf(f) < 0){
                console.log(f,'defined <<<<<');
                define(this,f, module[f] );

            }
        }
    };
    
    /////// CManager:[add,remove,start, stop]
    /////// ActionsManager
    /////// AssetsManager => Resource CRUD fonts, icons, images 
    /////// IconsManager => stores icons
    /////// CommandsManager => Stores commands
    /////// ShortcutsManager => Creates and Edits shortcuts
    /// layers.events.register('layer-selected',{})
    /// service.serviceId
    /// service.serviceName
    /// service.serviceName
    /// service.Init
    /// service.Main
    /// service.Quit

    let services = {running:[], stopped:[], disabled:[], ready:[], loaded:[]};
    let modules  = {};
    define(coreservice,'GetSVN',(name, version='1.0.0')=>{
        return `${name}-v${version}`;
    });
    define(coreservice,'Services',(state='*')=>{
        return state=='*'? services: services[state];
    });
    define(coreservice,'GetService',( name, version='1.0.0')=>{
        let svn = coreservice.GetSVN(name, version);
        let res = null;
        if( svn in modules)
            res = modules[svn];
        return res;
        
    });
    define(coreservice,'ReadyServices',()=>{
        return services['ready'];
    });
    define(coreservice,'IsRunning',( service )=>{
        return services['running'].indexOf(service) > -1;
    });
    const ServiceRequestsReady = (name,svn)=>{
        let payload = modules[svn];
        services.ready.push(name);
        let service = coreservice.GetService(name);
        //service.init(payload);
        console.warn("@core::",svn, service, 'is ready ------------------------->>', payload );
    };
    const loadServiceRequests = (name,version, requires=null)=>{
        let svn = `${name}-v${version}`;
        console.warn("@core::", '>>>>>>>>>>>>>> loading service requested by', svn, ' requires:', requires );
        let ready = true;
        if(requires){
            for( let s in requires ){
                
                console.log("@core::", 'looking for', s,'...' );
                if(  services.loaded.indexOf(s)> -1 ){
                    let service = registery.Get(s);
                    let inc = modules[svn];
                    if(inc){                        
                        inc[s] = service;
                    } else {
                        console.error(svn,"failed to include ",s, inc);
                    }
                    console.log( 'found', service.name, 'version', service.version );
                }else{
                    ready = false;
                    console.log("@core::", 'Not found' );
                }
            }
            if( ready ){

                ServiceRequestsReady(name, svn);
            }
        }else{
            console.error("@core::",name,"does not require anything.....");
            ServiceRequestsReady(name, svn);
        }
    };


    define(coreservice,'plugin',(name, schema, module)=>{
        let { version, about, requires} = schema;
        module     = module();
        
        module.main       = module.main;
        module.init       = module.init;
        module.quit       = module.quit;
        module.actions    = module.actions || {};
        module.events     = module.events  || {};

        if( !version) version = '1.0.0';
        if( !about)   about = name+' '+version;
        if( !requires) requires = {};
        
        schema.about = about;
        schema.version = version;
        schema.requires = requires;

        services.loaded.push(name);
        const  svn = `${name}-v${version}`;
        modules[svn] = {};

        console.log(`>>>> ${svn} <<<<<`);

        
        for( let i in module ){
            console.log('##',name,`=> ${i}:${ module[i].constructor.name }`);
        }

        registery.Register(name, new CService(name, schema, module));
        services.loaded.forEach(service =>{
            if( services.ready.indexOf(service) < 0){
                loadServiceRequests(service,version, requires);
            }
        });

        return module;
    });

    coreservice.StartService = (service, params=null)=>{
        let srv = registery.Get(service);
        let sname = `${service}-v${srv.version}`;
        let includes = modules[sname];
        if(srv && services.ready.indexOf(service) > -1 && services.running.indexOf(service) < 0){
            console.warn("@core::","@Initializing", sname,' included:', includes);
            srv.Init( includes );
            services.running.push(service);
        }
    };
    coreservice.Stop = (service, reason="shutdown")=>{
        let srv = registery.Get(service);
        if(srv){
            console.log(srv,'stopped. Reason: ', reason);
        }
    };
    coreservice.DisableService = (service)=>{
        let srv = registery.Get(service);
        if(srv){
            console.log(srv,'disabled');
        }
    };
    coreservice.EnableService = (service)=>{
        let srv = registery.Get(service);
        if(srv){
            console.log(srv,'enabled');
        }
    };

    coreservice.Start = ()=>{

        console.log("starting the following services:\n");
        coreservice.Services('loaded').forEach( item =>{
            coreservice.StartService(item);
        });
    }
    // 
    // actions.create('copy','clipboard.copy', ':icn_copy');
    // service.commands.contains()
    // service.actions.contains()
    // service.events.contains()
    // service.signals.contains()
    // service.signals.contains()
    // service.registry.register()
    // service.widgets.register()
    // listening to a signal: layers.on('layer-created', doSomething);
    // listening to a signal: events.on('layer-created', doSomething);
    // listening to a signal: actions.on('action-triggerred', doSomething);
    // layers.events.on('layer-created', doSomething)
    // layers.events.on('layer-created', doSomething)
    // events.register('layers-selected',{layers:'CLayer[]'});
    // events.register('layers-hidden',{layer:'CLayer', index:'int'});
    // services | events | actions 
    ////////////////// CONNECT ACTIONS /////////////////////////////////////////////////////////////
    // actions.create(name, icon, text, shortcut, command, trigger );
    // actions.create("act#", text, shortcut, command, trigger );
    // actions.setTriggers('act#', ['click','ctrl+k']);
    // actions.setEnabled('act#', true ,STATE('selection-available'));
    // actions.setEnabled('act#', true );
    ////////////////// CONNECT ACTIONS /////////////////////////////////////////////////////////////
    // actions.connect('create-HTMl-layer',  CMD('layers.create, {type:"HTML", name:'layer#'}')); //   
    // actions.connect('create-Pixel-layer', CMD('layers.create, {type:"Pixel",name:'layer#'}')); //  
    // actions.connect('create-SVG-layer',   CMD('layers.create, {type:"SVG",  name:'layer#'}')); //  
    // actions.connect('create-GL-layer',    CMD('layers.create, {type:"GL",   name:'layer#'}')); //  
    ///////////////// STATES ///////////////////////////////////////////////////////////////////////
    // create a new state
    // scene.add(item)
    // scene.remove(item)
    // scene.contains(item)
    // scene.contains(item)


    // layers.Get('services')
    // cm = new CServiceManager('CCommand');
    // cm.Register(); cm.UnRegister, cm.Contains('cm')
    // actions = new CServiceManager('actions','CAction');
    // actions.Create('')
    // actions.SetEnabled('clipboard.copy', true);
    // actions.SetIcon('clipboard.copy', assets.icons.get(':copy'));
    // actions.SetTip('clipboard.copy', 'Copy selection to clipboard');
    // actions.SetTip('clipboard.paste', 'Paste selection from clipboard');
    // actions.SetCommand('paste', 'clipboard.paste');
    // actions.SetShortcut('paste', 'ctrl+v', 'paste-accepted');
    // commands.SetTip('clipboard.paste', 'cPaste selection from clipboard');
    // commands.addCommand('paste %selection', 'cPaste selection from clipboard');
    return coreservice;
})();


function CModule( name, header, service ){
    console.warn('//////////////////',name,'///////////////////');
    
    console.warn('---------------------------------------------');
    core.plugin(name, header, service);
}