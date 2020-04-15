/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
    // /**
  //  * @type {FormSourceObj}
  //  */

  var data = datasources.allFeatures.latestData().Features;
  if(data.length == 0){
    return;
  }

  var opt = [];

  for(var i=0; i<data.length; i++){
    opt.push(data[i].Features);
  }

  console.log(opt)

  var formSourceObj = {
      // the initial data the form has when loaded
    data : {"Select": "select"},
    overrideFieldSettings: {
      "Feature on X Axis": {
        name: "Feature on X Axis", dataType: 'string', orderIdx: 5, inputType: 'option', dropdownOptions: opt,
      },
      "Feature on Y Axis": {
        name: "Feature on Y Axis", dataType: 'string', orderIdx: 6, inputType: 'option', dropdownOptions: opt,
      },
    }
  };

  return formSourceObj
}