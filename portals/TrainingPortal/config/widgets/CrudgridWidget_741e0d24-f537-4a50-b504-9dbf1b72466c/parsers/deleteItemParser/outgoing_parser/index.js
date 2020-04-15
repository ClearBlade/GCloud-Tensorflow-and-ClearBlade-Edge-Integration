/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var data = datasources.features.latestData();
  var features = data.Features;
  console.log(features);

  var deleted = []

  var deleteFeature = this.widget.query.query.FILTERS;
  //console.log(deleteFeature);
  //console.log(deleteFeature[0][0]["EQ"][0]["item_id"]);

  for(var i=0; i<deleteFeature.length; i++){
    var to_delete = deleteFeature[i][0]["EQ"][0]["item_id"]
    deleted = [];
    for(var j=0; j<features.length; j++){
      if(features[j]["item_id"] != to_delete){
        deleted.push(features[j]);
      }
    }

    features = deleted;
    //console.log("to_delete: " + to_delete);
  }

  //console.log(features)
  datasources.features.sendData({"Features": features});
}