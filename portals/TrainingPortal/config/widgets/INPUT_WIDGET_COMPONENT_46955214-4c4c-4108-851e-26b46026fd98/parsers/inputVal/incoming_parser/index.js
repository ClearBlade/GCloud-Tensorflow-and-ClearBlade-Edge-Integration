/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var data = datasources.featureCollection.latestData();
  if(data == null || data == " "){
    return " ";
  }
  
  const systemKey = "a6c2e6d10bc2f183fca3c7d3d0fe01"
  const collection_name = datasources.featureCollection.latestData();
  var url = "https://staging.clearblade.com/api/v/1/collection/" + systemKey + "/" + collection_name;

  function getData(url){
    const token = datasources.authtoken.latestData();
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
  
  return ctx.datasource;
}