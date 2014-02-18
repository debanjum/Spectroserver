
if(typeof(RGraph)=='undefined')RGraph={};if(typeof(RGraph.Drawing)=='undefined')RGraph.Drawing={};RGraph.Drawing.Poly=function(id,coords)
{this.id=id;this.canvas=document.getElementById(id);this.context=this.canvas.getContext?this.canvas.getContext("2d"):null;this.colorsParsed=false;this.canvas.__object__=this;this.coords=coords;this.coordsText=[];this.type='drawing.poly';this.isRGraph=true;this.uid=RGraph.CreateUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.CreateUID();RGraph.OldBrowserCompat(this.context);this.properties={'chart.strokestyle':'black','chart.fillstyle':'red','chart.events.click':null,'chart.events.mousemove':null,'chart.tooltips':null,'chart.tooltips.override':null,'chart.tooltips.effect':'fade','chart.tooltips.css.class':'RGraph_tooltip','chart.tooltips.event':'onclick','chart.tooltips.highlight':true,'chart.highlight.stroke':'rgba(0,0,0,0)','chart.highlight.fill':'rgba(255,255,255,0.7)','chart.shadow':false,'chart.shadow.color':'rgba(0,0,0,0.2)','chart.shadow.offsetx':3,'chart.shadow.offsety':3,'chart.shadow.blur':5}
if(!this.canvas){alert('[DRAWING.POLY] No canvas support');return;}
this.$0={};if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var RG=RGraph;var ca=this.canvas;var co=ca.getContext('2d');var prop=this.properties;this.Set=function(name,value)
{name=name.toLowerCase();if(name.substr(0,6)!='chart.'){name='chart.'+name;}
prop[name]=value;return this;}
this.Get=function(name)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
return prop[name.toLowerCase()];}
this.Draw=function()
{RG.FireCustomEvent(this,'onbeforedraw');if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
co.beginPath();co.strokeStyle=prop['chart.strokestyle'];co.fillStyle=prop['chart.fillstyle'];co.lineWidth=prop['chart.linewidth'];if(prop['chart.shadow']){co.shadowColor=prop['chart.shadow.color'];co.shadowOffsetY=prop['chart.shadow.offsetx'];co.shadowOffsetX=prop['chart.shadow.offsety'];co.shadowBlur=prop['chart.shadow.blur'];}
this.DrawPoly();co.stroke();co.fill();RG.NoShadow(this)
RG.InstallEventListeners(this);RG.FireCustomEvent(this,'ondraw');return this;}
this.getObjectByXY=function(e)
{if(this.getShape(e)){return this;}}
this.DrawPoly=function()
{var coords=this.coords;co.beginPath();co.moveTo(coords[0][0],coords[0][1]);for(var i=1,len=coords.length;i<len;++i){co.lineTo(coords[i][0],coords[i][1]);}
co.closePath();co.stroke();co.fill();}
this.getShape=function(e)
{var coords=this.coords;var mouseXY=RGraph.getMouseXY(e);var mouseX=mouseXY[0];var mouseY=mouseXY[1];co.beginPath();co.strokeStyle='rgba(0,0,0,0)';co.fillStyle='rgba(0,0,0,0)';this.DrawPoly();if(co.isPointInPath(mouseX,mouseY)){return{0:this,1:this.coords,2:0,'object':this,'coords':this.coords,'index':0,'tooltip':prop['chart.tooltips']?prop['chart.tooltips'][0]:null};}
return null;}
this.positionTooltip=function(obj,x,y,tooltip,idx)
{var canvasXY=RGraph.getCanvasXY(obj.canvas);var width=tooltip.offsetWidth;var height=tooltip.offsetHeight;tooltip.style.left=0;tooltip.style.top=(y-height-7)+'px';tooltip.style.overflow='';var img=new Image();img.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAFCAYAAACjKgd3AAAARUlEQVQYV2NkQAN79+797+RkhC4M5+/bd47B2dmZEVkBCgcmgcsgbAaA9GA1BCSBbhAuA/AagmwQPgMIGgIzCD0M0AMMAEFVIAa6UQgcAAAAAElFTkSuQmCC';img.style.position='absolute';img.id='__rgraph_tooltip_pointer__';img.style.top=(tooltip.offsetHeight-2)+'px';tooltip.appendChild(img);if(x-(width/2)<10){tooltip.style.left=(canvasXY[0]+x-(width*0.1))-8.5+'px';img.style.left=((width*0.1)-8.5)+'px';}else if((x+(width/2))>document.body.offsetWidth){tooltip.style.left=x-(width*0.9)+'px';img.style.left=((width*0.9)-8.5)+'px';}else{tooltip.style.left=x-(width/2)+'px';img.style.left=((width*0.5)-8.5)+'px';}}
this.Highlight=function(shape)
{if(prop['chart.tooltips.highlight']){co.beginPath();co.strokeStyle=prop['chart.highlight.stroke'];co.fillStyle=prop['chart.highlight.fill'];this.DrawPoly();co.fill();co.stroke();}}
this.parseColors=function()
{var func=this.parseSingleColorForGradient;prop['chart.fillstyle']=func(prop['chart.fillstyle']);prop['chart.strokestyle']=func(prop['chart.strokestyle']);prop['chart.highlight.stroke']=func(prop['chart.highlight.stroke']);prop['chart.highlight.fill']=func(prop['chart.highlight.fill']);}
this.parseSingleColorForGradient=function(color)
{if(!color){return color;}
if(color.match(/^gradient\((.*)\)$/i)){var parts=RegExp.$1.split(':');var grad=co.createLinearGradient(0,0,ca.width,0);var diff=1/(parts.length-1);grad.addColorStop(0,RG.trim(parts[0]));for(var j=1,len=parts.length;j<len;++j){grad.addColorStop(j*diff,RG.trim(parts[j]));}}
return grad?grad:color;}
RG.Register(this);}