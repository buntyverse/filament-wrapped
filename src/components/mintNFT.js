
// or "polygon-amoy", "ethereum-sepolia", ... // or "www"


const mintNFT = (address) => {

    const apiKey = "sk_production_26GKj26W38mHhH4TeBGjo37p9ZT6oY6KsniY7zCS3w5ydera294iDngYejaAjrtzqpX7SNYZetnkpfUpyB6gXtHxLGGvXL9kNCvEwCgnBtYDUqpsfZDKYNx1iEr6BDpSj31tayr2r8K5KqQmZdkjdQy8iHhU6ByQyzL4tyDfSkiRHFydah9QQGBQVysEPKSaYDxChAmsvFsE7E5zdDj8qDK";
    
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
      "templateId":"49185993-e02a-4a60-862d-3d4d7e47aa0a",
      "recipient": "polygon:0xef40B20A244c02498caB7fA9E4AE5276f06Cd7aC"
    }
        ),
    };
    
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error("error:" + err));}


export default mintNFT;