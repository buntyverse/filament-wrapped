import React, { useEffect, useState } from 'react'
import DataCard from '../Cards/DataCard';

const FilamentProData = ({ walletAddress, setFilamentProData}) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const airtableBearer = process.env.REACT_APP_AIRTABLE_API_TOKEN;
    const airtableBase = process.env.REACT_APP_AIRTABLE_BASE

    const fetchAllRecords = async () => {

        try {
            setLoading(true)

            const url = `https://api.airtable.com/v0/${airtableBase}/Account%20Trade%20Volumes?maxRecords=60&view=Grid%20view`
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
            setFilamentProData(myData[0].fields)

        } catch (e) {
            console.log("Error", e)
        } finally {
            setLoading(false)
        }
   
    }

    useEffect(() => {
        fetchAllRecords()
    }, [])
    
  return (
    <>
      {data && !loading ? (
        <DataCard
          loading={loading}
          pnl={data?.netPnL}
          totalVolume={data.Volume}
          tradedAssets={data.tradedAssets ? data.tradedAssets : []}
          imgSrc=""
        />
      ) : (

          <div className="cardMoprh px-[29px] py-[33px] w-full flex flex-col gap-6">
            <img
              className="w-auto h-[31px]"
              src="/hyperliquid.svg"
              alt="Asset"
            />
            <p className="text-center sm:text-sm">No Data Found</p>
          </div>
   
      )}
    </>
  )
}

export default FilamentProData