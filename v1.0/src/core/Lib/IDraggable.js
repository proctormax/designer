
/***
 * IDraggable
 * Used to locate data in a data model
**/
// CListViewRow
// CListViewColumn
//exports = CTableCell
qPack("IDraggable",function(){
	const CCSS = QB.CCSS;

	//qUsing(Lib.System);
	//qUsing(Lib.Util.CReadOnlyList);
	//qUsing(Lib.Util.CDynamicList);
	//qUsing(Lib.Util.CRandom);

	//var rand = new CRandom( Lib.System.CurrentTimeMillis());

	//rand.NextInt(101);
	/* const list = new CList(CWidget,50);
	list.Add(widget1);
	list.Add(widget1);
	list.Add(widget1);
	list.Add(widget1);
	list.Add(widget1);
	list.Add(widget1);

	if( list.IsEmpty() )
	list.Set(1,widget1);

	ui.Clicked.Add( btn.Set.Text, someText )

 */
	CCSS.New("IDraggable")
	.Add(".IDraggable",{
		//"border-bottom":"solid 1px #9992",
		//"padding":"1pt"
	})
	.Add(".IDraggable.Selected, .IDraggable.Seleted:hover",{
		"background-color":"#26A !important"
	})
	.Add(".IDraggable.Active, .IDraggable.Active:hover",{
		"color":"#FFF"
	})
	.Add(".IDraggable::before",{
		"content":"' '",
		"display":"block",
		"position":"absolute",
		"width":"inherit",
		"height":"100%",
		"top":"0",
		"left":"0",
	})
	.Add(".IDraggable.Odd",{
		//"background-color":"#aD48 !important",
	})
	.Add(".IDraggable.Even",{
		"background-color":"#2852 !important",
	})
	.Add(".IDraggable > span",{
		"padding"	:"1pt 2pt",
		"min-width"	:"40px",
		"overflow"	:"hidden",
		"position"	:"relative",
		"display"	:"inline-block",
	})
	function IDraggable( target , row=0 ){
		qObjectify(this);
	}
	
	qEnums( IDraggable,{
		DragState	:{"DragStarted":0, "DragMoving":1, "Dropped":2},
		DragAxis	:{"Horizontal":1,"Vertical":2,"All":0},
		DragAction	:{"NoDragAction":0,"CopyAction":1,"MoveAction":2},
		DragButtons	:{LMB:0,MMB:1,RMB:2},
	});

	qSignals( IDraggable,{
		DragStarted	:{position:"CPoint", timeStamp:"Number"},
		DragEnded	:{position:"CPoint", timeStamp:"Number"},
		DragMoved	:{position:"CPoint", timeStamp:"Number"},
		DragEntered	:{position:"CPoint", timeStamp:"Number"},
		DragLeft	:{position:"CPoint", timeStamp:"Number"},
	});


    qSetProperties( IDraggable,{        
        DragState     :{type:"DragState",   default:"DragMoving", emits:"Changed", emission: {type:"String"}},
        DragEnabled   :{type:"Boolean",     default:false},
        DropEnabled   :{type:"Boolean",     default:false},
        DragAxis      :{type:"Horientation",default:"All"},
        DragAction    :{type:"DragAction",  default:"Ignores"}, 
		DragButtons   :{type:"Number",      default:0},
        DragHandle    :{type:"CWidget",     default:null},
        DragPosition  :{type:"CPoint",      default:null},
        DragSource    :{type:"Object",      default:null},
        DragZone      :{type:"CRect",       default:null},
	});
	

	qInterface( IDraggable,{
		DragStartEvent:{returns:"void", syntax:{event:"CDragStartEvent"}},         
		DragLeaveEvent:{returns:"void", syntax:{event:"CDragLeaveEvent"}},         
		DragMoveEvent :{returns:"void", syntax:{event:"CDragMoveEvent"}},        
		DragEndEvent  :{returns:"void", syntax:{event:"CDragEndEvent"}},       
		DropEvent     :{returns:"void", syntax:{event:"CDropEvent"}},    
	});

	IDraggable.prototype.MousePressEvent = function(e){
        if( !this.DragEnabled() ) return;
        var drag = new CDrag( this );
        this.DragEnterEvent( event );
	};
	IDraggable.prototype.MouseMoveEvent = function(e){
        if( !this.DragEnabled() ) return;
        //var drag 		= new CDrag( this );
		//var data 		= "some text from the field";
		//const mimeType 	= "text";
		//var mimeData 	= new CMimeData(mimeType, data);
		//drag.SetMimeData( mimeData );
		//var dropAction = drag.Exec( IDraggable.DragAction.CopyAction | IDraggable.DragAction.MoveAction );
		//var dragMoveEvent = new CDragMoveEvent(this, drag );
	};
	IDraggable.prototype.MouseReleaseEvent = function(e){
        //if( !this.DragEnabled() ) return;
       // var event = new CDragEvent();
       // this.DragEnterEvent( event );
	};
	IDraggable.prototype.DragStartEvent = function(e){
        //if( !this.DragEnabled() ) return;
		
	};
	IDraggable.prototype.DragLeaveEvent = function(e){
        //if( !this.DragEnabled() ) return;
       // this.DragEnterEvent( event );
		
	};
	IDraggable.prototype.DragEnterEvent = function(e){
              
		//if( e.MimeData.HasFormat("text/plain")){
		//	e.AcceptDropAction();
		//}
	};
	IDraggable.prototype.DragMoveEvent = function(e){
              
		
	};
	IDraggable.prototype.DragEndEvent = function(e){
        if( !this.DragEnabled() ) return;
        //var event = new CDropEvent();
		//this.DragEnterEvent( event );		
		
	};
    
    IDraggable.prototype.DropEvent = function(e){
		
		if( e.DropAction() == "copy" && e.MimeType() == "CWidget" && e.DragSource() != this ){
			// 
		}
	};

	// onMouseRelease: => drag.Drop();
	// view.RowPressed
	// view.RowReleased
	// view.AboutToChangeCurrentIndex
	// view.CurrentIndexChanged
	// view.ItemActivated
	IDraggable.New = (view,row=0)=>{
		return new IDraggable(view,row );
	};
	return IDraggable;
});