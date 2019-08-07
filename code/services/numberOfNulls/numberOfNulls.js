function numberOfNulls(req, resp) {
    
    ClearBlade.init({request:req});
    const collection = req.params.CollectionName;
    //const collection = "SampleCollection";    
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

    var getNullCount = function (err, data) {
      if (err) {
        log(data);
        resp.error("fetch error : " + JSON.stringify(data));
      } else {
          fetchedData = data;
          var keys = Object.keys(fetchedData.DATA[0])
          for (var i=0; i<keys.length; i++){
            var query1 = ClearBlade.Query({collectionName:collection});
            query1.setPage(1000);
            query1.columns([keys[i]])
            query1.fetch(checkVals); 
          }
          resp.success({"NullValues":countMap, "total_entries":total_entries});
      }
    }

    //log(collection);
    var query = ClearBlade.Query({collectionName:collection});
    query.setPage(1);
    query.fetch(getNullCount);
}
