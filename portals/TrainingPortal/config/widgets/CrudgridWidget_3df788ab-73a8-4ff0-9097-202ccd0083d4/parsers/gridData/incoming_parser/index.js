parser = (ctx) => {

  // const collection_id = datasources.collectionID.latestData();
  // const systemKey = "a6c2e6d10bc2f183fca3c7d3d0fe01"
  // const collection_name = datasources.featureCollection.latestData();
  // const token = datasources.authtoken.latestData();
  
  // if(collection_name == null || collection_name==undefined){
  //   return;
  // }

  // var url = "https://staging.clearblade.com/api/v/1/collection/" + systemKey + "/" + collection_name;

  // function getData(url){
  //   var header = {
  //     "ClearBlade-UserToken" : token,
  //     "systemKey" : systemKey,
  //     "collectionName" : collection_name
  //   };

  //   return new Promise((resolve, reject) => {
  //     fetch(url, {
  //       method : 'GET',
  //       headers : header
  //     }).then((resp) => resp.json())
  //     .then((data) => resolve(data))
  //     .catch((err) => console.log(err))
  //   })
  // }

  // getData(url)
  // .then((data) => datasources.FeatureData.sendData(data))
  // .catch((err) => console.error("Error: Cannot Find the collection name"));

  var featureData = datasources.FeatureData.latestData();
  if(featureData == undefined || featureData == null){
    return;
  }

  /** @type {GridSourceObj} */
  var gridData = {
    data: featureData.DATA,
    count: featureData.TOTAL,
    keyColumn: 'item_id',
    // highlightId: '',
    // overrideFieldSettings: {},
    // columns: [ // whitelists what columns work for sort and filter and create modal
    //   { ColumnName: 'name', ColumnType: 'string', custom: true },
    // ],
  }          
  return gridData
}