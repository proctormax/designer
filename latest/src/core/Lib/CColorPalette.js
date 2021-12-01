qPack('CColorPalette',function(){
    function CColorPalette(name,region,primary,background,bright,dark){
        var _field  = {
            region:"String",
            primary:"String",
            background:"String",
            bright:"String",
            dark:"String",
        };
        INIT_PROPERTIES(this, _field);
    }
    CColorPalette.DARK   = "#313131";
    CColorPalette.DARKER = "#131313";
    CColorPalette.New = function(name,from,to){ return new CColorPalette(name,from,to);};
    return CColorPalette;
});