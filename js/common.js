window.onload = function (){
    var headContent = document.querySelector('.header');
    var lastScrollY = 0;
    window.addEventListener('scroll', e => {
        const scrollY = window.scrollY;

        if (scrollY === 0) {
            headContent.classList.remove('active');
        }
        else {
            headContent.classList.add('active');
        }
        lastScrollY = scrollY;
    })
}