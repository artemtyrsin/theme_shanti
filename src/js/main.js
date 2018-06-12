$(function() {

  if ($.fn.slick) {
    $(".slider").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      draggable: true,
      fade: true
    });
  }
});
