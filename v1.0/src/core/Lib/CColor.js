qPack("Graphics/qb.CColor.js", function( Cloud ){

	function CColor( ){
		var _val = "#555";
		this.Cast = function(){
			_val = "#15A";
		}

		this.Info = function(){
			return _val;
		}
	};

	return CColor;

});