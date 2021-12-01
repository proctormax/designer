
/***
 * CListItem
 * Used to locate data in a data model
**/
// CListViewRow
// CListViewColumn
//exports = CTableCell
qPack("CListItem",function(){
	const CCSS = QB.CCSS;

	CCSS.New("CListItem")
	.Add(".CListItem",{
		"border-bottom":"solid 1px transparent",
		"margin-bottom":"1px",
		"box-sizing":"content-box",
		"width":"100%"
	})
	.Add(".CListItem.Selected, .CListItem.Seleted:hover",{
		"background-color":"#26A4 !important"
	})
	.Add(".CListItem.Active, .CListItem.Active:hover",{
		"border-color":"#26A5 !important"
	})
	.Add(".CListItem::before",{
		"content":"' '",
		"display":"block",
		"display":"absolute",
		"width":"inherit",
		"height":"100%",
		"top":"0",
		"left":"0",
	})
	.Add(".view.CListItem:nth-child(odd)",{
		"background-color":"#3824",
	})
	.Add(".view.CListItem:nth-child(even)",{
		"background-color":"#2852",
	})
	.Add(".CListItem>spam",{
		//"padding":"0",
		"min-width":"40px",
		"overflow":"hidden",
		"position":"relative",
		"display":"inline-block",
	});

	// {type:item, label:String, active:true, selected: false}
	// {type:item, label:String, active:true, selected: false}
	// MENU
	// {type:item, icon:String, label:String, active:true, checked: false, shortcut:[]}
	function CListItem( view , row=0 ){

		qExtend(this, QB.CModelItem, view.Model(), row, 0);
		// CModelRow
	
        qExtend(this, QB.CWidget, 'div', "CListItem");
		var m_ptr = {
			// row:"Number",
			view:"CListView",
			selected:"Boolean",
			activated:"Boolean",
        };
		let $this = this;
		
        qProperties(this, m_ptr );

		this.SetView( view );
		
		
		const _Init = ()=>{
			this.InitEvents();
	

			this.RowChanged.Add( e =>{
				$this.Render();

			});

			this.SetRow( row );
		};

		_Init();

	}
	CListItem.prototype.Render = function( ){
		// console.log( "---------- >>> ROW", this.Row());
		// 
		var row 	= this.View().Model().Row( this.Row() );
		if( qTypeOf(row, "Array") )				
			row.forEach( (cell) => {
				// {icon:String, label:String, }
				if( qTypeOf(cell.Data(),"String") ){
					//var item = new CLabel(cell.Data(),'CChildItem','spam');
					var item = new QB.CTableCell(cell.Data(),'CChildItem','spam');
					this.AddChild( item );
					item.SetAttribute("contentEditable",true); 
				}
			});
		// console.log(this.Row, "rendering...");
	};

	CListItem.prototype.MousePressEvent = function(e){
		//this.UiStyle.Add("Selected");
		console.log("current item row", this.Row(), this.SetRow );
		this.View().SetCurrentRow( this.Row() );
		// CModelRowItem
		// CModelCell
	};
	// view.RowPressed
	// view.RowReleased
	// view.AboutToChangeCurrentIndex
	// view.CurrentIndexChanged
	// view.ItemActivated
	CListItem.New = (view,row=0)=>{
		return new CListItem(view,row );
	};
	return CListItem;
});




/* 

test.beforeEach( () =>{
	items = new Array();	
})

@test
const testAppendItem = ()=>{
	const item = new CListItem("String");
	items.Append( item );

	assertEquals( 1, items.size() );
	item.SetData("testing an item");

	assertTrue( typeof item.Data() === "string");

}
colors.rgb_hsl = (r, g, b) => {
	
}
*/