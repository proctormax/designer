let commands = core.plugin("commands",{
    about:"commands is the helper module that contains all the necessary functions that run the core sanbox..",
    version:"1.0.0",
    requires:{},
    extends:{},
  },function( ) {
    let define = utils.define;
    let service = {commands:[], callbacks:[]};
    rx_add = (a,...r)=>{ let ar = [...r]; let res = a.source; ar.forEach( i =>{ res+= i.source;}); return new RegExp(res);};
    let rx_db = {};

    const log = (...msg)=>{
        console.log.apply(this,[...msg]);
    };

    const CommandExists = ( command )=>{
        return service.commands.indexOf( command ) >- 1;
    };
    // converts an expression into 
    // a command and params.
    const Exec = ( expression )=>{
        
        let cmd     = expression.match(/^\b\w+\s*/)[0];
        let opts    = expression.match(/\-[a-zA-Z]+./g);
        let vals    = [];
        opts.forEach( opt =>{
            opt = opt.replace(/\s+/,'');
            let rx = new RegExp('\\'+opt+'\\s+\\b[a-z0-9]+\\s*');
            vals.push( {rx, value:expression.match(rx)});
        })
        console.log('executed:', {expression, cmd, vals, opts});
    };
    const Run = ( command, params=null )=>{
        if(CommandExists(command)){

            console.log('run', command);
        }else{
            // cmd_type_type
            // cmd_expression
            console.log('unknown command:', command);
        }
    };

    // syntax: cmd:String, syntax:JSON, callback:Function
    const RegisterCommand = (cmd, callback)=>{
        if( CommandExists(cmd)){
            log('Registration failed => command', cmd,' already registered!');
            return;
        }
        service.commands.push( cmd );
        service.callbacks.push( callback );
        log('command', cmd,' registered.');
    };
    // commands = [{cmd,expression, params, callback}]
    // %cmd\s+%id => {cmd:cmd, params:{param1:}} 
    const RegisterExpression = ( expr, cmd )=>{
        if( CommandExists(cmd)){
            log('Registration failed => command', cmd,' already registered!');
            return;
        }
        service.commands.push( cmd );
        service.callbacks.push( callback );
        log('command', cmd,' registered.');
    };

    define(service,'Output', log );
    define(service,'Exec', Exec );
    define(service,'Run', Run );
    define(service,'RegisterCommand', RegisterCommand );
    define(service,'Contains', CommandExists );
    const init = ()=>{
        console.warn("#commands initializing....");
    }
    const main = ()=>{
        console.warn("#commands main....");
    }
    const quit = ()=>{
        console.warn("quitting #commands....");
    }
    
    define(service,'init', init );
    define(service,'main', main );
    define(service,'quit', quit );
    return service;
    // "doubleQuated" 'singleQuoted' test = `tiltQuoted`
});

/* sdfsadf
asdfasdfa
asdf
asdf
asdfasdf */