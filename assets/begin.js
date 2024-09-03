(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth;
			if(clientWidth>1920){
				var n = 1920;
			}else if(clientWidth>750){
				var n = 1920;
			}else{
				var n = 750;
			}
			if (!clientWidth) return;
			var fontSize = 100 * (clientWidth / n);
			fontSize = (fontSize > 100) ? 100 : fontSize;
			docEl.style.fontSize = fontSize + 'px';
			var dpi = window.devicePixelRatio;
			docEl.setAttribute('data-dpi', dpi);
		};
	recalc();
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
})(document, window);