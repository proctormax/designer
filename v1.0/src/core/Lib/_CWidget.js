qPack("UI/qb.CWidget.js", function( exports ={} ){

	const	CSize = qRequire("Math/qb.CSize.js");

	const	CRect = qRequire("Math/qb.CRect.js");

	const	CSignal = qRequire("Util/qb.CSignal.js");

	const	CStyle = qRequire("UI/Appearance/qb.CStyle.js");

	const Geom  = qRequire("Util/Geom.js");

	QB.CMath.ExportTo(this);

	console.error("@Widget:--------------- Geom:",Object.keys(Geom));
	console.error("@Widget:--------------- This:",Object.keys(this));

	function  CWidget(hdc="div",cls='',objectName="ui",type ="CWidget"){

		qAssert(hdc === null,'CWidgetError => Failed to create a null widget.');

		//qExtend(this,QB.CObject,objectName,type);


		var _ =

		{

			dc: qDOM(hdc,cls),

			eventList:[],

			uidList: [],

			stage: null,

			this:  this,

			parent:null,

			bDrag: true,

			layout: null,

			size: new QB.CSize(),

			display: "block",

			visible:true,

			uid: "wid"+Date.now().toString(15)+qRound(qRand(0,0xFFFFFF),1).toString(),

			children: [] // new QB.CList( CWidget )

		};

		this.Uid 	= function(){

			return _.uid;

		};

		this.Bounds = function(){
			var rect =  Geom.GetRect(this);
			
			rect =new CRect(rect[0], rect[1], rect[2], rect[3]);

			return rect;
		}

		this.VisibilityChanged 	= new QB.CSignal(this,"visibilityChanged",{

			visible:"bool"

		});

		this.SizeChanged 	= new QB.CSignal(this,"sizeChanged",{

			toSize:"CSize",fromSize:"CSize"

		});

		this.ChildAdded 	= new QB.CSignal(this,"childAdded",{

			child:"CWidget"

		});

		this.ChildRemoved 	= new QB.CSignal(this,"childRemoved",{

			child:"CWidget"

		});

		this.Wheeled 	= new QB.CSignal(this,"wheeled",{

			delta:"integer"

		});

		function DC(){

			return _.dc;

		};

		this.DC = DC;

		this.UI = DC;

		_.css 	= new QB.CStyle(this);//

		this.InitSize = function(){

			_.size.Reset(Geom.GetWidth(_.this),Geom.GetHeight(_.this));

		};

		this.DC 	= DC; // match

		this.UI 	= DC;

		this.css	= _.css;

		this.CSS 	= function(){

			return _.css;

		};

		///Object.create(this,{'css':_.css,get:function(){ return _.css}})

		this.ShowEvent 	= function (e){

		};

		this.HideEvent 	= function (e){

		};

		this.WheelEvent = function (e){

			_.this.Wheeled.Emit([e]);

		};

		this.PaintEvent = function (e){

		};

		this.RenderEvent= function (e){

		};

		this.KeyEvent= function (e){

		};

		this.Parent = function(){

			return _.parent;

		};

		this.SetParent = function( parent ){

			_.parent = parent;

		};

		this.Layout = function(){

			return _.layout;

		};

		this.SetLayout = function( layout ){

			if(_.layout && _.layout.DC() ) DC().removeChild(_.layout.DC());

			_.layout = layout;

			if(_.layout) DC().appendChild(_.layout.DC());

		};

		this.InitEvents =  function(){

			this.DC().onmouseup    = this.MouseReleaseEvent;

			this.DC().onmousemove  = this.MouseMoveEvent;

			this.DC().onmousedown  = this.MousePressEvent;

			this.DC().onwheel      = this.WheelEvent;

			this.DC().onkeydown    = this.KeyEvent;

			this.DC().onkeyup      = this.KeyEvent;

		};

		this.SetDragRect = function(rect){

		};

		this.IsDraggable =function(){

			return _.bDrag;

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

		this.SetDraggable = function(axis,target,handle=null,parent=document,button=0,region=null){

			var old=[0,0],pos=[0,0],tPos=[0,0],bPressed=false,enabled = axis >= 0;

			if(handle === null) handle = target;

			if( axis>=0 ){

				CCSS.$(handle).addEventListener("mousedown",_InitDrag,true);

				CCSS.$(parent).addEventListener("mousemove",_StartDrag,true);

				CCSS.$(parent).addEventListener("mouseup",_EndDrag,true);

			}

			else{

				CCSS.$(handle).removeEventListener("mousedown",_InitDrag);

				CCSS.$(parent).removeEventListener("mousemove",_StartDrag);

				CCSS.$(parent).removeEventListener("mouseup",_EndDrag);

			}

			function _InitDrag(e){

				e.preventDefault();

				tPos = Geom.GetPos(target);

				old[0] = e.clientX - tPos[0];

				old[1] = e.clientY - tPos[1];

				bPressed= e.button === button && enabled;

			};

			function _StartDrag(e){

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

			function _EndDrag(e){

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

		this.Uid = function(){

			return _.uid;

		};

		this.IsPluggedTo = function(eid){

			for(var i=0;i < _.eventList.length;i  ){

				var p = _.eventList[i];

				if( p.uid === eid){

					return true;

				}

			}

			return false;

		};

		this.PlugTo = function( event ){

			if(this.IsPluggedTo(event)) return false;

			_.eventList.push({

				event:event,type:event.Type(),eid:event.EID()

			});

		};

		this.UnplugFrom = function(eid){

			for(var i=0;i < _.eventList.length;i  ){

				var p = _.eventList[i];

				if( p.EID() === eid ){

					//p.target.DC().addEventListener(_.type,_.Exec );

					return _.eventList.splice(i,1);

				}

			}

			return null;

		};

		this.UnplugFromAll = function(typeFilter="*"){

			for(var i=0;i < _.eventList.length;i  ){

				var p = _.eventList[i];

				if( typeFilter.indexOf(p.Type()) >= 0 || typeFilter.indexOf('*') >= 0  ){

					//p.target.DC().addEventListener(_.type,_.Exec );

					return _.eventList.splice(i,1);

				}

			}

			return null;

		};

		this.Size   = function(){

			this.InitSize(); return _.size;

		};

		qDef(this,'SetSize','CSize',function(size){

			_.size.Set(size);

			this.SizeChanged.Emit([size,this.Size()]);

			_.css.Set('width' ,_.size.Width()+_.size.Unit());

			_.css.Set('height',_.size.Height()+_.size.Unit());

		});

		qOverload(this,'SetSize','Array',function(size){

			_.size.Set(CSize.Cast(size));

			this.SizeChanged.Emit([_.size,this.Size()]);

			_.css.Set('width' ,_.size.Width()+_.size.Unit());

			_.css.Set('height',_.size.Height()+_.size.Unit());

		});

		qOverload(this,'SetSize','Number,Number',function(w,h){

			_.size.Reset(w,h);

			this.SizeChanged.Emit([_.size,this.Size()]);

			_.css.Set('width' ,_.size.Width()+_.size.Unit());

			_.css.Set('height',_.size.Height()+_.size.Unit());

		});

		this.Width = function(){

			return this.Size().Width();

		};

		this.Height = function(){

			return this.Size().Height();

		};

		this.X 	= function(){

			return Geom.GetX(_.this);

		};

		this.Y 	= function(){

			return Geom.GetY(_.this);

		};

		this.Pos 	= function(){

			return Geom.GetPos(_.this);

		};

		this.HasChild = function(widget){

			qAssert(!qInstanceOf(widget,'CWidget'),"CWidget::HasChild(child) Failed -> child must be of type CWidget! You provided a "+TypeOf(widget));

			return _.uidList.indexOf( widget.Uid() ) >= 0;

		};

		this.AddChild = function(widget){

			qAssert(!qInstanceOf(widget,'CWidget'),"CWidget::AddChild(widget) Failed -> widget must be of type CWidget! You provided a "+TypeOf(widget));

			qAssert(this.HasChild(widget,'CWidget'),"CWidget::AddChild(widget) Failed ->  child already exist."+widget.Uid());

			DC().appendChild(widget.DC());

			_.uidList.push( widget.Uid() );

			_.children.push( widget );

		};

		this.AddWidget = function(widget){

			qAssert(!qInstanceOf(widget,'CWidget'),"CWidget::AddWidget(widget) Failed -> widget must be of type CWidget! You provided a "+TypeOf(widget));

			qAssert(this.HasChild(widget,'CWidget'),"CWidget::AddWidget(widget) Failed ->  child already exist.");

			DC().appendChild(widget.DC());

			_.uidList.push( widget.Uid() );

			_.children.push( widget );

			this.ChildAdded.Emit([widget]);

		};

		this.RemoveWidget = function(widget){

			if( !this.HasChild(widget) ) return null;

			var index = _.uidList.indexOf(widget.Uid() );

			_.children.unshift(index,1);

			_.uidList.unshift(index,1);

			DC().removeChild(widget.DC());

			this.ChildRemoved.Emit([widget]);

		};

		this.IsMouseEnabled = function(){

			return DC().mouseEnabled === true;

		};

		this.SetMouseEnabled = function(b){

			DC().mouseEnabled = b;

		};

		this.Destroy = function(){

			//var e=new QB.CustomEvent('destroyWidget',{'kill':true});

			var

			e = new CustomEvent("destroyWidget",{

				detail:{

					'widget':this,target:DC(), timeStamp:Date.now()

				},cancelable:true,bubbles:true

			});

			DC().dispatchEvent(e);

		};

		this._CWidget = function(){

			this.Destroy();

		};

		this.IsVisible  = function(){

			return _.visible;

		};

		this.SetVisible = function(v){

			_.visible = v;

			if( _.visible  ){

				CCSS.Remove(DC(),"hidden"); this.ShowEvent(_.visible );

			}

			else{

				CCSS.Add(DC(),"hidden");  this.HideEvent(_.visible );

			}

			this.VisibilityChanged.Emit([_.visible]);

		};

		this.Show 	= function(){

			this.SetVisible(true);

		};

		this.Hide 	= function(){

			this.SetVisible(false);

		};

	};

	CWidget.New = function(tag="div",cls='',name="ui",type ="UIObject"){

		return new CWidget(tag,cls,name,type);

	};

	exports.CWidget = CWidget;
	return CWidget;

});