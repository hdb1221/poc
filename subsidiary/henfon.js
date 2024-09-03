
$(function(){
	$(".ewmc a").click(function(){
		$(".bg-oalc").stop(false,true).fadeIn();
	});
	$(window).scroll(function(){
	  if($(window).scrollTop()>0){
	    $(".top").addClass("on");
	  }else{
		  $(".top").removeClass("on");
		  }
	})
	$(".bg-oalc").click(function(){
		$(".bg-oalc").stop(false,true).fadeOut();
	})
	setTimeout(function(){
		$(".benla,.mid-loac").addClass("on");
	},2000)
	
	$(".menuc").click(function(){
		$(this).toggleClass("on");
		if($(window).width()>1200){
			$(".sc-neca").toggleClass("on");
			}else{
			  $(".sc-neca").fadeToggle();
			}
		
	});
	$(".yqsc").hover(function(){
	  $(".annct").toggleClass("on");
	})
	$(".search span").click(function(){
	  $(this).siblings().stop(false,true).slideToggle();
	});
	$(".tabce dl dt").click(function(){
	  if($(window).width()<=1200){
		$(this).siblings().stop(false,true).slideToggle().parent().siblings().children("dd").stop(false,true).slideUp();;  
	  }	
	});
	$(".mob-nav").click(function(){
		$(this).toggleClass("on");
		$(".T-nav").stop(false,true).fadeToggle();
		});
	//if($(window).width()>1200){
	  //var loc = $(".ny-nav p a").length;
	  //$(".ny-nav p a").css({width:(100/loc+'%')})
	//};
	$(".ny-nav span").text($(".ny-nav p a.cur").text());
	$(".ny-nav span").click(function(){
		$(this).siblings("p").stop(false,true).slideToggle();
		})
	$(".bolate .list .d1").hover(function(){
	  var ind = $(this).parent().index();
	  $(this).parent().addClass("on").siblings().removeClass("on");	
	  if($(window).width()>1200){
	  $(".bolate .bgc .bd").eq(ind).stop(false,true).fadeIn().siblings().stop(false,true).fadeOut();
	  }
	})
	$(".bolate .list:eq(0)").addClass("on");
	$(".dolsca").click(function(){
	  if($(this).siblings(".lourew").length>0){
		  $(this).toggleClass("on").siblings().stop(false,true).slideToggle().parent().siblings().children(".dolsca").removeClass("on").siblings().stop(false,true).slideUp();
		  }
	  })
	$(".dolsca2").click(function(){
	  if($(this).siblings(".lourew2").length>0){
		  $(this).toggleClass("on").siblings().stop(false,true).slideToggle().parent().siblings().children(".dolsca2").removeClass("on").siblings().stop(false,true).slideUp();
		  }
	  })
})


















