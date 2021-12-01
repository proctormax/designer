if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}

function setLanguage() {
	var language = navigator.language || navigator.userLanguage;
  var prefix;

  switch(true) {
    case language.startsWith("en-GB"):
      prefix = "English.lproj";
      break;
		case language.startsWith("en-gb"):
      prefix = "English.lproj";
      break;
    case language.startsWith("en-US"):
      prefix = "en-US.lproj";
      break;
		case language.startsWith("en-us"):
      prefix = "en-US.lproj";
      break;
    case language.startsWith("de"):
      prefix = "de.lproj";
      break;
    case language.startsWith("es"):
      prefix = "es.lproj";
      break;
    case language.startsWith("fr"):
      prefix = "fr.lproj";
      break;
    case language.startsWith("it"):
      prefix = "it.lproj";
      break;
    case language.startsWith("ja"):
      prefix = "ja.lproj";
      break;
    case language.startsWith("pt"):
      prefix = "pt-BR.lproj";
      break;
    case language.startsWith("ru"):
      prefix = "ru.lproj";
      break;
    case language.startsWith("zh"):
      prefix = "zh-Hans.lproj";
      break;
    default:
      prefix = "en-US.lproj";
      break;
  }

  if (window.location.replace) {
		window.location.replace(prefix + "/index.html");
	} else {
			window.location = prefix + "/index.html";
	}
}

setLanguage();
