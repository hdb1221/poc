$(document).ready(function() {
	 var tw = $(window).width();
	 if(tw > 1000){
		$(".nybanner").height($(window).height()*0.78);
	//	$(".nybanner").css('background-size','100% 100%');
		 function nybanner(){
		 	$(".nybanner").height($(window).height()*0.78);
	//	 	$(".nybanner").css('background-size','100% 100%');
		 }
	    $(window).resize(function () {
	       	$(".nybanner").height($(window).height()*0.78);
	  //     	$(".nybanner").css('background-size','100% 100%');
	    });
	}

	
	 
	$(".nav").click(function(){
		$(".nav_box ").toggleClass("cur");
	});
	$(".navclose").click(function(){
		$(".nav_box ").removeClass("cur");
	});
	$(".navlist>ul>li>a.sub").click(function () {
		$(this).toggleClass("cur").next().slideToggle();
	});
	$(".navlist3 .sanji").click(function () {
		$(this).next(".box").slideToggle();
	});

	//语言
	$(".Language span").click(function () {
		$(this).parent().find("dl").stop().slideToggle();
	});

	//返回顶部
	$(function () {
		$(".returnTop").click(function () {
			$("html,body").animate({
				scrollTop: 0
			}, 500);
		});
	});
 $(".footer_h").css('height',$(".footer").outerHeight());


	//通用切换
	$('.tabSwitch').each(function (index, element) {
		var obj = $(this);
		obj.find('.tabTit').children().on('click tab', function () {
			$(this).addClass('cur').siblings().removeClass('cur');
			if (obj.find('.tabBox').children().eq($(this).index()).length > 0)
				obj.find('.tabBox').children().hide().eq($(this).index()).show();
			if (obj.find('.tabBox2').children().eq($(this).index()).length > 0)
				obj.find('.tabBox2').children().hide().eq($(this).index()).show();

			return false;
		});
		obj.find('.tabTit .cur').trigger('tab');
	});
	$('.tabSwitchHover').each(function (index, element) {
		var obj = $(this);
		obj.find('.tabTit').children().on('mouseover tab', function () {
			$(this).addClass('cur').siblings().removeClass('cur');
			if (obj.find('.tabBox').children().eq($(this).index()).length > 0)
				obj.find('.tabBox').children().hide().eq($(this).index()).show();
			if (obj.find('.tabBox2').children().eq($(this).index()).length > 0)
				obj.find('.tabBox2').children().hide().eq($(this).index()).show();

			//return false;
		});
		obj.find('.tabTit .cur').trigger('tab');
	});
});


function act() {
	var wid = $(window).width();
	var hei = $(window).height();
	$(".banner .swiper-wrapper .bg").css("height", hei);
	$(".banner .swiper-wrapper .bg").css("width", wid);
}
$(document).ready(function () {
	act();
});
$(window).resize(function () {
	act();
});


$(document).ready(function () {
	//首先备份下jquery的ajax方法
    var _ajax=$.ajax;

    //重写jquery的ajax方法
    $.ajax=function(opt){
        //备份opt中error和success方法
        var fn = {
            error:function(XMLHttpRequest, textStatus, errorThrown){},
            success:function(data, textStatus){}
        }
        if(opt.error){
            fn.error=opt.error;
        }
        if(opt.success){
            fn.success=opt.success;
        }

        //扩展增强处理
        var _opt = $.extend(opt,{
            error:function(XMLHttpRequest, textStatus, errorThrown){
                //错误方法增强处理
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data, textStatus){
                //成功回调方法增强处理
                fn.success(data, textStatus);
            },
            beforeSend:function(XHR){
                //提交前回调方法
				//$('body').append("<div id='ajaxInfo' style=''>正在加载,请稍后...</div>");
				layer.load();
            },
            complete:function(XHR, TS){
                //请求完成后回调函数 (请求成功或失败之后均调用)。
				//$("#ajaxInfo").remove();;
				layer.closeAll('loading');
            }
        });
        return _ajax(_opt);
    };
});

function CheckSearch(o){
	var obj = $(o);
	obj.find('[type="submit"]').attr('disabled',true);

	var msg = ''; layer.closeAll('tips');
	var searKey = obj.find('[name="searKey"]').val();

	if (searKey.length < 1){
		msg = '请输入关键词';
		//obj.find('[name="searKey"]').inputError({'err': msg, 'tips': 3, tipsMore: true});
		layer.msg(msg);
		obj.find('[name="searKey"]').focus();
	}


	if (msg.length){
		obj.find('[type="submit"]').attr('disabled',false);

		return false;
	}

	return true;
}

