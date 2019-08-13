from clearblade.ClearBladeCore import System
import base64
import json
import getModel as gm
import requests

model_data = {}

with open("train_params.json",'r') as fp:
    train_params = json.load(fp)

systemKey = train_params["systemKey"]
usertoken = train_params["usertoken"]
modelid = train_params["modelid"]

def create_collection_columns(arr):

    header = {
        "ClearBlade-UserToken" : usertoken,
        "ClearBlade-SystemKey" : systemKey
    }

    for i in arr:
        body = {
            "id" : modelid,
            "addColumn" : {
                "id" : modelid,
                "type" : "string",
                "name" : i
            }
        }

        response = requests.put("https://staging.clearblade.com/api/v/3/collectionmanagement", headers=header, data=json.dumps(body))
    
    #print("Columns Created - [Response]: " + response.status_code)

def add_data(arr, encoded_dict):
    header = {
        "ClearBlade-UserToken" : usertoken,
        "collectionID" : "9ed0fcd20b98a0f6e3af8ccd859d01"
    }

    body = {}

    for i in arr:
        body[i] = encoded_dict[i]

    response = requests.post("https://staging.clearblade.com/api/v/1/data/9ed0fcd20b98a0f6e3af8ccd859d01", headers=header, data=json.dumps(body))
    #print("Model Stored in the Collections - [Response]: " + response.status_code)    

def generateSchema():

    arr = []
    encoded_dict = {}

    with open("./model/saved_model.pb", 'rb') as sm:
        saved_model_data = sm.read()
        saved_model_encoded = base64.b64encode(saved_model_data).decode('ascii')
        arr.append("saved_model_pb")
        encoded_dict["saved_model_pb"] = saved_model_encoded

    with open("./model/assets/saved_model.json", 'rb') as sj:
        saved_model_arch = sj.read()
        saved_model_arch_encoded = base64.b64encode(saved_model_arch).decode('ascii')
        arr.append("assets_saved_model_json")
        encoded_dict["assets_saved_model_json"] = saved_model_arch_encoded
        
    with open("./model/variables/checkpoint", 'rb') as ck:
        chkpt = ck.read()
        chkpt_encoded = base64.b64encode(chkpt).decode('ascii')
        arr.append("variables_checkpoint")
        encoded_dict["variables_checkpoint"] = chkpt_encoded

    with open("./model/variables/variables.index", 'rb') as vi:
        var_i = vi.read()
        var_i_encoded = base64.b64encode(var_i).decode('ascii')
        arr.append("variables_variables_index")
        encoded_dict["variables_variables_index"] = var_i_encoded

    with open("variables.txt",'r') as vp:
        data = vp.readlines()
        i = 0
        for file in data:
            file = file.split('\n')[0].split('/variables')[2]
            with open("./model/variables/variables" + file, 'rb') as vd:
                name = 'vd' + str(i) + "_data"  
                encoded_name = name + '_encoded'
                name = vd.read()
                encoded_name = base64.b64encode(name).decode('ascii')
                to_append = file.split('.')[1].split('-')
                col_name = "variables_variables_"+to_append[0]+'_'+to_append[1]+'_'+to_append[2]+'_'+to_append[3]
                arr.append(col_name)
                encoded_dict[col_name] = encoded_name
                i+=1

    create_collection_columns(arr)
    add_data(arr, encoded_dict)
    # with open("./model/variables/variables.data-00000-of-00002", 'rb') as vd0:
    #     vd0_data = vd0.read()

    # with open("./model/variables/variables.data-00001-of-00002", 'rb') as vd1:
    #     vd1_data = vd1.read()

    # saved_model_encoded = base64.b64encode(saved_model_data).decode('ascii')

    # saved_model_arch_encoded = base64.b64encode(saved_model_arch).decode('ascii')
    
    # chkpt_encoded = base64.b64encode(chkpt).decode('ascii')

    # var_i_encoded = base64.b64encode(var_i).decode('ascii')

    # vd0_data_encoded = base64.b64encode(vd0_data).decode('ascii')

    # vd1_data_encoded = base64.b64encode(vd1_data).decode('ascii')   

    # model_data = {

    #     "items" : [ 
    #         {
    #             "saved_model_pb" : saved_model_encoded,
    #             "assets_saved_model_json" : saved_model_arch_encoded,
    #             "variables_checkpoint" : chkpt_encoded,
    #             "variables_variables_index" : var_i_encoded,
    #             "variables_variables_data_00000_of_00002" : vd0_data_encoded,
    #             "variables_variables_data_00001_of_00002" : vd1_data_encoded
    #         }
    #     ],

    #     "name" : "ModelArchitecture",

    #     "schema" : [
    #         {
    #             "ColumnName": "item_id",
    #             "ColumnType": "uuid",
    #             "PK": True
    #         },
    #         {
    #             "ColumnName" : "saved_model_pb",
    #             "ColumnType" : "string",
    #             "PK": False
    #         },
    #         {
    #             "ColumnName" : "assets_saved_model_json",
    #             "ColumnType" : "string",
    #             "PK": False
    #         },
    #         {
    #             "ColumnName" : "variables_checkpoint",
    #             "ColumnType" : "string",
    #             "PK": False
    #         },
    #         {
    #             "ColumnName" : "variables_variables_index",
    #             "ColumnType" : "string",
    #             "PK": False
    #         },
    #         {
    #             "ColumnName" : "variables_variables_data_00000_of_00002",
    #             "ColumnType" : "string",
    #             "PK": False
    #         },
    #         {
    #             "ColumnName" : "variables_variables_data_00001_of_00002",
    #             "ColumnType" : "string",
    #             "PK": False
    #         },
    #     ]
    # }

    # with open("yourmodel.json", 'w') as fp:
    #     json.dump(model_data, fp)

if __name__ == '__main__':
    gm.get_model_from_gcloud()
    generateSchema()