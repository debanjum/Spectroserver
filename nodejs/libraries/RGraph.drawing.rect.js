
if(typeof(RGraph)=='undefined')RGraph={};if(typeof(RGraph.Drawing)=='undefined')RGraph.Drawing={};RGraph.Drawing.Rect=function(id,x,y,w,h)
{this.id=id;this.canvas=document.getElementById(id);this.context=this.canvas.getContext?this.canvas.getContext("2d"):null;this.colorsParsed=false;this.canvas.__object__=this;this.type='drawing.rect';this.isRGraph=true;this.uid=RGraph.CreateUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.CreateUID();RGraph.OldBrowserCompat(this.context);this.properties={'chart.strokestyle':'rgba(0,0,0,0)','chart.fillstyle':'red','chart.events.click':null,'chart.events.mousemove':null,'chart.shadow':false,'chart.shadow.color':'gray','chart.shadow.offsetx':3,'chart.shadow.offsety':3,'chart.shadow.blur':5,'chart.highlight.stroke':'black','chart.highlight.fill':'rgba(255,255,255,0.7)','chart.tooltips':null,'chart.tooltips.effect':'fade','chart.tooltips.css.class':'RGraph_tooltip','chart.tooltips.event':'onclick','chart.tooltips.highlight':true,'chart.tooltips.coords.page':false,'chart.tooltips.valign':'top'}
if(!this.canvas){alert('[DRAWING.RECT] No canvas support');return;}
this.coords=[[Math.round(x),Math.round(y),w,h]];this.$0={};if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var RG=RGraph;var ca=this.canvas;var co=ca.getContext('2d');var prop=this.properties;this.Set=function(name,value)
{name=name.toLowerCase();if(name.substr(0,6)!='chart.'){name='chart.'+name;}
prop[name]=value;return this;}
this.Get=function(name)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
return prop[name.toLowerCase()];}
this.Draw=function()
{RG.FireCustomEvent(this,'onbeforedraw');if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
co.beginPath();co.strokeStyle=prop['chart.strokestyle'];co.fillStyle=prop['chart.fillstyle'];if(prop['chart.shadow']){RG.SetShadow(this,prop['chart.shadow.color'],prop['chart.shadow.offsetx'],prop['chart.shadow.offsety'],prop['chart.shadow.blur']);}
co.rect(this.coords[0][0],this.coords[0][1],this.coords[0][2],this.coords[0][3]);co.stroke();co.fill();RG.NoShadow(this);RG.InstallEventListeners(this);RG.FireCustomEvent(this,'ondraw');return this;}
this.getObjectByXY=function(e)
{if(this.getShape(e)){return this;}}
this.getShape=function(e)
{var mouseXY=RGraph.getMouseXY(e);var mouseX=mouseXY[0];var mouseY=mouseXY[1];for(var i=0,len=this.coords.length;i<len;i++){var coords=this.coords[i];var left=coords[0];var top=coords[1];var width=coords[2];var height=coords[3];if(mouseX>=left&&mouseX<=(left+width)&&mouseY>=top&&mouseY<=(top+height)){return{0:this,1:left,2:top,3:width,4:height,5:0,'object':this,'x':left,'y':top,'width':width,'height':height,'index':0,'tooltip':prop['chart.tooltips']?prop['chart.tooltips'][0]:null};}}
return null;}
this.positionTooltip=function(obj,x,y,tooltip,idx)
{var coordX=obj.coords[0][0];var coordY=obj.coords[0][1];var coordW=obj.coords[0][2];var coordH=obj.coords[0][3];var canvasXY=RG.getCanvasXY(obj.canvas);var width=tooltip.offsetWidth;var height=tooltip.offsetHeight;tooltip.style.left=0;if(prop['chart.tooltips.valign']=='center'){tooltip.style.top=canvasXY[1]+coordY+(coordH/2)-height+'px';}else{tooltip.style.top=canvasXY[1]+coordY-height-7+'px';}
tooltip.style.overflow='';var img=new Image();img.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAFCAYAAACjKgd3AAAARUlEQVQYV2NkQAN79+797+RkhC4M5+/bd47B2dmZEVkBCgcmgcsgbAaA9GA1BCSBbhAuA/AagmwQPgMIGgIzCD0M0AMMAEFVIAa6UQgcAAAAAElFTkSuQmCC';img.style.position='absolute';img.id='__rgraph_tooltip_pointer__';img.style.top=(tooltip.offsetHeight-2)+'px';tooltip.appendChild(img);if((canvasXY[0]+coordX+(coordW/2)-(width/2))<10){tooltip.style.left=(canvasXY[0]+coordX-(width*0.1))+(coordW/2)+'px';img.style.left=((width*0.1)-8.5)+'px';}else if((canvasXY[0]+coordX+(width/2))>document.body.offsetWidth){tooltip.style.left=canvasXY[0]+coordX-(width*0.9)+(coordW/2)+'px';img.style.left=((width*0.9)-8.5)+'px';}else{tooltip.style.left=(canvasXY[0]+coordX+(coordW/2)-(width*0.5))+'px';img.style.left=((width*0.5)-8.5)+'px';}}
this.Highlight=function(shape)
{RG.Highlight.Rect(this,shape);}
this.parseColors=function()
{prop['chart.fillstyle']=this.parseSingleColorForGradient(prop['chart.fillstyle']);prop['chart.strokestyle']=this.parseSingleColorForGradient(prop['chart.strokestyle']);prop['chart.highlight.stroke']=this.parseSingleColorForGradient(prop['chart.highlight.stroke']);prop['chart.highlight.fill']=this.parseSingleColorForGradient(prop['chart.highlight.fill']);}
this.parseSingleColorForGradient=function(color)
{if(!color){return color;}
if(color.match(/^gradient\((.*)\)$/i)){var parts=RegExp.$1.split(':');var grad=co.createLinearGradient(0,0,ca.width,0);var diff=1/(parts.length-1);grad.addColorStop(0,RG.trim(parts[0]));for(var j=1,len=parts.length;j<len;++j){grad.addColorStop(j*diff,RG.trim(parts[j]));}}
return grad?grad:color;}
RG.Register(this);}