;// Global Object
var Common = Common || {};

(function($){

/*----------------------------------------------------------------------
	SAMPLE01
----------------------------------------------------------------------*/
Common.sample01 = function($target, options){
	var SELF = this.smaple01;

	var config = {
		$target : $target
	};

	var options = $.extend({
		current : 0,
		duration: 400,
		easing  : 'easeOutExpo',
		timer   : 0
	}, options);

	var PARAM = SELF.param = $.extend(true, {}, options, config);
	var FUNC = SELF.func = {};

	// init: 初期化
	FUNC.init = function(){
		this.set();
		
		return SELF;
	};

	// set:
	FUNC.set = function(){
		
	};

	return FUNC.init();
};


/*----------------------------------------------------------------------
	DOM READY
----------------------------------------------------------------------*/
jQuery(function($){

	// Common.sample01();

});

}(jQuery));