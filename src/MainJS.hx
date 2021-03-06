package;

import AST.FlashCardObj;
import haxe.Timer;
import js.Browser.*;
import js.Syntax;
import js.html.*;
import model.constants.App;

using StringTools;

/**
 * @author Matthijs Kamstra aka [mck]
 */
class MainJS {
	// buttons
	var btnCorrect:AnchorElement;
	var btnWrong:AnchorElement;
	var btnNotsure:AnchorElement;
	//
	var btnCSS:Element;
	var btnHTML:Element;
	var btnJS:Element;
	var btnAll:Element;
	// bootstrap collapse
	var myCollapsible:Dynamic;
	var bsCollapse:Dynamic;
	// Q and A
	var q:ButtonElement;
	var a:DivElement;
	// arr with flash cards info
	var arr:Array<FlashCardObj> = [];
	var all:Array<FlashCardObj> = [];

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			init();
			setupNav();

			loadJson('data/q-and-a.min.json'); // all data
		});
	}

	function init() {
		// setup listen to keys
		window.onkeydown = onKeyDown;
		window.onkeyup = onKeyUp;

		// setup collapse
		myCollapsible = document.getElementById('flush-collapseOne');
		bsCollapse = js.Syntax.code("new bootstrap.Collapse({0},{
			toggle: false,
		})", myCollapsible);

		// myCollapsible.addEventListener('show.bs.collapse', function() {
		// 	console.log('show.bs.collapse');
		// });
		// myCollapsible.addEventListener('hidden.bs.collapse', function() {
		// 	console.log('hidden.bs.collapse');
		// });

		// setup buttons
		btnCorrect = cast document.getElementById("js-btn-correct");
		btnWrong = cast document.getElementById("js-btn-wrong");
		btnNotsure = cast document.getElementById("js-btn-not-sure");
		// clicks
		btnCorrect.onclick = onChooseGood;
		btnWrong.onclick = onChooseWrong;
		btnNotsure.onclick = onChooseSkip;

		// setup Q and A
		q = cast document.getElementById('js-flashcard-q');
		a = cast document.getElementById('js-flashcard-a');
		q.innerHTML = 'Q';
		a.innerText = 'A';

		// setup check for focus
		// trace(document.hasFocus());
		if (!document.hasFocus()) {
			setupToast('You need to focus this document to use keyboard shortcuts');
		}
		// TODO: hide toast when focussed?
	}

	function setupToast(msg:String) {
		var toastLiveExample = document.getElementById('js-toast');
		var content = document.getElementById('js-toast__body');
		content.innerHTML = msg;
		var toast = Syntax.code("new bootstrap.Toast({0})", toastLiveExample);
		toast.show();
	}

	function sortQ(subject:String) {
		// trace('subject: ' + subject);
		arr = [];
		for (i in 0...all.length) {
			var _all = all[i];
			// trace(_all.label);
			if (_all.label == subject || subject == 'all')
				arr.push(_all);
		}

		// console.log(arr.length);
		sideNav();
		setupQAndA();
		toggleNav(subject);
	}

	function sideNav() {
		// js-offcanvas__list
		var content = document.getElementById('js-offcanvas__list');
		var msg = '';

		msg += '<ul>';
		for (i in 0...all.length) {
			var e:FlashCardObj = all[i];
			// trace(e.label);
			msg += '<li><a href="?${e._id}" data-label="${e.label}">${e._id}</a></li>';
		}

		msg += '</ul>';

		content.innerHTML = msg;
	}

	function setupQAndA(nr:Int = null) {
		if (nr == null) {
			nr = Math.floor(Math.random() * (arr.length));
		}

		// console.log(nr);

		var flashCard:FlashCardObj = arr[nr];
		q.innerHTML = flashCard.html.question.replace('<p>', '').replace('</p>', '');
		a.innerHTML = flashCard.html.answer;

		Syntax.code('hljs.highlightAll();');
	}

	function setupNav() {
		btnCSS = document.getElementById("btn-css");
		btnHTML = document.getElementById("btn-html");
		btnJS = document.getElementById("btn-js");
		btnAll = document.getElementById("btn-all");

		btnCSS.onclick = (e:Event) -> {
			e.preventDefault();
			toggleNav('css');
			sortQ('css');
		}
		btnHTML.onclick = (e:Event) -> {
			e.preventDefault();
			toggleNav('html');
			sortQ('html');
		}
		btnJS.onclick = (e:Event) -> {
			e.preventDefault();
			toggleNav('js');
			sortQ('js');
		}
		btnAll.onclick = (e:Event) -> {
			e.preventDefault();
			toggleNav('all');
			sortQ('all');
		}
	}

	function toggleNav(subject:String) {
		btnCSS.classList.remove('active');
		btnHTML.classList.remove('active');
		btnJS.classList.remove('active');
		btnAll.classList.remove('active');

		switch (subject) {
			case 'html':
				btnHTML.classList.add('active');
			case 'js':
				btnJS.classList.add('active');
			case 'css':
				btnCSS.classList.add('active');
			case 'all':
				btnAll.classList.add('active');
			default:
				trace("case '" + subject + "': trace ('" + subject + "');");
		}
	}

	// ____________________________________ actions ____________________________________

	function onCollapseQ() {
		// trace('onCollapseQ');
		bsCollapse.hide();
	}

	function onOpenQ() {
		// trace('onOpenQ');
		bsCollapse.show();
	}

	function nextQ() {
		trace(window.location.search);

		// trace('nextQ');
		// close if open, wait for the close, fade out, fade in, new question

		onCollapseQ();
		Timer.delay(() -> setupQAndA(), 400);
	}

	function onChooseGood() {
		// TODO: register good
		trace('good');
		nextQ();
	}

	function onChooseWrong() {
		trace('wrong');
		// TODO: register wrong
		nextQ();
	}

	function onChooseSkip() {
		// TODO: register skip
		trace('skip');
		nextQ();
	}

	// ____________________________________ visual feedback ____________________________________

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

	// ____________________________________ key handlers ____________________________________

	function onKeyUp(e:js.html.KeyboardEvent) {
		// trace(e);
		if (e.key == "Meta") {
			hightlightBtn(false);
		}
	}

	function onKeyDown(e:js.html.KeyboardEvent) {
		// console.log(e);
		// console.log('ctrl: ' + e.ctrlKey);
		// console.log('meta: ' + e.metaKey);

		// with command key
		if (e.metaKey == true) {
			switch (e.key) {
				case "ArrowUp":
					// trace("close answer");
					onCollapseQ();
				case "ArrowDown":
					// trace("open answer");
					onOpenQ();
				case "ArrowLeft":
					onChooseWrong();
				case "ArrowRight":
					onChooseGood();
				case 'Meta':
					// trace('Meta');
					hightlightBtn(true);
				default:
					// trace("case '" + e.key + "': trace ('" + e.key + "');");
			}
		}
		if (e.metaKey == false) {
			switch (e.key) {
				case "ArrowUp":
					// trace("close answer");
					onCollapseQ();
				case "ArrowDown":
					// trace("open answer");
					onOpenQ();
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

	// ____________________________________ load data ____________________________________

	function loadJson(url:String) {
		var req = new haxe.Http(url);
		req.onData = function(data:String) {
			try {
				arr = haxe.Json.parse(data);
				all = haxe.Json.parse(data);
				sortQ('all');
				// setupQAndA();
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

	// ____________________________________ main ____________________________________

	static public function main() {
		var app = new MainJS();
	}
}
