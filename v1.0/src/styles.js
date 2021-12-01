
let styles = (function( $ ){
  const fill = (target, color) =>{
    $(target).style.backgroundColor = color;
  };
  const stroke = (target, color) =>{
    $(target).style.borderColor = color;
  };
  const text = (target, color) =>{
    $(target).style.color = color;
  };
  const padding = (target, value, unit="px") =>{
    $(target).style.padding = `${value+unit}`;
  };
  const margin = (target, value, unit="px") =>{
    $(target).style.margin = `${value+unit}`;
  };

  const radius = (target, tl=1, tr=null, br=null, bl=null ) =>{
    $(target).style.borderRadius = `${tl}px` ;
  };

  return { fill, stroke, text, radius, padding, margin};
});
