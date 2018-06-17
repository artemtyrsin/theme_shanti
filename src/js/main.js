function gallery(el, el_item, margin) {
  var width_row = $(el).width(),
    blocks = [],
    items = [],
    width = 0;

  $(el_item, el).each(function() {
    width += $(this).width() + margin;

    if (width_row < width) {
      blocks.push(items);
      width = $(this).width() + margin;
      items = [this];
    } else {
      items.push(this);
    }
  });

  if (items.length) {
    blocks.push(items);
  }

  for (var i = 0; i < blocks.length; i++) {
    var items_width = 0;
    for (var j = 0; j < blocks[i].length; j++) {
      items_width += $(blocks[i][j]).width() + margin;
    }

    var last = width_row - items_width;
    if (last > 0) {
      var old_width = $(blocks[i][blocks[i].length - 1]).width();
      $(blocks[i][blocks[i].length - 1]).width(old_width + last);
    }
  }
}


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

  $('.entry-content table').addClass('table');

  $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');

    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
    });

    return false;
  });

  gallery(".photos", ".photo__item", 6);
});
