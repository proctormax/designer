/*jshint loopfunc: true */


var document;

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

// Parse pixel width as em

function parseEm() {
  return window.innerWidth / parseFloat(getComputedStyle(document.querySelector("body"))["font-size"]);
}

// Copy link to clipboard

function shareLink(message_success, message_fail) {
  var topic = document.getElementById("topic").contentWindow.location.href;
  var title = document.getElementById("topic").contentDocument.title;

  if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", topic);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = topic;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        } catch (err) {
            if (message_fail !== "") {
              alert(message_fail);
            } else {
                alert("Link copying failed, please check your browser version or security settings.");
              }
            document.body.removeChild(textarea);
            return false;
        } finally {
            if (message_success !== "") {
              alert('"' + title + '"' + ' ' + message_success);
            } else {
                alert('Link for topic "' + title + '" copied to clipboard.');
              }

            document.body.removeChild(textarea);
        }
    }
}

function toc_Expand() {
	var nocaret = document.querySelectorAll(".nocaret");
	var subcaret = document.querySelectorAll(".subcaret");
	var book_main = document.querySelectorAll(".book");
	var book_ul = document.querySelectorAll(".book + ul");

	for (var q = 0; q < nocaret.length; q++) {
		removeClass(nocaret[q], "toc_hide");
	}

	for (var w = 0; w < subcaret.length; w++) {
		removeClass(subcaret[w], "toc_hide");
	}

	for (var e = 0; e < book_main.length; e++) {
		removeClass(book_main[e], "toc_hide");
		addClass(book_main[e], "selected");
	}

	for (var r = 0; r < book_ul.length; r++) {
		removeClass(book_ul[r], "toc_hide");
	}
}

function toc_Collapse() {
	var nocaret = document.querySelectorAll(".nocaret");
	var subcaret = document.querySelectorAll(".subcaret");
	var book_main = document.querySelectorAll(".book");
	var book_ul = document.querySelectorAll(".book + ul");

	for (var q = 0; q < nocaret.length; q++) {
		addClass(nocaret[q], "toc_hide");
	}

	for (var w = 0; w < subcaret.length; w++) {
		addClass(subcaret[w], "toc_hide");
	}

	for (var e = 0; e < book_main.length; e++) {
		removeClass(book_main[e], "selected");
	}

	for (var r = 0; r < book_ul.length; r++) {
		addClass(book_ul[r], "toc_hide");
	}
}

function switchLanguage(language_choice) {
	var topic = document.getElementById("topic").contentWindow.location.href;
	var topic_split = topic.split("lproj");
	var topic_final;
	if (topic_split[1] === "/landing.html") {
		topic_final = "/index.html";
	} else {
			topic_final = topic_split[1];
	}

	switch(language_choice) {
		case "english_uk":
			window.location.replace("../English.lproj" + topic_final);
			break;
		case "english_us":
			window.location.replace("../en-US.lproj" + topic_final);
			break;
		case "de":
			window.location.replace("../de.lproj" + topic_final);
			break;
		case "es":
			window.location.replace("../es.lproj" + topic_final);
			break;
		case "fr":
			window.location.replace("../fr.lproj" + topic_final);
			break;
		case "it":
			window.location.replace("../it.lproj" + topic_final);
			break;
		case "ja":
			window.location.replace("../ja.lproj" + topic_final);
			break;
		case "ptbr":
			window.location.replace("../pt-BR.lproj" + topic_final);
			break;
    case "ru":
      window.location.replace("../ru.lproj" + topic_final);
      break;
		case "zhhans":
			window.location.replace("../zh-Hans.lproj" + topic_final);
			break;
		default:
			window.location.replace("../English.lproj" + topic_final);
	}
}

function removeActive() {
	var activelinks = document.querySelectorAll(".activelink");

	for (var i = 0; i < activelinks.length; i++) {
		removeClass(activelinks[i], "activelink");
	}
}

