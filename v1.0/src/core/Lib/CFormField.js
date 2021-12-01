qPack("CFormField",function(){
    const CWidget   = qRequire("CWidget");
    const CCSS      = qRequire("CCSS");
    const CCell     = qRequire("CCell");
    CCSS.New("CFormField")
    .Add("._field",{
        "position":"relative"
    });
    function CFormField( length, size = [0,1], widgets = null) {
        qExtend(this,CWidget,"div","CFormField _field");
        const _cells = [];
        const _size = size;
        var _length = length;
        const $this  = this;
        this.SetCell = function( index, widget ){
            if( index < _cells.length)
            _cells[index].AddWidget(widget);
            //this.AddChild(widget);
            
            return widget;
        };
        this.GetCell = ( index )=>{
            return _cells[index];
        };
        this.InitLength = function( length ){
            _length = length;
            for( var index =0; index < length; index++ ){
                
                var cell = new CWidget('div','_C'+_size[0]+ ' _R'+_size[1]);
                $this.AddChild( cell );
                _cells[index] = cell;
            };
        };

        this.SetSpanX = function(index, value ){
            _cells[index].SetSpanX( value );
        };
        this.SetSpanY = function(index, value ){
            _cells[index].SetSpanY( value );
        };

        this.GetSpanX = function( index ){
            return _cells[index].SpanX( );
        };
        this.GetSpanY = function( index ){
            return _cells[index].SpanY( );
        };

        this.InitLength( length );
    }
    CFormField.New = function(size=[2,4]){
        return new CFormField(size);
    };

    return CFormField;
});
