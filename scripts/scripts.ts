const header: HTMLElement | null = document.querySelector("header")
const aboutMe: HTMLElement | null = document.querySelector("#about-me")
const keyboardKeys: NodeListOf<HTMLElement> | null = document.querySelectorAll(".keyboard-key, .keyboard-line article")
const projectSection: HTMLElement | null = document.querySelector("#projects")
const projects: NodeListOf<HTMLElement> | null = document.querySelectorAll("#projects article")
let previousScrollY:number = 0

//this code remove or show the header when user scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > previousScrollY) {
        header?.setAttribute("style", "top: -6em")
    }else if(window.scrollY < previousScrollY){
        header?.setAttribute("style", "top: 0em")
    }
    previousScrollY = window.scrollY
})

const aboutMeObserver = new IntersectionObserver(entries => {
    let delay = 0
    if (entries[0].isIntersecting === true) {
        keyboardKeys.forEach(key => {
            key.setAttribute("style", `animation: show-article .2s forwards linear ${delay}s;`)
            delay = delay + 0.15
        })
    }
}, {
    threshold: .2
})

const projectsObserver = new IntersectionObserver(entries => {
    let delay = 0
    if (entries[0].isIntersecting === true) {
        projects.forEach(project => {
            project.setAttribute("style", `translate: 0; opacity: 1; transition-delay: ${delay}s;`)
            delay = delay + 0.2
        })
        projectSection && projectsObserver.unobserve(projectSection)
    }
}, {
    threshold: .2
})

aboutMe && aboutMeObserver.observe(aboutMe)
projectSection && projectsObserver.observe(projectSection)

//this function makes the projects cards move depending on the mouse position on it
function moveCard(project: HTMLElement, pageX: number, pageY: number, disablescroll: boolean =false){
    if (disablescroll) {
        let  scrollTop = window.scrollY || document.documentElement.scrollTop
        let scrollLeft = window.scrollX || document.documentElement.scrollLeft
        window.onscroll = () => {window.scrollTo(scrollLeft, scrollTop)}
    }
    const mousePositionX = pageX - project.offsetLeft;
    const mousePositionY = pageY - project.offsetTop;
    const mousePositionXFromCenter = -(project.clientWidth - mousePositionX*2)
    const mousePositionYFromCenter = -(project.clientHeight - mousePositionY*2)
    const rotateY = mousePositionXFromCenter/project.clientWidth * 20
    const rotateX = mousePositionYFromCenter/project.clientHeight * 20
    project.setAttribute("style", ` opacity: 1; translate: 0; transform: rotateX(${rotateX}deg) rotateY(${-rotateY}deg); box-shadow: ${-rotateY/5}em ${-rotateX/5}em .7em rgba(0, 0, 0, .5);`)
}

function unMoveCard(project: HTMLElement){
    project.setAttribute("style", `opacity: 1; translate:0; transform: rotateX(0) rotateY(0); box-shadow: box-shadow: 1em 1em 1em .5em rgba(0, 0, 0, .5);`)
    window.onscroll = ()=>{}
}

projects.forEach(project => {
    project.addEventListener("mousemove", e => {
        moveCard(project, e.pageX, e.pageY)
    })
    project.addEventListener("touchmove", e => {
        let noscroll = window.innerWidth<720 ? false : true
        moveCard(project, e.touches[0].pageX, e.touches[0].pageY, noscroll)
    })
})

projects.forEach(project => {
    project.addEventListener("mouseleave", () => {
        unMoveCard(project)
    })
    project.addEventListener("click", () => {
        unMoveCard(project)
    })
    project.addEventListener("touchend", () => {
        unMoveCard(project)
    })
})