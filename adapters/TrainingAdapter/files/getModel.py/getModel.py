import os 
import json

def get_model_from_gcloud():
    with open("train_params.json",'r') as fp:
        train_params = json.load(fp)

    bucket_name = train_params["bucket"]

    file_name = "modelPath.txt"
    create_path_file = "touch " + file_name
    get_model = "gsutil ls -d gs://" + bucket_name + "/keras-job-dir/keras_export/[0-9]* > " + file_name
    create_model_dir = "mkdir model"

    os.system(create_path_file)
    os.system(get_model)
    os.system(create_model_dir)

    with open(file_name, 'r') as fp:
        data = fp.readlines()

    model_path = data[-1].split('\n')[0] 
    # print(model_path)

    create_variables = "gsutil ls " + model_path + "variables/variables.data* > variables.txt"
    get_model = "gsutil cp -r " + model_path + "saved_model.pb ./model/saved_model.pb" 
    get_assets = "gsutil cp -r " + model_path + "assets ./model/"
    get_variables = "gsutil cp -r " + model_path + "variables ./model/"

    # print(create_variables)
    # print(get_model)
    # print(get_assets)
    # print(get_variables)

    os.system(create_variables)
    os.system(get_model)
    os.system(get_assets)
    os.system(get_variables)