typedef FlashCardObj = {
	@:optional var _id:String;
	@:optional var path:String;
	@:optional var filename:String;
	var label:String;
	var question:String;
	var answer:String;
	var original:{
		html:String,
		markdown:String,
	}
	var markdown:{
		question:String,
		answer:String,
	}
	var html:{
		question:String,
		answer:String,
	}
}
