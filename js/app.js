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
   $('.slicker').slick({
      // slidesToShow: 1,
      infinite: true,
      slidesToScroll: 1,
      arrows:false,
      fade: false,
      speed: 700,
      onBeforeChange: function(slider,currentIndex, targetIndex){
        beforeChangeFunc(targetIndex);
    }
  });

 skrollr.init({
    render: function(data) {
      // console.log(data.curTop);
    }
  });

 new WOW().init();

  $(".nav-title").click(function() {
    var slickerIndex = $(this).attr("index");
    $(".slicker").slickGoTo(slickerIndex);
  });

  $(".arrow-right").click(function() {
    $(".slicker").slickNext();
  });

  $(".arrow-left").click(function() {
    $(".slicker").slickPrev();
  });



  function beforeChangeFunc(targetIndex){
    $(".nav-title").each(function(){
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

  $(".skilled").hover(function(){
    $(this).parent().find(".skills-legend-skilled").css("visibility","visible");
  },
  function(){
    $(this).parent().find(".skills-legend-skilled").css("visibility","hidden");
  });

  $(".experienced").hover(function(){
    $(this).parent().find(".skills-legend-experienced").css("visibility","visible");
  },
  function(){
    $(this).parent().find(".skills-legend-experienced").css("visibility","hidden");
  });

});