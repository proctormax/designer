qPack("UI.View.CSplitHandle", function( Cloud ){

	function CSplitHandle(orientation,splitter,thickness=2){

		var

		self      = this,

		m_       =

		{

			splitter: "CSplitView",

			orientation:"Number",

			thickness:"Number",

			first:"CRect",
			
			last:"CRect",

		};

		qExtend( this, CWidget, null,'span','ui-splitter-handle');

		qProperties(this, m_ );

		function ClosestLegalPosition(){

		}

		function MoveSplitter( int_pos ){

		}

		function OpaqueResize(){

			return m_.splitter.OpaqueResize();

		}

		function Update(){

			switch (m_.orientation) {

				case EOrientation.Horizontal:

				CCSS.Remove(self,'ui-splitter-handle-v size-h-full');

				CCSS.Add(self,'ui-splitter-handle-h size-w-full');

				self.DC().style.width = "100%";

				self.DC().style.height = m_.thickness+"pt";

				break;

				case EOrientation.Vertical:

				CCSS.Remove(self,'ui-splitter-handle-h size-w-full');

				CCSS.Add(self,'ui-splitter-handle-v size-h-full');

				self.DC().style.height = "100%";

				self.DC().style.width = m_.thickness+"pt";

				break;

				default:

				return false;

			}

			return self;

		}

		self.ClosestLegalPosition=ClosestLegalPosition;

		self.MoveSplitter=MoveSplitter;

		self.OpaqueResize=OpaqueResize;

		self.Update=Update;

		function MousePressEvent(e){

		};

		function MouseReleaseEvent(e){

		}

		function MouseMoveEvent(e){

		}

		function ResizeEvent(e){

		}

		function Init(){

			self.OrientationChanged.Add( Update );

			Connect(self,'onmousedown',MousePressEvent,null,0);

			Connect(self.Splitter(),'onmousemove',MouseMoveEvent,[null,self],0);

		}

		self.MousePressEvent=MousePressEvent;

		self.MouseReleaseEvent=MouseReleaseEvent;

		self.MouseMoveEvent=MouseMoveEvent;

		self.ResizeEvent=ResizeEvent;

		Init();

	}
	CSplitHandle.New = function( orientation, splitter ){
		return new CSplitHandle(orientation,splitter);
	};

	qConstruct(CSplitHandle,'Number,CSplitView,Number',function(orientation,splitter,thickness=2){

		return new CSplitHandle(orientation,splitter,thickness);

	});

	return  CSplitHandle

});