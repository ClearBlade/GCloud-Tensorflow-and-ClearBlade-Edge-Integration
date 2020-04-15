/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  // const systemKey = datasources.systemCredentials.latestData().systemKey;
  const systemSecret = datasources.systemCredentials.latestData().systemSecret;
  
  const systemKey = CB_PORTAL.ClearBlade.systemKey;
  // const systemSecret = CB_PORTAL.ClearBlade.systemSecret;
  const collection_name = datasources.featureCollection.latestData();

  if(collection_name == null || collection_name == undefined || collection_name == " "){
    return;
  }

  var url = "https://staging.clearblade.com/api/v/1/collection/" + systemKey + "/" + collection_name;

  function getData(url){
    // const token = datasources.authtoken.latestData();
    const token = CB_PORTAL.ClearBlade.user.authToken;
    var header = {
      "ClearBlade-UserToken" : token,
      "systemKey" : systemKey,
      "collectionName" : collection_name
    };

    return new Promise((resolve, reject) => {
      fetch(url, {
        method : 'GET',
        headers : header
      }).then((resp) => resp.json())
      .then((data) => resolve(data))
      .catch((err) => console.log(err))
    })
  }

  getData(url)
  .then((data) => datasources.FeatureData.sendData(data))
  .catch((err) => console.error("Error: Cannot Find the collection name"));
}