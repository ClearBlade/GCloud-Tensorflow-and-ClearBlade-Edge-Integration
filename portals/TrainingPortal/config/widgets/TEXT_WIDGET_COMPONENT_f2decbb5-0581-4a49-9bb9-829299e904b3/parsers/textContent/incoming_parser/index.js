/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var data = ctx.datasource.clean
  if(data = undefined || data.length == 0){
    return "No Categorical Columns Selected"
  } else {
    var cols = [];
    var data = ctx.datasource.clean
    for(var i=0; i<data.length; i++){
      cols.push(data[i].item_id)
    }
    return "Selected Columns to Clean: " + cols;
  }
}