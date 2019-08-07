/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {

  var data = datasources.GetFields.latestData();
  
  if(data.length == 0){
    alert("Cannot find any features used for training. Check your AllFeatures Collection.")
    return;
  }

  var send_data = []

  for(var i=0; i<data.length; i++){
    var item = data[i].data;
    var field = {"Features":item.features, "DataType":item.dtypes, "item_id":i};
    send_data.push(field);
  }
  //console.log(data[0].data)
  datasources.features.sendData({"Features":send_data});
}