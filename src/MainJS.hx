package;

import AST.FlashCardObj;
import js.Browser.*;
import js.Browser;
import js.html.*;
import model.constants.App;

/**
 * @author Matthijs Kamstra aka [mck]
 * MIT
 *
 */
class MainJS {
	var container:js.html.DivElement;

	public function new() {
		trace("Hello 'Example Javascript'");
		init();
	}

	function init() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			// var container = document.getElementById("prop");
			// container.innerHTML = 'html';

			initHTML();
			loadData();
		});
	}

	function initHTML() {
		container = document.createDivElement();
		container.id = "example_javascript";
		container.className = "container";
		document.body.appendChild(container);

		var h1 = document.createElement('h1');
		h1.innerText = "Example Javascript";
		container.appendChild(h1);
	}

	function loadData() {
		var url = 'data/css.json';

		// var url = 'http://ip.jsontest.com/';
		var req = new haxe.Http(url);
		req.onData = function(data:String) {
			try {
				var json:Array<FlashCardObj> = haxe.Json.parse(data);
				trace(json);
			} catch (e:Dynamic) {
				trace(e);
			}
		}
		req.onError = function(error:String) {
			trace('error: $error');
		}
		req.onStatus = function(status:Int) {
			trace('status: $status');
		}
		req.request(false); // false=GET, true=POST
	}

	static public function main() {
		var app = new MainJS();
	}
}
