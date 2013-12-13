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
 The project is an initiative by CEERI for active, real-time remote monitoring of spectral plots of sample specimens being examined at CEERI, Chennai
<br /><br />
 It includes setting up of a sensor network besides the spectrometers at CEERI for real-time data extraction. This data is then relayed to a central server.
This server collates the data from the different sites into a single databas, hosts a local portal for providing a interface for visulatisation of the data and provides tools for extraction and analysis of the spectral data being obtained for the samples being evaluated.
<br /><br />
 Giving the ability to extract, visualise and play with the spectral data of samples being obtained by the various projects at CEERI will help the general public become more engaged and aware of the impact of spectroscopy, adulteration, food testing and also help the scientific and research community to gain valuable feedback from the public.
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
