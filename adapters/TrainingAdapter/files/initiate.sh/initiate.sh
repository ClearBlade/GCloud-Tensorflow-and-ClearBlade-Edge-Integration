#!/bin/bash

NC='\033[0m'
Yellow='\033[0;33m'

curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
sudo -H pip install clearblade
sudo pip install pandas
#curl https://sdk.cloud.google.com | bash

echo -e "\n ---> ${Yellow}Running Python Script${NC}\n\n"