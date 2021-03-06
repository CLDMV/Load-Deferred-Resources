/**
 * @Author: Nate Hyson <CLDMV>
 * @Date:   2019-01-31 04:45:12 -08:00 (1548938712)
 * @Email:  nate+git-public@cldmv.net
 * @Project: Load-Deferred-Resources
 * @Filename: ldr.js
 * @Last modified by:   Nate Hyson <CLDMV> (nate+git-public@cldmv.net)
 * @Last modified time: 2020-09-13 20:21:05 -07:00 (1600053665)
 * @Copyright: Copyright (c) 2013-2020 Catalyzed Motivation Inc. All rights reserved.
 */



/*!
  * loadDeferredResources v2.1.0 ( https://github.com/CLDMV/Load-Deferred-Resources )
  * Copyright 2019 The loadDeferredResources Authors ( https://github.com/CLDMV/Load-Deferred-Resources/graphs/contributors )
  * Licensed under GPL-3.0 ( https://github.com/CLDMV/Load-Deferred-Resources/blob/master/LICENSE )
  */
(function (l, o, a, d, i, t) {
	var loaded = 0;
	var required = 0;

	function ldr() {
		var nodes = o.getElementsByClassName(i);
		if (nodes.length > 0) {
			var cleanup_nodes = [];
			var scripts = [];
			var styles = [];
			var replacementDiv = o.createElement("div");
			for (c = 0; c < nodes.length; c++) {
				var node = nodes[c];
				cleanup_nodes.push(node);
				var replacement = o.createElement("div");
				replacement.setAttribute("class", i + "-loaded");
				// childNodes[0].nodeValue used instead of innerHTML due to safari bug
				replacement.innerHTML = node.childNodes[0].nodeValue;
				// replacement.innerHTML = node.innerHTML;
				// Gather Script Data
				var deferred_scripts = replacement.getElementsByTagName(a);
				if (deferred_scripts.length > 0) {
					for (b = 0; b < deferred_scripts.length; b++) {
						var script_data = {};
						var deferred_script = deferred_scripts[b];
						var attributes = deferred_script.attributes;
						for (e = 0; e < attributes.length; e++) {
							var attribute = attributes[e];
							script_data[attribute.nodeName] = attribute.nodeValue;
						};
						if (typeof script_data.src === t) {
							script_data.innerHTML = deferred_script.innerHTML;
						};
						script_data.deferred_scripts = deferred_script;
						script_data.replacement = replacement;
						scripts.push(script_data);
					};
				};

				// Gather Style Data
				var deferred_styles = replacement.getElementsByTagName(d);
				if (deferred_styles.length > 0) {
					for (b = 0; b < deferred_styles.length; b++) {
						var style_data = {};
						var deferred_script = deferred_styles[b];
						var attributes = deferred_script.attributes;
						for (e = 0; e < attributes.length; e++) {
							var attribute = attributes[e];
							style_data[attribute.nodeName] = attribute.nodeValue;
						};
						switch(true) {
							case (typeof style_data.href === t):
							case (typeof style_data.href !== t && (typeof style_data.rel === t || style_data.rel != 'stylesheet')):
								style_data.innerHTML = deferred_script.innerHTML;
								break;
						}
						style_data.deferred_styles = deferred_script;
						style_data.replacement = replacement;
						styles.push(style_data);
					};
				};
			}
			required = required + scripts.length;
			required = required + styles.length;

			// Load Scripts
			if (scripts.length > 0) {
				for (b = 0; b < scripts.length; b++) {
					var script_data = scripts[b];
					replacement = script_data.replacement;
					replacement.removeChild(script_data.deferred_scripts);
					script_data.deferred_scripts = null;
					var script = o.createElement(a);
					for (var key in script_data) {
						if (script_data.hasOwnProperty(key)) {
							if (script_data[key] !== null) {
								script[key] = script_data[key];
							}
						}
					};
					if (typeof script.type === t) {
						script.type = 'text/javascript';
					};
					if (typeof script_data.src !== t) {
						// required++;
						//real browsers
						script.onload = function() {
							resource_loaded(true, t, this);
						};
						//Internet explorer
						script.onreadystatechange = function() {
							resource_loaded(false, t, this);
						}
					};
					replacementDiv.appendChild(script);
					// replacement.appendChild(script);
				}
			};

			// Load Styles
			if (styles.length > 0) {
				for (b = 0; b < styles.length; b++) {
					var style_data = styles[b];
					replacement = style_data.replacement;
					replacement.removeChild(style_data.deferred_styles);
					style_data.deferred_styles = null;
					var style = o.createElement(d);
					for (var key in style_data) {
						if (style_data.hasOwnProperty(key)) {
							if (style_data[key] !== null) {
								style[key] = style_data[key];
							}
						}
					};
					if (typeof style.type === t) {
						style.type = 'text/css';
					};
					if (typeof style_data.innerHTML === t) {
						// required++;
						style.onload = function() {
							resource_loaded(true, t, this);
						};
					};
					// replacement.appendChild(style);
					replacementDiv.appendChild(style);
				}
			};
			/* */
			o.body.appendChild(replacementDiv);

			// Cleanup
			for (c = 0; c < cleanup_nodes.length; c++) {
				var node = cleanup_nodes[c];
				node.parentElement.removeChild(node);
			};
			var event = createEvent("ldr.processing", required);
			dispatchEvent(event);
		}
	};

	function createEvent(eventName, t, loaded, required) {
		var event; // The custom event that will be created
		if (typeof CustomEvent === 'function') {
			if (typeof loaded !== t && typeof required !== t) {
				event = new CustomEvent(eventName, { detail: { loaded: loaded, required: required } });
			} else {
				event = new CustomEvent(eventName);
			}
		} else {
			if (typeof Event === 'function') {
				event = new Event(eventName);
			} else {
				if (o.createEvent) {
					event = o.createEvent("HTMLEvents");
					event.initEvent(eventName, true, true);
				} else {
					event = o.createEventObject();
					event.eventType = eventName;
				}
			}
		}
		return event;
	}

	function dispatchEvent(event) {
		if (typeof Event === 'function' || o.createEvent) {
			o.dispatchEvent(event);
		} else {
			o.fireEvent("on" + event.eventType, event);
		}
	}

	function resource_loaded(type, t, _this) {
		if (type === true) {
			// onload
			if (typeof _this.loaded === t) {
				_this.loaded = true;
				loaded++;
				var event = createEvent("ldr.loading", t, loaded, required);
				dispatchEvent(event);
			}
		} else {
			if (_this.readyState == 'complete' && typeof _this.loaded === t) {
				_this.loaded = true;
				loaded++;
				var event = createEvent("ldr.loading", t, loaded, required);
				dispatchEvent(event);
			}
		}
		if (loaded === required) {
			var event = createEvent("ldr.loaded", t);
			dispatchEvent(event);
		}
	}
	var raf = requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame;
	if (raf) {
		raf(function(){window.setTimeout(ldr,0);});
	} else {
		window.addEventListener('load', ldr);
	};
})(window, document, 'script', 'link', 'deferred-resources', 'undefined');
