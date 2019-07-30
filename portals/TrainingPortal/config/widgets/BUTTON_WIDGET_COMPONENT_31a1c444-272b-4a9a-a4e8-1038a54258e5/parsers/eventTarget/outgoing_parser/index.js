/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var data = datasources.featureCollection.latestData();
  datasources.featureCollection.sendData(data);
  
  var data = datasources.featureCollection.latestData();
  datasources.featureCollection.sendData(data);
}