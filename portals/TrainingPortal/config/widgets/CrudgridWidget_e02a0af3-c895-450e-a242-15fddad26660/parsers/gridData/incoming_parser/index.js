/**
* @param {context} ctx - Object containing data and model information for this item.
*/

CB_PORTAL.Loader.hide('crudtrain')

datasources.features.sendData({"Features":[]});
//datasources.featureCollection.sendData(" ");

parser = (ctx) => {
  /** @type {GridSourceObj} */
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