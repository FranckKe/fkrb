$(document).foundation({
"magellan-expedition": {
  active_class: 'magellan-active-custom', // specify the class used for active sections
  threshold: 0, // how many pixels until the magellan bar sticks, 0 = auto
  destination_threshold: 5, // pixels from the top of destination for it to be considered active
  throttle_delay: 50, // calculation throttling to increase framerate
  fixed_top: 0, // top distance in pixels assigned to the fixed element on scroll
}
});


$( document ).ready(function() {

  var slicker_s = $(".slicker");
  var overlay_s = $(".overlay");
  var skilled_s = $(".skilled");
  var experienced_s = $(".experienced");
  var legend_s = ".skills-legend-skilled";
  var navTitlte_s = $(".nav-title");
  var $root = $('html, body');

  slicker_s.slick({
    infinite: true,
    slidesToScroll: 1,
    arrows:false,
    fade: false,
    speed: 700,
    onBeforeChange: 
      function(slider,currentIndex, targetIndex){
        beforeChangeFunc(targetIndex);
      }
  });

   if ($(window).width() > 700){
    new WOW().init();
    skrollr.init();

  }
  if ($(window).height() < 710){
     $(".contact-fixed").css("position","relative");
     $(".contact-fixed").css("margin-top","0px");
  }else{
     $(".contact-fixed").css("position","fixed");
     // $(".contact-fixed").css("margin-top","42px");
  }

  

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


  $(window).on('resize', function(){
    if ($(window).width() > 700){
     skilled_s.hover(function(){
         $(this).parent().find().css("visibility","visible");
       },
       function(){
         $(this).parent().find(legend_s).css("visibility","hidden");
       });

       experienced_s.hover(function(){
         $(this).parent().find(legend_s).css("visibility","visible");
       },
       function(){
         $(this).parent().find(legend_s).css("visibility","hidden");
       });
   }
   if ($(window).height() < 710){
      $(".contact-fixed").css("position","relative");
      $(".contact-fixed").css("margin-top","0px");
   }else{
      $(".contact-fixed").css("position","fixed");
      // $(".contact-fixed").css("margin-top","42px");
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

  var form = $('#myForm');
  var formMessages = $('.formButton');

  $(form).submit(function(event) {
      event.preventDefault();
      var formData = $(form).serialize();
      
      $.ajax({
          type: 'POST',
          url: $(form).attr('action'),
          data: formData
      })
        .done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            
            $(formMessages).prop('value', 'Yay');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        })

        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).prop('value', 'Nay');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
          });
  });
  
});