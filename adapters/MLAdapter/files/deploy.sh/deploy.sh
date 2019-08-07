Red='\033[0;31m'
Green='\033[0;32m'
NC='\033[0m'
Yellow='\033[0;33m'

echo -e "\n\n---> ${Red}Installing Dependencies${NC}"

echo -e "\n ---> ${Green}Installing Tensorflow${NC}\n\n"
sudo pip install tensorflow

echo -e "\n ---> ${Green}Installing Numpy${NC}\n\n"
sudo pip install numpy

echo -e "\n ---> ${Green}Installing ClearBlade Python SDK${NC}\n\n"
sudo pip install clearblade

echo -e "\n ---> ${Green}Installing Pandas${NC}\n\n"
sudo pip install pandas

echo -e "\n ---> ${Yellow}Running Python Script${NC}\n\n"
