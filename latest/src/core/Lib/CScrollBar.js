qPack("CScrollBar",function(){

    const CSlider = qRequire("CSlider");
    
    const ISlider = qRequire("ISlider");

    const CAction = qRequire("CAction");
    
    const CBoxLayout = qRequire("CBoxLayout");

	function CScrollBar( orientation, length, thickness, maximum, minimum = 0, step = 1 ){

		qExtend(this,ISlider,"CScrollBar",maximum, minimum, step );
		var
		_easing = "linear",
		m_slider = new CSlider(orientation,maximum, minimum, length, thickness );
		////////////////////////////////////////////////////

        ////////////////////////////////////////////////////
        const m_ = {
            thickness:"Number",
            length:"Number",
            orientation:"String",
        };

        qProperties(this, m_);

        var m_less_act = CAction.New("-");
        var m_more_act = CAction.New("+");
        var m_layout = new CBoxLayout( this, orientation );
		////////////////////////////////////////////////////
		this.DrawEvent = function( e ){
            this.SetLayout ( m_layout );
		};

		this.ScrollTo = function( stop, easing = "linear"){
            this.SeekTo( stop );
		};
		this.ScrollBy = function( factor, easing = "linear" ){
            this.SeekBy( factor );
		};
		this.WheelEvent = function(e){
			m_slider.WheelEvent(e);
		};


	}

	return CScrollBar;

});



