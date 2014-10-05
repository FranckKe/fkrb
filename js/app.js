$( document ).ready(function() {
  "use strict";
  $('.no-fouc').removeClass('no-fouc');

  $(document).foundation({
    "magellan-expedition": {
      active_class         : "magellan-active-custom", // specify the class used for active sections
      threshold            : 0, // how many pixels until the magellan bar sticks, 0 = auto
      destination_threshold: 5, // pixels from the top of destination for it to be considered active
      throttle_delay       : 50, // calculation throttling to increase framerate
      fixed_top            : 0, // top distance in pixels assigned to the fixed element on scroll
    }
  });

  var slicker_s          = $(".slicker");
  var overlay_s          = $(".overlay");
  var about              = $("#about");
  var contact            = $("#contact");
  var project            = $("#project");
  var projectHeight      = 0;
  var contactFixed       = $(".contact-fixed");
  var contactWrapper     = $(".contact-wrapper");
  var contactP           = $(".p-wrapper");
  var contactTitle       = $(".contact-wrapper h2");
  var contactForm        = $(".form-wrapper");
  var contactHeight      = 0;
  var navTitlte_s        = $(".nav-title");
  var targetIndex        = 0;
  var activeSlideContent = '.projects[index="'+targetIndex+'"]';
  var activeShowcase     = $(activeSlideContent).find(".img-wrapper");
  var global_index       = 0;
  var $root              = $('html, body');
  var o_wow              = 0;
  var o_skrollr          = 0;
  var form               = $('#myForm');
  var formMessages       = $('.formButton');

  slicker_s.slick({
    infinite      : true,
    slidesToScroll: 1,
    arrows        :false,
    fade          : false,
    speed         : 700,
    onBeforeChange: 
      function(slider,currentIndex, targetIndex){
        beforeChangeFunc(targetIndex);
      }
  });

   if ($(window).width() > 1024){
    skillHover();
    o_wow     = new WOW().init();
    o_skrollr = skrollr.init({forceHeight: false});
  }
  
  if ($(window).height() < 710){
    contactResize("relative");
    contactFixed.css("position","relative");
    contactFixed.css("margin-top","0px");
  }else{
    contactResize("fixed");
    contactFixed.css("position","fixed");        
    contactFixed.css("margin-top","42px");
  }

 

 /* ====== NAV ======*/
  $(".hamburger").click(function(){
    overlay_s.toggleClass("overlay-slidedown");
  });
  $(".cross-close").click(function(){
   overlay_s.toggleClass("overlay-slidedown");
  });
  $(".overlay a").click(function(){
    overlay_s.toggleClass("overlay-slidedown");
  });

  $("nav a").click(function() {
      $root.animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
      return false;
  });

  $(".magellan a").click(function() {
      $root.animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
      return false;
  });
  /* ====== /NAV ======*/

  $(window).on('resize', function(){
    projectResize(global_index);
    if ($(window).width() > 1024){
      contactResize("fixed");
      if(o_wow === 0){o_wow = new WOW().init();}
      if(o_skrollr === 0){ o_skrollr = skrollr.init({forceHeight: false});}

      skillHover();

      if ($(window).height() < 710){
        contactResize("relative");
        contactFixed.css("position","relative");
        contactFixed.css("margin-top","0px");
      }else{
        contactResize("fixed");
        contactFixed.css("position","fixed");        
        contactFixed.css("margin-top","42px");
      }
    }else{
      contactResize("relative");
      contactFixed.css("position","relative");
      contactFixed.css("margin-top","0px");
    }
  });

  
  navTitlte_s.click(function() {
    var slickerIndex = $(this).attr("index");
    slicker_s.slickGoTo(slickerIndex);
  });

  $(".arrow-right").click(function() {
    slicker_s.slickNext();
  });

  $(".arrow-left").click(function() {
    slicker_s.slickPrev();
  });

  function beforeChangeFunc(targetIndex){
    global_index=targetIndex;
    projectResize(targetIndex);
    navTitlte_s.each(function(){
      if($(this).attr("index") == targetIndex){
        $(this).toggleClass("active-slide-title");
        $(this).parent().toggleClass("active-slide-tab");
      }else{
        if($(this).hasClass("active-slide-title")){
          $(this).toggleClass("active-slide-title");
          $(this).parent().toggleClass("active-slide-tab");
        }
      }
    });
  }
 

  $(form)
    .on('invalid.fndtn.abide', function () {
      return false;
    })
    .on('valid.fndtn.abide',function(event) {
      formMessages.html('<div class="loader button small-12 medium-12 large-12" title="0"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/> <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/> </path> </svg> </div>');

      var formData = $(form).serialize();
      
      $.ajax({
          type: 'POST',
          url: "php/mailer.php",
          data: formData
      })
        .done(function(response) {

            formMessages.html('<input type="submit" class="button small-12 medium-12 large-12 columns" value="Success!">');

            $('#name').val('');
            $('#email').val('');
            $('#message').val('');

            setTimeout(function(){
              formMessages.html('<input type="submit" class="button small-12 medium-12 large-12 columns" value="Send Message">');
            }, 2000);

        })

        .fail(function(data) {
           formMessages.html('<input type="submit" class="button small-12 medium-12 large-12 columns" value="Error :(">');
           setTimeout(function(){
              formMessages.html('<input type="submit" class="button small-12 medium-12 large-12 columns" value="Send Message">');
            }, 2000);
          });
  });

  function projectResize(targetIndex){
    activeSlideContent = '.projects[index="'+targetIndex+'"] ';
    projectHeight = $(activeSlideContent).height() + $(".slicker-nav").height() + $(".project-title").height() +40;
    project.css("height",projectHeight);
    var activeShowcase     = $(activeSlideContent).find(".img-wrapper");
    if($(window).width() > 1024){
      if(targetIndex!==0){
        activeShowcase.css("margin-top", projectHeight/8 );
      }
    }else{
      activeShowcase.css("margin-top", 0);
    }
  }

  function contactResize(contactPosition){
    if (contactPosition === "relative") {
      contactHeight = contactP.height() + contactForm.height() + contactTitle.height();
      contact.css("height",contactHeight);
      contactWrapper.css("height",contactHeight);
    }else if(contactPosition === "fixed"){
      contact.css("height","100vh");
      contactWrapper.css("height","100%");
    }
  }

  function skillHover(){
    // ====== Front end ======
    $(".front-end .skilled").hover(function(){
      $(".legend-front-end-skilled").css("margin-right","8%");
      },
      function(){
       $(".legend-front-end-skilled").css("margin-right","-50%");
    });

    $(".front-end .experienced").hover(function(){
      $(".legend-front-end-experienced").css("margin-right","8%");
      },
      function(){
      $(".legend-front-end-experienced").css("margin-right","-50%");
    });
    // ====== /Front end ======

    // ====== Back end ======
    $(".back-end .experienced").hover(function(){
      $(".legend-back-end-experienced").css("margin-right","8%");
      },
      function(){
      $(".legend-back-end-experienced").css("margin-right","-50%");
    });
    // ====== /Back end ======

    // ====== Tools ======
    $(".tools .skilled").hover(function(){
      $(".legend-tools-skilled").css("margin-right","8%");
      },
      function(){
       $(".legend-tools-skilled").css("margin-right","-50%");
    });

    $(".tools .experienced").hover(function(){
      $(".legend-tools-experienced").css("margin-right","8%");
      },
      function(){
      $(".legend-tools-experienced").css("margin-right","-50%");
    });
    // ====== /Tools ======

    // ====== Misc ======
    $(".misc .experienced").hover(function(){
      $(".legend-misc-experienced").css("margin-right","8%");
      },
      function(){
      $(".legend-misc-experienced").css("margin-right","-50%");
    });
    // ====== /Misc ======
  }
  projectResize(global_index);
});