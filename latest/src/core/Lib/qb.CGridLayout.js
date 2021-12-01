
/***
 * CGridLayout
 * Lays out widgets in a grid
**/
qPackage("path.CX",(function(){
    function CX( arg ){
        qProperties(this,[{'x':"String"}]);
    }
    qConstruct(CX,"void",function(){
        return new CX('');
    });
    CX.Cast=function(other){ 
        return new CX(other);
    };

    return CX;
})());
QB.CGridLayout=function ( parent = null )
{
	QB.CLayout.apply(this,[parent]);
	this.AddItem=function(item, row, column, rowSpan=1, columnSpan=1,alignment=0){};
	this.AddLayout=function(layout, row, column,alignment=0){};
	this.AddLayout=function(layout, row, column, rowSpan, columnSpan,alignment=0){};
	this.AddWidget=function(widget, row, column,alignment=0){};
	this.AddWidget=function(widget, fromRow, fromColumn, rowSpan, columnSpan,alignment=0){};
	this.CellRect=function(row, column){};
	this.ColumnCount=function(){};
	this.ColumnMinimumWidth=function(column){};
	this.ColumnStretch=function(column){};
	this.GetItemPosition=function(index, row, column, rowSpan, columnSpan){};
	this.HorizontalSpacing=function(){};
	this.ItemAtPosition=function(row, column){};
	this.OriginCorner=function(){};
	this.RowCount=function(){};
	this.RowMinimumHeight=function(row){};
	this.RowStretch=function(row){};
	this.SetColumnMinimumWidth=function(column, minSize){};
	this.SetColumnStretch=function(column, stretch){};
	this.SetHorizontalSpacing=function(spacing){};
	this.SetOriginCorner=function(corner){};
	this.SetRowMinimumHeight=function(row, minSize){};
	this.SetRowStretch=function(row, stretch){};
	this.SetSpacing=function(spacing){};
	this.SetVerticalSpacing=function(spacing){};
	this.Spacing=function(){};
	this.VerticalSpacing=function(){};
};