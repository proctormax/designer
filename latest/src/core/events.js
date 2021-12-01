CModule("events",{
  about:"events is the helper module that contains all the necessary functions that run the core sanbox..",
  version:"1.0.0",
  requires:{
    "utils":"1.0.0"
  },
  extends:{},
},function( includes ){
  const {utils} = includes;

  let _listeners = {};
  let on = ( event, target, callback, isNative = false )=>{
    
    if( typeof target == 'function' ){
      
      if( !(event in _listeners) ){
        _listeners[event] = [];
       // console.log('events::on -> ',event,'created');
      }
      // console.log('events::on -> ',event,'registered');
      _listeners[event].push({target, type: event, callback: target, isNative });
    }else{
      
      if('addEventListener' in utils.GetTag(target))
        utils.GetTag(target).addEventListener( event, callback );
      else 
        console.log(event,'unrecognisable ------------------------------');
    }
  };
  let off = ( event, target, callback )=>{

    utils.GetTag(target).removeEventListener( event, callback );
  };
  
  let emit = (event, data )=>{
    if( event in _listeners ){
      _listeners[event].forEach( lsn =>{
       
          lsn.callback(data);
      });
    }else{
      //console.log('events::emit =>',event,' event not registered. Try registering event automatically by calling the events.on(event,callback)', Object.keys(_listeners));
    }
  };
  const init = ()=>{
    console.warn("initializing events....");
  }
  const main = ()=>{
    console.warn("running events....");
  }
  const quit = ()=>{
    console.warn("quitting events....");
  }
  return { on, off, emit, init, main, quit };
});
