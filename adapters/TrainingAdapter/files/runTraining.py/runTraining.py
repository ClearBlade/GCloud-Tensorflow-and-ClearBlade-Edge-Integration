from clearblade.ClearBladeCore import System, Query, Developer, Users
import time
import json
import ast
import sys
import logging
import os
import getCollections
import generate_categories as gc
import execute
import convertAndStore as cs


LOG_FILENAME = 'logs/runTraining.log'
logging.basicConfig(filename=LOG_FILENAME, level=logging.DEBUG)

published = 0
rc = 1

# url = "https://staging.clearblade.com"

# SystemKey = "a6c2e6d10bc2f183fca3c7d3d0fe01"
# SystemSecret = "A6C2E6D10BCADB819FABF8FCD94E"

print(sys.argv)

SystemKey = sys.argv[1]
SystemSecret = sys.argv[2]
# url = "https://" + sys.argv[3]
url = "http://localhost:9000"
email = sys.argv[4]
token = sys.argv[5]

logging.debug("System Key: %s", SystemKey)
logging.debug("System Secret: %s", SystemSecret)
logging.debug("URL: %s", url)
logging.debug("email: %s", email)
logging.debug("token: %s", token)


try:
    mySystem = System(SystemKey, SystemSecret, url, safe=False, sslVerify=True)

    # user = mySystem.User("test@email.com", "password")
    user = mySystem.ServiceUser(email, token)
    print("User Authenticated. Welcome User!")
    logging.debug("User Authenticated. Welcome User!")

    mqtt = mySystem.Messaging(user)

    def on_connect(client, userdata, flags, rc):
        client.subscribe("config/_broadcast")
        client.subscribe("send/_broadcast")
        client.subscribe("send/results/_broadcast")

    def on_message(client, userdata, message):
        if (message.topic == "config/_broadcast"):
            print("Config Message Received!")

        if (message.topic == "send/_broadcast"):
            train_parameters = message.payload
            print(train_parameters)
            if(train_parameters != ""):
                logging.debug(train_parameters)
                train_parameters = train_parameters.decode('ascii')
                train_parameters = ast.literal_eval(train_parameters)
                logging.debug("Train Parameters received")
                with open("train_params.json", 'w') as fp:
                    json.dump(train_parameters, fp, indent=2)

                mqtt.publish("send/results/_broadcast",
                             "Data Received for Training", 0)
                global published
                published = 1
                # mqtt.disconnect()

    def on_disconnect(client, userdata, rc):
        sys.exit()

    mqtt.on_connect = on_connect
    mqtt.on_message = on_message
    mqtt.on_disconnect = on_disconnect

    mqtt.connect()
    while True:
        time.sleep(1)
        print("Waiting..")
        if(published == 1):
            getCollections.get_data()

            df, label, to_clean, token, cat_id = gc.fetch()
            df = gc.convert_to_float(df, to_clean)
            df, cat_data = gc.create_categorical_mapping(df)
            meanstd = gc.create_mean_std_mapping(df, label)
            status_code = gc.send_data_to_collections(
                cat_data, meanstd, to_clean, label, token, cat_id)
            print(status_code)

            execute.connect_to_gcloud()

            cs.gcloud_to_cb()
            print("Training Process Done!")
            break

except Exception as e:
    logging.error(e)
