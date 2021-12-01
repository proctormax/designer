console.log('----------------------------- UI -------------------------------');
let UI = core.plugin("UI",{
    about:"UI is the control manager of all the widgets within the app",
    version:"1.0.0",
    requires:{
      "utils":"v1.0.0",
      "events":"v1.0.0",
    },
    extends:{
    }
  }
,(function(  ){ 
  
  let exports = {};
  let define = utils.def;
  let CTag = utils.CTag;
  
  let addChild = utils.AddChild; 

  const init = ( ...includes )=>{
    console.warn('############################# Started UI service ##############',[...includes]);  
    //events  = events;
  };

  const main = ( )=>{
    console.log('@main:UI service....');    
  };

  const quit = ()=>{
    console.log('quiting UI service....');
  };

  function CText(text="example", cname="", id=null){
    let res = utils.CTag(`clabel ${cname}`,id,"span");
    res.textContent = text;
    return res;
  };


  const RegisterClass = (cName,C)=>{
    console.log(cName,'registered ==============================');
    define(exports,cName,C);
  }
  ///////////
  let LIST_COUNT = 1;
  function CListView( items =[], flags='ui-list clist w-auto h-300px oflow-hide fill-dark stroked relative ' ){
    let _ui = CTag(flags,'ui-list'+LIST_COUNT);
    let _lt = new exports.CVFlex(items);

    define( this,'ui', _ui);
    define( this,'layout', _lt);
    define( this,'items', _lt.widgets);
    define( this,'Add', _lt.Add);
    define( this,'Remove', _lt.Remove);

    utils.AddChild(_lt,this);

  }

  function CUI( ){

  }
  function CSlider( cast=null){

    this.ui    = cast.baseUi   || utils.CTag('sld-body');
    this.bar   = cast.rangeUi  || utils.CTag('sld-range');
    this.label = cast.labelUi  || CText("slider",'sld-label');

    this.range = new CRange();
    addChild( this.bar, this.ui );
    addChild( this.label, this.ui );
    this.addEventListener = this.ui.addEventListener;
    this.removeEventListener = this.ui.removeEventListener;

  }

  CSlider.Cast = selector =>{
    let res = document.querySelector(selector);
    let baseUi  = res;
    let rangeUi = res.children[0];
    let labelUi = res.children[1];
    let valueUi = res.children[2];
    return new CSlider({baseUi, rangeUi, labelUi, valueUi});

  };
  // 6803123 ==> 131806
  function CTextEdit( text = "", filter = /./ ){
    let ui = CTag('textEdit',null,'input');
    ui.setAttribute("type",'text');
    let oldValue = "";
    const valid = value =>{
      let res = value.match( filter );
      if( res !== null ){
        //console.log( value, 'matched!', filter );
        return ( res[0].length  == value.length );
      }
      else {

        //console.log( value, 'does not match', filter );
        return false;
      }
    }
    const getText = () => {
      return ui.value;
    };

    const setText =  value => {
      value = value.toString();
      if(!valid(value) || value == getText()) return;
      ui.setAttribute("value",value);
      oldValue = value;
      console.log('valueChanged', value);
    };

    define(this,'ui',ui);
    define(this,'Text',getText);
    define(this,'SetText',setText);
    setText(text);

    events.on('keyup', this, e => {
      let c = e.currentTarget.value, res=valid(c);
      if(!res ){
        e.preventDefault();
        ui.value = oldValue;
      }else{
        oldValue = c;
      }
    });

  }
   

  define(CTextEdit,"Filter_ALL",      /./);
  define(CTextEdit,"Filter_INTEGER",      /\d+/);
  define(CTextEdit,"Filter_FLOAT",        /(\d+\.\d+|\.\d+)/);
  define(CTextEdit,"Filter_NUMERIC",      utils.RegAdd(CTextEdit.Filter_FLOAT,CTextEdit.Filter_INTEGER));
  define(CTextEdit,"Filter_ALPHABETIC",   /^\b[a-zA-Z]+/);
  define(CTextEdit,"Filter_ALPHANUMERIC", /\b[a-zA-Z0-9]+/);
  define(CTextEdit,"Filter_EMAIL",        /^[a-zA-Z0-9]+.\.?[a-z0-9]+@[a-zA-Z0-9]+.((\.|\_*)[a-z0-9]+){1,}$/);

  // NumericInput | Alphanumeric | Password | Email | URL | NumericUnit
  function CToggle(item,flags, states){
    // toggle
    // nextState
    // prevState
    // lastState
    // firstState
     // states = {disabled:EFlag('fill-none text-none'), active:'fill-bright', selected:'fill-highlight'};
    // flags = {disabled:'', active:'', selected:''};
  }
  // tgg.items; 
  // tgg.multiToggle; 
  // tgg.addItem 
  // tgg.removeItem, 
  // tgg.activeIndex   = 30; 
  // tgg.disabledIndex = 0; 
  // tgg.contains(selector); 
  // tgg.toggleNext();       => Toggles the next index 
  // tgg.togglePrevious();   => Toggles the previous index 
  // tgg.toggleFirst();      => Toggles the first index
  // tgg.toggleLast();       => Toggles the last index
  // tgg.toggleIndex(index)  => Toggles the specified index.
  // tgg.toggle() => Toggles the active index.
  // CToggleGroup(items,{default:'',disabled:'disabled', active:{flag:'fill-dark text-bright stroked-b-2', trigger:'click'}, selected:'fill-bright'});
  // state:{name:String, trigger:String, index:Number, flags:StringList, beforeState:'active', afterState:'toggle' }
  /**
   * @example 
   * tg = new CToggleGroup(tabList,{
   *  default:  {flag:'stroked padded fill-base'},
   *  hovered:  {flag:'fill-light',   event:'mouseover'},
   *  pressed:  {flag:'fill-base',    event:'mousedown'},
   *  active:   {flag:'fill-base',    event:'click', not:'disabled'},
   *  selected: {flag:'fill-bright',  event:''},
   *  dragging: {flag:'stroke-dashed',  event:'mousedown + mousemove + keydown_13'},
   * });
   *  */ 
  function CToggleGroup(items, states, activeIndex=0 ){
    let _items      = items, 
    _states         = states, 
    _currState      = 'default', 
    _activeIndex    = activeIndex, 
    _disabledIndex  = -1, 
    _activeFlag     = "active", 
    _activator      = 'click', 
    _disabledFlag   = "disabled";
    let _list       = [];

    define(this,'items',_items );
    define(this,'states',_states );
    define(this,'activator',_activator );
    define(this,'activeFlag',_activeFlag,  flag =>{ return _activeFlag = flag; } );
    define(this,'disabledFlag',_disabledFlag, 'activeFlag',_activeFlag, null, flag =>{ return _disabledFlag = flag; } );

    define(this,'activeIndex',_activeIndex );
    define(this,'disabledIndex',_disabledIndex );

    const _clear = ( index =0, toState = 'default' )=>{
      for( let state in this.states ){
          if( state != toState )
            utils.Unflag( _list[index].item, this.states[_list[index].state].flag );
        };
        _list[index].state = toState;

        utils.Flag( _list[index].item, this.states[_list[index].state].flag );
    };
    const _clearAll = ( exceptions = 'always' )=>{
      if( typeof exceptions == 'string')
        exceptions = exceptions.split(/(\s+|\s*\,\s*)/);
      
      _list.forEach( (item, index)=>{
        for( let state in this.states )  
          if( exceptions.indexOf(state) < 0 )
            utils.Unflag(item.item, this.states[state].flag );
      })
    }
    this.HasState = state =>{
       return state in this.states;
    };
    this.HasIndex = index =>{
       return index >= 0 && index < this.items.length;
    };
    // toggle( index, hovered, default, mouseover, mouseout)
    this.Toggle = ( index, state, state2='default' )=>{
      if(!this.HasIndex(index) && this.HasState(state) && this.HasState(state2)){
        console.log('failed to toggle index:',index,', state:',state,' outta range');
        return;
      }
      let _current = _list[index].state;
      _clear(index);
      if( _current == state ){
        utils.Unflag(_items[index], this.states[state]['flag']);      
        utils.Flag(_items[index], this.states[state2]['flag']);
        _list[index].state = state2;
      }
      if( _current == state2 ){
        utils.Unflag(_items[index], this.states[state2]['flag']);      
        utils.Flag(  _items[index], this.states[state]['flag']);
        _list[index].state = state;
      }
      //_activeIndex = index;
    };

    // disabled = {flag:'disabled', clearAll:true, css:'border-bottom: dashed 1px grey; color: lightgrey;' }
    // activated = {flag:'fill-dark', clearAll:true, css:'border-bottom: dashed 1px orangered', callback:itemClicked }

    this.toggleFirst = ()=>{
      if(_activeIndex > 0)
        _clear();
      _activeIndex = 0;
      utils.Flag(_items[_activeIndex], _activeFlag);
    };
    
    this.GetState = index =>{
      if( this.HasIndex(index))
       return _list[index].state;
      return null;
   };
    this.SetState = (index, state)=>{

      // 1 - check if state exists
      // 2 - check if item is in exlusive states
      // 3 - if not in exclusions state, proceed to the new state
      if(!this.HasState(state) || !this.HasIndex(index)){
        console.log("::SetState -> State ", state,'does not exist!');
        return;
      }
      
      if(_list[index].exclusions.indexOf(state)>-1)
          return;
      

      let _state = this.states[state];
      
      if( typeof _state.clear === 'string' && _state.clear.length > 0 ){
        if( _state.clear !== '*'){

          let thoseStates = _state.clear.split(/(\s+|\s*\,\s*)/);
         
          thoseStates.forEach( st =>{
            // 1 - find and unflag that state
            _list.forEach( i => {
              if( st in this.states )
                utils.Unflag( i.item, _states[st].flag );
              else
                console.log('could not clear ',st,'state');
            })
          });
        }  
        else 
         _clearAll(); 
         
        
        // state.clearList.push('hovered')

      }

      _activeIndex = index;

        let item =  _list[index];
        item.state = state;
        utils.Flag( item.item, this.states[state].flag );
    };
    // items.select(i); items.activate(i); items.toggle(i,'default')
    // items.currentIndex = 0; items.currentState(); items.select(index, 'active')
    // items.toggle( index ); 
    // items.SetActive( index );
    // items.Set( index, state );
    // items.Clear(state); -> clears the selection to default
    // items.Toggle(i, state );
    // items.Activate(i,state_selected);
    this.SetTrigger = ( state, trigger )=>{
      if( typeof trigger == 'string' && trigger.length > 0){

        let event = trigger.toString();
        _items.forEach( (item, index)=>{
         // let others=[];
         // let clear = this.states[state];
         // if( typeof clear == 'string' )
         //  others = clear.split(/(\s+|\s*\,\s*)/);
          item.handler = e =>{
            //others.forEach( s=>{ });
             if( item.state !== state ){
               this.SetState( index, state );
               if( typeof this.states[state].callback == "function" ){
                 this.states[state].callback({event,item, index, flag: this.states[state].flag});
               }
             }
          };

          events.on(event, item, item.handler );
        });
      }
    };

    const _initStates = ()=>{
      for( let s in this.states ){
        let state = this.states[s];       
        if( 'on' in state )
          this.SetTrigger(s,state.on);
        else 
         console.log('no triggers for state:', s); 
      }
    };
    const _initItems = ()=>{
      this.items.forEach( (item, index) =>{
        let exclusions = [];
        if( 'not' in item ){
          if( typeof item.not === 'string')
            exclusions = item.not.split(/(\s+|\s*\,\s*)/);
          
        }
        _list.push({item, index, state:'default', active:false, disabled: false, exclusions: exclusions});
      });
    }
    const _initAll = ()=>{
      _initStates();
      _initItems();
      if( this.HasState("always")){
        _list.forEach( (item, index) =>{
          this.SetState(index, "always" );
        });
      }

    };
    _initAll();
  }

  /**
   * CDock(location, direction);
   * west_zone.add( item )
   * CDockItem(widget)
   * west.add(item)
   * 
   * dock.DragEntered
   * dock.Draged 
   * dock.DragExited 
   * dock.Droped
   * 
   * dock.onDropZoneEnter
   * dock.onDropZoneExit
   * dock.onDropZoneDrag
   * dock.onDragCanceled
   */
  function CDock(item,area){
    let _item = item;
    let _area = area;
    define(this,'item',_item, newItem =>{ _item = newItem; _item_changed( newItem ); });
    define(this,'area',_area, area =>{ _area = area; _area_changed( area ); });
  }
  CDock.WEST;
  CDock.EAST;
  CDock.NORTH;
  CDock.SOUTH;
  let FRAME_COUNT = 0;
  function CFrame(x=0, y=0, w=0,h=0, flags=''){
    let _ui = CTag(flags,'frame'+FRAME_COUNT);
    let _unit = 'px';
    let _x;
    let _y;
    let _w;
    let _h;
    FRAME_COUNT++;
    define( this, 'ui',     _ui );
    define( this, 'DC',    () => _ui );
    define( this, 'x',      _x, x =>{      _x = x;       this.ui.style.left   = typeof _x !== "number"?_x :_x + _unit;});
    define( this, 'y',      _y, y =>{      _y = y;       this.ui.style.top    = typeof _y !== "number"?_y :_y + _unit;} );
    define( this, 'width',  _w, width =>{  _w = width;   this.ui.style.width  = typeof _w !== "number"?_w :_w + _unit;} );
    define( this, 'height', _h, height =>{ _h = height;  this.ui.style.height = typeof _h !== "number"?_h :_h + _unit;} );
    const _moveTo = (x,y)=>{
      this.x = x;
      this.y = y;
    };
    const _resize = (w,h)=>{
      this.width = w;
      this.height = h;
    };
    const _reset = (x,y,w,h)=>{
      _moveTo(x,y);
      _resize(w,h);
    };
    define(this,"MoveTo",_moveTo);
    define(this,"Resize",_resize);
    define(this,"Reset",_reset);
    this.Reset(x,y,w,h);

  }

  
function CCombo( widget, content, callback ){
  let input = CTag('inline',null);
  let btn   = CTag('combo-btn',null,'span');
  let ui  = CTag('mask inline',null);
  let pane    = CTag('clist masked align-br clist-alternate w125',null,'clist');
  this.ui   = ui;
  addChild( input, ui );
  addChild( btn,   ui );
  addChild( pane,  ui );

  if( widget )
    addChild( widget,  input );
  if( content !== null && content.constructor.name == "Array" )
   content.forEach((item, i) => {
     let li;
     if( typeof item == "string"){
        li = CText( item,'cli' );
     }else
     li = CTag('cli',null,'cli');
     //addChild( item,  li );
     addChild( li,  pane );
   });



}

  
    exports.init = init;
    exports.main = main;
    exports.quit = quit;
    exports.RegisterClass = RegisterClass;
    exports.CCombo = CCombo;
    exports.CFrame = CFrame;
    exports.CDock = CDock;
    exports.CToggleGroup = CToggleGroup;
    exports.CText = CText;
    exports.addChild = addChild;
    exports.CListView = CListView;
    exports.CSlider = CSlider;
    exports.CTextEdit = CTextEdit;
  

  return exports;
}));

