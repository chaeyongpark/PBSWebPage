/* Copyright (C) Chaeyong Park, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by Chaeyong Park <pcy8201@postech.ac.kr>, POSTECH, 2017
 *
 * Github: github.com/pcy8201
 * Linkedin: www.linkedin.com/in/chaeyong
 */

// Mobile side navbar menu
$(".button-collapse").sideNav();

// Ready function
$(document).ready(function(){
	if($(window).width() < 400) {
		$('.slider').slider({height: 300});
	} else {
		$('.slider').slider({height: 500});
	}
	$('.collapsible').collapsible();
	$('.parallax').parallax();
    $('.dropdown-button').dropdown({
        constrainWidth: false,
        hover: true,
        belowOrigin: true,
        stopPropagation: false
    });
});
            
// For checking scroll, when navbar exist
if($('.navbar').length > 0){
    $(window).on("scroll load resize", function(){
        checkScroll();
    });
}

// Check whether scroll is on or not
function checkScroll(){
    var nav_height = $('.navbar').height();

    if($(window).scrollTop() > nav_height){
        $('.nav-wrapper').addClass("scrolled");
        console.log("SCROLL");
    } else {
        $('.nav-wrapper').removeClass("scrolled");
        console.log("UNSCROLL");
    }
}
