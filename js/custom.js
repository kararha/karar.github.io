// Custom Scripts for Primal Template //

jQuery(function($) {
    "use strict";


        // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
        var mainbottom = $('#main').offset().top;

        // on scroll,
        $(window).on('scroll',function(){

        // we round here to reduce a little workload
        stop = Math.round($(window).scrollTop());
        if (stop > mainbottom) {
            $('.navbar').addClass('past-main');
            $('.navbar').addClass('effect-main')
        } else {
            $('.navbar').removeClass('past-main');
       }

      });


  // Collapse navbar on click

   $(document).on('click.nav','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
    $(this).removeClass('in').addClass('collapse');
   }
  });



    /*-----------------------------------
    ----------- Scroll To Top -----------
    ------------------------------------*/

    $(window).scroll(function () {
      if ($(this).scrollTop() > 1000) {
          $('#back-top').fadeIn();
      } else {
          $('#back-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('#back-top').on('click', function () {
      $('#back-top').tooltip('hide');
      $('body,html').animate({
          scrollTop: 0
      }, 1500);
      return false;
    });





  /*-------- Owl Carousel ---------- */
    $(".reviews").owlCarousel({

    slideSpeed : 200,
    items: 1,
    singleItem: true,
    autoPlay : true,
    pagination : false
    });


  /* ------ Clients Section Owl Carousel ----- */

    $(".clients").owlCarousel({
    slideSpeed : 200,
    items: 5,
    singleItem: false,
    autoPlay : true,
    pagination : false
    });


  /* ------ jQuery for Easing min -- */

    $(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
  });



/* --------- Wow Init ------ */

  new WOW().init();


  /* ----- Counter Up ----- */

$('.counter').counterUp({
		delay: 10,
		time: 1000
});


/*----- Preloader ----- */

    $(window).load(function() {
  		setTimeout(function() {
        $('#loading').fadeOut('slow', function() {
        });
      }, 3000);
    });

});

// Initialize expandable skill cards
document.addEventListener('DOMContentLoaded', function() {
  const expandableBtns = document.querySelectorAll('.expand-btn');
  
  expandableBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.bento-card');
      card.classList.toggle('expanded');
      
      // Animation for smooth expansion
      const details = card.querySelector('.skill-details');
      if (card.classList.contains('expanded')) {
        details.style.maxHeight = details.scrollHeight + "px";
      } else {
        details.style.maxHeight = "0";
      }
    });
  });
  
  // Add skill hover effects
  const skillCards = document.querySelectorAll('.bento-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.icon i');
      if (icon) {
        icon.classList.add('fa-beat');
        setTimeout(() => {
          icon.classList.remove('fa-beat');
        }, 1000);
      }
    });
  });
  
  // Add resource link animations
  const resourceLinks = document.querySelectorAll('.resource-list li a');
  
  resourceLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bounce');
        setTimeout(() => {
          icon.classList.remove('fa-bounce');
        }, 1000);
      }
    });
  });
});
