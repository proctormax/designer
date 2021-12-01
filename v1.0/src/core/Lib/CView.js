qPack("UI.View.CView", function(  ){

	const	CSignal = qRequire("Util/qb.CSignal.js");

	const 	CRect = qRequire("CRect");

	const 	CWidget = qRequire("CWidget");

	const 	CCSS = qRequire("CCSS");

	const 	Geom = qRequire("Geom");

	CCSS.New("CView")
	.Add(".CView",{
		"position":"relative",
		"border":"solid 1px #459",
		"box-sizing":"border-box !important",
		//"min-width":"200px !important",
		//"min-height":"100vh !important"
	});
	
	function CView( rect, attrib='' ){

		qExtend(this,CWidget,'div',"CView "+attrib);

		var _this = this;

		var _field = {

			content:"CWidget",

			rect:"CRect",

			leftRect:"CRect",

			topRect:"CRect",

			rightRect:"CRect",

			bottomRect:"CRect"

		};

		INIT_PROPERTIES(this, _field );

		this.ContentRelased = new CSignal(this,'contentReleased',{

			content:"CWidget"

		});

		qOverload(this,'SetRect','Number,Number,Number,Number',(x,y,w,h)=>{

			_field.rect.Reset(x,y,w,h);

			this.SetRect(_field.rect);

		});

		this.Update = function( r ){

			if(Geom)Geom.SetRect(_this,r.M());

		};

		this.Init = function(){

			this.ContentChanged.Add( (a,b)=>{

				_this.RemoveChild(b);

				_this.AddChild(a);

			});

			if( rect ){

				_field.rect = rect;

				_field.leftRect = CRect.New();

				_field.topRect = CRect.New();

				_field.rightRect = CRect.New();

				_field.bottomtRect = CRect.New();

				//this.SetRect(rect);

			}

			this.RectChanged.Add(this.Update);

		};

		this.Sides = function(){

			var res =  [

			this.TopRect(),

			this.RightRect(),

			this.BottomRect(),

			this.LeftRect()

			];

			return res;

		};

		qDef(this,"Join","Number" ,function( direction ){

			var r1 = this.Rect();

			var r2 = this.Sides()[direction];

			this.SetRect(r1.Combine(r2));

		});

		this.ReleaseContent = function(){

			if( this.Content() !== null ){

				this.RemoveChild(this.Content());

				this.ContentRelased.Emit([_field.content]);

				_field.content = null;

				return true;

			}

			return false;

		}

		this.Init();

	}

	

	CView.New = function(rect){

		var view = new CView(rect);

		return view;

	};
	qConstruct(CView,"CRect",function(rect){

		var view = new CView(rect);

		return view;

	});

	qConstruct(CRect,'Number,Number,Number,Number',(x,y,w,h)=>{

		return new CView(CRect.New(x,y,w,h) );

	});

	qConstruct(CView,'Array',function( r ){

		return new CView(CRect.Cast(r));

	});

	qConstruct(CView,'void',function(){

		return new CView(CRect.New());

	});

	qConstruct(CView,'CRect',function( r ){

		return new CView(r.X(),r.Y(),r.Width(),r.Height());

	});

	qConstruct(CView,'Number,Number',function(w,h){

		return new CView(CRect.New(0,0,w,h));

	});

	qCast(CView,'CFloat4',function( f ){

		return new CView(CRect.New(f.X(),f.Y(),f.Z(),f.W()));

	});

	return CView;

});