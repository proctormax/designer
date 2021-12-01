qPack("UI.Container.CActionBar",function(){
    const CWidget = qRequire('CWidget');
    const CRect = qRequire('CRect');
    const CCSS = qRequire('CCSS');
    const Geom = qRequire('Geom');

    const CColorSwatch = qRequire('CColorSwatch');
   
    CCSS.New('CActionBar')
    .Add(`.CActionBar`,{
        "position":"absolute !important",
        "display":"block !important",
        "background-color": CColorSwatch.MID_DARK_GRAY
    })
    .Add(`.CActionBar > div`,{
        "box-sizing":"border-box",
    })
    .Add(`.CActionBar.horizontal`,{
        "position":"absolute",
        "left":"0",
        "top":"0",
    })
    .Add(`.CActionBar.horizontal > .CFirstItem`,{
        "position":"absolute",
        "left":"0",
        "top":"0",
    })
    .Add(`.CActionBar.horizontal > .CLastItem`,{
        "position":"absolute",
        "right":"0",
        "top":"0",
    })
    
    .Add(`.CActionBar.vertical > .CFirstItem`,{
        "position":"absolute",
        "left":"0",
        "top":"0",
    })
    .Add(`.CActionBar.vertical > .CLastItem`,{
        "position":"absolute",
        "left":"0",
        "bottom":"0",
    })
    .Add('.test-tab:before',{
      'border-bottom':'solid 100% dogderblue',
      'border-left':'solid 0 transparent',
      'border-right':'solid 20px transparent',
      'height':'0',
      'width':'100%',
      'content':"",
      'display':'block',
      'display':'absolute',
      'bottom':'0',
      'left':'0',
    })
    .Add('.test-tab',{
      'position':'relative',
      'overflow':'hidden',
      'border-color':'dodgerblue'
    });

    function CActionBar( orientation = "horizontal", size = null ){
        qExtend(this, CWidget,'div','CActionBar '+ orientation);
        let _this = this;
        let _field = {
            orientation:"String",
            corners:"Array",
            firstItem:"CWidget",
            lastItem:"CWidget",
            width:"Number",
            height:"Number",
        };

        INIT_PROPERTIES(this,_field);

        this.UpdateWidth = function(width ){
            Geom.SetWidth(_this,width);
        };
        this.UpdateHeight = function(height ){
            Geom.SetHeight(_this,height);
        };

        this.Init = function( ){
            _field.orientation = orientation;
            _field.corners = [];

            _field.firstItem = CWidget.New('div','CFirstItem');
            _field.lastItem = CWidget.New('div','CLastItem');

            this.AddChild( _field.firstItem );
            this.AddChild( _field.lastItem );

            this.WidthChanged.Add( this.UpdateWidth );
            this.HeightChanged.Add( this.UpdateHeight );

            if( size ){ 
                this.SetHeight( size.Height() );
                this.SetWidth( size.Width() );
            }
        };

        this.Init();

        this.Transpose   = function( ){
            var tmpLen   = this.Width();
            var tmpFirst = this.FirstItem();
            var tmpOrien = this.Orientation() === "horizontal"?"vertical":"horizontal";
            this.SetOrientation( tmpOrien );
            this.SetWidth( this.Height() );
            this.SetHeight( tmpLen );
            this.SetFirstItem( this.LastItem() );
            this.SetLastItem( tmpFirst );
        };
    }
    CActionBar.New =function(){
        return new CActionBar();
    };
    qConstruct(CActionBar,"String",function( orientation){
        return new CActionBar( orientation);
    });
    qConstruct(CActionBar,"String,CSize",function( orientation, size ){
        return new CActionBar( orientation, size );
    });
    qConstruct(CActionBar,"CSize",function( size ){
        return new CActionBar( size.Width() > size.Height()? "horizontal":"vertical", size );
    });
    qConstruct(CActionBar,"Number,Number",function( width,height ){
        return new CActionBar( width > height? "horizontal":"vertical", CSize.New(width,height) );
    });
    CActionBar.Cast=function(other){ 
        return new CActionBar(other);
    };

    return CActionBar;
});