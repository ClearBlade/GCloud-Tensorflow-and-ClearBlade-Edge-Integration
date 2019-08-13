/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  /**
  * @type {FormSourceObj}
  */

  const systemKey = datasources.systemCredentials.latestData().systemKey;
  const systemSecret = datasources.systemCredentials.latestData().systemSecret;
  const systemName = datasources.systemCredentials.latestData().systemName;

  var value = Math.floor(Math.random() * 10000);
  var bucket_name = "mybucket_" + value.toString();
  var job_name = "myJob_" + value.toString();

  var formSourceObj = {
    data: {
      systemKey : systemKey,
      systemSecret : systemSecret,
      featureCol: datasources.featureCollection.latestData(),
      bucket : bucket_name,
      jobName : job_name,
      project : systemName
    },

    overrideFieldSettings : {
     "field29" : { "name": "field29",
      "dataType": "bool",
      "inputType": "boolean",
      "display": true,
      "key": "a9559472-beb7-45b9-8a0e-165631e04c9f",
      "layout": {
        "sm": {
          "h": 5,
          "w": 18,
          "x": 0,
          "y": 87.3,
          "i": "field29",
          "minH": 15,
          "moved": true,
          "static": true
        }
      },
      "orderIdx": 29,
      "defaultValue": true,
      "label": "Use Default Model"
      }
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