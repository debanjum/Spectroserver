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
      // NEW LINE:
      if (typeof(g) != 'undefined') g.destroy();

      g = new Dygraph( document.getElementById("graphdiv"), "bmp1.csv", {xlabel: "Time", ylabel: "Load: KW"} );

      window.onresize = function() {g.resize();}
      setTimeout('intro()',3000);  
      //g.updateOptions( { 'file': "bmp1.csv" } );
 }
</script>

<title>SPECTROSCOPY</title>
</head>
<body>
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

 <div id="graphview" style="text-align:right;">
 <form>
 <input type="radio" id="mn" name="View" onclick="intro()"/>Minute
 <input type="radio" id="hr" name="View" onclick="intro()"/>Hourly
 <input type="radio" id="dy" name="View" onclick="intro()"/>Daily
 <input type="radio" id="mt" name="View" onclick="intro()"/>Monthly
 <input type="radio" id="an" name="View" onclick="intro()"/>Annual
 </form></div>

 <div id="graphdiv" style="position: absolute; left: 10px; right: 10px; top: 200px; bottom: 10px;"></div>
</body>
</html>
