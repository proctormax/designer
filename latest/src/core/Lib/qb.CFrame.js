qPack("UI/CFrame",function(){
     //-------------------------------- INCLUDES(0) ----

     
/***
 * CFrame
 * The base class of widgets that can have a frame
 **/

	
	const Geom    = qRequire("Geom");
	
	const CRect   = qRequire("CRect");
	
	const CSignal = qRequire("CSignal");
	
	const CWidget = qRequire("CWidget");

	function CFrame( rect, flags='', dc='div', ){

		qExtend(this, CWidget, dc||'div', "ui-frame "+flags, "frame", "CFrame" );
		
		var _field = {
			rect: 'CRect'
		};
		
		const _this = this;

		INIT_PROPERTIES(this,_field);

		this.Clone = function(){
			var res = CFrame.New(_field.rect,flags,dc);
			return res;
		};
		/* 
		this.SetRect = function(r){
			this.RectChanged.Emit([r,_field.rect]);
			_field.rect = r;
		};*/
		qOverload(this,'SetRect','Number,Number,Number,Number',(x,y,w,h)=>{
			_field.rect.Reset(x,y,w,h);
			this.SetRect(_field.rect);
		}); 
		this.Update = function( r ){			
			if(Geom)Geom.SetRect(_this,r.M());
		};
		this.Init = function( ){
			
			if( rect ){
				_field.rect = rect;
				//this.SetRect(rect);
			}
			this.RectChanged.Add(this.Update);
		}
		this.Init();
	};

	CFrame.New = function(){
		return new CFrame(CRect.New());
	};
	qConstruct(CRect,'Number,Number,Number,Number',(x,y,w,h)=>{		
		return new CFrame(CRect.New(x,y,w,h) );
	});
	qConstruct(CFrame,'Array',function( r ){
		return new CFrame(CRect.Cast(r));
	});
	qConstruct(CFrame,'CRect',function( r ){
		return new CFrame(r.X(),r.Y(),r.Width(),r.Height());
	});
	qConstruct(CFrame,'Number,Number',function(w,h){ 				 
		return new CFrame(CRect.New(0,0,w,h));
	});
	qCast(CFrame,'CFloat4',function( f ){
		return new CFrame(CRect.New(f.X(),f.Y(),f.Z(),f.W()));
	});

	return CFrame;



});