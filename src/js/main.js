
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});



$(document).ready(function() {
    checkScrollNavbar();
});
$(window).scroll(function() {
    checkScrollNavbar();
});



$(".navbar-nav>li").click(function() {
    if (window.innerWidth < 768) {
        $('.navbar-collapse').removeClass("show");
    }
});




$("#gmail").click(function() {
    copyToClipboard("#gmail");

});

$("#mail").click(function() {
    copyToClipboard("#mail");
});












function checkScrollNavbar() {
    if ($(this).scrollTop() > 300) {
        $('nav').addClass("bg-dark p-0");
        $(".navbar-brand").addClass("ml-2");
        $(".navbar-toggler").addClass("mr-2");
    } else {
        $('nav').removeClass("bg-dark p-0");
        $(".navbar-brand").removeClass("ml-2");
        $(".navbar-toggler").removeClass("mr-2");
    }
};

function copyToClipboard(elemId) {
    var $id = $(elemId);
    var $needText = $id.attr("data-original-title");
    var $temp = $("<textarea></textarea>");

    $("body").append($temp);
    $temp.val($needText).select();
    document.execCommand("copy");
    $temp.remove();
};
