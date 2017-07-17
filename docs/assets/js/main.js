(function($, document) {

   var japick = {

      cache: function() {
         japick.els = {};
         japick.vars = {};

         japick.els.$body = $('body');
         japick.els.$window = $(window);
         japick.els.$document = $(document);
      },

      on_ready: function() {
         japick.cache();
         japick.on_resize();
         japick.on_scroll();
         japick.on_load();
         japick.slidePanel();
         japick.scrollToTop();
         japick.scrollToSection();
         japick.sideNavigation();
         //japick.detectMobile();
      },

      on_resize: function() {
         japick.els.$window.resize( function() {
            japick.fillViewport();
            japick.detectMobile();
         }).resize();
      },

      on_scroll: function() {
         japick.els.$window.scroll( function(){
         });
      },

      on_load: function() {
         japick.els.$window.load( function(){
         });
      },

      slidePanel: function() {
         $('.nav__toggle').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('is-active');
            $(this).toggleClass('is-active');

            if(japick.els.$window.width() > 1024) {
                $('#section-wrapper').toggleClass('shift-left');
            }
         });
      },

       fillViewport: function() {
            var viewportHeight = window.innerHeight,
                element = $('.fill-viewport');

           element.css('height', viewportHeight + 'px');
       },

       scrollToTop: function() {
            $('.scroll-top').click(function(){
                $('html, body').animate({scrollTop : 0}, 300);
                return false;
            });
       },

       scrollToSection: function() {
            $('.page-anchors a').on('click',function (e) {

              var target = this.hash;
              var $target = $(target);

              $('html, body').stop().animate({
                  'scrollTop': $target.offset().top
              }, 300, 'swing');
          });
       },

       detectMobile: function() {
            var navToggle = $('.nav__toggle'),
                sideNav = $('.nav__side'),
                sectionWrapper = $('#section-wrapper');

            if(japick.els.$window.width() > 1024) {
                navToggle.addClass('is-active');
                sideNav.addClass('is-active');
                sectionWrapper.addClass('shift-left');
            } else {
                navToggle.removeClass('is-active');
                sideNav.removeClass('is-active');
                sectionWrapper.removeClass('shift-left');
            }
       },

      sideNavigation: function() {
        $('.sidebar-list a').on('click', function(e) {

          $('.sidebar-list a').removeClass('is-active');
          $(this).addClass('is-active');

          var target = this.hash;
          var $target = $(target);


          $('html, body').stop().animate({
              'scrollTop': $target.offset().top
          }, 300, 'swing');
        });
      }

   };

	$(document).ready( japick.on_ready() );

}(jQuery, document));