function announcement_search(o) {
	var obj = $(o);
	obj.find('[type="submit"]').attr('disabled',true);

	var msg = ''; layer.closeAll('tips');
	var serKey = obj.find('[name="serKey"]').val();
	var gid = obj.find('[name="gid"]').val();

	if (serKey){

	}else{
		$.get(window.location.href, {},
			function (data, textStatus, jqXHR) {
				$('#announcement_list').html($(data).find('#announcement_list').html());
			},
			"html"
		);
		obj.find('[type="submit"]').attr('disabled',false);
		return false;
	}

	if (msg.length){
		obj.find('[type="submit"]').attr('disabled',false);

		return false;
	}else{
		$.ajax({
			type: 'POST',
			url: '/ajax',
			dataType: 'json',
			cache: false,
			data: {gid:gid, serKey:serKey, location:location.href, act:obj.find('[name="act"]').val(), formhash:obj.find('[name="formhash"]').val()},
			error: function(){
				alert('出错了!');
				return false;
			},
			success:function(json){
				$('[name="formhash"]').val(json.formhash);

				if (json.errmsg == ''){
					$('#announcement_list').html(json.msg);
				}else{
					layer.alert(json.errmsg, {icon: 2});
				}

				obj.find('[type="submit"]').attr('disabled',false);
			}
		});
	}

	return false;
}

function product_search(o) {
	var obj = $(o);
	obj.find('[type="submit"]').attr('disabled',true);

	var msg = ''; layer.closeAll('tips');
	var aid = obj.find('[name="aid"]').val();
	var bid = obj.find('[name="bid"]').val();
	var cid = obj.find('[name="cid"]').val();
	var gid = obj.find('[name="gid"]').val();
	var serKey = obj.find('[name="serKey"]').val();

	if (aid || bid || cid || serKey){

	}else{
		$.get(window.location.href, {},
			function (data, textStatus, jqXHR) {
				$('#product_list').html($(data).find('#product_list').html());
			},
			"html"
		);
		obj.find('[type="submit"]').attr('disabled',false);
		return false;
	}

	if (msg.length){
		obj.find('[type="submit"]').attr('disabled',false);

		return false;
	}else{
		$.ajax({
			type: 'POST',
			url: '/ajax',
			dataType: 'json',
			cache: false,
			data: {aid:aid, bid:bid, cid:cid, gid:gid, serKey:serKey, location:location.href, act:obj.find('[name="act"]').val(), formhash:obj.find('[name="formhash"]').val()},
			error: function(){
				alert('出错了!');
				return false;
			},
			success:function(json){
				$('[name="formhash"]').val(json.formhash);

				if (json.errmsg == ''){
					$('#product_list').html(json.msg);
				}else{
					layer.alert(json.errmsg, {icon: 2});
				}

				obj.find('[type="submit"]').attr('disabled',false);
			}
		});
	}

	return false;
}

function CheckContact(o){
	var obj = $(o);
	obj.find('[type="submit"]').attr('disabled',true);

	var msg = ''; layer.closeAll('tips');
	var subject = obj.find('[name="subject"]').val();
	var username = obj.find('[name="username"]').val();
	var address = obj.find('[name="address"]').val();
	var companyname = obj.find('[name="companyname"]').val();
	var hangye = obj.find('[name="hangye"]').val();
	var mobile = obj.find('[name="mobile"]').val();
	var email = obj.find('[name="email"]').length ? obj.find('[name="email"]').val() : '';
	var email2 = obj.find('[name="email2"]').length ? obj.find('[name="email2"]').val() : '';

	var mess = obj.find('[name="mess"]').val();

	if (username.length < 1 || username.length > 100){
		msg = obj.find('[name="username"]').attr('placeholder')?obj.find('[name="username"]').attr('placeholder'):'请输入姓名';
		obj.find('[name="username"]').parent().inputError({'err': '', 'tips': 3, tipsMore: true});
	}

	if (mobile.length <= 0){
		msg = obj.find('[name="mobile"]').attr('placeholder')?obj.find('[name="mobile"]').attr('placeholder'):'请输入手机';
		obj.find('[name="mobile"]').parent().inputError({'err': '', 'tips': 3, tipsMore: true});
	}else if (!CheckMobile(mobile)){
		msg = obj.find('[name="mobile"]').attr('placeholder')?obj.find('[name="mobile"]').attr('placeholder'):'请输入正确的手机';
		obj.find('[name="mobile"]').parent().inputError({'err': '', 'tips': 3, tipsMore: true});
	}

	if (mess.length < 1){
		msg = obj.find('[name="mess"]').attr('placeholder')?obj.find('[name="mess"]').attr('placeholder'):'请输入留言内容';
		obj.find('[name="mess"]').inputError({'err': '', 'tips': 3, tipsMore: true});
	}


	if (msg.length){
		obj.find('[type="submit"]').attr('disabled',false);

		return false;
	}else{
		$.ajax({
			type: 'POST',
			url: '/ajax',
			dataType: 'json',
			cache: false,
			data: {subject:subject, companyname:companyname, username:username, address:address, hangye:hangye, mobile:mobile, email:email, email2:email2, mess:mess, location:location.href, act:obj.find('[name="act"]').val(), formhash:obj.find('[name="formhash"]').val()},
			error: function(){
				alert('出错了！');
				return false;
			},
			success:function(json){
				$('[name="formhash"]').val(json.formhash);

				if (json.errmsg == ''){
					layer.alert(json.msg, {icon: 1});

					o.reset();
				}else{
					layer.alert(json.errmsg, {icon: 2});
				}

				obj.find('[type="submit"]').attr('disabled',false);
			}
		});
	}

	return false;
}

