qPack("CSize", function( exports = {} ){

	function CSize( width=0, height=0, unit='px' ){

		var _w          = 0;

		var _h          = 1;

		var _unit       = unit;

		this.m          = [width,height];

		this.Unit       = function(){

			return _unit;

		};

		this.SetUnit    = function(unit){

			this.m[_w]  = CSize.Convert(this.m[_w], _unit, unit);

			this.m[_h]  = CSize.Convert(this.m[_h], _unit, unit);

			_unit       = unit;

		};

		this.Width      = function(){

			return this.m[_w];

		};

		this.SetWidth   = function(w){

			this.m[_w] = w;

		};

		this.Height     = function(){

			return this.m[_h];

		};

		this.SetHeight  = function(h){

			this.m[_h] = h;

		};

		qDef(this,"Reset","Number,Number",function(w,h){

			_m[_w]      = w;

			_m[_h]      = h;

			return this;

		});

		/* ----------- UNARY ARITHMETICS */

		qDef(this,"IncWidth","Number",function(w){

			this.m[_w] += w; return this

		});

		qDef(this,"IncWidth","CSize" ,function(s){

			this.m[_w] += s.Width(); return this

		});

		this.ScaleWidth = function(w){

			overload.ScaleWidth.Exec(w);

		};

		this.IncHeight  = function(w){

			this.m[_h] += w;

		};

		this.ScaleHeight= function(w){

			this.m[_h] *= w;

		};

		/* ----------- BINARY ARITHMETICS */

		this.Set        = function( other ){

			this.m[_w]  = other.Width();

			this.m[_h]  = other.Height();

		};

		this.Sub        = function( other ){

			this.m[_w]  -= other.Width();

			this.m[_h]  -= other.Height();

		};

		this.Mul        = function( other ){

			this.m[_w]  *= other.Width();

			this.m[_h]  *= other.Height();

		};

		this.Div        = function( other ){

			this.m[_w]  /= other.Width();

			this.m[_h]  /= other.Height();

		};

		this.Add        = function( other ){

			this.m[_w]  += other.Width();

			this.m[_h]  += other.Height();

		};

		this.Reset      = function( w,h, unit=_unit ){

			this.m[_w]  = w;

			this.m[_h]  = h;

			_unit       = unit;

		};

		this.ToArray    = function(){

			return [this.m[_w],this.m[_h],_unit];

		};

	};

	/// -------- CONSTRUCTORS ---------------

	CSize.New = function(){

		return new CSize(0,0);

	};
	qConstruct(CSize,'Number,Number,String',function(h,w,u){

		return new CSize(w,h,u);

	});

	qConstruct(CSize,'Number,Number',function(w,h){

		return new CSize(w,h);

	});

	qConstruct(CSize,'CSize',function(s){

		return new CSize(s.Width(),s.Height());

	});


	/// -------- TYPE CASTING ---------------

	qCast(CSize,"Array",function(size){

		return new CSize(size[0],size[1]);

	});

	qCast(CSize,'CPoint2',function(s){

		return new CSize(s.X(),s.Y());

	});

	/// -------- STATIC FUNCTIONS -----------

	CSize.Equals  =  function(s1,s2){

		return s1.Width()=== s2.width() && s1.Height()===s2.Height() && s1.Unit()===s2.Unit();

	};

	CSize.Convert = function( value, from, to ){

		return value;

    };

    exports.CSize = CSize;

    return CSize;

});