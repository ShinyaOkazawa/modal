(function($){

	$.fn.modal = function(opt){

		var _self = $(this);

		var defaults = {
			width: '80%',
			height: '80%'
		};

		var setting = $.extend(defaults, opt);

		var param = {

			$obj: {
				wrap: $('<div class="modal-wrap"></div>'),
				overlay: $('<div class="modal-overlay"></div>'),
				contentWrap: $('<div class="modal-content-wrap"></div>')
			},

			conf: {

			},

		}; // param

		var func = {

			init: function(){

				func.style();
				func.resizeWindow();
				func.addLayer();

				_self.click(function(){
					func.open();
				});

				func.close();

			},

			style: function(){

				param.$obj.wrap.css({
					'position': 'absolute',
					'display': 'none',
					'top': 0,
					'left': 0,
					'width' : '100%',
					'height': '100%',
				});
				param.$obj.overlay.css({
					'opacity': 0.5,
					'position': 'absolute',
					'top': 0,
					'left': 0,
					'z-index': 1001,
					'width': window.innerWidth,
					'height': window.innerHeight,
					'background': '#000'
				});
				param.$obj.contentWrap.css({
					'position': 'fixed',
					'top': func.getCenterY,
					'left': func.getCenterX,
					'z-index' : 1002,
					'width': setting.width,
					'height': setting.height,
					'background': '#fff'
				});

			},

			addLayer: function(){
				param.$obj.wrap.appendTo($('body'));
				param.$obj.overlay.appendTo(param.$obj.wrap);
				param.$obj.contentWrap.appendTo(param.$obj.wrap);
			},

			resizeWindow: function(){
				$(window).on('resize scroll', function(){
					var ww = window.innerWidth;
					var wh = window.innerHeight;
					var scr = $(window).scrollTop();
					var scrH = wh + scr;
					var limit = $('body').height();

					if(scrH>limit){
						return false;
					}
					param.$obj.overlay.css({
					 'width' : ww,
					 'height' : scrH
					});
					param.$obj.contentWrap.css({
					 'left' : func.getCenterX
					});
				});
			},

			getCenterX: function(){

				var val = 0;
				var w = setting.width;
				var ww = window.innerWidth;

				if(isFinite(w)){ // 数値のみの場合
					val = ww/2 - w/2;
				} else if(func.isPx(w)){ // px指定の場合
					w = func.removeUnit(w);
					val = ww/2 - w/2;
				} else if(func.isPercent(w)){ // %指定の場合
					w = ww * func.removeUnit(w);
					val = ww/2 - w/2;
				}

				return val;
			},

			getCenterY: function(){

				var val = 0;
				var h = setting.height;
				var wh = window.innerHeight;

				if(isFinite(h)){ // 数値のみの場合
					val = wh/2 - h/2;
				} else if(func.isPx(h)){ // px指定の場合
					h = func.removeUnit(h);
					val = wh/2 - h/2;
				} else if(func.isPercent(h)){ // %指定の場合
					h = wh * func.removeUnit(h);
					val = wh/2 - h/2;
				}

				return val;
			},

			isPx: function(val){
				return val.match(/px/);
			},

			isPercent: function(val){
				return val.match(/\%/);
			},

			removeUnit: function(val){

				if(func.isPx(val)){
					val = val.match(/\d*/).join('');
				} else if(func.isPercent(val)){
					val = val.match(/\d*/).join('');
					val = val/100;
				}

				return val;

			},

			open: function(){
				param.$obj.wrap.fadeIn();
			},

			close: function(){
				param.$obj.overlay.click(function(){
					param.$obj.wrap.fadeOut();
				});
			}

		}; // func

		return func.init();

	}; // $.fn.modal()


})(jQuery);