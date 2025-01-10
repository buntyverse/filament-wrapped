import React from 'react'

const MintedToast = () => {
  return (
      <div className='px-9 py-[14px] toast flex justify-center items-center gap-1 text-white text-[36px] fixed bottom-9 right-[65px]'>
          <p>Minted On</p>
          <img src="/base.png" alt="Polygon" className='h-[33px] w-auto' />
    </div>
  )
}

export default MintedToast