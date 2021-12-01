const System = (function( ){
    const _modules = {};
    let sandbox = {
        Funcs:{}
    };
    
    let inheritance = {

    };
    function CInheritance( prop ){
        const res = {super:{},defined:[],finals:[],overloaded:[],overrides:[], derivatives:[], extends:[]};
        for( const property in prop ){
            res.defined.push( property );       
        }

        return res;
    };
    function qExtend(childInstance, base, ...args){
        const bn = base.name;
        const cn = childInstance.constructor.name;
        const bp = base.prototype;
        const cp = childInstance.constructor.prototype;

        if( !( bn in inheritance )){
            inheritance[ bn ] = CInheritance( bp );
        }
        if( !( cn in inheritance ))
            inheritance[ cn ] = CInheritance( cn );

        if( inheritance[ bn ].derivatives.indexOf( cn ) < 0 ){
            inheritance[ bn ].derivatives.push( cn );
            inheritance[ cn ].extends.push( cn );


            for( var attrib in bp ){
                const property = bp[attrib];
                // if the property is defined by the child, skip it.
                if( inheritance[cn].defined.indexOf( attrib ) < 0 )
                    childInstance[attrib] = cp[attrib] = property; 
                else 
                    inheritance[cn].super[attrib] = base; 
               // console.warn("@inheritance:", cp );

            }
        }
        base.apply( childInstance, args );
    };
    sandbox.Funcs.qExtend = qExtend;
    window.qExtend = qExtend;

    function qKeep( C ){
        if( !( C.name in inheritance) ){
            inheritance[C.name] = CInheritance(C.prototype );
        }else{
            console.warn("@Keep","already kept");
        }

    }
    window.qKeep = qKeep;
    
    function qSuper( childInstance, method, ...args ){
        const cname = childInstance.constructor.name;
        const base  = inheritance[cname].super[method];
        const res   = base.prototype[method];
        if(res.length) res.apply(childInstance, args);
        else res.call(childInstance );
        console.warn("@super:",cname, base.name,"::",method);
        
    }   
    window.qSuper = qSuper;
    sandbox.Register  = function (name, moduleBody) {
        if( name in _modules ) throw new Error("Sandbox::Register Error: Module already exist!");
        console.log("@System.Core::Registered",name);
        _modules[name] = moduleBody;
        sandbox[name] = moduleBody();

    };
    sandbox.HasModule  = function (name) {
        return _modules[name] == null;
    };
    sandbox.GetModule  = function (name) {
        return _modules[name];
    };
   

   return sandbox;
})(); 

function qRegister( service, module ){
    System.Register(service, module );
}

// CApplication.define.About = function(){}
// CApplication.final.About = function(){}
// CApplication.overloads.About = function(){}
// CApplication.overrides.About = function(){}