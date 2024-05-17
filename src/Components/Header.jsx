import React, { startTransition } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div>
        <nav className='h-[[25px]] bg-slate-400 p-3 font-semibold text-white shadow-md flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-white ml-2'>Aromatic Bar</h2>
            <div className=' '>
                <ul className='flex gap-4 mr-2 cursor-pointer '>
                <li onClick={() => startTransition(() => navigate("/"))}>Feedback</li>
            <li onClick={() => startTransition(() => navigate("/table"))}>Table</li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Header
