let margins = (function ($) {
  const validate = (value, unit) => {
    if(typeof value !== "number"){
      unit = "";
      if(value !== "inherit")
      return;
    }
    return value + unit;
  };

  const none = ( target )=>{
    $(target).style.margin = 'none';
  };
  const all = (target, value, unit='px')=>{
    let valid = validate(value, unit);
    $(target).style.margin = valid;
  };
  const left = (target, value, unit='px')=>{
    let valid = validate(value, unit);
    $(target).style.marginLeft = valid;
  };
  const right = (target, value, unit='px')=>{
    let valid = validate(value, unit);
    $(target).style.marginRight = valid;
  };
  const top = (target, value, unit='px')=>{
    let valid = validate(value, unit);
    $(target).style.marginTop = valid;
  };
  const bottom = (target, value, unit='px')=>{
    let valid = validate(value, unit);
    $(target).style.marginBottom = valid;
  };
  return {none, all, left, right, bottom, top};
});
