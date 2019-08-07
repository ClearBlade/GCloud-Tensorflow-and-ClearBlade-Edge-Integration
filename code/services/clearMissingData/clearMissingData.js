function clearMissingData(req, resp) {
  
  ClearBlade.init({request:req});

  const collection = req.params.CollectionName;
  //const collection = "Features"
  
  var fetchedData;
  var emptyRows = [];

  var handleEmptyRows = function (err, data) {
    if (err) {
      log(data);
      resp.error("fetch error : " + JSON.stringify(data));
    } else {
        fetchedData = data;
        var count = fetchedData["TOTAL"];

        for(var i=0; i<count; i++){          
          var currentItem = fetchedData["DATA"][i];
          var counter = 1;
          var keys = Object.keys(currentItem);

          for(var j=0; j<keys.length; j++){
            if(currentItem[keys[j]] == undefined){
              var itemID = currentItem['item_id'];
              var query1 = ClearBlade.Query({collectionName:collection});
              query1.equalTo('item_id', itemID);
              query1.remove(function(err, data){
                if (err) {
                  resp.error("removal error : " + JSON.stringify(data));
                } else {
                  log("Item with Item ID: " + itemID + " removed");
                }
              });
              break;
            }
          }
        }
        resp.success("Done");
    }
  }

  var query = ClearBlade.Query({collectionName:collection});
  query.setPage(1000);
  query.fetch(handleEmptyRows);
  //col.count(callback);
  //resp.success('Success');
}
