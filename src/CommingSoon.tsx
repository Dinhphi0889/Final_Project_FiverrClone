import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CommingSoon() {
    const navigate = useNavigate()
    return (
        <div>
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4">
                <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30 backgroundCommingSoon">
                </div>
                <h1 className="text-5xl md:text-7xl text-white font-bold mb-8 z-10">Coming Soon</h1>
                <p className="text-white text-xl md:text-2xl"
                    style={{
                        zIndex: '2',
                    }}>
                    We're working hard to bring you something amazing. Stay tuned!
                </p>
                <Button
                 style={{
                    padding: '10px 20px',
                    marginTop: '20px',
                    fontSize: '1rem'
                }}
                onClick={()=>{
                    navigate('/')
                }}
                >Back Home</Button>
            </div>
        </div>
    )
}
