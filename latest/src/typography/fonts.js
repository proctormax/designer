let fonts = (function ($){
  const fill = (target, color )=>{
    $(target).style.color = color;
  };
  const color = (target, color )=>{
    $(target).style.color = color;
  };
  const size = (target, size, unit = 'rem')=>{
    $(target).style.fontSize = size + unit;
  };
  const family = (target, fontFamily)=>{
    $(target).style.fontFamily = fontFamily;
  };
  const weight = (target, weight = "bold" )=>{
    $(target).style.fontWeight = weight;
  };
  const italicize = (target, enabled = true )=>{
    $(target).style.fontStyle = 'italic';
  };
  const style = (target, style = 'bold-italic' )=>{

  };

  return {fill,color, size, family, style, weight, italicize };
});
