qRequire('CSignal');
qRequire('CItemIndex');
qPackage("UI.Model.CItemModel", (function(){
    function CItemModel(){
        var _data       = [[]];
        var _currIndex  = new CItemIndex(this);
        this.RowChanged = new CSignal('Row Changed',{row:"Array"});
        this.ColumnChanged = new CSignal('column Changed',{column:"Array"});

        this.RowCount = function(){ return _data.length; };
        this.ColumnCount = function(){ return _data[0].length; };
        
        this.AppendRow = function( row ){
            this.RowChanged.Emit( row );
            this.InsertRow( _currIndex, row );
        };
        this.InsertRow = function( index, before, row ){
            this.RowChanged.Emit( row );
            
        };
        this.PrependRow = function( index, before, row ){
            this.InsertRow( index, before, row );
        };
        this.SwapRows  = function( index, index2 ){
            this.InsertRow( row );
        };
        this.MoveRow   = function( src, dst ){
            this.InsertRow( row );
        };
        // COLUMN
        this.AppendColumn = function( col ){
            this.RowChanged.Emit( col );
            for( var i=0;i< this.RowCount(); i++ )
                _data[i].push(col);
        };
        this.InsertColumn = function( index, col ){
            this.RowChanged.Emit( col );
        };
        this.PrependColumn = function( before, col ){
            this.InsertColumn( before, col );
        };
    };
    CItemModel.MoveItem     = function( src, dst ){};
    CItemModel.MoveItems    = function( src, range, dst ){};
    CItemModel.InsertItems  = function( src, range, dst ){};
    CItemModel.AppendItems  = function( src, range, dst ){};
    CItemModel.PrependItems = function( src, range, dst ){};
    CItemModel.CopyItems    = function( src, range, dst ){};
    return CItemModel;
})());