"use client"
import SVGLogo from "@/app/assets/Logo.svg";
import { useEffect, useState } from "react"

export default function Preloader() {
    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsInView(false);
        }, 2000)

        return () => { clearTimeout(timeoutId) }
    }, [])

    if (isInView) {
        return (
            <div className="fixed inset-0 w-[100dvw] h-[100dvh] z-[9999] bg-white">
                <div className="flex justify-center items-center h-[100%]">
                    <img src={SVGLogo.src} className="h-[200px] w-[200px] animate-brightness" />
                </div>
            </div>
        )
    }
}