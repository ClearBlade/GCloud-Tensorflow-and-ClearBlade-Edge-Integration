function selectFeatures(req, resp) {

//    req.params = {
//   "CollectionName": "SampleCollection",
//   "dataTypes": [
//     "int",
//     "string",
//     "float",
//     "int",
//     "int",
//     "string",
//     "float",
//     "int",
//     "string",
//     "int",
//     "string"
//   ],
//   "featureCollection": "Features",
//   "selectColumns": [
//     "cylinders",
//     "drivetrain",
//     "engine_size",
//     "horsepower",
//     "length",
//     "make",
//     "mpg_city",
//     "mpg_highway",
//     "origin",
//     "price",
//     "type"
//   ]
// }

// req.params = {
//   "CollectionName": "MainCollection",
//   "dataTypes": [
//     "string",
//     "string",
//     "string",
//     "int",
//     "int",
//     "int",
//     "string",
//     "string",
//     "int",
//     "string",
//     "string",
//     "string",
//     "float",
//     "int",
//     "string",
//     "float",
//     "string",
//     "string",
//     "string",
//     "string",
//     "string",
//     "string",
//     "string",
//     "int",
//     "float",
//     "float"
//   ],
//   "featureCollection": "f0e790d30ba6cb98eb9eb7f4ff53",
//   "selectColumns": [
//     "aspiration",
//     "body_style",
//     "bore",
//     "city_mpg",
//     "compression_ratio",
//     "curb_weight",
//     "drive_wheels",
//     "engine_location",
//     "engine_size",
//     "engine_type",
//     "fuel_system",
//     "fuel_type",
//     "height",
//     "highway_mpg",
//     "horsepower",
//     "length",
//     "make",
//     "normalized_losses",
//     "num_of_cylinders",
//     "num_of_doors",
//     "peak_rpm",
//     "price",
//     "stroke",
//     "symboling",
//     "wheel_base",
//     "width"
//   ]
// }
  
  var checkFeatures = function (err, data){
    if (err) {
      resp.error("fetch error 1: " + JSON.stringify(data));
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

  var checkAllFeatures = function(err, data){
    if(err){
      resp.error("fetch error 2: " + JSON.stringify(data));
    } else {
      var data = data["DATA"];
      if(data.length != 0){
        //resp.success("Data Already Present. Please delete the previous data and try again");
        for(var i=0; i<data.length; i++){
          var remove_query = ClearBlade.Query({collectionName: "AllFeatures"});
          var feature = data[i].features;
          remove_query.equalTo('features',feature);
          remove_query.remove(function(err,data){
            if(err){log(err)};
          });
        }
      } 

      var callback = function (err, data) {
        if (err) {
            resp.error("creation error : " + JSON.stringify(data));
          } 
      };

      var feat = [];
      for(var i=0; i<features.length; i++){
        feat.push({"features":features[i], "dtypes":feature_datatypes[i]});
      }

      var col1 = ClearBlade.Collection({collectionName:"AllFeatures"});
      col1.create(feat, callback);
    }
  }

  var checkIfPresent = function(err, data){
    if(err){
      resp.error("fetch error 3: " + JSON.stringify(data));
    } else{
      var data = data["DATA"];
      //log("This is data length" + data.length);
      if(data.length != 0){
        resp.success("Data Already Present. Please delete the previous data and try again");
      }
    }
  }

  var selectFeatures = function(err, data){
    if(err){
      resp.error("fetch error 4: " + JSON.stringify(data));
    } else{
        log(data.TOTAL);
        var data = data["DATA"];
        //log("This is the feature ID: " + featureDataset);
        var col = ClearBlade.Collection( {collectionName: featureDataset} );
        col.create(data, function(err, data){
          if(err){
            log(data);
            resp.error("Creation error : Please Create an empty collection with name as < " + featureDataset + " > and add columns [ " + features + " ]");
          } else{
            resp.success("Success");
          }
        });
    }
  }

  ClearBlade.init({request:req});
  log(req);
  const collection = req.params.CollectionName;
  const featureDataset = req.params.featureCollection;
  var features = req.params.selectColumns;
  var feature_datatypes = req.params.dataTypes;
  
  var query = ClearBlade.Query({collectionName:collection});
  query.setPage(1);
  query.fetch(checkFeatures); 

  var query3 = ClearBlade.Query({collectionName:"AllFeatures"});
  query3.fetch(checkAllFeatures);

  var query2 = ClearBlade.Query({collectionName:featureDataset});
  query2.fetch(checkIfPresent);

  var query1 = ClearBlade.Query({collectionName:collection});
  query1.setPage(1000);
  query1.columns(features);
  query1.fetch(selectFeatures);
}
