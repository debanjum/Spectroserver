<!DOCTYPE html PUBLIC 
	"-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<style type="text/css" title="currentStyle" media="screen">
 @import "project.css";</style>
<script type="text/javascript"  src="dygraph-combined.js"></script>
<script type="text/javascript">
 function intro()
 {
  if(document.getElementById('a1').checked) 
  {
    if(document.getElementById('mn').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
    }
    else if(document.getElementById('hr').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {rollPeriod: 6,   showRoller: true,	xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
     }
    else if(document.getElementById('dy').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {rollPeriod: 24,   showRoller: true,	xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
     }
    else if(document.getElementById('mt').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {rollPeriod: 300,   showRoller: true,	xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
     }
    else if(document.getElementById('an').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {rollPeriod: 1000,   showRoller: true,	xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
     }
    else{}
  }
  if(document.getElementById('a2').checked) 
  {
    if(document.getElementById('mn').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
    }
    else if(document.getElementById('hr').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {rollPeriod: 6,   showRoller: true,	xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
     }
    else if(document.getElementById('dy').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {rollPeriod: 24,   showRoller: true,	xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
     }
    else if(document.getElementById('mt').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {rollPeriod: 300,   showRoller: true,	xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
     }
    else if(document.getElementById('an').checked)
    {
      g = new Dygraph(document.getElementById("graphdiv"),"bmp1.csv",
      {rollPeriod: 1000,   showRoller: true,	xlabel: "Time",	ylabel: "Load: KW"}          // options
      );
     }
    else{}
  }
}
</script>
<title>BITS ENERGY PORTAL</title>
</head>
<body>
  <div id="header">
   <h2>ENERGY</h2>
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

 <div id="graphhostel" style="text-align:right;">
 <form>
 <input type="radio" id="a1" name="Hostel" onclick="intro()"/>AH 1
 <input type="radio" id="a2" name="Hostel" onclick="intro()"/>AH 2
 </form></div>

 <div id="graphview" style="text-align:right;">
 <form>
 <input type="radio" id="mn" name="View" onclick="intro()"/>Minute
 <input type="radio" id="hr" name="View" onclick="intro()"/>Hourly
 <input type="radio" id="dy" name="View" onclick="intro()"/>Daily
 <input type="radio" id="mt" name="View" onclick="intro()"/>Monthly
 <input type="radio" id="an" name="View" onclick="intro()"/>Annual
 </form></div>

 <div id="graphdiv" style="width:1300px; height:485px;"></div>
</body>
</html>
