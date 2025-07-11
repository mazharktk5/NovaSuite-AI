import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {
    const navigate = useNavigate()
    const { user } = useUser()

    return (
        <div className='px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-16'>
            <div className='text-center mb-12'>
                <h2 className='text-slate-700 text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-tight'>
                    Supercharge Your Workflow with Smarter <br />
                    <span className='text-primary'>AI-Powered Solutions</span>
                </h2>
                <p className='text-gray-500 mt-4 mx-auto max-w-2xl text-base sm:text-lg'>
                    Transform the way you work using intelligent AI tools designed to elevate creativity, automate tasks, and help you innovate faster than ever before.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center'>
                {AiToolsData.map((tool, index) => (
                    <div
                        key={index}
                        onClick={() => user && navigate(tool.path)}
                        className='w-full max-w-xs p-6 bg-[#FDFDFE] border border-gray-100 shadow-md rounded-xl hover:-translate-y-1 transition-transform duration-150 cursor-pointer'
                    >
                        <tool.Icon
                            className='w-12 h-12 p-3 text-white rounded-xl mb-4'
                            style={{
                                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`
                            }}
                        />
                        <h3 className='text-lg font-semibold mb-2'>{tool.title}</h3>
                        <p className='text-sm text-gray-500'>{tool.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AiTools
