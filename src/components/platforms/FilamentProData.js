import React, { useEffect, useState } from 'react'
import DataCard from '../Cards/DataCard';
import { flpAmt } from '../config/atoms';
import { useAtom } from 'jotai';

const FilamentProData = ({ walletAddress, setComponentData}) => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [flpAmount, setFlpAmount] = useState(0);

   const [flpGlobalState, setFlpGloablState] = useAtom(flpAmt);

  const airtableBearer = process.env.REACT_APP_AIRTABLE_API_TOKEN;
  const airtableBase = process.env.REACT_APP_AIRTABLE_BASE

  const fetchAllRecords = async () => {

      try {
          setLoading(true)

          const url = `https://api.airtable.com/v0/${airtableBase}/Account%20Trade%20Volumes`
          const options = {
              method: "GET",
              headers: {
                  "Authorization": `Bearer ${airtableBearer}`
              }
          }
      
          const res = await fetch(url, options);
          const resp = await res.json();
      
          console.log("fila resp", resp)
      
          const myData = resp.records.filter((record) => record.fields["Account"] === walletAddress.toLowerCase())
          setData(myData[0].fields)
          setComponentData(myData[0].fields)

      } catch (e) {
          console.log("Error", e)
      } finally {
          setLoading(false)
      }
  
  }

  const fetchFLPData = async () => {

      try {
        setLoading(true)

        const url = `https://api.airtable.com/v0/${airtableBase}/FLP?view=Grid%20view`
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${airtableBearer}`
            }
        }
    
        const res = await fetch(url, options);
        const resp = await res.json();
    
        console.log("fila resp", resp)
    
        const myData = resp.records.filter((record) => record.fields["Account"] === walletAddress.toLowerCase())
        setFlpAmount(myData[0].fields?.Amount)
        setFlpGloablState(myData[0].fields?.Amount)

      } catch (e) {
          console.log("Error", e)
      } finally {
          setLoading(false)
      }
  
  }

  useEffect(() => {
    fetchAllRecords();
    fetchFLPData();
  }, [])
    
  return (
    <>
      {data && !loading ? (
        <DataCard
          loading={loading}
          pnl={data?.netPnL}
          totalVolume={data.Volume}
          tradedAssets={data.tradedAssets ? data.tradedAssets : []}
          imgSrc="/filament.svg"
          flpAmount={flpAmount}
        />
      ) : flpAmount ? (
          <div>
             {flpAmount &&
              <div className="cardMoprh px-[77px] py-8 w-full flex flex-col gap-6">
                          <img
              className="w-auto h-[31px]"
              src="/filament.svg"
              alt="Asset"
            />
                          <div className="flex flex-col items-center">
            <span className="text-[24px] text-[#595D74]  whitespace-nowrap">
             FLP Amount
            </span>
            <p className="text-[24px] text-white press-start-2p-regular">
              {flpAmount}
            </p>
          </div>   
              </div>}
            </div>
      ) : (
  
          <div className="cardMoprh px-[29px] py-[33px] w-full flex flex-col gap-6">
            <img
              className="w-auto h-[31px]"
              src="/filament.svg"
              alt="Asset"
            />
            <p className="text-center text-[#595D74] sm:text-sm press-start-2p-regular whitespace-nowrap">No Data Found</p>
          </div>
   
      )}
    </>
  )
}

export default FilamentProData