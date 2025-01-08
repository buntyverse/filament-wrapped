
// or "polygon-amoy", "ethereum-sepolia", ... // or "www"


const mintNFT = async(address) => {

    const apiKey = process.env.REACT_APP_CROSSMINT_API_KEY;

    if (!apiKey) { 
        throw new Error("API key is missing");
    }
    
    const url = `/collections/default-polygon/nfts`;

    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-api-key": apiKey,
        },
        body: JSON.stringify(
            {
      "templateId": process.env.REACT_APP_TEMPLATE_ID,
      "recipient": `polygon:${address}`
    }
        ),
    };
    
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data; 
  } catch (err) {
    console.error("Error:", err);
    throw err; 
  }   
}


export default mintNFT;