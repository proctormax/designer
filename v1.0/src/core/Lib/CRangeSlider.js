// ------------------------------------------- CSLIDER
qPack("CRangeSlider",function() {
    const CWidget = qRequire("CWidget");
    const CFrame  = qRequire("CFrame");
    //const CVBoxLayout = qRequire("CVBoxLayout");
    const Geom = qRequire("Geom");
    const CCSS = qRequire("CCSS");
    const CSignal = qRequire("CSignal");
    const qPercent  = qRequire("CMath").qPercent;
    const qFloat  = qRequire("CMath").qFloat;
    const qRound  = qRequire("CMath").qRound;
  
    CCSS.New("cslider")
    .Add(".cslider",{
        "position":"absolute",
        "display":"block",
       // "background-color":"#193 !important"
        //"width":"auto",
        //"height":"auto",
    })
    .Add(".cslider-bar",{
        "position":"absolute",
        "display":"none"
    })
    .Add(".cslider-progress",{
        "position":"absolute",
        "display":"block",
        "background-color":"#159 !important",
        "height":"100%"
    })
    .Add(".cslider-bar.size-w-full",{
        "width":"100%"
    })
    .Add(".cslider-bar.size-h-full",{
        "height":"100%"
    })
    .Add(".cslider-handle",{
        "position":"absolute",
        "display":"block"
    })
    .Add(".cslider-label",{
        "position":"absolute",
        "display":"block",
        "left":"0",
        "top":"0",
        "user-select":"none",
        "color":"#eee"
    })
  let ESliderFlag = {
    HORIZONTAL:"slider-horizontal",
    VERTICAL:"slider-horizontal",
    SCROLLBAR:"slider-horizontal",
    RANGE_SLIDER:"slider-horizontal",
    DUEL_RANGE:"slider-horizontal",
    HANDLE_ATTACHED:"slider-horizontal",
    HANDLE_INVISIBLE:"slider-horizontal"
  };

  function _Attrib(node,attrib){
    return node.getAttribute(attrib);
  }
  let INDEX = 0;
  function _TraceNode(index,node,tag="widget"){

    if(node.children.length){
      for( var c =0; c < node.children.length;c++ ){
        var o={};
        var k = node.children[c];
        if( k.tagName === tag){
          //o.node  = k;
          o[_Attrib(k,"name")] = _Attrib(k,"class");
          o.parent = _Attrib(node,"name");
          o.index = c;
          o.INDEX = index.length;
          index.push( o );
          if(k.children.length)_TraceNode(index,k,tag);
          ++INDEX;
        }
      }
    }

  }
  let sliderCount = 0;

  function CRangeSlider(orientation = 0, maximum = 180, minimum = 0, length = 100, thickness = 20, presset =null, useParentAsListener = false ) {
    ++sliderCount;
    orientation = parseInt(orientation);
    orientation = orientation > 1 ? 1 : orientation;
    this.InitialInfo   = function(){ return("#"+(sliderCount)+", length:"+length+", thickness:"+thickness);}
    var _ = {
      listener:null,
      isDown: false,
      orientations: ['width', 'height'],
      orientation: orientation,
      change: 0,
      orientation2: orientation == 1 ? 0 : 1,
      maximum: maximum,
      minimum: minimum,
      val: 0,
      length: length,
      mLength: 0,
      wheelSpeed: 0,
      wheelStep: 2,
      computedLength: 0,
      progress: 0,
      lag:0.5,
      lagged:false,
      step: 1,
      gap: 1,
      min: {x:0,y:0},
      max: {x:length,y:length},
      unit: "px",
      log: {index:sliderCount},
      thickness: thickness,
      this: this,
      useParentAsListener:useParentAsListener,
      area: {
        pressed   : {x:0,y:0},
        released  : {x:0,y:0},
        current   : {x:0,y:0},
        isPressed : false},
      showLabel: "default",
      presset:presset,
      pressetMode: presset !== null
    };
    //////////////////////////////////////////////////////// SIGNALS

    this.ValueChangeEvent = function(e) {};

    const _valueChanged = new CSignal(this,"ValueChanged",{"value":"Number"});
    const _thicknessChanged = new CSignal(this,"ThicknessChanged",{"thickness":"Number"});
    const _lengthChanged = new CSignal(this,"LengthChanged",{"length":"Number"});
    const _orientationChanged = new CSignal(this,"OrientationChanged",{"orientation":"String"},90);
    Object.defineProperties(this,{"ValueChanged":{
          get:()=>{
              return _valueChanged;
          }
        },"ThicknessChanged":{
            get:()=>{
                return _thicknessChanged;
            }
        },"LengthChanged":{
            get:()=>{
                return _lengthChanged;
            }
        },"OrientationChanged":{
            get:()=>{
                return _orientationChanged;
            }
        }
    });
    //////////////////////////////////////////////////////// 
    // presset = { text, range, handle }
    if( _.pressetMode && presset.classList.contains("cslider") ){
      
      var node  = {bar:null,progress:null, handle:null, label:null};
      for( var i =0; i < presset.children.length; i++ ){
        var c = presset.children[i];
        if( c.classList.contains("cslider-bar") && !c.classList.contains("cslider-progress") ) 
        node.bar = c;
        _.log.hasBar = "true";
        if( c.classList.contains("cslider-progress") ) {
            node.progress = c;
            _.log.progress = true;
           switch( node.progress.children.length){
             case 1:
              node.handle = node.progress.children[0];
              _.log.handle = true;
              break;       
              case 2:
              node.handle2   = node.progress.children[0];
              node.handle  = node.progress.children[1];
              _.log.twoHandles = true;
              break;       
              default:
              node.handle   = DOM("div","cslider-handle");
              _.log.rogress = true;
             //node.handle   = DOM("div","cslider-handle");
           }
        }        
        
      }
      const _properties = {
        length:"Number",
        maximum:"Number",
        minimum:"Number",
        value:"Number",
      }
      qExtend(this,CWidget, presset, 'cslider block');
      qProperties(this, _properties);

      _.barUI     =  new CWidget( node.bar ||'div', node.bar?"":'cslider-bar');
      _.progressUI=  new CWidget( node.progress ||'div', node.progress?"": 'cslider-progress');
      _.handleUI  =  new CWidget( node.handle ||'div',  node.handle?"": 'cslider-handle');
      _.labelUI   =  new CWidget( node.label ||'span', 'hidden');
      if( !node.bar     ) this.AddChild( _.barUI );
      if( !node.progress) this.AddChild( _.progressUI );
      if( !node.handle  ) _.progressUI.AddChild( _.handleUI );
      if( !node.label && _.showLabel == "create"   ) _.progressUI.AddChild( _.labelUI );

    }else{
      qExtend(this, CWidget, 'div', 'cslider');
      _.barUI     =  new CWidget('div', 'cslider-bar');
      _.progressUI=  new CWidget('div', 'cslider-progress');
      _.handleUI  =  new CWidget('div', 'cslider-handle');
      _.labelUI   =  new CWidget('div', 'cslider-label');
      this.AddChild(_.barUI);
      this.AddChild(_.progressUI);
      _.progressUI.AddChild(_.handleUI);
      if( _.showLabel == "default" )
      this.AddChild(_.labelUI);
    }
    this.Info = function(){
      res = "";
      for( var i in _.log )
        res += i + " : "+_.log[i].toString()+"|";
      return res;
    };
    //////////////////// PRIVATE
    let _SetMouseArea = function( target, pressHandler=null, moveHandler=null, releaseHandler=null, leaveHandler=null  ){
       var t = CCSS.$(target);
       var r = Geom.GetRect(t);
       _.log.area = "["+r.toString()+"]";
        var o = 
        {
          pressed   : {x:0,y:0},
          released  : {x:0,y:0},
          current   : {x:0,y:0},
          isPressed : false,
          X         : ( ) => { return r[0]; },
          Y         : ( ) => { return r[1]; },
          Bound     : ( ) => { return r;    },
          width     : ( ) => { return r[2]; },
          height    : ( ) => { return r[3]; },
          Left      : ( ) => { return r[0]; },
          Right     : ( ) => { return r[1]; },
          Top       : ( ) => { return r[4]; },
          Bottom    : ( ) => { return r[5]; },
          PressHandler  : pressHandler,
          MoveHandler   : moveHandler,
          LeaveHandler  : leaveHandler,
          ReleaseHandler: releaseHandler
        };
        o.HasPoint = function( x,y ){
          return x > o.Left() && x < o.Right() && y < o.Bottom() && y > o.Top();
        };
        o.SetPressHandler = function( handler ){
          o.PressHandler = handler;
          t.onmousedown = handler;
        };
        o.SetMoveHandler = function( handler ){
          o.MoveHandler = handler;
          t.onmousemove = handler;
        };
        o.SetReleaseHandler = function( handler ){
          o.ReleaseHandler = handler;
          t.onmouseup     = handler;
        };
        o.SetLeaveHandler = function( handler ){
          o.LeaveHandler = handler;
          t.onmouseout    = handler;
        };
        _.area = o;
        /* 
        area.Tapped       = area.Clicked
        area.Touched      = area.Pressed
        area.DoubleTouched
        area.TripleTouched
        area.DoubleTapped = area.DoubleClicked,
        area.Dragged,
        area.Pinched,
        area.ZoomedIn,
        area.ZoomedOut,
        area.Moved,
        area.Scrolled
        area.Hovered
        area.Left
        
        area.Pressed = new CSignal(this,"mouseDown")
        area.Pressed.Add( pressHandler );
        area.Released.Add( releaseHandler );
        area.Moved.Add( moveHandler ); */
    };
    this.Redraw = function() {
      //if( _.pressetMode == true ) return;
      _.orientation2    = _.orientation == 1 ? 0 : 1;
      _.computedLength  = qPercent(_.progress,_.length);
      //qPercent(_.range - _.step, _.length);
      CCSS.Set(_.this, _.orientations[_.orientation], _.length + _.unit);
      CCSS.Set(_.this, _.orientations[_.orientation2], _.thickness + _.unit);
      
      CCSS.Set(_.barUI, _.orientations[_.orientation2],_.thickness + _.unit);
      CCSS.Switch(_.barUI,(_.orientation2==0?'size-h-full':'size-w-full'),(_.orientation2==1?'size-w-full':'size-h-full'));
      
      // CCSS.Set(_.progressUI, _.orientations[_.orientation2],_.thickness + _.unit);
      CCSS.Set(_.progressUI, _.orientations[_.orientation], _.computedLength + _.unit);
      CCSS.Switch(_.progressUI,(_.orientation2==0?'size-h-full':'size-w-full'),(_.orientation2==1?'size-w-full':'size-h-full'));
    };
    let _Render = function() {
      _.computedLength  = qPercent(_.progress, _.length);
      CCSS.Set(_.progressUI, _.orientations[_.orientation], _.computedLength + _.unit);
    };
    var _L,_R,_T,_B,_pos={x:0,y:0},_old={x:0,y:0};
    function _InitLagged( ){
      _L   = _.lagged?  -_.lag * _.length : 0;
      _R   = _.lagged?   _.length + _.lag * _.length : _.length;
      _T   = _.lagged?  -_.lag * _.length : 0;
      _B   = _.lagged?   _.length + _.lag * _.length : _.length;
     // console.log("L:"+_L+", R:"+_R+"\nT:"+_T+", B:"+_B);
    }
    /* function _ComputeLagged(e){
      
      e.x -= _.range;
      e.y -= _.range;

      _pos.x = Math.min(Math.max(e.x,_L),_R);
      _pos.y = Math.min(Math.max(e.y,_B),_T);
      _.progress   = _.orientation === 0 ? qPercent(0,_R,_pos.x ): qPercent(0,_B,_pos.y );
      _.this.SetText(_.progress.toString()+"%" );
      _Render();
    } */
    /////////////////////// HANDLERS
    this.MouseLeaveEvent = function(e) {
      _.area.isPressed = false;
    };
    this.MousePressEvent = function(e) {
      _.area.pressed.x - e.x;
      _.area.pressed.y = e.y; 
      e.x -= _.this.X();
      e.y -= _.this.Y(); 
      //if(!e.ctrlKey) return;
      _.area.isPressed = true;// _.area.HasPoint(e.x,e.y);
      _.mLength = _.orientation == 0 ? (e.x - _.this.X() ):( e.y - _.this.Y());       
      _.this.SetProgress(qPercent(0, _.length, _.mLength));
      // if( _.lagged ) document.onmousemove   =  _ComputeLagged;
      //_SetMouseArea(document.body);
      //document.body.onmousemove = _MouseMoveEvent;
    };
    this.MouseMoveEvent = function(e) {
      // _.area.current.x = e.x;
      // _.area.current.y = e.y; 
      if (_.area.isPressed /* && _.area.HasPoint(e.x,e.y) */ ) {
        _.mLength = _.orientation === 0 ?
          e.x - _.this.X():
          e.y - _.this.Y();          
        
        _.this.SetProgress(qPercent(0, _.length, _.mLength) );
      }
    };
    this.MouseReleaseEvent = function(e) {
      _.area.isPressed = false;
      _.area.released.x - e.x;
      _.area.released.y = e.y; 
      _.mLength = _.orientation == 0 ? (e.x - _.this.X() ):( e.y - _.this.Y());       
      //_.this.SetRange(Math.max(0,(qPercent(0, _.length, _.mLength)) ) );
    };
    this.WheelEvent = function(e) {
          
      _.wheelSpeed = (e.deltaY * 0.01 * _.wheelStep);
      _.mLength = Math.min(_.length, _.mLength + _.wheelSpeed  );
      _.this.SetProgress(qPercent(0, _.length, _.mLength) );
    
    };
    this.InitEvents = function( ){
      //_SetMouseArea(this);
      //document.body.onmousedown   = _MousePressEvent;
      document.onmouseup     = this.MouseReleaseEvent;
      this.DC().onmouseup    = this.MouseReleaseEvent;
      this.DC().onmousemove  = this.MouseMoveEvent;
      this.DC().onmousedown  = this.MousePressEvent;
      this.DC().onwheel      = this.WheelEvent;
      //_.area.SetReleaseHandler( this.MouseReleaseEvent);
      //
      //_.area.SetPressHandler( this.MousePressEvent);      
      //_.area.SetMoveHandler( this.MouseMoveEvent);
      //_.area.SetLeaveHandler(this.MouseLeaveEvent);
    };

    this.SetText = function(txt) {
      _.labelUI.DC().textContent = txt;
    };
    this.Text = function() {
      return _.labelUI.DC().textContent;
    };
    this.Progress = function(e) { return _.progress; };
    this.SetProgress = function( n ){
      if( _.step !== 1 && (qRound(n,1) % _.step !== 0) ) return;
      _.progress = Math.max(Math.min(Math.min(n,100)),0);
      this.SetText(qRound(_.progress,10).toString()+"%" );
      _Render();
      _valueChanged.Emit({value:this.Value(),percent:_.progress} ,90);
      this.ValueChangeEvent( qPercent( _.progress, _.maximum));
     
    };
    this.SeekTo = function( n, easing="linear" ) {
      if("string" === typeof n && n.endsWith("%")) this.SetProgress(n);
      else this.SetValue( n );      
    };
    this.SeekBy = function( n, easing="linear" ) {
      if("string" === typeof n && n.endsWith("%")) this.SetProgress(_.progress += n);
      else this.SetValue( this.Value() + Number(n));
    };
    this.SetMaximum = function(n) {
      _.maximum = Math.max(Number(n), _.minimum);
      this.ValueChangeEvent(_.range);
    };
    this.Maximum = function() {
      return _.maximum;
    };
    this.SetMinimum = function(n) {
      _.minimum = Math.min(Number(n), _.maximum);
      this.ValueChangeEvent(_.range);
    };
    this.Minimum = function() {
      return _.minimum;
    };
    this.Value = function() {
      return qPercent(_.progress, _.maximum);
    };
    this.SetValue = function(n) {
      n = Math.min(parseFloat(n), _.maximum);
      this.SetProgress(qPercent(0, _.maximum, n));
      this.ValueChangeEvent(n);
    };
    //////////////////////////////////////////////////////////
    this.Forward = function( step = _.step ){
      this.SeekBy(  step );
    };
    this.Backward = function(){
      this.SeekBy( - step );
    };
    //////////////////////////////////////////////////////////
    const _LengthHandler = function( e ) {
            
      this.Redraw();
      this.ValueChangeEvent( this.Value());
    };
        
    const _ThicknessHandler = function( e ) {        
      this.Redraw();
      this.ValueChangeEvent(_.thickness);
    };
    
    const _OrientationHandler = function( e ) {        
      this.Redraw();
      this.ValueChangeEvent(_.thickness);
    };

    /////////////////////////////////////////////
    this.Init = function() {
      this.SetText("slider");
      _InitLagged();
      _.labelUI.DC().mouseEnabled = false;
      this.Redraw();
      this.InitEvents();
      if(!presset) CCSS.Set(this, 'background-color', 'rgba(100,100,100,0.5)');
       CCSS.Set(this, 'background-color', 'transparent');
       CCSS.Set(this.ProgressUI(), 'background-color', '#17C5');

       // Connections ////////////////////////////
       this.OrientationChanged.Add( _OrientationHandler );
       this.ThicknessChanged.Add( _ThicknessHandler );
       this.LengthChanged.Add( _LengthHandler );
    };
    this.ProgressUI = function() {
      return _.progressUI;
    };
    this.Init();
    this.Clone = function(){
      var res = new CRangeSlider(_.maximum,_.range,_.length,_.thickness);
      CCSS.Add(res,this.DC().classList.toString());
      return res;
    };
  };
  CRangeSlider.HORIZONTAL = 0;
  CRangeSlider.VERTICAL = 1;

  CRangeSlider.New = function(maximum = 180, progress = 20, length = 200, thickness = 20) {
    var res = new CRangeSlider(CRangeSlider.HORIZONTAL, maximum, progress, length, thickness);
    return res;
  };
  CRangeSlider.FromDOM = function( dom, maximum= 180, progress = 0, length = 0, thickness = 0 ) 
  {
    progress   = progress, 
    length       = length || Geom.GetWidth(dom);
    thickness    = thickness || Geom.GetHeight(dom);
    
    var res = new CRangeSlider(
     CRangeSlider.HORIZONTAL,
     maximum, 
     progress, 
     length,
     thickness,
     dom
      );
    return res;
  };


  return CRangeSlider;
});