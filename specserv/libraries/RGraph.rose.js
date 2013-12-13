
if(typeof(RGraph)=='undefined')RGraph={};RGraph.Rose=function(id,data)
{this.id=id;this.canvas=document.getElementById(id);this.context=this.canvas.getContext('2d');this.data=data;this.canvas.__object__=this;this.type='rose';this.isRGraph=true;this.uid=RGraph.CreateUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.CreateUID();this.colorsParsed=false;this.coordsText=[];RGraph.OldBrowserCompat(this.context);this.centerx=0;this.centery=0;this.radius=0;this.max=0;this.angles=[];this.angles2=[];this.properties={'chart.background.axes':true,'chart.background.axes.color':'black','chart.background.grid':true,'chart.background.grid.color':'#ccc','chart.background.grid.size':null,'chart.background.grid.spokes':null,'chart.background.grid.count':5,'chart.centerx':null,'chart.centery':null,'chart.radius':null,'chart.angles.start':0,'chart.colors':['rgba(255,0,0,0.5)','rgba(255,255,0,0.5)','rgba(0,255,255,0.5)','rgb(0,255,0)','gray','blue','rgb(255,128,255)','green','pink','gray','aqua'],'chart.colors.sequential':false,'chart.colors.alpha':null,'chart.margin':0,'chart.strokestyle':'#aaa','chart.gutter.left':25,'chart.gutter.right':25,'chart.gutter.top':25,'chart.gutter.bottom':25,'chart.title':'','chart.title.background':null,'chart.title.hpos':null,'chart.title.vpos':null,'chart.title.bold':true,'chart.title.font':null,'chart.title.x':null,'chart.title.y':null,'chart.title.halign':null,'chart.title.valign':null,'chart.labels':null,'chart.labels.position':'center','chart.labels.axes':'nsew','chart.labels.offset':0,'chart.text.color':'black','chart.text.font':'Arial','chart.text.size':10,'chart.key':null,'chart.key.background':'white','chart.key.position':'graph','chart.key.halign':'right','chart.key.shadow':false,'chart.key.shadow.color':'#666','chart.key.shadow.blur':3,'chart.key.shadow.offsetx':2,'chart.key.shadow.offsety':2,'chart.key.position.gutter.boxed':false,'chart.key.position.x':null,'chart.key.position.y':null,'chart.key.color.shape':'square','chart.key.rounded':true,'chart.key.linewidth':1,'chart.key.colors':null,'chart.key.interactive':false,'chart.key.interactive.highlight.chart.stroke':'black','chart.key.interactive.highlight.chart.fill':'rgba(255,255,255,0.7)','chart.key.interactive.highlight.label':'rgba(255,0,0,0.2)','chart.contextmenu':null,'chart.tooltips':null,'chart.tooltips.event':'onclick','chart.tooltips.effect':'fade','chart.tooltips.css.class':'RGraph_tooltip','chart.tooltips.highlight':true,'chart.highlight.stroke':'rgba(0,0,0,0)','chart.highlight.fill':'rgba(255,255,255,0.7)','chart.annotatable':false,'chart.annotate.color':'black','chart.zoom.factor':1.5,'chart.zoom.fade.in':true,'chart.zoom.fade.out':true,'chart.zoom.hdir':'right','chart.zoom.vdir':'down','chart.zoom.frames':25,'chart.zoom.delay':16.666,'chart.zoom.shadow':true,'chart.zoom.background':true,'chart.zoom.action':'zoom','chart.resizable':false,'chart.resize.handle.adjust':[0,0],'chart.resize.handle.background':null,'chart.adjustable':false,'chart.ymax':null,'chart.ymin':0,'chart.scale.decimals':null,'chart.scale.point':'.','chart.scale.thousand':',','chart.variant':'stacked','chart.exploded':0,'chart.events.mousemove':null,'chart.events.click':null,'chart.animation.roundrobin.factor':1,'chart.animation.roundrobin.radius':true,'chart.animation.grow.multiplier':1,'chart.labels.count':5}
var linear_data=RGraph.array_linearize(this.data);for(var i=0;i<linear_data.length;++i){this["$"+i]={}}
if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var RG=RGraph;var ca=this.canvas;var co=ca.getContext('2d');var prop=this.properties;this.Set=function(name,value)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
prop[name.toLowerCase()]=value;return this;}
this.Get=function(name)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
return prop[name.toLowerCase()];}
this.Draw=function()
{RG.FireCustomEvent(this,'onbeforedraw');this.gutterLeft=prop['chart.gutter.left'];this.gutterRight=prop['chart.gutter.right'];this.gutterTop=prop['chart.gutter.top'];this.gutterBottom=prop['chart.gutter.bottom'];this.radius=(Math.min(ca.width-this.gutterLeft-this.gutterRight,ca.height-this.gutterTop-this.gutterBottom)/2);this.centerx=((ca.width-this.gutterLeft-this.gutterRight)/2)+this.gutterLeft;this.centery=((ca.height-this.gutterTop-this.gutterBottom)/2)+this.gutterTop;this.angles=[];this.angles2=[];this.total=0;this.startRadians=prop['chart.angles.start'];if(prop['chart.key']&&prop['chart.key'].length>0&&prop['chart.key'].length>=3){this.centerx=this.centerx-this.gutterRight+5;}
if(typeof(prop['chart.centerx'])=='number')this.centerx=prop['chart.centerx'];if(typeof(prop['chart.centery'])=='number')this.centery=prop['chart.centery'];if(typeof(prop['chart.radius'])=='number')this.radius=prop['chart.radius'];if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
this.DrawBackground();this.DrawRose();this.DrawLabels();if(prop['chart.contextmenu']){RG.ShowContext(this);}
if(prop['chart.resizable']){RG.AllowResizing(this);}
if(prop['chart.adjustable']){RG.AllowAdjusting(this);}
RG.InstallEventListeners(this);RG.FireCustomEvent(this,'ondraw');return this;}
this.DrawBackground=function()
{co.lineWidth=1;if(prop['chart.background.grid']){if(typeof(prop['chart.background.grid.count'])=='number'){prop['chart.background.grid.size']=this.radius/prop['chart.background.grid.count'];}
co.beginPath();co.strokeStyle=prop['chart.background.grid.color'];for(var i=prop['chart.background.grid.size'];i<=this.radius;i+=prop['chart.background.grid.size']){co.moveTo(this.centerx+i,this.centery);co.arc(this.centerx,this.centery,i,0,TWOPI,false);}
co.stroke();co.beginPath();if(typeof(prop['chart.background.grid.spokes'])=='number'){var num=(360/prop['chart.background.grid.spokes']);for(var i=num;i<=360;i+=num){co.arc(this.centerx,this.centery,this.radius,((i/(180/PI))-HALFPI)+this.startRadians,(((i+0.0001)/(180/PI))-HALFPI)+this.startRadians,false);co.lineTo(this.centerx,this.centery);}}else{for(var i=15;i<=360;i+=15){co.arc(this.centerx,this.centery,this.radius,(i/(180/PI))-HALFPI,((i+0.0001)/(180/PI))-HALFPI,false);co.lineTo(this.centerx,this.centery);}}
co.stroke();}
if(prop['chart.background.axes']){co.beginPath();co.strokeStyle=prop['chart.background.axes.color'];co.moveTo(this.centerx-this.radius,Math.round(this.centery));co.lineTo(this.centerx+this.radius,Math.round(this.centery));co.moveTo(Math.round(this.centerx-this.radius),this.centery-5);co.lineTo(Math.round(this.centerx-this.radius),this.centery+5);co.moveTo(Math.round(this.centerx+this.radius),this.centery-5);co.lineTo(Math.round(this.centerx+this.radius),this.centery+5);for(var i=(this.centerx-this.radius);i<(this.centerx+this.radius);i+=(this.radius/5)){co.moveTo(Math.round(i),this.centery-3);co.lineTo(Math.round(i),this.centery+3.5);}
for(var i=(this.centery-this.radius);i<(this.centery+this.radius);i+=(this.radius/5)){co.moveTo(this.centerx-3,Math.round(i));co.lineTo(this.centerx+3,Math.round(i));}
co.moveTo(Math.round(this.centerx),this.centery-this.radius);co.lineTo(Math.round(this.centerx),this.centery+this.radius);co.moveTo(this.centerx-5,Math.round(this.centery-this.radius));co.lineTo(this.centerx+5,Math.round(this.centery-this.radius));co.moveTo(this.centerx-5,Math.round(this.centery+this.radius));co.lineTo(this.centerx+5,Math.round(this.centery+this.radius));co.closePath();co.stroke();}}
this.DrawRose=function()
{var max=0;var data=this.data;var margin=RGraph.degrees2Radians(prop['chart.margin']);if(RG.is_null(prop['chart.ymax'])){for(var i=0;i<data.length;++i){if(typeof(data[i])=='number'){max=Math.max(max,data[i]);}else if(typeof(data[i])=='object'&&prop['chart.variant']=='non-equi-angular'){max=Math.max(max,data[i][0]);}else{max=Math.max(max,RG.array_sum(data[i]));}}
this.scale2=RG.getScale2(this,{'max':max,'min':0,'scale.thousand':prop['chart.scale.thousand'],'scale.point':prop['chart.scale.point'],'scale.decimals':prop['chart.scale.decimals'],'ylabels.count':prop['chart.labels.count'],'scale.round':prop['chart.scale.round'],'units.pre':prop['chart.units.pre'],'units.post':prop['chart.units.post']});this.max=this.scale2.max;}else{var ymax=prop['chart.ymax'];this.scale2=RG.getScale2(this,{'max':ymax,'strict':true,'scale.thousand':prop['chart.scale.thousand'],'scale.point':prop['chart.scale.point'],'scale.decimals':prop['chart.scale.decimals'],'ylabels.count':prop['chart.labels.count'],'scale.round':prop['chart.scale.round'],'units.pre':prop['chart.units.pre'],'units.post':prop['chart.units.post']});this.max=this.scale2.max}
this.sum=RG.array_sum(data);co.moveTo(this.centerx,this.centery);co.stroke();if(prop['chart.colors.alpha']){co.globalAlpha=prop['chart.colors.alpha'];}
if(typeof(prop['chart.variant'])=='string'&&prop['chart.variant']=='non-equi-angular'){var total=0;for(var i=0;i<data.length;++i){total+=data[i][1];}
for(var i=0;i<this.data.length;++i){var segmentRadians=((this.data[i][1]/total)*TWOPI);var radius=((this.data[i][0]-prop['chart.ymin'])/(this.max-prop['chart.ymin']))*this.radius;radius=radius*prop['chart.animation.grow.multiplier'];co.strokeStyle=prop['chart.strokestyle'];co.fillStyle=prop['chart.colors'][0];if(prop['chart.colors.sequential']){co.fillStyle=prop['chart.colors'][i];}
co.beginPath();var startAngle=(this.startRadians*prop['chart.animation.roundrobin.factor'])-HALFPI+margin;var endAngle=((this.startRadians+segmentRadians)*prop['chart.animation.roundrobin.factor'])-HALFPI-margin;var exploded=this.getexploded(i,startAngle,endAngle,prop['chart.exploded']);var explodedX=exploded[0];var explodedY=exploded[1];co.arc(this.centerx+explodedX,this.centery+explodedY,prop['chart.animation.roundrobin.radius']?radius*prop['chart.animation.roundrobin.factor']:radius,startAngle,endAngle,0);co.lineTo(this.centerx+explodedX,this.centery+explodedY);co.closePath();co.stroke();co.fill();this.angles.push(gg=[startAngle,endAngle,0,radius,this.centerx+explodedX,this.centery+explodedY]);this.startRadians+=segmentRadians;}}else{var sequentialColorIndex=0;for(var i=0;i<this.data.length;++i){co.strokeStyle=prop['chart.strokestyle'];co.fillStyle=prop['chart.colors'][0];if(prop['chart.colors.sequential']){co.fillStyle=prop['chart.colors'][i];}
var segmentRadians=(1/this.data.length)*TWOPI;if(typeof(this.data[i])=='number'){co.beginPath();var radius=((this.data[i]-prop['chart.ymin'])/(this.max-prop['chart.ymin']))*this.radius;radius=radius*prop['chart.animation.grow.multiplier'];var startAngle=(this.startRadians*prop['chart.animation.roundrobin.factor'])-HALFPI+margin;var endAngle=(this.startRadians*prop['chart.animation.roundrobin.factor'])+(segmentRadians*prop['chart.animation.roundrobin.factor'])-HALFPI-margin;var exploded=this.getexploded(i,startAngle,endAngle,prop['chart.exploded']);var explodedX=exploded[0];var explodedY=exploded[1];co.arc(this.centerx+explodedX,this.centery+explodedY,prop['chart.animation.roundrobin.radius']?radius*prop['chart.animation.roundrobin.factor']:radius,startAngle,endAngle,0);co.lineTo(this.centerx+explodedX,this.centery+explodedY);co.closePath();co.stroke();co.fill();if(endAngle==0){}
this.angles.push([startAngle,endAngle,0,radius*prop['chart.animation.roundrobin.factor'],this.centerx+explodedX,this.centery+explodedY]);}else if(typeof(this.data[i])=='object'){var margin=prop['chart.margin']/(180/PI);if(!this.angles2[i]){this.angles2[i]=[];}
for(var j=0;j<this.data[i].length;++j){var startAngle=(this.startRadians*prop['chart.animation.roundrobin.factor'])-HALFPI+margin;var endAngle=(this.startRadians*prop['chart.animation.roundrobin.factor'])+(segmentRadians*prop['chart.animation.roundrobin.factor'])-HALFPI-margin;var exploded=this.getexploded(i,startAngle,endAngle,prop['chart.exploded']);var explodedX=exploded[0];var explodedY=exploded[1];co.fillStyle=prop['chart.colors'][j];if(prop['chart.colors.sequential']){co.fillStyle=prop['chart.colors'][sequentialColorIndex++];}
if(j==0){co.beginPath();var startRadius=0;var endRadius=((this.data[i][j]-prop['chart.ymin'])/(this.max-prop['chart.ymin']))*this.radius;endRadius=endRadius*prop['chart.animation.grow.multiplier'];co.arc(this.centerx+explodedX,this.centery+explodedY,prop['chart.animation.roundrobin.radius']?endRadius*prop['chart.animation.roundrobin.factor']:endRadius,startAngle,endAngle,0);co.lineTo(this.centerx+explodedX,this.centery+explodedY);co.closePath();co.stroke();co.fill();this.angles.push([startAngle,endAngle,0,endRadius*prop['chart.animation.roundrobin.factor'],this.centerx+explodedX,this.centery+explodedY]);this.angles2[i].push([startAngle,endAngle,0,endRadius*prop['chart.animation.roundrobin.factor'],this.centerx+explodedX,this.centery+explodedY]);}else{co.beginPath();var startRadius=endRadius;var endRadius=(((this.data[i][j]-prop['chart.ymin'])/(this.max-prop['chart.ymin']))*this.radius)+startRadius;endRadius=endRadius*prop['chart.animation.grow.multiplier'];co.arc(this.centerx+explodedX,this.centery+explodedY,startRadius*prop['chart.animation.roundrobin.factor'],startAngle,endAngle,0);co.arc(this.centerx+explodedX,this.centery+explodedY,endRadius*prop['chart.animation.roundrobin.factor'],endAngle,startAngle,true);co.closePath();co.stroke();co.fill();this.angles.push([startAngle,endAngle,startRadius*prop['chart.animation.roundrobin.factor'],endRadius*prop['chart.animation.roundrobin.factor'],this.centerx+explodedX,this.centery+explodedY]);this.angles2[i].push([startAngle,endAngle,startRadius*prop['chart.animation.roundrobin.factor'],endRadius*prop['chart.animation.roundrobin.factor'],this.centerx+explodedX,this.centery+explodedY]);}}}
this.startRadians+=segmentRadians;}}
if(prop['chart.colors.alpha']){co.globalAlpha=1;}
if(prop['chart.title']){RG.DrawTitle(this,prop['chart.title'],(ca.height/2)-this.radius,this.centerx,prop['chart.title.size']?prop['chart.title.size']:prop['chart.text.size']+2);}}
this.DrawLabels=function()
{co.lineWidth=1;var key=prop['chart.key'];if(key&&key.length){RG.DrawKey(this,key,prop['chart.colors']);}
co.fillStyle=prop['chart.text.color'];co.strokeStyle='black';var radius=this.radius;var font=prop['chart.text.font'];var size=prop['chart.text.size'];var axes=prop['chart.labels.axes'].toLowerCase();var decimals=prop['chart.scale.decimals'];var units_pre=prop['chart.units.pre'];var units_post=prop['chart.units.post'];var centerx=this.centerx;var centery=this.centery;if(typeof(prop['chart.labels'])=='object'&&prop['chart.labels']){this.DrawCircularLabels(co,prop['chart.labels'],font,size,radius+10);}
if(typeof(prop['chart.text.size.scale'])=='number'){size=prop['chart.text.size.scale'];}
var color='rgba(255,255,255,0.8)';if(axes.indexOf('n')>-1){for(var i=0;i<prop['chart.labels.count'];++i){RG.Text2(this,{'font':font,'size':size,'x':centerx,'y':centery-(radius*((i+1)/prop['chart.labels.count'])),'text':this.scale2.labels[i],'valign':'center','halign':'center','bounding':true,'boundingFill':color,'tag':'scale'});}}
if(axes.indexOf('s')>-1){for(var i=0;i<prop['chart.labels.count'];++i){RG.Text2(this,{'font':font,'size':size,'x':centerx,'y':centery+(radius*((i+1)/prop['chart.labels.count'])),'text':this.scale2.labels[i],'valign':'center','halign':'center','bounding':true,'boundingFill':color,'tag':'scale'});}}
if(axes.indexOf('e')>-1){for(var i=0;i<prop['chart.labels.count'];++i){RG.Text2(this,{'font':font,'size':size,'x':centerx+(radius*((i+1)/prop['chart.labels.count'])),'y':centery,'text':this.scale2.labels[i],'valign':'center','halign':'center','bounding':true,'boundingFill':color,'tag':'scale'});}}
if(axes.indexOf('w')>-1){for(var i=0;i<prop['chart.labels.count'];++i){RG.Text2(this,{'font':font,'size':size,'x':centerx-(radius*((i+1)/prop['chart.labels.count'])),'y':centery,'text':this.scale2.labels[i],'valign':'center','halign':'center','bounding':true,'boundingFill':color,'tag':'scale'});}}
if(axes.length>0){RG.Text2(this,{'font':font,'size':size,'x':centerx,'y':centery,'text':typeof(prop['chart.ymin'])=='number'?RG.number_format(this,Number(prop['chart.ymin']).toFixed(prop['chart.scale.decimals']),units_pre,units_post):'0','valign':'center','halign':'center','bounding':true,'boundingFill':color,'tag':'scale'});}}
this.DrawCircularLabels=function(co,labels,font,size,radius)
{var variant=prop['chart.variant'];var position=prop['chart.labels.position'];var radius=radius+5+prop['chart.labels.offset'];var centerx=this.centerx;var centery=this.centery;for(var i=0;i<labels.length;++i){if(typeof(variant)=='string'&&variant=='non-equi-angular'){var a=Number(this.angles[i][0])+((this.angles[i][1]-this.angles[i][0])/2);}else{var a=(TWOPI/labels.length)*(i+1)-(TWOPI/(labels.length*2));var a=a-HALFPI+(prop['chart.labels.position']=='edge'?((TWOPI/labels.length)/2):0);}
var x=centerx+(Math.cos(a)*radius);var y=centery+(Math.sin(a)*radius);if(x>centerx){halign='left';}else if(Math.round(x)==centerx){halign='center';}else{halign='right';}
RG.Text2(this,{'font':font,'size':size,'x':x,'y':y,'text':String(labels[i]),'halign':halign,'valign':'center','tag':'labels'});}}
this.getShape=this.getSegment=function(e)
{RG.FixEventObject(e);var angles=this.angles;var ret=[];for(var i=0;i<angles.length;++i){var angleStart=angles[i][0];var angleEnd=angles[i][1];var radiusStart=angles[i][2];var radiusEnd=angles[i][3];var centerX=angles[i][4];var centerY=angles[i][5];var mouseXY=RG.getMouseXY(e);var mouseX=mouseXY[0]-centerX;var mouseY=mouseXY[1]-centerY;co.beginPath();co.arc(centerX,centerY,radiusStart?radiusStart:0.01,angleStart,angleEnd,false);co.arc(centerX,centerY,radiusEnd,angleEnd,angleStart,true);co.closePath();if(co.isPointInPath(mouseXY[0],mouseXY[1])){angles[i][6]=i;if(RG.parseTooltipText){var tooltip=RG.parseTooltipText(prop['chart.tooltips'],angles[i][6]);}
angles[i]['object']=this;angles[i]['x']=angles[i][4];angles[i]['y']=angles[i][5];angles[i]['angle.start']=angles[i][0];angles[i]['angle.end']=angles[i][1];angles[i]['radius.start']=angles[i][2];angles[i]['radius.end']=angles[i][3];angles[i]['index']=angles[i][6];angles[i]['tooltip']=tooltip?tooltip:null;return angles[i];}}
return null;}
this.getexploded=function(index,startAngle,endAngle,exploded)
{var explodedx,explodedy;if(typeof(exploded)=='object'&&typeof(exploded[index])=='number'){explodedx=Math.cos(((endAngle-startAngle)/2)+startAngle)*exploded[index];explodedy=Math.sin(((endAngle-startAngle)/2)+startAngle)*exploded[index];}else if(typeof(exploded)=='number'){explodedx=Math.cos(((endAngle-startAngle)/2)+startAngle)*exploded;explodedy=Math.sin(((endAngle-startAngle)/2)+startAngle)*exploded;}else{explodedx=0;explodedy=0;}
return[explodedx,explodedy];}
this.AllowTooltips=function()
{RG.PreLoadTooltipImages(this);RG.InstallWindowMousedownTooltipListener(this);RG.InstallCanvasMousemoveTooltipListener(this);RG.InstallCanvasMouseupTooltipListener(this);}
this.Highlight=function(shape)
{if(prop['chart.tooltips.highlight']){co.beginPath();co.strokeStyle=prop['chart.highlight.stroke'];co.fillStyle=prop['chart.highlight.fill'];co.arc(shape['x'],shape['y'],shape['radius.end'],shape['angle.start'],shape['angle.end'],false);if(shape['radius.start']>0){co.arc(shape['x'],shape['y'],shape['radius.start'],shape['angle.end'],shape['angle.start'],true);}else{co.lineTo(shape['x'],shape['y']);}
co.closePath();co.stroke();co.fill();}}
this.getObjectByXY=function(e)
{var mouseXY=RGraph.getMouseXY(e);var radius=RG.getHypLength(this.centerx,this.centery,mouseXY[0],mouseXY[1]);if(mouseXY[0]>(this.centerx-this.radius)&&mouseXY[0]<(this.centerx+this.radius)&&mouseXY[1]>(this.centery-this.radius)&&mouseXY[1]<(this.centery+this.radius)&&radius<=this.radius){return this;}}
this.positionTooltip=function(obj,x,y,tooltip,idx)
{var coordX=obj.angles[idx][4];var coordY=obj.angles[idx][5];var angleStart=obj.angles[idx][0];var angleEnd=obj.angles[idx][1];var radius=((obj.angles[idx][3]-obj.angles[idx][2])/2)+obj.angles[idx][2];var angleCenter=((angleEnd-angleStart)/2)+angleStart;var canvasXY=RG.getCanvasXY(obj.canvas);var gutterLeft=this.gutterLeft;var gutterTop=this.gutterTop;var width=tooltip.offsetWidth;var height=tooltip.offsetHeight;tooltip.style.overflow='';var img=new Image();img.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAFCAYAAACjKgd3AAAARUlEQVQYV2NkQAN79+797+RkhC4M5+/bd47B2dmZEVkBCgcmgcsgbAaA9GA1BCSBbhAuA/AagmwQPgMIGgIzCD0M0AMMAEFVIAa6UQgcAAAAAElFTkSuQmCC';img.style.position='absolute';img.id='__rgraph_tooltip_pointer__';img.style.top=(tooltip.offsetHeight-2)+'px';tooltip.appendChild(img);if((canvasXY[0]+coordX+(Math.cos(angleCenter)*radius)-(width/2))<10){tooltip.style.left=(canvasXY[0]+coordX+(Math.cos(angleCenter)*radius)-(width*0.1))+'px';tooltip.style.top=(canvasXY[1]+coordY+(Math.sin(angleCenter)*radius)-height-5)+'px';img.style.left=((width*0.1)-8.5)+'px';}else if((canvasXY[0]+coordX+(Math.cos(angleCenter)*radius)+(width/2))>(document.body.offsetWidth-10)){tooltip.style.left=(canvasXY[0]+coordX+(Math.cos(angleCenter)*radius)-(width*0.9))+'px';tooltip.style.top=(canvasXY[1]+coordY+(Math.sin(angleCenter)*radius)-height-5)+'px';img.style.left=((width*0.9)-8.5)+'px';}else{tooltip.style.left=(canvasXY[0]+coordX+(Math.cos(angleCenter)*radius)-(width/2))+'px';tooltip.style.top=(canvasXY[1]+coordY+(Math.sin(angleCenter)*radius)-height-5)+'px';img.style.left=((width*0.5)-8.5)+'px';}}
this.getRadius=function(value)
{if(value<0||value>this.max){return null;}
var r=(value/this.max)*this.radius;return r;}
this.parseColors=function()
{for(var i=0;i<prop['chart.colors'].length;++i){prop['chart.colors'][i]=this.parseSingleColorForGradient(prop['chart.colors'][i]);}
if(!RG.is_null(prop['chart.key.colors'])){for(var i=0;i<prop['chart.key.colors'].length;++i){prop['chart.key.colors'][i]=this.parseSingleColorForGradient(prop['chart.key.colors'][i]);}}
prop['chart.text.color']=this.parseSingleColorForGradient(prop['chart.text.color']);prop['chart.title.color']=this.parseSingleColorForGradient(prop['chart.title.color']);prop['chart.highlight.fill']=this.parseSingleColorForGradient(prop['chart.highlight.fill']);prop['chart.highlight.stroke']=this.parseSingleColorForGradient(prop['chart.highlight.stroke']);}
this.parseSingleColorForGradient=function(color)
{if(!color||typeof(color)!='string'){return color;}
if(color.match(/^gradient\((.*)\)$/i)){var parts=RegExp.$1.split(':');var grad=co.createRadialGradient(this.centerx,this.centery,0,this.centerx,this.centery,this.radius);var diff=1/(parts.length-1);grad.addColorStop(0,RG.trim(parts[0]));for(var j=1;j<parts.length;++j){grad.addColorStop(j*diff,RG.trim(parts[j]));}}
return grad?grad:color;}
this.interactiveKeyHighlight=function(index)
{this.angles2.forEach(function(val,idx,arr)
{var segment=val[index];if(segment){co.beginPath();co.lineWidth=2;co.fillStyle=prop['chart.key.interactive.highlight.chart.fill'];co.strokeStyle=prop['chart.key.interactive.highlight.chart.stroke'];co.arc(segment[4],segment[5],segment[2],segment[0],segment[1],false);co.arc(segment[4],segment[5],segment[3],segment[1],segment[0],true);co.closePath();co.fill();co.stroke();}});}
RG.Register(this);}