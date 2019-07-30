function example(req, resp) {

    req.params = {
    "collectionName" : "SampleCollection",
    "featureCollection" : "example",
    "selectColumns" : ["make", "origin", "drivetrain","engine_size","horsepower","price"]
    };
  
  const collection = req.params.collectionName;
  var features = req.params.selectColumns;

  var checkFeatures = function (err, data){
    if (err) {
      resp.error("fetch error : " + JSON.stringify(data));
    } else {
        //log(data);
        var keys = Object.keys(data["DATA"][0]);
        for(var i=0; i<features.length; i++){
          if (keys.indexOf(features[i])!=-1){
            log("Feature: < " + features[i] + " > found");
            continue;
          }
          else{
            log("Feature: < " + features[i] + " > not found");
            resp.error("Incorrect Feature Map. Features provided must match the columns of the dataset!");
          }
        }
    }
  }

  var selectFeatures = function(err, data){
    if(err){
      resp.error("fetch error : " + JSON.stringify(data));
    } else{
        const featureDataset = req.params.featureCollection;
        var data = data["DATA"];
        //log(data[0]);
        var col = ClearBlade.Collection( {collectionName: featureDataset} );
        col.create(data, function(err, data){
          if(err){
            resp.error("Creation error : Please Create an empty collection with name as < " + featureDataset + " > and add columns [ " + features + " ]");
          } else{
              resp.success("Success");
          }
        });
    }
  }

  ClearBlade.init({request:req});
  // log(req);
  var query = ClearBlade.Query({collectionName:collection});
  query.setPage(500);
  query.fetch(checkFeatures); 

  var query1 = ClearBlade.Query({collectionName:collection});
  query1.columns(features);
  query1.fetch(selectFeatures);
}
