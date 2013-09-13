<!DOCTYPE html PUBLIC 
	"-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<style type="text/css" title="currentStyle" media="screen">
	 @import "project.css";
	</style>
	<title>SPECTROSCOPY</title>
</head>
 <body id='projectpage' bgcolor="fdfdfd">
  <div id="header">
   <h2>SPECTROSCOPY</h2>
   </div>
   <nav>
    <ul class="topnav">
        <div id="centre_nav" class="container">
            <li><a href="/">Home</a></li>
            <li><a href="project.php">Project Details</a></li>
            <li><a href="readings.php">Readings</a></li>
            <li><a href="aboutus.php">About Us</a></li>  
        </div>
    </ul>
   </nav>
  </div>
  <p class="p1"><div id="Intro"><span>
 The project is a BITS-EWB based student intiative for active, real-time monitoring of energy consumption patterns of the students residing in the 14 Hostels of BITS Pilani, Goa Campus.
<br /><br />
 It includes setting up of a sensor network besides the electric utility metering panels in the 14 hostels for real-time load sensing. This data is then relayed to a central server.
This server collates the data from the different sites into a single database and hosts a local portal which helps in providing intutive data visualisation of the energy consumption patterns of the residents.
<br /><br />
 The analysis of the energy consumption patterns obtained by the project will over time help in better understanding and tackling energy, efficiently.
  </span></div></p>

<div id="structure">
<?php
for($i=0;$i<10;$i++)
 print("&nbsp;");
?>
<img src="images/structure.png" alt="EWB" height="285" width="1278" />
</div>
 </body>
</html>
