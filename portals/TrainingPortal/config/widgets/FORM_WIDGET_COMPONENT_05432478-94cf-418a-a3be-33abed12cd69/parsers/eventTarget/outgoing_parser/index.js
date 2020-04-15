/**
* @param {context} ctx - Object containing data and model information for this item.
*/
parser = (ctx) => {
  console.log(ctx.widget.data);

  // return datasources.MY_CODE_SERVICE_NAME.sendData(ctx.widget.data).then((res) => {
  //     if (res.success) {
  //         console.log('Successfully created: ', res.results)
  //     } else {
  //         console.log('error: ', res.results)
  //     }
  //     return res
  // })

  return {}
}