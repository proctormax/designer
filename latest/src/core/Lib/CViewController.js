
  qPack("CViewContainer",( lib )=>{
     
      const CCoditService  = qRequire("CCoditService");      
      const CCSS           = qRequire("CCSS");
      const CPane          = qRequire("CPane");
      const CColorSwatch   = qRequire("CColorSwatch");
      const CLabel         = qRequire("CLabel");
      const CWidget        = qRequire("CWidget");
      const CRect          = qRequire("CRect");
      const CFrame         = qRequire("CFrame");
      const CSplitView     = qRequire("CSplitView");

      var global;
      let editors         = [ ];
      let Color = {
        Red:'#C00',
        OrangeRed:'#F41',
        Grey:'#CCC',
        Cyan:'#0CC',
        Green:'#0C0',
        DodgerBlue:'#16D',
      }
      
      let ColorHex = Object.values(Color);
      let Direction = {
          Left :"left",
          Right:"right",
          Up   :"up",
          Down :"down"
        };
        let OppositeDirection = {
          Left :"right",
          Right:"left",
          Up   :"down",
          Down :"up"
        };
  
        var R = 0, index, color;
  
        /**
         * Finds the neighboring view.
         * @param { Array< CView > } views the list of views to from
         * @param { Number } targetIndex the current view index to search against.
         * @param { String } direction The direction to look at.
         */
        let ViewDiectionIndex = {
          Call  : ['Left','Right','Top','Bottom'],
          left  : [2,3,1,0],
          right : [2,3,0,1],
          up    : [0,1,3,2],
          down  : [0,1,2,3]
        };
  
          
      function CViewContainer( rect ){
        qExtend(this,CFrame,rect);

      }
      /** the actions exported by this service */
  
      CViewContainer.prototype.CreateView = function ( rect ){    

          var box = new CPane( rect );
          CCSS.Remove(box,'ui-frame');
          //index = qRound(qRand(0,ColorHex.length-1),1);
          index = R++;
          color = `${ ColorHex[ index ]}`;
          box.DC().style["border"]      = 'solid 1px '+ CColorSwatch.DARK_GRAY;
          box.DC().style["background-color"]      =  CColorSwatch.DEEP_DARK_GRAY;
          box.DC().style["position"]    = 'absolute';
          box.DC().style["font-size"]   = '12px';
          box.DC().style["font-family"] = 'Seogui,sans-serif';
          box.DC().style["box-sizing"]  = 'border-box';
  
          var label = CLabel.New("View"+R,'test-tab');
          
          var corner = CWidget.New("i",'CIcon close');
  
          //corner.DC().style["background-color"] = CColorSwatch.DARK_GRAY;
  
          //label.DC().style["background-color"] = CColorSwatch.DARK_GRAY;
          
          box.ToolBar().DC().style["background-color"] = CColorSwatch.DARK_GRAY;
          
  
          corner.DC().style["padding"] = '5px';
  
          label.DC().style["padding"] = '5px';
  
          box.SetObjectName("View"+R);
  
          box.ToolBar().FirstItem().AddChild(label);
          box.ToolBar().LastItem().AddChild(corner);
          //DOM.Select('body').appendChild( box.DC() );
          console.log("--------------------@CViewContainer::CreateView --------------------------\n");
          console.log("--------------------------------------------------------------------------\n");
          console.log( box.Rect().Info());
          console.log("--------------------------------------------------------------------------\n");
          console.log("--------------------------------------------------------------------------\n");
          return box;
      };
      // SELECTION
      CViewContainer.prototype.Select  = (index)=>{            
        qAfter( Tick(),Splitter.SetCurrentIndex, [index] );            
      };          
  
      // SPLITTING VIEWS
      CViewContainer.prototype.SplitLeft = ( )=>{        
          qAfter( Tick(),()=>{SplitView(Splitter.CurrentIndex(),Direction.Left)});
      }
      CViewContainer.prototype.SplitRight = ( )=>{        
          qAfter( Tick(),()=>{SplitView(Splitter.CurrentIndex(),Direction.Right)});
      };
      CViewContainer.prototype.SplitUp = ( )=>{        
          qAfter( Tick(),()=>{SplitView(Splitter.CurrentIndex(),Direction.Up)});
      };
      CViewContainer.prototype.SplitDown = ( )=>{        
          qAfter( Tick(),()=>{SplitView(Splitter.CurrentIndex(),Direction.Down)});
      };
  
      // JOINING VIEWS
      CViewContainer.prototype.JoinLeft = ( )=>{        
          qAfter( Tick(),()=>{JoinView(Splitter.CurrentIndex(),Direction.Left)});
      }
      CViewContainer.prototype.JoinRight = ( )=>{        
          qAfter( Tick(),()=>{JoinView(Splitter.CurrentIndex(),Direction.Right)});
      };
      CViewContainer.prototype.JoinUp = ( )=>{        
          qAfter( Tick(),()=>{JoinView(Splitter.CurrentIndex(),Direction.Up)});
      };
      CViewContainer.prototype.JoinDown = ( )=>{        
          qAfter( Tick(),()=>{JoinView(Splitter.CurrentIndex(),Direction.Down)});
      };
  
      // INCREMENTING VIEWS
      CViewContainer.prototype.IncrementLeft = ( length=1 )=>{        
          qAfter( Tick(),()=>{IncrementView(Splitter.CurrentIndex(),Direction.Left, length)});
      };
      CViewContainer.prototype.IncrementRight = ( length=1 )=>{        
          qAfter( Tick(),()=>{IncrementView(Splitter.CurrentIndex(),Direction.Right, length)});
      };
      CViewContainer.prototype.IncrementUp = ( length=1 )=>{        
          qAfter( Tick(),()=>{IncrementView(Splitter.CurrentIndex(),Direction.Up, length)});
      };
      CViewContainer.prototype.IncrementDown = ( length=1 )=>{        
          qAfter( Tick(),()=>{IncrementView(Splitter.CurrentIndex(),Direction.Down, length)});
      };
      CViewContainer.prototype.SwapWith = ( index )=>{
        if( index != Splitter.CurrentIndex() )
          SwapViews( Splitter.CurrentIndex(), index);
      };
  
      /////////// PRIVATE
        function ClearBuffer( ){
          global.subviews.forEach(v=>{
            if(v.DC().parentNode) v.DC().parentNode.removeChild(v.DC());
          });
          if(global.subviews.length)global.subviews.splice(0, global.subviews.length);
          console.clear();
        }
        function RenderViews( surface, clear = false ){
          if(clear)ClearBuffer();
          global.subviews.forEach((e,index)=>{
            var v = CViewContainer.prototype.CreateView( e.Rect() );
            if(!v.Rect) return;
            v.DC().setAttribute("id","view-"+index);
            
            console.warn( v.Rect().Info() );
            surface.appendChild(v.DC());
            global.subviews[index] = v;
          });
        }
        CViewContainer.prototype.RenderViews = RenderViews;
        function ReadViews( views ){
          var res = [];
          views.forEach(v=> res.push(v.ObjectName()) );
          return res.toString();
        }
        function FindViewNeighborIndex( direction, targetIndex, views ){        
              var rec1 = views[targetIndex].Rect(), rect2;
              var F = ViewDiectionIndex[direction], res = -1;
              var Call = ViewDiectionIndex.Call;
              var A0 = rec1[Call[F[0]]]();
              var A1 = rec1[Call[F[1]]]();
              var A2 = rec1[Call[F[2]]]();
              var A3 = rec1[Call[F[3]]]();
              var C0 = Call[F[0]];
              var C1 = Call[F[1]];
              var C2 = Call[F[2]];
              var C3 = Call[F[3]];
              var c  = String.Capitalize(direction), B0, B1, B2, B3, OC = OppositeDirection[c];
              if( typeof ( Direction[c]) !== "string" ){ 
                console.error(direction,'not existant', c); 
                return -1;
              }
              console.log("FindViewNeighborIndex:::::::::");
              console.info( direction,'=>',C0,C1, C2, C3 );
              // Look it up.
              views.forEach(( v , i)=>{
                rect2 = v.Rect();
                if( i !== targetIndex ){
                  B0  = rect2[C0]();
                  B1  = rect2[C1]();
                  B2  = rect2[C2]();
                  B3  = rect2[C3]();
                  if( B0  === A0 && B1  === A1 && B2  === A3 )
                  {
                    console.warn(OC,targetIndex,"is",i );
                    return (res = i);
                  }
                }
              });
              return res;
        }

        
        /**
         * 
         * @param {Number} index the index to select in the viewsBuffer
         * @param {String} direction the direction the index will be placed.
         * @param {Array} views the buffer containing the views.
         */
        function JoinView( index, direction,  views = null ){
          var rect1, rect2, selection, newIndex, orientation, index2 = -1;
          
          // Init Vars /////////////////////
      
          if( views === null ) views = global.subviews;
      
          if( views.length < 2 ) return;
      
          if( index < 0 ) index = views.length -1;
          
          rect1  = views[index].Rect();
          
          index2 = FindViewNeighborIndex(direction, index, views );
          console.warn( "Found", direction, "in index", index2 );
          switch (direction) {
            case Direction.Left:
              orientation = 1;
              selection   = 0;
              views.forEach(( v , i)=>{
                if( i !== index ){
                  if( v.Rect().Bottom() === rect1.Bottom() && 
                      v.Rect().Top() === rect1.Top() &&
                      v.Rect().Right() === rect1.Left()
                    )
                  {
                    return (index2 = i);
                  }
                }
              });
              if( index2 < 0 || index2 >= views.length ) return;
      
              rect2    = views[index2].Rect();
      
              rect1.MoveLeft( rect2.Left());
              
              break;
            case Direction.Right:
              orientation = 1;
              selection   = 1;
              views.forEach(( v , i)=>{
                if( i !== index ){
                  if( v.Rect().Bottom() === rect1.Bottom() && 
                      v.Rect().Top() === rect1.Top() &&
                      v.Rect().Left() === rect1.Right()
                    )
                  {
                    return (index2 = i);
                  }
                }
              });
              
              if( index2 < 0 || index2 >= views.length ) return;
      
              rect2    = views[index2].Rect();
      
              rect1.MoveRight( rect2.Right());
              break;
            case Direction.Up:
              orientation = 2;
              selection   = 0;
              views.forEach(( v , i)=>{
                if( i !== index ){
                  if( v.Rect().Right()  === rect1.Right() && 
                      v.Rect().Left()   === rect1.Left() &&
                      v.Rect().Bottom() === rect1.Top()
                    )
                  {
                    return (index2 = i);
                  }
                }
              });
              
              if( index2 < 0 || index2 >= views.length ) return;
      
              rect1.MoveTop( views[index2].Rect().Top() );
      
              break;
            case Direction.Down:
              orientation = 2;
              selection   = 1;
              views.forEach(( v , i)=>{
                if( i !== index ){
                  if( v.Rect().Right()  === rect1.Right() && 
                      v.Rect().Left()   === rect1.Left() &&
                      v.Rect().Top() === rect1.Bottom()
                    )
                  {
                    return (index2 = i);
                  }
                }
              });
              
              if( index2 < 0 || index2 >= views.length ) return;
      
      
              rect1.MoveBottom( views[index2].Rect().Bottom() );
      
              
              break;
          
            default:
              return;
          }
          /* if( index2 < 0 || index2 >= views.length ) return;
      
          rect2    = views[index2].Rect();
           */
          //newIndex = selection==0?1:0;
          
          // CRect.Join( rect1,rect1, rect2,orientation);
          
          
          views[index].SetRect( rect1 );
      
          //Geom.SetRect(views[index], out[selection].M() );
      
          //views[index2].Hide();
          var vx = views[index].ObjectName();
          var v2 = views[index2].ObjectName();
          global.surface.DC().removeChild( views[index2].DC());
          views.splice( index2, 1 );
          console.log(`${vx} joined ${v2} ${direction} ,${v2} removed!`);
          console.log("You got",views.length,'views:',ReadViews(views));
        }
        /**
         * Divides a view into to and placed the indexed view on the direction specified.
         * @param {Number} index the view index number
         * @param {String} direction the direct the view index should be placed at.
         * @param {Array.<CView>} views the list of views.
         * @returns void
         */
        function SplitView( index, direction, views = null ){
          var rect, out, selection, newIndex, orientation, v2,vx, index2;
          
          // Init Vars /////////////////////
      
          if( views === null ) views = global.subviews;
          if( index < 0 ) index = views.length -1;
          if( IndexNotInRange(views,index)) return false;
          out   = [];
          
          rect  = views[index].Rect();
      
          switch (direction) {
            case Direction.Left:
              orientation = 1;
              selection   = 0;
              break;
            case Direction.Right:
              orientation = 1;
              selection   = 1;
              break;
            case Direction.Up:
              orientation = 2;
              selection   = 0;
              break;
            case Direction.Down:
              orientation = 2;
              selection   = 1;
              break;
          
            default:
              return;
          }
          
          newIndex = selection == 0 ? 1 : 0;
          
          CRect.Split( out,rect,orientation);
          if(out[0] !== undefined && out[1] !== undefined){
            
            
            views[index].SetRect( out[selection] );
        
            //Geom.SetRect(views[index], out[selection].M() );
            index2 = views.length; 
            //if( (qTypeOf(out[0],"CRect")  && qTypeOf(out[1],"CRect"))){}
  
              console.log("--------------------------------------------------------------\n");
              console.log("--------------------------------------------------------------\n");
              console.log("-------------------- LayoutManager.SplitView -----------------\n");
              console.log(out[0], out[1]);
              console.log("--------------------------------------------------------------\n");
              console.log("--------------------------------------------------------------\n");
              console.log("--------------------------------------------------------------\n");
    
                views[index2] = CViewContainer.prototype.CreateView(out[newIndex]);
            
                global.surface.AddChild( views[views.length-1]);
            
                
                vx = views[index].ObjectName();
                v2 = views[index2].ObjectName();
            
                console.log( vx,'split',direction+',',v2,"created!",);
                console.log("You got",views.length,'views:',ReadViews(views));
          }
          
          
        }
        /**
         * Checks if $index is out of range. and returns  true if index is 
         * in range, false otherwise.
         * @param {Array} views the list of views
         * @param {Number} index the index to check for.
         * @returns { Boolean }
         */
        function IndexNotInRange( views, index){
          return ( index < 0 || index >= views.length );
        }
        /**
         * Swaps two views positions. 
         * @param {CView} index1 the first view index
         * @param {CView} index2 the second view index
         * @param {Array} views the list of views
         */
        function SwapViews( index1, index2, views = null ){
          var tempView, tempRect;
          if( views === null ) views = global.subviews;
          if( views.length < 2 || IndexNotInRange( views, index1) || IndexNotInRange( views, index2) || index1 === index2 ) return;
      
          var vx = views[index1].ObjectName();
          var v2 = views[index2].ObjectName();
          
          tempView  = views[index1];
          views[index1] = views[index2];
          views[index2] = tempView;
          
          tempRect  = views[index1].Rect().Clone();
          views[index1].SetRect( views[index2].Rect());
          views[index2].SetRect( tempRect );
      
          console.log( 'Swapped',vx,'with',v2 );
          console.log("You got",views.length,'views:',ReadViews(views));
          
      
        }
        /**
         * Increments a target view by $length to the specified $direction
         * @param {Number} index the target view index.
         * @param {String} direction The incrementing direction.
         * @param {Number} length the length of incremention.
         * @param {!Array.<CView>} views The list of views to use.
         */
        function IncrementView( index, direction,  length,views = null ){
          views = views || global.subviews;
      
          if( views.length < 2 ) return true;
      
          if( IndexNotInRange(views,index) ) return true;
      
          var index2 = FindViewNeighborIndex( direction,index, views);
          direction = String.Capitalize(direction);
          var opposite = OppositeDirection[direction];
          opposite = opposite === "up"?"top": opposite === "down"?"bottom": opposite;
          opposite = String.Capitalize(opposite); /* */
          if( index2 < 0 ) return true;
      
      
          var vx = views[index].ObjectName();
          var v2 = views[index2].ObjectName();
        /*   const F1 = `Increment${direction}`;
          const F2 = `Increment${opposite}`;
       */
          var r1 = views[index ];
          var r2 = views[index2];
          
          switch ( direction.toLowerCase()) {
            case Direction.Left:
            r1.IncrementLeft( -length );
            r2.IncrementRight(-length );        
            break;
            case Direction.Right:
            r1.IncrementRight( length );
            r2.IncrementLeft(  length );        
            break;
            case Direction.Up:
            r1.IncrementTop(  -length );
            r2.IncrementBottom( -length );    
            break;    
            case Direction.Down:
            r1.IncrementBottom( length );
            r2.IncrementTop( length );        
            break;
          
            default:
              return false;
          }
          /* */
          console.log("Increment",vx,direction,"by",length,"\n-----------------------------------");
          console.log("Incremented",vx ,direction,"by",length);
          console.log("Incremented",v2,opposite ,"by",-length); 
        }
        /// PROPERTIES ///////////////////
        var Splitter = {};
            
        steps = [];
        const ViewAction = {
          // JOIN View
          JoinLeft  :"Splitter.JoinLeft",
          JoinRight :"Splitter.JoinRight",
          JoinUp    :"Splitter.JoinUp",
          JoinDown  :"Splitter.JoinDown",
          // SPLIT View
          SplitLeft  :"view.SplitLeft",
          SplitRight :"view.SplitRight",
          SplitUp    :"view.SplitUp",
          SplitDown  :"view.SplitDown",
          // SWAP
          Swap       :"view.Swap",
        }
        const AddStep = ( index, step )=>{
  
        }
        /**
         * Updates nTime by nCount on every call.
         */
        Splitter.time = 0;
        Splitter.Sec  = 0.5;
        Splitter.currentIndex = 0;
        
        const Tick = ()=>{ 
          return (Splitter.time += Splitter.Sec );
        };
        CViewContainer.Tick = Tick;
        /**
         * Gets next index
         */
        const Next = ()=>{ 
          return qMax(0,i+1);
        };
        /**
         * Gets previous index
         */
        const Previous = ()=>{ 
          return qMax(0,i-1);
        };
        const LastIndex = ()=>{ 
          return global.subviews.length - 1;
        };
  
        const GetRandomIndex = ( count, except )=>{ 
          var index = qRound(qRand( 0,count ),1);
          if( index === except ) return GetRandomIndex( count, except );
          return index;
        };
        Splitter.SetCurrentIndex = function( index ){
          Splitter.currentIndex = index;
        }
        Splitter.CurrentIndex  = ()=>{ return Splitter.currentIndex; };
        
        function SetParentView( view ){
          rootView = view;
        }
  

    return CViewContainer;
  });
 