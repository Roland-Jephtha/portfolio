/* Jephtha Roland — brand layer behaviour */
(function () {
    'use strict';

    // main.js turns every <select> into nice-select; the contact form uses a styled native one
    if (window.jQuery && jQuery.fn.niceSelect) {
        jQuery('.jr-form select').niceSelect('destroy');
    }

    // scroll reveals
    if (window.AOS) {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            offset: 60,
            once: true,
            disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
        window.addEventListener('load', function () { AOS.refresh(); });
    }

    // close the mobile menu after picking a link
    var menu = document.querySelector('.jr-menu');
    if (menu) {
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) menu.removeAttribute('open');
        });
        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target)) menu.removeAttribute('open');
        });
    }

    // highlight the nav link for the section in view
    var links = document.querySelectorAll('.jr-nav a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function (a) {
        byId[a.getAttribute('href').slice(1)] = a;
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            links.forEach(function (a) { a.classList.remove('is-active'); });
            var link = byId[entry.target.id];
            if (link) link.classList.add('is-active');
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(byId).forEach(function (id) {
        var section = document.getElementById(id);
        if (section) observer.observe(section);
    });
})();
