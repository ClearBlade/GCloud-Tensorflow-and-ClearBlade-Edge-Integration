/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  /**
  * @type {FormSourceObj}
  */
  // EXAMPLE of advanced features

  // const systemKey = datasources.systemCredentials.latestData().systemKey;
  const systemSecret = datasources.systemCredentials.latestData().systemSecret;

  // console.log(systemKey);
  // console.log(systemSecret);

  const systemKey = CB_PORTAL.ClearBlade.systemKey;

  // console.log(CB_PORTAL.ClearBlade.URI);
  // const systemSecret = CB_PORTAL.ClearBlade.systemSecret;

  // function authenticate(){
  //   var url = "https://staging.clearblade.com/api/v/1/user/auth"
  //   var header = {
  //     "ClearBlade-SystemKey" : systemKey,
  //     "ClearBlade-SystemSecret" : systemSecret
  //   }

  //   var body = {
  //     "email":"test@email.com",
  //     "password":"password"
  //   }

  //   return new Promise((resolve, reject) => {
  //     fetch(url, {
  //       method:'POST',
  //       headers:header,
  //       body:JSON.stringify(body)
  //     }).then((resp) => resp.json())
  //     .then((data) => resolve(data));
  //   })

  // }

  function getData(){  
    // datasources.authtoken.sendData(data["user_token"]); 
    var url = CB_PORTAL.ClearBlade.URI + "/api/v/3/allcollections/" + systemKey;
    // var header = {
    //   "ClearBlade-UserToken" : data["user_token"],
    //   "systemKey" : systemKey
    // }

    var header = {
      "ClearBlade-UserToken" : CB_PORTAL.ClearBlade.user.authToken,
      "systemKey" : systemKey
    }

    return new Promise((resolve, reject) => {
        fetch(url, {
        method:'GET',
        headers: header
      }).then((resp) => resp.json())
      .then((data) => resolve(data))
    })
  }

  var displayCollections = function(getdata){
    const data = {}
    var collection_names = []
    for(var i=0; i<getdata.length; i++){
      // console.log(getdata[i]);
      if (getdata[i]["name"] == "ModelArchitecture"){
        datasources.modelArchitectureID.sendData(getdata[i]["collectionID"]);
      } else if (getdata[i]["name"] == "CategoricalData"){
        datasources.categoricalDataID.sendData(getdata[i]["collectionID"]);
      } else {
      collection_names.push(getdata[i]["name"]);
      }
    }

    data["collection_names"] = collection_names;
    // console.log(data);

    var formSourceObj = {
      data : {collection_name : "Select"},
      overrideFieldSettings: {
        "Select Training Data": {
          name: 'Select Training Data', dataType: 'string', inputType:'option', orderIdx: 5, dropdownOptions: collection_names,
        }
      }
    };

    var promise = Promise.resolve(formSourceObj);
    return promise;
  }

  // authenticate()
  //   .then((data) => getData(data))
  //   .then((data) => displayCollections(data))
  //   .then((formSourceObj) => {datasources.collections.sendData({"form":formSourceObj})})
  //   .catch((err) => console.log(err));

  getData()
    .then((data) => displayCollections(data))
    .then((formSourceObj) => {datasources.collections.sendData({"form":formSourceObj})})
    .catch((err) => console.log(err));

  var form_data = datasources.collections.latestData();
  
  if(form_data == undefined){
    return ""
  }

  return form_data.form;
}
