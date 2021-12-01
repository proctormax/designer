qPack("CTable", function(){
    const CSignal = qRequire('CSignal');
  
    const CreateRow = (model,index, length =1) =>{
        var cells = [];
       for( var i=0; i < length; i++){
           cells.push( new QB.CModelItem(model, i,index));
       }

       return cells;
    }

    function CTable( data = [], header = null ){
        // db = [ index, front, back ]
        var m_buffer         = [[],[]];
        //
        
        this.AboutToChangeData      = new CSignal(this,'AboutToChangeRows',{row:"Number", cells:"Array"});
        this.DataChanged            = new CSignal(this,'Row Changed',{row:"Array"});
        
        this.AboutToMoveRows        = new CSignal(this,'AboutToMoveRows',{src:"CModelItem",start:"Number", end:"Number", dst:"CModelItem", row:"Number"});
        this.AboutToRemoveRows      = new CSignal(this,'AboutToRemoveRows',{parent:"CModelItem",start:"Number", end:"Number"});
        this.AboutToInsertRows      = new CSignal(this,'AboutToInsertRows',{row:"Number", count:"Number"});
        this.AboutToSwapRows        = new CSignal(this,'AboutToSwapRows',{row:"Number", count:"Number"});
        this.RowsInserted           = new CSignal(this,'RowsInserted',{parent:"CModelItem",start:"Number", end:"Number"});
        this.RowsMoved              = new CSignal(this,'RowsMoved',{src:"CModelItem",start:"Number", end:"Number", dst:"CModelItem", row:"Number"});
        this.RowsRemoved            = new CSignal(this,'RowsRemoved',{parent:"CModelItem",start:"Number", end:"Number"});
        this.RowsSwapped            = new CSignal(this,'RowsSwapped',{srcParent:"CModelItem",srcIndex:"Number", dst:"CModelItem", dstIndex:"Number"});
        
        this.AboutToMoveColumns     = new CSignal(this,'AboutToMoveColumns',{src:"CModelItem",start:"Number", end:"Number", dst:"CModelItem", column:"Number"});
        this.AboutToRemoveColumns   = new CSignal(this,'AboutToRemoveColumns',{parent:"CModelItem",start:"Number", end:"Number"});
        this.AboutToInsertColumns   = new CSignal(this,'AboutToInsertColumns',{row:"Number", cells:"Array"});
        this.AboutToSwapColumns     = new CSignal(this,'AboutToSwapColumns',{row:"Number", cells:"Array"});
        this.ColumnsInserted        = new CSignal(this,'ColumnsInserted',{parent:"CModelItem",start:"Number", end:"Number"});
        this.ColumnsMoved           = new CSignal(this,'ColumnsMoved',{src:"CModelItem",start:"Number", end:"Number", dst:"CModelItem", column:"Number"});
        this.ColumnsRemoved         = new CSignal(this,'ColumnsRemoved',{parent:"CModelItem",start:"Number", end:"Number"});
        this.ColumnsSwapped         = new CSignal(this,'ColumnsSwapped',{srcParent:"CModelItem",srcIndex:"Number", dst:"CModelItem", dstIndex:"Number"});

        Object.defineProperty(this,"Buffer",{get:()=>{
                return m_buffer;
            }
        });
        Object.defineProperty(this,"FrontBuffer",{get:()=>{
                return m_buffer[0];
            }
        });
        

        this.RowCount = function(){ return this.Buffer[0].length; };
        this.ColumnCount = function(){ 
            return this.RowCount() > 0 ? this.Buffer[0][0].length : 0;
         };
        this.SetData(data);
    };
    
    CTable.prototype.SetData = function( data ){
        const rowCount = data.length;
        const colCount = data[0].length;
        if( this.IsEmpty()){
            while( this.RowCount() < rowCount )
                this.Buffer[0].push( CreateRow(this, 0, colCount));
            
        }
        if( this.RowCount() < rowCount ){
            this.InsertRows( this.RowCount(), rowCount - this.RowCount() );
        }
        if( this.ColumnCount() < colCount ){
            this.InsertColumns( this.ColumnCount(), colCount - this.ColumnCount() );
        }
        for( var r = 0; r < rowCount; r++ ){
            
            for( var c = 0; c < colCount; c++ ){
                
                let cell = this.Buffer[0][r][c];
                try {
                    if( cell.SetData !== null )
                        cell.SetData( data[r][c]);
                    else
                    throw new  Error("CTable::SetData @"+[r,c].toString()+qTypeOf(cell));
                } catch (error) {
                    console.error(error);
                }
            }
        }

    };
    CTable.prototype.IsEmpty = function(){
        return this.ColumnCount() === 0;
    };
    CTable.prototype.HasIndex = function( row, col ){
        return this.ColumnCount() > col && this.RowCount() > row;
    };

    CTable.prototype.SetCell = function( row, col, value ){
        qAssert( !this.HasIndex( row, col),"CTable::SetCell( row, col ) Error => Index out of range. ["+ row +", "+ col +"]" );
        this.FrontBuffer[row][col] = value;
    };
    CTable.prototype.Cell = function( row, col ){
        qAssert( !this.HasIndex( row, col),"CTable::Cell( row, col ) Error => Index out of range." );
        return this.FrontBuffer[row][col];
    };
    CTable.prototype.Column = function( col ){
        qAssert( this.ColumnCount() <= col,"CTable::Column( int ) Error => Index out of range." );
        const res = [];
        for( var i=0; i < this.RowCount(); i++){
            res.push( this.FrontBuffer[i][col] );
        }
        return res;
    };
    CTable.prototype.Row = function( index ){
        qAssert( this.RowCount() <= index,"CTable::Row( int ) Error => Index out of range." );
        
        const res = this.FrontBuffer[index];
        
        return res;
    };
    
    const FlipDb = function( db){
       
        const temp = db.shift();
        db.push( temp );       
        
    };
    
    CTable.prototype.InsertRow = function( index, parent = null ){
        const rCount = this.RowCount();
        const cCount = this.ColumnCount();
        const fBuffer = this.Buffer[0];
        const bBuffer = this.Buffer[1];
        var newRow =  CreateRow(this,  rCount, cCount);
        // if index is less than rCount,
        // 1  - move all rows from 0 up-to index into
        //      the back buffer.
        // 2  - append the new row
        // 3  - insert the remaining rows.
        if( index < rCount ){
            for( var i=0; i <= index; i++ ){
                var iRow = index === i ? newRow : fBuffer.shift();
                bBuffer.push(iRow);
            }
            while( fBuffer.length ){
                var iRow = fBuffer.shift();
                bBuffer.push(iRow);
            }

            FlipDb( this.Buffer );
           // console.error( "bBuffer:",bBuffer.length );
           // console.error( "fBuffer:",fBuffer.length );
        }    
        else{
            fBuffer.push(newRow);
        } 
    };
    // model.InsertRow(2,[ 12 ,44 ,55, 23]);
    CTable.prototype.InsertRows = function(  rowIndex, count,  parent = null ){
        this.AboutToInsertRows.Emit({parent: parent, row:rowIndex, count:count });
        for( var i=0; i < count; i++ ){
            this.InsertRow(rowIndex++, parent);
        }
        this.RowsInserted.Emit({parent, parent, start:rowIndex, end: rowIndex + count });
        //m_currIndex.SetRow(row);        
    };
    CTable.prototype.AppendRows = function( count, parent = null ){
        return this.InsertRows( this.RowCount(), count, parent );
    };
    CTable.prototype.PrependRow = function( index, before, row ){
        this.InsertRow( index, before, row );
    };
    CTable.prototype.SwapRows  = function( index, index2 ){
        // RowSwapEvent
        // ColumnSwapEvent
        this.InsertRow( row );
    };
    
    CTable.prototype.SwapRow = function( src, dst, parent = null ){
        if( src >= this.RowCount() || dst >= this.RowCount() ){

            return qAssert( true, "CTable::SwapRow => Index outta range."+`[${this.RowCount()}]${src},${dst}`);
        }
        const fBuffer = this.Buffer[0];
        const sRow = fBuffer[src];
        const dRow = fBuffer[dst];
        const temp = [];
        while( sRow.length ){
            var cell = sRow.shift();
            cell.SetRow(sRow.length);
            temp.push( cell);
        }
        while( dRow.length ){
            var cell = dRow.shift();
            cell.SetRow( dRow.length);
            sRow.push( cell);
        }
        while( temp.length ){
            var cell = temp.shift();
            cell.SetRow(temp.length);
            dRow.push( cell);
        }
        delete temp;

    };
    CTable.prototype.SwapRows = function( parent, start, end, dst, row ){
        // MoveRowsRequested
        // MoveRowsAccept
        // e.Decline();
        // e.Accept();

        //this.AboutToSwapColumns.Emit({parent:parent, column:col, count: count });
        for( var i=0; i < count; i++ ){
            this.SwapRow(index++);
        }
       // this.ColumnsInserted.Emit({parent:parent, column:col });
    };
    // COLUMN
    CTable.prototype.InsertColumn = function( index, parent = null ){
        // index < 0 
        // index > colCount

        // if the table is empty, insert a row
        if(this.IsEmpty()){
            return this.Buffer[0].push(CreateRow(0,1));     
        }

        const rCount = this.RowCount();
        const cCount = this.ColumnCount();
        const fBuffer = this.Buffer[0];
        // if index is less than rCount,
        // 1  - move all rows from 0 up-to index into
        //      the back buffer.
        // 2  - append the new row
        // 3  - insert the remaining rows.
        for( var r=0; r < rCount; r++ ){
            var iRow = fBuffer[r];
            var tRow = [];
            if( index < rCount ){
                for( var c=0; c <= index; c++ ){
                    var cell = index === c ? new QB.CModelItem(this,c,r) : iRow.shift();
                    tRow.push(cell);
                }
                while( iRow.length ){
                    var cell = iRow.shift();
                    tRow.push(cell);
                }
                while( tRow.length ){
                    var cell = tRow.shift();
                    cell.SetColumn(tRow.length);
                    cell.SetRow(r);
                    iRow.push(cell);
                }    
            }    
            else{
                iRow.push(new QB.CModelItem(this,cCount,r));
            } 
            //bBuffer.push(iRow);
        }
        
    };
    CTable.prototype.InsertColumns = function( col, count, parent = null ){
        
        this.AboutToInsertColumns.Emit({parent:parent, column:col, count: count });
        for( var i=0; i < count; i++ ){
            this.InsertColumn(col++);
        }
        this.ColumnsInserted.Emit({parent:parent, column:col });
    };

    CTable.prototype.AppendColumns = function( parent, cells ){
        this.InsertColumns( parent, this.ColumnCount(), cells);
    };

    CTable.prototype.PrependColumns = function( parent, before, col ){
        this.InsertColumns( parent, before, col );
    };

    CTable.prototype.SwapColumn = function( src, dst, parent = null ){
        const fBuffer = this.Buffer[0];
        for( var r = 0; r < this.RowCount(); r++){
            const iRow  = fBuffer[r];
            const c1 = iRow.splice(src,1,0);            
            const c2 = iRow.splice(dst,1,c1[0]);
            iRow[src] = c2[0];            
        }

    };
    CTable.prototype.RemoveRow = function( index, fromIndex, srcToIndex, dst, dstIndex ){

        const fBuffer = this.Buffer[0];

        var res = fBuffer.splice(index,1);

        return res[0];
    };
    
    CTable.prototype.PrintDb = function(){
        var res = ( "Cols:"+this.ColumnCount()+",Rows:"+this.RowCount());
        for( var r =0; r < this.RowCount(); r++ ){
            res+= "\n------------------------------\n"+r+" -> ";
            for( var c =0; c < this.ColumnCount(); c++ ){
                res+= qTypeOf(this.Cell(r,c).Data())+"|";
            }
        }

        return res;

    }

    CTable.CreateRow = CreateRow;
    return CTable;
});