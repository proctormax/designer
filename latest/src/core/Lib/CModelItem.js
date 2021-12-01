
/***
 * CModelItem
 * Used to locate data in a data model
**/

//exports = CTableCell
qPack("CModelItem",function(){
	function CModelItem( table, row=0,column=0, editable=true){
		var m_ptr = {
			row:"Number",
			column:"Number",
			editable:"Boolean",
			table:"CTable",
		};
		qProperties(this,m_ptr);
		var m_changed = new QB.CSignal(this,"Changed", {row:"Number", column:""});
		var m_parent;


		this.SetData = function( data ){
			
			this.Table().SetCell( this.Row(), this.Column(), data );
		};
		this.Data = function(){
			return this.Table().Cell( this.Row(), this.Column() );
			
		};
		this.SetParent = function( parent ){
			m_parent = parent;
		};
		this.Parent = function(){
			return m_parent;
		};
		
		this.Init = function(row,column, editable){
			this.SetRow(row);
			this.SetColumn(column);
			this.SetTable( table );
			this.SetEditable( editable );
			// SetEditor || Renderer: Widget
			// SetRenderMode( EditMode | DefaultMode )
			// ViewModeWidget | EditModeWidget
			// item.Render( view, EditMode );
			// item.Render( view, EditMode );
			// item.Render( copy, EditMode );
			// item.Copy( copy, EditMode );
			// item.RenderCopy( parent, EditMode );
			// item.RenderRef( parent, EditMode );
			// item.Copy( parent, CopyMode.DeepCopy );
			// item.Copy( parent, CopyMode.ShallowCopy );
			// ReadOnly | Mutable | CModelViewItem
		};

		this.Init(row, column, editable);
	}


	//  LinkTo( other ), UnlinkFrom( other )
	CModelItem.New = (table,row=0,col=0)=>{
		return new CModelItem(table,row,col);
	};

	CModelItem.prototype.MousePressEvent = function( e ){

		console.log("MODEL ITEM PRESSED");
	};
	CModelItem.prototype.MouseMoveEvent = function( e ){

		console.log("MODEL ITEM MOVED");
	};
	CModelItem.prototype.MouseReleaseEvent = function( e ){
		console.log("MODEL ITEM RELEASED");
	};
	CModelItem.prototype.Copy = function( parent = null ){
		console.log("CModelItem::Copied");
		let res = new CModelItem(this.Table(), this.Row(), this.Column(), this.Editable() );
		res.SetParent( parent );
		return res;
	};
	CModelItem.prototype.Instance = function( ){
		console.log("CModelItem::Instance created");
		let res = new CModelItem(this.Table(), this.Row(), this.Column(), this.Editable() );

		res.RowChanged 		= this.RowChanged;
		res.ColumnChanged 	= this.ColumnChanged;
		res.DataChanged  	= this.DataChanged;
		res.TableChanged 	= this.TableChanged;
		res.EditableChanged	= this.EditableChanged;
	// 
		// item.DataAboutToChange.Sync( res.DataAboutToChange )
		return res;
	};
	return CModelItem;
});