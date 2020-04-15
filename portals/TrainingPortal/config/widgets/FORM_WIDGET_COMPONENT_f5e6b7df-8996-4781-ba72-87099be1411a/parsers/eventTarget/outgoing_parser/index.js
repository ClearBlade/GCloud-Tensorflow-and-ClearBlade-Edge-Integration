/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {

  var dataFile = datasources.dataFile.latestData();
  var archFile = datasources.archFile.latestData();
  var trainFile = datasources.trainFile.latestData();

  if(dataFile == undefined || archFile == undefined || trainFile == undefined) {
    console.log("Selecting default model architecture from the collections.")
  } else {
    var encoded_data = btoa(dataFile);
    var encoded_arch = btoa(archFile);
    var encoded_train = btoa(trainFile);

    var url = CB_PORTAL.ClearBlade.URI + "/api/v/1/collection/" + CB_PORTAL.ClearBlade.systemKey +"/TrainingFiles"

    var header = {
      "ClearBlade-UserToken" : CB_PORTAL.ClearBlade.user.authToken,
      "systemKey" : CB_PORTAL.ClearBlade.systemKey,
      "collectionName" : "TrainingFiles"
    }

    var body = {
      "datafile" : encoded_data,
      "archfile" : encoded_arch,
      "trainfile" : encoded_train
    }

    fetch(url, {
          method:'POST',
          headers:header,
          body:JSON.stringify(body)
        }).then((resp) => resp.json())
        .then((data) => console.log(data));
  }

  var data = ctx.widget.data;
  data["url"] = CB_PORTAL.ClearBlade.URI;
  //console.log(data)
  
  if(datasources.datafilename.latestData() == undefined){
    data["dataFile"] = "processData.py"
  } else {
    data["dataFile"] = datasources.datafilename.latestData();
  }

  if(datasources.archfilename.latestData() == undefined){
    data["archFile"] = "model.py"
  } else{
    data["archFile"] = datasources.archfilename.latestData();
  }

  if(datasources.trainfilename.latestData() == undefined){
      data["taskFile"] = "task.py";
  } else {
      data["taskFile"] = datasources.trainfilename.latestData();
  }

  // data["usertoken"] = datasources.authtoken.latestData();
  // data["modelid"] = "9ed0fcd20b98a0f6e3af8ccd859d01"

  data["usertoken"] = CB_PORTAL.ClearBlade.user.authToken;
  data["modelid"] = datasources.modelArchitectureID.latestData();
  data["cat_id"] = datasources.categoricalDataID.latestData(); 

  var clean = [];
  for (var i=0; i<datasources.cleanColumns.latestData().clean.length; i++){
    clean.push(datasources.cleanColumns.latestData().clean[i].item_id);
  }

  data["toClean"] = clean;
  delete data["field30"]
  datasources.send.sendData(JSON.stringify(data));
  alert("Data Sent for Training. Go To https://console.cloud.google.com/mlengine/jobs?project=clearblade-testing to monitor your progress")

  // console.log(data)

  // return datasources.MY_CODE_SERVICE_NAME.sendData(ctx.widget.data).then((res) => {
  //     if (res.success) {
  //         console.log('Successfully created: ', res.results)
  //     } else {
  //         console.log('error: ', res.results)
  //     }
  //     return res
  // })

  return {}
}
