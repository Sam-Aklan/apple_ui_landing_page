import { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'

const VideoCarousel = () => {
    const videoRef = useRef<HTMLVideoElement[]>([])
    const videoSpanRef = useRef<HTMLSpanElement[]>([])
    const videoDivRef = useRef<HTMLSpanElement[]>([])
    const [video, setVideo] = useState({
        isEnd:false,
        startPlay:false,
        videoId:0,
        islastVideo:false,
        isPlaying:false
    })
    const {isEnd,isPlaying,islastVideo,startPlay,videoId} = video
    const [loadeddata, setLoadeddata] = useState<React.SyntheticEvent<HTMLVideoElement, Event>[]|[]>([])

    // this useEffect will be tragered by handleloadedMeatData fn
    useEffect(()=>{
        if (loadeddata.length>3) {
            if (!isPlaying) {
                videoRef.current[videoId]?.pause()
            }else{
                if(startPlay) videoRef.current[videoId].play()
                    
                }
            }
        },[loadeddata,videoId,startPlay,isPlaying])
        
        useEffect(()=>{
            let currentPrograss = 0
            let span = videoSpanRef.current
            if(span[videoId]){
                //animate the progress
                let anim = gsap.to(span[videoId],{
                    onUpdate:()=>{
                        const progress = Math.ceil(anim.progress() * 100)
                        if(currentPrograss !=progress){
                            currentPrograss = progress;
                            gsap.to(videoDivRef.current[videoId],{
                                width:window.innerWidth < 760?'10vw':window.innerWidth < 1200?'10vw':'4vw'
                            })
                            gsap.to(videoSpanRef.current[videoId],{
                                width:`${currentPrograss}%`,
                                backgroundColor:'white'
                            })
                        }

                    },
                    onComplete:()=>{
                        if(isPlaying){
                            gsap.to(videoDivRef.current[videoId],{
                                width:'12px'
                            })
                            gsap.to(span[videoId],{
                                backgroundColor:'#afafaf'
                            })
                        }
                    }
                })
                if(videoId === 0) anim.restart()

                // how long animation Last
                const animUpdate = ()=>{
                    anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
                }

                if(isPlaying){
                    gsap.ticker.add(animUpdate)
                }else{
                    gsap.ticker.remove(animUpdate)
                }
            }
        },[videoId,startPlay])
        
        useGSAP(()=>{
            gsap.to('#slider',{
                transform:`translateX(${-100 * videoId}%)`,
                duration:2,
                ease:'power2.inOut'
            })
            gsap.to('#video',{
                scrollTrigger:{
                    trigger:'#video',
                    toggleActions:"restart none none none"
                },
                onComplete:()=>{
                    setVideo((pre=>({
                        ...pre,
                        startPlay:true,
                        isPlaying:true
                    })))
                }
            })
        },[isEnd,videoId])

    const handleProcess = (type:string,i?:number)=>{
        switch (type) {
            case 'video-end':
            setVideo((prevVideo)=>({
                ...prevVideo,
                isEnd:true,
                videoId:(i||0) + 1
            }))
                break;
            case 'video-last':
            setVideo((preVideo)=>({
                ...preVideo,
                islastVideo:true,
            }))
                break;
            case 'video-rest':
            setVideo((pre)=>({
                ...pre,
                islastVideo:false,
                videoId:0
            }))
                break;
            case 'play':
            setVideo((pre)=>({
                ...pre,
                isPlaying:!pre.isPlaying
            }))
                break;
            case 'pause':
            setVideo((pre)=>({
                ...pre,
                isPlaying:!pre.isPlaying
            }))
                break;
        
            default:
                return undefined
        }
    }

    const handleLoadedMeta = (i:number,e:React.SyntheticEvent<HTMLVideoElement, Event>)=>setLoadeddata(prev=>[...prev,e])
    
  return (
    <>
        <div className="flex items-center">
            {hightlightsSlides.map((list,index)=>(
                <div id="slider" key={index} className='sm:pr-20 pr-10'>
                    <div className="video-carousel_container">
                        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                            <video 
                            id='video'
                            playsInline={true}
                            preload='auto'
                            className={`${list.id ===2?'translate-x-44':null} pointer-events-none`}
                            muted
                            ref={(el)=> el?videoRef.current[index]=el:null}
                            onPlay={()=>{
                                setVideo((prevVideo)=>({
                                    ...prevVideo,
                                    isPlaying:true
                                }))
                            }}
                            onLoadedMetadata={(e)=> handleLoadedMeta(index,e)}
                            onEnded={()=> index !==3?
                                handleProcess('video-end',index):handleProcess('video-last')
                            }>
                                <source src={list.video} type='video/mp4' />
                            </video>
                        </div>
                        <div className="absolute top-12 left-4 z-10">
                            {list.textLists.map(text=>(
                                <p key={text} className="md:text-2xl text-xl font-medium">
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="relative flex-center mt-10">

        <div className="relative flex-center py-5 bg-gray-300 backdrop-blur rounded-full">
            {videoRef.current.map((_,index)=>(
                <span
                key={index}
                ref={(el)=>(el?videoDivRef.current[index] = el: null)}
                className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
                    <span
                     ref={(el)=>(el?videoSpanRef.current[index] = el: null)}
                    className="absolute h-full w-full rounded-full"/>
                </span>
            ))}
        </div>
        <button className='control-btn'>
            <img 
            src={islastVideo?replayImg:
                !isPlaying?playImg :pauseImg
            }
            alt={islastVideo? 'replay':!isPlaying?'play':'pause'}
            onClick={
            islastVideo?()=>handleProcess('video-rest',videoId)
            :!isPlaying?
            ()=>handleProcess('play',videoId)
            :()=>handleProcess('pause',videoId)}/>
        </button>
        </div>
    </>
  )
}

export default VideoCarousel