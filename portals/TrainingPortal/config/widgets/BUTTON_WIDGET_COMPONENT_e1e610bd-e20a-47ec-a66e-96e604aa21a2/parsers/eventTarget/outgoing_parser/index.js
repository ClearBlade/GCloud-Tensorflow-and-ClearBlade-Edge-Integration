/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var data = datasources.featureCollection.latestData();
  if(data == null){
    alert("Please provide a Feature Collection Name")
    return;
  }

  datasources.cleanData.sendData({"CollectionName":data});
  datasources.featureCollection.sendData(data);
  alert("Data Cleaned Successfully");

  return {};
}