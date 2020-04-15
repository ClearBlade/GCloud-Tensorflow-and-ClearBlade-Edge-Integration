/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */
parser = (ctx) => {
  var col = ctx.widget.data["Select Training Data"];
  console.log(col);
  datasources.features.sendData({"Features":[]});
  datasources.collectionName.sendData({"CollectionName":col});
  datasources.fetchTrainData.sendData({"CollectionName":col});
  datasources.fetchFeatures.sendData({"CollectionName":col});
  // datasources.numberOfNulls.sendData({"CollectionName":col});
  // datasources.cleanData.sendData({"CollectionName":col});

  CB_PORTAL.Loader.show("crudtrain");
}