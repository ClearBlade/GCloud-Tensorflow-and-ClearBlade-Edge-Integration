/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  var data = ctx.widget.data;
  console.log("Connected and Subscribed to the topic");
  // var flag = datasources.flag.latestData();
  // check = flag.Data;
  // if(check == 0){
  //   alert("Please Initialize the system First")
  //   return;
  // }
  datasources.predict.sendData(JSON.stringify(data));
  alert("Data sent for Prediction");
}