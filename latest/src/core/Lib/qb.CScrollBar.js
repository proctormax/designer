qRequire("CSlider");
qPackage("UI.Control.CScrollBar",( function()
{
	function CScrollBar( axis, length, thickness, minimum, maximum, step ){

		CFrame.ExtendTo(this,["div",""]);
		var
		_easing = "linear",
		_slider = new CSlider(axis,length );
		////////////////////////////////////////////////////
		this.ThicknessChanged = new CSignal(this,"ThicknessChanged",{thickness:"Uint"});
		this.ValueChanged = _slider.ValueChanged;

		////////////////////////////////////////////////////
		////////////////////////////////////////////////////
		this.DrawEvent = function( e ){
	
		};
		this.Easing = function( ){ return _easing; };
		this.SetEasing = function( easing ){
			_easing = easing;
		};
		this.Thickness = function( ){ return _thickness; };
		this.SetThickness= function( thickness ){
			_thickness = thickness;
			this.ThicknessChanged.Emit([thickness]);
		};

		this.ScrollTo = function( stop, easing = "linear"){

		};
		this.ScrollBy = function( factor, easing = "linear" ){

		};
		this.WheelEvent = function(e){
			_slider.WheelEvent(e);
		};


	}

	return CScrollBar;

})());