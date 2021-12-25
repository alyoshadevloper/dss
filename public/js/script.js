$(document).ready(function () {

    /// ==========  preloader ==========
    var $preloader = $('.preloader')
    var i = 0

    function num() {
        var rgb = Math.floor(Math.random() * 1000)

        $('.preloader p').html(i + '%')

        $('.preloader h4').css("color", `#${rgb}`)


        i++
        if (i >= 101) {
            clearInterval(ds)
            $preloader.animate({
                opacity: 0,

            }, 2000, function () {
                $preloader.css("display", "none")
            })

        }
    }



    var ds = setInterval(function () {
        num()
    }, 5);






    /// ==========  header header-menubar ==========
    var closes

    function check() {
        var heightmenu = $(".nav-menu-list ul").innerHeight()
        if ($(window).width() < 767) {
            $(".nav-menu-list").css("height", heightmenu)
        }
    }

    $('.nav-menu .sort').hover(
        function () {
            clearTimeout(closes);
            $(".nav-menu-list").addClass('active-block')
            check()
        },

        function () {
            closes = setTimeout(function () {
                $(".nav-menu-list").removeClass("active-block");
                check()
            }, 1000);
        })

    $(".nav-menu-list").hover(
        function () {
            clearTimeout(closes);
            $(".nav-menu-list").addClass("active-block");
            check()
        },

        function () {
            closes = setTimeout(function () {
                $(".nav-menu-list").removeClass("active-block");
                check()
            }, 0);
        });

    /// ==========  header nav-fixed ==========
    var $header = $('header')
    var $nav = $('.header-menubar')
    var flag = false

    function fixed() {
        if (scrollY >= $header.innerHeight() && !flag) {
            $nav.addClass('fixed-nav').css('opactiy', 0).animate({
                opacity: 1
            }, 1000)
            flag = true
        } else if (scrollY < $header.innerHeight() && flag) {
            $nav.animate({
                opacity: 0
            }, 1000, function () {
                $nav.removeClass('fixed-nav').css('opacity', 1)
            })
            flag = false
        }
    }
    $(window).on('scroll', fixed)
    fixed()
    /// ==========  header owl-carousel ==========

    $("header .owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true
    });

    /// ==========  header>.scroll-top ==========
    var top = $('.scroll-top')
    $(window).scroll(function () {
        var sizeTop = $(this).scrollTop()
        if (sizeTop >= 700) {
            top.show(500)
        } else {
            top.hide(500)
        }
    })
    top.click(function () {
        $('html , body').animate({
            scrollTop: 0
        }, 500)
    })

    /// ==========  section>product owl-carousel ==========

    $(".product .owl-carousel").owlCarousel({
        items: 7,
        nav: true,
        loop: true,
        autoplay: true,
        responsive: {
            992: {
                items: 5,
                margin: 0
            },
            1200: {
                items: 7
            },


        }
    });

    /// ==========  section>.productInfo .infoCard-img  owl-carousel ==========

    $(".productInfo .infoCard-img .owl-carousel").owlCarousel({
        items: 1,
        dots: true,
        loop: true,
    });



    $(".productInfo .productInfo-carousel .owl-carousel").owlCarousel({
        items: 5,
        nav: false,
        loop: true,
        autoplay: true,
        margin: 7
    });

    /// ==========  section>cardProduct> podrobnie ==========

    var btnAbout = $('.card-view')
    btnAbout.on('mouseover', function () {
        $(this).addClass('card-product-active')
    })
    btnAbout.on('mouseout', function () {
        $(this).removeClass('card-product-active')
    })

    /// ==========  section>addProduct> add product img  ==========

    var inp = $('.addProduct input')
    console.log(inp);

    function download(input) {
        let file = input.files[0]

        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            let imgs = document.createElement('img')
            if ($(input).parent().find('img').is('img')) {
                $(input).parent().find("img").remove("img")
                $(input).parent().append(imgs)
                imgs.src = reader.result
            } else {
                $(input).parent().append(imgs)
                imgs.src = reader.result
            }
        }
    }

    inp.on('change', function () {
        download(this)
    })

    /* shopping bag send localstorege card id info */

    var bags = $('.bag')
    console.log(bags);
    bags.on('click', function (e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        var str = id.slice(0 , 8)
        let data =  
            {
                dataId: id,
                ourId : str
            }
          
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)
        }
        fetch('/bag', options);

    })

 

    /* shopping bag adding and removeing count */

    // var addCount = $('.addCount')
    // var removeCount = $('.removeCount')
    // var countNum = $('.countNum')

    // addCount.on('click', function (e) {


    // })

    /* shopping bag removeing product */

    // var deleteBags = $('.deleteBags')
    // deleteBags.on('click', function (e) {
    //     let id = $(this).attr('data-id')
    //       let option = {
    //         method : 'get',
    //     }
    //     fetch('/bag/remove/'+ id , option)
    // })


    document.querySelectorAll('.price .sum').forEach(element => {
        element.textContent = new Intl.NumberFormat('uz-Uz', {
            currency: "UZS",
            style: 'currency'
        }).format(element.textContent)
    });;
});