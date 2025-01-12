
// or "polygon-amoy", "ethereum-sepolia", ... // or "www"


const mintNFT = async(address) => {


    
    
    const url = `https://web-production-a568b.up.railway.app/mint/${address}`;

    const options = {
        method: "POST",
        headers: {
            "x-client-api-key": 9829922288,
        },
    };
    
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
    return data; 
  } catch (err) {
    console.error("Error:", err);
    throw err; 
  }   
}


export default mintNFT;
