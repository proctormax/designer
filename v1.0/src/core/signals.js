let signals = (function($){
  let ArgTypes = (...args)=>{ 
    let res=""; 
    args.forEach( arg=>{ res+=':'+( arg === null ? "Null" : arg === undefined ? "Undefined":arg.constructor.name);}); return res;}
  let _listeners = {};
  let _on = {};


  let on = ( sender, signal, receiver, action, args = null, paramCallback=null )=>{
    const sign = ArgTypes(sender,signal, receiver, action, args, paramCallback);
    if( typeof receiver == 'function' ){
      
      if( !(signal in _listeners) ){
        _listeners[signal] = [];
       // console.log('events::on -> ',event,'created');
      }
      // console.log('events::on -> ',event,'registered');
      _listeners[signal].push({target: receiver, type: signal, callback: receiver, isNative });
    }else{
      
      if('addEventListener' in $(receiver)){

        //$(receiver).addEventListener( signal, action );
      }
      else 
        console.log(signal,'unrecognisable ------------------------------');
    }
  };
  //on['string:function:null:null']
  //on['string:function:array:null']
  //on['string:function:array:function']
  //on['object:string:function:array:function']
  //on['object:string:object:function:array:function']
  //on['<object>:string:object:function:array:function']
  //on('item-dropped', HandleItemDrop, {e:e,args:[34,0, 'solid']} )
  //on(object,'changed', receiver, command, args, argsCallback )
  //
  const OnSCAP = ( signal, callback, args=null , preCallback = null ) =>{

  };
  const OnSRCAP = ( signal, receiver, callback, args=null , preCallback = null ) =>{

  };
  const OnSSCAP = ( sender, signal, callback, args=null , preCallback = null ) =>{

  };
  const OnSSRCAP = ( sender, signal, receiver, callback, args=null , preCallback = null ) =>{
    // on(btn, 'pressed', pane, 'initDrag' )
  };
  let off = ( event, target, callback )=>{

    $(target).removeEventListener( event, callback );
  };
  
  let emit = (event, ...data )=>{
    if( typeof event == "string"){
      // events[u-9304-58348][signals]
      // events.emit('visibility-changed', layout.Uid(), data )
      // u-39483-35349-53498-343434
      if( event in _listeners ){
        _listeners[event].forEach( lsn =>{         
            lsn.callback.apply(data);
        });
      }else{
        //console.log('events::emit =>',event,' event not registered. Try registering event automatically by calling the events.on(event,callback)', Object.keys(_listeners));
      }
    }
  };
  // signals.On( signal, callback, args )
  // signals.On( signal, receiver, action, args )
  // signals.On( sender, signal, callback, args )
  // signals.On( sender, signal, receiver, action, args )


  // signals.On( sender, signal, receiver, callback, args )
  // signals.On( layout, 'layout-reversed', device, 'setOrientation', 'inverted' )
  // signals.On( button, 'button-triggered(bool,int)', device, 'setVisible', {paramIndex:0} )
  // signals.Send( sender, signal, data )
  return { on, off, emit };
});
