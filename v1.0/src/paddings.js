let paddings = (function ($) {
  const validate = (value, unit) => {
    if(typeof value !== "number"){
      unit = "";
      if(value !== "inherit")
      return;
    }
    return value + unit;
  };

  const none = ( target )=>{
    $(target).style.padding = 'none';
  };
  const inherit = ( target )=>{
    $(target).style.padding = 'inherit';
  };
  const left = (target, value, unit='px')=>{
    let valid = validate(value, unit);
    $(target).style.paddingLeft = valid;
  };
  const right = (target, value, unit='px')=>{
    let valid = validate(value, unit);
    $(target).style.paddingRight = valid;
  };
  const top = (target, value, unit='px')=>{
    let valid = validate(value, unit);
    $(target).style.paddingTop = valid;
  };
  const bottom = (target, value, unit='px')=>{
    let valid = validate(value, unit);
    $(target).style.paddingBottom = valid;
  };
  const all = (target, value, unit='px')=>{
    top(target,value, unit);
    bottom(target,value, unit);
    left(target,value, unit);
    right(target,value, unit);
  };
  const vertical = (target, value, unit='px') =>{
    top(target, value, unit);
    bottom(target, value, unit);
  };
  const horizontal = (target, value, unit='px') =>{
    left(target, value, unit);
    right(target, value, unit);
  };
  return {none, inherit, all, left, right, bottom, top, vertical, horizontal};
});
