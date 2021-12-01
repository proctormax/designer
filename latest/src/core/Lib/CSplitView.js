qPack("UI.View.CSplitView", function( Cloud ){

	const	CView = qRequire("UI/View/qb.CView.js");

	const	CSignal = qRequire("Util/qb.CSignal.js");

	const 	CFrame = qRequire("UI/qb.CFrame.js");

	const 	CRect = qRequire("Math/CRect.js");


	function CSplitView( rect, attrib='' ){

		qExtend(this, CFrame, rect,'CSplitView '+attrib );

		var _field            = {

			size:"CSize",

			views:"Array",

			currentIndex:"Number",

			currentView:"CWidget",

			///////////////////// HANDLES

			handles:"Array",

			westHandle:"CSplitHandle",

			eastHandle:"CSplitHandle",

			northHandle:"CSplitHandle",

			southHandle:"CSplitHandle",

			///////////////////// HANDLERS

			vSplitHandler:"Function",

			hSplitHandler:"Function",

			///////////////////// SIGNALS

			OnSplitHorizontal:"Function",

			OnSplitVertical:"Function",

			OnJoinedHorizontal:"Function",

			OnJoinedVertical:"Function",

		};

		qProperties(this,_field);

		function CreateView( rect,orientation, stroke = "#495" ){

			var view = new CView(rect);

			//Geom.SetRect( view, rect.M() );

			view.SetRect( rect );

			//view.css.Set('border','dashed 1px ' + stroke );

			view.css.Set('box-sizing','border-box');

			view.css.Set('position','absolute');

			m_.OnViewCreated.Emit([view, orientation]);

			m_.this.AddChild( view );

			_field.views.push( view );

			m_.this.SetCurrentIndex( _field.views.indexOf(view) );

			return view;

		}

		function AdjustView( view, rect ){

			if( view.SetRect )

			view.SetRect( rect);

		}

		var m_ = {

			buffer:[],

			innerHandles:[],

			OnViewSplit: new CSignal(this,'onViewSplit',{

				target:"CRect", views:"Array",orientation:"Number", flow:"Number"

			}),

			OnViewJoin: new CSignal(this,'onViewSplit',{

				parts:"Array", orientation:"Number"

			}),

			OnViewMerge: new CSignal(this,'onViewSplit',{

				parts:"Array", orientation:"Number"

			}),

			OnViewHide: new CSignal(this,'onViewSplit',{

				parts:"Array", orientation:"Number"

			}),

			OnViewShow: new CSignal(this,'onViewSplit',{

				parts:"Array", orientation:"Number"

			}),

			OnViewSwap: new CSignal(this,'onViewSwap',{

				nView:"CView", orientation:"Number"

			}),

			OnViewCreated: new CSignal(this,'onViewCreated',{

				view:"CView", orientation:"Number"

			}),

			///////////////////// SIGNALS

			InsertHandle: function(){

			},

			RemoveHandle: function(){

			},

			RemoveView: function(){

			},

			InsertView: function(index,view){

			},

			this: this

		};

		this.Render = function(){

			/* _field.views.forEach(element => {

				Geom.SetRect(element,element.Rect().M());

			}); */

		};

		this.ActivateView= function( views){

			if( m_.recent ) views = m_.recent;

			else return;

			if( views[0].DC ) views[0].DC().classList.remove("active");

			//if(CCSS) CCSS.Add( cView, "active");

			if( views[1].DC ) views[1].DC().classList.add("active");

			//console.log("added view",cView, pView)

		}

		this.Init           = function( ){

			//this.SetSize(size);

			_field.views   = [];

			CreateView(this.Rect());

			//m_.buffer.push(this.CurrentView());

			this.SizeChanged.Add( this.Update );

			this.OnViewSplit().Add( function(original,views,orientation,flow){

				console.log('insert split handles....');

			});

			this.OnViewCreated().Add(this.Render);

			this.CurrentViewChanged.Add(this.ActivateView);

		};

		this.Count = function(){

			return this.Views().length;

		};

		this.IsEmpty  = function(){

			return this.Count() === 0;

		};

		this.Split = function( orientation, flow = CRect.FLOW_FIRST_TO_LAST ){

			if(this.IsEmpty()) {

				return;

			}

			var nView, cI = this.CurrentIndex(), cView = this.CurrentView(),  views     = [];

			if(!CRect.Split( views, this.Views()[cI].Rect(), orientation ))

			return false;

			if( flow === CRect.FLOW_LAST_TO_FIRST){

				nView = CreateView( views[0], orientation );

				AdjustView( cView,views[1]);

				views[1] = cView;

				views[0] = nView;

			}

			else{

				nView = CreateView(views[1], orientation);

				AdjustView( cView,views[0]);

				views[0] = cView;

				views[1] = nView;

			}

			m_.OnViewSplit.Emit([cView,views, orientation, flow]);

			m_.recent = [nView,cView];

			this.CurrentViewChanged.Emit([nView,cView]);

			return true;

		};

		this.OnViewSplit = function(){

			return m_.OnViewSplit;

		};

		this.OnViewCreated = function(){

			return m_.OnViewCreated;

		};

		this.OnViewJoin = function(){

			return m_.OnViewJoin;

		};

		this.OnViewMerge = function(){

			return m_.OnViewMerge;

		};

		this.OnViewHide = function(){

			return m_.OnViewHide;

		};

		this.OnViewShow = function(){

			return m_.OnViewShow;

		};

		this.SplitHorizontal    = function( flow = CRect.FLOW_FIRST_TO_LAST){

			return this.Split( CRect.SPLIT_HORIZONTALLY, flow );

		};

		this.SplitVertical    = function( flow = CRect.FLOW_FIRST_TO_LAST){

			return this.Split( CRect.SPLIT_VERTICALLY, flow );

		};

		this.Swap               = function( a, b ){

		};

		this.MergeLeft      = function(){

		};

		this.MergeRight     = function(){

		};

		this.MergeUp        = function(){

		};

		this.MergeDown      = function(){

		};

		/**

		* Splits the view Leftward.

		* @param {

			Number

		}

		index The view index to split.

		* @param {

			Number

		}

		percentage The split percentage. Default is 50.

		* Note that if the computed percentage is lesser than the minimum

		* view size, the operation will fail.

		* @return {

			Boolean

		}

		Returns true if the operation succeeded, false otherwize.

		*/

		this.SplitLeft      = function( ){

			return this.SplitHorizontal(CRect.FLOW_LAST_TO_FIRST);

		};

		/**

		* Splits the view Rightward.

		* @param {

			Number

		}

		index The view index to split.

		* @param {

			Number

		}

		percentage The split percentage. Default is 50.

		* Note that if the computed percentage is lesser than the minimum

		* view size, the operation will fail.

		* @return {

			Boolean

		}

		Returns true if the operation succeeded, false otherwize.

		*/

		this.SplitRight     = function( ){

			return this.SplitHorizontal( CRect.FLOW_FIRST_TO_LAST);

		};

		/**

		* Splits the view Upward.

		* @param {

			Number

		}

		index The view index to split.

		* @param {

			Number

		}

		percentage The split percentage. Default is 50.

		* Note that if the computed percentage is lesser than the minimum

		* view size, the operation will fail.

		* @return {

			Boolean

		}

		Returns true if the operation succeeded, false otherwize.

		*/

		this.SplitUp        = function( ){

			return this.SplitVertical( CRect.FLOW_LAST_TO_FIRST);

		};

		/**

		* Splits the view Downward.

		* @param {

			Number

		}

		index The view index to split.

		* @param {

			Number

		}

		percentage The split percentage. Default is 50.

		* Note that if the computed percentage is lesser than the minimum

		* view size, the operation will fail.

		* @return {

			Boolean

		}

		Returns true if the operation succeeded, false otherwize.

		*/

		this.SplitDown      = function( ){

			return this.SplitVertical( CRect.FLOW_FIRST_TO_LAST);

		};

		this.SwapLeft       = function(){

		};

		this.SwapRight      = function(){

		};

		this.SwapUp         = function(){

		};

		this.SwapDown       = function(){

		};

		this.JoinVertical   = function(){

		};

		this.MoveHandle     = function( index, pos ){

		};

		this.SetView        = function( index, widget ){

		};

		this.GetView        = function( index ){

		};

		this.SetWidget      = function( index, widget ){

		};

		this.GetWidget      = function( index ){

		};

		this.HideView       = function( index ){

		};

		this.ShowView       = function( index ){

		};

		this.SetViewResizeMode = function( index, resizeMode ){

		};

		this.SetViewMinimumSize = function( index, resizeMode ){

		};

		this.SetViewMaximumSize = function( index, resizeMode ){

		};

		this.Update         = function(){

			console.log('updating views....');

		}

		this.Init();

	}

	CSplitView.New = function( ){

		return new CSplitView(CRect.New());

	};

	qConstruct(CSplitView,"CSize",function( size){

		return new CSplitView( CRect.New(size));

	});

	qConstruct(CSplitView,"CRect",function( rect ){

		return new CSplitView(rect);

	});

	qConstruct(CSplitView,"Number,Number",function( width, height ){

		return new CSplitView( CRect.New(0,0,width,height));

	});

	return CSplitView;

});