function contact_search(o) {
	var obj = $(o);
	obj.find('[type="submit"]').attr('disabled',true);

	var msg = ''; layer.closeAll('tips');
	var serKey = obj.find('[name="serKey"]').val();

	if (serKey){

	}else{
		$.get(window.location.href, {},
			function (data, textStatus, jqXHR) {
				$('#contact_list').html($(data).find('#contact_list').html());
			},
			"html"
		);
		obj.find('[type="submit"]').attr('disabled',false);
		return false;
	}

	if (msg.length){
		obj.find('[type="submit"]').attr('disabled',false);

		return false;
	}else{
		$.ajax({
			type: 'POST',
			url: '/ajax',
			dataType: 'json',
			cache: false,
			data: {serKey:serKey, location:location.href, act:obj.find('[name="act"]').val(), formhash:obj.find('[name="formhash"]').val()},
			error: function(){
				alert('出错了!');
				return false;
			},
			success:function(json){
				$('[name="formhash"]').val(json.formhash);

				if (json.errmsg == ''){
					$('#contact_list').html(json.msg);
				}else{
					layer.alert(json.errmsg, {icon: 2});
				}

				obj.find('[type="submit"]').attr('disabled',false);
			}
		});
	}

	return false;
}

function CheckMobile(m){
	var reg = /^(((1[0-9]{2}))+\d{8})$/;
	if (reg.test(m)) {
		return true;
	}

	return false;
}

function CheckEmail(m){
	var reg = /^([a-zA-Z0-9+_]|\-|\.)+@(([a-zA-Z0-9_]|\-)+\.)+[a-zA-Z]{2,6}$/;
	if (reg.test(m)) {
		return true;
	}

	return false;
}

jQuery.fn.extend({
	inputError: function(options) {
		return this.each(function() {
			new jQuery.inputError(this, options);
		});
	}
});
jQuery.inputError = function(inputobj, options) {
	var opt = options || {};
	opt.class = opt.class || 'inputerror';
	opt.err = opt.err || '';
	opt.tips = opt.tips || 2;
	opt.tipsMore = opt.tipsMore || false;

	var obj = $(inputobj);
	if (!obj.data('placeholder')){
		obj.data('data-placeholder', obj.attr('placeholder'));
		obj.attr('placeholder', opt.err?opt.err:obj.data('placeholder'));
	}
	obj.removeClass(opt.class).addClass(opt.class);
	//小tips
	if (opt.err)
		layer.tips(opt.err, obj, {tips: [opt.tips, '#dd1721'], tipsMore: opt.tipsMore});

	obj.unbind('focus').focus(function(event) {
		$(this).removeClass(opt.class);
		//obj.attr('placeholder', obj.data('placeholder'));
	});
	obj.unbind('blur').blur(function(event) {
		$(this).removeClass(opt.class);
		obj.attr('placeholder', obj.data('placeholder'));
	});

	if (obj.get(0).tagName!='INPUT' && obj.get(0).tagName!='TEXTAREA' && !obj.data('bindClick')){
		obj.click(function(event) {
			$(this).removeClass(opt.class);
			obj.attr('placeholder', obj.data('placeholder'));
		});
		obj.children().click(function(){obj.click()});
		obj.data('bindClick',true);
	}
};

 $(window).resize(function () {
        var tw = $(window).width();
		 if(tw > 1000){
			$(".nybanner").height($(window).height()*0.78);
			//$(".nybanner").css('background-size','100% 100%');
			 function nybanner(){
			 	$(".nybanner").height($(window).height()*0.78);
			 //	$(".nybanner").css('background-size','100% 100%');
			 }
		    $(window).resize(function () {
		       	$(".nybanner").height($(window).height()*0.78);
		     //  	$(".nybanner").css('background-size','100% 100%');
		    });
		}else{
			$(".nybanner").css('background-size','initial initial');
		}
    });
