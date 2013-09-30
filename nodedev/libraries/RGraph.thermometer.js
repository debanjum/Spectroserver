
if(typeof(RGraph)=='undefined')RGraph={};RGraph.Thermometer=function(id,min,max,value)
{this.id=id;this.canvas=document.getElementById(id);this.context=this.canvas.getContext?this.canvas.getContext("2d"):null;this.canvas.__object__=this;this.uid=RGraph.CreateUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.CreateUID();this.colorsParsed=false;this.type='thermometer';this.isRGraph=true;this.min=min;this.max=max;this.value=value;this.coords=[];this.graphArea=[];this.currentValue=null;this.bulbRadius=0;this.bulbTopRadius=0;this.bulbTopCenterX=0
this.bulbTopCenterY=0;this.coordsText=[];RGraph.OldBrowserCompat(this.context);this.properties={'chart.colors':['Gradient(#c00:red:#f66:#fcc)'],'chart.gutter.left':15,'chart.gutter.right':15,'chart.gutter.top':15,'chart.gutter.bottom':15,'chart.ticksize':5,'chart.text.color':'black','chart.text.font':'Arial','chart.text.size':10,'chart.units.pre':'','chart.units.post':'','chart.zoom.factor':1.5,'chart.zoom.fade.in':true,'chart.zoom.fade.out':true,'chart.zoom.hdir':'right','chart.zoom.vdir':'down','chart.zoom.frames':25,'chart.zoom.delay':16.666,'chart.zoom.shadow':true,'chart.zoom.background':true,'chart.title':'','chart.title.side':'','chart.title.side.bold':true,'chart.title.side.font':null,'chart.shadow':true,'chart.shadow.offsetx':0,'chart.shadow.offsety':0,'chart.shadow.blur':15,'chart.shadow.color':'gray','chart.resizable':false,'chart.contextmenu':null,'chart.adjustable':false,'chart.value.label':true,'chart.value.label.decimals':null,'chart.value.label.thousand':',','chart.value.label.point':'.','chart.scale.visible':false,'chart.scale.decimals':0,'chart.labels.count':5,'chart.annotatable':false,'chart.annotate.color':'black','chart.scale.decimals':0,'chart.scale.point':'.','chart.scale.thousand':',','chart.tooltips':null,'chart.tooltips.highlight':true,'chart.tooltips.effect':'fade','chart.tooltips.event':'onclick','chart.highlight.stroke':'rgba(0,0,0,0)','chart.highlight.fill':'rgba(255,255,255,0.7)'}
if(!this.canvas){alert('[THERMOMETER] No canvas support');return;}
this.$0={}
if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var RG=RGraph;var ca=this.canvas;var co=ca.getContext('2d');var prop=this.properties;this.Set=function(name,value)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
if(name=='chart.ylabels.count'){name='chart.labels.count';}
prop[name.toLowerCase()]=value;return this;}
this.Get=function(name)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
return prop[name];}
this.Draw=function()
{RG.FireCustomEvent(this,'onbeforedraw');if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
this.currentValue=this.value;this.gutterLeft=prop['chart.gutter.left'];this.gutterRight=prop['chart.gutter.right'];this.gutterTop=prop['chart.gutter.top'];this.gutterBottom=prop['chart.gutter.bottom'];this.scale2=RG.getScale2(this,{'max':this.max,'min':this.min,'strict':true,'scale.thousand':prop['chart.scale.thousand'],'scale.point':prop['chart.scale.point'],'scale.decimals':prop['chart.scale.decimals'],'ylabels.count':prop['chart.labels.count'],'scale.round':prop['chart.scale.round'],'units.pre':prop['chart.units.pre'],'units.post':prop['chart.units.post']});this.DrawBackground();this.DrawBar();this.DrawTickMarks();this.DrawLabels();if(prop['chart.title']){this.DrawTitle();}
if(prop['chart.title.side']){this.DrawSideTitle();}
if(prop['chart.resizable']){RG.AllowResizing(this);}
if(prop['chart.contextmenu']){RG.ShowContext(this);}
RG.InstallEventListeners(this);RG.FireCustomEvent(this,'ondraw');return this;}
this.DrawBackground=function()
{var bulbRadius=(ca.width-this.gutterLeft-this.gutterRight)/2;this.bulbTopRadius=(ca.width-this.gutterLeft-this.gutterRight-24)/2
this.bulbTopCenterX=this.gutterLeft+bulbRadius;this.bulbTopCenterY=this.gutterTop+bulbRadius;this.bulbBottomRadius=bulbRadius;this.bulbBottomCenterX=this.gutterLeft+bulbRadius;this.bulbBottomCenterY=ca.height-this.gutterBottom-bulbRadius;this.bulbRadius=bulbRadius;co.beginPath();co.fillStyle='black';if(prop['chart.shadow']){RG.SetShadow(this,prop['chart.shadow.color'],prop['chart.shadow.offsetx'],prop['chart.shadow.offsety'],prop['chart.shadow.blur']);}
co.fillRect(this.gutterLeft+12,this.gutterTop+bulbRadius,ca.width-this.gutterLeft-this.gutterRight-24,ca.height-this.gutterTop-this.gutterBottom-bulbRadius-bulbRadius);co.arc(this.bulbBottomCenterX,this.bulbBottomCenterY,bulbRadius,0,TWOPI,0);co.arc(this.bulbTopCenterX,this.bulbTopCenterY,this.bulbTopRadius,0,TWOPI,0);co.fill();RG.NoShadow(this);co.beginPath();co.fillStyle='white';co.fillRect(this.gutterLeft+12+1,this.gutterTop+bulbRadius,ca.width-this.gutterLeft-this.gutterRight-24-2,ca.height-this.gutterTop-this.gutterBottom-bulbRadius-bulbRadius);co.arc(this.gutterLeft+bulbRadius,ca.height-this.gutterBottom-bulbRadius,bulbRadius-1,0,TWOPI,0);co.arc(this.gutterLeft+bulbRadius,this.gutterTop+bulbRadius,((ca.width-this.gutterLeft-this.gutterRight-24)/2)-1,0,TWOPI,0);co.fill();co.beginPath();co.fillStyle=prop['chart.colors'][0];co.arc(this.gutterLeft+bulbRadius,ca.height-this.gutterBottom-bulbRadius,bulbRadius-1,0,TWOPI,0);co.rect(this.gutterLeft+12+1,ca.height-this.gutterBottom-bulbRadius-bulbRadius,ca.width-this.gutterLeft-this.gutterRight-24-2,bulbRadius);co.fill();this.graphArea[0]=this.gutterLeft+12+1;this.graphArea[1]=this.gutterTop+bulbRadius;this.graphArea[2]=ca.width-this.gutterLeft-this.gutterRight-24-2;this.graphArea[3]=(ca.height-this.gutterBottom-bulbRadius-bulbRadius)-(this.graphArea[1]);}
this.DrawBar=function()
{var barHeight=((this.value-this.min)/(this.max-this.min))*this.graphArea[3];co.beginPath();co.fillStyle=prop['chart.colors'][0];if(ISOLD){co.arc(this.bulbBottomCenterX,this.bulbBottomCenterY,this.bulbBottomRadius-1,0,TWOPI,false)}
co.rect(this.graphArea[0],this.graphArea[1]+this.graphArea[3]-barHeight,this.graphArea[2],barHeight+2);co.fill();this.coords[0]=[this.graphArea[0],this.graphArea[1]+this.graphArea[3]-barHeight,this.graphArea[2],barHeight];}
this.DrawTickMarks=function()
{co.strokeStyle='black'
var ticksize=prop['chart.ticksize'];co.beginPath();for(var i=this.graphArea[1];i<=(this.graphArea[1]+this.graphArea[3]);i+=(this.graphArea[3]/10)){co.moveTo(this.gutterLeft+12,Math.round(i));co.lineTo(this.gutterLeft+12+ticksize,Math.round(i));}
co.stroke();co.beginPath();for(var i=this.graphArea[1];i<=(this.graphArea[1]+this.graphArea[3]);i+=(this.graphArea[3]/10)){co.moveTo(ca.width-(this.gutterRight+12),Math.round(i));co.lineTo(ca.width-(this.gutterRight+12+ticksize),Math.round(i));}
co.stroke();}
this.DrawLabels=function()
{if(prop['chart.value.label']){co.fillStyle=prop['chart.text.color'];var text=prop['chart.scale.visible']?RG.number_format(this,this.value.toFixed(typeof prop['chart.value.label.decimals']=='number'?prop['chart.value.label.decimals']:prop['chart.scale.decimals'])):RG.number_format(this,this.value.toFixed(typeof prop['chart.value.label.decimals']=='number'?prop['chart.value.label.decimals']:prop['chart.scale.decimals']),prop['chart.units.pre'],prop['chart.units.post']);RG.Text2(this,{'font':prop['chart.text.font'],'size':prop['chart.text.size'],'x':this.gutterLeft+this.bulbRadius,'y':this.coords[0][1]+7,'text':text,'valign':'top','halign':'center','bounding':true,'boundingFill':'white','tag':'value.label'});}
if(prop['chart.scale.visible']){this.DrawScale();}}
this.DrawTitle=function()
{co.fillStyle=prop['chart.text.color'];RG.Text2(this,{'font':prop['chart.text.font'],'size':prop['chart.text.size']+2,'x':this.gutterLeft+((ca.width-this.gutterLeft-this.gutterRight)/2),'y':this.gutterTop,'text':String(prop['chart.title']),'valign':'center','halign':'center','bold':true,'tag':'title'});}
this.DrawSideTitle=function()
{var font=prop['chart.title.side.font']?prop['chart.title.side.font']:prop['chart.text.font'];var size=prop['chart.title.side.size']?prop['chart.title.side.size']:prop['chart.text.size']+2;co.fillStyle=prop['chart.text.color'];RG.Text2(this,{'font':font,'size':size+2,'x':this.gutterLeft-3,'y':((ca.height-this.gutterTop-this.gutterBottom)/2)+this.gutterTop,'text':String(prop['chart.title.side']),'valign':'center','halign':'center','angle':270,'bold':prop['chart.title.side.bold'],'tag':'title.side'});}
this.DrawScale=function()
{var numLabels=prop['chart.labels.count'];var step=(this.max-this.min)/numLabels;co.fillStyle=prop['chart.text.color'];var font=prop['chart.text.font'];var size=prop['chart.text.size'];var units_pre=prop['chart.units.pre'];var units_post=prop['chart.units.post'];var decimals=prop['chart.scale.decimals'];for(var i=1;i<=numLabels;++i){var x=ca.width-this.gutterRight;var y=ca.height-this.gutterBottom-(2*this.bulbRadius)-((this.graphArea[3]/numLabels)*i);var text=RG.number_format(this,String((this.min+(i*step)).toFixed(decimals)),units_pre,units_post);RG.Text2(this,{'font':font,'size':size,'x':x-6,'y':y,'text':text,'valign':'center','tag':'scale'});}
RG.Text2(this,{'font':font,'size':size,'x':x-6,'y':ca.height-this.gutterBottom-(2*this.bulbRadius),'text':RG.number_format(this,(this.min).toFixed(decimals),units_pre,units_post),'valign':'center','tag':'scale'});}
this.getShape=this.getBar=function(e)
{for(var i=0;i<this.coords.length;i++){var mouseCoords=RGraph.getMouseXY(e);var mouseX=mouseCoords[0];var mouseY=mouseCoords[1];var left=this.coords[i][0];var top=this.coords[i][1];var width=this.coords[i][2];var height=this.coords[i][3];if((mouseX>=left&&mouseX<=(left+width)&&mouseY>=top&&mouseY<=(top+height+this.bulbBottomRadius))||RG.getHypLength(this.bulbBottomCenterX,this.bulbBottomCenterY,mouseX,mouseY)<=this.bulbBottomRadius){var tooltip=RG.parseTooltipText?RG.parseTooltipText(prop['chart.tooltips'],i):'';return{0:this,'object':this,1:left,'x':left,2:top,'y':top,3:width,'width':width,4:height,'height':height,5:i,'index':i,'tooltip':tooltip};}}
return null;}
this.getValue=function(arg)
{if(arg.length==2){var mouseX=arg[0];var mouseY=arg[1];}else{var mouseCoords=RGraph.getMouseXY(arg);var mouseX=mouseCoords[0];var mouseY=mouseCoords[1];}
var value=this.graphArea[3]-(mouseY-this.graphArea[1]);value=(value/this.graphArea[3])*(this.max-this.min);value=value+this.min;value=Math.max(value,this.min);value=Math.min(value,this.max);return value;}
this.Highlight=function(shape)
{if(prop['chart.tooltips.highlight']){co.beginPath();co.strokeStyle=prop['chart.highlight.stroke'];co.fillStyle=prop['chart.highlight.fill'];co.rect(shape['x'],shape['y'],shape['width'],shape['height']+this.bulbBottomRadius);co.arc(this.bulbBottomCenterX,this.bulbBottomCenterY,this.bulbBottomRadius-1,0,TWOPI,false);co.stroke;co.fill();}}
this.getObjectByXY=function(e)
{var mouseXY=RGraph.getMouseXY(e);if(mouseXY[0]>this.gutterLeft&&mouseXY[0]<(ca.width-this.gutterRight)&&mouseXY[1]>=this.gutterTop&&mouseXY[1]<=(ca.height-this.gutterBottom)){return this;}}
this.Adjusting_mousemove=function(e)
{if(prop['chart.adjustable']&&RG.Registry.Get('chart.adjusting')&&RG.Registry.Get('chart.adjusting').uid==this.uid){var mouseXY=RGraph.getMouseXY(e);var value=this.getValue(e);if(typeof(value)=='number'){RG.FireCustomEvent(this,'onadjust');this.value=Number(value.toFixed(prop['chart.scale.decimals']));RG.RedrawCanvas(ca);}}}
this.positionTooltip=function(obj,x,y,tooltip,idx)
{var coordX=obj.coords[tooltip.__index__][0];var coordY=obj.coords[tooltip.__index__][1];var coordW=obj.coords[tooltip.__index__][2];var coordH=obj.coords[tooltip.__index__][3];var canvasXY=RGraph.getCanvasXY(ca);var gutterLeft=obj.gutterLeft;var gutterTop=obj.gutterTop;var width=tooltip.offsetWidth;var height=tooltip.offsetHeight;tooltip.style.left=0;tooltip.style.top=canvasXY[1]+coordY-height-7+'px';tooltip.style.overflow='';var img=new Image();img.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAFCAYAAACjKgd3AAAARUlEQVQYV2NkQAN79+797+RkhC4M5+/bd47B2dmZEVkBCgcmgcsgbAaA9GA1BCSBbhAuA/AagmwQPgMIGgIzCD0M0AMMAEFVIAa6UQgcAAAAAElFTkSuQmCC';img.style.position='absolute';img.id='__rgraph_tooltip_pointer__';img.style.top=(tooltip.offsetHeight-2)+'px';tooltip.appendChild(img);if((canvasXY[0]+coordX-(width/2))<10){tooltip.style.left=(canvasXY[0]+coordX-(width*0.1))+(coordW/2)+'px';img.style.left=((width*0.1)-8.5)+'px';}else if((canvasXY[0]+coordX+(width/2))>document.body.offsetWidth){tooltip.style.left=canvasXY[0]+coordX-(width*0.9)+(coordW/2)+'px';img.style.left=((width*0.9)-8.5)+'px';}else{tooltip.style.left=(canvasXY[0]+coordX+(coordW/2)-(width*0.5))+'px';img.style.left=((width*0.5)-8.5)+'px';}}
this.getYCoord=function(value)
{if(value>this.max||value<this.min){return null;}
var y=(this.graphArea[1]+this.graphArea[3])-(((value-this.min)/(this.max-this.min))*this.graphArea[3]);return y;}
this.overChartArea=function(e)
{var mouseXY=RG.getMouseXY(e);var mouseX=mouseXY[0];var mouseY=mouseXY[1];if(mouseX>=this.graphArea[0]&&mouseX<=(this.graphArea[0]+this.graphArea[2])&&mouseY>=this.graphArea[1]&&mouseY<=(this.graphArea[1]+this.graphArea[3]+this.bulbRadius)){return true;}
if(RG.getHypLength(this.bulbBottomCenterX,this.bulbBottomCenterY,mouseX,mouseY)<=this.bulbRadius){return true;}
if(RG.getHypLength(this.bulbTopCenterX,this.bulbTopCenterY,mouseX,mouseY)<=this.bulbTopRadius){return true;}
return false;}
this.parseColors=function()
{var colors=prop['chart.colors'];for(var i=0;i<colors.length;++i){colors[i]=this.parseSingleColorForGradient(colors[i]);}}
this.parseSingleColorForGradient=function(color)
{if(!color||typeof(color)!='string'){return color;}
if(color.match(/^gradient\((.*)\)$/i)){var parts=RegExp.$1.split(':');var grad=co.createLinearGradient(prop['chart.gutter.left'],0,ca.width-prop['chart.gutter.right'],0);var diff=1/(parts.length-1);grad.addColorStop(0,RG.trim(parts[0]));for(var j=1;j<parts.length;++j){grad.addColorStop(j*diff,RG.trim(parts[j]));}}
return grad?grad:color;}
RG.Register(this);}