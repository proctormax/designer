let strokes = (function($){

  const none = ( target )=>{
    $(target).style.border = "none";
  };
  const inherit = ( target )=>{
    $(target).style.borderColor = "inherit";
  };
  const transparent = ( target )=>{
    $(target).style.borderColor = "transparent";
  };
  const stroke = ( target, color )=>{
    $(target).style.borderColor = color;
  };

  const getDirection = ( direction )=>{
    let side;
    switch ( direction ){
      case 1: side = "-top"; break;
      case 2: side = "-bottom"; break;
      case 3: side = "-left"; break;
      case 4: side = "-right"; break;
      default:side = "";
    }
    return side;
  }
  const lineWidth = ( target, value=1, direction=0, unit="px" )=>{
    let border = "border"+getDirection(direction)+'-width';
    if(typeof value == "number")
      $(target).style[border] = value+unit;
  };
  const solidLine = ( target, color="black", direction=0 )=>{
    let border = "border"+getDirection(direction)+"-style";
    $(target).style[border] = `solid`;

    if(color)
      $(target).style[`${border}-color`] = `${color}`;
  };
  const solidTop = (target,color)=>solidLine(target,color,1);
  const solidBottom = (target,color)=>solidLine(target,color,2);
  const solidLeft = (target,color)=>solidLine(target,color,3);
  const solidRight = (target,color)=>solidLine(target,color,4);

  const dashedLine = ( target, color, direction=0 )=>{
    let border = "border"+getDirection(direction);
    $(target).style[border+"-style"] = `dashed`;

    if(color)
      $(target).style[`${border}-color`] = `${color}`;
  };
  const dashedTop    = (target,color)=>dashedLine(target,color,1);
  const dashedBottom = (target,color)=>dashedLine(target,color,2);
  const dashedLeft   = (target,color)=>dashedLine(target,color,3);
  const dashedRight  = (target,color)=>dashedLine(target,color,4);

  const dottedLine = ( target, color, direction=0 )=>{
    let border = "border"+getDirection(direction);
    $(target).style[border] = `dotted`;

    if(color)
      $(target).style[`${border}-color`] = `${color}`;

  };
  const dottedTop    = (target,color)=>dottedLine(target,color,1);
  const dottedBottom = (target,color)=>dottedLine(target,color,2);
  const dottedLeft   = (target,color)=>dottedLine(target,color,3);
  const dottedRight  = (target,color)=>dottedLine(target,color,4);

  const fill = ( target, color, direction=0 )=>{
    let border = "border"+getDirection(direction)+"-color";

    if(color)
      $(target).style[border] = `${color}`;

  };

  const style =() => {

  };
  const gaps    =() => {

  };
  let exports = {
      none, inherit, transparent,
      fill, style, gaps, lineWidth,
      dottedLine,
      dottedTop,
      dottedBottom,
      dottedLeft,
      dottedRight,

      dashedLine,
      dashedTop,
      dashedBottom,
      dashedLeft,
      dashedRight,

      solidLine,
      solidTop,
      solidBottom,
      solidLeft,
      solidRight,
  };

 return exports;
});
