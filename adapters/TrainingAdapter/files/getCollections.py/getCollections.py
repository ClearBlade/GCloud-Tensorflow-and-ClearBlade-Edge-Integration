from clearblade.ClearBladeCore import System
import json
import os
import base64

with open("train_params.json",'r') as fp:
    train_params = json.load(fp)

key = train_params["systemKey"]
secret = train_params["systemSecret"]
url = train_params["url"]
collection = train_params["featureCol"]
user = train_params["email"]
pswd = train_params["password"]


SystemKey = key
SystemSecret = secret

mySystem = System(SystemKey, SystemSecret, url=url)
user = mySystem.User(user, pswd)

myCol = mySystem.Collection(user, collectionName=collection)
rows = myCol.getItems()

featureDataset = collection + ".json"

with open(featureDataset, 'w') as fp:
    json.dump(rows, fp, indent=2)

myCol1 = mySystem.Collection(user, collectionName="TrainingFiles")
rows = myCol1.getItems()

os.system("mkdir myCode")

files = rows[-1]

archfile = train_params["archFile"]
datafile = train_params["dataFile"]
trainfile = train_params["taskFile"]

with open("__init__.py",'w') as init:
    init.close()

with open(archfile, 'w') as af:
    decoded = base64.b64decode(files["archfile"])
    af.write(decoded.decode('ascii'))

with open(datafile, 'w') as df:
    decoded = base64.b64decode(files["datafile"])
    df.write(decoded.decode('ascii'))

with open(trainfile, 'w') as tf:
    decoded = base64.b64decode(files["trainfile"])
    tf.write(decoded.decode('ascii'))

os.system("mv __init__.py myCode/")
os.system("mv " + archfile + " myCode/")
os.system("mv " + datafile + " myCode/")
os.system("mv " + trainfile + " myCode/")


# for row in rows:
#     print(row)