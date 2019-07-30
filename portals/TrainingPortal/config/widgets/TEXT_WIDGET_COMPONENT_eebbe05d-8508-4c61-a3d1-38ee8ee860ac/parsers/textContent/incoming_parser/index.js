/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var name = datasources.featureCollection.latestData();
  if (name == undefined || name == " "){
    name = "[ Please provide a Feature Collection Name ]";
  }
  return "Feature Dataset Name: " + name;
}