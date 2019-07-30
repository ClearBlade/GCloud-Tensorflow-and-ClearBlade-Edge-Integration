/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var col = ctx.widget.data["Select Training Data"];
  console.log(col);
  datasources.collectionName.sendData({"CollectionName":col});
  datasources.fetchTrainData.sendData({"CollectionName":col});
  datasources.fetchFeatures.sendData({"CollectionName":col});
  // datasources.cleanData.sendData({"CollectionName":col});

  CB_PORTAL.Loader.show("crudtrain");
}