(function ($) {
  'use strict';

  // Preloader js    
  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });

  // dropdown menu
  var mobileWidth = 992;
  var navcollapse = $('.navbar .dropdown');
  $(window).on('resize', function () {
    navcollapse.children('.dropdown-menu').hide();
  });
  navcollapse.hover(function () {
    if ($(window).innerWidth() >= mobileWidth) {
      $(this).children('.dropdown-menu').stop(true, false, true).slideToggle(300);
    }
  });

  // hero slider
  $('.slider').slick({
    dots: true,
    speed: 300,
    arrows: false,
    autoplay: true
  });

  var containerEl = document.querySelector('.gallery-container');
    var mixer;
    if (containerEl) {
        mixer = mixitup(containerEl, {
            selectors: {
                target: '.mix'
            }
        });
    }


  // testimonial slider
  $('.testimonial-slider, .gallery-slider').slick({
    dots: false,
    speed: 300,
    arrows: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\'></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\'></button>',
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // venobox popup
  $('.venobox').venobox();

  // masonary
  $(document).ready(function () {
    $(".faq-list").isotope({
      layoutMode: "masonry",
      masonry: {
        columnWidth: 1,
        horizontalOrder: false
      }
    });
  });
  
  $(document).ready(function () {
    
    // $( ".info" ).off( "mouseenter mouseleave" );
    // $('.info').hover( 
    //   function(){
    //     var id = $(this).data('id');
    //     $("." + id ).css({ opacity: 1, 'z-index' : 5});
    //   },
    //   function(){
    //     var id = $(this).data('id');
    //     $("." + id ).css({ opacity: 0, 'z-index' : 1});
    //   }
    // );


    



    var lib = {
        showMorePic : function( $this){
            var picID = $this.data('picid');
            var placeholder_id = 0;
            var $width = lib.getWindowWidth();

            if( $width >= 768 ){
                var colID = 3;
                var pic_left = 0;
                if( picID == 0 ){
                  pic_left = colID;
                  placeholder_id = colID;
                }else{
                  if( picID > colID ){
                    var rowNum = Math.ceil( parseInt( picID ) / parseInt( colID ) );
                    placeholder_id = rowNum * parseInt( colID );
    
                  }else{
                    pic_left = parseInt( colID ) - parseInt( picID );
                    placeholder_id = parseInt( picID ) + pic_left;
                  }
                }

            }else{
                placeholder_id = picID;
            }

            var y = $(window).scrollTop();
            $('html, body').animate({ scrollTop: y + 200 }) 

            var closeBtn = '<button class="btn-hide-more-pic">X</button>';
            var morePic = $(".more-pic-"+ picID ).html();
            
            $(".more-pic-placeholder").slideUp('fast').html('');
            var placeHolderId = lib.getPlaceholderId( placeholder_id );
            $(".placeholder-id-" + placeHolderId ).show('slow');
            $(".placeholder-id-" + placeHolderId ).html( closeBtn+ morePic ).addClass('test').css({width : '100%'});
            $(".placeholder-id-" + placeHolderId ).find('.childs-pic').addClass('change-bg-color');


            console.log( picID+' -- '+placeHolderId +' -- '+ pic_left +' -- '+ rowNum);
        },
        getWindowWidth : function(){
            return $(window).width();  
        },
        getWindowHeight : function(){
            return $(window).height();  
        },
        getPlaceholderId: function( id ){
            if( $(".placeholder-id-" + id ).length  ){
              return id;
            }  
            else if( $(".placeholder-id-" + parseInt(id) - 1 ).length  ){
                return parseInt(id) - 1;
              }  
              else if( $(".placeholder-id-" + parseInt(id) - 2 ).length  ){
                return parseInt(id) - 2;
              }else{
                return parseInt(id) - 2;
            }  
        },
        showMorePicPopup : function( $this ){
            var picID = $this.data('picid');
            var placeholder_id = 0;
            var $width = lib.getWindowWidth();

            var morePic = $(".more-pic-"+ picID ).html();

            var windowWidth = lib.getWindowWidth();
            var windowHeight = lib.getWindowHeight();
            if( $width >= 768 ){
              var pWidth = parseInt( windowWidth ) - 200;
              var pHeight = parseInt( windowHeight ) - 100;
              var ppHeight = parseInt( pHeight ) - 38;
            }else{
              var pWidth = parseInt( windowWidth ) - 20;
              var pHeight = parseInt( windowHeight ) - 20;
              var ppHeight = pHeight;
            }

            $(".body-overlay").show();
            $(".show").fadeIn();
            $(".img-show").css({ width: pWidth, height: pHeight});
            $(".img-show").find('.ph_more_pic_info').css({ height: ppHeight, overflow: 'auto'});
            // $(".img-show > .ph_more_pic_info").find('.more-pic-items').css({ height: ppHeight, overflow: 'auto'});
            $(".img-show .ph_more_pic_info").html( morePic );

        }

    };

    $(".top-img").on('click', function(){
        var $this = $(this);
        // lib.showMorePic( $this );
        lib.showMorePicPopup( $this );
    });

    $("body").on( 'click', '.btn-hide-more-pic', function(){
        $(this).hide('slow');
        $(this).next(".more-pic-items").hide('slow'); 
    });

    $("body").on( "click", ".popup img", function () {
        $(".body-overlay").show();
        var $src = $(this).attr("src");
        $(".show").fadeIn();
        $(".img-show img").attr("src", $src);
    });
    
    $("body").on( 'click', "span, .overlay",function () {
        $(".show").fadeOut();
        $(".body-overlay").hide();
    });

  });

  $(window).on('load', function () {
      setTimeout(function() {
        let imgs = document.querySelectorAll('[data-src]');
          imgs.forEach( image => {
              $( image ).attr( 'src', image.dataset.src );
              $( image ).removeAttr( 'data-src');
          });
      }, 200 );
  })



})(jQuery);
