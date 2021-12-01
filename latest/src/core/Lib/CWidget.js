qPack("UI/CWidget.js",function(){

	const CObject    = qRequire("CObject");

	const CMath      = qRequire("CMath");

	const CList      = qRequire("CList");

	const Geom       = qRequire("Geom");

	const CSignal    = qRequire("CSignal");

	const CAction    = qRequire("CAction");

	const CBoxLayout = qRequire("CBoxLayout");

	const CStyle     = qRequire("CStyle");

	const CCSS       = qRequire("CCSS");

	const CSize      = qRequire("CSize");

     ///-------------------------------- INCLUDES(8) ----

	CCSS.New("CWidget")
	.Add(".CWidget",{
		"user-select":"none"
	});

	/* 
	:PROPERTY		:TYPE			:DEFAULTVALUE
	- Parent: 		CWidget,		NULL
	- Layout: 		CLayout,		NULL
	- Children: 	CWidget[],		[]
	- Draggable: 	CDraggable,		FALSE
	- DragEnabled: 	Boolean,		FALSE
	- Transform: 	CTransform,		NULL
	- Visible: 		Boolean,		FALSE
	- UiStyle: 		CStyle,			NULL
	- Size: 		CSize,			NULL
	
	:SIGNAL			:PARAMS
	- ChildAdded	{child:CWidget}
	- ChildRemoved	{child:CWidget}
	- MousePressed	{x:Number,y:Number,button:Number,keys:CKeySequence,time:Number}
	- MouseReleased	{x:Number,y:Number,button:Number,keys:CKeySequence,time:Number}
	- MouseMoved	{x:Number,y:Number,button:Number,keys:CKeySequence,time:Number}


	:EVENTS
	- DrawEvent
	- ShowEvent
	- StyleEvent
	- WheelEvent
	- MousePressEvent	:{x:Number,y:Number,button:Number,keys:CKeySequence,time:Number}
	- MouseReleaseEvent	:{x:Number,y:Number,button:Number,keys:CKeySequence,time:Number}
	- MouseMoveEvent	:{x:Number,y:Number,button:Number,keys:CKeySequence,time:Number}
	- DragEnterEvent
	- DragLeaveEvent
	- DragMoveEvent
	- DropEvent
	- KeyPressEvent
	- KeyReleaseEvent

	:METHODS
	- RemoveChild
	- AddChild
	*/




	function  CWidget(hdc="div",cls='',objectName="ui",type ="CWidget"){

		qAssert(hdc === NULL,'CWidgetError => Failed to create a null widget.');

		//QB.CObject.ExtendTo(this,[objectName,type]);
	
		qExtend(this,CObject,objectName,type.split(/\s+/)[0]);

		var m_ptr =

		{

			dc: qDOM(hdc,"CWidget "+cls),

			eventList:[],

			uidList: [],

			stage: null,

			this:  this,

			parent:null,

			bDrag: true,

			layout: null,

			size: new CSize(),

			display: "block",

			visible:true,

			uid: "wid"+Date.now().toString(15)+qRound(qRand(0,0xFFFFFF),1).toString(),

			children: [] // new CList( CWidget )

		};

		// ChildList = Array.<CWidget>
		// Children = Array.<CWidget>


		this.VisibilityChanged 	= new CSignal(this,"visibilityChanged",{visible:"bool"});

		this.SizeChanged 		= new CSignal(this,"sizeChanged",{toSize:"CSize",fromSize:"CSize"});

		this.ChildAdded 		= new CSignal(this,"childAdded",{child:"CWidget"});

		this.ChildRemoved 		= new CSignal(this,"childRemoved",{child:"CWidget"});

		this.Wheeled 			= new CSignal(this,"wheeled",{delta:"integer"}); 

		function DC(){ return m_ptr.dc;};

		this.DC = DC;

		this.UI = DC;

		m_ptr.css 		= new CStyle(this);//

		this.InitSize = function(){

			m_ptr.size.Reset(Geom.GetWidth(m_ptr.this),Geom.GetHeight(m_ptr.this));

		};

		this.DC 		= DC; // match

		this.UI 		= DC;

		this.css		= m_ptr.css;

		this.CSS 		= function(){ return m_ptr.css; };

		Object.defineProperty(this,"UiStyle",{
			get:()=>{
				return m_ptr.css;
			},
			set:( uiStyle )=>{
				qAssert( qTypeOf(uiStyle,"CStyle"));
				m_ptr.css = uiStyle;
			}
		});

		///Object.create(this,{'css':m_ptr.css,get:function(){ return m_ptr.css}})

		this.ShowEvent 	= function (e){ };
		this.SetAttribute 	= function (attrib, value){
			this.DC().setAttribute(attrib,value);
		 };




		this.Parent = function(){ return m_ptr.parent;};

		this.SetParent = function( parent ){

			m_ptr.parent = parent;

		};


		this.Layout = function(){ return m_ptr.layout;};

		this.SetLayout = function( layout ){

			if(m_ptr.layout && m_ptr.layout.DC() ) this.DC().removeChild(m_ptr.layout.DC());

			m_ptr.layout = layout;

			if(m_ptr.layout) this.DC().appendChild(m_ptr.layout.DC());

		};

		this.InitEvents =  function(){

			this.DC().onmouseup    = e =>  this.MouseReleaseEvent(e);

			this.DC().onmousemove  = e =>  this.MouseMoveEvent(e);

			this.DC().onmousedown  = e =>  this.MousePressEvent(e);

			this.DC().addEventListener("wheel", e => this.WheelEvent(e), {passive:true} );

			this.DC().onclick      = e => this.ClickEvent(e);

			this.DC().ondbclick      = e => this.DoubleClickEvent(e);

			//this.DC().onkeydown    = this.KeyEvent;
			//this.DC().onkeyup      = this.KeyEvent;

		};

		this.SetDragRect = function(rect){

		};

		this.IsDraggable =function(){

			return m_ptr.bDrag;

		}

		/*

		DragAxis

		DragHandle

		DragRegion

		DragParent

		DragMode : HorizontalDrag | VerticalDrag | NoDrag

		DragType : ObjectDrag | DataDrag

		DragStarted

		DragEnded

		DragMoved

		DataDrag

		*/
		

		this.SetDraggable = function(axis,target=this,handle=null,parent=document,button=0,region=null){

			var old=[0,0],pos=[0,0],tPos=[0,0],bPressed=false,enabled = axis >= 0;

				if(handle === null) handle = target;
			axis = typeof axis == "boolean" ? 2 : axis;
			if( axis>=0 ){

				CCSS.$(handle).addEventListener("mousedown",m_ptrInitDrag,true);

				CCSS.$(parent).addEventListener("mousemove",m_ptrStartDrag,true);

				CCSS.$(parent).addEventListener("mouseup",m_ptrEndDrag,true);

			}else{

				CCSS.$(handle).removeEventListener("mousedown",m_ptrInitDrag);

				CCSS.$(parent).removeEventListener("mousemove",m_ptrStartDrag);

				CCSS.$(parent).removeEventListener("mouseup",m_ptrEndDrag);

			}

			function m_ptrInitDrag(e){

				e.preventDefault();

				tPos = Geom.GetPos(target);

				old[0] = e.clientX - tPos[0];

				old[1] = e.clientY - tPos[1];

				bPressed= e.button === button && enabled;

			};

			function m_ptrStartDrag(e){

				if(!bPressed) return;

				pos[0] = e.clientX;

				pos[1] = e.clientY;

				switch (axis) {

					case 0:

					if(!e.altKey)Geom.SetX(target,pos[0]-old[0]);

					break;

					case 1:

					if(!e.ctrlKey)Geom.SetY(target,pos[1]-old[1]);

					break;

					default:

				//    Geom.SetPos(target,[pos[0]-old[0],pos[1]-old[1]]);

					if(!e.altKey)Geom.SetX(target,pos[0]-old[0]);

					if(!e.ctrlKey)Geom.SetY(target,pos[1]-old[1]);

				}

			}

			function m_ptrEndDrag(e){

				if(!bPressed) return;

				bPressed = false;

				pos[0] = e.clientX;

				pos[1] = e.clientY;

			}

		};

		this.StartDrag = function(){

		};

		this.StopDrag = function(){

		};

		this.Uid = function(){ return m_ptr.uid;};

		this.IsPluggedTo = function(eid){

			for(var i=0;i < m_ptr.eventList.length;i  ){

				var p = m_ptr.eventList[i];

				if( p.uid === eid){

					return true;

				}

			}

			return false;

		};

		this.PlugTo = function( event ){

			if(this.IsPluggedTo(event)) return false;

			m_ptr.eventList.push({event:event,type:event.Type(),eid:event.EID()});

		};

		this.UnplugFrom = function(eid){

			for(var i=0;i < m_ptr.eventList.length;i  ){

				var p = m_ptr.eventList[i];

				if( p.EID() === eid ){

					//p.target.DC().addEventListener(m_ptr.type,m_ptr.Exec );

					return m_ptr.eventList.splice(i,1);

				}

			}

			return null;

		};

		this.UnplugFromAll = function(typeFilter="*"){

			for(var i=0;i < m_ptr.eventList.length;i  ){

				var p = m_ptr.eventList[i];

				if( typeFilter.indexOf(p.Type()) >= 0 || typeFilter.indexOf('*') >= 0  ){

					//p.target.DC().addEventListener(m_ptr.type,m_ptr.Exec );

					return m_ptr.eventList.splice(i,1);

				}

			}

			return null;

		};

		this.Size   = function(){ this.InitSize(); return m_ptr.size; };

		qDef(this,'SetSize','CSize',function(size){

			m_ptr.size.Set(size);

			this.SizeChanged.Emit([size,this.Size()]);

			m_ptr.css.Set('width' ,m_ptr.size.Width()+m_ptr.size.Unit());

			m_ptr.css.Set('height',m_ptr.size.Height()+m_ptr.size.Unit());

		});

		qOverload(this,'SetSize','Array',function(size){

			m_ptr.size.Set(CSize.Cast(size));

			this.SizeChanged.Emit([m_ptr.size,this.Size()]);

			m_ptr.css.Set('width' ,m_ptr.size.Width()+m_ptr.size.Unit());

			m_ptr.css.Set('height',m_ptr.size.Height()+m_ptr.size.Unit());

		});

		qOverload(this,'SetSize','Number,Number',function(w,h){

			m_ptr.size.Reset(w,h);

			this.SizeChanged.Emit([m_ptr.size,this.Size()]);

			m_ptr.css.Set('width' ,m_ptr.size.Width()+m_ptr.size.Unit());

			m_ptr.css.Set('height',m_ptr.size.Height()+m_ptr.size.Unit());

		});

		this.Width = function(){ return this.Size().Width();};

		this.Height = function(){ return this.Size().Height();};

		this.X 		= function(){ return Geom.GetX(m_ptr.this);};

		this.Y 		= function(){ return Geom.GetY(m_ptr.this);};

		this.Pos 	= function(){ return Geom.GetPos(m_ptr.this);};

		this.HasChild = function(widget){

			qAssert(!qInstanceOf(widget,'CWidget'),"CWidget::HasChild(child) Failed -> child must be of type CWidget! You provided a "+qTypeOf(widget));

			return m_ptr.uidList.indexOf( widget.Uid() ) >= 0;

		};

		this.AddChild = function(widget){

			qAssert(!qInstanceOf(widget,'CWidget'),"CWidget::AddChild(widget) Failed -> widget must be of type CWidget! You provided a "+qTypeOf(widget));

			qAssert(this.HasChild(widget,'CWidget'),"CWidget::AddChild(widget) Failed ->  child already exist."+widget.Uid());

			DC().appendChild(widget.DC());

			m_ptr.uidList.push( widget.Uid() );

			m_ptr.children.push( widget );

		};

		this.AddWidget = function(widget){

			qAssert(!qInstanceOf(widget,'CWidget'),"CWidget::AddWidget(widget) Failed -> widget must be of type CWidget! You provided a "+qTypeOf(widget));

			qAssert(this.HasChild(widget,'CWidget'),"CWidget::AddWidget(widget) Failed ->  child already exist.");

			DC().appendChild(widget.DC());

			m_ptr.uidList.push( widget.Uid() );

			m_ptr.children.push( widget );

			this.ChildAdded.Emit([widget]);

		};

		this.RemoveChild =

		this.RemoveWidget = function(widget){

			if( !this.HasChild(widget) ) return null;

			var index = m_ptr.uidList.indexOf(widget.Uid() );

			m_ptr.children.unshift(index,1);

			m_ptr.uidList.unshift(index,1);

			DC().removeChild(widget.DC());

			this.ChildRemoved.Emit([widget]);

		};

		this.IsMouseEnabled = function(){ return DC().mouseEnabled === true; };

		this.SetMouseEnabled = function(b){

			DC().mouseEnabled = b;

		};

		this.Destroy = function(){

			//var e=new CustomEvent('destroyWidget',{'kill':true});

			var

			e = new CustomEvent("destroyWidget",{detail:{'widget':this,target:DC(), timeStamp:Date.now()},cancelable:true,bubbles:true});

			DC().dispatchEvent(e);

		};

		this.m_ptrCWidget = function(){

			this.Destroy();

		};

		this.IsVisible  = function(){  return m_ptr.visible; };

		this.SetVisible = function(v){

			m_ptr.visible = v;

			if( m_ptr.visible  ){ CCSS.Remove(DC(),"hidden"); this.ShowEvent(m_ptr.visible );}

			else{ CCSS.Add(DC(),"hidden");  this.HideEvent(m_ptr.visible );}

			this.VisibilityChanged.Emit([m_ptr.visible]);

		};

		this.Show 		= function(){  this.SetVisible(true);	};

		this.Hide 		= function(){  this.SetVisible(false);	};

		this.GrabKeyboard = function( e ){
			//console.log("widget grabbed keyboard!");
			SetKeyboardTarget(this);
		};
		this.ReleaseKeyboard = function( ){		
			SetKeyboardTarget(null);
		};

		this.GrabMouse = function( e ){
			//console.log("widget grabbed keyboard!");
			SetMouseTarget(this);
		};
		this.ReleaseMouse = function( ){		
			SetMouseTarget(null);
			//console.warn("widget released keyboard!");
		};
		

		// this.SetDragMoveMode( NoMove | HorizontalMove | VerticalMove | FreeMove | SnapMove )

	};

	CWidget.prototype.HideEvent = function (e){ };

	CWidget.prototype.PaintEvent = function (e){ };

	CWidget.prototype.RenderEvent= function (e){ };
	CWidget.prototype.DropEvent= function (e){ };
	CWidget.prototype.DragEnterEvent= function (e){ };
	CWidget.prototype.DragLeaveEvent= function (e){ };
	function GrabKeyboard(){
		
		document.addEventListener("keydown",HandleKeyPress );
		document.addEventListener("keyup",  HandleKeyRelease );

	}
	function ReleaseKeyboard(){
		document.removeEventListener("keydown", HandleKeyPress );
		document.removeEventListener("keyup", HandleKeyRelease );	
	}

	function GrabMouse(){
		
		document.addEventListener("wheel", HandleWheel);
		document.addEventListener("mousemove",  HandleMouse );
	}
	function ReleaseMouse(){
		document.removeEventListener("wheel", HandleWheel);
		document.removeEventListener("mousemove",  HandleMouse );
	}


	function SetMouseTarget( target ){
		
		if( CWidget.MouseTarget !== null ){
			ReleaseMouse();
		}
		CWidget.MouseTarget = target;

		GrabMouse();
		
	}
	function SetKeyboardTarget( target ){
		
		if( CWidget.KeyboardTarget !== null ){
			ReleaseKeyboard();
		}
		CWidget.KeyboardTarget = target;

		GrabKeyboard();
	}

	function HandleMouse( e ){
		if( CWidget.MouseTarget !== null ){
			CWidget.MouseTarget.MousePressEvent(e);
		}
	}
	function HandleWheel( e ){
		if( CWidget.MouseTarget !== null ){
			CWidget.MouseTarget.WheelEvent(e);
		}
	}
	function HandleKeyPress( e ){
		if( CWidget.KeyboardTarget !== null ){
			CWidget.KeyboardTarget.KeyPressEvent(e);
		}
	}
	function HandleKeyRelease( e ){
		if( CWidget.KeyboardTarget !== null ){
			CWidget.KeyboardTarget.KeyReleaseEvent(e);
		}
	}
	CWidget.prototype.KeyPressEvent= function (e){ 
		//console.log("widget pressed",e.keyCode);
	};
	CWidget.prototype.KeyReleaseEvent= function (e){ 
		//console.log("widget released",e.keyCode);
	};
	CWidget.prototype.MousePressEvent= function (e){ 
		//console.log("widget pressed",e.keyCode);
	};
	CWidget.prototype.MouseReleaseEvent= function (e){ 
		//console.log("widget released",e.keyCode);
	};
	CWidget.prototype.MouseMoveEvent= function (e){ 
		//console.log("widget released",e.keyCode);
	};
	CWidget.prototype.ClickEvent= function (e){ 
		//console.log("widget released",e.keyCode);
	};
	CWidget.prototype.DoubleClickEvent= function (e){ 
		//console.log("widget released",e.keyCode);
	};
	CWidget.prototype.WheelEvent= function (e){ 
		//console.log("widget released",e.keyCode);
	};
	CWidget.prototype.CopyEvent = function ( parent = null ){ 
		console.error("widget::CopyEvent not implemented!");
	};
	CWidget.prototype.Copy = function ( parent = null ){ 
		console.error("widget::Copy not implemented!");
	};
	CWidget.prototype.Instance = function ( parent = null ){ // Ref | Shallow | Deep 
		console.error("widget::Instance not implemented!");
	};
	// deepCopyCallback | shallowCopyCallback
	// widget.DuplcateEvent( {parent:container,type})

	CWidget.MouseTarget = null;
	CWidget.KeyboardTarget = null;

	CWidget.New = function(tag="div",cls='',name="ui",type ="UIObject"){

			return new CWidget(tag,cls,name,type);
	};

	return CWidget;   


});