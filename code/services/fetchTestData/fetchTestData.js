function fetchTestData(req, resp) {
  log(req.params);
  ClearBlade.init({request:req});

  var callback = function (err, data){
    if(err){
      resp.error("Cannot add entry: " + JSON.stringify(data));
    }
    else{
      resp.success(data);
    }
  };

  // var make = {'Mazda':0, 'Saab':1, 'Toyota':2, 'Volvo':3, 'Subaru':4, 'Nissan':5,
  //      'Volkswagen':6, 'Audi':7, 'Porsche':8, 'Mercedes-benz':9, 'Chevrolet':10,
  //      'Honda':11, 'Dodge':12, 'Mitsubishi':13, 'BMW':14, 'Plymouth':15};  
  // var fuel = {'Gas':0, 'Diesel':1};
  // var asp = {'Standard':0, 'Turbo':1};
  // var bstyle = {'Hatchback':0, 'Sedan':1, 'Wagon':2, 'Hardtop':3, 'Convertible':4};
  // var drive = {'Forward':0, 'Rear':1, '4WD':2};

  // var test_data = {
  //   'make':make[req.params.make],
  //   'fuel_type':fuel[req.params.fuel_type],
  //   'engine_size':req.params.engine_size,
  //   'num_of_cylinders':req.params.num_of_cylinders,
  //   'peak_rpm':req.params.peak_rpm,
  //   'aspiration':asp[req.params.aspiration],
  //   'body_style':bstyle[req.params.body_style],
  //   'drive_wheels':drive[req.params.drive_wheels]
  // }

  var test_data = req.params;

  var col = ClearBlade.Collection({collectionName:"TestData"});
  col.create(test_data, callback)
  resp.success("Success");
}

// {
//   "engine_size": 343,
//   "num_of_cylinders": 2,
//   "peak_rpm": 4311,
//   "make": "Audi",
//   "aspiration": "Standard",
//   "body_style": "Hatchback",
//   "drive_wheels": "Forward",
//   "fuel_type": "Gas"
// }