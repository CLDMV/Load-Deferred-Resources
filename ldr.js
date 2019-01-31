/*!
  * loadDeferredResources v1.0.0 (https://github.com/CLDMV/Load-Deferred-Resources)
  * Copyright 2019 The loadDeferredResources Authors (https://github.com/CLDMV/Load-Deferred-Resources/graphs/contributors)
  * Licensed under GPL-3.0 (https://github.com/CLDMV/Load-Deferred-Resources/blob/master/LICENSE)
  */
(function (l, o, a, d, u) {
	function loadDeferredResources() {
		var nodes = document.getElementsByClassName(d);
		if (nodes.length > 0) {
			var cleanup_nodes = [];
			for (i = 0; i < nodes.length; i++) {
				var node = nodes[i];
				cleanup_nodes.push(node);
				var replacement = document.createElement("div");
				replacement.setAttribute("class", d + "deferred-resources-loaded");
				replacement.innerHTML = node.innerHTML;
				var deferred_scripts = replacement.getElementsByTagName('script');
				if (deferred_scripts.length > 0) {
					var scripts = [];
					for (b = 0; b < deferred_scripts.length; b++) {
						var script_data = {};
						var deferred_script = deferred_scripts[b];
						var attributes = deferred_script.attributes;
						for (c = 0; c < attributes.length; c++) {
							var attribute = attributes[c];
							script_data[attribute.nodeName] = attribute.nodeValue;
						}
						if (typeof script_data.src === "undefined") {
							script_data.innerHTML = deferred_script.innerHTML;
						}
						script_data.deferred_scripts = deferred_script;
						scripts.push(script_data);
					}
					for (b = 0; b < scripts.length; b++) {
						var script_data = scripts[b];
						replacement.removeChild(script_data.deferred_scripts);
						script_data.deferred_scripts = null;
						var script = document.createElement('script');
						for (var key in script_data) {
							if (script_data.hasOwnProperty(key)) {
								if (script_data[key] !== null) {
									script[key] = script_data[key];
								}
							}
						}
						if (typeof script.type === "undefined") {
							script.type = 'text/javascript';
						}
						replacement.appendChild(script);
					}
				}
				document.body.appendChild(replacement);
			}
			// Cleanup
			for (i = 0; i < cleanup_nodes.length; i++) {
				var node = cleanup_nodes[i];
				node.parentElement.removeChild(node);
			}
		}
	};
	var raf = requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame;
	if (raf) {
		raf(function(){window.setTimeout(loadDeferredResources,0);});
	} else {
		window.addEventListener('load', loadDeferredResources);
	}
})(window, document, 'script', 'deferred-resources', 'undefined');