/**
* @param {context} ctx - Object containing data and model information for this item.
*/
  parser = (ctx) => {

    var id;
    // var data = datasources.CollectionName.latestData();
    var data1 = datasources.featureCollection.latestData();
    var data2 = datasources.features.latestData();
    var data3 = datasources.collectionName.latestData();
    var data = data3.CollectionName;

    if(data == null){
        alert("Please provide a Training Collection name")
        return '';
    }

    if(data1 == null){
        alert("Please provide a Feature Collection name")
        return '';
    }

    const token = datasources.authtoken.latestData();
    if(token == null){
      token = "";
    }

    var url = "https://staging.clearblade.com/api/v/3/collectionmanagement";
    var header = {
      "Content-Type": "application/json",
      "ClearBlade-UserToken" :token,
      "ClearBlade-SystemKey" : "a6c2e6d10bc2f183fca3c7d3d0fe01" 
    };

  function postData(url, featureCollectionName){
    var body = {
    "name": featureCollectionName,
    "appID": "a6c2e6d10bc2f183fca3c7d3d0fe01"
    };

    return new Promise((resolve, reject) => {
        fetch(url, {
        method:'POST',
        headers: header,
        body: JSON.stringify(body)
      }).then((resp) => resp.json())
      .then((data) => resolve(data))
    })
  }

  var createColumns = function(data){

    var promises = [];
    const collection_id = data["collectionID"];
    id = collection_id;
    datasources.collectionID.sendData(id);
    var features = data2.Features;

    if(features.length == 0){
      alert("Selecting all the features");
      var feature_map = datasources.allFeatures.latestData();
      var features1 = feature_map.Features;

      for(var i=0; i<features1.length; i++){
        var body = {
          "id":collection_id,
          "addColumn":{
            "id":collection_id,
            "type":features1[i].DataType,
            "name":features1[i].Features
          }
        };

        var promise = new Promise(
          (resolve, reject) => {
            fetch(url, 
            {
              method:"PUT",
              headers:header,
              body:JSON.stringify(body)
            }).then((data) => resolve("Done"))
          }
        )

        promises.push(promise);
      }

      Promise.all(promises).then(() => {       
        datasources.createFlag.sendData({"status":1});
        alert("Collection Created. Provide permissions to the collection from the platform.")
      });

    } else {
      for(var i=0; i<features.length; i++){
        var body = {
          "id":collection_id,
          "addColumn":{
            "id":collection_id,
            "type":features[i].DataType,
            "name":features[i].Features
          }
        };

        var promise = new Promise(
          (resolve, reject) => {
            fetch(url, 
            {
              method:"PUT",
              headers:header,
              body:JSON.stringify(body)
            }).then((data) => resolve("Done"))
          }
        )

        promises.push(promise);
      }

      Promise.all(promises).then(() => {
        datasources.createFlag.sendData({"status":1});
        alert("Collection Created. Provide permissions to the collection from the platform.")
      });
    }
  }

  // var generateData = function(){
  //   console.log("Now inside generate");
  //   var features = data2.Features;
  //   var selectColumns = [];
  //   var datatypes = [];

  //   if (features.length == 0){
  //     var data3 = datasources.allFeatures.latestData();
  //     var features = data3.Features;
  //     for(var i=0; i<features.length; i++){
  //       selectColumns.push(features[i]["Features"]);
  //       datatypes.push(features[i].DataType);
  //     }
      
  //     datasources.selectFeatures.sendData({"CollectionName":data, "featureCollection": data1, "selectColumns":selectColumns, "dataTypes":datatypes});
          
  //     var send_data = []

  //     for(var i=0; i<features.length; i++){
  //       var item = features[i];
  //       var field = {"Features":item.Features, "DataType":item.DataType, "item_id":item.item_id};
  //       send_data.push(field);
  //     }

  //     datasources.features.sendData({"Features":send_data});

  //     alert("Feature Dataset generated successfully");
  //     return;
  //   }

  //   for(var i=0; i<features.length; i++){
  //     selectColumns.push(features[i]["Features"]);
  //     datatypes.push(features[i].DataType);
  //   }

  //   datasources.selectFeatures.sendData({"CollectionName":data, "featureCollection": data1, "selectColumns":selectColumns, "dataTypes":datatypes});
  //   alert("Feature Dataset generated successfully");
  // }

  postData(url, data1)
    .then((data) => createColumns(data))
    .catch((err) => console.log(err));
}