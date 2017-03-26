# InventionUniverse2016
## Download
Clone this repo or download the zip file to your local machine or a web server.

##Requirements
1. HTTP Server. For example: Apache. mod_rewrite is preferred, but by no means required.<br />
2. PHP 7.0 <br />
3. MySQL (4 or greater) <br />

## Folder Structure
    .
    ├── ...
    ├── cake                        # All backend code here (using cakePHP MVC framework)
    │   ├── app                     # Where we write the project backend functions
    │       ├── ... 
    │       ├── Config              # Find all cakephp app config files here  
    │           ├── ...             
    │           ├── database.php    # Set up the database connection here
    │       ├── Controller          # Edit and create controller class (restAPI) in this folder
    │       ├── Model               # Edit and create model class in this folder
    │       ├── Plugin 
    │           ├── Upload          # File upload plugin for cakePHP, a third party lib, no need to edit.
    │       ├── webroot
    │           ├── ...         
    │           ├── files           # Where we put all the users' uploaded files
    │   ├── ...          
    │   └── .htaccess               # URL rewrite file for linux
    │   └── Web.config              # URL rewrite file for winodws server
    |
    ├── iu2016                      # All frontend code here (no frontend framework now)
    │   ├── css                     # Style sheets folder
    │   ├── img                     # Default graphics folder
    │   └── js                      # JS file folder
    │       └── app.js              # Main javascript file of the application
    │       └── libs                # Third Party libraraies
    │   └── test                    # RestAPI testing 
    │   └── index.html              # index html of the application
    ├── info.php                    # show PHP's configuration
    ├── READMD.md                   

## Building a Local Dev Environment
## Windows IIS
### Install IIS manager
step by step tutorial: https://msdn.microsoft.com/en-us/library/ms181052(v=vs.80).aspx

### Install PHP
I took the lazy way out. I used the Web Platform Installer to make things easier: <br/>

  1. Download Web Platform Installer: https://www.microsoft.com/web/downloads/platform.aspx <br/>
  2. Open Web Platform Installer. <br/>
  3. Search for PHP. <br/>
  4. Click Add for "PHP7.0.15(x86)", "Windwos Cache Extension 2.0(x86) for PHP 7.0" and "PHP Manager for IIS". <br/>
  5. Click Install.<br/>

>This will download a stable version of PHP 7.0 and configure IIS to be able to handle PHP files. <br/>

### Install MySQL
  1. Downlaod MySQL Installer for Windows: https://dev.mysql.com/downloads/installer/ <br/>
  2. Open MySQL Installer. <br/>
  3. Click Add for "MySQL Server", "MySQL Workbench" and "Connector/NET". <br/>
  4. Step by step installation info: https://dev.mysql.com/doc/refman/5.7/en/mysql-installer-gui.html <br/>

### Import project Data to local database
I used MySQL Workbench to make things easier: <br/>

  1. Open MySQL Workbench. <br/>
  2. Create a new MySQL Connection to the local database: https://dev.mysql.com/doc/workbench/en/wb-mysql-connections-new.html. <br/>
  3. Import IU Data to local database: <br/>
    - Under Server Administration on the Home window select the server instance you want to restore database to (Create New Server Instance if doing it first time).<br/>
    
    - Click on Manage Import/Export. <br/>
    
    - Click on Data Import/Restore on the left side of the screen. <br/>
    
    - Select Import from Self-Contained File radio button (right side of screen). <br/>
    
    - Select the path of .sql file (** /cake/app/webroot/biy20170225.sql**) <br/>
    
    - Click Start Import button at the right bottom corner of window. <br/>
    
### Create IIS Website
Open the Internet Information Services (IIS) Manager: <br/>

  1. Expand the folder with the name of the computer. <br/>

  2. Click on Sites. <br/>

  3. On the right select Add Web Site…  <br/>

  4. Select a name and a hostname (perhaps just localhost).  Click the … beside physical path and select the root of your IU project folder (where you unzip the downloaded zip file or clone this repo). <br/>

  5. Enable URL Rewirtes(aka pretty urls): open the Web Platform Installer again, search Rewirte, click Add for URL Rewirte 2.0, click Install. <br/>
   
  6. Create Web.config file (No need to create new, we have it in the /cake folder). <br/> 
   
### Configure CakePHP and app.js:
1. Set up database connection: open dtatabase.php file in the folder "/cake/app/Config", find class DATABASE_CONFIG, edit 'host' and 'password' to match your local database address and password. <br/>

2. Change appConfig in app.js: open app.js file in the folder "/iu2016/js/", at line 5, change 'apiUrl' value to your server address which you have set in the IIS manager. <br/>

### Up and Running
At this point you could open your local server address in a browser to test the project. (example: localhost:8080/iu2016 )


## Ubuntu LAMP Stack
### Install Apache, MySQL, PHP on Ubuntu 14.04
Step by step tutorial: https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-14-04

### Set Up mod_rewrite for Apache 
Step by step tutorial: https://www.digitalocean.com/community/tutorials/how-to-set-up-mod_rewrite-for-apache-on-ubuntu-14-04 <br/>
Also please read: https://book.cakephp.org/2.0/en/installation/url-rewriting.html

### Import project Data to local database
Same step as above in **Windows IIS** part.

### Add Sites to Ubuntu Server
More info please read: http://tuxtweaks.com/2009/07/how-to-configure-apache-linux/comment-page-1/ <br/>
Open your server only locally,To do that edit the file /etc/hosts and add at the end of the file
```
127.0.0.1  mysite
```
Replace "mysite" for the name of your site and reload apache
```
sudo /etc/init.d/apache2 reload
```
You can access to http://mysite from any computer in your home network

### Configure CakePHP and app.js:
1. Set up database connection: open dtatabase.php file in the folder "/cake/app/Config", find class DATABASE_CONFIG, edit 'host' and 'password' to match your local database address and password. <br/>

2. Change appConfig in app.js: open app.js file in the folder "/iu2016/js/", at line 5, change 'apiUrl' value to your server address which you have added for your ubuntu server. <br/>

### Up and Running
At this point you could open your local server address in a browser to test the project. (example: mysite/iu2016 )


## Mac OS 
No test here, to be continued...

## Wiki Pages
To understand the codes, please read wiki pages as below:
https://github.com/stevesuyao/InventionUniverse2016/wiki/Backend-Wiki
https://github.com/stevesuyao/InventionUniverse2016/wiki/Frontend-Wiki

(There will be more references on the wiki pages in the future.)

## Team Members

## Team Workflow

##I want to work on this branch - Brent S
