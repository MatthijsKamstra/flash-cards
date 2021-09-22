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
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			// var container = document.getElementById("prop");
			// container.innerHTML = 'html';

			setupNav();

			// initHTML();
			loadData();
		});
	}

	function setupNav() {
		var btnCSS = document.getElementById("btn-css");
		var btnHTML = document.getElementById("btn-html");
		var btnJS = document.getElementById("btn-js");

		btnCSS.onclick = () -> loadJson('data/css.json');
		btnHTML.onclick = () -> loadJson('data/html.json');
		btnJS.onclick = () -> loadJson('data/js.json');

		btnCSS.classList.add('active');
		loadJson('data/css.json');
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

	function loadJson(url:String) {
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
