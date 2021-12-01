
// ------------------------------------------- CSLIDER
qPack("CSeekBar",function() {
    const CWidget = qRequire("CWidget");
    const CFrame  = qRequire("CFrame");
    //const CVBoxLayout = qRequire("CVBoxLayout");
    const Geom = qRequire("Geom");
    const CCSS = qRequire("CCSS");
    const CSignal = qRequire("CSignal");
    const qPercent  = qRequire("CMath").qPercent;
    const qFloat  = qRequire("CMath").qFloat;
    const qRound  = qRequire("CMath").qRound;
  
    CCSS.New("CSeekBar")
    .Add(".CSeekBar",{
        "position":"relative",
        "display":"block",
       "background-color":"#595",
        //"width":"auto",
        //"height":"auto",
    })
    .Add(".CSeekBar-bar",{
        "position":"absolute",
        "display":"block",
        "width":"100%",
        "height":"100%",
        "background-color":"green",
    })
    .Add(".CSeekBar-progress",{
      "position":" absolute",
      "background-color":"#941",
      "display":" block",
      "min-height":" 1px",
      "max-height":" 100%",
      "max-width":" 100%",
      "-moz-box-sizing":" border-box",
      "box-sizing":" border-box !important",
    })
    .Add(".CSeekBar-bar.size-w-full",{
        "width":"100%"
    })
    .Add(".CSeekBar-bar.size-h-full",{
        "height":"100%"
    })
    .Add(".CSeekBar-thumb",{
        "position":"absolute",
        "display":"block"
    })
    .Add(".CSeekBar-text",{
        "position":"absolute",
        "display":"block",
        "left":"0",
        "top":"0",
        "user-select":"none",
        "color":"#eee"
    })
    .Add(".CSeekBar-thumb::before",{
      "content":"' '",
      "display":"block",
      "transform":"translate(-50%, -50%)",
      "position":"absolute",
      "top":"50%",
      "left":"50%",
      "width":"14px",
      "height":"14px", 
      "transform":" translate(-50%, -50%)",
      "background-color": "transparent",
      "border-radius": "15px",
  })
  .Add(".CSeekBar-thumb *",{
    "top": "-15px",
    "left": "50%",
    "transform": "translateX(-50%)",
    "position": "absolute",
    "text-align": "center",
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

  function CSeekBar(orientation = "horizontal", maximum = 180, minimum = 0, length = 100, thickness = 20, presset =null, useParentAsListener = false ) {
    ++sliderCount;

      qExtend(this, CWidget, 'div', 'CSeekBar');
    const $this = this;
    var 
    ui_box,
    ui_bar,
    ui_seek,
    ui_progress,
    ui_thumb;

    this.InitialInfo   = function(){ return("#"+(sliderCount)+", length:"+length+", thickness:"+thickness);}
    var _ = {
      change: 0,
      val: 0,
      mLength: 0,
      wheelSpeed: 0,
      wheelStep: 2,
      computedLength: 0,
      progress: 0,
      lag:0.5,
      lagged:false,
      step: 1,
      min: {x:0,y:0},
      max: {x:length,y:length},
      unit: "px",
      showLabel: "default",
      gap: 1,
      log: {index:sliderCount},
      useParentAsListener:useParentAsListener,
      this: this,
      listener:null,
      isDown: false,
        area: {
          pressed   : {x:0,y:0},
          released  : {x:0,y:0},
          current   : {x:0,y:0},
          isPressed : false},
      presset:presset,
      pressetMode: presset !== null
    };
    
    const m_ = {        
      orientation: "String",
      unit: "String",
      maximum: "Number",
      minimum: "Number",
      length: "Number",
      thickness: "Number",
      progress: "Number",
      value: "Number",
    };

    qProperties(this,m_);
    //////////////////////////////////////////////////////// SIGNALS

    this.ValueChangeEvent = function(e) {};

      ui_bar     =  new CWidget('div', 'CSeekBar-bar');
      ui_progress=  new CWidget('div', 'CSeekBar-progress');
      ui_thumb  =  new CWidget('div', 'CSeekBar-thumb');

      this.AddChild(ui_progress);
      ui_progress.AddChild(ui_thumb);
      //if( _.showLabel == "default" )
      this.AddChild(ui_bar);
    
    this.Info = function(){
      res = "";
      for( var i in _.log )
        res += i + " : "+_.log[i].toString()+"|";
      return res;
    };
    
    this.Redraw = function() {
      //if( _.pressetMode == true ) return;
      _.computedLength  = qPercent(m_.progress,m_.length);
      if( this.Orientation() === "horizontal"){
        
        //CCSS.Set($this, "width", this.Length() + m_.unit);
        CCSS.Set($this, "height", this.Thickness() + m_.unit);
        
        CCSS.Set(ui_bar, "width","inherit");
        CCSS.Set(ui_bar, "height",this.Thickness() + m_.unit);

        CCSS.Set(ui_progress, "width", _.computedLength + m_.unit);
        CCSS.Set(ui_progress, "height",this.Thickness() + m_.unit);
      }
      else if( this.Orientation() === "vertical"){
        
        CCSS.Set($this, "width", this.Thickness() + m_.unit);
        CCSS.Set($this, "height", this.Length() + m_.unit);
        
        CCSS.Set(ui_bar, "width",this.Thickness() + m_.unit);
        CCSS.Set(ui_bar, "height","inherit");

        CCSS.Set(ui_progress, "width",this.Thickness() + m_.unit);
        CCSS.Set(ui_progress, "height", _.computedLength + m_.unit);
      }
      
    };


    let _Render = ()=> {
      _.computedLength  = qPercent(m_.progress, m_.length);
      CCSS.Set(ui_progress, this.IsHorizontal()? "width":"height", _.computedLength + _.unit);
    };

    this.IsHorizontal = function(){
      return this.Orientation() === "horizontal";
    }
    
    function _InitLagged( ){
      _L   = _.lagged?  -_.lag * m_.length : 0;
      _R   = _.lagged?   m_.length + _.lag * m_.length : m_.length;
      _T   = _.lagged?  -_.lag * m_.length : 0;
      _B   = _.lagged?   m_.length + _.lag * m_.length : m_.length;
     // console.log("L:"+_L+", R:"+_R+"\nT:"+_T+", B:"+_B);
    }
    /* function _ComputeLagged(e){
      
      e.x -= _.range;
      e.y -= _.range;

      _pos.x = Math.min(Math.max(e.x,_L),_R);
      _pos.y = Math.min(Math.max(e.y,_B),_T);
      m_.progress   = $this.IsHorizontal() ? qPercent(0,_R,_pos.x ): qPercent(0,_B,_pos.y );
      $this.SetText(m_.progress.toString()+"%" );
      _Render();
    } */
    /////////////////////// HANDLERS
    this.MouseLeaveEvent = function(e) {
      _.area.isPressed = false;
    };

    this.MousePressEvent = function(e) {
      _.area.deltaY = e.y; 
      e.x -= $this.X();
      e.y -= $this.Y(); 
      _.area.pressed.x = e.x;
      _.area.pressed.y = e.y; 
      //if(!e.ctrlKey) return;
      _.area.isPressed = true;// _.area.HasPoint(e.x,e.y);
      _.mLength = $this.IsHorizontal() ? (e.x - $this.X() ):( e.y - $this.Y());       
      $this.SetProgress(qPercent(0, m_.length, _.mLength));
    };

    this.MouseMoveEvent = function(e) {
      // _.area.current.x = e.x;
      // _.area.current.y = e.y; 
      if (_.area.isPressed /* && _.area.HasPoint(e.x,e.y) */ ) {
        _.mLength = $this.IsHorizontal() ? e.x - $this.X(): e.y - $this.Y();       
        
        $this.SetProgress(qPercent(0, m_.length, _.mLength) );
      }
    };
    this.MouseReleaseEvent = function(e) {
      _.area.isPressed = false;
      _.area.released.x - e.x;
      _.area.released.y = e.y; 
      _.mLength = $this.IsHorizontal() ? (e.x - $this.X() ):( e.y - $this.Y());       
      //$this.SetRange(Math.max(0,(qPercent(0, m_.length, _.mLength)) ) );
    };
    this.WheelEvent = function(e) {
          
      _.wheelSpeed = (e.deltaY * 0.01 * _.wheelStep);
      _.mLength = Math.min(m_.length, _.mLength + _.wheelSpeed  );
      $this.SetProgress(qPercent(0, m_.length, _.mLength) );
    
    };
    this.InitEvents = function( ){
      //_SetMouseArea(this);
      //document.body.onmousedown   = _MousePressEvent;
      document.onmouseup       = this.MouseReleaseEvent;
      this.DC().onmouseup    = this.MouseReleaseEvent;
      document.onmousemove     = this.MouseMoveEvent;
      this.DC().onmousedown  = this.MousePressEvent;
      //_.area.SetReleaseHandler( this.MouseReleaseEvent);
      //
      //_.area.SetPressHandler( this.MousePressEvent);      
      //_.area.SetMoveHandler( this.MouseMoveEvent);
      //_.area.SetLeaveHandler(this.MouseLeaveEvent);
    };

    
    const HandleProgress = ( e )=>{
      var n = e.progress;
      if( _.step !== 1 && (qRound(n,1) % _.step !== 0) ) return;
      m_.progress = Math.max(Math.min(Math.min(n,100)),0);
      _Render();
     
    };
    this.SeekTo = function( n, easing="linear" ) {
      if( n >= 0 || n <= 100 && n !== m_.progress )
      this.SetProgress(n);
    };
    this.SeekBy = function( n, easing="linear" ) {
      if( n + m_.progress >= m_.minimum || n + m_.progress <= m_.maximum )
      this.SetProgress(m_.progress + n);
    };

    //////////////////////////////////////////////////////////
    this.IncreaseProgressBy = function( step = _.step ){
      if( m_.progress < 100)
      this.SeekBy(  step );
    };
    this.DecreaseProgressBy = function( step = _.step){
      if( m_.progress > 0) 
      this.SeekBy( -step );
    };
    this.IncreaseValueBy = function( step = _.step ){
      if( m_.value < m_.maximum)
      this.SetValue( m_.value + step);
    };
    this.DecreaseValueBy = function( step = _.step){
      if( m_.value > m_.minimum) 
      this.SetValue( m_.value -step);
    };
    //////////////////////////////////////////////////////////
    const HandleValue = (e) => {
      var n = Math.min(qFloat(e.value), m_.maximum);
      this.SetProgress(qPercent(0, m_.maximum, n));
      this.ValueChangeEvent(n);
    };
    const HandleLength = ( e )=> {            
      this.Redraw();
      //this.ValueChangeEvent( this.Value());
    };
        
    const HandleThickness = ( e ) => {        
      this.Redraw();
      //this.ValueChangeEvent(this);
    };
    
    const HandleOrientation =  ( e )=> {        
      this.Redraw();
      //this.ValueChangeEvent( this );
    };

    /////////////////////////////////////////////
    this.Init = function() {

      this.SetOrientation(orientation);
      this.SetMaximum(maximum);
      this.SetMinimum(minimum);
      this.SetLength(length);
      this.SetThickness(thickness);
      this.SetValue(minimum);
      this.SetProgress(0);
      this.SetUnit('px');
      //m_.progress = 0;

      _InitLagged();
      this.Redraw();
      //_Render();
      this.InitEvents();
      if(!presset) CCSS.Set(this, 'background-color', 'rgba(100,100,100,0.5)');
       CCSS.Set(this, 'background-color', 'transparent');
       CCSS.Set(this.Widgets().progress, 'background-color', '#17C5');

       // Connections ////////////////////////////
       this.OrientationChanged.Add( HandleOrientation );
       this.ThicknessChanged.Add( HandleThickness );
       this.LengthChanged.Add( HandleLength );
       this.ProgressChanged.Add( HandleProgress );
       this.ValueChanged.Add( HandleValue );
    };
    this.Widgets = function() {
      return {progress:ui_progress, bar:ui_bar, handle: ui_thumb};
    };
    this.Init();
    this.Clone = function(){
      var res = new CSeekBar(m_.maximum,_.range,m_.length,m_.thickness);
      CCSS.Add(res,this.DC().classList.toString());
      return res;
    };
  };

  ///////////////////////////////////////////////////////// PROTOTYPES
  
  CSeekBar.prototype.KeyPressEvent = function( event ){
    switch (event.keyCode) {
      case 37:
      case 40:
        this.DecreaseProgressBy();
        break;    
      case 38:
      case 39:
        this.IncreaseProgressBy();
        break;    
      default:
        break;
        
    }
    //console.log(event.keyCode);
    qSuper(this,"KeyPressEvent",event);
  }
  /////////////////////////////////////////////////////////
  CSeekBar.HORIZONTAL = "horizontal";
  CSeekBar.VERTICAL =  "vertical";

  CSeekBar.New = function(maximum = 180, progress = 20, length = 200, thickness = 20) {
    var res = new CSeekBar(CSeekBar.HORIZONTAL, maximum, progress, length, thickness);
    return res;
  };
  CSeekBar.Cast = function( dom, maximum= 180, progress = 0, length = 0, thickness = 0 ) 
  {
    progress   = progress, 
    length       = length || Geom.GetWidth(dom);
    thickness    = thickness || Geom.GetHeight(dom);
    
    //////////////////////////////////////////////////////// 
    // presset = { text, range, handle }
    if( _.pressetMode && presset.classList.contains("CSeekBar") ){
      
      var node  = {bar:null,progress:null, handle:null, label:null};
      for( var i =0; i < presset.children.length; i++ ){
        var c = presset.children[i];
        if( c.classList.contains("CSeekBar-bar") && !c.classList.contains("CSeekBar-progress") ) 
        node.bar = c;
        _.log.hasBar = "true";
        if( c.classList.contains("CSeekBar-progress") ) {
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
              node.handle   = DOM("div","CSeekBar-thumb");
              _.log.rogress = true;
             //node.handle   = DOM("div","CSeekBar-thumb");
           }
        }        
        
      }

      var ui_bar     =  new CWidget( node.bar ||'div', node.bar?"":'CSeekBar-bar');
      var ui_progress=  new CWidget( node.progress ||'div', node.progress?"": 'CSeekBar-progress');
      var ui_thumb  =  new CWidget( node.handle ||'div',  node.handle?"": 'CSeekBar-thumb');
      var ui_label   =  new CWidget( node.label ||'span', 'hidden');

      if( !node.bar     ) this.AddChild( ui_bar );
      if( !node.progress) this.AddChild( ui_progress );
      if( !node.handle  ) ui_progress.AddChild( ui_thumb );
      if( !node.label && _.showLabel == "create"   ) ui_progress.AddChild( ui_label );

    }
    var res = new CSeekBar(
     CSeekBar.HORIZONTAL,
     maximum, 
     progress, 
     length,
     thickness,
     dom
      );
    return res;
  };


  return CSeekBar;
});