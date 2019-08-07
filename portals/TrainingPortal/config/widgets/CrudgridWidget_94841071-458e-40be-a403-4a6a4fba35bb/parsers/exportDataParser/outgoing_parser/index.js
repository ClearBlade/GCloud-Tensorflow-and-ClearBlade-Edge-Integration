/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  // Export using a collection datasource
  const query = { 
      ...ctx.widget.query.query,
      // ctx removes pagination so we export the full table
      // while keeping any filters we have applied
      // PAGESIZE: 0, 
      // PAGENUM: 0, 
  }
  return datasources.MY_COLLECTION.sendData({ query: { query } }).then((data) => (
      data.map(d => d.data)
  ))

  // Export using a Code Service datasource
  // const cbQuery = { 
  //     ...ctx.widget.query.query,
  //     // ctx removes pagination so we export the full table
  //     // while keeping any filters we have applied
  //     // PAGESIZE: 0, 
  //     // PAGENUM: 0, 
  // }
  // return datasources.MY_FETCH_CODE_SERVICE.sendData({ cbQuery }).then((data) => {
  //     return data.results.DATA
  // })
              
}