var imgContainer = document.querySelector('.imgContainer')

gsap.to(imgContainer,{
    scale:1.05,
    scrollTrigger:{
        trigger:imgContainer,
        scroller:"body",
        scrub:true,
    },
})