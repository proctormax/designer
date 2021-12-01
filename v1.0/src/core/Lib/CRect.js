qPack("CRect", function( exports ={} ){

	//var  CSize = Lib.CSize;
	const CMath = qRequire("CMath");
	
	const CSize = qRequire("CSize");
	
	const CPoint2 = qRequire("CPoint2");
	
	const X = 0, Y =1, W = 2, H = 3, R = 4, B = 5;
	
	function CRect( x=0,y=0,w=0,h=0 ){

		var

		_m = [x,y,w,h,x+w,y+h],

		_tL, _tR, _bL, _bR, _size= new CSize(w,h);


		function _Init(x, y, w, h){

			_m[X] = x;

			_m[Y] = y;

			_m[R] = x + _m[W];

			_m[B] = y + _m[H];

			_tL = new CPoint2(x,y);

			_bL = new CPoint2(x,y+h);

			_tR = new CPoint2(x+w,y);

			_bR = new CPoint2(x+w,y+h);

		}

		_Init(x,y,w,h);

		this.M = function(e=-1){

			return e >-1 && e < 6? _m[e] : _m;

		};
		this.Info 	= function( ){

			return ("{L:"+this.Left()+",T:"+this.Top()+",W:"+this.Width( )+",H:"+this.Height( )+'}');

		};

		qDef(this,'Reset','Number,Number,Number,Number',function(x,y,h,w){

			_tL.Reset(x,    y);

			_tR.Reset(x+w,  y);

			_bL.Reset(x,    y+h);

			_bR.Reset(x+w,  y+h);

			_m[X] = x;

			_m[Y] = y;

			_m[W] = w;

			_m[H] = h;

			_m[R] = x + _m[W];

			_m[B] = y + _m[H];

			return this;

		});

		qDef(this,'Set','Number,Number',function(index,value){

			if(index>0 && index<=B)_m[index] = value;

			return this;

		});

		qDef(this,'Set','CRect',function(r){

			this.Reset(r.X(),r.Y(),r.Width(),r.Height());

			return this;

		});
		qOverload(this,'Reset','CRect',function(r){

			this.Reset(r.X(),r.Y(),r.Width(),r.Height());

			return this;

		});

		qDef(this,'Set','Array',function(r){

			return  this.Reset(r[X],r[Y],r[W],r[H]);

		});

		qDef(this,'Reset','CPoint2,CSize',function(p,size){

			_tL.Set(p);

			_bL.Reset(p.X(),p.Y()+size.Height());

			_tR.Reset(p.X()+size.Width(),p.Y());

			_bR.Reset(p.X()+size.Width(),p.Y()+size.Height());

		});

		qDef(this,'Reset','CPoint2,Number,Number',function(p,h,w){

			_tL.Set(p);

			_bL.Reset(p.X(),p.Y()+h);

			_tR.Reset(p.X()+w,p.Y());

			_bR.Reset(p.X()+w,p.Y()+h);

		});

		qDef(this,'MoveTo','CPoint2',function(p){

			_size.Reset(this.Width(), this.Height());

			_tL.Set(p);

			_bL.Reset(p.X(),p.Y()+_size.Height());

			_tR.Reset(p.X()+_size.Width(),p.Y());

			_bR.Reset(p.X()+_size.Width(),p.Y()+_size.Height());

		});

		qDef(this,'MoveTo','Number,Number',function(x,y){

			_m[X] = x;

			_m[Y] = y;

			_m[R] = x + _m[W];

			_m[B] = y + _m[H];

			_size.Reset(this.Width(), this.Height());

			_tL.Reset(x,y);

			_bL.Reset(x,y+_size.Height());

			_tR.Reset(x+_size.Width(),y);

			_bR.Reset(x+_size.Width(),y+_size.Height());

		});
		qDef(this,'SetX','Number',function(x){

			_m[X] = x;

			_m[R] = x + _m[W];

			_size.Reset(this.Width(), this.Height());

			_tL.SetX(x);

			_bL.SetX(x);

			_tR.SetX(x+_size.Width());

			_bR.SetX(x+_size.Width());

		});

		qDef(this,'SetY','Number',function(y){

			_m[Y] = y;

			_m[B] = y + _m[H];

			_size.Reset(this.Width(), this.Height());

			_tL.SetY(y);

			_bL.SetY(y);

			_tR.SetY(y+_size.Height());

			_bR.SetY(y+_size.Height());

		});

		qDef(this,'AlignTo','CRect,Number',function( other, alignment){

			_tL.Reset(x,y);

			_bL.Reset(x,y+_size.Height());

			_tR.Reset(x+_size.Width(),y);

			_bR.Reset(x+_size.Width(),y+_size.Height());

		});

		// PROPERTIES

		/*

		Inside, OutSide

		LEFT, TOP, RIGHT, BOTTOM, HCENTER, VCENTER, CENTER

		TOP_LEFT, TOP_CENTER, TOP_RIGHT, MIDDLE

		BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT

		MIDDLE_LEFT, MIDDLE_CENTER, MIDDLE_RIGHT

		<h,v,placement>

		H_IN_LEFT, H_IN_CENTER, H_IN_RIGHT

		H_OUT_LEFT, H_OUT_RIGHT

		V_IN_TOP, V_OUT_TOP, V_CENTER, V_IN_BOTTOM, V_OUT_BOTTOM

		*/

		this.AlignTo    = function( other, alignment ){

			// r1.AlignTo(r2, ETopLeft , EInside | EOutside )

		};

		this.TopLeft	= function( ){

			return _tL;

		};

		this.TopRight	= function( ){

			return _tR;

		};

		this.BottomLeft	= function( ){

			return _bL;

		};

		this.BottomRight= function( ){

			return _bR;

		};

		this.Width 	= function( ){

			return _tR.X() - _tL.X();

		};

		qDef(this,"SetWidth",'Number', function(n){

			_tL.SetX(_tL.X() + n );

			_tR.SetX(_tL.X() + n );

			return this;

		});

		this.Height 	= function( ){

			return _bL.Y() - _tL.Y();

		};

		qDef(this,"SetHeight",'Number', function(n){

			_bL.SetY(_tL.Y() + n );

			_bR.SetY(_tL.Y() + n );

			return this;

		});

		qDef(this,"Size",'void',function(){

			return CSize.New(this.Width(), this.Height());

		});

		qDef(this,"Size",'CSize',function(out){

			out.Reset(this.Width(), this.Height());

		});

		qDef(this,"SetSize",'CSize',function(s){

			this.SetWidth(s.Width());

			this.SetHeight(s.Height());

			return this;

		});

		qDef(this,"SetSize",'Number,Number',function(w,h){

			this.SetWidth(w);

			this.SetHeight(h);

			return this;

		});

		qDef(this,"SetSize",'Array',function(s){

			this.SetWidth(s[0]);

			this.SetHeight(s[1]);

			return this;

		});

		this.Center 	= function( ){

			return _tL.Mid(_bR);

		};

		qDef(this,"SetCenter",'Number,Number', function(x,y){

			var s = this.Size();

			return this.Reset(CPoint2.New( x - s.Width() * 0.5,y - s.Height()*0.5),s);

		});

		qDef(this,"SetCenter",'CPoint2', function(p){

			var s = this.Size();

			return this.Reset(CPoint2.New( p.X() - s.Width() * 0.5,p.Y() - s.Height()*0.5),s);

		});

		this.Left	= function( ){

			return _tL.X();

		};

		qDef(this,"MoveLeft",'Number', function(n){

			_tL.SetX( n );

			_bL.SetX( n );

			return this;

		});

		this.Right	= function( ){

			return _tR.X();

		};

		qDef(this,"MoveRight",'Number', function(n){

			_tR.SetX( n );

			_bR.SetX( n );

			return this;

		});

		this.Top	= function( ){

			return _tL.Y();

		};

		qDef(this,"MoveTop",'Number', function(n){

			_tL.SetY( n );

			_tR.SetY( n );

			return this;

		});

		this.Bottom	= function( ){

			return _bL.Y();

		};

		qDef(this,"MoveBottom",'Number', function(n){

			_bL.SetY( n );

			_bR.SetY( n );

			return this;

		});

		qDef(this,"MoveTopLeft",'Number,Number', function(x,y){

			this.MoveLeft(x);

			this.MoveTop(y);

			return this;

		});

		qDef(this,"MoveTopLeft",'CPoint2', function(p){

			this.MoveLeft(p.X());

			this.MoveTop(p.Y());

			return this;

		});

		qDef(this,"MoveTopRight",'Number,Number', function(x,y){

			this.MoveRight(x);

			this.MoveTop(y);

			return this;

		});

		qDef(this,"MoveTopRight",'CPoint2', function(p){

			this.MoveRight(p.X());

			this.MoveTop(p.Y());

			return this;

		});

		qDef(this,"MoveBottomLeft",'Number,Number', function(x,y){

			this.MoveLeft(x);

			this.MoveBottom(y);

			return this;

		});

		qDef(this,"MoveBottomLeft",'CPoint2', function(p){

			this.MoveLeft(p.X());

			this.MoveBottom(p.Y());

			return this;

		});

		qDef(this,"MoveBottomRight",'Number,Number', function(x,y){

			this.MoveRight(x);

			this.MoveBottom(y);

			return this;

		});

		qDef(this,"MoveBottomRight",'CPoint2', function(p){

			this.MoveRight(p.X());

			this.MoveBottom(p.Y());

			return this;

		});

		qDef(this,'Translate','CPoint2',function(p){

			this

			.MoveLeft(   p.X() + this.Left()  )

			.MoveRight(  p.X() + this.Right() )

			.MoveTop(    p.Y() + this.Top()   )

			.MoveBottom( p.Y() + this.Bottom());

			return this;

		});

		qDef(this,'Translate','Number,Number',function(x,y){

			this

			.MoveLeft(   x + this.Left()  )

			.MoveRight(  x + this.Right() )

			.MoveTop(    y + this.Top()   )

			.MoveBottom( y + this.Bottom());

			return this;

		});

		this.Transpose = function(){

			var w = this.Width();

			this.SetWidth(this.Height());

			this.SetHeight(w);

			return this;

		};

		this.X = function(){

			return _tL.X();

		};

		this.Y = function(){

			return _tL.Y();

		};

		this.ToArray = function(){

			return [this.Y(),this.Y(),this.Width(),this.Height()];

		};

		// ARITHMETICS

		qDef(this,"Add","CRect",function(r){

			var t=this;

			// add(r|r)|plus(a|a)

			t.Reset(t);

			t.SetWidth(t.Width()+r.Width()).SetHeight(t.Height()+r.Height());

			return this;

		});

		this.Sub	= function(r){

			var t=this; t.SetWidth(t.Width()-r.Width()).SetHeight(t.Height()-r.Height()); 	return this;

		};

		this.Mult	= function(r){

			var t=this; t.SetWidth(t.Width()*r.Width()).SetHeight(t.Height()*r.Height()); 	return this;

		};

		this.Scale	= function(k){

			var t=this; t.SetWidth(t.Width()*k).SetHeight(t.Height()*k); 	return this;

		};

		this.Plus 	= function(b){

			return this.Clone( ).Add(b);

		};

		this.Minus 	= function(b){

			return this.Clone( ).Sub(b);

		};

		this.Times 	= function(b){

			return this.Clone( ).Mult(b);

		};

		this.Scaled	= function(k){

			return this.Clone( ).Scale(k);

		};

		this.Equals	= function(b){

			var a=this;return a.Left( )==b.Left( ) &&a.Top( )==b.Top( ) &&a.Width( )==b.Width( ) &&a.Height( )==b.Height( );

		};

		// add( left, k )

		// sub( left, k )

		// div( tl, k )

		// mul( rl, k )

		// L | B | R | T | TL | TR | BL | BR \\

		// Get( i )

		// AUXILIARY

		this.Int 	= function( ){

			this.SetTopLeft( qRound(this.Left()),qRound(this.Top()) );

			this.SetSize( qRound(this.Width()),qRound(this.Height()) );

			return this;

		};


		this.Clone 	= function( ){

			return CRect.New(this.TopLeft( ),this.Size());

		};

		this.Contains = function( p ){

			var r   = this;

			return !( r.Left() >= p.X() && p.X() <= r.Right() && r.Top()  <= p.Y() && r.Bottom() >= b.Y());

		};

		this.Intersects	    = function(b){

			var a = this;

			return !( a.Left( ) > b.Right( ) || b.Left( ) > a.Right( ) || a.Top( ) >=  b.Bottom( ) || a.Bottom( ) <= b.Top( ));

		};

		this.Intersection	= function(b){

			var res = new QB.Rect( );

			if(this.Intersects(b)){

				var

				x = Math.max(a.Left( ),b.Left( )),

				y = Math.max(a.Top( ),b.Top( )),

				w = Math.min(a.Right( ),b.Right( )),

				h = Math.min(a.Bottom( ),b.Bottom( ));

				res.Reset( l,t,w,h );

			}

			return res;

		};

		qDef(CRect,'Combine','CRect',function(other){

			CRect.Union(this,this,other);

			return this;

		});

		qDef(this,'Union','CRect',function(other){

			var out = CRect.New();

			this.Union(out,other);

			return out;

		});

	}

	CRect.Aligment =

	{

		Left            :0xA01,

		Left_Center     :0xA01,

		Left_Right      :0xA01,

		Center_Left     :0xA71,

		Center          :0xA70,

		Centered        :0xA80,

		Center_Right    :0xA72,

		Right_Left      :0xA04,

		Right_Center    :0xA04,

		Right           :0xA04,

		Top             :0xA05,

		Top_Middle      :0xA05,

		Top_Bottom      :0xA05,

		Middle_Top      :0xA07,

		Middle          :0xA07,

		Middle_Bottom   :0xA07,

		Bottom_Top      :0xA06,

		Bottom_Middle   :0xA06,

		Bottom          :0xA06

	};

	/// -------- CONSTRUCTORS ---------------

	CRect.New = function(){
		return new CRect();
	};

	qConstruct(CRect,'void',  function( ){

		return new CRect(0,0,0,0);

	});

	qConstruct(CRect,'CSize',  function( size ){

		return new CRect(0,0,size.Width(),size.Height());

	});

	qConstruct(CRect,'Number,Number,Number,Number',  function(x=0,y=0,w=0,h=0 ){

		return new CRect(x, y, w, h);

	});

	qConstruct(CRect,'CPoint2,CSize',  function(pos,size ){

		return new CRect(pos.X(), pos.Y(),size.Width(), size.Height());

	});

	qConstruct(CRect,'CPoint2,Number',  function(pos,w=0 ){

		return new CRect(pos.X(), pos.Y(),w,w);

	});

	/**

	* Constructs a rect from two points.

	* @param topLeft{

		CPoint2

	}

	top-left position of the rect.

	* @param bottomRight{

		CPoint2

	}

	bottom-right position of the rect.

	*/

	qConstruct(CRect,'CPoint2,CPoint2',  function(topLeft,bottomRight ){

		return new CRect(topLeft,CSize.New(bottomRight.X() - topLeft.X(),bottomRight.Y() - topLeft.Y()) );

	});

	qConstruct(CRect,'CRect',  function( rect ){

		return new CRect(rect.X(),rect.Y(),rect.Width(),rect.Height() );

	});

	qConstruct(CRect,'CQuat',function(q){

		return new CRect(q.X(), q.Y(),q.Z(), q.W());

	},'Constructs from a CQuat instance');

	/// -------- TYPE CASTING ---------------

	qCast(CRect,'Array', function(arr){

		return new CRect(CPoint2.New(arr[0],arr[1]),CSize.New(arr[2],arr[3]) );

	});

	// CASTING OUT

	qCast(CRect,'CRect,CRect',(out, rect)=>{

		out.Reset(rect.X(), rect.Y(),rect.Width(), rect.Height());

	});

	qCast(CRect,'Array,CRect',(out, rect)=>{

		out[0] = rect.M(0);

		out[1] = rect.M(1);

		out[2] = rect.M(2);

		out[3] = rect.M(3);

		out[4] = rect.M(4);

		out[5] = rect.M(5);

	});

	qCast(CRect,'CQuat,CRect',(out, rect)=>{

		out.Reset(rect.X(), rect.Y(),rect.Width(), rect.Height());

	});

	qCast(CRect,'CQuat',(rect)=>{

		return new CRect(rect.X(), rect.Y(),rect.Z(), rect.W());

	});

	qCast(CRect,'CRect,CRect',(out, rect)=>{

		out.Reset(rect.X(), rect.Y(),rect.Width(), rect.Height());

	});

	qCast(CRect,'Object,CRect',(out, rect)=>{

		out.left    = rect.X();

		out.top     = rect.Y();

		out.right   = rect.Right();

		out.bottom  = rect.Bottom();

		out.width   = rect.Width();

		out.height  = rect.Height();

		out.x       = out.left;

		out.y       = out.top;

	},"From CRect to Object");

	qCast(CRect,'Object', function( rect ){

		return new CRect(

		qFloat(rect.left),

		qFloat(rect.top),

		qFloat(rect.right)  - qFloat(rect.left),

		qFloat(rect.bottom) - qFloat(rect.top)

		);

	});

	qCast(CRect,'CSize',  function(size ){

		return new CRect(CPoint2.New(),size );

	});

	/// -------- STATIC FUNCTONS ---------------

	// ARITHMETICS: +

	qOverload(CRect,'Add','CRect,CRect,CRect',(out,a,b)=>{

		out.Reset(

		qMin(a.X(),b.X()),

		qMin(a.Y(),b.Y())

		,a.Width()+b.Width()

		,a.Height()+b.Height()

		);

	});

	qDef(CRect,'Union','CRect,CRect,CRect',function(out,r1,r2){

		out.Reset(

		qMin(r1.X(),r2.X()),

		qMin(r1.Y(),r2.Y()),

		r1.Width()+r2.Width(),

		r1.Height()+r2.Height()

		);

	});

	// ARITHMETICS: /

	/**

	* Split Horizontal

	* @param {

		Array

	}

	out The results buffer

	* @param {

		CRect

	}

	rect The input rect

	* @param {

		Number

	}

	count The subdivision number

	* @param {

		Number

	}

	gap The gap / gutter

	*

	* @example :

	* CRect.Split(output, rect, points, gaps );

	*/

	qDef(CRect,'CreateGrid','Array,CRect,Number,Number,Number,Number',(result,rect,xcount,ycount,xgap,ygap)=>{

		var xlength = (rect.Width()- xgap * 1 )/xcount ;

		var ylength = (rect.Height() - ygap * 1 )/ycount;

		// ygap -= (xcount/xgap);

		// xgap -= (ycount/ygap);

		for(var y = 0; y < ycount; y++ ){

			/*

			if( y == 0 ) yp = ygap;

			if( x == 0 ) xp = xgap;  */

			for( var x=0; x < xcount; x++){

				var yp = 0;

				var xp = 0;

				xp += rect.X() + x * (xlength) + ygap;

				yp += rect.Y() + y * (ylength) + xgap;

				var

				sw = xlength - xgap,

				sh = ylength - ygap;

				var r = CRect.New( xp,yp , sw, sh );

				result.push(r);

			}

		}

		delete xlength;

		delete ylength;

	});


	qOverload(CMath,'Add','CRect,CRect,CRect',(out,a,b)=>{

		out.Reset(

		qMin(a.X(),b.X()),

		qMin(a.Y(),b.Y())

		,a.Width()+b.Width()

		,a.Height()+b.Height()

		);

	});

	qOverload(CMath,'Add','CRect,CRect',(a,b)=>{

		var out = CRect.New(

		qMin(a.X(),b.X()),

		qMin(a.Y(),b.Y()),

		a.Width() +b.Width(),

		a.Height()+b.Height()

		);

		return out;

	});

	

	// alignFlow_First_Last

	// Last_to_first

	// biggest_to_smallest

	// nearest

	// total_bounds

	qDef(CRect,'Align','CRect,CRect,Number',function(a,b,alignment){

		var r1 = a.M(),r2=b.M(),x = r1[0],y = r1[1];

		a.Translate(-x,-y);

		switch(alignment){

			case CRect.Alignment.Left:

			x = r2[0]; break;

			case CRect.Alignment.Left_Center:

			x = r2[0] + r2[2]/2; break;

			case CRect.Alignment.Left_Right:

			x = r2[0] + r2[2];break;

			case CRect.Alignment.Center_Left:

			x = r2[0] - r1[2]/2; break;

			case CRect.Alignment.Center:

			x = r2[0] + r2[2]/2 - r1[2]/2; break;

			case CRect.Alignment.Center_Right:

			x = r2[0] + r2[2] - r1[2]/2; break;

			case CRect.Alignment.Right_Left:

			x = r2[0] - r1[2];break;

			case CRect.Alignment.Right_Center:

			x = r2[0] - r1[2] + r2[2]/2; break;

			case CRect.Alignment.Right:

			x = r2[0] + r2[2] - r1[2]; break;

			case CRect.Alignment.Top:

			y = r2[1]; break;

			case CRect.Alignment.Top_Middle:

			y = r2[1] + r2[3]/2; break;

			case CRect.Alignment.Top_Bottom:

			y = r2[1] + r2[3];break;

			case CRect.Alignment.Middle_Top:

			y = r2[1] - r1[3]/2; break;

			case CRect.Alignment.Middle:

			y = r2[1] + r2[3]/2 - r1[3]/2; break;

			case CRect.Alignment.Middle_Bottom:

			y = r2[1] + r2[3] - r1[3]/2; break;

			case CRect.Alignment.Bottom_Top:

			y = r2[1] - r1[3];break;

			case CRect.Alignment.Bottom_Middle:

			y = r2[1] - r1[3] + r2[3]/2; break;

			case CRect.Alignment.Bottom:

			y = r2[1] + r2[3] - r1[3]; break;

			case CRect.Aligment.Centered:

			x = r2[0] + r2[2]/2 - r1[2]/2; y = r2[1] + r2[3]/2 - r1[3]/2; break;

		}

		a.Translate(x,y);

	},"Aligns rect a to rect b according to the 'alignment'");

	qDef(Geom,"Align","Array,Number,Number",function(list,alignment,target){

		if(list.length<2)return;

		var t,i=0;

		switch (target) {

			/*

			First | Last | Previous | Next | Biggest | Smallest | Custom

			*/

			case Geom.ALIGN_TO_LAST:

			t = list[list.length-1];

			for( i=0; i<list.length-1;i++){

				CRect.Align(list[i],t,alignment);

			}

			return true;

			case Geom.ALIGN_TO_FIRST:

			t = list[0];

			for( i=1; i<list.length;i++){

				CRect.Align(list[i],t,alignment);

			}

			return true;

			case Geom.ALIGN_TO_NEIGHBOR:

			for( i=0; i<list.length-1;i++){

				t = list[i]; CRect.Align(list[i+1],t,alignment);

			}

			return true;

			default:

			for( var i=0; i<list.length;i++){

				CRect.Align(list[i],list[list.length-1],alignment);

			}

		}

	},'Aligns rects to selected target. See CRect.AlignmentTarget for more.');

	// RESIZING

	CRect.RESIZE_EAST        = 0x1001;

	CRect.RESIZE_WEST        = 0x1002;

	CRect.RESIZE_NORTH       = 0x1003;

	CRect.RESIZE_SOUTH       = 0x1004;

	CRect.RESIZE_NORTH_EAST  = 0x1005;

	CRect.RESIZE_NORTH_WEST  = 0x1006;

	CRect.RESIZE_SOUTH_EAST  = 0x1007;

	CRect.RESIZE_SOUTH_WEST  = 0x1008;

	CRect.Resize = function( rect, orientation,value,value2=0 ){

		var r = rect.M();

		switch(orientation){

			case CRect.RESIZE_EAST:

			r[0]+= value;

			r[2]-= value;

			break;

			case CRect.RESIZE_WEST:

			r[2]+= value;

			break;

			case CRect.RESIZE_SOUTH:

			r[3]+= value;

			break;

			case CRect.RESIZE_NORTH:

			r[1]-= value;

			r[3]+= value;

			break;

			case CRect.RESIZE_NORTH_EAST:

			r[1]+= value2;

			r[3]-= value2;

			r[0]+= value;

			r[2]-= value;

			break;

			case CRect.RESIZE_NORTH_WEST:

			r[1]+= value2;

			r[3]-= value2;

			r[2]-= value;

			break;

			case CRect.RESIZE_SOUTH_EAST:

			r[1]+= value2;

			r[0]+= value;

			r[2]-= value;

			break;

			case CRect.RESIZE_SOUTH_WEST:

			r[3]-= value2;

			r[2]-= value;

			break;

		}

		rect.Set(r);

	};

	CRect.SPLIT_HORIZONTALLY = 1;

	CRect.SPLIT_VERTICALLY   = 2;

	CRect.CUT_HORIZONTALLY = 1;

	CRect.CUT_VERTICALLY   = 2;

	CRect.JOIN_FIRST_SELECTED= 1;

	CRect.JOIN_LAST_SELECTED = 2;

	CRect.FLOW_FIRST_TO_LAST = 1;

	CRect.FLOW_LAST_TO_FIRST = 2;

	// CRect.JoinMode.JoinLR

	// CRect.HSplit | VSplit | CRect.HORIZONTAL_SPLIT

	// CRect.MatchWidth | MatchHeight | MatchSize

	// CRect.IncWidth | IncHeight :

	/*

	CRect:

	- Join

	- SplitH

	- SplitW

	- Swap

	- CutH

	- CutW

	- IncL

	- IncB

	- IncT

	- IncR

	*/

	qDef(CRect,"Cut","Array,CRect,Number,Number",  function(out,box,pos,mode = 1){

		var bInBounds= false;

		if(mode === CRect.CUT_HORIZONTALLY)

		bInBounds = box.Left() < pos && box.Right() > pos;

		else

		bInBounds = box.Top() < pos && box.Bottom() > pos;

		if( !bInBounds ){

			console.log("Point not in rect!......");

			return false;

		}

		var

		r1 ,r2;

		if(mode === CRect.CUT_HORIZONTALLY ) // resize width

		{

			r1 = CRect.New( box.X(), box.Y(), pos - box.X(), box.Height() );

			r2 = CRect.New( r1.Right(), r1.Y(), box.Width() - r1.Width(), box.Height() );

		}

		else{

			r1 = CRect.New( box.X(), box.Y(), box.Width(), pos - box.Y() );

			r2 = CRect.New( r1.X(),  r1.Bottom(), box.Width(), box.Height() - r1.Height() );

		}

		out.push( r1 );

		out.push( r2 );

		return true;

	});

	qDef(CRect,"Split","Array,CRect,Number",function( result, rect,splitMode = CRect.SPLIT_HORIZONTALLY ){

		var pos = 0;

		if(splitMode === CRect.SPLIT_HORIZONTALLY)

		pos =  rect.Right() - rect.Width()/2;

		else

		pos =  rect.Bottom() - rect.Height()/2;

		return CRect.Cut( result, rect, pos, splitMode );

	});

	qDef(CRect,"Join","CRect,CRect,CRect,Number", function(out, a,b,joinMode=CRect.JOIN_FIRST_SELECTED ){

		var

		r1 = a.M(),r2=b.M(),r3,

		vAligned = r1[0] === r2[0] && r1[2]=== r2[2],

		hAligned = r1[1] === r2[1] && r1[3]=== r2[3];

		if(r1.Equals( r2 )) return;

		if(!vAligned && !hAligned ) return;

		//var t,c;

		if( vAligned ){

			switch(joinMode){

				case CRect.JOIN_FIRST_SELECTED: // TOP -> BOTTOM

				r1[1] = Math.min(r1[1],r2[1]);

				r1[3] += r2[3];

				r3 = r1;

				//c = b;

				//t = a;

				break;

				case CRect.JOIN_LAST_SELECTED: // BOTTOM -> TOP

				r2[1] = Math.min(r1[1],r2[1]);

				r2[3] += r1[3];

				r3 = r2;

				//c = a;

				//t = b;

			}

		}

		else if(hAligned){

			switch(mode){

				case CRect.JOIN_FIRST_SELECTED: // LEFT -> RIGHT

				r1[0] = Math.min(r1[0],r2[0]);

				r1[2] += r2[2];

				r3 = r1;

				//c = b;

				//t = a;

				break;

				case CRect.JOIN_LAST_SELECTED: // RIGHT -> LEFT

				r2[0] = Math.min(r1[0],r2[0]);

				r2[2] += r1[2];

				r3 = r2;

				//c = a;

				//t = b;

			}

		}

		out.Set(r3);

	});

	CRect.Swap 	= function(a,b){

		var r1 	= a.Rect(),r2=b.Rect();

		if(r1.toString() === r2.toString()) return;

		b.SetRect(r1);

		a.SetRect(r2);

	};

	CRect.Distribute 	= function(a,b){

		var

		r1 	= a.M(),r2=b.M(),

		vAligned 	= r1[0] === r2[0] && r1[2]=== r2[2],

		hAligned 	= r1[1] === r2[1] && r1[3]=== r2[3];

		if( vAligned  ){

			if((r1[1]+r1[3] < r2[1]) || (r2[1]+r2[3] < r1[1])) return;

			var h 	= (r1[3]+r2[3])/2;

			r1[3] 	= h;

			r2[3] 	= h;

			if(r1[1]<r2[1]) r2[1] = r1[1]+h;

			else if(r1[1]>r2[1]) r1[1] = r2[1]+h;

			a.Set(r1);

			b.Set(r2);

		}

		else if(hAligned){

			if((r1[0]+r1[2] < r2[0]) || (r2[0]+r2[2] < r1[0])) return;

			var w 	= (r1[2]+r2[2])/2;

			r1[2] 	= w;

			r2[2] 	= w;

			if(r1[0]<r2[0]) r2[0] = r1[0]+w;

			else if(r1[0]>r2[0]) r1[0] = r2[0]+w;

			a.Set(r1);

			b.Set(r2);

		}

	};

	exports.CRect = CRect;

	return CRect;

});