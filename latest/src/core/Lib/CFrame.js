import { qSuper } from "./QB";


qPack("UI/CFrame.js", function( Cloud ){

	const CWidget 	= qRequire("CWidget");
	const Geom  	= qRequire("Geom");
	const CCSS  	= qRequire("CCSS");
	const CRect 	= qRequire("CRect");
	const CSignal   = qRequire("CSignal");
	const CColor    = qRequire("CColor");

	CCSS.New("CFrame")
	.Add(".CFrame",{
		"position":"absolute"
	});
	const EFrameShape = {
		BOX:3,
		HLINE:1,
		VLINE:20		
	};

	let EBorderStyles = ["solid","dashed","dotted","inherit","hidden"];

	function CFrame(rect,fill="red",stroke="black", parent=null,tag=""){

		qExtend(this,CWidget,"div","CFrame");

		qExtend(this,CRect,rect.X(),rect.Y(), rect.Width(), rect.Height());

		var

		_rect 	= this.Bounds( ),

		_fill 	= new CColor(fill),

		_shape  	= EFrameShape.BOX,

		_style  	= [0,0,0,0],

		_lineW  	= 1,

		_lineId  	= 0,

		_radius  	= [],

		_stroke 	= "red",

		_color 	= new CColor(stroke);

		// ADDITIONAL SIGNALS

		this.Changed 	= new CSignal(this,"onchange");

		this.Resized 	= new CSignal(this,"resized");

		//this.InitSignals(this);


		// PROPERTIES

		this.IsBox	= function( ){

			return _shape == EFrameShape.BOX;

		};

		this.IsHLine	= function( ){

			return _shape == EFrameShape.HLINE;

		};

		this.IsVLine	= function( ){

			return _shape == EFrameShape.VLINE;

		};

		this.Fill 	= function( ){

			return _fill;

		};

		this.Stroke	= function( ){

			return _stroke;

		};

		this.Shape 	= function( ){

			return _shape;

		};

		this.Style 	= function( ){

			return _style;

		};

		this.Rect 	= function( ){

			return _rect;

		};

		this.StrokeWidth= function( ){

			return _lineW;

		};

		this.Update	= function( ){

			this.css	= {

			}

			this.SetX( _rect.Left( ) );

			this.SetY( _rect.Top( ) );

			switch( _shape ){

				case EFrameShape.BOX:

				this.SetWidth( _rect.Width( ) );

				this.SetHeight( _rect.Height( ) );

				this.css.backgroundColor = _fill.Info();

				this.css.borderColor	= _stroke.Info( );

				if( _radius.length )

				this.css.borderRadius = (_radius).join("px ")+"px";

				this.css.borderWidth	= Geom.Pix(_lineW);

				break;

				case EFrameShape.HLINE:

				this.SetWidth( _rect.Width( ) );

				this.css.borderTopWidth = Geom.Pix(_lineW );

				this.css.borderColor	= _stroke.Info( );

				break;

				case EFrameShape.VLINE:

				this.SetWidth( _rect.Width( ) );

				this.css.borderLeftWidth= Geom.Pix(_lineW );

				this.css.borderColor	= _stroke.Info( );

				break;

			}

			if( _style && _shape ){

				this.css.borderStyle 	= EBorderStyles[_style[0]]+" "+EBorderStyles[_style[1]]+" "+EBorderStyles[_style[2]]+" "+EBorderStyles[_style[3]];

			}

			this.Render( );

			this.Changed.Emit([this.css,_rect]);

			return this;

		};

		// METHODS

		this.SetSize	= function(w,h){

			_rect.Resize(w,h);

			return this.Update();

		};

		this.SetRect 	= function(r){

			_rect.Cast(r);

			return this.Update( );

		};

		this.SetFill 	= function(c,d){

			_fill.Cast(c);

			this.css.backgroundColor = _fill.Info();

			return this.Update( );

		};

		// setStroke(red,"solid")

		/*

		QB.UIFrame.Border ={

			Style:0,

		}

		frame.SetStroke("L1B3T4")

		*/

		var borders = ["","borderLeft","borderTop","borderRight","borderBottom"];

		this.SetStroke 	= function(c,id,style){

			if(c!=null){

				_stroke.Cast(c);

				this.css[borders[id]] = EBorderStyles[ Math.min(style,11)]+" "+Geom.Pix(_lineW);

				this.css.borderColor  = _stroke;

				this.Update( );

			}

			this.DC().style.border = stroke;

			return this;

		};


		this.SetRadius	= function(t=0,r=0,b=0,l=0){

			_radius  = [t,r,b,l];

			return this.Update( );

		};

		this.SetShape 	= function(s){

			_shape 	= s;

			return this.Update( );

		};

		this.SetStyle	= function(t,r,b,l){

			_style	= [Int(t),Int(r),Int(b),Int(l)];

			return this.Update( );

		};

		this.SetStrokeWidth= function(n){

			_lineW 	= n;

			return this.Update( );

		};

		// INITIALIZATION

		this.SetFill(fill);

		this.SetStroke(stroke);

		this.Reset(rect);

	}

	CFrame.prototype.Reset = function( rect ){
		qSuper(this,"Reset",rect);
		this.Update();
	};

	CFrame.New = function( rect = CRect.New() ){
		return new CFrame( rect );
	};
	
	return CFrame; 
});