
// or "polygon-amoy", "ethereum-sepolia", ... // or "www"


const mintNFT = async(address) => {

    const apiKey = process.env.REACT_APP_CROSSMINT_API_KEY;

    if (!apiKey) { 
        throw new Error("API key is missing");
    }
    
    const url = `https://www.crossmint.com/api/2022-06-09/collections/b2f34c67-c1b4-4d15-b9f0-db736b7bf36e
/nfts`;

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
      "recipient": `base:${address}`
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
