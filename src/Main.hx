import haxe.Json;
import haxe.io.Path;

using StringTools;

class Main {
	public function new() {
		log('Main');

		// log(Sys.getCwd());

		var path = Path.normalize(Sys.getCwd() + '/docs/data/css-questions.md');
		// log(path);

		if (sys.FileSystem.exists(path)) {
			var str:String = sys.io.File.getContent(path);
			convertData(str, 'css');
		} else {
			log('ERROR: there is not file: $path');
		}
	}

	function cleanQ(str:String):String {
		str = str.replace('###', '').trim();
		return str;
	}

	function convertData(str:String, label:String) {
		log(str);

		var arr:Array<FlashCardObj> = [];

		var qString = '\n### '; // ### What does a DOCTYPE do?
		var qaArray = str.split(qString);
		for (i in 0...qaArray.length) {
			var txt = qaArray[i];
			// log(txt);
			var title = cleanQ(txt).split('\n')[0].trim();
			var content = txt.split(title)[1].trim();
			// if (title == '' || title == null)
			// 	continue;
			log('${i + 1} - Q: "${title}"');
			log('${i + 1} - A: "${content.trim()}"\n');

			var fc:FlashCardObj = {
				_id: title.replace(' ', '-'),
				label: label,
				question: title,
				answer: content,
				markdown: {
					question: title,
					answer: content,
				},
				html: {
					question: Markdown.markdownToHtml(title),
					answer: Markdown.markdownToHtml(content),
				}
			}
			arr.push(fc);
		}
		log('total:${arr.length}');

		sys.io.File.saveContent('test.json', Json.stringify(arr));
	}

	inline function log(str:Dynamic) {
		Sys.println(str);
	}

	static public function main() {
		var app = new Main();
	}
}

typedef FlashCardObj = {
	@:optional var _id:String;
	var label:String;
	var question:String;
	var answer:String;
	var markdown:{
		question:String,
		answer:String,
	}
	var html:{
		question:String,
		answer:String,
	}
}
