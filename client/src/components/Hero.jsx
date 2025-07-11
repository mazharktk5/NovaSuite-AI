import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen w-full bg-[url('/gradientBackground.png')] bg-no-repeat bg-cover flex items-center justify-center py-12 px-6 md:px-16 lg:px-28 relative">
            <div className="w-full text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900">
                    Ignite Innovation with Next-Gen <br />
                    <span className="text-primary">AI Solutions</span>
                </h1>
                <p className="text-gray-700 mt-5 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                    Empower your business through innovative and intelligent AI tools that automate tasks, fuel productivity, inspire ideas, and transform your digital workflows effectively.
                </p>

                <div className="mt-8 flex justify-center flex-wrap gap-3">
                    <button
                        onClick={() => navigate('/ai')}
                        className="bg-primary text-white font-medium py-2.5 px-8 rounded-md shadow-md hover:opacity-90 hover:scale-105 transition-transform duration-200"
                    >
                        Get Started
                    </button>
                    <button
                        className="border border-gray-400 bg-white text-gray-700 py-2.5 px-8 rounded-md hover:bg-gray-50 hover:scale-105 transition-transform duration-200"
                    >
                        See Demo
                    </button>
                </div>

                <div className="mt-10 flex items-center justify-center space-x-3 text-gray-600 text-sm">
                    <img src={assets.user_group} alt="user group" className="h-7 w-auto" />
                    <span>20,000+ users trust us worldwide</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
