$(document).ready(function () {
    const carousel = $(".carousel");
    let tmp = $(".item").toArray();
    tmp.unshift(tmp.pop());
    let items = $(tmp);
    let visibleSlides = 3;
    clearVisibleSlides(items, 0, items.length);
    setVisibleSlides(items, 0, visibleSlides);

    const rotationPerSlide = 360 / visibleSlides;
    let currdeg = rotationPerSlide;
    let yRotationValue = -rotationPerSlide;

    function rotateCarousel(direction) {
        if (direction === "n") {
            currdeg -= rotationPerSlide;
        }
        if (direction === "p") {
            currdeg += rotationPerSlide;
        }
        carousel.css({
            "-webkit-transform": `rotateY(${currdeg}deg)`,
            "-moz-transform": `rotateY(${currdeg}deg)`,
            "-o-transform": `rotateY(${currdeg}deg)`,
            transform: `rotateY(${currdeg}deg)`,
        });

        rotateSlides();
    }

    function rotateSlides() {
        const translationZ = 180;
        
        items.each(function (index) {
            let itemRotation;
            itemRotation = index * rotationPerSlide;
            itemRotation += yRotationValue;

            $(this).css({
                "-webkit-transform": `rotateY(${itemRotation}deg) translateZ(${translationZ}px)`,
                "-moz-transform": `rotateY(${itemRotation}deg) translateZ(${translationZ}px)`,
                "-o-transform": `rotateY(${itemRotation}deg) translateZ(${translationZ}px)`,
                "transform": `rotateY(${itemRotation}deg) translateZ(${translationZ}px)`,
            });
        });
    }


    function prevSlide() {
        let slidesArr = items.toArray();
        slidesArr.unshift(slidesArr.pop());
        items = $(slidesArr);

        clearVisibleSlides(items, 0, items.length);
        setVisibleSlides(items, 0, visibleSlides);
        yRotationValue -= rotationPerSlide;
    }

    function nextSlide() {
        let slidesArr = items.toArray();
        slidesArr.push(slidesArr.shift());
        items = $(slidesArr);

        clearVisibleSlides(items, 0, items.length);
        setVisibleSlides(items, 0, visibleSlides);
        yRotationValue += rotationPerSlide;
    }

    function clearVisibleSlides(arr, start, last) {
        for (let i = start; i < last; i++) {
            arr[i].classList.remove("visible");
        }
    }

    function setVisibleSlides(arr, start, last) {
        for (let i = start; i < last; i++) {
            arr[i].classList.add("visible");
        }
    }

    rotateCarousel("n");

    $(".next").on("click", function () {
        nextSlide();
        rotateCarousel("n");
    });

    $(".prev").on("click", function () {
        prevSlide();
        rotateCarousel("p");
    });

    let touchstartX = 0;
    let touchendX = 0;

    function handleGesture() {
        const threshold = 50;

        if (touchendX < touchstartX - threshold) {
            nextSlide();
            rotateCarousel('n');
        } else if (touchendX > touchstartX + threshold) {
            prevSlide();
            rotateCarousel('p');
        }
    }

    carousel.on('touchstart', function (event) {
        touchstartX = event.originalEvent.touches[0].pageX;
    });

    carousel.on('touchend', function (event) {
        touchendX = event.originalEvent.changedTouches[0].pageX;
        handleGesture();
    });
});









