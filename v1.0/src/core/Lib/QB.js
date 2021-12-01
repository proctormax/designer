const NULL = null;
let Lib = (function(exports){
   
  function TypeOf($object,$type=null){

    if( $object === null ) return "Null";

    if( $object === undefined ) return "undefined";

    if(typeof $type === "string") return $object.constructor.name === $type;

    return $object.constructor.name;

};
window.Q_ENUMS =
exports.Q_ENUMS = function( liest ){};
exports.qTypeOf = TypeOf;
window.qTypeOf = TypeOf;

let CArray          = Array;
let CBoolean        = Boolean;
let CReal           = Number;
let CFloat          = Number;

   var _CALLEE = "";
   const _paths = {};
   const _modules = {};
   let sandbox = {
       Funcs:{}
   };
   let sdk = {};
function IsTypeOf(target,type){

    return TypeOf(target).toLowerCase() === type.toLowerCase();

}

   sdk.inheritance = {};
   sdk.properties = {};
   sdk.signals = {};
   sdk.enums = {};
   sdk.interfaces = {};
   sdk.errors = {};
   function CInheritance( prop ){
       const res = {super:{},defined:[],finals:[],overloaded:[],overrides:[], derivatives:[], extends:[]};
       for( const property in prop ){
           res.defined.push( property );       
       }

       return res;
   };
   function qExtend(childInstance, base, ...args){
     qAssert( typeof base !== "function" ,"@qExtend(", qTypeOf(childInstance), base, ") ERROR: Exptected base to be of type Function, got ", qTypeOf(base), _CALLEE);
     
       const baseClassName  = base.name;

       const childClassName = qTypeOf(childInstance);

       const baseProto      = base.prototype;

       const childProto     = childInstance.constructor.prototype;


       if( !( baseClassName in sdk.inheritance )){

           sdk.inheritance[ baseClassName ] = CInheritance( baseProto );
       }

       if( !( childClassName in sdk.inheritance ))
           sdk.inheritance[ childClassName ] = CInheritance( childClassName );

       if( sdk.inheritance[ baseClassName ].derivatives.indexOf( childClassName ) < 0 ){

           sdk.inheritance[ baseClassName ].derivatives.push( childClassName );
         
           sdk.inheritance[ childClassName ].extends.push( childClassName );


           for( var attrib in baseProto ){
               const property = baseProto[attrib];
               // if the property is defined by the child, skip it.
               if( sdk.inheritance[childClassName].defined.indexOf( attrib ) < 0 )
                   childInstance[attrib] = childProto[attrib] = property; 
               else 
                   sdk.inheritance[childClassName].super[attrib] = base; 
              // console.warn("@inheritance:", cp );

           }
       }
       base.apply( childInstance, args );
   };
   sandbox.Funcs.qExtend = qExtend;
   window.qExtend = qExtend;
   sandbox.Funcs.qInstanceOf = ( target, base )=>{
     var res = target.constructor.name == base;
     if(sdk.inheritance[base]!= null)
      res = res || sdk.inheritance[base].derivatives.indexOf( target.constructor.name ) > -1;
     return res;
   }
   window.qInstanceOf = sandbox.Funcs.qInstanceOf;
   function qKeep( C ){
       if( !( C.name in sdk.inheritance) ){
           sdk.inheritance[C.name] = CInheritance(C.prototype );
       }else{
           console.warn("@Keep","already kept", C.name);
       }

   }
   exports.qKeep = qKeep;
   window.qKeep = qKeep;
   
   function qSuper( childInstance, method, ...args ){
       const cname = childInstance.constructor.name;
       const base  = sdk.inheritance[cname].super[method];
       const res   = base.prototype[method];
       if(res.length) res.apply(childInstance, args);
       else res.call(childInstance );
       //console.warn("@super:",cname, base.name,"::",method);
       
   }   
   exports.qSuper = qSuper;
   window.qSuper = qSuper;

  function CleanPath ( path ){
    
      path = path.trim().replace(".js",'');
      path = path.trim().replace("qb.",'');
      path = path.replace(/\//g,'.');
      return path;
      
  }

  function GetFilename( path ){
    var res = path.split('.');
    return ( res.length > 1) ? res[res.length-1] : res[0];
  }
   function qPack( path, module ){
        
        path = CleanPath( path );
        var
        cname           = GetFilename( path );

        _CALLEE = cname;
        if( cname in exports ){
           throw new Error("qPack Error: File exitst ==>"+cname+" @ "+path);
            
        }
       exports[cname] = module();
         _paths[path] = exports[cname];
        

       // $CLASS_DB.push(cname);
       qKeep(exports[cname] );
   }
   window.qPack = qPack;
   
   function qRequire( filename ){
     var f = GetFilename( CleanPath(filename));
     var res =_paths[CleanPath(filename)];

     return res == null ? exports[f] : res;
   }
   window.qRequire = qRequire;



/* -------------------------------------------------------------------- */
 
function qParamTypes(args,delim=','){
    if( args.length === 0) return 'void';
    var res = '';
    for( var i in args )
        if(args[i] === undefined )res+=(delim+'undefined');
        else res+=delim+ (args[i].constructor.name);

    return res.replace(delim,'');
}
function overload__Info(owner,name ){
        var info      = {};
        info.owner    = owner;
        info.name     = name;
        info.syntax   = [];
        info.about    = [];
        info.callback = [];
        info.Print    = function( about = true){
            var a, s  = '';
            //s         += 'owner: '+info.owner;
            for(var i = 0; i < info.syntax.length; i++){
                a     = about?' => '+info.about[i]:'';
                s    += '\n'+info.owner+'::'+info.name+'( '+info.syntax[i]+' )'+a;
            }
            return s;
        };
        return info;
}
function overload__add(owner,name,syntax,callback,about){

    if( owner[name].__ov__.syntax.indexOf(syntax) >= 0 ) return;
    owner[name].__ov__.syntax.push(syntax);
    owner[name].__ov__.callback.push(callback);
    owner[name].__ov__.about.push(about);
}
function qOverload(o,name,syntax, callback, about='No documenation found.'){
  if( typeof syntax == "array") syntax = syntax.join("_").replace(/\_+/,"_");
    if( typeof o[name] !== 'function' ) {
        var owner  = typeof o === 'function'? o.name : o.constructor.name;
        o[name]  = function( ){ 
            var _syntax = qParamTypes(arguments);   
            const Func = o[name].__ov__.callback[o[name].__ov__.syntax.indexOf(_syntax)];
            if(Func){
                return Func.apply(o,arguments);
            }else{
               console.error('SyntaxError @', owner+'::'+name+'('+_syntax+'); \n\n Valid syntax:\n',
               o[name].__ov__.Print());
              // console.warn(e.message);
            }
        };
        o[name].__ov__ = overload__Info(owner,name);
    }
    if( typeof o[name].__ov__ !== "object" )
        o[name].__ov__ = overload__Info(owner,name); 
    // ---------------------------- 
    overload__add(o,name,syntax,callback,about);
    o[name].toString = function(){ return name+'()';};
}
function qConstruct(F,params,callback,about=''){

  if( F === undefined ){
    var match = callback.toString().match(/\s*new\s+\w.+(\(|\.)/);
    if( match.length ){ 
      match = match[0].replace(/(\.\w.+\(\w.+|\s*new\s+|\()/,"");
      match = match.replace(/\.\w.+/i,"");
    }
    console.warn(match,"is not a function.........!", arguments);
    return;
  }
  if(typeof F["New"] !== 'function' ){
    F.New = function(){ return new F(); };
    console.warn(F.name, F.length,"does not have a New func.****** now:", F.New);
  }
   if(about.length === 0) about = 'Constructs from '+params.split(',').join(', ');
   qOverload(F,'New',params,callback,about);
}
function qCast(o,params,callback,about=''){
    qOverload(o,'Cast',params,callback,about);
}
function qDef(o,funcName,params,func,about=''){
    qOverload(o,funcName,params,func,about);
}
window.QB = exports;
window.qDef = qDef;
window.qConstruct = qConstruct;
window.qCast = qCast;
window.qOverload = qOverload;
window.CMath = exports.CMath || Math;
window.Geom = exports.Geom || {};


///////// -------------------------------
function qProperty_($this, name, attributes ){
    
  Assert($this === NULL,"Property owner must not be NULL");
    var property_name = String.Capitalize(name);    
  
    //signal   = signal || signal !== null ? (type signal === "string"? signal : Name + "Changed"): false;  
    if(typeof $this === 'function') $this = $this.prototype;
    /* if( TypeOf(signal, "String") ){
        var o  = {};
        o[name]= type;
        _this[signal] = new CSignal(_this,signal,o);
        //console.log(_this[signal]);
    } */
    if( attributes.getter ){
       $this[property_name]      = ()=>{ return attributes.access[name]; };
    }/*
    if( setter ){
       qDef(_this,"Set"+Name,type,function(value){            
           access[name] = value; 
           if( this[signal]) this[signal].Emit([value]); 
       });
    }     */
    if( attributes.setter ){
      qDef( $this,"Set"+property_name, attributes.type,function(value){            
           var old = attributes.access[name]; 
           // You can choose to set a preventDefault operation here... ////
            var emission = {};
            emission[old] = old;
            emission[name] = value;
           if( attributes.signal) attributes.signal.Emit( emission ); 
           attributes.access[name] = value; 
       });
    }     
  }
function qProperties($this,$properties){
    for( const property_name in $properties ){
      const property_type   = $properties[property_name];
      const property_setter = "Set"+String.Capitalize(property_name);
      const property_getter = String.Capitalize(property_name);
      const signal_accessor = property_name+"Changed";
      const $_this          = $this;//.constructor.prototype;

      if( QB.CSignal ){

        const signal_name     = String.Capitalize(signal_accessor);
        var   signal_emission = {};
        
        signal_emission[property_name] = property_type;
        signal_emission['old'+property_name]= $properties[property_name];

          $properties[signal_accessor] = new QB.CSignal($_this,signal_name,signal_emission); 
          if(!(signal_name in $_this))
          Object.defineProperty( $_this, signal_name ,{
            get:()=>{
              return $properties[signal_accessor];
            }
          });    
        }else{
          console.warn("---------------------------------------------\n");
          console.warn("---------------------------------------------\n");
          console.warn("------------ QB:CSignal Not Found -----------\n");
          console.warn("---------------------------------------------\n");
          console.warn("---------------------------------------------\n");
        }
        qDef( $_this, property_setter,property_type,(value) =>{
            $properties[property_name] = value;
            if( $properties[signal_accessor]){
              var emission = {};
              emission[property_name] = value;
              $properties[signal_accessor].Emit(emission);
            }
        });
       $_this[property_getter] = ()=>{
          return $properties[ property_name ];
        };
        //var attrib = {access:_properties,type:_properties[property_name],getter:true,setter:true,signal:$this[signal_name],trigger:null};
        //qProperty($this,property_name,attrib );
    }
}

function qProperty(_this, access, name, type,  getter = true, setter=true, signal = null, trigger = null ){
  Assert(_this === NULL,"Property owner must not be NULL");
  var Name = String.Capitalize(name);    

  //signal   = signal || signal !== null ? (type signal === "string"? signal : Name + "Changed"): false;  
  if(typeof _this === 'function') _this = _this.prototype;
  /* if( TypeOf(signal, "String") ){
      var o  = {};
      o[name]= type;
      _this[signal] = new CSignal(_this,signal,o);
      //console.log(_this[signal]);
  } */
  if( getter ){
     _this[Name]      = ()=>{ return access[name]; };
  }/*
  if( setter ){
     def__(_this,"Set"+Name,type,function(value){            
         access[name] = value; 
         if( this[signal]) this[signal].Emit([value]); 
     });
  }     */
  if( setter ){
    qDef( _this,"Set"+Name,type,function(value){            
         var old = access[name]; 
         // You can choose to set a preventDefault operation here... ////
         if( signal) signal.Emit([value, old]); 
         access[name] = value; 
     });
  }     
}
function qProperties_(owner,_properties){
  for( var p in _properties ){
      var signal = String.Capitalize(p)+'Changed';
      if( owner ){
          var o  = {};
          o[p]= _properties[p];
          o['old'+p]= _properties[p];
          owner[signal] = new CSignal(owner,signal,o);
          //console.log(_this[signal]);
      }
      qProperty(owner,_properties,p,_properties[p], true, true, owner[signal]);
  }
}
window.INIT_PROPERTIES = qProperties;
window.qProperties = qProperties;
window.qProperty = qProperty;

/**
 * Assertion test.
 * @param { Boolean } bAssert The assertion test logic.
 * @param { String } msg The message to be displayed upon assertion failure.
 */
function Assert( bAssert, msg = "assertion failed!" )
{ if(bAssert) throw new Error(msg); }
window.Assert = Assert;
window.qAssert = Assert;

let qDOM = function(t,c=''){
    Assert( t === NULL,'qDOMError failed create a null object --> '+t);
  var dc= typeof t === "string"? window.document.createElement(t) : t;
  c = typeof c === "string" ?  c.split(' ') : [];
  try {
      if( !TypeOf(dc.classList, 'DOMTokenList'))
      throw new Error('qDOM Creation failed. ')
    for( var i in c ){
        var s = c[i];
        if( s.length>0 && !dc.classList.contains(s) ) dc.classList.add(s);
    }

  } catch (e) {
    console.error("qDOM creation error for '"+t+"':"+c+" =>",e.message,TypeOf(dc));
  } 
  return dc;
};

qDOM.Get = function(target, bAll = false){ return (bAll? window.document.querySelectorAll(target) : document.querySelector(target)); };

qDOM.Select = function (selector){
    return window.document.querySelector(selector);
};
qDOM.SelectAll = function (selector){
    return window.document.querySelectorAll(selector);
};
window.DOM    =
window.qDOM   =
exports.qDOM  = qDOM;

////////////

/**
 * Connects Items signals and functions to other events.
 * @param { CWidget || Object } target The target connection source
 * @param { String } signal Name of the signal to connect to.
 * @param { Function || CCallback } callback The signal callback.
 * @param { Array } args The arguments to pass-on to callback at execution.
 * @param { UInt } iEvent The index where the callback's event param should be placed.
 */
let Connect = function(target, signal, callback, args,iEvent = -1) {
    if (!target) return;
    if (typeof target === 'string') {
      qDOM.Get(target)[signal] = function(e) {
        if (args) {
          if (iEvent>-1) args[iEvent] = e;
          callback.apply(this, args);
        } else {
          if (iEvent>-1) callback(e);
          else callback();
        }
      }
    } else if (target.constructor === "CWidget") {
      qDOM.Get(target)[signal] = function(e) {
        if (args) {
          if (iEvent>-1) args[iEvent] = e;
          callback.apply(this, args);
        } else {
          if (iEvent>-1) callback(e);
          else callback();
        }
      }
    } else {
      target[signal] = function(e) {
        if (args) {
          if (iEvent>-1) args[iEvent] = e;
          callback.apply(this, args);
        } else {
          if (iEvent>-1) callback(e);
          else callback();
        }
      }
    }
  
  };

  function qError( cname, err_id, message ){
    
  }

  function qSignals( owner, signals ){
    //console.error( "@qSignals => ",owner.name,signals);
    sdk.signals[ owner.name ] = signals;
  }
  const _enums_ = {};
  exports.Type = _enums_;
  function CreateEnum( typeName, entries ){
    let values = [];
    let types  = Object.keys( entries );

    let E =  _enums_[typeName] = function( type, value, about ="" ){

      qAssert( !E.Contains(type), "Enum must be of type:"+E.Types.toString());
      
      Object.defineProperty(this,"Value",{value: value, "writable": false});
      
      Object.defineProperty(this,"Name",{value: type, "writable": false});
      
      Object.defineProperty(this,"EnumType",{value: typeName, "writable": false});
      
      Object.defineProperty(this,"About",{value: about, "writable": false});       
    };

      Object.defineProperty( _enums_[typeName],"name",{value: typeName, "writable": false});

    Object.defineProperty(E,"Types",{get:function(){
      return types;
    }});


    E.Contains = function( type ){
       return types.indexOf( type ) > -1;
    };
    E.toString = ()=>{
      return "[enum  "+typeName+"]";
    }

    // type-values
      types.forEach( type =>{

        value = new E( type, entries[type]);
        value.toString = ()=>{ return `<${typeName}::${type}>`;};
        
         Object.defineProperty( E,type,{
           "enumerable"   : false,
          "value"         : value,
          "writable"      : false,
          "configurable"  : false
        });
          

        /*
        Object.defineProperty( type,type_key,{
          "value"         : types[typeName][type_key],
          "writable"      : false,
          "configurable"  : false
        }); */
      });
      return E;
  }
/**
 * 
 * qEnums("SelectionBehavior",{
 *    SelectItems:  [0,"Select"],
 *    SelectRows:   [1,"Select"],
 *    SelectColums: [2,"Select"],
 * });
 */
  function qEnums( owner, types ){

    var elist = Object.keys(types);

    elist.forEach( (typeName)=>{
      const eType = CreateEnum( typeName,  types[typeName] );
      Object.defineProperty( owner, typeName ,{
        "value"           : eType,
        "writable"        : false,
        "configurable"    : false
      });

      if( qTypeOf(owner,"Function")){

        //console.error( owner.name, "::", typeName, "->", type );
  
        Object.freeze(eType);
      }
      exports[typeName] = eType;
    });
  }

  exports.qEnums = qEnums;
  window.qEnums = qEnums;

  function qEmit( owner, signal_name, emission, key="" ){
    if( qTypeOf(owner[signal_name],"CSignal") ){
      owner[signal_name].Emit(emission,key);
    }
  }
  exports.Connect  = Connect;
  window.Connect   = Connect;
  exports.qSignals = qSignals;
  window.qSignals  = qSignals;
  exports.qError   = qError;
  window.qError    = qError;
  exports.qEmit    = qEmit;
  window.qEmit     = qEmit;

  function qSetProperties( factory , attributes  ){
    qAssert( factory.name in sdk.properties,factory.name +" can only register its properties once!" );
    sdk.properties[factory.name] = attributes;
    //console.error( "@qSetProperties => registered",factory.name,attributes);
  }

  exports.qSetProperties = qSetProperties;
  window.qSetProperties = qSetProperties;
  function _CreateSignalsForTarget( target, o ) {

    const signals = sdk.signals[target.constructor.name];
    //console.error( "@_CreateSignalsForTarget => ",qTypeOf(target),signals);

    try {

      o.signals = {};

      if( signals )
      Object.keys(signals).forEach(signal_name => {

        let signal_syntax = signals[signal_name];

        var signal = new QB.CSignal(target, signal_name, signal_syntax);
        
        o.signals[signal_name] = signal;

        Object.defineProperty(target, signal_name, {

            value : signal,
            "writable" : false,
        });
      });
    }catch(e){
      console.error("@ERROR:_CreateSignalsForTarget<"+qTypeOf(target)+">",e);
    }
  }

  function _CreatePropertiesForTarget( target, o ) {
    const cname = qTypeOf(target);
    if( cname in sdk.properties ){
      //console.error("### Setting properties for ",cname);

      let properties = sdk.properties[cname];
      try {
  
        o.signals = {};
        
        Object.keys(properties).forEach(property_name => {
  
          let property_type = properties[property_name];

          let signal_syntax = {};
          
          const term = property_name.substr(0,1).toLowerCase() + property_name.substr(1);
          
          let emission = {};
  
          signal_syntax[property_name] = property_type;
  
          var signal = new QB.CSignal(target, term + "Changed", signal_syntax);
  
          o[property_name] = property_type.default;
  
          qOverload( target, "Set"+property_name, property_type ,function( value ){
            if( !qTypeOf(value, property_type) ) throw new Error( `SyntaxError @ Set${property_name}( ${qTypeOf(value)}) Error: value must be of type ${property_type}` );
            emission[term] = value;
            signal.Emit( emission );
             o[property_name] = value;
          });
  
          qOverload( target, property_name, "void" ,function( ){
             return o[property_name];
          });
        });

        //console.error(cname + " features: ",Object.keys(target));
        
      }catch(e){
        console.error("@_CreatePropertiesForTarget<"+qTypeOf(target)+">  Error:",e);
      }
    }else{
      console.error("@_CreatePropertiesForTarget<"+qTypeOf(target)+"> Error: no pre-registered properties found!");
    }
  }


  function qObjectify( target,generateSignals=true, createProps = true ){
    const cname = qTypeOf(target);
    var o = {};
    // sdk.enums[ target.constructor.name ]
    // console.error( "@Objectfy => ",cname);
    // sdk.signals[ target.constructor.name ]
    if( generateSignals )
      _CreateSignalsForTarget( target, o );
    // sdk.properties[ target.constructor.name ]
    if( createProps )
      _CreatePropertiesForTarget( target, o );
    // sdk.inheritance[ target.constructor.name ]
    // sdk.errors[ target.constructor.name ]
    // sdk.events[ target.constructor.name ]
    // sdk.methods[ target.constructor.name ]
   // Lockedbag - 5046
   // Parram nsw 2124
    return o;
    

  }

  exports.qObjectify = qObjectify;
  window.qObjectify = qObjectify;

 function qInterface( owner, module ){
   sdk.interfaces[ owner.name ] = module;
 };
  exports.qInterface = qInterface;
  window.qInterface = qInterface;


  return exports;
});
Lib(Lib);
