(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
var MainJS = function() {
	this.all = [];
	this.arr = [];
	var _gthis = this;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		$global.console.log("" + model_constants_App.NAME + " Dom ready :: build: " + "2021-10-25 23:12:37" + " ");
		_gthis.init();
		_gthis.setupNav();
		_gthis.loadJson("data/q-and-a.min.json");
	});
};
MainJS.__name__ = true;
MainJS.main = function() {
	var app = new MainJS();
};
MainJS.prototype = {
	init: function() {
		window.onkeydown = $bind(this,this.onKeyDown);
		window.onkeyup = $bind(this,this.onKeyUp);
		this.myCollapsible = window.document.getElementById("flush-collapseOne");
		this.bsCollapse = new bootstrap.Collapse(this.myCollapsible,{
			toggle: false,
		});
		this.btnCorrect = window.document.getElementById("js-btn-correct");
		this.btnWrong = window.document.getElementById("js-btn-wrong");
		this.btnNotsure = window.document.getElementById("js-btn-not-sure");
		this.btnCorrect.onclick = $bind(this,this.onChooseGood);
		this.btnWrong.onclick = $bind(this,this.onChooseWrong);
		this.btnNotsure.onclick = $bind(this,this.onChooseSkip);
		this.q = window.document.getElementById("js-flashcard-q");
		this.a = window.document.getElementById("js-flashcard-a");
		this.q.innerHTML = "Q";
		this.a.innerText = "A";
		if(!window.document.hasFocus()) {
			this.setupToast("You need to focus this document to use keyboard shortcuts");
		}
	}
	,setupToast: function(msg) {
		var toastLiveExample = window.document.getElementById("js-toast");
		var content = window.document.getElementById("js-toast__body");
		content.innerHTML = msg;
		var toast = new bootstrap.Toast(toastLiveExample);
		toast.show();
	}
	,sortQ: function(subject) {
		this.arr = [];
		var _g = 0;
		var _g1 = this.all.length;
		while(_g < _g1) {
			var i = _g++;
			var _all = this.all[i];
			if(_all.label == subject || subject == "all") {
				this.arr.push(_all);
			}
		}
		this.sideNav();
		this.setupQAndA();
		this.toggleNav(subject);
	}
	,sideNav: function() {
		var content = window.document.getElementById("js-offcanvas__list");
		var msg = "";
		msg += "<ul>";
		var _g = 0;
		var _g1 = this.all.length;
		while(_g < _g1) {
			var i = _g++;
			var e = this.all[i];
			msg += "<li><a href=\"?" + e._id + "\" data-label=\"" + e.label + "\">" + e._id + "</a></li>";
		}
		msg += "</ul>";
		content.innerHTML = msg;
	}
	,setupQAndA: function(nr) {
		if(nr == null) {
			nr = Math.floor(Math.random() * this.arr.length);
		}
		var flashCard = this.arr[nr];
		var tmp = StringTools.replace(flashCard.html.question,"<p>","");
		this.q.innerHTML = StringTools.replace(tmp,"</p>","");
		this.a.innerHTML = flashCard.html.answer;
		hljs.highlightAll();
	}
	,setupNav: function() {
		var _gthis = this;
		this.btnCSS = window.document.getElementById("btn-css");
		this.btnHTML = window.document.getElementById("btn-html");
		this.btnJS = window.document.getElementById("btn-js");
		this.btnAll = window.document.getElementById("btn-all");
		this.btnCSS.onclick = function(e) {
			e.preventDefault();
			_gthis.toggleNav("css");
			_gthis.sortQ("css");
		};
		this.btnHTML.onclick = function(e) {
			e.preventDefault();
			_gthis.toggleNav("html");
			_gthis.sortQ("html");
		};
		this.btnJS.onclick = function(e) {
			e.preventDefault();
			_gthis.toggleNav("js");
			_gthis.sortQ("js");
		};
		this.btnAll.onclick = function(e) {
			e.preventDefault();
			_gthis.toggleNav("all");
			_gthis.sortQ("all");
		};
	}
	,toggleNav: function(subject) {
		this.btnCSS.classList.remove("active");
		this.btnHTML.classList.remove("active");
		this.btnJS.classList.remove("active");
		this.btnAll.classList.remove("active");
		switch(subject) {
		case "all":
			this.btnAll.classList.add("active");
			break;
		case "css":
			this.btnCSS.classList.add("active");
			break;
		case "html":
			this.btnHTML.classList.add("active");
			break;
		case "js":
			this.btnJS.classList.add("active");
			break;
		default:
			console.log("src/MainJS.hx:186:","case '" + subject + "': trace ('" + subject + "');");
		}
	}
	,onCollapseQ: function() {
		this.bsCollapse.hide();
	}
	,onOpenQ: function() {
		this.bsCollapse.show();
	}
	,nextQ: function() {
		var _gthis = this;
		console.log("src/MainJS.hx:203:",window.location.search);
		this.onCollapseQ();
		haxe_Timer.delay(function() {
			_gthis.setupQAndA();
		},400);
	}
	,onChooseGood: function() {
		console.log("src/MainJS.hx:214:","good");
		this.nextQ();
	}
	,onChooseWrong: function() {
		console.log("src/MainJS.hx:219:","wrong");
		this.nextQ();
	}
	,onChooseSkip: function() {
		console.log("src/MainJS.hx:226:","skip");
		this.nextQ();
	}
	,hightlightBtn: function(isHightlighted) {
		if(isHightlighted == null) {
			isHightlighted = false;
		}
		if(isHightlighted) {
			this.btnCorrect.classList.add("btn-outline-success");
			this.btnWrong.classList.add("btn-outline-danger");
			this.btnCorrect.classList.remove("btn-outline-dark");
			this.btnWrong.classList.remove("btn-outline-dark");
		} else {
			this.btnCorrect.classList.add("btn-outline-dark");
			this.btnWrong.classList.add("btn-outline-dark");
			this.btnCorrect.classList.remove("btn-outline-success");
			this.btnWrong.classList.remove("btn-outline-danger");
		}
	}
	,onKeyUp: function(e) {
		if(e.key == "Meta") {
			this.hightlightBtn(false);
		}
	}
	,onKeyDown: function(e) {
		if(e.metaKey == true) {
			switch(e.key) {
			case "ArrowDown":
				this.onOpenQ();
				break;
			case "ArrowLeft":
				this.onChooseWrong();
				break;
			case "ArrowRight":
				this.onChooseGood();
				break;
			case "ArrowUp":
				this.onCollapseQ();
				break;
			case "Meta":
				this.hightlightBtn(true);
				break;
			default:
			}
		}
		if(e.metaKey == false) {
			switch(e.key) {
			case "ArrowDown":
				this.onOpenQ();
				break;
			case "ArrowUp":
				this.onCollapseQ();
				break;
			default:
			}
		}
	}
	,loadJson: function(url) {
		var _gthis = this;
		var req = new haxe_http_HttpJs(url);
		req.onData = function(data) {
			try {
				_gthis.arr = JSON.parse(data);
				_gthis.all = JSON.parse(data);
				_gthis.sortQ("all");
			} catch( _g ) {
				var e = haxe_Exception.caught(_g).unwrap();
				console.log("src/MainJS.hx:315:",e);
			}
		};
		req.onError = function(error) {
			console.log("src/MainJS.hx:319:","error: " + error);
		};
		req.onStatus = function(status) {
			console.log("src/MainJS.hx:322:","status: " + status);
		};
		req.request(false);
	}
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
});
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
});
var haxe_http_HttpBase = function(url) {
	this.url = url;
	this.headers = [];
	this.params = [];
	this.emptyOnData = $bind(this,this.onData);
};
haxe_http_HttpBase.__name__ = true;
haxe_http_HttpBase.prototype = {
	onData: function(data) {
	}
	,onBytes: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,hasOnData: function() {
		return !Reflect.compareMethods($bind(this,this.onData),this.emptyOnData);
	}
	,success: function(data) {
		this.responseBytes = data;
		this.responseAsString = null;
		if(this.hasOnData()) {
			this.onData(this.get_responseData());
		}
		this.onBytes(this.responseBytes);
	}
	,get_responseData: function() {
		if(this.responseAsString == null && this.responseBytes != null) {
			this.responseAsString = this.responseBytes.getString(0,this.responseBytes.length,haxe_io_Encoding.UTF8);
		}
		return this.responseAsString;
	}
};
var haxe_http_HttpJs = function(url) {
	this.async = true;
	this.withCredentials = false;
	haxe_http_HttpBase.call(this,url);
};
haxe_http_HttpJs.__name__ = true;
haxe_http_HttpJs.__super__ = haxe_http_HttpBase;
haxe_http_HttpJs.prototype = $extend(haxe_http_HttpBase.prototype,{
	request: function(post) {
		var _gthis = this;
		this.responseAsString = null;
		this.responseBytes = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) {
				return;
			}
			var s;
			try {
				s = r.status;
			} catch( _g ) {
				s = null;
			}
			if(s == 0 && js_Browser.get_supported() && $global.location != null) {
				var protocol = $global.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) {
					s = r.response != null ? 200 : 404;
				}
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null) {
				_gthis.onStatus(s);
			}
			if(s != null && s >= 200 && s < 400) {
				_gthis.req = null;
				_gthis.success(haxe_io_Bytes.ofData(r.response));
			} else if(s == null || s == 0 && r.response == null) {
				_gthis.req = null;
				_gthis.onError("Failed to connect or resolve host");
			} else if(s == null) {
				_gthis.req = null;
				var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
				_gthis.responseBytes = onreadystatechange;
				_gthis.onError("Http Error #" + r.status);
			} else {
				switch(s) {
				case 12007:
					_gthis.req = null;
					_gthis.onError("Unknown host");
					break;
				case 12029:
					_gthis.req = null;
					_gthis.onError("Failed to connect to host");
					break;
				default:
					_gthis.req = null;
					var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
					_gthis.responseBytes = onreadystatechange;
					_gthis.onError("Http Error #" + r.status);
				}
			}
		};
		if(this.async) {
			r.onreadystatechange = onreadystatechange;
		}
		var uri;
		var _g = this.postData;
		var _g1 = this.postBytes;
		if(_g == null) {
			if(_g1 == null) {
				uri = null;
			} else {
				var bytes = _g1;
				uri = new Blob([bytes.b.bufferValue]);
			}
		} else if(_g1 == null) {
			var str = _g;
			uri = str;
		} else {
			uri = null;
		}
		if(uri != null) {
			post = true;
		} else {
			var _g = 0;
			var _g1 = this.params;
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri == null) {
					uri = "";
				} else {
					uri = (uri == null ? "null" : Std.string(uri)) + "&";
				}
				var s = p.name;
				var value = (uri == null ? "null" : Std.string(uri)) + encodeURIComponent(s) + "=";
				var s1 = p.value;
				uri = value + encodeURIComponent(s1);
			}
		}
		try {
			if(post) {
				r.open("POST",this.url,this.async);
			} else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question ? "?" : "&") + (uri == null ? "null" : Std.string(uri)),this.async);
				uri = null;
			} else {
				r.open("GET",this.url,this.async);
			}
			r.responseType = "arraybuffer";
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			this.req = null;
			this.onError(e.toString());
			return;
		}
		r.withCredentials = this.withCredentials;
		if(!Lambda.exists(this.headers,function(h) {
			return h.name == "Content-Type";
		}) && post && this.postData == null) {
			r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		var _g = 0;
		var _g1 = this.headers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			r.setRequestHeader(h.name,h.value);
		}
		r.send(uri);
		if(!this.async) {
			onreadystatechange(null);
		}
	}
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.get_supported = function() {
	if(typeof(window) != "undefined" && typeof(window.location) != "undefined") {
		return typeof(window.location.protocol) == "string";
	} else {
		return false;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw haxe_Exception.thrown("Unable to create XMLHttpRequest object.");
};
var model_constants_App = function() { };
model_constants_App.__name__ = true;
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.__name__ = true;
Array.__name__ = true;
js_Boot.__toStr = ({ }).toString;
model_constants_App.NAME = "[Flash-cards]";
MainJS.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=main.js.map