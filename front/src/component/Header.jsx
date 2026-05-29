import React from 'react'

export default function Header({title, description, options, limWidth=false}) {
  return (
    <div className='bg-white w-full sticky top-0 z-20'>
    <div className={`py-4 ${limWidth? 'innerPageWidth' : 'pageWidth' } flex items-center justify-between`}>
        <div className=''>
            <p className='font-jakarta text-xl font-bold text-gray-800'>{title}</p>
            <p className='text-xs'>{description || 'Provice page information here'}</p>
        </div>

        <section>
            {options}
        </section>
    </div>
    </div>
  )
}
