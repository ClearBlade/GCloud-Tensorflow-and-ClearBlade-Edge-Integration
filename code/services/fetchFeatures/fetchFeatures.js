function fetchFeatures(req, resp) {
  log(req);
  ClearBlade.init({request:req});

  const collection = req.params.CollectionName;
  //const collection = "SampleCollection";

  var fetch = function(err, data){
    if (err) {
      resp.error("fetch error : " + JSON.stringify(data));
    } else {
      var fetchedData = data['DATA'][0];
      var keys = Object.keys(fetchedData);
      //var vals = Object.values(fetchedData);
      var features = [];
      var datatypes = [];
      var itemID = []
      for (var i=0; i<keys.length; i++){
        if(keys[i]!="item_id"){
          features.push(keys[i]);
          if(typeof fetchedData[keys[i]] != "number"){
            datatypes.push(typeof fetchedData[keys[i]]);
          } else {
            // if (fetchedData[keys[i]] % 1 === 0){
            //   datatypes.push("int");
            // } else {
            //   datatypes.push("float");
            // }
            datatypes.push("float");
          }
          var x = Math.floor((Math.random() * 10000000) + 1);
          itemID.push(x);          
        }
      }

      data = [];

      for (var i=0; i<features.length; i++){
        data.push({"Features": features[i], "DataType": datatypes[i], "item_id": itemID[i]});
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