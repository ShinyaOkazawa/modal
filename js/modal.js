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
					'top': func.getCenterContentWrap('top',setting.height),
					'left': func.getCenterContentWrap('left',setting.width),
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
				});
			},

			getCenterContentWrap: function(dir,val){

				var tmp = 0;
				var isPx,isPercent,wPercent,hPercent;

				if(isFinite(val)){ // 数値のみの場合

					if(dir == 'top'){
						val = window.innerHeight/2 - val/2;
					} else if(dir == 'left'){
						val = window.innerWidth/2 - val/2;
					}

				} else { // 数値以外の場合

					isPx = val.match(/px/);
					isPercent = val.match(/\%/);
					val = val.match(/\d*/).join('');

					if(isPx){ // px指定の場合

						if(dir == 'top'){
							val = window.innerHeight/2 - val/2;
						} else if(dir == 'left'){
							val = window.innerWidth/2 - val/2;
						}

					} else if(isPercent){ // %指定の場合

						wPercent = window.innerWidth * (val / 100);
						hPercent = window.innerHeight * (val / 100);
						console.log(wPercent);
						if(dir == 'top'){
							val = window.innerHeight/2 - hPercent/2;
						} else if(dir == 'left'){
							val = window.innerWidth/2 - wPercent/2;
						}

					}

				}
				console.log(val);
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