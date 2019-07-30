function clearMissingData(req, resp) {
  
  ClearBlade.init({request:req});

  const collection = req.params.CollectionName;
  
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
          var found = Object.keys(currentItem).filter(function(key){
            return currentItem[key] == "";
          });

          if (found.length){
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
          } else {
            continue;
          }
        }
        resp.success("Done");
    }
  }

  log(collection);
  var query = ClearBlade.Query({collectionName:collection});
  query.setPage(500);
  query.fetch(handleEmptyRows);
  //col.count(callback);
  //resp.success('Success');
}
