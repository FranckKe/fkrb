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

  new WOW().init();

  skrollr.init();

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


  
});