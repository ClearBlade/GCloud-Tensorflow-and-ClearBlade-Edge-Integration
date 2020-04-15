import tensorflow as tf
import numpy as np
from clearblade.ClearBladeCore import System, Query, Developer, Users
import time
import pandas as pd
import json
import ast
import base64
import os
import sys

#with open("test_params.json",'r') as fp:
#    test_params = json.load(fp)

#SystemKey = test_params["systemKey"]
#SystemSecret = test_params["systemSecret"]
#collection = test_params["model"]
#user = test_params["email"]
#pswd = test_params["password"]
#url = test_params["url"]

# SystemKey = "dacea5d20ba89d95a8a49fc0a89601"
# SystemSecret = "DACEA5D20BB6A093F38AF1ACD08701"
#url = "https://staging.clearblade.com"

#SystemKey = "a6c2e6d10bc2f183fca3c7d3d0fe01"
#SystemSecret = "A6C2E6D10BCADB819FABF8FCD94E"
#url = "https://" + sys.argv[3]


SystemKey = sys.argv[1]
SystemSecret = sys.argv[2]
url = "http://localhost:9000"

collection = "ModelArchitecture"
email = sys.argv[4]
token = sys.argv[5]

print("System Key: ", SystemKey)
print("System Secret: ", SystemSecret)
print("URL: ", url)
print("email: ", email)
print("token: ", token)

#user = "test@email.com"
#pswd = "password"

mySystem = System(SystemKey, SystemSecret, url, safe=False)

user = mySystem.ServiceUser(email, token)
print("Hello User")

mqtt = mySystem.Messaging(user)

def decode_and_save():
    myCol = mySystem.Collection(user, collectionName=collection)
    rows = myCol.getItems()
    model = rows[-1]

    df = pd.DataFrame(data=model, index=[0])
    df = df.drop(['item_id'], axis=1)

    saved_model_pb = df['saved_model_pb'][0]
    saved_model_pb = saved_model_pb.encode('ascii')
    saved_model_pb_decode = base64.b64decode(saved_model_pb)
    # print(type(saved_model_pb_decode))

    assets_saved_model_json = df['assets_saved_model_json'][0]
    assets_saved_model_json = assets_saved_model_json.encode('ascii')
    assets_saved_model_json_decode = base64.b64decode(assets_saved_model_json)
    # print(assets_saved_model_json_decode)

    variables_checkpoint = df['variables_checkpoint'][0]
    variables_checkpoint = variables_checkpoint.encode('ascii')
    # print(len(variables_checkpoint))
    variables_checkpoint_decode = base64.b64decode(variables_checkpoint)

    variables_variables_index = df['variables_variables_index'][0]
    variables_variables_index = variables_variables_index.encode('ascii')
    variables_variables_index_decode = base64.b64decode(variables_variables_index)

    variables_variables_data_00000_of_00001 = df['variables_variables_data_00000_of_00001'][0]
    variables_variables_data_00000_of_00001 = variables_variables_data_00000_of_00001.encode('ascii')
    variables_variables_data_00000_of_00001_decode = base64.b64decode(variables_variables_data_00000_of_00001)

    model_folder = "mytrainedmodel"
    os.system("mkdir " + model_folder)
    os.system("mkdir " + model_folder + "/assets")
    os.system("mkdir " + model_folder + "/variables")

    with open("mytrainedmodel/save_model.pb",'wb') as fp1:
        fp1.write(saved_model_pb_decode)

    with open("mytrainedmodel/assets/saved_model.json",'wb') as fp2:
        fp2.write(assets_saved_model_json_decode)

    with open("mytrainedmodel/variables/checkpoint",'wb') as fp3:
        fp3.write(variables_checkpoint_decode)

    with open("mytrainedmodel/variables/variables.index",'wb') as fp4:
        fp4.write(variables_variables_index_decode)

    with open("mytrainedmodel/variables/variables.data-00000-of-00001",'wb') as fp5:
        fp5.write(variables_variables_data_00000_of_00001_decode)

    return model_folder

def on_connect(client, userdata, flags, rc):
    client.subscribe("config/_broadcast")
    client.subscribe("predict/_broadcast")
    client.subscribe("predict/results/_broadcast")

