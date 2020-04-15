/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var data = ctx.data;
  if(data == ""){
    return " "
  }
  data = data.replace(/\s/g, '');
  return data;
}