

$(document).ready(function(){
    $('.slide_visual').slick({
        draggable:true,
        arrows:false,
        dots:true,
        appendDots: $('#main_dots'),
        infinite: false,
        focusOnChange: false,
        accessibility: false,
    });
    
    var menuListSlide = $('#menu_list .menu_list_slide');
    menuListSlide.slick({
        arrows:false,
        infinite :false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots:true,
                }
            },
        ]
    })

    var helpers = {
        addZeros: function (n) {
            return (n < 10) ? '0' + n : n;
        }
    };
    function subSlide1() {
        $('.sub_slide1').slick({
            slide: 'a',
            draggable:true,
            infinite: true,
            arrows:true,
            dots:false,
            appendArrows: $('#arrows'),
            prevArrow: $('.prevArrow'),
            nextArrow: $('.nextArrow'),
            autoplay: true,
            autoplaySpeed: 4000,
        }).on('beforeChange', function( event, slick, currentSlide, nextSlide){
            var $progressBar = $('.progress');
            var $progressBarLabel = $( '.slider__label' );

            // progressBar
            var calc = ( (nextSlide) / (slick.slideCount - 1) ) * 100;    
            $progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc );
            $progressBarLabel.text( calc + '% completed' );
        }).on('afterChange', function(event, slick, currentSlide, nextSlide){
            var $current = $('.currentPage');
            var i = (currentSlide ? currentSlide : 0) + 1;
            $current.text(helpers.addZeros(i));
        });

        // slide Page Count
        var sliderItemsNum = $('.sub_slide1').find('.slick-slide').not('.slick-cloned').length;
        var $totalPage = $('.totalPage');
        $totalPage.text(helpers.addZeros(sliderItemsNum));
        
        $('.subBanStop').click(function(){
            if(!$(this).hasClass('pause')){
                $(this).addClass('pause');
                $('.sub_slide1').slick('slickPause');
            }else{
                $(this).removeClass('pause');
                $('.sub_slide1').slick('slickPlay');
            }
        });
        
    
    }
    subSlide1();

    $('#goToTop').on('click', function(){
        $('html,body').animate({scrollTop:0}, 200);
    });

    var mainScroll ;
    var mainScrollGap ;
    window.addEventListener('load', function() {
        mainScroll = window.scrollY || document.documentElement.scrollTop;
        mainScrollGap = window.innerHeight;

        var mVisual = document.querySelector('#main_visual');
        if (mainScroll >= 0) {
            mVisual.classList.add('active');
        }

        window.addEventListener('scroll', function () {
            mainScroll = window.scrollY || document.documentElement.scrollTop;
            mainScrollGap = window.innerHeight;
            // menu_list
            var menuList = document.querySelector('#menu_list');
            var mainMenuList = menuList.offsetTop - mainScrollGap;
            if (mainScroll > mainMenuList + 100) {
                menuList.classList.add('active');
            } else if (mainScroll < mainMenuList - 500) {
                menuList.classList.remove('active');
            };

            // direct_info
            var directInfo = document.querySelector('#direct_info');
            var mainDirectInfo = directInfo.offsetTop - mainScrollGap;
            if (mainScroll > mainDirectInfo) {
                directInfo.classList.add('active');
            } else if (mainScroll < mainDirectInfo - 500) {
                directInfo.classList.remove('active');
            };
        });
    });


    // 예약확인 정규식
    var phoneNum = document.getElementById('phoneNum');
    phoneNum.addEventListener("input", function() {
        oninputPhone(this);
    })
    // 전화번호
    function oninputPhone(target) {
        target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
    }
})
