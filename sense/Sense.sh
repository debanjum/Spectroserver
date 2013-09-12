#!/bin/bash
#
#Extracting Data from Meter Reading Sensors in all Hostels
#Storing in required CSV format in Web Folder for Dygraph's Retrieval
#
c=1
while [ $c -ge 1 ]
do
#Extract Data from Sensor
wget -q -i IP
if [ $? -ne 0 ]
then
echo "Sensor Disconnected"
wget -a logfile 172.16.5.59
else
echo "Reading Sensor"
#Add Date/Time of Data Extraction to Database
sudo date +"%Y/%m/%d %H:%M:%S" >> bmr1.txt
#Echo Sensor Reading and Add to Database
sed -n -e "s/.*\([0-9][0-9][0-9]\).*/\1/p" index.html | tee -a bmr1.txt
#Post Processing Data
#Replace end line with ','
sudo cat bmr1.txt | tr '\n' ',' > temp.txt
sudo mv temp.txt bmr1.txt
#Standardise to CSV Format(1.Remove ',' + 2.Add ',' after data)
sudo sed -ie 's/,$//' bmr1.txt
sudo sed -ie '$G' bmr1.txt
#Clean Up
sudo rm index.html
sudo cp bmr1.txt bmp1.txt
#Replace ',,' with '\n' in database
sudo sed -ie 's/,,/\n/g' bmp1.txt
#Delete eof '\n'
sed -ie '/\n$/ d' bmp1.txt
sudo mv bmp1.txt ../bmp1.csv
sudo rm bmp1.txte
sudo rm bmr1.txte
sleep 1
	(( c++ ))
fi
done
