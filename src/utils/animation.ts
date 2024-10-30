import gsap from 'gsap'
import * as THREE from 'three'
import {ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

type animationProps = {
    [name:string]:string | number
}
export const animateWithGsapTimeline = (
    timeline:gsap.core.Timeline,
    rotationRef:React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>,
    rotationState:number, firstTarget:string,secondTarget:string,
    anmimation:animationProps
)=>{
    timeline.to(rotationRef.current.rotation,{
        y:rotationState,
        duration:1,
        ease:'power2.inOut'
    })
    timeline.to(firstTarget,{
        ...anmimation,
        ease:'power2.inOut'
    },'<'
)

    timeline.to(secondTarget,{
        ...anmimation,
        ease:"power2.inOut",
    },'<'
)
}

export const animateWithGsap = (target:string,animation:animationProps,scrollProps?:any)=>{
gsap.to(target,{
    ...animation,
    scrollTrigger:{
        trigger:target,
        toggleActions:'restart reverse restart reverse',
        start:'top 85%',
        ...scrollProps
    }
})
}