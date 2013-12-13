
if(typeof(RGraph)=='undefined')RGraph={};if(typeof(RGraph.Drawing)=='undefined')RGraph.Drawing={};RGraph.Drawing.Circle=function(id,x,y,r)
{this.id=id;this.canvas=document.getElementById(id);this.context=this.canvas.getContext?this.canvas.getContext("2d"):null;this.canvas.__object__=this;this.centerx=x;this.centery=y;this.radius=r;this.type='drawing.circle';this.isRGraph=true;this.uid=RGraph.CreateUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.CreateUID();RGraph.OldBrowserCompat(this.context);this.properties={'chart.strokestyle':'rgba(0,0,0,0)','chart.fillstyle':'red','chart.events.click':null,'chart.events.mousemove':null,'chart.shadow':false,'chart.shadow.color':'gray','chart.shadow.offsetx':3,'chart.shadow.offsety':3,'chart.shadow.blur':5,'chart.highlight.stroke':'black','chart.highlight.fill':'rgba(255,255,255,0.7)','chart.tooltips':null,'chart.tooltips.highlight':true,'chart.tooltips.event':'onclick','chart.linewidth':2}
if(!this.canvas){alert('[DRAWING.CIRCLE] No canvas support');return;}
this.coords=[[x,y,r]];this.$0={};if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var RG=RGraph;var ca=this.canvas;var co=ca.getContext('2d');var prop=this.properties;this.Set=function(name,value)
{name=name.toLowerCase();if(name.substr(0,6)!='chart.'){name='chart.'+name;}
prop[name]=value;return this;}
this.Get=function(name)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
return prop[name.toLowerCase()];}
this.Draw=function()
{RG.FireCustomEvent(this,'onbeforedraw');if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
co.beginPath();co.strokeStyle=prop['chart.strokestyle'];co.fillStyle=prop['chart.fillstyle'];co.lineWidth=prop['chart.linewidth'];if(prop['chart.shadow']){RG.SetShadow(this,prop['chart.shadow.color'],prop['chart.shadow.offsetx'],prop['chart.shadow.offsety'],prop['chart.shadow.blur']);}
co.arc(this.coords[0][0],this.coords[0][1],this.radius,0,TWOPI,false);co.fill();co.stroke();RG.NoShadow(this);RG.InstallEventListeners(this);RG.FireCustomEvent(this,'ondraw');return this;}
this.getObjectByXY=function(e)
{if(this.getShape(e)){return this;}}
this.getShape=function(e)
{var mouseXY=RGraph.getMouseXY(e);var mouseX=mouseXY[0];var mouseY=mouseXY[1];if(RG.getHypLength(this.centerx,this.centery,mouseXY[0],mouseXY[1])<=this.radius){return{0:this,1:this.centerx,2:this.centery,3:this.radius,4:null,5:0,'object':this,'x':this.centerx,'y':this.centery,'radius':this.radius,'index':0,'tooltip':prop['chart.tooltips']?prop['chart.tooltips'][0]:null};}
return null;}
this.positionTooltip=function(obj,x,y,tooltip,idx)
{var canvasXY=RG.getCanvasXY(obj.canvas);var width=tooltip.offsetWidth;var height=tooltip.offsetHeight;var radius=this.radius;tooltip.style.left=0;tooltip.style.top=canvasXY[1]+obj.centery-height-7+'px';tooltip.style.overflow='';var img=new Image();img.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAFCAYAAACjKgd3AAAARUlEQVQYV2NkQAN79+797+RkhC4M5+/bd47B2dmZEVkBCgcmgcsgbAaA9GA1BCSBbhAuA/AagmwQPgMIGgIzCD0M0AMMAEFVIAa6UQgcAAAAAElFTkSuQmCC';img.style.position='absolute';img.id='__rgraph_tooltip_pointer__';img.style.top=(tooltip.offsetHeight-2)+'px';tooltip.appendChild(img);if((canvasXY[0]+obj.centerx-(width/2))<10){tooltip.style.left=(canvasXY[0]+this.centerx-(width*0.1))+'px';img.style.left=((width*0.1)-8.5)+'px';}else if((canvasXY[0]+obj.centerx+(width/2))>document.body.offsetWidth){tooltip.style.left=canvasXY[0]+this.centerx-(width*0.9)+'px';img.style.left=((width*0.9)-8.5)+'px';}else{tooltip.style.left=(canvasXY[0]+this.centerx-(width*0.5))+'px';img.style.left=((width*0.5)-8.5)+'px';}}
this.Highlight=function(shape)
{if(prop['chart.tooltips.highlight']){co.beginPath();co.strokeStyle=prop['chart.highlight.stroke'];co.fillStyle=prop['chart.highlight.fill'];co.arc(this.centerx,this.centery,this.radius+0.5,0,TWOPI,false);co.fill();co.stroke();}}
this.parseColors=function()
{prop['chart.fillstyle']=this.parseSingleColorForGradient(prop['chart.fillstyle']);prop['chart.strokestyle']=this.parseSingleColorForGradient(prop['chart.strokestyle']);prop['chart.highlight.stroke']=this.parseSingleColorForGradient(prop['chart.highlight.stroke']);prop['chart.highlight.fill']=this.parseSingleColorForGradient(prop['chart.highlight.fill']);}
this.parseSingleColorForGradient=function(color)
{if(!color){return color;}
if(color.match(/^gradient\((.*)\)$/i)){var parts=RegExp.$1.split(':');var grad=co.createLinearGradient(0,0,ca.width,0);var diff=1/(parts.length-1);grad.addColorStop(0,RGraph.trim(parts[0]));for(var j=1;j<parts.length;++j){grad.addColorStop(j*diff,RG.trim(parts[j]));}}
return grad?grad:color;}
RG.Register(this);}