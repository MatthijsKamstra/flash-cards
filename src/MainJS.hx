package;

import js.Syntax;
import AST.FlashCardObj;
import js.Browser.*;
import js.Browser;
import js.html.*;
import model.constants.App;

using StringTools;

/**
 * @author Matthijs Kamstra aka [mck]
 * MIT
 *
 */
class MainJS {
	// buttons
	var btnCorrect:AnchorElement;
	var btnWrong:AnchorElement;
	var btnNotsure:AnchorElement;
	// bootstrap collapse
	var myCollapsible:Dynamic;
	var bsCollapse:Dynamic;
	// Q andd A
	var q:ButtonElement;
	var a:DivElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			init();
			setupQ();
			setupNav();
			loadJson('data/css.json');
		});
	}

	function setupQ() {
		q = cast document.getElementById('js-flashcard-q');
		a = cast document.getElementById('js-flashcard-a');

		q.innerHTML = 'Q';
		a.innerText = 'A';
	}

	function init() {
		window.onkeydown = _keyDown;
		window.onkeyup = _keyUp;

		// collapse
		myCollapsible = document.getElementById('flush-collapseOne');
		// setup collapse
		bsCollapse = js.Syntax.code("new bootstrap.Collapse({0},{
			toggle: false,
		})", myCollapsible);

		// myCollapsible.addEventListener('show.bs.collapse', function() {
		// 	console.log('show.bs.collapse');
		// });
		// myCollapsible.addEventListener('hidden.bs.collapse', function() {
		// 	console.log('hidden.bs.collapse');
		// });

		// buttons actions
		btnCorrect = cast document.getElementById("js-btn-correct");
		btnWrong = cast document.getElementById("js-btn-wrong");
		btnNotsure = cast document.getElementById("js-btn-not-sure");
		btnCorrect.onclick = () -> {
			trace('correct');
		}
		btnWrong.onclick = () -> {
			trace('wrong');
		}
		btnNotsure.onclick = () -> {
			trace('not sure');
		}
	}

	function collapseQ() {
		trace('collapseQ');
		bsCollapse.hide();
	}

	function openQ() {
		trace('openQ');
		bsCollapse.show();
	}

	function hightlightBtn(isHightlighted:Bool = false) {
		if (isHightlighted) {
			btnCorrect.classList.add('btn-outline-success');
			btnWrong.classList.add('btn-outline-danger');
			btnCorrect.classList.remove('btn-outline-dark');
			btnWrong.classList.remove('btn-outline-dark');
		} else {
			btnCorrect.classList.add('btn-outline-dark');
			btnWrong.classList.add('btn-outline-dark');
			btnCorrect.classList.remove('btn-outline-success');
			btnWrong.classList.remove('btn-outline-danger');
		}
	}

	function _keyUp(e:js.html.KeyboardEvent) {
		trace(e);
		if (e.key == "Meta") {
			hightlightBtn(false);
		}
	}

	function _keyDown(e:js.html.KeyboardEvent) {
		// console.log(e);
		// console.log('ctrl: ' + e.ctrlKey);
		// console.log('meta: ' + e.metaKey);

		// with command key
		if (e.metaKey == true) {
			switch (e.key) {
				case "ArrowUp":
					// trace("close answer");
					collapseQ();
				case "ArrowDown":
					// trace("open answer");
					openQ();
				case "ArrowLeft":
					trace("choose good");
				case "ArrowRight":
					trace("choose wrong");
				case 'Meta':
					trace('Meta');
					hightlightBtn(true);
				default:
					// trace("case '" + e.key + "': trace ('" + e.key + "');");
			}
		}
		if (e.metaKey == false) {
			switch (e.key) {
				case "ArrowUp":
					// trace("close answer");
					collapseQ();
				case "ArrowDown":
					// trace("open answer");
					openQ();
				// case "ArrowLeft":
				// 	trace("choose good");
				// case "ArrowRight":
				// 	trace("choose wrong");
				default:
					// trace("case '" + e.key + "': trace ('" + e.key + "');");
			}
		}

		// if (e.metaKey == true && e.key == 'r') {
		// 	console.log('[cmd + r] = reload page');
		// 	// reload
		// 	location.reload();
		// }
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

	var arr:Array<FlashCardObj>;

	function setupQAndA() {
		var flashCard:FlashCardObj = arr[0];
		q.innerHTML = flashCard.html.question.replace('<p>', '').replace('</p>', '');
		a.innerHTML = flashCard.html.answer;
	}

	function loadJson(url:String) {
		var req = new haxe.Http(url);
		req.onData = function(data:String) {
			try {
				arr = haxe.Json.parse(data);
				setupQAndA();
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
