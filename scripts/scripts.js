"use strict";
var header = document.querySelector("header");
var aboutMe = document.querySelector("#about-me");
var keyboardKeys = document.querySelectorAll(".keyboard-key, .keyboard-line article");
var projectSection = document.querySelector("#projects");
var projects = document.querySelectorAll("#projects article");
var previousScrollY = 0;
//this code remove or show the header when user scroll
window.addEventListener("scroll", function () {
    if (window.scrollY > previousScrollY) {
        header === null || header === void 0 ? void 0 : header.setAttribute("style", "top: -6em");
    }
    else if (window.scrollY < previousScrollY) {
        header === null || header === void 0 ? void 0 : header.setAttribute("style", "top: 0em");
    }
    previousScrollY = window.scrollY;
});
var aboutMeObserver = new IntersectionObserver(function (entries) {
    var delay = 0;
    if (entries[0].isIntersecting === true) {
        keyboardKeys.forEach(function (key) {
            key.setAttribute("style", "animation: show-article .2s forwards linear ".concat(delay, "s;"));
            delay = delay + 0.15;
        });
    }
}, {
    threshold: .2
});
var projectsObserver = new IntersectionObserver(function (entries) {
    var delay = 0;
    if (entries[0].isIntersecting === true) {
        projects.forEach(function (project) {
            project.setAttribute("style", "translate: 0; opacity: 1; transition-delay: ".concat(delay, "s;"));
            delay = delay + 0.2;
        });
        projectSection && projectsObserver.unobserve(projectSection);
    }
}, {
    threshold: .2
});
aboutMe && aboutMeObserver.observe(aboutMe);
projectSection && projectsObserver.observe(projectSection);
//this function makes the projects cards move depending on the mouse position on it
function moveCard(project, pageX, pageY, disablescroll) {
    if (disablescroll === void 0) { disablescroll = false; }
    if (disablescroll) {
        var scrollTop_1 = window.scrollY || document.documentElement.scrollTop;
        var scrollLeft_1 = window.scrollX || document.documentElement.scrollLeft;
        window.onscroll = function () { window.scrollTo(scrollLeft_1, scrollTop_1); };
    }
    var mousePositionX = pageX - project.offsetLeft;
    var mousePositionY = pageY - project.offsetTop;
    var mousePositionXFromCenter = -(project.clientWidth - mousePositionX * 2);
    var mousePositionYFromCenter = -(project.clientHeight - mousePositionY * 2);
    var rotateY = mousePositionXFromCenter / project.clientWidth * 20;
    var rotateX = mousePositionYFromCenter / project.clientHeight * 20;
    project.setAttribute("style", " opacity: 1; translate: 0; transform: rotateX(".concat(rotateX, "deg) rotateY(").concat(-rotateY, "deg); box-shadow: ").concat(-rotateY / 5, "em ").concat(-rotateX / 5, "em .7em rgba(0, 0, 0, .5);"));
}
function unMoveCard(project) {
    project.setAttribute("style", "opacity: 1; translate:0; transform: rotateX(0) rotateY(0); box-shadow: box-shadow: 1em 1em 1em .5em rgba(0, 0, 0, .5);");
    window.onscroll = function () { };
}
projects.forEach(function (project) {
    project.addEventListener("mousemove", function (e) {
        moveCard(project, e.pageX, e.pageY);
    });
    project.addEventListener("touchmove", function (e) {
        var noscroll = window.innerWidth < 720 ? false : true;
        moveCard(project, e.touches[0].pageX, e.touches[0].pageY, noscroll);
    });
});
projects.forEach(function (project) {
    project.addEventListener("mouseleave", function () {
        unMoveCard(project);
    });
    project.addEventListener("click", function () {
        unMoveCard(project);
    });
    project.addEventListener("touchend", function () {
        unMoveCard(project);
    });
});
