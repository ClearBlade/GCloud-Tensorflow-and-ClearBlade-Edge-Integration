/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {

  // console.log(ctx.datasource.DATA)
  // console.log(datasources.allFeatures.latestData())

  var features = datasources.features.latestData()
  if(features.Features.length == 0){
    features = datasources.allFeatures.latestData()
  }

  var cat_features = [];
  for (var i=0; i<features.Features.length; i++){
    var item = features.Features[i];
    if(item["DataType"] == "string"){
      cat_features.push(item["Features"]);
    }
  }

  if(cat_features == undefined || cat_features.length == 0){
    alert("Categorical Data not found")
  } else {
    datasources.catCols.sendData({"categorical" : cat_features});
  }
  
  //console.log(ctx.datasource)

  var data = []
  for (var i=0; i<ctx.datasource.DATA.length; i++){
    var item = ctx.datasource.DATA[i];
    var values = []
    for(var j=0; j<cat_features.length; j++){
      values.push(item[cat_features[j]])
    }
    var result = {}
    cat_features.forEach((key, i) => result[key] = values[i]);
    data.push(result)
  }

  // console.log(data)

  var featureData = ctx.datasource;
  if(featureData == undefined || featureData == null){
    return;
  }

  /** @type {GridSourceObj} */
  var gridData = {
    data: data,
    count: featureData.TOTAL,
    keyColumn: 'item_id',
  }          
  return gridData
}