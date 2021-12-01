let typography = (function ($){
  const fill = (target, color )=>{
    $(target).style.color = color;
  };
  const size = (target, size, unit = 'rem')=>{
    $(target).style.fontSize = size + unit;
  };
  const font = (target, fontFamily)=>{
    $(target).style.fontFamily = fontFamily;
  };
  return {fill, size, font };
});