function fireEventHandlers() {
	// Dynamic language switching
	var help = document.getElementById("help_language");

	var language_choice;

	addEventListener(help, "change", function() {
		language_choice = help.value;
		switchLanguage(language_choice);
	});

	// iFrame printing
	var print_iframe = document.getElementById("print_button");
	addEventListener(print_iframe, "click", function() {
		document.getElementById("topic").contentWindow.print();
	});

	// Collapse functionality

	var collapse = document.getElementById("collapse_button");
	addEventListener(collapse, "click", function(e) {
		e.preventDefault();
		toc_Collapse();
	});

  // Expand functionality

	var expand = document.getElementById("expand_button");
	addEventListener(expand, "click", function(e) {
		e.preventDefault();
		toc_Expand();
	});

  // Clipboard sharing

  var clipboard = document.getElementById("share_button");
  addEventListener(clipboard, "click", function(e) {
    e.preventDefault();
    var message_success = this.getAttribute("data-localised-message");
    var message_fail = this.getAttribute("data-localised-fail");
    shareLink(message_success, message_fail);
  });

	// Book toggling

	var book = document.querySelectorAll(".book");

	for (var i = 0; i < book.length; i++) {
		addEventListener(book[i], "click", function(e) {
			e.preventDefault();
			var children = this.parentNode.querySelectorAll("ul");
			for (var c = 0; c < children.length; c++) {
				if (children[c].parentNode === this.parentNode) {
					toggleClass(children[c], "toc_hide");
				}
			}

			toggleClass(this, "selected");
		});
	}

	// Add current topic highlight and close TOC if it's been toggled.

	var mlink = document.getElementsByClassName("mlink"); // this randomly chokes Apple Help Viewer performance

	for (var m = 0; m < mlink.length; m++) {
		addEventListener(mlink[m], "click", function(e) {
			removeActive();
			addClass(this, "activelink");
      // if we're off-canvas, get rid of the TOC once a link is clicked
      if (parseEm() < 72) {
        window.location.href = "#";
      }
		});
	}

}

function swapStyle_platform(platform) {
  var old_style;
  switch(platform) {
    case "macos":
      old_style = document.getElementById("platformstyle");
      old_style.parentNode.removeChild(old_style);
      appendStyle_platform("../resources/css/osx.css");
      break;
    case "win32":
      old_style = document.getElementById("platformstyle");
      old_style.parentNode.removeChild(old_style);
      appendStyle_platform("../resources/css/win32.css");
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

function passTopic() {
  // iFrame Break-in: if argument is passed in url, parse it and reload topic back into iframe on index.html
	var titlestring = new Array([]);
  var titalfinal;
  var title;
	var query = window.location.search.substring();
  var iframe = document.getElementById("topic");

	if (query !== "") {
		titlestring = query.split("?");
		var href = titlestring[1].split("=");
		try {
      title = titlestring[2].split("=");
    } catch(err) {
        alert("Page does not exist in localised copy.");
        title = "";
      }

    if (title !== "") {
      titlefinal = decodeURI(title[1]);
      iframe.setAttribute("src", "pages" + href[1]);
    } else {
        titlefinal = "Affinity Photo Help";
        iframe.setAttribute("src", "landing.html");
    }

    document.title = titlefinal;
  }
}

doc_ready(function() {
	// Create custom Win/macOS elements
	if (document.registerElement) {
		var x_win32 = document.registerElement("x-win32");
		var x_osx = document.registerElement("x-osx");
		document.body.appendChild(new x_win32());
		document.body.appendChild(new x_osx());
	}

	// Hide print and share features with Apple Webkit Help Viewer (function calls don't work) and Windows Help Viewer
	var agent = navigator.userAgent;
	var help_string = "Help Viewer";
  var windows_help_string = "MSIE 7.0";
  var appcodename = navigator.appCodeName;
  var appname = navigator.appName;

	fireEventHandlers();

	// Close all books initially
	toc_Collapse();

	// Platform stylesheets

	var platform = navigator.platform;
  var platform_style = document.createElement("link");
  platform_style.setAttribute("rel", "stylesheet");
  platform_style.setAttribute("type", "text/css");
  platform_style.setAttribute("id", "platformstyle");

  switch(platform) {
		case "MacIntel":
      appendStyle_platform("../resources/css/osx.css");
      registerDevKeystrokes();
			break;
    case "Win32":
      appendStyle_platform("../resources/css/win32.css");
      break;
    case "Win64":
      appendStyle_platform("../resources/css/win32.css");
      break;
		default:
      appendStyle_platform("../resources/css/osx.css");
	}

  if (agent.match(help_string) || agent.match(windows_help_string)) {
		var helpbutton = document.getElementById("print_button");
    helpbutton.style.display = "none";
    var sharebutton = document.getElementById("share_button");
    sharebutton.style.display = "none";
    var language_selector = document.getElementById('help_language');
    language_selector.style.display = "none";
    var buttons_container = document.getElementsByClassName('buttons_container');
    addClass(buttons_container[0], "no_language");
    // Set short timeout before calling the iframe topic break-in for Help Viewer. Even though this is all under document-ready it doesn't work consistently with the Help Viewer.
    setTimeout(passTopic, 40);
	}
  else {
    passTopic();
  }
});
