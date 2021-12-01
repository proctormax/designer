qPack("Event.CEvent", function( Cloud ){
 const _eventTypes = [];
	function CEvent(target = null, type = "click" ){

		var  _ =

		{

			handlers: [],

			idList: [],

			Exec:null,

			parentList: [],

			accepted:true,

			type: type,

			this: this,

			uid:  type + Date.now().toString()

		};

		this._CEvent = function(){

			for( var i in _){

				delete _[i];

			}

			delete _;

		};

		this.EID = function(){

			return _.uid;

		};

		this.Type = function(){

			return _.type;

		};

		this.HasLinked = function(uid){

			for(var i=0;i < _.parentList.length;i  ){

				var p = _.parentList[i];

				if( p.uid === uid ){

					return true;

				}

			}

			return false;

		};

		/***

		* @info     Adds a widget to this event's widgetList.

		* @param    func:Function The callback function to listen to this event.

		* @param    args:Array An array containing arguments to pass to the callback function if any.

		* @note     To insert an event param into this array, simply preceed the desired argument name by a percentage(%) sign.

		*           For example, To pass this event's target passed as argument into the $args array. Type: myevent.Add(myCallback,['%target',myArg2 ]).

		* @return   String

		*/

		this.Link = function(target, pd=false, pg=true, bubbles=true){

			if(this.HasLinked(target.UID())) return;

			_.parentList.push({

				uid:target.UID(),target:target,pd:pd,pg:pg,bubbles:bubbles

			});

			target.ui.addEventListener(type,_.Exec=function(e){

				for( var i =0;i< _.handlers.length; i  ){

					var cb = _.handlers[i];

					if(cb.args !== null ){

						var r=[],j = cb.args.indexOf("%event");

						var d = cb.args.indexOf("%nodef");

						var p = cb.args.indexOf("%noprop");

						var t = cb.args.indexOf("%targetWidget");

						if(d>=0) e.preventDefault();

						if(p>=0) e.preventPropagation();

						for(var a=0;a<cb.args.length;a  ){

							if( a === t ) r[a] =  target;

							else if( a === j ) r[a] = e;

							else r[a] = cb.args[a];

						}

						cb.func.apply(null,r);

					}

					else{

						cb.func();

					}

				}

			});

		};

		this.Unlink = function(uid){

			for(var i=0;i < _.parentList.length;i  ){

				var p = _.parentList[i];

				if( p.uid === uid ){

					p.target.ui.addEventListener(_.type,_.Exec );

					return _.parentList.splice(i,1);

				}

			}

			return null;

		};

		this.GetLinked = function(uid){

			for(var i=0;i < _.parentList.length;i  ){

				var p = _.parentList[i];

				if( p.uid === uid ){

					return p.target;

				}

			}

			return null;

		};

		/***

		* @info     Adds func to the event handler chain and returns a unique Id that can be used later to remove the handler func from the handler chain.

		* @param    func:Function The callback function to listen to this event.

		* @param    args:Array An array containing arguments to pass to the callback function if any.

		* @note     To insert an event param into this array, simply preceed the desired argument name by a percentage(%) sign. For example, To pass this event's target passed as argument into the $args array. Type: myevent.Add(myCallback,['%target',myArg2 ]).

		* @return   String

		*/

		this.Add = function(func, args=null){

			_.handlers.push({

				func:func,args:args

			});

			var

			id = Date.now()+ "listener";

			_.idList.push(id);

			return id;

		};

		/***

		* @info     Removes an event handler from the handler chain and returns that handler or NULL if the handler doesn't exist or was already removed from the handler chain.

		* @param    id:String The target handler's id created when calling the event.Add function.

		* @note     To remove an event hangler/callback from the handler chain, simply type: mycallback = myEvent.Remove( myCallbackId );

		* @return   Function

		*/

		this.Remove = function(id){

			var i = _.idList.indexOf(id);

			if( i > -1 ){

				_.idList.splice(i,1);

				return _.handlers.splice(i,1);

			}

			return null;

		};

		this.Accept = function(){

			_.accepted = true;

		};

		this.IsAccept = function(){

			_.accepted;

		};

		this.Ignore = function(){

			_.accepted = false;

		};

		this.SetAcceped = function( accepted ){

			_.accepted = accepted;

		};

		this.Spontaneous= function(){

			return false;

		};

		if(target){

			this.Link(target);

		}

	};

	CEvent.RegisterEventType = function( hint = -1 ){

		if(_eventTypes.indexOf(hint)>=0) throw "CEvent::RegisterEventType Error! hint provided is already registered by a different event type.";

		_eventTypes.push(hint);

		return hint;

	};

	CEvent.None =	CEvent.RegisterEventType(0); //	Not an event.

	CEvent.ActionAdded =	CEvent.RegisterEventType(114); //	A new action has been added (QActionEvent).

	CEvent.ActionChanged =	CEvent.RegisterEventType(113); //	An action has been changed (QActionEvent).

	CEvent.ActionRemoved =	CEvent.RegisterEventType(115); //	An action has been removed (QActionEvent).

	CEvent.ActivationChange =	CEvent.RegisterEventType(99); //	A widget's top-level window activation state has changed.

	CEvent.ApplicationFontChange =	CEvent.RegisterEventType(36); //	The default application font has changed.

	CEvent.ApplicationLayoutDirectionChange =	CEvent.RegisterEventType(37); //	The default application layout direction has changed.

	CEvent.ApplicationPaletteChange =	CEvent.RegisterEventType(38); //	The default application palette has changed.

	CEvent.ApplicationStateChange =	CEvent.RegisterEventType(214); //	The state of the application has changed.

	CEvent.ApplicationWindowIconChange =	CEvent.RegisterEventType(35); //	The application's icon has changed.

	CEvent.ChildAdded =	CEvent.RegisterEventType(68); //	An object gets a child (QChildEvent).

	CEvent.ChildPolished =	CEvent.RegisterEventType(69); //	A widget child gets polished (QChildEvent).

	CEvent.ChildRemoved =	CEvent.RegisterEventType(71); //	An object loses a child (QChildEvent).

	CEvent.Clipboard =	CEvent.RegisterEventType(40); //	The clipboard contents have changed.

	CEvent.Close =	CEvent.RegisterEventType(19); //	Widget was closed (QCloseEvent).

	CEvent.CloseSoftwareInputPanel =	CEvent.RegisterEventType(200); //	A widget wants to close the software input panel (SIP).

	CEvent.ContentsRectChange =	CEvent.RegisterEventType(178); //	The margins of the widget's content rect changed.

	CEvent.ContextMenu =	CEvent.RegisterEventType(82); //	Context popup menu (QContextMenuEvent).

	CEvent.CursorChange =	CEvent.RegisterEventType(183); //	The widget's cursor has changed.

	CEvent.DeferredDelete =	CEvent.RegisterEventType(52); //	The object will be deleted after it has cleaned up (QDeferredDeleteEvent)

	CEvent.DragEnter =	CEvent.RegisterEventType(60); //	The cursor enters a widget during a drag and drop operation (QDragEnterEvent).

	CEvent.DragLeave =	CEvent.RegisterEventType(62); //	The cursor leaves a widget during a drag and drop operation (QDragLeaveEvent).

	CEvent.DragMove =	CEvent.RegisterEventType(61); //	A drag and drop operation is in progress (QDragMoveEvent).

	CEvent.Drop =	CEvent.RegisterEventType(63); //	A drag and drop operation is completed (QDropEvent).

	CEvent.DynamicPropertyChange =	CEvent.RegisterEventType(170); //	A dynamic property was added, changed, or removed from the object.

	CEvent.EnabledChange =	CEvent.RegisterEventType(98); //	Widget's enabled state has changed.

	CEvent.Enter =	CEvent.RegisterEventType(10); //	Mouse enters widget's boundaries (QEnterEvent).

	CEvent.EnterEditFocus =	CEvent.RegisterEventType(150); //	An editor widget gains focus for editing. QT_.KEYPAD_.NAVIGATION must be defined.

	CEvent.EnterWhatsThisMode =	CEvent.RegisterEventType(124); //	Send to toplevel widgets when the application enters "What's This?" mode.

	CEvent.Expose =	CEvent.RegisterEventType(206); //	Sent to a window when its on-screen contents are invalidated and need to be flushed from the backing store.

	CEvent.FileOpen =	CEvent.RegisterEventType(116); //	File open request (QFileOpenEvent).

	CEvent.FocusIn =	CEvent.RegisterEventType(8); //	Widget or Window gains keyboard focus (QFocusEvent).

	CEvent.FocusOut =	CEvent.RegisterEventType(9); //	Widget or Window loses keyboard focus (QFocusEvent).

	CEvent.FocusAboutToChange =	CEvent.RegisterEventType(23); //	Widget or Window focus is about to change (QFocusEvent)

	CEvent.FontChange =	CEvent.RegisterEventType(97); //	Widget's font has changed.

	CEvent.Gesture =	CEvent.RegisterEventType(198); //	A gesture was triggered (QGestureEvent).

	CEvent.GestureOverride =	CEvent.RegisterEventType(202); //	A gesture override was triggered (QGestureEvent).

	CEvent.GrabKeyboard =	CEvent.RegisterEventType(188); //	Item gains keyboard grab (QGraphicsItem only).

	CEvent.GrabMouse =	CEvent.RegisterEventType(186); //	Item gains mouse grab (QGraphicsItem only).

	CEvent.GraphicsSceneContextMenu =	CEvent.RegisterEventType(159); //	Context popup menu over a graphics scene (QGraphicsSceneContextMenuEvent).

	CEvent.GraphicsSceneDragEnter =	CEvent.RegisterEventType(164); //	The cursor enters a graphics scene during a drag and drop operation (QGraphicsSceneDragDropEvent).

	CEvent.GraphicsSceneDragLeave =	CEvent.RegisterEventType(166); //	The cursor leaves a graphics scene during a drag and drop operation (QGraphicsSceneDragDropEvent).

	CEvent.GraphicsSceneDragMove =	CEvent.RegisterEventType(165); //	A drag and drop operation is in progress over a scene (QGraphicsSceneDragDropEvent).

	CEvent.GraphicsSceneDrop =	CEvent.RegisterEventType(167); //	A drag and drop operation is completed over a scene (QGraphicsSceneDragDropEvent).

	CEvent.GraphicsSceneHelp =	CEvent.RegisterEventType(163); //	The user requests help for a graphics scene (QHelpEvent).

	CEvent.GraphicsSceneHoverEnter =	CEvent.RegisterEventType(160); //	The mouse cursor enters a hover item in a graphics scene (QGraphicsSceneHoverEvent).

	CEvent.GraphicsSceneHoverLeave =	CEvent.RegisterEventType(162); //	The mouse cursor leaves a hover item in a graphics scene (QGraphicsSceneHoverEvent).

	CEvent.GraphicsSceneHoverMove =	CEvent.RegisterEventType(161); //	The mouse cursor moves inside a hover item in a graphics scene (QGraphicsSceneHoverEvent).

	CEvent.GraphicsSceneMouseDoubleClick =	CEvent.RegisterEventType(158); //	Mouse press again (double click) in a graphics scene (QGraphicsSceneMouseEvent).

	CEvent.GraphicsSceneMouseMove =	CEvent.RegisterEventType(155); //	Move mouse in a graphics scene (QGraphicsSceneMouseEvent).

	CEvent.GraphicsSceneMousePress =	CEvent.RegisterEventType(156); //	Mouse press in a graphics scene (QGraphicsSceneMouseEvent).

	CEvent.GraphicsSceneMouseRelease =	CEvent.RegisterEventType(157); //	Mouse release in a graphics scene (QGraphicsSceneMouseEvent).

	CEvent.GraphicsSceneMove =	CEvent.RegisterEventType(182); //	Widget was moved (QGraphicsSceneMoveEvent).

	CEvent.GraphicsSceneResize =	CEvent.RegisterEventType(181); //	Widget was resized (QGraphicsSceneResizeEvent).

	CEvent.GraphicsSceneWheel =	CEvent.RegisterEventType(168); //	Mouse wheel rolled in a graphics scene (QGraphicsSceneWheelEvent).

	CEvent.Hide =	CEvent.RegisterEventType(18); //	Widget was hidden (QHideEvent).

	CEvent.HideToParent =	CEvent.RegisterEventType(27); //	A child widget has been hidden.

	CEvent.HoverEnter =	CEvent.RegisterEventType(127); //	The mouse cursor enters a hover widget (QHoverEvent).

	CEvent.HoverLeave =	CEvent.RegisterEventType(128); //	The mouse cursor leaves a hover widget (QHoverEvent).

	CEvent.HoverMove =	CEvent.RegisterEventType(129); //	The mouse cursor moves inside a hover widget (QHoverEvent).

	CEvent.IconDrag =	CEvent.RegisterEventType(96); //	The main icon of a window has been dragged away (QIconDragEvent).

	CEvent.IconTextChange =	CEvent.RegisterEventType(101); //	Widget's icon text has been changed. (Deprecated)

	CEvent.InputMethod =	CEvent.RegisterEventType(83); //	An input method is being used (QInputMethodEvent).

	CEvent.InputMethodQuery =	CEvent.RegisterEventType(207); //	A input method query event (QInputMethodQueryEvent)

	CEvent.KeyboardLayoutChange =	CEvent.RegisterEventType(169); //	The keyboard layout has changed.

	CEvent.KeyPress =	CEvent.RegisterEventType(6); //	Key press (QKeyEvent).

	CEvent.KeyRelease =	CEvent.RegisterEventType(7); //	Key release (QKeyEvent).

	CEvent.LanguageChange =	CEvent.RegisterEventType(89); //	The application translation changed.

	CEvent.LayoutDirectionChange =	CEvent.RegisterEventType(90); //	The direction of layouts changed.

	CEvent.LayoutRequest =	CEvent.RegisterEventType(76); //	Widget layout needs to be redone.

	CEvent.Leave =	CEvent.RegisterEventType(11); //	Mouse leaves widget's boundaries.

	CEvent.LeaveEditFocus =	CEvent.RegisterEventType(151); //	An editor widget loses focus for editing. QT_.KEYPAD_.NAVIGATION must be defined.

	CEvent.LeaveWhatsThisMode =	CEvent.RegisterEventType(125); //	Send to toplevel widgets when the application leaves "What's This?" mode.

	CEvent.LocaleChange =	CEvent.RegisterEventType(88); //	The system locale has changed.

	CEvent.NonClientAreaMouseButtonDblClick =	CEvent.RegisterEventType(176); //	A mouse double click occurred outside the client area.

	CEvent.NonClientAreaMouseButtonPress =	CEvent.RegisterEventType(174); //	A mouse button press occurred outside the client area.

	CEvent.NonClientAreaMouseButtonRelease =	CEvent.RegisterEventType(175); //	A mouse button release occurred outside the client area.

	CEvent.NonClientAreaMouseMove =	CEvent.RegisterEventType(173); //	A mouse move occurred outside the client area.

	CEvent.MacSizeChange =	CEvent.RegisterEventType(177); //	The user changed his widget sizes (macOS only).

	CEvent.MetaCall =	CEvent.RegisterEventType(43); //	An asynchronous method invocation via QMetaObject::invokeMethod().

	CEvent.ModifiedChange =	CEvent.RegisterEventType(102); //	Widgets modification state has been changed.

	CEvent.MouseButtonDblClick =	CEvent.RegisterEventType(4); //	Mouse press again (QMouseEvent).

	CEvent.MouseButtonPress =	CEvent.RegisterEventType(2); //	Mouse press (QMouseEvent).

	CEvent.MouseButtonRelease =	CEvent.RegisterEventType(3); //	Mouse release (QMouseEvent).

	CEvent.MouseMove =	CEvent.RegisterEventType(5); //	Mouse move (QMouseEvent).

	CEvent.MouseTrackingChange =	CEvent.RegisterEventType(109); //	The mouse tracking state has changed.

	CEvent.Move =	CEvent.RegisterEventType(13); //	Widget's position changed (QMoveEvent).

	CEvent.NativeGesture =	CEvent.RegisterEventType(197); //	The system has detected a gesture (QNativeGestureEvent).

	CEvent.OrientationChange =	CEvent.RegisterEventType(208); //	The screens orientation has changes (QScreenOrientationChangeEvent).

	CEvent.Paint =	CEvent.RegisterEventType(12); //	Screen update necessary (QPaintEvent).

	CEvent.PaletteChange =	CEvent.RegisterEventType(39); //	Palette of the widget changed.

	CEvent.ParentAboutToChange =	CEvent.RegisterEventType(131); //	The widget parent is about to change.

	CEvent.ParentChange =	CEvent.RegisterEventType(21); //	The widget parent has changed.

	CEvent.PlatformPanel =	CEvent.RegisterEventType(212); //	A platform specific panel has been requested.

	CEvent.PlatformSurface =	CEvent.RegisterEventType(217); //	A native platform surface has been created or is about to be destroyed (QPlatformSurfaceEvent).

	CEvent.Polish =	CEvent.RegisterEventType(75); //	The widget is polished.

	CEvent.PolishRequest =	CEvent.RegisterEventType(74); //	The widget should be polished.

	CEvent.QueryWhatsThis =	CEvent.RegisterEventType(123); //	The widget should accept the event if it has "What's This?" help.

	CEvent.ReadOnlyChange =	CEvent.RegisterEventType(106); //	Widget's read-only state has changed (since Qt 5.4).

	CEvent.RequestSoftwareInputPanel =	CEvent.RegisterEventType(199); //	A widget wants to open a software input panel (SIP).

	CEvent.Resize =	CEvent.RegisterEventType(14); //	Widget's size changed (QResizeEvent).

	CEvent.ScrollPrepare =	CEvent.RegisterEventType(204); //	The object needs to fill in its geometry information (QScrollPrepareEvent).

	CEvent.Scroll =	CEvent.RegisterEventType(205); //	The object needs to scroll to the supplied position (QScrollEvent).

	CEvent.Shortcut =	CEvent.RegisterEventType(117); //	Key press in child for shortcut key handling (QShortcutEvent).

	CEvent.ShortcutOverride =	CEvent.RegisterEventType(51); //	Key press in child, for overriding shortcut key handling (QKeyEvent).

	CEvent.Show =	CEvent.RegisterEventType(17); //	Widget was shown on screen (QShowEvent).

	CEvent.ShowToParent =	CEvent.RegisterEventType(26); //	A child widget has been shown.

	CEvent.SockAct =	CEvent.RegisterEventType(50); //	Socket activated, used to implement QSocketNotifier.

	CEvent.StateMachineSignal =	CEvent.RegisterEventType(192); //	A signal delivered to a state machine (QStateMachine::SignalEvent).

	CEvent.StateMachineWrapped =	CEvent.RegisterEventType(193); //	The event is a wrapper for, i.e., contains, another event (QStateMachine::WrappedEvent).

	CEvent.StatusTip =	CEvent.RegisterEventType(112); //	A status tip is requested (QStatusTipEvent).

	CEvent.StyleChange =	CEvent.RegisterEventType(100); //	Widget's style has been changed.

	CEvent.TabletMove =	CEvent.RegisterEventType(87); //	Wacom tablet move (QTabletEvent).

	CEvent.TabletPress =	CEvent.RegisterEventType(92); //	Wacom tablet press (QTabletEvent).

	CEvent.TabletRelease =	CEvent.RegisterEventType(93); //	Wacom tablet release (QTabletEvent).

	CEvent.OkRequest =	CEvent.RegisterEventType(94); //	Ok button in decoration pressed. Supported only for Windows CE.

	CEvent.TabletEnterProximity =	CEvent.RegisterEventType(171); //	Wacom tablet enter proximity event (QTabletEvent), sent to QApplication.

	CEvent.TabletLeaveProximity =	CEvent.RegisterEventType(172); //	Wacom tablet leave proximity event (QTabletEvent), sent to QApplication.

	CEvent.ThreadChange =	CEvent.RegisterEventType(22); //	The object is moved to another thread. This is the last event sent to this object in the previous thread. See QObject::moveToThread().

	CEvent.Timer =	CEvent.RegisterEventType(1); //	Regular timer events (QTimerEvent).

	CEvent.ToolBarChange =	CEvent.RegisterEventType(120); //	The toolbar button is toggled on macOS.

	CEvent.ToolTip =	CEvent.RegisterEventType(110); //	A tooltip was requested (QHelpEvent).

	CEvent.ToolTipChange =	CEvent.RegisterEventType(184); //	The widget's tooltip has changed.

	CEvent.TouchBegin =	CEvent.RegisterEventType(194); //	Beginning of a sequence of touch-screen or track-pad events (QTouchEvent).

	CEvent.TouchCancel =	CEvent.RegisterEventType(209); //	Cancellation of touch-event sequence (QTouchEvent).

	CEvent.TouchEnd =	CEvent.RegisterEventType(196); //	End of touch-event sequence (QTouchEvent).

	CEvent.TouchUpdate =	CEvent.RegisterEventType(195); //	Touch-screen event (QTouchEvent).

	CEvent.UngrabKeyboard =	CEvent.RegisterEventType(189); //	Item loses keyboard grab (QGraphicsItem only).

	CEvent.UngrabMouse =	CEvent.RegisterEventType(187); //	Item loses mouse grab (QGraphicsItem, QQuickItem).

	CEvent.UpdateLater =	CEvent.RegisterEventType(78); //	The widget should be queued to be repainted at a later time.

	CEvent.UpdateRequest =	CEvent.RegisterEventType(77); //	The widget should be repainted.

	CEvent.WhatsThis =	CEvent.RegisterEventType(111); //	The widget should reveal "What's This?" help (QHelpEvent).

	CEvent.WhatsThisClicked =	CEvent.RegisterEventType(118); //	A link in a widget's "What's This?" help was clicked.

	CEvent.Wheel =	CEvent.RegisterEventType(31); //	Mouse wheel rolled (QWheelEvent).

	CEvent.WinEventAct =	CEvent.RegisterEventType(132); //	A Windows-specific activation event has occurred.

	CEvent.WindowActivate =	CEvent.RegisterEventType(24); //	Window was activated.

	CEvent.WindowBlocked =	CEvent.RegisterEventType(103); //	The window is blocked by a modal dialog.

	CEvent.WindowDeactivate =	CEvent.RegisterEventType(25); //	Window was deactivated.

	CEvent.WindowIconChange =	CEvent.RegisterEventType(34); //	The window's icon has changed.

	CEvent.WindowStateChange =	CEvent.RegisterEventType(105); //	The window's state (minimized, maximized or full-screen) has changed (QWindowStateChangeEvent).

	CEvent.WindowTitleChange =	CEvent.RegisterEventType(33); //	The window title has changed.

	CEvent.WindowUnblocked =	CEvent.RegisterEventType(104); //	The window is unblocked after a modal dialog exited.

	CEvent.WinIdChange =	CEvent.RegisterEventType(203); //	The window system identifer for this native widget has changed.

	CEvent.ZOrderChange =	CEvent.RegisterEventType(126); //	The widget's z-order has changed. This event is never sent to top level windows.

	CEvent.User  	= CEvent.RegisterEventType(1000); // User-defined event.

	CEvent.MaxUser 	= CEvent.RegisterEventType(65535); // Last user event ID;

	return CEvent;

});