$(document).ready(function() {
'use strict';

/******************** STICKY NAVBAR ********************/
if ( matchMedia( 'only screen and (min-width: 768px)' ).matches ) {
   //Get navbar brand logo image
   var navLogoCh = function(imageName) {
       var curWwwPath = window.location.href;
       var pathName = window.location.pathname;    // 获取主机地址,如： http://localhost:8080
       var local = curWwwPath.substring(0,curWwwPath.indexOf(pathName));
       var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
       return $('.navbar-brand img').attr('src', '/assets/website/images/' + imageName + '.png');
   };

   navLogoCh('logo-alt');

   $(document).on('scroll', function() {
      var scrollPos = $(this).scrollTop();

      if( scrollPos > 100 ) {
         $('.navbar-fixed-top').removeClass('navbar-anim');
         navLogoCh('logo');

      } else {
         $('.navbar-fixed-top').addClass('navbar-anim');
         navLogoCh('logo-alt');
      }
   });
}



/******************** MAIN NAV SCROLL ********************/
$('#main-nav').onePageNav();


/******************** OWL CAROOUSEL ********************/
$('#owl-screenshots').owlCarousel({
	margin: 30,
   loop: true,
   responsive: {
      0: {
         items: 1
      },
      481: {
         items: 2
      },
      768: {
         items: 3
      },
      992: {
         items: 4
      }
   }

});


/******************** NIVO LIGHTBOX ********************/
$('.lightbox').nivoLightbox();


/******************** SCROLL ANIMATION ********************/
window.sr = new scrollReveal();


});