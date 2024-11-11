// filter - Beds & baths

$('.fscontent__bb .selecteltext').click(function () {
    $(this).next('.ddmenu').toggle();
    $(this).toggleClass('active');
})

document.addEventListener("DOMContentLoaded", function () {
    const selecteltext = document.querySelector('.selecteltext');

    function formatSelection(selectedLabels) {
        const numericLabels = [];
        const textLabels = [];

        // Розділяємо числові та текстові значення
        selectedLabels.forEach(label => {
            // Перевірка, чи значення містить тільки цифри (без додаткових символів)
            const number = parseInt(label, 10);
            if (isNaN(number) || /\D/.test(label)) {  // Перевірка на наявність нецифрових символів
                textLabels.push(label);  // Зберігаємо текстові значення, як-от "Any", "Studio", "7+"
            } else {
                numericLabels.push(number);
            }
        });

        // Сортуємо числові значення і формуємо діапазони
        numericLabels.sort((a, b) => a - b);
        const ranges = [];
        let rangeStart = numericLabels[0];
        let rangeEnd = numericLabels[0];

        for (let i = 1; i <= numericLabels.length; i++) {
            if (numericLabels[i] === rangeEnd + 1) {
                rangeEnd = numericLabels[i];
            } else {
                ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);
                rangeStart = numericLabels[i];
                rangeEnd = numericLabels[i];
            }
        }

        // Об'єднуємо текстові та числові діапазони
        return [...textLabels, ...ranges].join(', ');
    }

    function updateText() {
        const sections = document.querySelectorAll('.labksbox');
        let bedsText = 'Beds';
        let bathsText = 'Baths';
        let hasSelection = false;

        sections.forEach((section, index) => {
            const selectedLabels = Array.from(section.querySelectorAll('.bb-label input[type="checkbox"]:checked + label'))
                .map(label => label.textContent);

            if (selectedLabels.length > 0) {
                hasSelection = true;
                const selectedText = formatSelection(selectedLabels);

                if (index === 0) {
                    bedsText = `Beds: ${selectedText}`;
                } else {
                    bathsText = `Baths: ${selectedText}`;
                }
            }
        });

        selecteltext.textContent = hasSelection ? `${bedsText} & ${bathsText}` : 'Beds & baths';
    }

    document.querySelectorAll('.bb-label input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateText);
    });
});
$(document).click(function (event) {
    let $target = $(event.target);
    if (!$target.closest('.fscontent__bb').length) {
        $('.fscontent__bb .ddmenu').hide();
        $('.fscontent__bb .selecteltext').removeClass('active');
    }
});
















// filter - PRICE

if ($('.filter-sectionwrap').length) {
    $('.fscontent__price .selecteltext').click(function () {
        $(this).next('.ddmenu').toggleClass('show');
        $(this).toggleClass('active');
    })

    document.addEventListener("DOMContentLoaded", function () {
        const priceText = document.querySelector('.fscontent__price .selecteltext');
        const minPriceInput = document.querySelector('.ddprce-col:first-of-type input[type="number"]');
        const maxPriceInput = document.querySelector('.ddprce-col:last-of-type input[type="number"]');
        const applyButton = document.querySelector('.ddprce-col .apply');
        const resetButton = document.querySelector('.ddprce-col .reset');

        // Функція для оновлення тексту в "Price"
        function updatePriceText() {
            const minPrice = minPriceInput.value;
            const maxPrice = maxPriceInput.value;

            if (minPrice || maxPrice) {
                priceText.innerHTML = `<span>AED</span> ${minPrice || '0'} - ${maxPrice || '0'}`;
            } else {
                priceText.textContent = 'Price';
            }
        }

        // Подія для кнопки "Apply"
        applyButton.addEventListener('click', function () {
            updatePriceText();
        });

        // Подія для кнопки "Reset"
        resetButton.addEventListener('click', function () {
            minPriceInput.value = '';
            maxPriceInput.value = '';
            priceText.textContent = 'Price';
        });
    });
}


