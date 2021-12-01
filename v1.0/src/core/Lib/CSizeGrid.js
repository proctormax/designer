qPack("CSizeGrid",function(){

    const CSize = qRequire("CSize");
   // const Geom  = qRequire("Geom");

    function CSizeGrid( parent, length, cell_height, gap=1, padding=0 ){
        const $this = this;
        var m_parent = parent;
        //length -= padding * 2;
        this.Col = function( division = 1, yCount=1  ){
            var height = yCount * cell_height;
            if( yCount > 1 ) height += (yCount - 1 ) * gap;
            var w = length;
            if( division > 1 ){ 
                var n  = length - ((division * gap) - gap);
                w = n / division;
            }
            return new CSize( w, height  );
        };


       // parent.UiStyle.Set("padding",padding+"px");

        this.Add = function(divisions, cells, parent = m_parent ){
            m_parent = parent;

            if(m_parent)
            divisions.forEach((s,index) => {
                var w  = Math.floor(s);
                var h  = qRound(qAbs(w - s)  * 10);
                if( h < 1 ) h = 1;
                const item = cells[index];
                var size   = $this.Col(w,h);
               // item.SetText(w+":"+h);
                item.UiStyle.Set("width",size.Width()+size.Unit());
                item.UiStyle.Set("height",size.Height()+size.Unit());
                if( cells.length > 1 && index > 0){
                    //item.UiStyle.Set("margin-left",   gap+size.Unit());
                    item.UiStyle.Set("margin-left", (gap)+size.Unit());
                    //gap *= 0.2;
                }
                item.UiStyle.Set("margin-bottom", (gap)+size.Unit());
                m_parent.AddChild( item);
            });
        }
    }
    CSizeGrid.New = function( ){
        return new CSizeGrid();
    };
    /* 
    CGrid(parent);
    grid.Add([item1, item2],[2,2])
    grid.Add([item1, item2],[2,2])
    grid.Add([item1, item2],[2,2])
    grid.Add([item1],[1])
    */
    return CSizeGrid;
});