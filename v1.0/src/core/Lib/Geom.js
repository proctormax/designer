qPack("Geom",function ( exports = {} ){

   Lib.CMath.ExportTo(this);
  
    const DOM = QB.qDOM;
    const CCSS = qRequire("UI/Appearance/CCSS.js");

    
    // console.error("@Geom:WARNING :---------", Object.keys(Lib) ,"--------------");
    //Lib.CMath.ExportTo(this);

    function After( seconds, callback, args=null ){

      if( typeof callback !== "function" ) throw new Error("callback must be a function");

      var id = setTimeout(()=>{

        if( args && args.length ) callback.apply(null,args);

        else callback();

        clearTimeout(id);

      },seconds*1000);

    }

    exports.After = After;
    window.qAfter = After;
    

    function Every( seconds, unlessCallback, callback, args=null ){

      if( typeof unlessCallback !== "function" ) throw new Error("unlessCallback must be a function");

      if( typeof callback !== "function" ) throw new Error("callback must be a function");

      var id = setInterval(()=>{

        if( args && args.length ) callback.apply(this,args);

        else callback();

        if( unlessCallback() === true) clearInterval(id);

      },seconds*1000);

    }

    exports.Every = Every;
    window.qEvery = Every;

    // CCSS FUNCTIONS

    function Unpix(t){ return parseFloat(String(t).replace(/(%|[a-z])/i,'')); }

    function Pix(t,unit="px"){ return t+unit;}
    exports.Pix = Pix;
    // -------------------------------------------

    let ForeEach = function(t, callback, args = null, index = 0) {

      var ar = DOM.Get.All(t);

      for (var i = 0; i < ar.length; i++) {

        if (args) {

          args[index] = ar[i];

          callback.apply(this, args);

        } else {

          callback(ar[i]);

        }

      }

      delete ar;

    }

    // GEOMETRIC FUNCTIONS

    let Geom = function(){};

    const qFloat = parseFloat;

    Geom.Resize = function( t, w,h ,unit="px"){

        var t=CCSS.$(target);

        t.style.height= w+unit;

        t.style.width = h+unit;

        return t;

    };

    var 

    GetStyle          = function(dc,property){ 

      return window.getComputedStyle(dc).getPropertyValue(property).replace('px','');

    }

    Geom.GetRect      = function( item, bounded = false ){

      var dc          = item.DC();

      var r           = dc.getBoundingClientRect();

      r               = [r.left, r.top, r.width, r.height, r.right, r.bottom];

      var size  		  = [r[0],r[1]];

      var boxSign 	  = GetStyle(dc,'box-sizing').indexOf('border-box') >= 0 ?0:1;

      var border		  = {};

      border.top 		  = qFloat(GetStyle(dc,'border-top-width'));

      border.bottom   = qFloat(GetStyle(dc,'border-bottom-width'));

      border.left 	  = qFloat(GetStyle(dc,'border-left-width'));

      border.right 	  = qFloat(GetStyle(dc,'border-right-width'));

      var 

      outlineWidth    = qFloat(GetStyle(dc,'outline-width'));

      var 

      outlineOffset   = qMax(0,qFloat(GetStyle(dc,'outline-offset')));

      var padding		  = {};

      padding.top 	  = qFloat(GetStyle(dc,'padding-top'));

      padding.bottom 	= qFloat(GetStyle(dc,'padding-bottom'));

      padding.left 	  = qFloat(GetStyle(dc,'padding-left'));

      padding.right 	= qFloat(GetStyle(dc,'padding-right'));

      r[0]           += 

      (border.left    * boxSign + border.right * boxSign) +

      (outlineWidth   * 2 + outlineOffset * 2) + 

      (padding.left   + padding.right);

      r[1]           += 

      (border.top 	  * boxSign + border.bottom * boxSign )+ 

      (outlineWidth 	* 2 + outlineOffset * 2)+

      (padding.top 	  + padding.bottom);

      // -------------- BOUNDED ---------------

      if( bounded ){

        var margin		= {};

        margin.top 	  = qFloat(GetStyle(dc,'margin-top'));

        margin.bottom = qFloat(GetStyle(dc,'margin-bottom'));

        margin.left 	= qFloat(GetStyle(dc,'margin-left'));

        margin.right 	= qFloat(GetStyle(dc,'margin-right'));

        r[0]         += (margin.left    + margin.right);

        r[1]         += (margin.top 	  + margin.bottom);

    }

      return r;

    };

    /***

        RECT

    */

    Geom.GetRectOld = function( target, fromStyle=false, asRect=false ){

        var g =CCSS.$(target)?CCSS.$(target):target;

        if( fromStyle ){

            var t     = g.style;

            return [Unpix(t.left),Unpix(t.top),Unpix(t.width),Unpix(t.height),Unpix(t.right),Unpix(t.bottom)];

        }else{

            var r = g.getBoundingClientRect();

            return asRect?r:[r.left, r.top, r.width, r.height, r.right, r.bottom];

        }

    };

    Geom.SetRect = function(t,rect,unit="px"){

        Geom.SetPos(t,[rect[0],rect[1]],unit);

        Geom.SetSize(t,[rect[2],rect[3]],unit);

    };

    Geom.GetBoundTotal = function(childList,lPad=1,rPad=1,tPad=1,bPad=1){

     var len = childList.length;

      if( len < 1 ) return;

      var R = Geom.GetRect(childList[0]);

      for( var i=1; i<len;i++){

        var r = Geom.GetRect(childList[i]);

        R[0] = qMin(R[0],r[0]);

        R[1] = qMin(R[1],r[1]);

        R[2] = qMax(R[2],r[2]);

        R[3] = qMax(R[3],r[3]);

        R[4] = qMax(R[4],r[4]);

        R[5] = qMax(R[5],r[5]);

      }

      return [R[0]-lPad*2,R[1]-tPad*2,R[4]-R[0]+rPad+lPad,R[5]-R[1]+tPad+bPad];

    };

    /***

        POSITION

    */

    Geom.GetPos = function(t,fromStyle=false){

      var

        r = Geom.GetRect(t,fromStyle),

        x = r[0],

        y = r[1];

        return [x,y];

    };

    Geom.SetPos = function(target,pos ,unit="px"){

        var t=CCSS.$(target);

        t.style.left  = pos[0]+unit;

        t.style.top   = pos[1]+unit;

        return t;

    };

    Geom.IncPos = function( target, pos, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetPos(t,fromStyle);

        t.style.left = (p[0] +pos[0])+unit;

        t.style.top  = (p[1] +pos[1])+unit;

        return t;

    };

    Geom.ScalePos = function( target, pos, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetPos(t,fromStyle);

        t.style.left = (p[0] *pos[0])+unit;

        t.style.top  = (p[1] *pos[1])+unit;

        return t;

    };

    var p;

    Geom.Move = function(t, p1,p2 ,unit="px"){

        var t=CCSS.$(target);

        if(!p) p = Geom.GetPos(t);

        p[0] = p1[0] - p[0];

        p[1] = p1[1] - p[1];

        var pos = [p2[0]-p[0],p2[1]-p[1]];

        t.style.left  = p[0]+unit;

        t.style.top   = p[1]+unit;

        return t;

    };

    /***

        X

    */

    Geom.GetX = function(t,fromStyle=false){

      return Geom.GetPos(t,fromStyle)[0];

    };

    Geom.SetX = function( target, n, unit="px"){

        var t=CCSS.$(target);

        t.style.left= (n)+unit;

        return t;

    };

    Geom.IncX = function( target, n, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetPos(t,fromStyle);

        t.style.left= (p[0] +n)+unit;

        return t;

    };

    Geom.ScaleX = function( target, n, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetPos(t,fromStyle);

        t.style.left= (p[0]*n)+unit;

        return t;

    };

    /***

        Y

    */

    Geom.GetY = function(target,fromStyle=false){

      return Geom.GetPos(target,fromStyle)[1];

    };

    Geom.SetY = function( target, n, unit="px"){

        CCSS.$(target).style.top= (n)+unit;

    };

    Geom.IncY = function( target, n, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetPos(t,fromStyle);

        t.style.top= (p[1] +n)+unit;

        return t;

    };

    Geom.ScaleY = function( target, n, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetPos(t,fromStyle);

        t.style.left= (p[1]*n)+unit;

        return t;

    };

    /***

        SIZE

    */

    Geom.GetSize = function(t,fromStyle=false){

        var s = Geom.GetRect(t,fromStyle);

        return [s[2],s[3]];

    };

    Geom.SetSize = function( target, size, unit="px",centered=false){

        var t=CCSS.$(target);

        if(centered){

          t.style.left= (Geom.GetX(t)-size[0]*0.5)+unit;

          t.style.top= (Geom.GetY(t)-size[1]*0.5)+unit;

        }

        t.style.width = (size[0])+unit;

        t.style.height= (size[1])+unit;

        return t;

    };

    Geom.IncSize = function( target, size, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetSize(t,fromStyle);

        t.style.width = (p[0] +size[0])+unit;

        t.style.height= (p[1] +size[1])+unit;

        return t;

    };

    Geom.ScaleSize = function( target, size, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetSize(t,fromStyle);

        t.style.width = (p[0] *size[0])+unit;

        t.style.height= (p[1] *size[1])+unit;

        return t;

    };

    Geom.GetSizeTotal = function(widgetList){

        var r=[0,0];

        for( var i=0;i<widgetList.length;i++){

            var size = Geom.GetSize(widgetList[i]);

            r[0] += size[0];

            r[1] += size[1];

        }

        return r;

    };

    Geom.RESIZE_EAST        = 0x1001;

    Geom.RESIZE_WEST        = 0x1002;

    Geom.RESIZE_NORTH       = 0x1003;

    Geom.RESIZE_SOUTH       = 0x1004;

    Geom.RESIZE_NORTH_EAST  = 0x1005;

    Geom.RESIZE_NORTH_WEST  = 0x1006;

    Geom.RESIZE_SOUTH_EAST  = 0x1007;

    Geom.RESIZE_SOUTH_WEST  = 0x1008;

    Geom.Resize = function( target, orientation,value,value2=0 ){

        var r = Geom.GetRect(target);

        switch(orientation){

            case Geom.RESIZE_EAST:

            r[0]+= value;

            r[2]-= value;

            break;

            case Geom.RESIZE_WEST:

            r[2]+= value;

            break;

            case Geom.RESIZE_SOUTH:

            r[3]+= value;

            break;

            case Geom.RESIZE_NORTH:

            r[1]-= value;

            r[3]+= value;

            break;

            case Geom.RESIZE_NORTH_EAST:

            r[1]+= value2;

            r[3]-= value2;

            r[0]+= value;

            r[2]-= value;

            break;

            case Geom.RESIZE_NORTH_WEST:

            r[1]+= value2;

            r[3]-= value2;

            r[2]-= value;

            break;

            case Geom.RESIZE_SOUTH_EAST:

            r[1]+= value2;

            r[0]+= value;

            r[2]-= value;

            break;

            case Geom.RESIZE_SOUTH_WEST:

            r[3]-= value2;

            r[2]-= value;

            break;

        }

        Geom.SetRect(target,r);

    };

    /***

        WIDTH

    */

    Geom.GetWidth = function(t,fromStyle=false){

        return Geom.GetSize(t,fromStyle)[0];

    };

    Geom.SetWidth = function( target, n, unit="px",centered=false){

        var t=CCSS.$(target);

        if(centered){

          t.style.left= (Geom.GetX(t)-n*0.5)+unit;

        }

        t.style.width= (n)+unit;

        return t;

    };

    Geom.IncWidth = function( target, n, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetSize(t,fromStyle);

        t.style.width = (p[0] + n)+unit;

        return t;

    };

    Geom.ScaleWidth = function( target, n, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetSize(t,fromStyle);

        t.style.width = (p[0] * n)+unit;

        return t;

    };

    /***

        HEIGHT

    */

    Geom.GetHeight = function(t,fromStyle=false){

        return Geom.GetSize(t,fromStyle)[1];

    };

    Geom.SetHeight = function( target, n, unit="px",centered=false){

        var t=CCSS.$(target);

        if(centered){

          t.style.top= (Geom.GetY(t)-n*0.5)+unit;

        }

        t.style.height= (n)+unit;

        return t;

    };

    Geom.IncHeight = function( target, n, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetSize(t,fromStyle);

        t.style.height= (p[1] +n)+unit;

        return t;

    };

    Geom.ScaleHeight = function( target, n, unit="px",fromStyle=false){

        var t=CCSS.$(target);

        var p = Geom.GetSize(t,fromStyle);

        t.style.height = (p[1] * n)+unit;

        return t;

    };

    Geom.PutLeft= function( target,x,unit="px"){

        var r   = Geom.GetRect(target);

        var n   = r[0] + r[2];

        r[0]    = x;

        r[2]    = n - r[0];

        Geom.SetRect(target,r,unit);

    };

    Geom.PutRight = function( target,n,unit="px"){

        var r   = Geom.GetRect(target);

        //r[0]    = n - r[0];

        r[2]    = n - r[0];

        Geom.SetRect(target,r,unit);

    };

    Geom.PutTop = function( target,t,unit="px"){

        var r   = Geom.GetRect(target);

        var n   = r[1] + r[3];

        r[1]    = t;

        r[3]    = n - t;

        Geom.SetRect(target,r);

    };

    Geom.PutBottom = function( target,b,unit="px"){

        var r   = Geom.GetRect(target);

        Geom.SetHeight(target,b-r[1],unit);

    };

    /***

        RADIUS

    */

    Geom.GetRadius = function(target){

        var r =[];

        var s = CCSS.$(target)?CCSS.$(target).style:target.style;

        r[0] = Int(s.borderTopLeftRadius||0);

        r[1] = Int(s.borderTopRightRadius||0);

        r[2] = Int(s.borderBottomRightRadius||0);

        r[3] = Int(s.borderBottomLeftRadius||0);

        return r;

    };

    Geom.SetRadius = function(target,r,unit='px'){

        var t=CCSS.$(target);

        t.style.borderTopLeftRadius       = r[0] + unit;

        t.style.borderTopRightRadius      = r[1] + unit;

        t.style.borderBottomRightRadius   = r[2] + unit;

        t.style.borderBottomLeftRadius    = r[3] + unit;

    };

    Geom.IncRadius = function(t,n,unit='px'){

        var r = Geom.GetRadius(t);

        r[0] += n;r[1] += n;r[2] += n;r[3] += n;

        Geom.SetRadius(t,r,unit);

    };

    Geom.ScaleRadius = function(t,n,unit='px'){

        var r = Geom.GetRadius(t);

        r[0] *= n;r[1] *= n;r[2] *= n;r[3] *= n;

        Geom.SetRadius(t,r,unit);

    };

    Geom.GetRadiusX = function(t,x){

        var r = Geom.GetRadius(t);

        return x>3?null:r[x];

    };

    Geom.SetRadiusX = function(target,x,n,unit='px'){

        if(x>3) return false;

        var t=CCSS.$(target);

        var radii = [ 'borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius'];

        t.style[radii[x]] = n + unit;

        return t;

    };

    Geom.IncRadiusX = function(target,x,n,unit='px'){

        if(x>3) return false;

        var t=CCSS.$(target);

        var radii = [ 'borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius'];

        var r = Unpix(t.style[radii[x]]);

        t.style[radii[x]] = Pix(r+n);

        return t;

    };

    Geom.SetDraggable = function(axis,target,handle=null,parent=document,button=0,region=null){

        var

        old       = [0,0],

        pos       = [0,0],

        delta     = [0,0],

        tPos      = [0,0],

        bPressed  = false,

        enabled   = axis >= 0,

        bUseHandle= handle !== null && handle.constructor !== null;

        if(handle === null) handle = target;

        if( axis>=0 ){

            if( bUseHandle ){

              CCSS.$(handle).addEventListener("mouseover",_Enable,true);

              CCSS.$(handle).addEventListener("mouseout",_Disable,true);

            }else{

              CCSS.$(target).addEventListener("mousedown",_InitDrag,true);

            }

            CCSS.$(parent).addEventListener("mousemove",_StartDrag,true);

            CCSS.$(parent).addEventListener("mouseup",_EndDrag,true);

        }else{

            CCSS.$(target).removeEventListener("mousedown",_InitDrag);

            CCSS.$(parent).removeEventListener("mousemove",_StartDrag);

            CCSS.$(parent).removeEventListener("mouseup",_EndDrag);

        }

        function _Enable(e){

            CCSS.$(parent).addEventListener("mousedown",_InitDrag,true);

        };

        function _Disable(e){

            CCSS.$(parent).removeEventListener("mousedown",_InitDrag,true);

        };

        function _InitDrag(e){

            tPos = Geom.GetPos(target);

            old[0] = e.clientX // - tPos[0];

            old[1] = e.clientY // - tPos[1];

            bPressed= e.button === button && enabled;

        };

        function _StartDrag(e){

           if(!bPressed) return;

           delta[0] = tPos[0] - e.x - old[0];

           delta[1] = tPos[1] - e.y - old[1];

            pos[0] = delta[0];

            pos[1] = delta[1];

            switch (axis) {

              case 0:

                if(!e.altKey)Geom.SetX(target,pos[0]);

                break;

              case 1:

                if(!e.ctrlKey)Geom.SetY(target,pos[1]);

                break;

              default:

            //    Geom.SetPos(target,[pos[0]-old[0],pos[1]-old[1]]);

                if(!e.altKey)Geom.SetX(target,pos[0]);

                if(!e.ctrlKey)Geom.SetY(target,pos[1]);

            }

        }

        function _EndDrag(e){

           if(!bPressed) return;

            bPressed = false;

            pos[0] = e.clientX;

            pos[1] = e.clientY;

        }

    };

    /////////////// ALIGNMENTS /////////////////

    //---------- Horizontal ------------------//

    // Left   | Left_Center   | Left_Right    //

    // Center | Center_Left   | Center_Right  // 

    // Right  | Right_Left    | Right_Center  //

    //---------- Vertical --------------------//

    // Top    | Top_Middle    | Top_Bottom    //

    // Middle | Middle_Top    | Middle_Bottom //

    // Bottom | Bottom_Middle | Bottom_Top    //

    ////////////////////////////////////////////

    Geom.ALIGN_LL = 0x01;

    Geom.ALIGN_LC = 0x02;

    Geom.ALIGN_LR = 0x03;

    Geom.ALIGN_CC = 0x04;

    Geom.ALIGN_CL = 0x05;

    Geom.ALIGN_CR = 0x06;

    Geom.ALIGN_RL = 0x07;

    Geom.ALIGN_RC = 0x08;

    Geom.ALIGN_RR = 0x09;

    Geom.ALIGN_TT = 0x10;

    Geom.ALIGN_TM = 0x11;

    Geom.ALIGN_TB = 0x12;

    Geom.ALIGN_MM = 0x13;

    Geom.ALIGN_MT = 0x14;

    Geom.ALIGN_MB = 0x15;

    Geom.ALIGN_BT = 0x16;

    Geom.ALIGN_BM = 0x17;

    Geom.ALIGN_BB = 0x18;

    Geom.ALIGN_CM = 0x19;

    Geom.Align     = function(a,b,alignment){

        var r1 = Geom.GetRect(a),r2=Geom.GetRect(b),x = r1[0],y = r1[1];

        switch(alignment){

            case Geom.ALIGN_LL: x = r2[0]; break;

            case Geom.ALIGN_LC: x = r2[0] + r2[2]/2; break;

            case Geom.ALIGN_LR: x = r2[0] + r2[2];break;

            case Geom.ALIGN_CC: x = r2[0] + r2[2]/2 - r1[2]/2; break;

            case Geom.ALIGN_CL: x = r2[0] - r1[2]/2; break;

            case Geom.ALIGN_CR: x = r2[0] + r2[2] - r1[2]/2; break;

            case Geom.ALIGN_RR: x = r2[0] + r2[2] - r1[2]; break;

            case Geom.ALIGN_RC: x = r2[0] - r1[2] + r2[2]/2; break;

            case Geom.ALIGN_RL: x = r2[0] - r1[2];break;

            case Geom.ALIGN_TT: y = r2[1]; break;

            case Geom.ALIGN_TM: y = r2[1] + r2[3]/2; break;

            case Geom.ALIGN_TB: y = r2[1] + r2[3];break;

            case Geom.ALIGN_CM:

            x = r2[0] + r2[2]/2 - r1[2]/2;

            y = r2[1] + r2[3]/2 - r1[3]/2;

            break;

            case Geom.ALIGN_MM: y = r2[1] + r2[3]/2 - r1[3]/2; break;

            case Geom.ALIGN_MT: y = r2[1] - r1[3]/2; break;

            case Geom.ALIGN_MB: y = r2[1] + r2[3] - r1[3]/2; break;

            case Geom.ALIGN_BB: y = r2[1] + r2[3] - r1[3]; break;

            case Geom.ALIGN_BM: y = r2[1] - r1[3] + r2[3]/2; break;

            case Geom.ALIGN_BT: y = r2[1] - r1[3];break;

        }

        if(alignment === Geom.ALIGN_CM){

          Geom.SetX(a,x);

          Geom.SetY(a,y);

          return;

        }

        if(alignment <= Geom.ALIGN_RR)Geom.SetX(a,x);

        if(alignment >= Geom.ALIGN_TT)Geom.SetY(a,y);

    };

    Geom.ALIGN_TO_LAST          = 00;

    Geom.ALIGN_TO_FIRST         = 01;

    Geom.ALIGN_TO_BIGGEST       = 02;

    Geom.ALIGN_TO_SMALLEST      = 03;

    Geom.ALIGN_TO_NEIGHBOR      = 04;

    Geom.ALIGN_TO_PAGE          = 05;

    Geom.AlignList = function(list,alignment,target){

      if(list.length<2)return;

      var t,i=0;

      switch (target) {

        case Geom.ALIGN_TO_LAST:

          t = list[list.length-1];

          for( i=0; i<list.length-1;i++) Geom.Align(list[i],t,alignment);

          return true;

        case Geom.ALIGN_TO_FIRST:

          t = list[0];

          for( i=1; i<list.length;i++) Geom.Align(list[i],t,alignment);

          return true;

        case Geom.ALIGN_TO_NEIGHBOR:

          for( i=0; i<list.length-1;i++){

            t = list[i];

            Geom.Align(list[i+1],t,alignment);

          }

          return true;

        default:

          for( var i=0; i<list.length;i++) Geom.Align(list[i],list[list.length-1],alignment);

      }

    };

    Geom.AlignForEach = function(list,callback){

      for( var i=0;i<list.length;i++){

        callback(list[i]);

      }

    };

    Geom.DISTRIBUTE_H_LEFT     = 01;

    Geom.DISTRIBUTE_H_CENTER   = 02;

    Geom.DISTRIBUTE_H_RIGHT    = 03;

    Geom.DISTRIBUTE_V_TOP      = 04;

    Geom.DISTRIBUTE_V_MIDDLE   = 05;

    Geom.DISTRIBUTE_V_BOTTOM   = 06;

    /***

    * Distribute items horizontally or vertically along the length

    * @param list:WidgetList - A list of items to distribute horizontally

    * @param width:Integer - The width alongside which the items should be distributed.

    */

    Geom.Distribute = function(list,distribution){

    };

    Geom.SPACE_H_TO_LENGTH    = 02;

    Geom.SPACE_V_TO_LENGTH    = 03;

    Geom.SPACE_H_TO_DISTANCE  = 04;

    Geom.SPACE_V_TO_DISTANCE  = 05;

    Geom.SPACE_TO_LENGTH      = 06;

    Geom.SPACE_TO_DISTANCE    = 07;

    /*

    * @method SpaceItems

    * Spaces items horizontally or vertically based on the $length. If $length in not provided

    * The distance between furthest items will be used.

    * @parm $list - The list of items to space.

    * @param $spacingMode - The SpacingMode option to use.

    * @param $length - The length to use as the total distance range.

    */

    Geom.SpaceItems = function(list,spacingMode,length=-1){

        var

        rects =[],nTotalLength=0,gap,pos=0;

        if( spacingMode === Geom.SPACE_HORIZONTALLY ){

          for(var i=0;i< list.length;i++){ nTotalLength += Geom.GetWidth(list[i]); }

          if( nTotalLength >= length ) return;

          gap = (length - nTotalLength)/(list.length+1);

          pos=0;

          for(i=0;i<list.length;i++){

            var t = list[i];

            pos+= (gap+ Geom.GetWidth(t));

            Geom.SetX(t,pos);

          }

        }else{

          for(var i=0;i< list.length;i++){

            nTotalLength  += Geom.GetHeight(list[i]);

          }

          if( nTotalLength  >= length ) return;

          gap = (length - nTotalLength )/(list.length+1);

          pos=0;

          for(i=0;i<list.length;i++){

            var t = list[i];

            pos+= (gap+ Geom.GetHeight(t));

            Geom.SetY(t,pos);

          }

        }

    };

    // console.warn("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< @Geom", Object.keys( Geom ));

    exports.Geom = Geom;


    return Geom;

   });