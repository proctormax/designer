qPack("UI/Appearance/qb.CStyle.js", function( Cloud ){
	const CCSS = qRequire("UI/Appearance/CCSS.js");
	
    var EStyleState = {
        Default:'default',
        Active:'active',
        Link:'link',
        Hover:'hover',
        Visited:'visited'
    };
	
	function CStyle( dc, state = EStyleState.Default ){

		var _dc = dc;

		var _state = state;

		var _rules = {

			'default':{

			},

			'hover':{

			},

			'active':{

			},

			'visited':{

			},

			'link':{

			}

		};

		//const _target= target || {};

		this.Add = function(selectors){

			CCSS.Add(_dc,selectors);

		};

		this.Rule  = function( ){

			return _rules[_state];

		};

		this.State = function(){

			return _state;

		};

		this.AddState = function( state ){

			_rules[state]={

			};

		};

		this.SetState = function(state){

			_state = state;

		};

		this.Render = function(){

			for( var state in _rules ){

				switch (state) {

					case 'default':

					for( var line in _rules[state] ){

						CCSS.Set(dc,line, _rules[state][line] );

					}

					break;

					default:

					break;

				}

			}

		};

		this.Rule = function( state = _state ){

			return _rules[state];

		};

		this.SetRule = function( state, rule ){

			_rules[state] = rule;

			this.Render();

		};

		this.IsRule = function( state ){

			return _state === state;

		};

		this.Set = function( property, value ){

			_rules[_state][property]=value;

			if(this.IsRule('default')) CCSS.Set( _dc,property,value );

			else this.Render();

		};

		this.Get  = function( property ){

			if( this.IsRule('default'))

			return CCSS.Get(_dc,property);

			return _rules[_state][property];

		};

		this.SetWidth = function( width, unit= "px"){

			this.Set("width", width+ unit );

		};

		this.SetHeight = function( height, unit= "px"){

			this.Set("height", height+ unit );

		};

		this.SetSize = function( width, height, unit = "px"){

			this.SetWidth(width+unit);

			this.SetHeight(height+unit);

		};

		this.SetSolidStroke = function( color ){

			this.Set("border-color",color);

		};

		this.SetSolidFill = function( color ){

			this.Set("background-color",color);

		};

	}
	return CStyle;

});