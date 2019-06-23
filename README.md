# XDK2MAM Dashboard

The XDK2MAM Dashboard is a visualization/storage tool for the XDK110 sensor's data and a buffer to handle short intervals data and distribute the publish to Tangle by creating bundles containing more than one dataset. Because publishing to Tangle using MAM requires Proof of Work, and this takes some seconds, it is not possible to get live data from the XDK110 and send it straight to the Tangle.

XDK2MAM Dashboard React application solves this in a simple way: it collects all the data on a local database, builds bundles and publishes datasets collections periodically to the Tangle. 

This package uses the [http-sdcard](https://github.com/xdk2mam/xdk2mam/tree/Workbench-3.6/http-sdcard) code on the XDK110 side with a minor change on the **config.cfg** file. 
You can check our [step by step videotutorial](https://www.youtube.com/watch?v=isrx7ibcRL4) to learn how to import, build and flash the C code to the XDK110 

# Instructions

## Requirements on the XDK110 side
In order to be able to run the code on this repo you will need to [download XDK Workbench](https://xdk.bosch-connectivity.com/software-downloads), have a XDK110 and install Nodejs on the computer you are going to use as listener server.
Download the C code and flash it to your XDK110 following the [http-sdcard](https://github.com/xdk2mam/xdk2mam/tree/Workbench-3.6/http-sdcard) guide. 

**Notice that the MicroSD config file has two variations: DEST_SERVER_PORT should now be set to 8081 and DEST_POST_PATH needs to point to /api/putData**

```
DEVICE_NAME=enter-your-device-id
WLAN_SSDI=enter-your-wifi-ssid
WLAN_PSK=enter-your-wifi-password
DEST_SERVER_HOST=192.168.0.4
DEST_SERVER_PORT=8081
INTER_REQUEST_INTERVAL=3000
DEST_POST_PATH=/api/putData
ENVIROMENTAL=YES
ACCELEROMETER=YES
GYROSCOPE=YES
INERTIAL=YES
LIGHT=YES
MAGNETOMETER=YES
ACOUSTIC=YES
```

Except for this two values, the rest needs your WiFi data and LAN IP as with the HTTP-SDCARD. Once you have your values set, save, extract the micro SD card and carefully insert it into the XDK SD slot (contacts up). 
Turn on your XDK110 and that's it. Now let's go to the Node part.


# Setting up the Node Dashboard
## Requirements on Node side

The XDK2MAM dashboard works on Nodejs and uses a Mysql database named **xdk2mam** with user root and no password. If you do not have Mysql installed, you can download it and install it from  [MariaDB website](https://downloads.mariadb.org). 
Now that we have met the requirements let's jump to the installation! 

## Dashboard Installation. Setting up the Mysql Database

Clone the Dashboard code.

```
git clone https://github.com/xdk2mam/xdk2mam-dashboard.git
```

You will find a **db/xdk2mam.sql** file on the downloaded package with the SQL code needed to create the Database and tables that the Dashboard will use. 
Assuming you are using Windows and the clone created a folder at C:\, You can import this SQL code by typing:

```
mysql -u root -p < C:\xdk2mam-dashboard\db\xdk2mam.sql
```

**Notice that if you don't have mysql executable set at your system path you might need to get to the folder in which mysql .exe is. If this is your case you should do:**

```
C:\Program Files\MariaDB 10.4\bin> mysql -u root -p < C:\xdk2mam-dashboard\db\xdk2mam.sql
```

### Dashboard Installation. Starting the Dashboard

Open a console and head to the **backend** folder. To install all needed moduled type:

```
npm install
```

Now head to the **frontend** folder and repeat the installation

```
npm install
```

If everything went fine, you should now be ready to start the XDK2MAM Dashboard. For this, you will need to start the backend and frontend as with any React application. 
Notice that this will require you to have two consoles (one for each instance) open. 

Head to the backend folder and to start it

```
npm start
```

Open another console, head to the frontend folder and start the application

```
npm start
```

This will open a new Browser or tab with the XDK2MAM Dashboard. 

## Creating a Dataset

The Dashboard allows you to create datasets to log XDK110 data on certain periods. Since we started the application for the first time, you will have to create a new Dataset and provide some basic information. 
Once this is done, you should be able to start watching how the sensor's data is sent on the graphics. 
Notice that you have the sensor's grouped by Weather, Enviromental and Inertial and tabs. 

![Creating you first Dataset](https://xdk2mam.io/assets/images/Dash-1.png)

## Dashboard Home overview

If your XDK110 is on and sending data, you should be able to start visualizing it on the Dashboard graphics on each tab. Notice that you can chose from diferent time intervals and also that you can enlarge the graphic. Also, you will get a **Live Data** table showing the data as it arrives and links to verify its integrity on the Tangle as it get's published.

![Creating you first Dataset](https://xdk2mam.io/assets/images/Dashboard-overview.png)

## Data verification on Tangle

XDK2MAM Dashboard aims to allow the income of the XDK110 sensor's data on short intervals and build bundles in order to publish datasets collections to the Tangle as Nodes allow. If you check the Live Data table you will see which datasets are already published on MAM transactions and which ones are waiting to be published. 

![Live Data](https://xdk2mam.io/assets/images/Dash-live.png)

If the dataset is already published you can click the link to see the MAM transaction on the Explorer. The following image shows a 10 datasets Bundle published by the Dashboard. You can verify it by yourself [following this link](https://devnet.thetangle.org/mam/RGEKDOMUWTWBDMTSRJFDCJRMSFWLMEQLJTZNNQ99YDGUNTUTVO9YMPUVNRVCRRJLWMSOONCWWF9ZPUY9L)

![Data published to the Tangle](https://xdk2mam.io/assets/images/Dash-Explorer.png)


