import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Heart } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('api/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
    setLoading(false)
  }


  // function for likes 

  const imageLikeToggle = async (id) => {

    try {

      const { data } = await axios.post('api/user/toggle-like-creation', { id }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if (data.success) {
        toast.success(data.message)
        await fetchCreations()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)

    }

  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h2 className='text-xl font-semibold'>Creations</h2>

      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll p-4'>
        {loading ? (
          <div className='text-center text-gray-500 text-lg'>Loading...</div>
        ) : creations.length === 0 ? (
          <div className='text-center text-gray-500 text-lg'>No recent images created.</div>
        ) : (
          <div className='flex flex-wrap gap-4'>
            {creations.map((creation, index) => (
              <div
                key={index}
                className='relative group w-full sm:w-[48%] lg:w-[30%]'>

                <img
                  src={creation.content}
                  alt=''
                  className='w-full h-64 object-cover rounded-lg'
                />

                <div className='absolute bottom-0 right-0 left-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 bg-gradient-to-b from-transparent to-black/80 text-white rounded-b-lg'>
                  <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
                  <div className='flex gap-1 items-center'>
                    <p>{creation.likes.length}</p>
                    <Heart onClick={() => imageLikeToggle(creation.id)}
                      className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id)
                        ? 'fill-red-500 text-red-600'
                        : 'text-white'
                        }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Community
