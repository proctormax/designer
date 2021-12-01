core.plugin("utils",{
  about:"utils is the helper module that contains all the necessary functions that run the core sanbox..",
  version:"1.0.0",
  extends:{},
},function () {
  let exports = {};
  
  const define = ( target, prop, value, setter=null, getter =null ) =>{
    let obj = {configurable: false, enumerable: false};
    obj.get = ()=>{
        return getter!== null? getter() : value;
    };
    obj.enumerable = false;
    if( setter != null && typeof setter == 'function' )
    obj.set = setter;
    Object.defineProperty(target,prop,obj);
  };
  define( exports,'define', define);
  const addChild = ( child, parent=document.body )=>{
    if( parent.ui )
    parent.ui.appendChild(child.ui == null ? child : child.ui );
    else
    parent.appendChild(child.ui == null ? child : child.ui );
  };

  define(exports,"AddChild",addChild);

  const GetTag = (target, all=false) => {
    if( typeof target === 'string')
      return all == true ? document.querySelectorAll(target) : document.querySelector(target);
    return "ui" in target? target.ui : target;
  };

  // CreateTag( cname, id, type )
  const CTag = (cname, id=null, tag='div' )=>{

    let result = document.createElement(tag);

    if( typeof cname === 'string'){

      // split classname by space separtor into chunks array
      let chunks = cname.split(/\s+/);

      // loop through every class and add it to the object
      // if not already exists.
      chunks.forEach( name => {
        if( !result.classList.contains(name) && name.length > 0 )
        result.classList.add(name);
      } );
    }

    // Set the id if provided. Only allow a maximum of 40 characters and minimum of 2 characters.
    if( typeof id == "string" && id.length >= 1 && id.length < 40 )
    result.setAttribute("id", id);

    return result;
  };
  exports.Flag =function( target, flags ){
    if( typeof flags === 'string' && flags.length > 0){

      // split classname by space separtor into chunks array
      let chunks = flags.split(/\s+/);

      // loop through every class and add it to the object
      // if not already exists.
      chunks.forEach( name => {
        if( !target.classList.contains(name) && name.length > 0 )
          target.classList.add(name);
      } );
    }
  };
  exports.ToggleFlag = function(target,c,d=null){
    if( exports.IsFlagged(target,c))
      exports.Unflag(target,c);
    else
       exports.Flag(target,c);
  }
  exports.SwitchFlags = function(target,f1,f2=''){
    if( exports.IsFlagged(target,f1)){
      exports.Unflag(target,f1);
      exports.Flag(target,f2);
    }else if( exports.IsFlagged(target,f2)){
      exports.Unflag(target,f2);
      exports.Flag(target,f1);
    }
  }
  exports.Unflag =function( target, flags ){
    if( typeof flags === 'string' && flags.length > 0){

      // split classname by space separtor into chunks array
      let chunks = flags.split(/\s+/);

      // loop through every class and add it to the object
      // if not already exists.
      chunks.forEach( name => {
        if( target.classList.contains(name) && name.length > 0 )
          target.classList.remove(name);
      } );
    }
  };
  exports.IsFlagged = function( target, flags ){
    let result = false;
    if( typeof flags === 'string' && flags.length > 0){

      // split classname by space separtor into chunks array
      let chunks = flags.split(/\s+/);

      // loop through every class and add it to the object
      // if not already exists.
      chunks.forEach( name => {
        if( target.classList.contains(name) ){
          result = true;
        }
      });
    }

    return result;
  };
  exports.CTag = CTag;
  exports.GetTag = GetTag;

  const percent = ( progress, max, value )=>{
    if( progress == null ) return (value * 100) / max; // x/100 * max = value;
    if( max == null ) return (value * 100 )/ progress; // max = value * p * 100
    return 0.01 * progress * max;
  }
  exports.percent = percent;
  function CRange( min=0, progress=0, max=1, step=1 ){
    let _min, _max, _step, _value, _progress;

    this.valueChanged = function(e){};
    const _valueChanged = e =>{
      if( this.valueChanged )
      this.valueChanged(e);
      else
      console.log("valueChangeCallback not defined... value:", e.value );
    };
    Object.defineProperties(this,{
      min:{
        set: value =>{
          if( typeof value != "number")
          throw new Error("Invalid type specified");
          _min = value;
        },
        get:()=>{
          return _min;
        }
      },
      max:{
        set: value =>{
          if( typeof value != "number")
          throw new Error("Invalid type specified");
          _max = value;
        },
        get:()=>{
          return _max;
        }
      },
      step:{
        set: value =>{
          if( typeof value != "number")
          throw new Error("Invalid type specified");
          _step = value;
        },
        get:()=>{
          return _step;
        }
      },
      progress:{
        set: value =>{
          if( typeof value != "number")
          throw new Error("Invalid type specified");
          _value = percent(value,_max);
          _progress = value;
          _valueChanged({value:_value});
        },
        get:()=>{
          return _progress;
        }
      },
      value:{
        set: value =>{
          if( typeof value != "number")
          throw new Error("Invalid type specified");
          _progress = percent(null, _max, value);
          _valueChanged({value:value});
        },
        get:()=>{
          return percent(_progress, _max);
        }
      },
    });
    this.increment = function( steps = 1){
      while( steps-- )
      this.progress += this.step;
    };
    this.decrement = function( steps = 1){
      while( steps-- )
      this.progress -= this.step;
    };

    this.min = min;
    this.max = max;
    this.progress = progress;
    this.step = step;
  }
  exports.CRange = CRange;

 const RegAdd = (a,b)=>{
   return new RegExp(`(${a.source}|${b.source})`);
 };
 exports.RegAdd = RegAdd;
 const SetAttrib = (target, attrib, value )=>{
  $(target).setAttribute( attrib, value);
 };
 const GetAttrib = (target, attrib )=>{
  return $(target).getAttribute( attrib);
 };
 exports.SetAttrib = SetAttrib;
 exports.GetAttrib = GetAttrib;

 const SetCursor = (target, cursor='default')=>{
   $(target).style.cursor = cursor;
 };

 const init = ()=>{
  console.log("Initializing utils....");
};
const main = ()=>{
   console.log("utils has started");
 };
 const quit = ()=>{

 };
 exports.def = define;
 exports.init = init;
 exports.main = main;
 exports.quit = quit;
 exports.SetCursor = SetCursor;
  return exports;
});
/////////////
