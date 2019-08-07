from clearblade.ClearBladeCore import System, Query, Developer, Users
import time
import json
import ast
import sys

published = 0
rc = 1

print(sys.argv)
url = "https://staging.clearblade.com"

SystemKey = "a6c2e6d10bc2f183fca3c7d3d0fe01"
SystemSecret = "A6C2E6D10BCADB819FABF8FCD94E"

mySystem = System(SystemKey, SystemSecret, url, safe=False, sslVerify=True)

user = mySystem.User("test@email.com", "password")
print("Welcome User!")

mqtt = mySystem.Messaging(user)

def on_connect(client, userdata, flags, rc):
    client.subscribe("config")
    client.subscribe("send")
    client.subscribe("send/results")

def on_message(client, userdata, message):
    if (message.topic == "config"):
        print("Config Message Received!")

    if (message.topic == "send"):
        train_parameters = message.payload
        print(train_parameters)
        if(train_parameters != ""):
            if(train_parameters != ""):
                train_parameters = train_parameters.decode('ascii')
                train_parameters = ast.literal_eval(train_parameters)
                with open("train_params.json",'w') as fp:
                    json.dump(train_parameters, fp, indent=2)
                
                mqtt.publish("send/results", "Data Received for Training",0)
                global published
                published = 1
                #mqtt.disconnect()

def on_disconnect(client, userdata, rc):
    sys.exit()

mqtt.on_connect = on_connect
mqtt.on_message = on_message
mqtt.on_disconnect = on_disconnect

mqtt.connect()
while True:
    time.sleep(1)
    if(published == 1):
        break
