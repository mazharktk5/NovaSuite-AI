import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Sparkles, Stethoscope } from 'lucide-react'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const DiagnoseDisease = () => {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState('')
    const { getToken } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(
                '/api/ai/diagnose-disease',
                { symptoms: input },
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`
                    }
                }
            )

            if (data.success) {
                setResult(data.content)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
        setInput('')
    }

    return (
        <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
            <form onSubmit={handleSubmit} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Stethoscope className='w-6 text-red-500' />
                    <h1 className='text-xl font-semibold'>Symptom Checker</h1>
                </div>

                <p className='mt-6 text-sm font-medium'>Describe your symptoms</p>
                <textarea
                    required
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='w-full p-2 mt-2 h-28 outline-none text-sm rounded-md border border-gray-300 resize-none'
                    placeholder='e.g. fever, sore throat, body pain...'
                ></textarea>

                <button
                    disabled={loading}
                    className='cursor-pointer w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-orange-400 text-white px-4 py-2 mt-6 text-sm rounded-lg'
                >
                    {loading ? (
                        <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                    ) : (
                        <Sparkles className='w-5' />
                    )}
                    Diagnose
                </button>
            </form>

            <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 min-h-96 max-h-[600px] overflow-y-scroll'>
                <div className='flex items-center gap-3 mb-2'>
                    <Stethoscope className='w-5 h-5 text-red-500' />
                    <h1 className='text-xl font-semibold'>Diagnosis Result</h1>
                </div>

                {!result ? (
                    <div className='text-gray-400 text-sm mt-6'>Enter symptoms and click Diagnose to get a result</div>
                ) : (
                    <div className='reset-tw'> <Markdown>{result}</Markdown> </div>
                )}
            </div>
        </div>
    )
}

export default DiagnoseDisease
