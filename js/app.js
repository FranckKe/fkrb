$(document).foundation();

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

});