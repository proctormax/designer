/*jshint loopfunc: true */

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

function SetLanguage() {
  // Dummy function for now, just replaces @import call from stylesheets

  var translation_style = document.createElement("link");
  translation_style.setAttribute("rel", "stylesheet");
  translation_style.setAttribute("type", "text/css");
  translation_style.setAttribute("href", "stylesheets/translation.css");

	if (document.head) {
		document.head.appendChild(translation_style);
	} else {
			document.getElementsByTagName("head")[0].appendChild(translation_style);
	}

}

function CheckBrowser() {
  if (!document.addEventListener) {
    alert("You are using an outdated browser - the help layout and features may not work correctly. Please consider upgrading your browser.");
  }
}

doc_ready(function() {
  SetLanguage();
  CheckBrowser();
});
