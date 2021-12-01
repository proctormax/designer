qPack("Math/qb.CPoint2.js", function( Cloud ){

	function CPoint2(x, y) {

		this.x = x;

		this.y = y;

		this.X = function(){

			return this.x;

		};

		this.Y = function(){

			return this.y;

		};

		this.SetX = function( x ){

			this.x = x;

		};

		this.SetY = function( y ){

			this.y = y;

		};

		this.Set = function(p){

			this.SetX(p.X());

			this.SetY(p.Y());

		};

		this.Reset = function(x=0,y=0){

			this.SetX(x);

			this.SetY(y);

		};

		this.Add 	= function(v){

			this.x+=v.x; this.y+=v.y; return this;

		};

		this.Sub 	= function(v){

			this.x-=v.x; this.y-=v.y; return this;

		};

		this.Mult 	= function(v){

			this.x-=v.x; this.y-=v.y; return this;

		};

		this.Scale 	= function(n){

			this.x*=n; this.y*=n; return this;

		};

		this.Translate = function(n){

			this.x+=n;this.y+=n; return this;

		};

		this.Mag 	= function( ){

			var u=this; return Math.sqrt(u.x*u.x+u.y*u.y);

		};

		this.Angle 	= function( ){

			return Math.atan2(this.y,this.x);

		};

		this.Limit	= function(n){

			this.x= Math.min(this.x,n);this.y= Math.min(this.y,n); return this;

		};

		this.Normalize= function( ){

			var m=this.Mag( ); if(m!=1){

				this.x/=m;this.y/=m;

			}; return this;

		};

		this.Normalized = function(){

			var res = new CPoint2(this.x,this.y); res.Normalize(); return res;

		};

		this.SetMag	= function(m){

			this.Normalize( );this.Mult(m);return this;

		};

		this.ReflectX = function(){

			this.x*=-1; return this;

		};

		this.ReflectY = function(){

			this.y*=-1; return this;

		};

		this.Reflect = function(){

			this.x*=-1;this.y*=-1; return this;

		};

		// BINARY

		this.Mid 	  = function(other){

			var res = new CPoint2();

			CPoint2.Mid(res,this,other);

			return res;

		};

		this.Plus 	= function(v){

			return new CPoint2(this.x+v.x,this.y+v.y);

		};

		this.Minus 	= function(v){

			return new CPoint2(this.x-v.x,this.y-v.y);

		};

		this.Times 	= function(v){

			return new CPoint2(this.x*v.x,this.y*v.y);

		};

		this.Scaled	= function(n){

			return new CPoint2(this.x*n,this.y*n);

		};

		this.Equals	= function(v){

			var u=this; return (u.x==v.x && u.y==v.y);

		};

		this.Copy = function(){

			return new CPoint2(this.x,this.y);

		};

	}

	/// -------- CONSTRUCTORS ---------------

	CPoint2.New = function(){

		return new CPoint2(0,0);

	};

	qConstruct(CPoint2,"Number,Number",function(x,y){

		return new CPoint2(x,y);

	});

	qConstruct(CPoint2,"Number",function(n){

		return new CPoint2(n,n);

	});

	/// -------- TYPE CASTING ---------------

	qCast(CPoint2,"Array",function(r){

		return new CPoint2(r[0],r[1]);

	});

	qCast(CPoint2,"Object",function(p){

		return new CPoint2(p.x,p.y);

	});

	qCast(CPoint2,"CPoint3",function(p){

		return new CPoint2(p.X(),p.Y());

	});

	qCast(CPoint2,"CSize",function(s){

		return new CPoint2(s.Width(),s.Height());

	});

	qCast(CPoint2,"CRect",function(r){

		return new CPoint2(r.Left(),r.Top());

	});

	/// -------- STATIC FUNCTIONS -----------

	qOverload(CPoint2,"Lerp",'CPoint2,CPoint2,Number', function( u,v,t ){

		return new CPoint2(qLerp(u.X(),v.X(),t),qLerp(u.Y(),v.Y(),t));

	});

	CPoint2.Distance = function(a, b) {

		var dx = (b.x - a.x);

		var dy = (b.y - a.y);

		return Math.sqrt(dx * dx+dy * dy);

	};

	CPoint2.Distance$ = function(out, a, b) {

		var dx = (b.x - a.x);

		var dy = (b.y - a.y);

		out.x = Math.sqrt(dx * dx);

		out.y = Math.sqrt(dy * dy);

		out.z = out.x + out.y;

	};

	CPoint2.Mag = function(v) {

		return 1 / (v.x + v.y);

	};

	CPoint2.Copy = function(v) {

		return new CPoint2(v.x, v.y);

	};

	CPoint2.Mid = function(res, a, b) {

		var dx = (b.x - a.x);

		var dy = (b.y - a.y);

		res.x = Math.abs(dx) / 2;

		res.y = Math.abs(dy) / 2;

	};

	CPoint2.Print = function(v) {

		return "<" + v.x + ', ' + v.y + '>';

	};

	return CPoint2;

});