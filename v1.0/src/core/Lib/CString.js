
/**
 * Built-in String extensions.
 */
let CString = String;
CString.New = function(str){
 return new CString(str);
};
CString.Capitalize = function(str){
  if(typeof str != 'string') { Log(TypeOf(str)); return str;  }
  if(str.length <= 1) return str.toUpperCase();
  var w = str.substr(1,str.length-1);
  return str.substr(0,1).toUpperCase()+w;
};
String.Capitalize  = CString.Capitalize;
CString.prototype.StartsWith  = function(str){ return this.indexOf(str) === 0; };
CString.prototype.EndsWith    = function(str){ return this.indexOf(str) === this.length - (str.length); };
CString.prototype.RemoveFirst = function(count){ let res =""; if(count < this.length && count > 0){ res+= this.substr(count,this.length - count); } return res;};
CString.prototype.RemoveLast  = function(count){ let res =""; if(count < this.length && count > 0){ res+= this.substr(0, count); } return res;};
CString.prototype.ToTitleCase = function(){
    var c = this.substr(0,1).toUpperCase();
    return c+this.slice(1,this.length);
};