// if ($('.fscontent__price').length) {
$(document).click(function (event) {
    let $target = $(event.target);
    if (!$target.closest('.fscontent__price').length) {
        $('.fscontent__price .ddmenu').removeClass('show');
        $('.fscontent__price .selecteltext').removeClass('active');
    }
});
// }









$(document).ready(function () {
    //remove body class
    // function removeLoadPageClass() {
    //     if (document.body.classList.contains('loadpage')) {
    //         document.body.classList.remove('loadpage');
    //     }
    // }
    // setTimeout(removeLoadPageClass, 4000);
    // window.addEventListener('scroll', function () {
    //     if (window.scrollY > 0) {
    //         removeLoadPageClass();
    //     }
    // });


    // styled selects
    if ($('select').length) {
        $('.styledselect').select2({
            // placeholder: "Project Type*",
            minimumResultsForSearch: Infinity,
        });
    }

    // scroll to
    $(".welcomesection__scrollarr").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top - 100;
        $('body,html').animate({ scrollTop: top }, 800);
    });

    // burger

    $('.burger').click(function () {
        $(this).toggleClass('on');
        const nav = $('.header.header .headerwrapper');
        nav.toggleClass('show');

        if (nav.hasClass('show')) {
            const items = nav.find('ul > li');
            items.each(function (index) {
                setTimeout(() => {
                    $(this).css({
                        'opacity': '1',
                        'transform': 'translateX(0)'
                    });
                }, index * 100); // Затримка між кожним елементом
            });
        } else {
            const items = nav.find('ul > li');
            items.css({
                'opacity': '0',
                'transform': 'translateX(10px)'
            });
        }
    });

    if ($('.property-slider').length) {
        var swiper = new Swiper(".property-slider", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    if ($('.similarcont').length) {
        var swiper = new Swiper(".similarcont", {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: ".swiper-button-next-t",
                prevEl: ".swiper-button-prev-t",
            },
            breakpoints: {
                400: {
                    slidesPerView: 1.4,
                },
                576: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },


            },
        });
    }

    if ($('.testimonials-slider').length) {
        var swiper = new Swiper(".testimonials-slider", {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: ".swiper-button-next-t",
                prevEl: ".swiper-button-prev-t",
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },


            },
        });
    }


    















    // // AOS
    // AOS.init({
    //     once: true,
    //     offset: -50,
    //     duration: 800,
    //     easing: "ease-in-out",
    // });

    // // styled selects
    // if ($('select').length) {
    //     $('.styledselect').select2({
    //         // placeholder: "Project Type*",
    //         minimumResultsForSearch: Infinity,
    //     });
    // }

    // $(".button_su_inner").mouseenter(function (e) {
    //     var parentOffset = $(this).offset();

    //     var relX = e.pageX - parentOffset.left;
    //     var relY = e.pageY - parentOffset.top;
    //     $(this).prev(".su_button_circle").css({ "left": relX, "top": relY });
    //     $(this).prev(".su_button_circle").removeClass("desplode-circle");
    //     $(this).prev(".su_button_circle").addClass("explode-circle");

    // });

    // $(".button_su_inner").mouseleave(function (e) {

    //     var parentOffset = $(this).offset();

    //     var relX = e.pageX - parentOffset.left;
    //     var relY = e.pageY - parentOffset.top;
    //     $(this).prev(".su_button_circle").css({ "left": relX, "top": relY });
    //     $(this).prev(".su_button_circle").removeClass("explode-circle");
    //     $(this).prev(".su_button_circle").addClass("desplode-circle");

    // });


    // // burger

    // $('.burger').click(function () {
    //     $(this).toggleClass('on');
    //     const nav = $('.header.header nav');
    //     nav.toggleClass('show');

    //     if (nav.hasClass('show')) {
    //         const items = nav.find('ul > li');
    //         items.each(function (index) {
    //             setTimeout(() => {
    //                 $(this).css({
    //                     'opacity': '1',
    //                     'transform': 'translateX(0)'
    //                 });
    //             }, index * 100); // Затримка між кожним елементом
    //         });
    //     } else {
    //         const items = nav.find('ul > li');
    //         items.css({
    //             'opacity': '0',
    //             'transform': 'translateX(10px)'
    //         });
    //     }
    // });

    // // filter button
    // $('.filterbtn').click(function () {
    //     $('.filtersection__form').toggleClass('active');
    // });

    // // scroll to
    // $(".scrollnext").on("click", function (event) {
    //     event.preventDefault();
    //     var id = $(this).attr('href'),
    //         top = $(id).offset().top - 70;
    //     $('body,html').animate({ scrollTop: top }, 800);
    // });

    // // PROJECTS - slider
    // if ($('.swiper').length) {
    //     var swiper = new Swiper(".projectsslider", {
    //         slidesPerView: 1,
    //         spaceBetween: 20,
    //         loop: true,
    //         pagination: {
    //             el: ".swiper-pagination",
    //             clickable: true,
    //         },
    //         breakpoints: {

    //             991: {
    //                 slidesPerView: 3,
    //                 spaceBetween: 30,
    //             },
    //         },
    //     });

    //     var swiper = new Swiper(".projectslider", {
    //         slidesPerView: 1,
    //         spaceBetween: 20,
    //         loop: true,
    //         speed: 1200,
    //         autoplay: {
    //             delay: 2500,
    //             disableOnInteraction: false,
    //         },

    //         navigation: {
    //             nextEl: ".swiper-button-next",
    //             prevEl: ".swiper-button-prev",
    //         },
    //     });

    // }

    // $('.ddlink p').click(function () {
    //     $(this).next('ul').slideToggle();
    // })

    // if ($('[data-fancybox]').length) {
    //     Fancybox.bind("[data-fancybox]", {
    //         // Your custom options
    //     });
    // }

    // // about page - add dark theme
    // if ($('#team').length) {
    //     window.addEventListener('scroll', function () {
    //         var team = document.getElementById('team');
    //         var rect = team.getBoundingClientRect();
    //         var windowHeight = window.innerHeight;

    //         if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
    //             document.body.classList.add('darktheme');
    //         } else {
    //             document.body.classList.remove('darktheme');
    //         }
    //     });

    //     var team = document.getElementById('team');
    //     var rect = team.getBoundingClientRect();
    //     var windowHeight = window.innerHeight;

    //     if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
    //         document.body.classList.add('darktheme');
    //     } else {
    //         document.body.classList.remove('darktheme');
    //     }
    // }


    // // offices sliders
    // if ($('.swiper').length) {
    //     var swiper = new Swiper(".officessl", {
    //         slidesPerView: 1,
    //         spaceBetween: 10,

    //         navigation: {
    //             nextEl: ".swiper-button-next",
    //             prevEl: ".swiper-button-prev",
    //         },

    //         breakpoints: {

    //             // 991: {
    //             //     slidesPerView: 3,
    //             //     spaceBetween: 30,
    //             // },
    //         },
    //     });
    // }

    // // side forms
    // $('.b-f1').click(function (e) {
    //     e.preventDefault();
    //     $('.bgbox').addClass('show');
    //     $('.sideform.f1').addClass('show');
    // });

    // $('.b-f2').click(function (e) {
    //     e.preventDefault();
    //     $('.bgbox').addClass('show');
    //     $('.sideform.f2').addClass('show');
    // });

    // $('.b-f3').click(function (e) {
    //     e.preventDefault();
    //     $('.bgbox').addClass('show');
    //     $('.sideform.f3').addClass('show');
    // });

    // $('.closeform').click(function () {
    //     $('.bgbox').removeClass('show');
    //     $('.sideform').removeClass('show');
    // })


})