let transform = (function( $ ){
  const translate = (target, x, y, unit="px") =>{
    $(target).style.left = x + unit;
    $(target).style.top  = y + unit;
  };

  const rotate = (target, x, y, unit="px") => {
    $(target).style.transform.rotate = x + unit;
    $(target).style.top  = y + unit;
  };

  const scale = (target, x, y, unit="px") =>{
    $(target).style.scale = x + unit;
  };

  const resize = (target, w, h, unit='px')=>{
    $(target).style.width = `${w+unit}`;
    $(target).style.height = `${h+unit}`;
  };

  const width = (target, w, unit='px')=>{
    $(target).style.width = `${w+unit}`;
  };
  const height = (target, h, unit='px')=>{
    $(target).style.height = `${h+unit}`;
  };

  const type = (target, ptype = "absolute" )=>{
    $(target).style.position = ptype;
  }

  let exports = {width, height, translate, rotate, scale, resize, type };

  return exports;

});
/*
@panel:Transform
@row:Position
  x:Number valid=[\d+|inherit|auto]
  y:[NumberEdit,validEntries:[\d+,inherit, auto]]
@row:Rotation
  r:NumberEdit(0,359):px
@row:Corners
@row:
 width: CSlider(0,100):NumberEdit(pt)
 height:CSlider(0,100):NumberEdit(pt)
 all:Check - Slider - NumberEdit
 const {position,rotation,corners } = tokens("position,rotation,corners");
*/
