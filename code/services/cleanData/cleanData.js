function cleanData(req, resp) {
  var d3 = getD3();  
  req.params = {"clean_by" : ["mean", "median"], "column_name": ["item_id","cylinders"], "collection_name": "SampleCollection"}
  
  var clean = function(err, data){
    if(err){
      resp.error("fetch error: " + JSON.stringify(data));
    } else{
      log(data.DATA);
      all_vals = [];
      nulls = []
      for(var i=0; i<data.TOTAL; i++){ 
        all_vals.push(data.DATA[i][features[1]]) 
        if(data.DATA[i][features[1]] == null){
          nulls.push(data.DATA[i][features[0]])
        }
      }

      var mean = d3.mean(all_vals);  
      var median = d3.median(all_vals);

      log(mean);
      log(median);

      const feature = features[1] 
      var update = {feature : mean}

      var query = ClearBlade.Query({collectionName:collection});
      query.equalTo('item_id', nulls[0])
      
      var changes = update

      var callback = function(err, data){
        if(err){
          resp.error("update error: " + JSON.stringify(data))
        } else {
          resp.success(data)
        }
      }

      query.update(changes, callback)

    }
  }

  var collection = req.params.collection_name;
  var features = req.params.column_name;
  var clean_by = req.params.clean_by;


  ClearBlade.init({request:req});
  var query1 = ClearBlade.Query({collectionName:collection});
  query1.setPage(1000);
  query1.columns(features);
  query1.fetch(clean);

  resp.success('Success');
}
