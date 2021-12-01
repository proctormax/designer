qPack("CCell",function(){
    const CWidget   = qRequire("CWidget");
    const CCSS      = qRequire("CCSS");
    CCSS.New("CCell")
    .Add(".CCell",{
        "position":"relative",
        "display":"inline-block",
    });
    
    function CCell( spanX = 1, spanY = 1, widget = null ){
        var _spans =["_R"+spanX,"_C"+spanY];
        var _widget;
        var 
        prop = {
            spanX:"Number",
            spanY:"Number",
        };
        qExtend(this,CWidget,"div","CCell");
        qProperties(this,prop);
        
        this.SetWidget = widget =>{
            if( _widget ){
                this.ReleaseWidget( _widget );
            }
            _widget = widget;
            if( qTypeOf(_widget,"CWidget") )
                this.AddChild(widget);
        };
        this.GetWidget = () =>{
            return _widget;
        };
        this.ReleaseWidget = () =>{
            if( _widget ){
                this.DC().removeChild( _widget.DC() );
            }
            return _widget;
        };
        this.Init = function(){
            this.SpanXChanged.Add( e =>{
                console.log("CCell::SpanX Changed:",e);
                //CCSS.Remove(this,_spans[0])
            });
            this.SpanYChanged.Add(e =>{
                console.log("CCell::SpanY Changed:",e);
            });

            if( widget ) this.SetWidget(widget);

        }
    }
    CCell.New = function( widget =null ){
        return new CCell(1,1, widget);
    };

    return CCell;
});
