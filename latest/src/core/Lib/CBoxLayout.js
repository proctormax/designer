qPack("CBoxLayout", function( Cloud ){

	const CSize = qRequire("CSize");

	const CSignal = qRequire("CSignal");

	const CLayout = qRequire("CLayout");
	
	const CLayoutItem = qRequire("CLayoutItem");

	const CCSS = qRequire("CCSS");

	const Geom = qRequire("Geom");

	const CRect = qRequire("CRect");

	const EType = qRequire("ETypes");

	const EOrientation = EType.Orientation;

	const ELayoutDirection = EType.LayoutDirection;

	const EBoxLayoutType = ["horizontal","vertical"];



	function CBoxLayout( parent = null, orientation = "horizontal", direction = ELayoutDirection.LeftToRight, autoSize = true ){

		qExtend(this,CLayout,parent,"CBoxLayout "+orientation);
		//qExtend(this,CSize,0,0);

		var _     =

		{

			direction: direction,

			widgets:[],// new CList(QB.CWidget),

			spacers:[],// new CList(QB.CSpacerItem),

			items:[],// new CList(CLayoutItem),

			currDir:direction,

			orientation: orientation,

			margin:"0px",

			autoSize: Boolean,

			size: new CSize(),

			this:this

		};

		this.OrientationChanged = new CSignal(this,'orientationChanged',{

			to:"String",from:"CString"

		});

		this.ItemAdded = new CSignal(this,'itemAdded',{

			size:"CSize", index:"Number"

		});

		this.ItemRemoved = new CSignal(this,'itemRemoved',{

			size:"CSize", index:"Number"

		});

		this._CBoxLayout = function(){

			this._CLayout();

		};

		this.AutoSize 	= function(){

			return _.autoSize === true;

		}

		this.SetAutoSize = function( autoSize ){

			if( autoSize ) CCSS.Add(this,'auto-size');

			else CCSS.Remove(this,'auto-size');

			_.autoSize = autoSize;

		};

		this.SetOrientation = function(o){

			CCSS.Switch(this, _.currOrien ,EBoxLayoutType[o]);

			_.this.OrientationChanged.Emit({orientation:o});

			_.orientation = o;

			_.currOrien   = EBoxLayoutType[o];

		};

		/**

		*	@method IsHorizontal:bool - Returns true if the current layout direction is set to EOrientation.Horizontal, otherwise, false.

		*

		*/

		this.IsHorizontal = function(){

			return _.orientation === "horizontal";

		};

		/**

		*	@method IsVertical:bool - Returns true if the current layout direction is set to EOrientation.Vertical, otherwise, false.

		*

		*/

		this.IsVertical = function(){

			return _.orientation === "vertical";

		};

		/**

		*	@method FlipHorizontal:void

		*

		* 	@param flow:QB.HorizontalFlow -

		*/

		this.ToHorizontal=function( ){

			if( _.this.IsHorizontal() ) return;

			this.SetOrientation( "horizontal");

		};

		/**

		*	@method FlipVertcal:void

		*

		* 	@param flow:QB.HorizontalFlow -

		*/

		this.ToVertical=function( ){

			if( _.this.IsVertical() ) return;

			this.SetOrientation( "vertical");

		};

		this.Flip=function(){

			_.this.IsVertical()? _.this.ToHorizontal() : _.this.ToVertical();

		};

		this.AddLayout=function(layout,stretch = 0){

		};

		this.AddSpacerItem=function(spacerItem){

			spacerItem.SetDirection(this.Direction()); this.DC().appendChild(spacerItem.DC()); _.spacers.Add(spacerItem);

		};

		this.AddSpacing=function(size){

			size = parseInt(size);

			_.margin = this.IsVertical()? size+"px 0px":"0px "+size+"px";

			_.items.Call(function(i){

				i.DC().style.margin= _.margin;

			});

		};

		this.AddStretch=function(stretch = 0){

		};

		this.AddStrut=function(size){

		};

		this.AddWidget=function(widget,stretch = 0,alignment=0){

			var item = new CLayoutItem( this,widget );

			var index = _.items.length;

			_.widgets.push(widget);

			_.items.push(item);

			this.DC().appendChild(item.DC());

			var size = CSize.Cast(Geom.GetSize(item));

			Geom.SetSize(item,widget.Size().ToArray() );

			this.ItemAdded.Emit({size,index});

			this.ItemAddedEvent({size,index, item});

		};
		this.RemoveWidget=function(widget){

			var item = widget.Parent();

			var index = _.widgets.indexOf( item );

			if( index < -1){
				throw new Error("CBoxLayout::RemoveWidget => widget not a child of this layout");
			}
			_.items.splice(index,1);

			this.DC().removeChild(item.DC());

			var size = CSize.Cast(Geom.GetSize(item));

			Geom.SetSize(item,widget.Size().ToArray() );

			this.ItemRemoved.Emit({size,index});
			this.ItemRemovedEvent({size,index});

		};

		this.Initialize = function(){

			CCSS.Add(this,_.orientation);

			this.SetAutoSize( autoSize );

			this.SetDirection( direction );

			this.ItemAdded.Add(_ItemAddedCb);

			this.ItemRemoved.Add(_ItemRemovedCb);

		};

		function _GetTotal(index){

			var res = 0;

			for( var i=0;i<_.items.length;i++)

			if(index===0 )res += Geom.GetWidth(_.items[i]);

			else res += Geom.GetHeight(_.items[i]);

			return res;

		}

		function _ItemAddedCb( e ){

			if(_.this.IsHorizontal()){

				_.size.IncWidth( e.size.Width() );

				_.size.SetHeight( Math.max(_.size.Height(),e.size.Height()) );

				Geom.AlignList(_.items, Geom.ALIGN_LR, Geom.ALIGN_TO_NEIGHBOR );

			}

			if(_.this.IsVertical()){

				_.size.SetHeight( _.size.IncHeight(  e.size.Height()) );

				_.size.SetWidth( Math.max(_.size.Width(), e.size.Width()) );

				Geom.AlignList(_.items, Geom.ALIGN_TB, Geom.ALIGN_TO_NEIGHBOR );

			}

			//Geom.SetSize(_.this,_.size.ToArray(),_.size.Unit());

		}

		function _ItemRemovedCb( e ){

			if(_.this.IsHorizontal()){

				_.size.IncWidth( -e.size.Width() );

				_.size.SetHeight( Math.max(_.size.Height(),e.size.Height()) );

				Geom.AlignList(_.items, Geom.ALIGN_LR, Geom.ALIGN_TO_NEIGHBOR );

			}

			if(_.this.IsVertical()){

				_.size.SetHeight( _.size.IncHeight( -e.size.Height()) );

				_.size.SetWidth( Math.max(_.size.Width(),e.size.Width()) );

				Geom.AlignList(_.items, Geom.ALIGN_TB, Geom.ALIGN_TO_NEIGHBOR );

			}

		}

		/**

		*	@method Update:void - Updates the layout. This function is automatically called when the need to update the layout araise.

		*

		*/

		this.Update = function( ){

			//_.items.Call(function(i){ i });

			if(this.IsHorizontal()){

				Geom.AlignList(_.items, Geom.ALIGN_LR, Geom.ALIGN_TO_NEIGHBOR );

			}

			if(this.IsVertical()){

				Geom.AlignList(_.items, Geom.ALIGN_TB, Geom.ALIGN_TO_NEIGHBOR );

			}
			console.error(this.ToArray(), _.widgets);

			Geom.SetSize(_.this,this.ToArray(),this.Unit());

		};

		this.Direction=function(){

			return _.currDir;

		};

		this.InsertItem=function(index,item){

		};

		this.InsertLayout=function(index,layout,stretch = 0){

		};

		this.InsertSpacerItem=function(index,spacerItem){

			_.spacers.Add(spacerItem); spacerItem.SetDirection(this.Direction());

		};

		this.InsertSpacing=function(index,size){

		};

		this.InsertStretch=function(index,stretch = 0){

		};

		this.InsertWidget=function(index,widget,stretch = 0,alignment=0){

		};

		this.SetDirection=function(direction){

			if( _.currDir === direction ) return;

			_.currDir = direction;

			_.items.Call(function(i){

				i.SetType( direction === EOrientation.Horizontal? CLayoutItem.ItemType.HORIZONTAL_ITEM : CLayoutItem.ItemType.VERTICAL_ITEM); i.DC().style.margin = _.Margin();

			});

			_.spacers.Call(function(i){

				i.SetType( direction );

			});

		};

		this.SetSpacing=function(spacing){

		};

		this.SetStretch=function(index,stretch){

		};

		this.SetStretchFactor=function(widget,stretch){

		};

		this.SetStretchFactor=function(layout,stretch){

		};

		this.Spacing=function(){

		};

		this.Stretch=function(index){

		};

		this.Initialize();

	};

	CBoxLayout.prototype.ItemAddedEvent = function(e){

	};
	CBoxLayout.prototype.ItemRemovedEvent = function(e){
		
	};
	/**

	* Creates a horiztonal BoxLayout

	*/

	CBoxLayout.Horizontal = function( parent= null, direction=  ELayoutDirection.LeftToRight ){

		return new CBoxLayout(parent,"horizontal",direction);

	};

	/**

	* Creates a Vertical BoxLayout

	*/

	CBoxLayout.Vertical = function( parent= null, direction=  ELayoutDirection.LeftToRight ){

		return new CBoxLayout(parent,"vertical",direction);

	};

	CBoxLayout.New = function( parent= null, orientation=  "horizontal", direction=  ELayoutDirection.LeftToRight ){

		return new CBoxLayout(parent, orientation, direction);

	};

	CBoxLayout.Cast = function( other ){

		return new CBoxLayout( other.Parent(), other.Orietnation(), other.Direction(), other.AutoSize());

	};

	CCSS.New('CBoxLayout')
	.Add('.CBoxLayout,CBoxLayout',{

		"display"	:"block",

		"position"	:"absolute",

		"box-sizing":"border-box",

	})
	.Add('.CLayout.horizontal > CItem, .CFlexLayout > *',{

		"display"	:"block",

		"position"	:"absolute",

		"box-sizing":"border-box",

	});

	return CBoxLayout;

});