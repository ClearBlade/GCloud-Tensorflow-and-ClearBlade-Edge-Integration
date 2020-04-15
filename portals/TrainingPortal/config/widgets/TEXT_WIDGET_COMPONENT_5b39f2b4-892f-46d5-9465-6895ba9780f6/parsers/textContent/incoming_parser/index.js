/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var to_clean = []
  for(var i=0; i<ctx.datasource.clean.length; i++){
    to_clean.push(ctx.datasource.clean[i].item_id);
  }
  return "Selected Columns to Clean: " + to_clean;
}