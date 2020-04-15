/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {

  console.log(ctx.model)

  // ctx.model.definition.settings[3].default_value.push({
  //   "dataKey" : "temperature",
  //   "orientation": "left"
  // })

  return [
      {"temperature":61,"humidity":50,"wind":14,"rainfall":5,"timestamp":"2016-06-22T02:26:14.368Z"},
      {"temperature":52,"humidity":60,"wind":8,"rainfall":6,"timestamp":"2016-06-23T02:27:41.112Z"},
      {"temperature":73,"humidity":70,"wind":4,"rainfall":0,"timestamp":"2016-06-24T02:27:51.132Z"}
    ]
}