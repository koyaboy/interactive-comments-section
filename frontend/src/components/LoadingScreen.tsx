import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

const LoadingScreen = () => {

    const firstBoxRef = useRef(null)
    const secondBoxRef = useRef(null)
    const thirdBoxRef = useRef(null)

    useEffect(() => {
        gsap.to(firstBoxRef.current, {
            width: 0,
            height: 0,
            stagger: 0.1,
            duration: 0.75,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.05
        })

        gsap.to(secondBoxRef.current, {
            scale: 1.85,
            stagger: 0.1,
            duration: 0.75,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.05
        })

        gsap.to(thirdBoxRef.current, {
            width: 70,
            height: 70,
            duration: 0.75,
            stagger: 0.1,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.05

        })
    }, [])

    return (
        <div className='min-h-screen flex justify-center items-center gap-2'>
            <div className='bg-red-500 rounded-[50%] w-20 h-20 flex justify-center items-center'>
                <div className='bg-white rounded-[50%] w-[95%] h-[95%]' ref={firstBoxRef}></div>
            </div>

            <div className='bg-red-500 rounded-[50%] w-20 h-20 flex justify-center items-center'>
                <div className='bg-white rounded-[50%] w-[40%] h-[40%]' ref={secondBoxRef}></div>
            </div>

            <div className='bg-red-500 rounded-[50%] w-20 h-20 flex justify-center items-center'>
                <div className='bg-white rounded-[50%] w-[0%] h-[0%]' ref={thirdBoxRef}></div>
            </div>
        </div>
    )
}

export default LoadingScreen