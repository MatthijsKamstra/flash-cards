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
