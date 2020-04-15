import os
import json


def connect_to_gcloud():
    with open("train_params.json", 'r') as fp:
        train_params = json.load(fp)

    bucket = train_params["bucket"]
    collection = train_params["featureCol"] + '.json'
    jobName = train_params["jobName"]
    trainingFolder = "myCode"

    trainingCode = train_params["taskFile"]
    trainingCode = trainingCode.split('.')[0]

    initialize = 'gsutil mb -l us-east1 gs://' + bucket + '/'
    create = 'gsutil mb -l us-east1 gs://trainparameters/'
    copy = 'gsutil cp train_params.json gs://trainparameters/train_params.json'
    copy_2 = 'gsutil cp ' + collection + ' gs://' + bucket + '/' + collection
    train = 'gcloud ai-platform jobs submit training ' + jobName + ' --package-path ' + trainingFolder + \
            '/' + ' --module-name ' + trainingFolder + '.' + trainingCode + ' --region us-east1 \
    --python-version 3.5 --runtime-version 1.13 --job-dir gs://' + bucket + '/keras-job-dir \
    --stream-logs'

    os.system("touch __init__.py")
    os.system(initialize)
    os.system(create)
    os.system(copy)
    os.system(copy_2)
    os.system(train)
