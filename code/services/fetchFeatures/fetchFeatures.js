function fetchFeatures(req, resp) {
  log(req);
  ClearBlade.init({request:req});

  const collection = req.params.CollectionName;
  //const collection = "SensorData";

  var fetchedData;
  var emptyRows = [];
  var countMap = {};
  var total_entries;

  var checkVals = function (err, data) {
    if (err) {
      log(data);
      resp.error("fetch error : " + JSON.stringify(data));
    } else {
      total_entries = data.TOTAL;
      var resp = data.DATA;
      var key = Object.keys(data.DATA[0])
      var count = 0
      for(var i=0; i<total_entries; i++){
        if(resp[i][key] == 0){
          count++;
        }
        countMap[key] = count;
      }
    }
  }

  var fetch = function(err, data){
    if (err) {
      resp.error("fetch error : " + JSON.stringify(data));
    } else {
      var fetchedData = data['DATA'][0];
      var keys = Object.keys(fetchedData);
      //var vals = Object.values(fetchedData);
      var features = [];
      var datatypes = [];
      var itemID = [];
      var count = [];
      for (var i=0; i<keys.length; i++){
        if(keys[i]!="item_id"){
          features.push(keys[i]);
          if(typeof fetchedData[keys[i]] != "number"){
            datatypes.push(typeof fetchedData[keys[i]]);
          } else {
            datatypes.push("float");
          }
          var x = Math.floor((Math.random() * 10000000) + 1);
          itemID.push(x);   

          var query2 = ClearBlade.Query({collectionName:collection});          
          query2.setPage(1000);
          query2.columns([keys[i]])
          query2.fetch(checkVals); 
        }
      }

      data = [];

      for (var i=0; i<features.length; i++){
        data.push({"Features": features[i], "DataType": datatypes[i], "item_id": itemID[i], "Null Values" : countMap[features[i]] ,"Total Values":total_entries});
      } 
      
      var data = {
        "CURRENTPAGE": 1,
        "DATA" : data,
        "NEXTPAGEURL": null,
        "PREVPAGEURL": null,
        "TOTAL": features.length
      }

      console.log(data);
      resp.success(data);
    }
  }

  var query = ClearBlade.Query({collectionName:collection});
  query.fetch(fetch);
}