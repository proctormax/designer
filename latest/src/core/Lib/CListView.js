
exports = 
qPack("UI.CListView",function(){
	const CRow 		= qRequire('CRow');
	const CCSS 		= qRequire('CCSS');
	const CLabel 	= qRequire('CLabel');
	const CWidget 	= qRequire('CWidget');
	const CItem 	= qRequire('CItem');
	const IItemView	= qRequire('IItemView');
	const CTable	= qRequire('CTable');
	const CTableCell= qRequire('CTableCell');

	CCSS.New('CListView')
	.Add('.CListView',{
		"position":"relative",
        "overflow":"hidden",
        "max-width":"100%",
        "width":"inherit",
        "box-sizing":"border-box",
        //"border":"solid 1px #4445",
	})
	.Add('.CListView > .CListItem',{
		"position":"relative",
        "max-width":"100%",
        "box-sizing":"border-box",
        "display":"block",
        "clear":"both",
        "overflow":"hidden",
       "border":"solid 1px transparent",
	})
	// NoState
    .Add(".CListView > div:hover",{
        "border-color":"#5aD2",
	})
	// DraggingState
    .Add(".CListView > div:hover",{
        "border-color":"#5aD2",
	})
	// DragSelectingState
    .Add(".CListView > div:hover",{
        "border-color":"#5aD2",
	})
	// CollapsingState
    .Add(".CListView > div:hover",{
        "border-color":"#5aD2",
	})
	// ExpandingState
    .Add(".CListView > div:hover",{
        "border-color":"#5aD2",
	})
	// NoState
    .Add(".CListView > div:hover",{
        "border-color":"#5aD2",
	})
    .Add(".CListView > div:hover",{
        "border-color":"#5aD2",
	});
	
	//console.error("@CListView:",IItemView.name);
	// CListView.clicked.Sync( result.clicked )
	// CListView.clicked.sync( result.clicked )

	function CListView( listModel = [])
	{
	
		const m_changed 	 = new CSignal(this,"currentIndexChanged",{index:"Number"});
		const m_itemInserted = new CSignal(this,"itemInserted",{index:"Number"});
		const m_itemRemoved  = new CSignal(this,"itemRemoved", {index:"Number", item:"CItem"});

		qExtend(this, CWidget,'div','CListView');
		qExtend(this, IItemView,true);

		var
		m_model 			= new CTable([listModel]),
		m_ui 				= this.DC(),
		m_list 				= [];

		////////////////////////////////////////////////////// PRIVATE
		const _AboutToInsertRows = event =>{

		};
		const _AboutToMoveRows = event =>{

		};
		const _AboutToRemoveRows = event =>{

		};
		const _AboutToSwapRows = event =>{

		};
		const _RowsInserted = event =>{
			this.Render();
		};
		const _RowsMoved = event =>{
			this.Render();
		};
		const _RowsRemoved = event =>{
			this.Render();
		};
		const _RowsSwapped = event =>{
			this.Render();
		};
		const _AboutToInsertColumns = event =>{

		};
		const _AboutToMoveColumns = event =>{

		};
		const _AboutToRemoveColumns = event =>{

		};
		const _AboutToSwapColumns = event =>{

		};
		const _ColumnsInserted = event =>{
			this.Render();
		};
		const _ColumnsMoved = event =>{
			this.Render();
		};
		const _ColumnsRemoved = event =>{
			this.Render();
		};
		const _ColumnsSwapped = event =>{
			this.Render();
		};
		
		////////////////////////////////////////////////////// 

		this.Items	 = function(){
			return m_list;
		};
		this.Model	 = function(){
			return m_model;
		};

		this.SetModel	 = function( model ){

			qAssert( !qTypeOf(model,"CTable") );
			// Row OPERATIONS
			model.AboutToInsertRows.Add(_AboutToInsertRows);
			model.AboutToMoveRows.Add(_AboutToMoveRows);
			model.AboutToRemoveRows.Add(_AboutToRemoveRows);
			model.AboutToSwapRows.Add(_AboutToSwapRows);
			model.RowsInserted.Add(_RowsInserted);
			model.RowsMoved.Add(_RowsMoved);
			model.RowsRemoved.Add(_RowsRemoved);
			model.RowsSwapped.Add(_RowsSwapped);
			
			// Column OPERATIONS
			model.AboutToInsertColumns.Add( _AboutToInsertColumns);
			model.AboutToMoveColumns.Add( _AboutToMoveColumns);
			model.AboutToRemoveColumns.Add( _AboutToRemoveColumns);
			model.AboutToSwapColumns.Add( _AboutToSwapColumns);
			model.ColumnsInserted.Add( _ColumnsInserted);
			model.ColumnsMoved.Add( _ColumnsMoved);
			model.ColumnsRemoved.Add( _ColumnsRemoved);
			model.ColumnsSwapped.Add( _ColumnsSwapped);
			
			if( m_model !== null ){

				// Row OPERATIONS
				m_model.AboutToInsertRows.Remove(_AboutToInsertRows);
				m_model.AboutToMoveRows.Remove(_AboutToMoveRows);
				m_model.AboutToRemoveRows.Remove(_AboutToRemoveRows);
				m_model.AboutToSwapRows.Remove(_AboutToSwapRows);
				m_model.RowsInserted.Remove(_RowsInserted);
				m_model.RowsMoved.Remove(_RowsMoved);
				m_model.RowsRemoved.Remove(_RowsRemoved);
				m_model.RowsSwapped.Remove(_RowsSwapped);
				
				// Column OPERATIONS
				m_model.AboutToInsertColumns.Remove( _AboutToInsertColumns);
				m_model.AboutToMoveColumns.Remove( _AboutToMoveColumns);
				m_model.AboutToRemoveColumns.Remove( _AboutToRemoveColumns);
				m_model.AboutToSwapColumns.Remove( _AboutToSwapColumns);
				m_model.ColumnsInserted.Remove( _ColumnsInserted);
				m_model.ColumnsMoved.Remove( _ColumnsMoved);
				m_model.ColumnsRemoved.Remove( _ColumnsRemoved);
				m_model.ColumnsSwapped.Remove( _ColumnsSwapped);

				
			}

			m_model = model;

			if( m_model ) this.Render();
		};

		Object.defineProperty(this,"CurrentIndexChanged",{get:()=>{
			return m_changed;
		}});
		Object.defineProperty(this,"ItemInserted",{get:()=>{
			return m_itemInserted;
		}});
		Object.defineProperty(this,"ItemRemoved",{get:()=>{
			return m_itemRemoved;
		}});

		function NotInRange(index){ return ( index < 0 || index >= m_list.length ); }
		
		this.Append 		= function( text ){		
			var item 		= new CItem( text,"CListItem CItem",this.Count());
			m_list.push(item);

			item.Clicked.Add( e =>{
				this.SetCurrentRow( e.item.Index());
			});
			
			this.AddChild(item);
			return item;
		};
		
		this.Count 			= function(){ return m_list.length;};

		this.HideRows  		= function( row,count = 1) {
			
			if( NotInRange(row)) return null;

			for (var i = 0; i < count; i++) {
				//this.RemoveChild( m_list[row+i].item, m_ui);
				m_list[row+i].item.Hide();
			}
		};

		this.ShowRows  		= function( row,count = 1) {
			
			if( NotInRange(row)) return null;

			for (var i = 0; i < count; i++) {
				m_ui.insertBefore( m_list[row], m_list[row+i]);
				row++;
			}
		};
		this.Init = function( model ){

			//if( model ) this.SetModel( model );

			// model.SetRowData(    parent, index, data );
			// model.SetColumnData( parent, index, data );
			this.SetCurrentRow(0);

			this.CurrentIndexChanged.Add( e =>{
				if( row < m_list.length ){
					this.CurrentIndexChanged.Emit({item:m_list[row]});
				}
			});

		}

		/////////////////////////////////////////////////// 

		this.Init( listModel );
	}
	
    CListView.prototype.KeyPressEvent = function (event){
        switch (event.keyCode) {
            case QB.KEY_UP:                
                this.SetCurrentIndex( this.CurrentIndex() - 1 );
                break;
            case QB.KEY_DOWN:
                this.SetCurrentIndex( this.CurrentIndex() );
                break;
            case QB.KEY_LEFT:
                this.SetCurrentIndex( this.CurrentIndex() );
                break;
            case QB.KEY_RIGHT:
                this.SetCurrentIndex( this.CurrentIndex() );
                break;
            case QB.KEY_PageUp:
                this.SetCurrentIndex( this.CurrentIndex() );
                break;
            case QB.KEY_PageDown:
                this.SetCurrentIndex( this.CurrentIndex() );
                break;
            case QB.KEY_End:
                this.SetCurrentIndex( this.CurrentIndex() );
                break;
            case QB.KEY_Home:
                this.SetCurrentIndex( 0 );
                break;
        
            default:
                break;
        }
    };

	qSignals(CListView,{
		"CurrentIndexChanged" :{ index:"Number"}
	});
	qSetProperties( CListView,{currentRow:"Number"});

	CListView.prototype.Clear = function( ){
		while( this.Items().length ){
			this.RemoveChild( this.Items().shift() );
		}
	};
	CListView.prototype.Render = function( ){
		this.Clear();
		const model = this.Model();
		const m_list = this.Items();

		// for each row:
		for( var rowIndex=0; rowIndex < model.RowCount(); rowIndex++){

			var listItem 	= new QB.CListItem( this, rowIndex );
			

			//listItem.Render();

			m_list[rowIndex] = listItem;

			this.AddChild( listItem );
			// var item = new CTreeItem( model, row );
			// var item = new CTableItem( model, row );
			// var item = new CDockItem( model, row );
			// var item = new CPaneItem( model, row );
			// for each renderable cell in row;
			// item.AddChild( cell )
			// view.AddChild( item );
			// CListView.CItem
			// CTreeView.CItem
			// CTableView.CItem
			// CColumnView.CItem
		}
	};

	CListView.New = ()=>{
		return new CListView( [] );
	};
	qConstruct( CListView,'Array',( rows )=>{
		
		return new CListView( rows );
	});
	qConstruct( CListView,'CTable',( model )=>{
		return new CListView( model );
	});

	// CListItem:{icon, name, label}

	return CListView;
});
