
if(typeof(RGraph)=='undefined')RGraph={};if(typeof(RGraph.Drawing)=='undefined')RGraph.Drawing={};RGraph.Drawing.Marker2=function(id,x,y,text)
{this.id=id;this.canvas=document.getElementById(id);this.context=this.canvas.getContext?this.canvas.getContext("2d"):null;this.colorsParsed=false;this.canvas.__object__=this;this.x=x;this.y=y;this.text=text;this.type='drawing.marker2';this.isRGraph=true;this.uid=RGraph.CreateUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.CreateUID();RGraph.OldBrowserCompat(this.context);this.properties={'chart.strokestyle':'black','chart.fillstyle':'white','chart.text.color':'black','chart.text.size':12,'chart.text.font':'Arial','chart.events.click':null,'chart.events.mousemove':null,'chart.shadow':true,'chart.shadow.color':'gray','chart.shadow.offsetx':3,'chart.shadow.offsety':3,'chart.shadow.blur':5,'chart.highlight.stroke':'rgba(0,0,0,0)','chart.highlight.fill':'rgba(255,255,255,0.7)','chart.tooltips':null,'chart.tooltips.highlight':true,'chart.tooltips.event':'onclick','chart.voffset':20}
if(!this.canvas){alert('[DRAWING.MARKER2] No canvas support');return;}
this.coords=[];this.coordsText=[];this.$0={};if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var RG=RGraph;var ca=this.canvas;var co=ca.getContext('2d');var prop=this.properties;this.Set=function(name,value)
{name=name.toLowerCase();if(name.substr(0,6)!='chart.'){name='chart.'+name;}
prop[name]=value;return this;}
this.Get=function(name)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
return prop[name.toLowerCase()];}
this.Draw=function()
{RG.FireCustomEvent(this,'onbeforedraw');this.metrics=RG.MeasureText(this.text,prop['chart.text.bold'],prop['chart.text.font'],prop['chart.text.size']);if(this.x+this.metrics[0]>=ca.width){this.alignRight=true;}
if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
var x=this.alignRight?this.x-this.metrics[0]-6:this.x;var y=this.y-6-prop['chart.voffset']-this.metrics[1];var width=this.metrics[0]+6;var height=this.metrics[1]+6;this.coords[0]=[x,y,width,height];if(prop['chart.shadow']){RG.SetShadow(this,prop['chart.shadow.color'],prop['chart.shadow.offsetx'],prop['chart.shadow.offsety'],prop['chart.shadow.blur']);}
co.strokeStyle=prop['chart.strokestyle'];co.fillStyle=prop['chart.fillstyle'];co.strokeRect(x+(this.alignRight?width:0),y,0,height+prop['chart.voffset']-6);co.strokeRect(x,y,width,height);co.fillRect(x,y,width,height);RG.NoShadow(this);co.fillStyle=prop['chart.text.color'];RG.Text2(this,{'font':prop['chart.text.font'],'size':prop['chart.text.size'],'x':Math.round(this.x)-(this.alignRight?this.metrics[0]+3:-3),'y':this.y-3-prop['chart.voffset'],'text':this.text,'valign':'bottom','halign':'left','tag':'labels'});this.coords[0].push([x,y,width,height]);RG.NoShadow(this);co.textBaseline='alphabetic';RG.InstallEventListeners(this);RG.FireCustomEvent(this,'ondraw');return this;}
this.getObjectByXY=function(e)
{var mouseXY=RG.getMouseXY(e);if(this.getShape(e)){return this;}}
this.getShape=function(e)
{var mouseXY=RG.getMouseXY(e);var mouseX=mouseXY[0];var mouseY=mouseXY[1];if(mouseX>=this.coords[0][0]&&mouseX<=(this.coords[0][0]+this.coords[0][2])){if(mouseY>=this.coords[0][1]&&mouseY<=(this.coords[0][1]+this.coords[0][3])){return{0:this,1:this.coords[0][0],2:this.coords[0][1],3:this.coords[0][2],4:this.coords[0][3],5:0,'object':this,'x':this.coords[0][0],'y':this.coords[0][1],'width':this.coords[0][2],'height':this.coords[0][3],'index':0,'tooltip':prop['chart.tooltips']?prop['chart.tooltips'][0]:null};}}
return null;}
this.positionTooltip=function(obj,x,y,tooltip,idx)
{var textDimensions=RG.MeasureText(this.text,false,prop['chart.text.font'],prop['chart.text.size']);var canvasXY=RG.getCanvasXY(obj.canvas);var width=tooltip.offsetWidth;var height=tooltip.offsetHeight;tooltip.style.left=0;tooltip.style.top=canvasXY[1]+this.coords[0][1]-height-9+'px';tooltip.style.overflow='';var img=new Image();img.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAFCAYAAACjKgd3AAAARUlEQVQYV2NkQAN79+797+RkhC4M5+/bd47B2dmZEVkBCgcmgcsgbAaA9GA1BCSBbhAuA/AagmwQPgMIGgIzCD0M0AMMAEFVIAa6UQgcAAAAAElFTkSuQmCC';img.style.position='absolute';img.id='__rgraph_tooltip_pointer__';img.style.top=(tooltip.offsetHeight-2)+'px';tooltip.appendChild(img);if((canvasXY[0]+obj.coords[0][0]+(obj.coords[0][2]/2)-(width/2))<10){tooltip.style.left=(canvasXY[0]+this.coords[0][0]+(this.coords[0][2]/2)-(width*0.1))+'px';img.style.left=((width*0.1)-8.5)+'px';}else if((canvasXY[0]+this.coords[0][0]+(this.coords[0][2]/2)+(width/2))>document.body.offsetWidth){tooltip.style.left=(canvasXY[0]+this.coords[0][0]+(this.coords[0][2]/2)-(width*0.9))+'px';img.style.left=((width*0.9)-8.5)+'px';}else{tooltip.style.left=(canvasXY[0]+this.coords[0][0]+(this.coords[0][2]/2)-(width*0.5))+'px';img.style.left=((width*0.5)-8.5)+'px';}}
this.Highlight=function(shape)
{if(prop['chart.tooltips.highlight']){co.beginPath();co.strokeStyle=prop['chart.highlight.stroke'];co.fillStyle=prop['chart.highlight.fill'];co.rect(this.coords[0][0],this.coords[0][1],this.coords[0][2],this.coords[0][3]);co.fill();co.stroke();}}
this.parseColors=function()
{prop['chart.fillstyle']=this.parseSingleColorForGradient(prop['chart.fillstyle']);prop['chart.strokestyle']=this.parseSingleColorForGradient(prop['chart.strokestyle']);prop['chart.highlight.stroke']=this.parseSingleColorForGradient(prop['chart.highlight.stroke']);prop['chart.highlight.fill']=this.parseSingleColorForGradient(prop['chart.highlight.fill']);prop['chart.text.color']=this.parseSingleColorForGradient(prop['chart.text.color']);}
this.parseSingleColorForGradient=function(color)
{var canvas=this.canvas;var context=this.context;if(!color||typeof(color)!='string'){return color;}
if(color.match(/^gradient\((.*)\)$/i)){var parts=RegExp.$1.split(':');var grad=co.createLinearGradient(this.x,this.y,this.x+this.metrics[0],this.y);var diff=1/(parts.length-1);grad.addColorStop(0,RG.trim(parts[0]));for(var j=1;j<parts.length;++j){grad.addColorStop(j*diff,RG.trim(parts[j]));}}
return grad?grad:color;}
RG.Register(this);}