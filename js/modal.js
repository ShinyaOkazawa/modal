(function($){

	$.fn.modal = function(){

		var _self = $(this);

		param = {

			$obj: {
				wrap: $('<div class="modal-wrap"></div>'),
				overlay: $('<div class="modal-overlay"></div>')
			},

			conf: {

			},

		}; // param

		func = {

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
					'display' : 'none'
				});
				param.$obj.overlay.css({
					'opacity': 0.5,
					'position': 'absolute',
					'top': 0,
					'left': 0,
					'z-index': 1000,
					'width': window.innerWidth,
					'height': window.innerHeight,
					'background': '#000'
				});
			},

			addLayer: function(){
				param.$obj.wrap.appendTo($('body'));
				param.$obj.overlay.appendTo($('.modal-wrap'));
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

			open: function(){
				param.$obj.wrap.fadeIn();
			},

			close: function(){
				param.$obj.wrap.click(function(){
					$(this).fadeOut();
				});
			}

		}; // func

		return func.init();

	}; // $.fn.modal()


})(jQuery);