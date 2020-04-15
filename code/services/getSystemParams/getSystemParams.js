/**
 * Type: Micro Service
 * Description: A short-lived service which is expected to complete within a fixed period of time.
 * @param {CbServer.BasicReq} req
 * @param {string} req.systemKey
 * @param {string} req.systemSecret
 * @param {string} req.userEmail
 * @param {string} req.userid
 * @param {string} req.userToken
 * @param {boolean} req.isLogging
 * @param {[id: string]} req.params
 * @param {CbServer.Resp} resp
 */

function getSystemParams(req,resp){
    // These are parameters passed into the code service
    var params = req.params
    var systemParams = {
        "systemSecret" : req.systemSecret,
    }
    log(req);
    resp.success(systemParams);
}
