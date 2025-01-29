
// or "polygon-amoy", "ethereum-sepolia", ... // or "www"


const mintNFT = async(address, EVMaddress) => {

    const url = `https://web-production-a568b.up.railway.app/mint/${address}/${EVMaddress}`;

    const options = {
        method: "POST",
        headers: {
      
            "x-client-api-key": process.env.REACT_APP_GENESIS_API_KEY,
        },
    };
    
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(process.env.GENESIS_API_KEY)
    return data; 
  } catch (err) {
    console.error("Error:", err);
    throw err; 
  }   
}


export default mintNFT;
