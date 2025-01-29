import React from 'react'
import starGazeList1 from '../assets/starGazeAddresses1.json';

const Sloth = ({ walletAddress }) => {
    
    const isEligible = starGazeList1.some(
      (user) => user.address?.toLowerCase() === walletAddress?.toLowerCase()
    );

  return (
       <>
          <div className="cardMoprh px-[29px] py-[33px] h-[263px] w-[317px] flex flex-col justify-between items-center">
              <div className='flex flex-col items-center justify-center'>
                              <img
              className="w-[67px] h-[67px]"
              src="/sloth.png"
              alt="Asset"
              />
              <p className='press-start-2p-regular text-white text-[20px] mt-[15px] text-center'>Celestine Sloth</p>
              
              </div>

              {isEligible ? (
                  <div className='text-[24px] text-[#00CC99] flex gap-1 items-center'>
                       <img
                        className="w-[27px] h-[27px]"
                        src="/tick.png"
                        alt="Asset"
                        />
                    <p>Eligible</p>
                </div>
              ): (
                      <div className='text-[24px] text-[#D65454] flex gap-1 items-center'>
                           <img
                            className="w-[27px] h-[27px]"
                            src="/cross.png"
                            alt="Asset"
                            />
                    <p>Not Eligible</p>
                </div>      
              )}

          </div>
    </>
  )
}

export default Sloth