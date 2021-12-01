qPack("CSplitter", function( Cloud ){

	const CWidget 		= qRequire("CWidget");

	const CBoxLayout 	= qRequire("CBoxLayout");

	const CMath  		= qRequire("CMath");

	const CSignal  		= qRequire("CSignal");
	
	const Geom  		= qRequire("Geom");
	
	const CSplitHandle	= qRequire("CSplitHandle");



	const EOrientation = qRequire("ETypes").Orientation;
	
	CMath.ExportTo(this);

	function CSplitter(orientation=EOrientation.Horizontal){
		
		const _widgets =[];
		
		const _handles =[];
		
		const _sizes =[];
		
		const _collapsibles =[];
		
		const _layout = CBoxLayout.New(orientation);
		
		
		const _handleMoved = new CSignal(this,"HandleMoved",{
			"index":"Number",
			"pos":"Number"
		});

		var m_field = {
			handleSize:"Number",
			orientation:"Number"
		};

		qExtend( this, CWidget,'div','CSplitter');

		qProperties(this,m_field);

		Object.defineProperty(this,"HandleMoved",{
			get:()=>{
				return _handleMoved;
			}
		});

		Object.defineProperty(this,"Widgets",{
			get:()=>{
				return _widgets;
			}
		});

		Object.defineProperty(this,"Handles",{
			get:()=>{
				return _handles;
			}
		});

		Object.defineProperty(this,"Collapsibles",{
			get:()=>{
				return _collapsibles;
			}
		});

		
		function SplitAt( view, x,y ){

		}

		
		function Refresh(){
			
		}
		
		
		this.GetSizes = function(){
			
			return _sizes;
			
		}
		
		
		
	}


	CSplitter.prototype.IndexOf =function(widget){

		return this.Widgets().indexOf(widget);

	};


	CSplitter.prototype.CreateHandle =function(){

		var handle = new CSplitHandle(this.Orientation(),self, this.HandleSize());

		this.Handles.push(handle);

		_layout.AddWidget(handle);

		return handle;

	}

	CSplitter.prototype.Count =function(){

		return this.Widgets.length;

	}

	CSplitter.prototype.AddWidget =function(widget){

		this.CreateHandle();

		_layout.AddtWidget(widget);

		_collapsibles.push(_childrenCollapse);

		return self;

	}

	CSplitter.prototype.InsertWidget =function(index,widget){

		if( this.Count() >= index || index < 0 ){

			return false;

		}

		var res = _widgets.splice(index,1,widget);

		_layout.InsertWidget(index,widget);

		return res;

	};

	CSplitter.prototype.IsCollapsible =function(index){

		return  this.Collapsibles[index];

	};

	CSplitter.prototype.SetCollapsiable =function(index,collapse){
		
		qAssert(qTypeOf(collapse,"Boolean"));
		
		this.Collapsibles[index] = collapse;

	};

	CSplitter.prototype.MoveHandle =function( index, pos ){

		if(index>=this.Count()) return;
		
	};
	
	CSplitter.prototype.SetSizes = function(sizes){

		if( sizes.length !== this.Count()){
			throw new Error("CSplitter::SetSizes Error - The number of sizes must match the number of widgets in the splitter.");
		}

		for( i=0; i < sizes.length;i++ ){

			var n = sizes[i];

			if(!qTypeOf(n,"Number")) continue;

			if( this.Orientation() ===  EOrientation.Horizontal) Geom.SetWidth(_widgets[i],n);

			else if( this.Orientation() ===  EOrientation.Vertical) Geom.SetHeight(_widgets[i],n);

		}
		// sp.SetRanges([10,10,30])

	};

	
	CSplitter.prototype.MousePressEvent = function(e){

	};

	CSplitter.prototype.MouseReleaseEvent = function(e){

	};

	CSplitter.prototype.MouseMoveEvent = function(e){

	};

	CSplitter.prototype.ResizeEvent = function(e){

	};

	CSplitter.prototype.Init = function(){

		Connect(this,'onmouseup',this.MouseReleaseEvent,null,0);

		Connect(this,'onmousemove',this.MouseMoveEvent,null,0);

	}
	///////////////////////////////////////////////////////////////////////////////////

	CSplitter.New             = function(orientation=EOrientation.Horizontal){

		return new CSplitter(orientation);

	};

	CSplitter.VSplitter  = function(){

		return new CSplitter(EOrientation.Horizontal );

	};

	CSplitter.HSplitter     = function(){

		return new CSplitter(EOrientation.Vertical );

	};

	return CSplitter;

});