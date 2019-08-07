/**
* @param {context} ctx - Object containing data and model information for this item.
* @returns {GridSourceObj}
*/
parser = (ctx) => {
  /** @type {GridSourceObj} */
  var name = datasources.collectionName.latestData();
  if(name == null || name == undefined){
    return;
  }
  
  var response = datasources.numberOfNulls.latestData();
  if(response == undefined || response == null){
    return;
  }

  var data = [];
  var cols = Object.keys(response.results.NullValues)
  var total = response.results.total_entries;
  for (var i=0; i<cols.length; i++){
    data.push({"Features":cols[i], "Number of Null Values":response.results.NullValues[cols[i]], "Total Values":total})
  }
  var gridData = {
    data: data,
    count: cols.length,
    keyColumn: 'item_id',
  }          

  return gridData
}