/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var data = datasources.features.latestData();
  var features = data.Features;

  return {
    "keyColumn" : "item_id",
    "data" : features
  }
}