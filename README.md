
# GCloud-Tensorflow-and-ClearBlade-Edge-Integration

## Contents

### [Overview](#overview-1)
### [System Installation](#system-installation-1)
### [Setup](#setup-1)
- #### [Setup on Google Cloud Platform](#setup-on-google-cloud-platform-1)
- #### [Setup on ClearBlade](#setup-on-clearblade-1)
### [Adapter Details](#adapter-details-1)
### [Usage](#usage-1)
- #### [Training Process](#training-process-1)
- #### [Testing Process](#testing-process-1)
### [System Overview Diagram](#System-Overview-Diagram-1)
### [Assets](#assets-1)


## Overview

Google's Tensorflow Library has been widely used for designing different machine learning algorithms and solving classification and regression problems. Training of the machine learning model requires a great deal of computational power and hence integration of machine learning with IoT is a challenging task. 

This package provides an overview of how Machine Learning can be integrated with ClearBlade Platform to make useful decisions and analysis on the edges. Users can provide a training dataset from the ClearBlade Collections, perform some preprocessing techniques on the data, extract meaningful features and then train the model on Google AI Platform with the help of Portals. The trained model is stored in the collection and can be accessed by any edge to make predictions.  

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## System Installation

1. Open the [ClearBlade Platform](https://platform.clearblade.com/) and enter your login credentials

2. Click on **Add System** -> **Advanced** and copy the link of this repository in the box.
```
https://github.com/ClearBlade/GCloud-Tensorflow-and-ClearBlade-Edge-Integration
```
3. Click **Create** and you can now access this system in the platform.

## Setup

### Setup on Google Cloud Platform
- Download and Install Google SDK : 
  ```
  curl https://sdk.cloud.google.com | bash
  ```
- Initialize the SDK : 
  ```
  gcloud init
  ```
- Initializing the SDK will prompt you to authorize your account and to select a project or create a new project. (Creation of project can be through [Google Console]( https://console.cloud.google.com/projectselector2/home/dashboard?_ga=2.18563004.-485953982.1561568575) as well. However you have to execute ```gcloud init``` to select the working project.)

- If you have created a project, ensure that billing is enabled for your project. More information on:
  ```
  https://cloud.google.com/billing/docs/how-to/modify-project
  ```
- Enable the AI Platform ("Cloud Machine Learning Engine") and Compute Engine APIs:
  ```
  https://console.cloud.google.com/flows/enableapi?apiid=ml.googleapis.com,compute_component&_ga=2.15003827.-485953982.1561568575
  ```
- Create a New Service : 
  ```
  gcloud beta iam service-accounts create <SERVICE_NAME>
  ```
- Grant permissions to the service to create and manage buckets on the GCloud: 
  ```
  gcloud projects add-iam-policy-binding <PROJECT_NAME> --member serviceAccount:<SERVICE_NAME>@<PROJECT_NAME>.iam.gserviceaccount.com --role roles/cloudbuild.builds.builder
  ```
- In some cases, this command fails to execute if the user doesn't have permissions to provide access rights to the project. In this case, once a service account is created, go to https://console.cloud.google.com/storage/browser and manually create a new bucket.

- Once this bucket is created, execute the following command: 
  ```
  gsutil iam ch serviceAccount:<SERVICE_NAME>@<PROJECT_NAME>.iam.gserviceaccount.com:roles/storage.admin gs://<BUCKET_NAME>
  ```
  This will grant storage admin permissions to the service.
- Once all the steps are done, follow the Setup Steps for starting ClearBlade adapter services.


### Setup on ClearBlade
- Before setting up the ClearBlade service, please ensure that you have successfully completed the Google Cloud Platform setup.
- Open a Terminal on your Machine.
- Create a new Directory and navigate to that Directory.
- Go to the Platform and [Open this System](#system-installation-1). 
- Create a new user with **username=*test@email.com*** and **password=*password*** (A user with same credentials might already be present in the system.)
- Use these credentials to open the portals.
- Navigate to Edges on the ClearBlade Platform and [Install](https://docs.clearblade.com/v/4/edge/tutorial/#install-and-start) the *TrainingEdge*. An Adapter is running on this edge which installs all the dependencies required for training the model.
- To check whether the adapter has been deployed successfully, open an another terminal session and execute the following command:
```
ps aux | grep runTraining.py
```
- If you see a running process, then the adapter has been deployed. If you dont see a running process, follow [these](https://docs.clearblade.com/v/4/deployment/tutorial/) steps to deploy the adapter.
- Go to the portals and click on *TrainingPortal* and follow the steps mentioned in the [**Usage**](#usage-1) to train the model.
- Once, the model is trained it is ready to be tested. 

## Adapter Details
  
## Usage

Machine Learning models essentially work in two phases - ```Training Phase and Testing Phase```. The model needs to be Trained before it can be tested.

(Open the ModelArchitecture Collection to check whether it is empty or not. If the collection is not empty, then a model has already been trained and stored in the collection. You can directly skip to the testing phase to test the model. Otherwise, follow the training steps.)

### Training Process
- Open the TrainingPortal from the Portals 
- Click on **View Training Dataset** Tab on the main window to select the collection for training the model and then click **NEXT**.
- The next tab is the **Feature Selection** Tab which helps you to select the meaningful features that you want for training the model. 
- Select the features, provide a unique *Feature Name* and click on **Create Feature Collection** to create a new collection with only those features which you have selected. 
- Go to the collections on the platform and give the newly generated collection permissions. Go back to the portal and click on **Copy Feature Data** to copy the data and then click **NEXT** to continue.
- The next tab is the **Clean Data** Tab which helps you to remove any empty rows from the data by clicking on **Delete Empty Rows** and handle categorical Data by clicking on **View Categorical Data**. Once cleaning of data is done, click **NEXT** to proceed.
- This tab is the **Train Model** which will essentially initiate the training process. Here, you need to enter all the parameters required for initiating the training process. You can also tune the hyperparameters of the model as per your needs. Once, all the information is entered, click on **Train Model** to train the model. 
(A Neural Network Model has already been designed and stored in the **TrainingFiles** Collection, so you dont need to upload any files. However, you can design your own model and upload your algorithm files through the portals.)
- Your model will start to train and you can monitor the logs on: https://console.cloud.google.com/mlengine/jobs?project=<*PROJECT_NAME*>
- Once, the training process is done, the model gets stored in the ModelArchitecture Collection.

### Testing Process
- Testing on the same machine:
  - Stop the Training Edge : **CTRL-C**
  - Create a new Directory and navigate to that Directory.
  - Navigate to Edges on the Platform and [Install](https://docs.clearblade.com/v/4/edge/tutorial/#install-and-start) *MLEdge* 
  An Adapter is running on this edge which installs all the dependencies required for testing the model. 
  - Go to the portals and click on *TestingPortal*.
  
- Testing on the different machine:
  - Open a Terminal on your Machine.
  - Create a new Directory and navigate to that Directory.
  - Navigate to Edges on the Platform and Install *MLEdge* : https://docs.clearblade.com/v/4/edge/tutorial/. 
   An Adapter is running on this edge which installs all the dependencies required for testing the model. 
  - Go to the portals and click on *TestingPortal*.

- To check whether the adapter has been deployed successfully, open another terminal and run:
```
ps aux | grep runpredict.py
```
- If you see a running process, then the adapter has been deployed. If you dont see a running process, follow [these](https://docs.clearblade.com/v/4/deployment/tutorial/) steps to deploy the adapter.
- Once the portal is opened, click on **Get Features for Prediction** to get all the features that were used for the training process.
- Enter all the data and press the **Predict** button to get the Predicted value.

### System Overview Diagram

![alt text](https://github.com/rajasd27/GCloud-Tensorflow-and-ClearBlade-Edge-Integration/blob/master/Architecture%20Diagram.png)

### Sequential Diagram

![alt text](https://github.com/rajasd27/GCloud-Tensorflow-and-ClearBlade-Edge-Integration/blob/master/Sequential%20Diagram.png)

## Assets

### Code Services

```clearMissingData```: A service which cleans the data by removing empty rows

```selectFeatures```: A service which creates a new collection which is essentially the dataset used for training

```fetchFeatures```: A service which creates a new collection consisting of all the features names 

```fetchTrainData```: A service which fetches the train data to be displayed on the portals

### Collections

```AllFeatures```: A Collection which consists of the selected features for training

```CategoricalData```: A Collection which consists of all the categorical data, normalization data, prediction label and a list of non categorical column data that needs to be cleaned

```ModelArchitecture```: A Collection which stores the Trained Model 

```TrainingFiles```: A Collection which stores machine learning algorithm specific files

```SensorData```: A Collection which can be used for Training the model

```Features```: A Collection which has the useful features from the SensorData (You can create your own collection with different features by using the training portal)

### Portals

```TrainingPortal```: This portal essentially allows the user to:
- Select a Training Dataset from the Collections
- Select useful Features from the Training Dataset
- Clean Data by removing empty rows
- Handle incorrect Categorical Data
- Convert Categorical Data to Numeric Data 
- Provide Training Hyperparameters 

```TestingPortal```: This portal essentially allows the user to:
- Fetch Features used for Training the Model
- Input Features to predict a particular value

