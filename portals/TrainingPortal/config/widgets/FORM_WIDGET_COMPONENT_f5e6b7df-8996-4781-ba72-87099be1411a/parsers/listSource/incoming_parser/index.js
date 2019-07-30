/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  /**
  * @type {FormSourceObj}
  */

  var value = Math.floor(Math.random() * 10000);
  var bucket_name = "mybucket_" + value.toString();
  var job_name = "myJob_" + value.toString();

  var formSourceObj = {
    data: {
      systemKey : "a6c2e6d10bc2f183fca3c7d3d0fe01",
      systemSecret : "A6C2E6D10BCADB819FABF8FCD94E",
      featureCol: datasources.featureCollection.latestData(),
      bucket : bucket_name,
      jobName : job_name,
      project : "DataPreprocessing",
    }
  };

  return formSourceObj

  // // EXAMPLE of advanced features
  // const stateToCity = {
  //   Texas: ['Austin', 'Dallas', 'El Paso'],
  //   California: ['San Francisco', 'Los Angeles']
  // }

  // /**
  //  * @type {FormSourceObj}
  //  */
  // var formSourceObj = {
  //   // the initial data the form has when loaded
  //   data: { state: "Texas" },

  //   // gets called every time something in the form changes
  //   onUpdate: function (arg) {
  //     if (arg.currentValues.state) {
  //       var cityOptions = stateToCity[arg.currentValues.state]
  //       arg.fieldSettings.city.dropdownOptions = cityOptions
  //     }
  //     return arg
  //   },

  //   // an object the same shape as fieldSettings, that is merged with the settings from the UI
  //   // useful for adding dynamic things like dropdown options from a collection
  //   overrideFieldSettings: {
  //     state: {
  //       name: 'state', dataType: 'string', orderIdx: 5, inputType: 'BUTTON_GROUP', dropdownOptions: ['Texas', 'California'],
  //     },
  //     city: {
  //       name: 'city', dataType: 'string', orderIdx: 6, inputType: 'BUTTON_GROUP', dropdownOptions: ['Austin', 'Dallas', 'El Paso'],
  //     },
  //   }
  // };
  // return formSourceObj

}