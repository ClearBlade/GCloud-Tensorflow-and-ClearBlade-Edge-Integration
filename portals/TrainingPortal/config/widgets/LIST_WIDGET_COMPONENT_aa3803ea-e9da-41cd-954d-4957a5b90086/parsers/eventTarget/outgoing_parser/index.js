/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  console.log(ctx.widget);
  const clean_cols = datasources.cleanColumns.latestData();
  var data = clean_cols.clean;

  if(data.length > 0){
    var flag = 0;
    for (var i=0; i<data.length; i++){
      if(data[i] == ctx.widget){
        flag = 1;
      } else {
        continue
      }
    }

    if(flag == 0){
      clean_cols.clean.push(ctx.widget)
    }
  } else {
    clean_cols.clean.push(ctx.widget);
  }

  return clean_cols
}


// const current = datasources.features.latestData();
// var data = current.Features;

// if(data.length > 0){
//   var flag = 0;
//   for(var i=0; i<data.length; i++){
//     if(data[i]['Features'] == this.widget.item["Features"]){
//         flag = 1;
//     } else {
//         continue;
//     }
//   }

//   if(flag == 0){
//     current.Features.push(this.widget.item);
//     //current.push(this.widget.item);
//   }
// } else {
//   current.Features.push(this.widget.item);
//   //current.push(this.widget.item);
// }

// return current;