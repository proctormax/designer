
/***
 * CFormLayout
 * Manages forms of input widgets and their associated labels
**/

QB.EFormLayoutFieldsStayAtSizeHint	=
{
	undefined	:0,		// The fields never grow beyond their effective size hint. This is the default for QMacStyle.
};

QB.EFormLayoutExpandingFieldsGrow	=
{
	undefined	:1,		// Fields with an horizontal size policy of Expanding or MinimumExpanding will grow to fill the available space. The other fields will not grow beyond their effective size hint. This is the default policy for Plastique.
};

QB.EFormLayoutAllNonFixedFieldsGrow	=
{
	undefined	:2,		// All fields with a size policy that allows them to grow will grow to fill the available space. This is the default policy for most styles.
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
QB.CFormLayout=function ( parent = null )
{
	QB.CLayout.apply(this,[parent]);
	this.AddRow=function(labelText, field){};
	this.FieldGrowthPolicy=function(){};
	this.FormAlignment=function(){};
	this.GetItemPosition=function(index, rowPtr, rolePtr){};
	this.GetLayoutPosition=function(layout, rowPtr, rolePtr){};
	this.GetWidgetPosition=function(widget, rowPtr, rolePtr){};
	this.HorizontalSpacing=function(){};
	this.InsertRow=function(row, label, field){};
	this.InsertRow=function(row, widget){};
	this.InsertRow=function(row, layout){};
	this.ItemAt=function(row, role){};
	this.LabelAlignment=function(){};
	this.LabelForField=function(field){};
	this.LabelForField=function(field){};
	this.RemoveRow=function(row){};
	this.RowCount=function(){};
	this.RowWrapPolicy=function(){};
	this.SetFieldGrowthPolicy=function(policy){};
	this.SetFormAlignment=function(alignment){};
	this.SetHorizontalSpacing=function(spacing){};
	this.SetItem=function(row, role, item){};
	this.SetLabelAlignment=function(alignment){};
	this.SetLayout=function(row, role, layout){};
	this.SetRowWrapPolicy=function(policy){};
	this.SetSpacing=function(spacing){};
	this.SetVerticalSpacing=function(spacing){};
	this.SetWidget=function(row, role, widget){};
	this.Spacing=function(){};
	this.TakeRow=function(row){};
	this.VerticalSpacing=function(){};

};