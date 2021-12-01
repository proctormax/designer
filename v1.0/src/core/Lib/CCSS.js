
qPack('UI/Appearance/CCSS.js',(function( exports = {}){
    function CCSS(name='style001',type='default'){
      var _       = {name:name,list:[],type:type};
      _.ie        = '';
      _.edge      = '';
      _.chrome    = '';
      _.opera     = '';
      _.firefox   = '';
      _.safari    = '';
      _.dc        = document.createElement('style');
      _.dc.setAttribute('id',name);
      _.dc.setAttribute('rel','stylesheet');
      _.dc.setAttribute('type','text/css');
      var _this   = this;
      var _atRules        = '';
      var _kfRules        = {};
      var _selectors  = {};
      var _content = '';
      this.DC = function(){ return _.dc;};
      this.At = function(target,rule){
  
      };
      this.AtKeyframes = function(name,rule){
          _kfRules[name] = rule;
          this.RenderKF();
      }
      this.RenderKF = function(){
          
          var res = '',kf,rules,rule;
          for(var k in _kfRules ){        
              kf = _kfRules[k];
              res += "\n@keyframes "+k+'{\n';
              for(var g in kf ){        
                  rules = kf[g];
                  res += '\t'+g+'{\n';
                  for(var r in rules ){
                      res += '\t\t'+r+': '+rules[r]+';\n';
                  }
                  res += '\t'+'}\n';
              }
              res +='}\n';        
          }
  
          _atRules+= (res);
          _this.Render();
      };
      this.Import = function( ){
  
      }
      this.RenderItem = function(selector,css){
          _content[selector] = css.ToString();
      };
      this.SetContent = function(content){
          _content = content;
          _.dc.innerHTML = _content;
           return this;
      };
      this.Clear = function(){
          return _this.SetContent('');
      };
      this.Render = function( clear = false ){
          if(clear) _this.Clear();
          var res = "\n";
          for(var s in _selectors ){        
              res +=(s+'{\n');        
              for(var line in _selectors[s] )        
                  res += '\t'+line+': '+_selectors[s][line]+';\n';
              res +='}\n';        
          }
          return this.SetContent(_atRules+res);
      }
      this.Add = function( selector, css ){
          _selectors[selector] = css;
          //css.Changed.Add(this.RenderItem);
          return _this.Render();        
      };
  
      this.AddStyle = function( id, widget ){
          widget.DC().removeAttribute('style');
          var style = widget.css;
          this.Add( id, style.Rule('default'));
          this.Add( id+':active', style.Rule('active'));
          this.Add( id+':hover', style.Rule('hover'));
          return this;
      };
  
  
  
  
      /*
          CSSImage:[url,repeat,repeatx,repeaty, position:x,y, size:cover,contain]
          CSSFont:
          CSSBox:[rect:l,r,t,b  size:w,h, radius:r0,r1,r2,r3,r4, padding:p0,p1,p2,p3,p4, margin:m0, m1, m2, m3, m4]
  
          var css = new CCSS('font');
          var font = new CSSFont();
  
          css.Add(font);
          css.Add(box);
          css.Add(shadow);
          css.Add(display);
          css.DOM.Get('display');
          css.AddLine('background-color:rgba(200,200,200,0.3);');
          css.AddComment('Background Style:');
  
          CPadding:
          this.SetPadding = function(n,unit){};
          this.SetPaddingTop = function(n,unit){};
          this.SetPaddingBottom = function(n,unit){};
          this.SetPaddingLeft = function(n,unit){};
          this.SetPaddingRight = function(n,unit){};
          this.SetPaddingHorizontal = function(n,unit){};
          this.SetPaddingVertical = function(n,unit){};
  
          CMargin:
          this.SetMargin = function(n,unit){};
          this.SetMarginTop = function(n,unit){};
          this.SetMarginBottom = function(n,unit){};
          this.SetMarginLeft = function(n,unit){};
          this.SetMarginRight = function(n,unit){};
          this.SetMarginHorizontal = function(n,unit){};
          this.SetMarginVertical = function(n,unit){};
  
          CRadius:
          this.SetRadius = function(n,unit){};
          this.SetRadiusTop = function(n,unit){};
          this.SetRadiusBottom = function(n,unit){};
          this.SetRadiusLeft = function(n,unit){};
          this.SetRadiusRight = function(n,unit){};
          this.SetRadiusTopLeft = function(n,unit){};
          this.SetRadiusBottomLeft = function(n,unit){};
          this.SetRadiusTopRight = function(n,unit){};
          this.SetRadiusBottomRight = function(n,unit){};
  
          css.SetBorderBottomWidth(30);
          css.SetBorderTopStyle(CSSBorderStyle.SOLID);
  
          css.AddBoxShadow(boxshadow1)
          css.AddBoxShadow(boxshadow2)
          css.AddBoxShadow(boxshadow3)
  
          css.SetState(CssState.HOVER);
          css.SetSelector('last-child');
      */
      this.State = function(){ return _.state;};
      this.SetState = function(state){
        _.state = state;
      };
      this.Selector = function(){ return _.selector; };
      this.SetSelector = function(selector){
        _.selector = selector;
      };
      this.Selectors = function(){ return _.selector; };
      this.SetSelectors = function(selector){
        _.selectors = selectors;
      };
    
      this.Info = function(){
        return _.list.toString();
      };
      this.Has = function(item){
        return _.list.indexOf(item) >= 0;
      };
      this.Append = function(line){
        _.list.push(line);
      };
      this.Set = function( prop, value ){};
      this.SetType = function( type ){ _.type = type; };
      this.Type = function(){ return _.type; };
  
    };
    var _styles = {};
    CCSS.New = function(name='style001',enabled=true ){
        var res = new CCSS(name);
        _styles[name] = {css:res, enabled:enabled};
        return res;
    };
    var _renderTarget = document.head;
    CCSS.RenderStyles = function( ){
        for( var i in _styles )
       if(_styles[i].enabled )
          if( _renderTarget ) _renderTarget.appendChild( _styles[i].css.DC() );
    }
    CCSS.SetRenderTarget = function( target ){
        _renderTarget = target;
        CCSS.RenderStyles();
    };
    CCSS.Type = {
      DEFAULT:'default',
      ACTIVE:'active:',
      FOCUS:'focus:',
      BEFORE:'before:',
      AFTER:'after:'
    };
    CCSS.Selector = {
      First:'first:',
      Last:'last:',
      LastChild:'last-child:',
      FirstOfKind:'first:'
    };
    CCSS.$ = function(t){
      if(t===null){ alert('target must be an instance of a class'); return;};
      return (
        t.constructor.name ==='Object'? t:
        typeof t.ui === "object" ?  t.ui:
        typeof t.DC ==='function'? t.DC():
        typeof t.UI ==='function'? t.UI():
        typeof t==='string'? document.querySelector(t):t
        );
    };
    /***
        FILL & STROKE
    */
    
    CCSS.Set           = function(target,prop,val ){ CCSS.$(target).style[prop]=val;};
    CCSS.Get           = function(target,prop){return CCSS.$(target).style[prop];};
    
    CCSS.GetFill       = function(target){ return CCSS.$(target).style.backgroundColor;};
    CCSS.SetFill       = function( target, fill ){ CCSS.$(target).style.background = fill;};
    CCSS.GetImageFill  = function(target){return CCSS.$(target).style.backgroundImage;}
    CCSS.SetImageFill  = function(target,url){CCSS.$(target).style.backgroundImage = "url("+url+")";};
    CCSS.SetBgPos      = function(target,pos,unit='px'){CCSS.$(target).style.backgroundPosition = pos[0]+unit+" "+pos[1]+unit;};
    /***
        STROKE
    */
    CCSS.GetStroke     = function(target){ return CCSS.$(target).style.border;};
    CCSS.SetStroke     = function( target, stroke ){CCSS.$(target).style.border = stroke;};
    
    CCSS.GetStrokeFill = function(t){ return CCSS.$(target).style.borderColor;};
    CCSS.SetStrokeFill = function( t, fill ){CCSS.$(target).style.borderColor = fill;};
    
    CCSS.GetStrokeStyle= function( target){ return CCSS.$(target).style.borderStyle;};
    CCSS.SetStrokeStyle= function( target, val ){CCSS.$(target).style.borderStyle = val;};
    
    CCSS.GetStrokeWidth= function(target){var t=CCSS.$(target); return Unpix(t.style.borderWidth);};
    CCSS.SetStrokeWidth= function( target, val, unit='px' ){CCSS.$(target).style.borderWidth = val+unit;};
    /***
        TEXT
    */
    CCSS.GetColor      = function(target){ return CCSS.$(target).style.color;};
    CCSS.SetColor      = function( target, val ){CCSS.$(target).style.color = val;};
    
    /***
        TEXT
    */
    CCSS.GetFontColor  = function(target){ CCSS.$(target).style.color;};
    CCSS.SetFontColor  = function( target, val ){CCSS.$(target).style.color = val;};
    /***
        FONT
    */
    CCSS.GetFont       = function(target){ CCSS.$(target).style.fontFamily;};
    CCSS.SetFont       = function( target, val ){CCSS.$(target).style.fontFamily = val;};
    CCSS.GetFontSize   = function(target){CCSS.$(target).style.fontSize;};
    CCSS.SetFontSize   = function( target, val, unit='px' ){CCSS.$(target).style.fontSize = val + unit;};
    CCSS.ToggleVisible = function(target){
        CCSS.$(target).style.visibility =
        CCSS.$(target).visibility === "visible"  ?"hidden":"visible";
    };
    CCSS.GetVisibility = function(target){CCSS.$(target).style.visibility;};
    CCSS.SetVisible    = function(target,b){CCSS.$(target).style.visibility = b ?"visible":"hidden";};
    CCSS.Is            = function(target,tagname){return CCSS.$(target).classList.contains(tagname);};
    CCSS.Add           = function(target,classList, bAdd=true){
        classList     = classList.split(" ");
        if(classList.length==0) return;
        if(bAdd)
            for(var i =0;i<classList.length;i++){
                if( classList[i].length){
                    if(CCSS.$(target) )
                        CCSS.$(target).classList.add(classList[i]);
                    else
                        target.classList.add(classList[i]);
                }
            }
        else
            for(var i =0;i<classList.length;i++){
                if( classList[i].length){
                    if(CCSS.$(target))
                        CCSS.$(target).classList.remove(classList[i]);
                    else
                        target.classList.remove(classList[i]);
                }
    
            }
        return target;
    };
    CCSS.Has           = function(target,c){return CCSS.$(target).classList.contains(c);};
    CCSS.Remove        = function(target, cls) {
      cls             = cls.split(' ');
      for (var i = 0; i < cls.length; i++)
        if (cls[i].length > 0 && CCSS.$(target).classList.contains(cls[i]))
          CCSS.$(target).classList.remove(cls[i]);
    };
    
    CCSS.Toggle = function(target, cls) {
      cls = cls.split(' ');
      for (var i = 0; i < cls.length; i++) {
        if (cls[i].length < 1) continue;
        if (!CCSS.$(target).classList.contains(cls[i])) CCSS.$(target).classList.add(cls[i]);
        else CCSS.$(target).classList.remove(cls[i]);
      }
    };
    CCSS.Switch = function(t,cA,cB){
        CCSS.Remove(t,cA);
        CCSS.Add(t,cB);
    };

    exports.CCSS = CCSS;
       return CCSS;
  }));