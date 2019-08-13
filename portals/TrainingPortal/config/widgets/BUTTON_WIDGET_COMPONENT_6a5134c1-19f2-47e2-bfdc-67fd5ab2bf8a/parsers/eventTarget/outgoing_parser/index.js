/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
    var data1 = datasources.featureCollection.latestData();
    var data2 = datasources.features.latestData();
    var data3 = datasources.collectionName.latestData();
    var data = data3.CollectionName;
    var flag = datasources.createFlag.latestData();
    
    if(flag.status == 0){
      alert("Please create a feature collection.")
      return '';
    }

    if(data == null){
        alert("Please provide a Training Collection name")
        return '';
    }

    if(data1 == null){
        alert("Please provide a Feature Collection name")
        return '';
    }

    console.log("Now inside generate");
    var features = data2.Features;
    var selectColumns = [];
    var datatypes = [];

    if (features.length == 0){
      var data3 = datasources.allFeatures.latestData();
      var features = data3.Features;
      for(var i=0; i<features.length; i++){
        selectColumns.push(features[i]["Features"]);
        datatypes.push(features[i].DataType);
      }
      
      datasources.selectFeatures.sendData({"CollectionName":data, "featureCollection": data1, "selectColumns":selectColumns, "dataTypes":datatypes});
          
      var send_data = []

      for(var i=0; i<features.length; i++){
        var item = features[i];
        var field = {"Features":item.Features, "DataType":item.DataType, "item_id":item.item_id};
        send_data.push(field);
      }

      datasources.features.sendData({"Features":send_data});

      alert("Feature Data copied successfully");
      return;
    }

    for(var i=0; i<features.length; i++){
      selectColumns.push(features[i]["Features"]);
      datatypes.push(features[i].DataType);
    }

    datasources.selectFeatures.sendData({"CollectionName":data, "featureCollection": data1, "selectColumns":selectColumns, "dataTypes":datatypes});
    alert("Feature Data copied successfully");
}