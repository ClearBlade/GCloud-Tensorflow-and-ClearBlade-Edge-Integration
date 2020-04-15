
const current = datasources.features.latestData();
var data = current.Features;

if(data.length > 0){
  var flag = 0;
  for(var i=0; i<data.length; i++){
    if(data[i]['Features'] == this.widget.item["Features"]){
        flag = 1;
    } else {
        continue;
    }
  }

  if(flag == 0){
    current.Features.push(this.widget.item);
    //current.push(this.widget.item);
  }
} else {
  current.Features.push(this.widget.item);
  //current.push(this.widget.item);
}

return current;