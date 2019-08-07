/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  /** @type {GridSourceObj} */

  if(ctx.datasource.results.DATA == null){
    datasources.allFeatures.sendData({"Features": []});
  } else {
    datasources.allFeatures.sendData({"Features":  ctx.datasource.results.DATA});
  }

  var gridData = {
    data: ctx.datasource.results.DATA,
    count: ctx.datasource.results.TOTAL,
    keyColumn: 'item_id',
    // highlightId: '',
    // overrideFieldSettings: {},
    // columns: [ // whitelists what columns work for sort and filter and create modal
    //   { ColumnName: 'name', ColumnType: 'string', custom: true },
    // ],
  }          

  return gridData
}