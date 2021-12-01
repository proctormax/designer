/**
 * CModelItem
 * Presents an action layout to the view.
 * 
 * model.AddItem( new CModelItem(data, row, col, parentIndex ))
 * model.AddRow( row_index, items )
 * model.AddColum( col_index, items )
 */
exports = 
qPack("UI.Model.CModelItem", function(){
    qRequire('CWidget');
    qRequire('CModelItemIndex');
    function CModelItem( list, index ){
        var _data           = list;
        var _currIndex      = index;
        this.RowChanged     = new CSignal(this,'Row Changed',{row:"Array"});
        this.ColumnChanged  = new CSignal(this,'column Changed',{column:"Array"});

        this.RowCount = function(){ return _data.length; };
        this.ColumnCount = function(){ return _data[0].length; };
        
        this.AppendRow = function( row ){
            this.RowChanged.Emit( [row ]);
            this.InsertRow( _currIndex, row );
        };
        this.InsertRow = function( index, before, row ){
            this.RowChanged.Emit( [row ]);
            
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
            this.RowChanged.Emit( [col ]);
            for( var i=0;i< this.RowCount(); i++ )
                _data[i].push(col);
        };
        this.InsertColumn = function( index, col ){
            this.RowChanged.Emit( [col ]);
        };
        this.PrependColumn = function( before, col ){
            this.InsertColumn( before, col );
        };
    };
    CModelItem.MoveItem     = function( src, dst ){};
    CModelItem.MoveItems    = function( src, range, dst ){};
    CModelItem.InsertItems  = function( src, range, dst ){};
    CModelItem.AppendItems  = function( src, range, dst ){};
    CModelItem.PrependItems = function( src, range, dst ){};
    CModelItem.CopyItems    = function( src, range, dst ){};
    qConstruct(CModelItem,'void',()=>{
        return new CModelItem( [], CModelItemIndex.New(-1,-1) );
    });
    qConstruct(CModelItem,'Array',(list)=>{
        return new CModelItem( list, CModelItemIndex.New(0,0),list );
    });
    qConstruct(CModelItem,'Array,Number,Number',(list, row, column)=>{
        return new CModelItem( list, CModelItemIndex.New(row,column));
    });
    return CModelItem;
});