qPack("Util/qb.CSignal.js", function( Cloud ){

	function CSignal( sender,name,emission={},key="" ){

		var

		_listeners	= [],

		_emission	= emission,

		_pdft	= false,

		_sender	= sender;

		_name	= name;

		_params	= Object.values(emission).toString();

		/*

		*/

		this.Params     = function( ){

			return _params;

		};

		this.Name 	= function( ){

			return _name;

		};

		this.Sender	= function( ){

			return _sender;

		};

		this.Listeners = function(){
			return _listeners;
		};

		this.Info	= function( ){

			return "Name:'"+_name+"',Emits:["+ObjStr(emission)+"]\n";

		};

		this.Emit 	= function( values,sn = "" ){

			if( sn  !== key ) return this;

			//if( values.length < _emission.length )

			//throw new Error("'"+_name+"' emission values must equal ["+_params+"].");

			_listeners.forEach(  entry =>{

				// if this entry contains an array of arguments

				// pass the approriate values into the arguments

				if(  entry.args.length > 0 ){

					entry.args.forEach( (param, index, list )=>{

						// should this param be replaced

						if( typeof param == "string" && /%\w+/.test(param) ){

							param = param.replace(/%/,'');

							if( param in _emission ){

								//console.log('we got a match', param, entry.args, values );

								param = values[param];

							}

						}

						entry.args[index] = param;

						//console.log('args:',entry.args );

					});

					entry.callback.apply(null, [entry.args] );

				}

				else{

					entry.callback.apply(null, [values] );

				}

			});

		};

		this.Add 	= function( callback, args = null ,preventDefault=false ){

			_listeners.push({

				callback,args:args||[],preventDefault

			});

			_pdft = (preventDefault);

			return this;

		};

		this.PreventDefault = function(){

			return _pdft;

		};

		this.Remove 	= function( callback ){

			var	i	= _listeners.indexOf(callback);

			if(i>=0){

				_listeners.splice(i,1);

			}

			return this;

		};

	}

	CSignal.prototype.Sync = function ( other ){
		// o_o.other.listeners  ---> the listening queu
		// o_o.signal_sync  	---> synchronizes two signals to trigger simulteneousely.
		// o_o.signal_desync  	---> disconnect listeners
		// o_o.signal_add		---> adds a listener to the listening queu
		// o_o.signal_remove	---> removes a listener from the listening queu
		// o_o.signal_emit( sgn,params )
		// o_o.let sgn = {emitters:targets, listeners:[lsn1, lsn2, lsn3, lsn4]};
		// o_o.obj.signals.get("clicked").add( handle_clicked );
		// o_o.obj.signals.get("pressed").add( handle_pressed );
		// o_o.obj.signals.get("click");
		// o_o.obj.signals.has("click");
		// o_o.obj.events.has("click");
		// o_o.obj.events.has("press");
		// o_o.obj.events.get("press").add();
		// o_o.class.events.register("press",{position:Point, target:Object, time:TimeStamp}, trigger =>{});
		// o_o.signal_add(sgn, bt1, lsn2);
		// o_o.signal_add(click, bt1, lsn2);
		// o_o.signal_add(click, bt2, lsn1);
		// o_o.signal_add(click, bt2, click2, bt3);
		// o_o.signal_sync( bt2.clicked, bt3.tapped );
		// o_o.signal_desync( btn2, E_Clicked, btn1, E_Tapped );
		// o_o.bt2.clicked = _2342
		// o_o.signal_synced( btn2, E_Click, btn1, E_Tapped )
		// o_o.Signal.Clicked.Emitters 	= [CWidget, CButton, CLabel, CCheck, ]
		// o_o.Signal.Tapped.Emitters 	= [CWidget, CButton, CLabel, CCheck, ]
		// o_o.emit( label1, CWidget.Tapped )
		// o_o.label1.emit("tapped",{});
		// o_o.signal_emit( label1,"tapped",{position:Mouse.Position, time:Mouse.TimeStamp });
		// o_o.emit( btn1,"tapped",{position:Mouse.Position, time:Mouse.TimeStamp });
		// o_o.emit( btn1,"tapped", SG({position:Mouse.Position, time:Mouse.TimeStamp }));
		// o_o.btn2.emit("tapped", {position:{x:424}})
		// o_o.btn2.signal.add("tapped", {position:{x:424}})
		// f_2423(34)
		// f2_423(34)
		// f_2432(43)
		// db__(5445)
		// bd__(4004)
		// [23, 42, 42, 54]
		// {A:55, B:65}
	};

	// 

	CSignal.New = function(sender,name,emission={

	},key=""){

		return new CSignal(sender,name,emission,key);

	};

	CSignal.desync = function( src, dst ){
		src.sync_list.add( dst );
	}

	return CSignal;

});