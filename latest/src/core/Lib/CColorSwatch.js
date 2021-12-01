qPack('CColorSwatch',function(){
    function CColorSwatch(name,rows,cols){
        var _field  = {
            region:"String",
            primary:"String",
            background:"String",
            bright:"String",
            dark:"String",
        };
        INIT_PROPERTIES(this, _field);
        this.SetCell = function( r,c, value ){
            
        }
        this.Cell = function( r,c ){

        };
    }
    CColorSwatch.DEEP_DARK_GRAY = "rgb(8,8,8)";
    CColorSwatch.MID_DARK_GRAY      = "rgb(31,31,31)";
    CColorSwatch.DARK_GRAY    = "rgb(13,13,13)";
    CColorSwatch.MID_DARK_GRAY  = "rgb(17,17,17)";
    CColorSwatch.DARK_BLUE      = "rgb(24,115,207)";
    CColorSwatch.New = function(name,from,to){ return new CColorSwatch(name,from,to);};
    return CColorSwatch;
});