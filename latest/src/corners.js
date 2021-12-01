let corners = (function($){
  
  const none = (target )=>{
    $(target).style.borderRadius = `none`;
  };
  const inherit = (target )=>{
    $(target).style.borderRadius = `inherit`;
  };
  const topLeft = (target, radius, unit = "px" )=>{
    if(!radius) unit = "";
    $(target).style.borderTopLeftRadius = `${radius+unit}`;
  };
  const topRight = (target, radius, unit = "px" )=>{
    if(!radius) unit = "";
    $(target).style.borderTopRightRadius = `${radius+unit}`;
  };
  const top = (target, radius, unit = "px" )=>{
    topLeft(target, radius, unit);
    topRight(target, radius, unit);
  };
  const bottomLeft = (target, radius, unit = "px" )=>{
    if(!radius) unit = "";
    $(target).style.borderBottomLeftRadius = `${radius+unit}`;
  };
  const bottomRight = (target, radius, unit = "px" )=>{
    if(!radius) unit = "";
    $(target).style.borderBottomRightRadius = `${radius+unit}`;
  };
  const bottom = (target, radius, unit = "px" )=>{
    bottomLeft(target, radius, unit);
    bottomRight(target, radius, unit);
  };

  const all = (target, value, unit='px')=>{
    top(target,value, unit);
    bottom(target,value, unit);
  };
  return {none, inherit, all,top, topLeft,topRight, bottom, bottomLeft, bottomRight};
});
