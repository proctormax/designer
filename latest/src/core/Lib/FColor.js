
/*
-------------------------------------------------------
AUTHOR: Hikestone Inc
-------------------------------------------------------
CLASS:
	CColor - The solid color base class used to achieve 
	different colors and color modes.
-------------------------------------------------------
PROPERTIES:			VALID ENTRIES:
	(N)Name:		( colorName | Number | CColor | HEX | HSV | RGB | HSL | CMYK | HWB )	
	(H)Hue:			0-360
	(S)Saturation: 	0-100
	(L)Lightness:	0-100
	(V)Value:		0-100
	(W)Whitness:	0-100
	
	(R)Red:			0-255
	(G)Green:		0-255
	(B)Blue:		0-255
	
	(C)Cyan:		0-100	
	(M)Magenta:		0-100
	(Y)Yellow:		0-100
	(K)Black:	0-100
	
	(A)Alpha:		0-100
	
	(D)Darken:		0-100
	(U)Desaturate:  0-10
	(Z)Brighten:	0-10
	(E)Greyscale:	(true|false) or (0|1)
	(I)Inverse:		(true|false) or (0|1)
	(Q)Complement:  (true|false) or (0|1)
	
	(T)Tint:		0-100
	(O)Tone:		0-100
	(P)Shade:		0-100
	
	(?)Chroma:		?
	(?)Vividness:	?
	(?)Luminance:  	?
	(?)Triad:		?
	(X)Tetrad:		?
	(?)Monochrome:	?
	
	
CColor( val,adjustment );
CColor( "red",{H:2,W,B} );
-------------------------------------------------------
ADJUSTMENTS:
 
	 CColor.Darken( color, percent );
	 CColor.Saturate( color, percent );
	 CColor.Desaturate( color, percent );
	 CColor.Hue( color, degree );
	 CColor.Lighten( color, percent );
	 CColor.Grayscale( color );
	 CColor.Invert( color );
	 CColor.Complement( color );
	 CColor.Tint( color, percent );
	 CColor.Tone( color, percent );
	 CColor.Shade( color, percent );
	 CColor.Triad( color );
	 CColor.Tetrad( color );
	 CColor.Analogous( color, amount );
	 CColor.Monochromatic( color, count );
	 CColor.SplitComplement( color, count );
	 CColor.Lumminance( color );
	 CColor.Contrast( colo1,color2 );
	 CColor.Named( "pink" );
	 CColor.Decimal( "fff" );
	 
	 FMath.Color_Triad( );
	 FMath.Color_Complement( );
	 FMath.Color_Contrast( );
	 FMath.Color_Invert( );
	 FMath.Color_Darken( );
	 FMath.Color_Tint( );
	 FMath.Color_Tone( );
	 FMath.Color_Invert(  );
	 FMath.Color_Shade( color,amount );
	 
	 FMath.Color_HSV_to_RGB( );
	 FMath.Color_HWB_to_CMYK( );
	 
	 FMath.Vector_Rotate
	 FMath.Matrix_Transpose( );
	 FMath.Matrix_Multiply( );
	 FMath.Vector_Project_Perspective( )
	 FMath.
	 c = CColor.New({N:"orangeRed",G.55});
	 c = CColor.New({N:"orangeRed",G.5,U.78});
	 c = CColor.New({});
	 
	 ball.Color = CColor.New({N:"Orchid",P.22,O});
-------------------------------------------------------
ARITHMETIC OPERATIONS:
  
	c.add(d);	// c += d;
	c.mul(5);	// c *= 5;
	c.sub(b);	// c -= b;	
	c.dec(4);   // c -= 4;
	c.inc(3);   // c += 3;
	c.div(5);   // c /= 5; 
-------------------------------------------------------
RELATIONAL OPERATIONS:
	 
	c.isGT(color); // c  > color
	c.isLT(color); // c  < color
	c.isEQ(color); // c == color
	c.isLE(color); // c <= color
	c.isGE(color); // c >= color
	c.isNE(color); // c != color
-------------------------------------------------------
COLOR-SPACE CONVERSION:
 
	 CColor.HSV_to_RGB( HSV );
	 CColor.HSV_to_HSL( HSV );
	 CColor.HSV_to_CMYK( HSV );
	 
	 CColor.HSL_to_HSV( HSL );
	 CColor.HSL_to_RGB( HSL );
	 CColor.hsl2_CMYK( HSL );
	 
	 CColor.RGB_to_HSL( RGB );
	 CColor.RGB_to_HSV( RGB );
	 CColor.RGB_to_CMYK( RGB );
	 
	 CColor.CMYK_to_RGB( CMYK );
	 CColor.cmyk2_HSV( CMYK );
	 CColor.cmyk2_HSL( CMYK );
	  
-------------------------------------------------------
MODES:
	rgb	- Sets or returns the RGB
	hsv	- Sets or returns the HSV
	hsl	- Sets or returns the HSL
	cmyk- Sets or returns the CMYK	
	
-------------------------------------------------------
INITIALIZATION:
	var color = new CColor({H:32,A, S} );
*/
qPack("lib.hikestone.graphics.CColor", function(){		
	//import lib.hikestone.math.FMath;
	//import lib.hikestone.utils.Finder;
	//import lib.hikestone.math.FVec3;
	
	
		
		function ParseVal( val,opts=null )
		{
			if(  qTypeOf(val,"Number") )
			{
				dec = val;
			}
			else if(  qTypeOf(val,"String")  )
			{
				
				var m = CColor.NameExistance(val,false,false);				
				if(m.length == 1)
				{
					var v = CColor.GetValueOfName(m[0]);
					dec = v;
				}
				else if( CColor.ValidateHex( val ) )
				{
					rgb = CColor.HEX_to_RGB(val); 
					
				}else
				{
					
					throw new Error("CColor Creation ERROR:: Invalid entry specified! Default value will be assigned" );
					dec = 0;				
				}									
								
			}
			else
			{
				
				if(  qTypeOf(val,"HSV") ) dec = CColor.FromHSV(val).dec;
				else if(  qTypeOf(val,"HSL") ) dec = CColor.FromHSL(val).dec;
				else if(  qTypeOf(val,"CMYK")) dec = CColor.FromCMYK(val).dec;
				else if(  qTypeOf(val,"RGB") ) dec = CColor.FromRGB(val).dec;
				else if(  qTypeOf(val,"HWB") ) dec = CColor.FromHWB(val).dec;
				else if(  qTypeOf(val,"CColor") ) dec  = val.dec;
				

				else if(  qTypeOf(val,"FPaint") )
				{
					var paint = val; // as FPaint;
					if( paint.isSolid() ) rgb = val.color.rgb;
				}
				else
				{
					throw new Error("CColor Creation ERROR:: Invalid Color Space specified. Default value will be assigned");
					dec = 0;
				}
			}
			if(  qTypeOf(opts,"Object") )
			{
				for( var i in opts )
				{
					if( i.match( new RegExp("(h|hue)",'i'))) Hue = opts[i];
					else if( i.match( new RegExp("(s|saturation)",'i'))) Saturation = opts[i];
					else if( i.match( new RegExp("(v|dark?(en|ness))",'i'))) Darkness = opts[i];
					else if( i.match( new RegExp("(l|light?(en|ness))",'i'))) Lightness = opts[i];
					else if( i.match( new RegExp("(r|red?(en|ness))",'i'))) Red = opts[i];
					else if( i.match( new RegExp("(g|green)",'i'))) Green = opts[i];
					else if( i.match( new RegExp("(b|blue)",'i'))) Blue = opts[i];
					else if( i.match( new RegExp("(a|alpha|opacity|(transparen?(t|cy)))",'i'))) Alpha = opts[i];
					else if( i.match( new RegExp("(d|dec)",'i'))) dec = opts[i];
					else if( i.match( new RegExp("rgb",'i'))) rgb = opts[i];
					else if( i.match( new RegExp("hsv",'i'))) hsv = opts[i];
					else if( i.match( new RegExp("hsl",'i'))) hsl = opts[i];
					
				}
			}
		}
		
		function CColor( color,adjustments=null ){ 
			ParseVal( color,adjustments );
	
			 var mColor=0,mAlpha = 100, mName, mRatio=100;
			 var mShade=0,mTint=0,mTone=0;
			 /*
			 ------------------------
			 COLOR SPACE TYPECASTING
			 ------------------------
			 */
			 Object.defineProperties(this,{"rgb":{
				 set:function( val ){ dec = CColor.RGB_to_DEC( val); },
				 get:function() { return toRGB(); },
				 set:function( r, g, b, a=100 ){ rgb = new RGB(r,g,b,a);}
				 
			 }});
			 
			 Object.defineProperties(this,{"hsl":{
				 set:function( val ){ dec = CColor.RGB_to_DEC( CColor.HSL_to_RGB(val) ); },
				 get:function() { return toHSL(); },
				 set:function( h, s, l, a=100 ){ hsl = new HSL( h,s,l,a);}
				 
			 }});
			 
			 Object.defineProperties(this,{"hsv":{
				 set:function( val ){ dec = CColor.RGB_to_DEC( CColor.HSV_to_RGB(val) );},
				 get:function() { return toHSV(); },
				 set:function( h, s=100, v=100, a=100 ){ hsv = new HSV(h,s,v,a);}
				 
			 }});
			 
			 Object.defineProperties(this,{"hwb":{
				 set:function( val ){ dec = CColor.RGB_to_DEC( CColor.HWB_to_RGB(val) );},
				 get:function() { return toHWB(); },
				 set:function( h, w=100, b=100, a=100 ){ hwb = new HWB(h,w,b,a);}
				 
			 }});
					 
			 Object.defineProperties(this,{"cmyk":{
				 set:function( val ){ dec = CColor.RGB_to_DEC( CColor.CMYK_to_RGB(val) ); },
				 get:function() { return toCMYK(); },
				 set:function( c, m=100, y=100, k=100,a=100 ){ cmyk = new CMYK(c,m,y,k,a);}
				 
			 }});
			 
			 Object.defineProperties(this,{"dec":{
				 set:function( val ){ mColor = val;},
				 get:function(){ return mColor; },
				 set:function( val ){ mColor = val;}
				 
			 }});
			 Object.defineProperties(this,{"hex":{
				 set:function( str ){ dec = CColor.RGB_to_DEC( CColor.HEX_to_RGB(str) );},
				 get:function(){ return Red.toString(16)+Green.toString(16)+Blue.toString(16)+Alpha.toString(16);},
				 set:function( r, g, b ){ dec = CColor.RGB_to_DEC( CColor.HEX_to_RGB(str) );}
				 
			 }});
			 
			 CColor.ValidateHex = function( hex )
			 {
				 hex = hex.replace('#','');
				 hex = hex.replace('0x','');
				 if( hex.length > 8 || hex.length < 3 ) return false;
				 var rx = /([G-Z]|\W)/i;
				 return !rx.test(hex);
			 }
			 
			 /*
			 -----------------------
			 RELATIONAL OPERATORS
			 -----------------------
			 */
			 this.IsEQ = function(color ){ return dec == color.dec;}
			 this.IsGQ = function(color ){ return dec >= color.dec;}
			 this.IsLQ = function(color ){ return dec <= color.dec;}
			 this.IsGT = function(color ){ return dec > color.dec;}
			 this.IsLT = function(color ){ return dec < color.dec;}
			 this.IsNE = function(color ){ return dec != color.dec;}
			 
			 /*
			 ------------
			 PROPERTIES
			 ------------
			 */
			 // N - Name
			 Object.defineProperties(this,{"Name":{
			 set:( name )=>{ var rr = CColor.NameExistance(name,false); if( rr.length ){ name = rr[0];dec = CColor.GetValueOfName(name); }},
			 get:()=>{ return CColor.GetNameOfValue(dec);}}});
			 // O - Ratio
			 Object.defineProperties(this,{"Ratio":{
			 set:( ratio )=>{ mRatio = Math.max( Math.min(ratio,100),1);},
			 get:()=>{ return mRatio;}}});
			 // R - Red
			 Object.defineProperties(this,{"Red":{
			 set:( red )=>{ dec = CColor.RGB_to_DEC( new RGB( red, Green,Blue) );return this;},
			 get:()=>{ return rgb.r;}}});
			 // G - Green
			 Object.defineProperties(this,{"Green":{
			 set:( green )=>{ dec = CColor.RGB_to_DEC( new RGB( Red, green,Blue) );return this;},
			 get:()=>{ return rgb.g;}}});
			 // B - Blue
			 Object.defineProperties(this,{"Blue":{
			 set:( blue )=>{ dec = CColor.RGB_to_DEC( new RGB( Red, Green,blue ) );return this;},
			 get:()=>{ return rgb.b;}}});
			 
			 // C - Cyan
			 Object.defineProperties(this,{"Cyan":{
			 set:(  cyan )=>{ var t=cmyk; t.c=cyan; cmyk = t;return this;},
			 get:()=>{ return cmyk.c;}}});
			 // M - Magenta
			 Object.defineProperties(this,{"Magenta":{
			 set:(  magenta )=>{ var t=cmyk; t.m=magenta; cmyk = t;return this;},
			 get:()=>{ return cmyk.m;}}});
			 // Y - Yellow
			 Object.defineProperties(this,{"Yellow":{
			 set:(  yellow )=>{ var t=cmyk; t.y=yellow; cmyk = t;return this;},
			 get:()=>{ return cmyk.y;}}});
			 // K - Black
			 Object.defineProperties(this,{"Black":{
			 set:(  black )=>{ var t=cmyk; t.k=black; cmyk = t;return this;},
			 get:()=>{ return cmyk.k;}}});
			 
			 // H - Hue
			 Object.defineProperties(this,{"Hue":{
			 set:(  degree )=>{ hsv = new HSV(degree,Saturation,Darkness);return this;},
			 get:()=>{ return hsv.h;}}});
			 // S - Saturation
			 Object.defineProperties(this,{"Saturation":{
			 set:( saturation )=>{ var t=hsv; t.s=saturation; hsv = t;return this; },
			 get:()=>{ return hsl.s;}}});
			 // L - Lightness
			 Object.defineProperties(this,{"Lightness":{
			 set:(  lightness )=>{ var t=hsl; t.l=lightness; hsl = t;return this;},
			 get:()=>{ return hsl.l;}}});
			 // V - Value
			 Object.defineProperties(this,{"Value":{
			 set:(  value )=>{ var t = hsv; t.v=value; hsv=t;return this;},
			 get:()=>{ return hsv.v;}}});
			 // V - Value
			 Object.defineProperties(this,{"Darkness":{
			 set:(  percent )=>{ var t = hwb; t.w=percent; hwb=t;return this;},
			 get:()=>{ return hwb.w;}}});
			 // A - Alpha
			 Object.defineProperties(this,{"Alpha":{
			 set:( alpha )=>{ rgb = RGB.New(Red,Green,Blue,alpha); return this;},
			 get:()=>{ return rgb.a;}}});
			 // T - Tone
			 Object.defineProperties(this,{"Tone":{
			 set:( percent )=>{ mTone = Math.min( percent,100); var t = mTone * 0.01 * 127; rgb = new RGB(Red-t,Green-t,Blue-t); },
			 get:()=> { return mTone;}}});
			 // F - Tint
			 Object.defineProperties(this,{"Tint":{
			 set:( percent )=>{ mTint = Math.min( percent,100); var t = mTint * 0.01 * 127; rgb = new RGB(Red+t,Green+t,Blue+t); },
			 get:()=> { return mTint;}}});
			 // P - Shade
			 Object.defineProperties(this,{"Shade":{
			 set:( percent )=>{ mShade = Math.min( Math.abs(percent),100); hwb = HWB.New(Hue,Whiteness ,Black - mShade); },
			 get:()=> { return mShade;}}});
			 // N - Hex
			 Object.defineProperties(this,{"Hex":{
			 set:( code )=>{ hex=code;},
			 get:()=> { return hex.toUpperCase();}}});
			 
			 // b = (299R+587G+144B)/100;
			 // 299R = 1000b/(587G + 144B);
			 this.Brightness = function(){ return (Red * 299 + Green * 587 + Blue * 114)/1000;}
			 this.Chroma = function(){ return rgb.chroma;}
			 this.IsAchromatic = function(){ return Red==Green==Blue;}
	 
			 this.Info = function(){ 
			   var res;
				 /* "#:"+Hex+			
				 ",RRed+
				 ",GGreen+
				 ",BBlue+
				 
				 ",CCyan+
				 ",MMagenta+
				 ",YYellow+
				 ",KBlack+
				 
				 ",HHue+
				 ",SSaturation+
				 ",VDarkness+
				 ",LLightness+
				 ",AAlpha+
				 ",NameName; */
				 /* 
				 var res =
				 "#:"+Hex+			
				 ",RFMath.per(0,255,Red)+
				 "%,GFMath.per(0,255,Green)+
				 "%,BFMath.per(0,255,Blue)+
				 
				 "%,CFMath.per(0,255,Cyan)+
				 "%,MFMath.per(0,255,Magenta)+
				 "%,YFMath.per(0,100,Yellow)+
				 "%,KFMath.per(0,100,Black)+
				 
				 "%,HFMath.per(0,360,Hue)+
				 "%,SFMath.per(0,100,Saturation)+
				 "%,VFMath.per(0,100,Darkness)+
				 "%,LFMath.per(0,100,Lightness)+
				 "%,WFMath.per(0,100,Whiteness)+
				 "%,AFMath.per(0,100,Alpha)+
				 "%,NameName; */
				 return res;
			 }
		}
		/*
		--------------------
		COLOR CONVERSIONS
		--------------------
		*/
		// RGB --> HSL
		CColor.RGB_to_HSL = function( val )
		{
			var r = val.r / 255; 
			var g = val.g / 255; 
			var b = val.b / 255;
			var M = Math.max(r,g,b);
			var m = Math.min(r,g,b);
			var h, s, l = (M + m)/2,d = M-m;
			if( d == 0 ) h =0;
			else if( M==r )h=((g-b)/d)%6;
			else if( M==g )h=(b-r)/d+2;
			else h = (r-g)/d+4;
			h*=60;
			
			s = d == 0 ? 0 : d/(1-Math.abs(2*l-1));
			
			s*=100;
			l*=100;
			
			return new HSL(Math.round(h),Math.round(s),Math.round(l),val.a);
		}
		// HSL --> RGB
		/*
		 HUE ::
		 a = (2*R - G - B)/2;
		 b = sqrt(3)/2 *( G - B )
		 hsl.h  = atan2(b,a);
		 
		 HSI.I  = ( R+G+B )/3;
		 HSV.V  = M = max(R,G,B);
		 HSL.L  = ( M+m )/2;
		 
		 SATURATION ::
		 HSV.S = V == 0?0 : C/V;
		 HSL.S = L >= 0 || L <= 1 ? 0 : C/ (1-|2*L-1|);
		 HSI.S = I == 0 ? 0 : 1 - m/I;
		*/
		
		CColor.HSL_to_RGB = function( hsl )
		{
			
			var r,g,b;
			var h = Math.min( hsl.h,359 ), s= hsl.s/100, l= hsl.l/100,hh=h/60,
			C  = (1-Math.abs(2*l-1))*s, X=C*(1-Math.abs(hh%2-1));
			
			if( hh>=0 && hh<1){ r=C;g=X;}
			else if( hh>=1 && hh<2){ r=X;g=C;}
			else if( hh>=2 && hh<3){ g=C;b=X;}
			else if( hh>=3 && hh<4){ g=X;b=C;}
			else if( hh>=4 && hh<5){ r=X;b=C;}
			else{ r=C;b=X;}
			
			var m = l-C/2;
			r+=m; g+=m; b+=m;
			r*=255; g*=255; b*=255;
			
			return new RGB(Math.round(r),Math.round(g),Math.round(b),hsl.a);
		}
		// RGB --> HSV
		CColor.RGB_to_HSV = function( rgb )
		{
			
			var r= rgb.r;
			var g= rgb.g;
			var b= rgb.b;
			
			r = r > 0? r/255 : 0;
			g = g > 0? g/255 : 0;
			b = b > 0? b/255 : 0;
			
			var m = Math.min( r,g,b );
			var M = Math.max( r,g,b );
			var h,s, v = M;
			
			var d = M-m;
			if( d == 0 ) h =0;
			else if( M == r ) h=((g-b)/d)%6;
			else if( M == g ) h=((b-r)/d+2);
			else h = (r-g)/d+4;
			h*=60;
			
			s = v == 0 ? 0 : d/v;
			s*=100;v*=100;
			return new HSV(Math.round(h),Math.round(s),Math.round(v),rgb.a);
		}
		// HSV --> RGB
		CColor.HSV_to_RGB = function( hsv )
		{
			
			var 
			h  = Math.min(hsv.h,359), 
			s  = Math.min(hsv.s,100), 
			v  = Math.min(hsv.v,100);
			s/=100; v/=100;
			var C = v*s, hh= h/60, X = C *(1-Math.abs(hh%2-1)),
			r =0,g=0,b=0;
			
			if( hh >= 0 && hh < 1 ){  r=C; g=X;  }
			else if( hh>=1 && hh<2 ){ r=X; g=C; }
			else if( hh>=2 && hh<3 ){ g=C; b=X; }
			else if( hh>=3 && hh<4 ){ g=X; b=C; }
			else if( hh>=4 && hh<5 ){ r=X; b=C; }
			else{  r=C; b=X; }
			
			var m = v-C;
			
			r += m;	g += m;	b += m;
			
			r*=255;	g*=255; b*=255;
			
			r = Math.round(r); g=Math.round(g); b=Math.round(b);
			
			return new RGB(r,g,b,hsv.a);	
			
		}
		// RGB --> CMYK
		CColor.RGB_to_CMYK = function( rgb )
		{						
			var R = rgb.r / 255;
			var G = rgb.g / 255;
			var B = rgb.b / 255;
			
			var K =  ( 1 - Math.max( R, G, B )); 			
			var C =  ( ( ( 1 - R - K ) / ( 1 - K ) ));
			var M =  ( ( ( 1 - G - K ) / ( 1 - K ) ));
			var Y =  ( ( ( 1 - B - K ) / ( 1 - K ) ));
			C*=100;M*=100;Y*=100;K*=100;
			return new CMYK(Math.round(C),Math.round(M),Math.round(Y),Math.round(K),rgb.a);
		}
		// CMYK --> RGB
		CColor.CMYK_to_RGB = function( cmyk )
		{	
			var c = cmyk.c/100,y=cmyk.y/100,m=cmyk.m/100,k=cmyk.k/100;
			var n = 255 * (1-k);			
			return new RGB( Math.round((1-c) * n), Math.round((1-m)* n), Math.round((1-y)*n),cmyk.a );
			
		}		
		
		// HSL --> HSV
		CColor.HSL_to_HSV = function( hsl )
		{
			var hsv = new HSV(hsl.h);
			hsl.s *= 2;
			if( hsl.l <= 1 ) hsl.s *= hsl.l;
			else hsl.s *= (2 - hsl.l );
			hsv.v = ( hsl.l + hsl.s ) /2;
			hsv.s = ( 2 * hsl.s )/(hsl.l + hsl.s, hsl.a );
			return hsv;
			
		}
		// HSV --> HSL
		CColor.HSV_to_HSL = function( hsv )
		{
			var hsl =  new HSL( hsv.h,0,0,hsv.a);
			hsl.l = (2-hsv.s)*hsv.v;
			hsl.s = hsv.s * hsv.v;
			
			if( hsl.l <= 1 ) hsl.s /= hsl.l;
			else hsl.l /= (2 - hsl.l);
			hsl.l /= 2;
			
			return hsl;
		}
		
		CColor.HWB_to_RGB = function(hwb )
		{
			var rgb = CColor.HSL_to_RGB( HSL.New(hwb.h,0.100,0.5));
			var r = [rgb.r,rgb.g,rgb.b];
			for( var i=0;i<3;i++)
			{
				r[i] *= ( 1 - hwb.w - hwb.b);
				r[i] += hwb.w;
			}

			rgb.r = r[0];
			rgb.g = r[1];
			rgb.b = r[2];
			rgb.a = hwb.a;
			return rgb;
		}
		CColor.RGB_to_HWB = function(rgb ){	return CColor.HSV_to_HWB( CColor.RGB_to_HSV(rgb));}
		
		CColor.HSV_to_HWB = function(hsv ){	return HWB.New( hsv.h, hsv.v * (1-hsv.s), 1-hsv.v,hsv.a);}
		CColor.HWB_to_HSV = function(hwb ){ return HSV.New(hwb.h, 1-(hwb.w/(1-hwb.b)),1-hwb.b,hwb.a);}
		CColor.RGB_to_DEC = function( rgb ){return (( rgb.r << 16 )+ (rgb.g << 8) + rgb.b );}
		CColor.DEC_to_RGB = function( val ){return	new RGB( (val & 0xFF0000) >> 16,(val & 0x00FF00) >> 8,(val & 0x0000FF));}
		CColor.RGB_to_HEX = function( rgb ){ return CColor.DEC_to_HEX( CColor.RGB_to_DEC(rgb) );}
		CColor.DEC_to_HSV = function( val ){return CColor.RGB_to_HSV( CColor.DEC_to_RGB(val) );}
		CColor.DEC_to_HSL = function( val ){return	CColor.RGB_to_HSL( CColor.DEC_to_RGB(val) );}
		CColor.DEC_to_HEX = function( val ){return	val.toString(16);}		
		CColor.DEC_to_CMYK = function( val ){return CColor.RGB_to_CMYK( CColor.DEC_to_RGB(val) );	}
		CColor.HEX_to_RGB = function( hex )
		{ 
			
			hex = hex.replace('0x','');
			hex = hex.replace('#','');
			hex = hex.length==0?"000": hex.length == 1 ? '00'+hex : hex.length ==2? '0'+hex:hex;
			trace(hex);
			if( CColor.ValidateHex(hex))
			{	
				var c = hex.split('');
				trace(c);
				var f = 
				{
					a:function(c ){var n=c.length; return n == 4? c[3]+c[3] : n==8? c[6]+c[7] : "FF";	},
					r:function(c ){var n=c.length; return n == 3 || n==4? c[0]+c[0] : n==8 || n==6? c[0]+c[1] : "00";	},
					g:function(c ){var n=c.length; return n == 3 || n==4? c[1]+c[1] : n==8 || n==6? c[2]+c[3] : "00";	},
					b:function(c ){var n=c.length; return n == 3 || n==4? c[2]+c[2] : n==8 || n==6? c[4]+c[5] : "00";	}
				};
				
				var r= RGB.New( Number('0x'+f.r(c)), Number('0x'+f.g(c)), Number('0x'+f.b(c)),Number('0x'+f.a(c)));	
				
				return r;
			}else
			{
				throw new Error("CColor.HEX_to_RGB ERROR: '"+ qTypeOf(hex) +" is not a valid hex");
				//return RGB.New(0);
			}
			
		}
		CColor.FromRGB = function( rgb ){ return new CColor( CColor.RGB_to_DEC(rgb));}
		CColor.FromHSV = function( hsv ){ return new CColor( CColor.RGB_to_DEC( CColor.HSV_to_RGB(hsv)));}
		CColor.FromHSL = function( hsl ){ return new CColor( CColor.RGB_to_DEC( CColor.HSL_to_RGB(hsl)));}
		CColor.FromDEC = function( dec ){ return new CColor( dec);}
		CColor.FromHEX = function( hex ){ return new CColor( CColor.HEX_to_RGB(hex));}
		CColor.FromCMYK = function( cmyk ){ return new CColor( CColor.RGB_to_DEC( CColor.CMYK_to_RGB(cmyk)));}
		CColor.FromHWB = function( hwb ){ return CColor.New( CColor.HWB_to_RGB(hwb));}
		
		CColor.ofRGB = function( red =0,green=0,blue=0,alpha=0 ){ return CColor.FromRGB(RGB.New(red,green,blue,alpha));}
		CColor.ofHSV = function( hue,saturation,darkness,alpha ){ return CColor.FromHSV(HSV.New(hue,saturation,darkness));}
		CColor.ofHSL = function( hue =10,saturation=0,lightness=0,alpha=100){ return  CColor.FromHSL(HSL.New(hue,saturation,lightness,alpha));}
		CColor.ofHWB = function( hue =10,whiteness=50,blackness=100,alpha=100 ){ return CColor.FromHWB( HWB.New(hue,whiteness,blackness,alpha));}
		CColor.ofHEX = function( hex ){ return fromHEX(hex);}
		CColor.ofCMYK = function(cyan =0,yellow=0,magenta=0,black=100,alpha=100){ return CColor.FromCMYK( CMYK.New(cyan,magenta,yellow,black,alpha));}
		CColor.ofDEC = function( decimal ){ return new CColor(decimal);}
		CColor.ofName = function( name ="grey",alpha=100 ){ return new CColor(name,{A:alpha});}
		
		 function toRGB(){ return CColor.DEC_to_RGB( mColor); }
		 function toHSL(){ return CColor.RGB_to_HSL( toRGB());}		
		 function toHSV(){ return CColor.RGB_to_HSV( toRGB());}
		 function toCMYK() { return CColor.RGB_to_CMYK( toRGB());}
		 function toHWB(){ return CColor.RGB_to_HWB( toRGB() );}
		
		CColor.Val2perc = function( color )
		{
			var c = color;
			if(  qTypeOf(c,"RGB") )
			{ // rgb( 122,49,21 )
				c.r = (c.r*100)/255;
				c.g = (c.g*100)/255;
				c.b = (c.b*100)/255;
				
			}
			else if(  qTypeOf(c,"HSV") )
			{
				c.Hue = (c.h*100)/360;
				c.s = (c.s*100)/100;
				c.v = (c.v*100)/100;
			}
			else if(  qTypeOf(c,"HSL") )
			{
				c.Hue = (c.h*100)/360;
				c.s = (c.s*100)/100;
				c.l = (c.l*100)/100;
			}
			else if(  qTypeOf(c,"CMYK") )
			{
				c.c *= 100;
				c.m *= 100;
				c.y *= 100;
				c.k *= 100;
				
			}
			return c;
		}
		CColor.Perc2val = function( color_in_percentage )
		{
			var c = color_in_percentage;
			if(  qTypeOf(c,"RGB") )
			{ 
				c.r = c.r/100 * 255;
				c.g = c.g/100 * 255;
				c.b = c.b/100 * 255;
				
			}
			else if(  qTypeOf(c,"HSV") )
			{
				c.Hue = c.h/100 * 360;
				c.s = c.s/100 * 100;
				c.v = c.v/100 * 100;
			}
			else if(  qTypeOf(c,"HSL") )
			{
				c.Hue = c.h/100 * 360;
				c.s = c.s/100 * 100;
				c.l = c.l/100 * 100;
			}
			else if(  qTypeOf(c,"CMYK") )
			{	
				c.c /= 100;
				c.m /= 100;
				c.y /= 100;
				c.k /= 100;
				
			}
			return c;
		}
		/*
		--------------------
		COLOR ARITHMETICS
		--------------------
		*/
		CColor.add = function( a, b ){ return CColor.FromRGB(new RGB(a.Red+b.Red, a.Green+b.Green, a.Blue+b.Blue));}
		CColor.sub = function( a, b ){ return CColor.FromRGB(new RGB(a.Red-b.Red, a.Green-b.Green, a.Blue-b.Blue));}
		CColor.mul = function( a, amount ){ return CColor.FromRGB(new RGB(a.Red*amount, a.Green*amount, a.Blue*amount));}
		CColor.div = function( a, amount ){ return CColor.FromRGB(new RGB(a.Red/amount, a.Green/amount, a.Blue/amount));}
		CColor.inc = function( a, amount ){ return CColor.FromRGB(new RGB(a.Red+amount, a.Green+amount, a.Blue+amount));}
		CColor.dcr = function( a, amount ){ return CColor.FromRGB(new RGB(a.Red-amount, a.Green-amount, a.Blue-amount));}
		CColor.cross = function( a, b )
		{
			
			var u = new FVec3(a.Red,a.Green,a.Blue);
			var v = new FVec3(b.Red,b.Green, b.Blue);
			var res = u.cross(v);
			return CColor.FromRGB(new RGB(res.x, res.y, res.z));
		}
		this.Mul = function( amount ){ Red*=amount; Green*=amount;Blue*=amount; return this;}
		this.Add = function( color ){ Red+=color.Red; Green+=color.Green;Blue+= color.Blue; return this; }
		this.Sub = function( color ){ Red-=color.Red; Green-=color.Green;Blue-= color.Blue; return this; }
		this.Div = function( a,amount ){ if(amount<=0)amount=1; Red/=amount; Green/=amount;Blue/=amount; return this;}
		
		/*
		------------------
		COLOR MODIFICATION
		------------------
		*/
		
		CColor.Saturate = function( color, amount = 10)
		{ 
			amount = (amount == 0 )?0:(amount||10);
			var res = new CColor(color);
			res.Hue += amount/100;
			return res;
		}
		CColor.Desaturate = function( color, amount = 10)
		{ 
			amount = (amount == 0 )?0:(amount||10);
			var res = new CColor(color);
			res.Hue -= amount/100;
			return res;
		}
		CColor.Invert = function( color ){ 
			var res = new CColor(color);
			var h = res.Hue > 180 ? res.Hue - 180 : res.Hue + 180;
			res.Hue = h;
			return res;
		}
		CColor.Lighten = function( color, amount = 10 )
		{
			amount = (amount == 0 )?0:(amount||10);
			var hsl = new CColor(color).hsl;
			hsl.l += amount/100;
			return new CColor(hsl);
		}
		CColor.Brighten = function( color, amount=10 )
		{ 
			amount = (amount == 0 )?0:(amount||10);
			var rgb = new CColor(color).rgb;
			var d = Math.round( 255 * -(amount/100));
			rgb.r = ( Math.max(0, Math.min(255, rgb.r - d)));
			rgb.g = ( Math.max(0, Math.min(255, rgb.g - d)));
			rgb.b = ( Math.max(0, Math.min(255, rgb.b - d)));
			
			return new CColor(rgb);
		}
		CColor.Darken = function( color, amount=10 )
		{
			amount = (amount == 0 )?0:(amount|10);
			var hsl = new  CColor(color).hsl;
			hsl.l -= amount/100;
			
			return new CColor(hsl);
		}
		CColor.Greyscale = function( color ){ return CColor.Desaturate( new CColor(color),100);}
		
		// Q - Complement
		CColor.Complement = function( color )
		{
			var hsl = new CColor(color).hsl;
			hsl.h = (hsl.h + 180 ) % 360;
			return new CColor(hsl);
		}
		// P - Tint
		CColor.Tint = function( color, percent= 50)
		{
			var c = CColor.New(color);
			var n = percent * 0.01 * 255;
			return CColor.FromRGB( new RGB( c.Red+n,c.Green+n,c.Blue+n));
		}
		// O - Tone
		CColor.Tone = function( color, percent = 50 )
		{
			var c =  qTypeOf(color,"CColor") ? color : new CColor(color);
			var n = percent * 0.01 * 175;
			return CColor.FromRGB( new RGB( c.Red+n,c.Green+n,c.Blue+n));
		}
		// F - Shade
		CColor.Shade = function( color, percent = 50 )
		{
			var c =  qTypeOf(color,"CColor") ? color : new CColor(color);
			var n = percent * 0.01 * 255;
			return CColor.FromRGB( new RGB( c.Red+n,c.Green+n,c.Blue+n));
		}
		
		CColor.Luminance = function( color )
		{
			var c =  qTypeOf(color,"CColor")?color : new CColor(color);
			return 1;
		}
		/*
		-------------
		COMBINATIONS
		-------------
		*/
		
		CColor.Triad = function( color )
		{
			var hsl = qTypeOf(color,"CColor") ? color.hsl :new CColor(color).hsl, h = hsl.h;			
			return [ new CColor(color), new CColor(new HSL((h+120)%360,hsl.s,hsl.l)), new CColor( new HSL( (h+240) %360,hsl.s,hsl.l))];
			
		}
		CColor.Tetrad = function( color )
		{
			var hsl = qTypeOf(color,"CColor") ? color.hsl :new CColor(color).hsl, h=hsl.h;
			var res =
			[
			  new CColor(hsl),
			  new CColor(new HSL((h+90)%360,hsl.s,hsl.l)),
			  new CColor(new HSL((h+180)%360,hsl.s,hsl.l)),
			  new CColor(new HSL((h+270)%360,hsl.s,hsl.l))
			 ];
			 return res;
		}
		CColor.SplitComplement = function(color )
		{
			var hsl = qTypeOf(color,"CColor") ? color.hsl : new CColor(color).hsl,h=hsl.h;
			var res = 
			[
			 new CColor(hsl),
			 new CColor(new HSL((h+72)%360,hsl.s,hsl.l,hsl.a)),
			 new CColor(new HSL((h+216)%360,hsl.s,hsl.l,hsl.a)),
			 ];
			 return res;
		}
		
		CColor.Analogous = function( color, count = 6, slices = 30 )
		{
			count = count || 6;
			slices= slices||30;
			
			var hsl = new CColor(color).hsl, part = 360/slices, res = [new CColor(hsl)];
			for( hsl.h = ((hsl.h - (part * count >> 1)) + 720) % 360; --count; )
			{
				hsl.h = (hsl.h + part )%360;
				res.push( new CColor(hsl));
			}
			return res;
		}
		
		CColor.Monochromatic = function( color, count = 6 )
		{
			count = count || 6;
			var hsv =  qTypeOf(color,"CColor") ? color.hsv :new CColor( color ).hsv, h=hsv.h, s=hsv.s, v=hsv.v,
			res =[],mod=1/count;
			while( count-- )
			{
				res.push( new CColor( new HSV(h,s,v)));
				v = ( v + mod) % 1;
			}
			return res;
		}
		/*
		-----------------
		UTILITY FUNCTIONS
		-----------------
		*/
		CColor.Readability = function( color1,color2 )
		{
			var c1 = new CColor(color1), c2 = new CColor(color2);
			var r1  = c1.rgb, r2  = c2.rgb;
			var b1 = c1.brightness(), b2 = c2.brightness();
			
			var d = 
			( Math.max(r1.r,r2.r)  - Math.min(r1.r,r2.r) +
			  Math.max(r1.g,r2.g) - Math.min(r1.g,r2.g) +
			  Math.max(r1.b,r2.b)  - Math.min(r1.b,r2.b)
			 );
			 
			 return {brightness:Math.abs(b1-b2),delta};
			
		}
		CColor.IsReadable = function( color1,color2 )
		{
			var rd = CColor.Readability(color1,color2);
			return rd.brightness > 125 && rd.delta > 500;
		}
		
		CColor.MostReadable = function( baseColor,colorList )
		{
			var bestColor;
			var bestScore = 0;
			var bestIsReadable = false;
			
			for( var i = 0; i < colorList.length; i++ )
			{
				var readability = CColor.Readability(baseColor,colorList[i]);
				var bReadable =  CColor.IsReadable(baseColor,colorList[i]);
				var score = 3 * ( readability.brightness / 125) + ( readability.diff / 500 );
				
				if( (bReadable && !bestIsReadable) ||
				  ( bReadable && bestIsReadable && score > bestScore ) ||
				  ( (!bReadable) && (!bestIsReadable) && score > bestScore ))
				  {
					  bestIsReadable = bReadable;
					  bestScore = score;
					  bestColor = new CColor( colorList[i]);
				  }
			}
			return bestColor;
		}
		
		
		/*
		--------------------
		COLOR PRESETS
		--------------------
		*/
		CColor.ValueList = function()
		{
			var res = 		
			[0xF0F8FF,0xFAEBD7,0x00FFFF,0x7FFFD4,0xF0FFFF,0xF5F5DC,0xFFE4C4,0x000000,0xFFEBCD,
			 0x0000FF,0x8A2BE2,0xA52A2A,0xDEB887,0x5F9EA0,0x7FFF00,0xD2691E,0xFF7F50,0x6495ED,
			 0xFFF8DC,0xDC143C,0x00FFFF,0x00008B,0x008B8B,0xB8860B,0xA9A9A9,0x006400,0xBDB76B,
			 0x8B008B,0x556B2F,0xFF8C00,0x9932CC,0x8B0000,0xE9967A,0x8FBC8F,0x483D8B,0x2F4F4F,
			 0x00CED1,0x9400D3,0xFF1493,0x00BFFF,0x696969,0x1E90FF,0xB22222,0xFFFAF0,0x228B22,
			 0xFF00FF,0xDCDCDC,0xF8F8FF,0xFFD700,0xDAA520,0x808080,0x00FF00,0xADFF2F,0xF0FFF0,
			 0xFF69B4,0xCD5C5C,0x4B0082,0xFFFFF0,0xF0E68C,0xE6E6FA,0xFFF0F5,0x7CFC00,0xFFFACD,
			 0xADD8E6,0xF08080,0xE0FFFF,0xFAFAD2,0xD3D3D3,0x90EE90,0xFFB6C1,0xFFA07A,0x20B2AA,
			 0x87CEFA,0x778899,0xB0C4DE,0xFFFFE0,0x00FF00,0x32CD32,0xFAF0E6,0xFF00FF,0x800000,
			 0x66CDAA,0x0000CD,0xBA55D3,0x9370D8,0x3CB371,0x7B68EE,0x00FA9A,0x48D1CC,0xC71585,
			 0x191970,0xF5FFFA,0xFFE4E1,0xFFE4B5,0xFFDEAD,0x000080,0xFDF5E6,0x808000,0x6B8E23,
			 0xFFA500,0xFF4500,0xDA70D6,0xEEE8AA,0x98FB98,0xAFEEEE,0xD87093,0xFFEFD5,0xFFDAB9,
			 0xCD853F,0xFFC0CB,0xDDA0DD,0xB0E0E6,0x800080,0xFF0000,0xBC8F8F,0x4169E1,0x8B4513,
			 0xFA8072,0xF4A460,0x2E8B57,0xFFF5EE,0xA0522D,0xC0C0C0,0x87CEEB,0x6A5ACD,0x708090,
			 0xFFFAFA,0x00FF7F,0x4682B4,0xD2B48C,0x008080,0xD8BFD8,0xFF6347,0x40E0D0,0xEE82EE,
			 0xF5DEB3,0xFFFFFF,0xF5F5F5,0xFFFF00,0x9ACD32];
			
			 return res;
		}
		
		CColor.NameList = function()
		{
			var res =
			["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black",
			 "BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse",
			 "Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan",
			 "DarkGoldenRod","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen",
			 "Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue",
			 "DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGrey",
			 "DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite",
			 "Gold","GoldenRod","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed",
			 "Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon",
			 "LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGrey","LightGreen",
			 "LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGrey","LightSteelBlue",
			 "LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine",
			 "MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue",
			 "MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream",
			 "MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange",
			 "OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed",
			 "PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown",
			 "RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver",
			 "SkyBlue","SlateBlue","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle",
			 "Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

			return res;
		}
		
		CColor.New = function( val = 0,adjustments=null ){ return new CColor(val,adjustments);}

		return CColor;
});