$(function() {

  if ($.fn.slick) {
    $('.slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      draggable: true,
      fade: true
    });
  }

  if($.fn.gpGallery) {
    $('.photos').gpGallery('.photo__item', {
      'row_min_height':280,
      'row_max_height':360,
      'gutter':6
    });
  }

  $('.entry-content table').addClass('table');
});
