/**
* @param {context} ctx - Object containing data and model information for this item.
*/

parser = (ctx) => {
  var dataF = datasources.features.latestData();
  var features = dataF.Features;

  if(features.length == 0){
    return;
  }

  var categories = datasources.CategoricalData.latestData()
  var last = categories.length - 1
  var category = categories[last].data;
  //console.log(atob(category.categorization));

  var cat_data = atob(category.categorization)
  //console.log(cat_data);
  cat_data = cat_data.replace(/u'/g, '"');
  cat_data = cat_data.replace(/'/g, '"');
  var cat_dict = JSON.parse(cat_data)
  console.log(cat_dict)
  
  var settings = {};
  var data = {};

  // name: 'Select Training Data', dataType: 'string', inputType:'option', orderIdx: 5, dropdownOptions: collection_names,

  for(var i=0; i<features.length; i++){
    var datatype = "";
    var inputtype = "";
    var field = features[i]["Features"];
    var dtype = features[i]["DataType"];  
    if (dtype == "int"){
      datatype = "integer";
      inputtype = 'number';
      dropdownOptions = [];
      data[field] = 0
    } else if (dtype == "float"){
      datatype = "float";
      inputtype = 'number';
      dropdownOptions = [];
      data[field] = 0.0
    } else {
      datatype = "string";
      inputtype = 'option';
      if(cat_dict[field] == undefined){
        inputtype = 'text';
        dropdownOptions = [];
        data[field] = ""
      } else{
        dropdownOptions = Object.keys(cat_dict[field])
        data[field] = dropdownOptions[0]
      }
    }

    settings[field] = { name : field, prependText : inputtype, dataType : datatype, orderIdx : 100, inputType : inputtype, dropdownOptions:dropdownOptions };
    // data[field] = ""  
  }

  var formSourceObj = {
    data : data,
    overrideFieldSettings: settings 
  };

  return formSourceObj;
}
