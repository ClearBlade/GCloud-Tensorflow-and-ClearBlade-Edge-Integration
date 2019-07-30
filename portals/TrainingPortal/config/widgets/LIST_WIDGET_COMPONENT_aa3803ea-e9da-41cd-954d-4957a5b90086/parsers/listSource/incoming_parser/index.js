/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var data = [];
  datasources.cleanColumns.sendData({"clean":[]})
  datasources.cleanColumns
  if(ctx.datasource.categorical == undefined){
    return;
  } else{
    for (var i=0; i<ctx.datasource.categorical.length; i++){
      data.push({"label": ctx.datasource.categorical[i], "value":{"item_id":ctx.datasource.categorical[i]}})
    }
  }
  
  return data;
}