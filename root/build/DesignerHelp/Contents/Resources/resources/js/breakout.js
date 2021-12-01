/*jshint loopfunc:true */

// Polyfills

if (!document.querySelectorAll) {
  document.querySelectorAll = function(selectors) {
    var style = document.createElement('style'), elements = [], element;
    document.documentElement.firstChild.appendChild(style);
    document._qsa = [];

    style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
    window.scrollBy(0, 0);
    style.parentNode.removeChild(style);

    while (document._qsa.length) {
      element = document._qsa.shift();
      element.style.removeAttribute('x-qsa');
      elements.push(element);
    }
    document._qsa = null;
    return elements;
  };
}

if (!document.querySelector) {
  document.querySelector = function (selectors) {
    var elements = document.querySelectorAll(selectors);
    return (elements.length) ? elements[0] : null;
  };
}

var doc_ready = function(callback) {
    var ready = false;

    var detach = function() {
        if(document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    };
    var completed = function() {
        if(!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };

    if (document.readyState === "complete") {
        callback();
    } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);

        var top = false;

        try {
            top = window.frameElement === null && document.documentElement;
        } catch(e) {}

        if (top && top.doScroll) {
            (function scrollCheck() {
                if(ready) return;

                try {
                    top.doScroll("left");
                } catch(e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback();
            })();
        }
    }
};

function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else if (el.attachEvent) {
    el.attachEvent('on' + eventName, function(){
      handler.call(el);
    });
  }
}

function toggleClass(el, className) {
	if (el.classList) {
	  el.classList.toggle(className);
	} else {
	    var classes = el.className.split(' ');
	    var existingIndex = -1;
	    for (var i = classes.length; i--;) {
	      if (classes[i] === className)
	        existingIndex = i;
	    }

	    if (existingIndex >= 0)
	      classes.splice(existingIndex, 1);
	    else
	      classes.push(className);

	  el.className = classes.join(' ');
	}
}

function addClass(el, className) {
	if (el.classList)
	  el.classList.add(className);
	else
	  el.className += ' ' + className;
}

function removeClass(el, className) {
	if (el.classList)
		el.classList.remove(className);
	else
	  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function nextElementSibling(el) {
  do { el = el.nextSibling; } while ( el && el.nodeType !== 1 );
  return el;
}

function swapStyle_platform(platform) {
  var old_style;
  switch(platform) {
    case "macos":
      old_style = document.getElementById("platformstyle");
      old_style.parentNode.removeChild(old_style);
      appendStyle_platform("../../../resources/css/osx.css");
      break;
    case "win32":
      old_style = document.getElementById("platformstyle");
      old_style.parentNode.removeChild(old_style);
      appendStyle_platform("../../../resources/css/win32.css");
      break;
    default:
      // Do nothing
  }
}

function registerDevKeystrokes() {
  document.addEventListener("keydown", function(e) {
    if (e.altKey) {
      switch(e.keyCode) {
        case 37:
          swapStyle_platform("macos");
          break;
        case 39:
          swapStyle_platform("win32");
          break;
        default:
          // Do nothing
      }
    }
  });
}

function appendStyle_platform(link) {
	var platform_style = document.createElement("link");
  platform_style.setAttribute("rel", "stylesheet");
  platform_style.setAttribute("type", "text/css");
  platform_style.setAttribute("id", "platformstyle");
	platform_style.setAttribute("href", link);

	if (document.head) {
		document.head.appendChild(platform_style);
	} else {
		document.getElementsByTagName("head")[0].appendChild(platform_style);
	}
}

function appendStyle_localised_platform(link) {
  var localised_style = document.createElement("link");
  localised_style.setAttribute("rel", "stylesheet");
  localised_style.setAttribute("type", "text/css");
  localised_style.setAttribute("id", "localisedstyle");
  localised_style.setAttribute("href", link);

  if (document.head) {
		document.head.appendChild(localised_style);
	} else {
		document.getElementsByTagName("head")[0].appendChild(localised_style);
	}
}

function SetPlatform() {
	var platform = navigator.platform;

  switch(platform) {
		case "MacIntel":
      appendStyle_platform("../../../resources/css/osx.css");
      registerDevKeystrokes();
			break;
    case "Win32":
      appendStyle_platform("../../../resources/css/win32.css");
      appendStyle_localised_platform("../../stylesheets/translation-win32.css");
      break;
    case "Win64":
      appendStyle_platform("../../../resources/css/win32.css");
      appendStyle_localised_platform("../../stylesheets/translation-win32.css");
      break;
		default:
			appendStyle_platform("../../../resources/css/osx.css");
	}
}

function SetLanguage() {
  // Dummy function for now, just replaces @import call from stylesheets
  var translation_style = document.createElement("link");
  translation_style.setAttribute("rel", "stylesheet");
  translation_style.setAttribute("type", "text/css");
  translation_style.setAttribute("href", "../../stylesheets/translation.css");
	if (document.head) {
		document.head.appendChild(translation_style);
	} else {
			document.getElementsByTagName("head")[0].appendChild(translation_style);
		}
}

function fireEventHandlers() {
  // Image comparisons
  var comparison = document.querySelectorAll(".comparison");

  for (var i = 0; i < comparison.length; i++) {
    addEventListener(comparison[i], "click", function(e) {
      toggleClass(this, "viewable_text");
      var text = this.querySelectorAll("div");
      toggleClass(text[0], "viewable");
    });
  }

  // Gestures topic handling

  var gesturelinks = document.querySelectorAll(".gesturelink");
  var gestures = document.querySelectorAll(".gesture");

  for (var o = 0; o < gesturelinks.length; o++) {
    addEventListener(gesturelinks[o], "click", function(e) {
      for (var r = 0; r < gestures.length; r++) {
        removeClass(gestures[r], "active");
      }
      addClass(this.nextElementSibling, "active");
    });
  }

  var first = document.querySelectorAll(".first");

  for (var p = 0; p < first.length; p++) {
    addClass(first[p].nextElementSibling, "active");
  }

  var tabsystem = document.querySelectorAll(".tabsystem");

  for (var q = 0; q < tabsystem.length; q++) {
    addEventListener(tabsystem[q], "click", function(e) {
      for (var w = 0; w < first.length; w++) {
        addClass(first[w].nextElementSibling, "active");
      }
    });
  }
}

doc_ready(function() {
  // iFrame break-out if topic page is loaded
  if (window.location == window.parent.location) {
    var href = document.location.href;
    var docname = href.split('pages').pop();

    window.location.replace("../../index.html?page=" + docname + "?title=" + document.title);
  }

  SetPlatform();
  SetLanguage();
  fireEventHandlers();
});