def getCategories():
    myCol = mySystem.Collection(user, collectionName="CategoricalData")
    rows = myCol.getItems()

    row = rows[-1]
    df = pd.DataFrame(data=row, index=[0])
    df = df.drop(['item_id'], axis=1)

    encoded_cat = df['categorization'][0]
    decoded_cat = base64.b64decode(encoded_cat)
    decoded_cat = decoded_cat.decode('ascii')
    decoded_cat = ast.literal_eval(decoded_cat)
    
    with open("categorical_data.json", 'w') as cd:
        json.dump(decoded_cat, cd)

    encoded_meanstd = df['normalization'][0]
    decoded_meanstd = base64.b64decode(encoded_meanstd)
    decoded_meanstd = decoded_meanstd.decode('ascii')
    decoded_meanstd = ast.literal_eval(decoded_meanstd)

    with open("meanstd_data.json", 'w') as ms:
        json.dump(decoded_meanstd, ms)

    encoded_to_clean = df['to_clean_data'][0]
    decoded_to_clean = base64.b64decode(encoded_to_clean)
    decoded_to_clean = decoded_to_clean.decode('ascii')
    decoded_to_clean = ast.literal_eval(decoded_to_clean)

    label = df['prediction_label'][0]

    return decoded_to_clean, label

def normalize(string):

    to_clean, label = getCategories()

    string = string.decode('ascii')
    test_string = ast.literal_eval(string)

    df = pd.DataFrame(test_string, index=[0])
    df = df.replace('',0.0)

    if (len(to_clean) != 0):
        for i in to_clean:
            df[i] = df[i].astype('float32')

    _LABEL_COL = df.pop(label)

    numeric_columns = df.select_dtypes(['int64','float64']).columns
    df[numeric_columns] = df[numeric_columns].astype('float32')

    with open("meanstd_data.json",'r') as fp1:
        data1 = fp1.read()
        msobj = json.loads(data1)

    num_cols = df.select_dtypes(['float32','float64']).columns
    num_cols = list(num_cols)
    for column in num_cols:
        df[column] -= msobj[column]['mean']
        df[column] /= msobj[column]['std']

    df.replace(np.inf, 0, inplace=True)
    df.fillna(0, inplace=True)

    cat_columns = df.select_dtypes(['object']).columns
    cat_columns = list(cat_columns)

    testData = df.to_dict('records')
    testData = testData[0]

    if(len(cat_columns) != 0):
        with open("categorical_data.json",'r') as fp:
            data = fp.read()
            catobj = json.loads(data)

        for i in list(cat_columns):
            inputVal = test_string[i]
            toCheck = catobj[i]
            toChange = toCheck[inputVal]
            testData[i] = toChange

    filtered_test_data = list(testData.values())

    return filtered_test_data


def on_message(client, userdata, message):
    if (message.topic == "config/_broadcast"):
        print("Config Message Received!")
        #params = message.payload
        #params = params.decode('ascii')
        #params = ast.literal_eval(params)

        #with open("test_params.json",'w') as fp:
        #    json.dump(params, fp)

    if (message.topic == "predict/_broadcast"):
        print("Predict message Received")
        model_folder = decode_and_save()
        mymodel = tf.contrib.saved_model.load_keras_model("./" + model_folder)
        print(mymodel.summary())

        # arr1 = arr.decode("utf-8")
        # print(int(arr1))
        string = message.payload
        
        test_data = normalize(string)

        np_arr = np.array([test_data])

        test_predictions = mymodel.predict(np_arr)
        test_predictions = str(test_predictions)
        test_predictions = test_predictions.replace('[','')
        test_predictions = test_predictions.replace(']','')
        
        arr = test_predictions.split(' ')
        result = []

        if len(arr) > 1:
            for i in arr:
                result.append(float(i))

            if round(float(arr[0]),4) > round(float(arr[1]),4):
                sendResult = "Maintenance Not Required"
            else:
                sendResult = "Maintenance required"
        else:
            if round(float(arr[0]),4) < 0.5:
                sendResult = "Maintenance not required"
            else:
                sendResult = "Maintenance required"

        mqtt.publish("predict/results/_broadcast", sendResult,0)

mqtt.on_connect = on_connect
mqtt.on_message = on_message

mqtt.connect()
while(True):
    time.sleep(5)
    print("Waiting..")
