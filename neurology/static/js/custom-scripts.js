$(document).ready(function() {

  $( ".hover-logo" ).hover(
    function() {

      $( this ).find('img').attr('src',siteroot+'/images/retina-logo4h.png');
      $( this ).find('img').attr('srcset',siteroot+'/images/retina-logo4h.png');

    }, function() {
      
      $( this ).find('img').attr('src',siteroot+'/images/retina-logo4.png');
      $( this ).find('img').attr('srcset',siteroot+'/images/retina-logo4.png');

    }
  );
  

  $('.closemodel').on('click', function () {
    $('.modal').modal('hide');
    //window.location.reload(); 
  });

  if($(".validate").length > 0) {
    $('.validate').each(function() {  // attach to all form elements on page
      $(this).validate({       // initialize plugin on each form
        ignore:'',
        submitHandler: function(form) {
          $('.submit-button').val('Sending...');
          $('.submit-button').attr('disabled',true);
          $('#'+form.id).ajaxSubmit({
            type: 'post',
            url: siteroot+'/execute/',
            beforeSubmit: onBeforeSubmit,
            success: onSuccess
          });
        }
      });
    });
  }

  $('.predict-aan-case').validate({
      ignore:'',
      submitHandler: function(form) {
        form.submit();
       // $('#Predict').html('Validating Data...');
        //$('#Predict').attr('disabled',true);
        //predictAAN(); / NOT USED NOW
      }
  });

  $(".ex4").slider({
    ticks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    ticks_labels: ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    ticks_snap_bounds: 6,
    ticks_tooltip:true,
    orientation:'horizontal',
    value: 3,
    range:false,
    tooltip:'show',

  });

  $("[rel='tooltipcp']").tooltip({ placement:'top', boundary: 'window' })

  
  
});

function helpMessage(string) {

  $.toast({
      text: string,
      position: 'mid-center',
      icon: 'info',
      bgColor: '#4a4a4a',
      textColor: 'white',
      stack: false,
      hideAfter:150000000,
      showHideTransition:'plain'
  })

}

function onSuccess(responseText, statusText, xhr, $form)  { 
  if(jQuery.trim(responseText) == '') {
    /*window.location.reload();*/
  } else { eval(responseText);  }
  return false;
}

function onBeforeSubmit(formData, jqForm, options)  { 

}

function getCode() { 
  
  $('#countrycode').val($.trim($('.iti__selected-dial-code').html()))

}


$(document).ready(function () {
  'use strict';

  //===== Menu Active =====//
  var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
  $("nav ul li a").each(function () {
    if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
    $(this).parent('li').addClass("active").parent().parent().addClass("active").parent().parent().addClass("active");
  });

  //===== Menu Active =====//
  var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
  $(".rsnp-mnu ul li a").each(function () {
    if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
    $(this).parent('li').addClass("active").parent().parent().addClass("active-parent").parent().parent().addClass("active-parent");
  });

  //===== Width =====//
  var width = window.innerWidth;

  //===== Side Menu =====//
  $('.rspn-mnu-btn').on('click', function () {
    $('.rsnp-mnu').addClass('slidein');
    return false;
  });
  $('.rspn-mnu-cls').on('click', function () {
    $('.rsnp-mnu').removeClass('slidein');
  });
  $('.rsnp-mnu li.menu-item-has-children > a').on('click', function () {
    $(this).parent().siblings('li').children('ul').slideUp();
    $(this).parent().siblings('li').removeClass('active');
    $(this).parent().children('ul').slideToggle();
    $(this).parent().toggleClass('active');
    return false;
  });

  //===== Select =====//
  if ($('.slc-wrp > select').length > 0) {
    $('.slc-wrp > select').selectpicker();
  }

  //===== Sticky Sidebar =====//
  if(width > 991) {
    if ($('.post-detail-wrap > div.row > div').length > 0) {
      $('.post-detail-wrap > div.row > div').theiaStickySidebar({
        additionalMarginTop: 40,
        additionalMarginBottom: 40
      });
    }
  }

  //===== Counter Up =====//
  if ($.isFunction($.fn.counterUp)) {
    $('.counter').counterUp({
      delay: 10,
      time: 2000
    });
  }

  //===== LightBox =====//
  if ($.isFunction($.fn.fancybox)) {
    $('[data-fancybox],[data-fancybox="gallery"]').fancybox({});
  }

  //===== Scrollbar =====//
  if ($('.rsnp-mnu').length > 0) {
    var ps = new PerfectScrollbar('.rsnp-mnu');
  }

  //===== Calendar =====//
  if ($('#calendar').length > 0) {
    $('#calendar').fullCalendar({
      defaultDate: '2021-02-12',
      editable: true,
      eventLimit: true // allow "more" link when too many events
    });
  }

}); //===== Document Ready Ends =====//

//===== Window onLoad =====//
$(window).on('load',function () {
  'use strict';
  
  //===== Page Loader =====//
  jQuery("#preloader").fadeOut(300);

  //===== Isotope =====//
  if (jQuery('.fltr-itm').length > 0) {
    if (jQuery().isotope) {
      var jQuerycontainer = jQuery('.masonry'); // cache container
      jQuerycontainer.isotope({
        itemSelector: '.fltr-itm',
        columnWidth: .1
      });
      jQuery('.filter-links a').on('click',function () {
        var selector = jQuery(this).attr('data-filter');
        jQuery('.filter-links li').removeClass('active');
        jQuery(this).parent().addClass('active');
        jQuerycontainer.isotope({ filter: selector });
        return false;
      });
      jQuerycontainer.isotope('layout'); // layout/layout
    }

    jQuery(window).resize(function () {
      if (jQuery().isotope) {
        jQuery('.masonry').isotope('layout'); // layout/relayout on window resize
      }
    });
  }

});//===== Window onLoad Ends =====//

//===== Sticky Header =====//
$(window).on('scroll',function () {
  'use strict';

  var menu_height = $('header').innerHeight();
  if(menu_height==0) {
    var menu_height = $('.mobile-header').innerHeight();
  }

  var scroll = $(window).scrollTop();
  if (scroll >= menu_height) {
    $('body').addClass('sticky');
  } else {
    $('body').removeClass('sticky');
  }

});//===== Window onScroll Ends =====//


