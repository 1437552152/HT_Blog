$(function(){
    $('.theme-login').click(function(){
		$('.theme-popover-mask').fadeIn(100);
		$('.theme-popover').slideDown(200);
	})
	$('.theme-poptit .close').click(function(){
		$('.theme-popover-mask').fadeOut(100);
		$('.theme-popover').slideUp(200);
	})

    $(".backTop").on("click",function(){
        $('html,body').animate({scrollTop:0},'slow');
    });
    function back_Top(){
        if($(document).scrollTop() <=100){
            $(".backTop").fadeOut();
        }
        else{
            $(".backTop").fadeIn();
        }
    }
    $(window).scroll(function(){
        back_Top();
    });
    back_Top();

})