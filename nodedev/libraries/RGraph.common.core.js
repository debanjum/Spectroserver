
if(typeof(RGraph)=='undefined')RGraph={isRGraph:true,type:'common'};RGraph.Highlight={};RGraph.Registry={};RGraph.Registry.store=[];RGraph.Registry.store['chart.event.handlers']=[];RGraph.Registry.store['__rgraph_event_listeners__']=[];RGraph.background={};RGraph.objects=[];RGraph.Resizing={};RGraph.events=[];RGraph.cursor=[];RGraph.ObjectRegistry={};RGraph.ObjectRegistry.objects={};RGraph.ObjectRegistry.objects.byUID=[];RGraph.ObjectRegistry.objects.byCanvasID=[];PI=Math.PI;HALFPI=PI/2;TWOPI=PI*2;ISFF=navigator.userAgent.indexOf('Firefox')!=-1;ISOPERA=navigator.userAgent.indexOf('Opera')!=-1;ISCHROME=navigator.userAgent.indexOf('Chrome')!=-1;ISSAFARI=navigator.userAgent.indexOf('Safari')!=-1&&!ISCHROME;ISWEBKIT=navigator.userAgent.indexOf('WebKit')!=-1;RGraph.getScale=function(max,obj)
{if(max==0){return['0.2','0.4','0.6','0.8','1.0'];}
var original_max=max;if(max<=1){if(max>0.5){return[0.2,0.4,0.6,0.8,Number(1).toFixed(1)];}else if(max>=0.1){return obj.Get('chart.scale.round')?[0.2,0.4,0.6,0.8,1]:[0.1,0.2,0.3,0.4,0.5];}else{var tmp=max;var exp=0;while(tmp<1.01){exp+=1;tmp*=10;}
var ret=['2e-'+exp,'4e-'+exp,'6e-'+exp,'8e-'+exp,'10e-'+exp];if(max<=('5e-'+exp)){ret=['1e-'+exp,'2e-'+exp,'3e-'+exp,'4e-'+exp,'5e-'+exp];}
return ret;}}
if(String(max).indexOf('.')>0){max=String(max).replace(/\.\d+$/,'');}
var interval=Math.pow(10,Number(String(Number(max)).length-1));var topValue=interval;while(topValue<max){topValue+=(interval/2);}
if(Number(original_max)>Number(topValue)){topValue+=(interval/2);}
if(max<10){topValue=(Number(original_max)<=5?5:10);}
if(obj&&typeof(obj.Get('chart.scale.round'))=='boolean'&&obj.Get('chart.scale.round')){topValue=10*interval;}
return[topValue*0.2,topValue*0.4,topValue*0.6,topValue*0.8,topValue];}
RGraph.getScale2=function(obj,opt)
{var RG=RGraph;var ca=obj.canvas;var co=obj.context;var prop=obj.properties;var numlabels=typeof(opt['ylabels.count'])=='number'?opt['ylabels.count']:5;var units_pre=typeof(opt['units.pre'])=='string'?opt['units.pre']:'';var units_post=typeof(opt['units.post'])=='string'?opt['units.post']:'';var max=Number(opt['max']);var min=typeof(opt['min'])=='number'?opt['min']:0;var strict=opt['strict'];var decimals=Number(opt['scale.decimals']);var point=opt['scale.point'];var thousand=opt['scale.thousand'];var original_max=max;var round=opt['scale.round'];var scale={'max':1,'labels':[]};if(!max){var max=1;var scale={max:1,min:0,labels:[]};for(var i=0;i<numlabels;++i){var label=((((max-min)/numlabels)+min)*(i+1)).toFixed(decimals);scale.labels.push(units_pre+label+units_post);}}else if(max<=1&&!strict){if(max>0.5){max=1;min=min;scale.min=min;for(var i=0;i<numlabels;++i){var label=((((max-min)/numlabels)*(i+1))+min).toFixed(decimals);scale.labels.push(units_pre+label+units_post);}}else if(max>=0.1){max=0.5;min=min;scale={'max':0.5,'min':min,'labels':[]}
for(var i=0;i<numlabels;++i){var label=((((max-min)/numlabels)+min)*(i+1)).toFixed(decimals);scale.labels.push(units_pre+label+units_post);}}else{scale={'min':min,'labels':[]}
var max_str=String(max);if(max_str.indexOf('e')>0){var numdecimals=Math.abs(max_str.substring(max_str.indexOf('e')+1));}else{var numdecimals=String(max).length-2;}
var max=1/Math.pow(10,numdecimals-1);for(var i=0;i<numlabels;++i){var label=((((max-min)/numlabels)+min)*(i+1));label=label.toExponential();label=label.split(/e/);label[0]=Math.round(label[0]);label=label.join('e');scale.labels.push(label);}
tmp=scale.labels[scale.labels.length-1].split(/e/);tmp[0]+=0;tmp[1]=Number(tmp[1])-1;tmp=tmp[0]+'e'+tmp[1];scale.labels[scale.labels.length-1]=tmp;for(var i=0;i<scale.labels.length;++i){scale.labels[i]=units_pre+scale.labels[i]+units_post;}
scale.max=Number(max);}}else if(!strict){max=Math.ceil(max);var interval=Math.pow(10,Math.max(1,Number(String(Number(max)-Number(min)).length-1)));var topValue=interval;while(topValue<max){topValue+=(interval/2);}
if(Number(original_max)>Number(topValue)){topValue+=(interval/2);}
if(max<=10){topValue=(Number(original_max)<=5?5:10);}
if(obj&&typeof(round)=='boolean'&&round){topValue=10*interval;}
scale.max=topValue;var tmp_point=prop['chart.scale.point'];var tmp_thousand=prop['chart.scale.thousand'];obj.Set('chart.scale.thousand',thousand);obj.Set('chart.scale.point',point);for(var i=0;i<numlabels;++i){scale.labels.push(RG.number_format(obj,((((i+1)/numlabels)*(topValue-min))+min).toFixed(decimals),units_pre,units_post));}
obj.Set('chart.scale.thousand',tmp_thousand);obj.Set('chart.scale.point',tmp_point);}else if(typeof(max)=='number'&&strict){for(var i=0;i<numlabels;++i){scale.labels.push(RG.number_format(obj,((((i+1)/numlabels)*(max-min))+min).toFixed(decimals),units_pre,units_post));}
scale.max=max;}
scale.units_pre=units_pre;scale.units_post=units_post;scale.point=point;scale.decimals=decimals;scale.thousand=thousand;scale.numlabels=numlabels;scale.round=Boolean(round);scale.min=min;return scale;}
RGraph.array_max=function(arr)
{var max=null;var MathLocal=Math;if(typeof(arr)=='number'){return arr;}
if(RGraph.is_null(arr)){return 0;}
for(var i=0,len=arr.length;i<len;++i){if(typeof(arr[i])=='number'){var val=arguments[1]?MathLocal.abs(arr[i]):arr[i];if(typeof max=='number'){max=MathLocal.max(max,val);}else{max=val;}}}
return max;}
RGraph.array_pad=function(arr,len)
{if(arr.length<len){var val=arguments[2]?arguments[2]:null;for(var i=arr.length;i<len;i+=1){arr[i]=val;}}
return arr;}
RGraph.array_sum=function(arr)
{if(typeof(arr)=='number'){return arr;}
if(RGraph.is_null(arr)){return 0;}
var i,sum;var len=arr.length;for(i=0,sum=0;i<len;sum+=arr[i++]);return sum;}
RGraph.array_linearize=function()
{var arr=[];var args=arguments;var RG=RGraph;for(var i=0,len=args.length;i<len;++i){if(typeof(args[i])=='object'&&args[i]){for(var j=0;j<args[i].length;++j){var sub=RG.array_linearize(args[i][j]);for(var k=0;k<sub.length;++k){arr.push(sub[k]);}}}else{arr.push(args[i]);}}
return arr;}
RGraph.Text=function(context,font,size,x,y,text)
{var args=arguments;if((typeof(text)!='string'&&typeof(text)!='number')||text=='undefined'){return;}
if(typeof(text)=='string'&&text.match(/\r\n/)){var dimensions=RGraph.MeasureText('M',args[11],font,size);var arr=text.split('\r\n');if(args[6]&&args[6]=='center')y=(y-(dimensions[1]*((arr.length-1)/2)));for(var i=1;i<arr.length;++i){RGraph.Text(context,font,size,args[9]==-90?(x+(size*1.5)):x,y+(dimensions[1]*i),arr[i],args[6]?args[6]:null,args[7],args[8],args[9],args[10],args[11],args[12]);}
text=arr[0];}
if(document.all&&ISOLD){y+=2;}
context.font=(args[11]?'Bold ':'')+size+'pt '+font;var i;var origX=x;var origY=y;var originalFillStyle=context.fillStyle;var originalLineWidth=context.lineWidth;if(typeof(args[6])=='undefined')args[6]='bottom';if(typeof(args[7])=='undefined')args[7]='left';if(typeof(args[8])=='undefined')args[8]=null;if(typeof(args[9])=='undefined')args[9]=0;if(navigator.userAgent.indexOf('Opera')!=-1){context.canvas.__rgraph_valign__=args[6];context.canvas.__rgraph_halign__=args[7];}
context.save();context.canvas.__rgraph_originalx__=x;context.canvas.__rgraph_originaly__=y;context.translate(x,y);x=0;y=0;if(args[9]){context.rotate(args[9]/(180/PI));}
if(args[6]){var vAlign=args[6];if(vAlign=='center'){context.textBaseline='middle';}else if(vAlign=='top'){context.textBaseline='top';}}
if(args[7]){var hAlign=args[7];var width=context.measureText(text).width;if(hAlign){if(hAlign=='center'){context.textAlign='center';}else if(hAlign=='right'){context.textAlign='right';}}}
context.fillStyle=originalFillStyle;context.save();context.fillText(text,0,0);context.lineWidth=1;var width=context.measureText(text).width;var width_offset=(hAlign=='center'?(width/2):(hAlign=='right'?width:0));var height=size*1.5;var height_offset=(vAlign=='center'?(height/2):(vAlign=='top'?height:0));var ieOffset=ISOLD?2:0;if(args[8]){context.strokeRect(-3-width_offset,0-3-height-ieOffset+height_offset,width+6,height+6);if(args[10]){context.fillStyle=args[10];context.fillRect(-3-width_offset,0-3-height-ieOffset+height_offset,width+6,height+6);}
context.fillStyle=originalFillStyle;context.fillText(text,0,0);}
context.restore();context.lineWidth=originalLineWidth;context.restore();}
RGraph.Clear=function(ca)
{var RG=RGraph;var co=ca.getContext('2d');var color=arguments[1];if(!ca){return;}
RG.FireCustomEvent(ca.__object__,'onbeforeclear');if(ISIE8&&!color){color='white';}
if(!color||(color&&color=='rgba(0,0,0,0)'||color=='transparent')){co.clearRect(0,0,ca.width,ca.height);co.globalCompositeOperation='source-over';}else{co.fillStyle=color;co.beginPath();if(ISIE8){co.fillRect(0,0,ca.width,ca.height);}else{co.fillRect(-10,-10,ca.width+20,ca.height+20);}
co.fill();}
if(RG.Registry.Get('chart.background.image.'+ca.id)){var img=RG.Registry.Get('chart.background.image.'+ca.id);img.style.position='absolute';img.style.left='-10000px';img.style.top='-10000px';}
if(RG.Registry.Get('chart.tooltip')){RG.HideTooltip(ca);}
ca.style.cursor='default';RG.FireCustomEvent(ca.__object__,'onclear');}
RGraph.DrawTitle=function(obj,text,gutterTop)
{var RG=RGraph;var ca=canvas=obj.canvas;var co=context=obj.context;var prop=obj.properties;var gutterLeft=prop['chart.gutter.left'];var gutterRight=prop['chart.gutter.right'];var gutterTop=gutterTop;var gutterBottom=prop['chart.gutter.bottom'];var size=arguments[4]?arguments[4]:12;var bold=prop['chart.title.bold'];var centerx=(arguments[3]?arguments[3]:((ca.width-gutterLeft-gutterRight)/2)+gutterLeft);var keypos=prop['chart.key.position'];var vpos=prop['chart.title.vpos'];var hpos=prop['chart.title.hpos'];var bgcolor=prop['chart.title.background'];var x=prop['chart.title.x'];var y=prop['chart.title.y'];var halign='center';var valign='center';if(obj.type=='bar'&&prop['chart.variant']=='3d'){keypos='gutter';}
co.beginPath();co.fillStyle=prop['chart.text.color']?prop['chart.text.color']:'black';if(keypos&&keypos!='gutter'){var valign='center';}else if(!keypos){var valign='center';}else{var valign='bottom';}
if(typeof(prop['chart.title.vpos'])=='number'){vpos=prop['chart.title.vpos']*gutterTop;if(prop['chart.xaxispos']=='top'){vpos=prop['chart.title.vpos']*gutterBottom+gutterTop+(ca.height-gutterTop-gutterBottom);}}else{vpos=gutterTop-size-5;if(prop['chart.xaxispos']=='top'){vpos=ca.height-gutterBottom+size+5;}}
if(typeof(hpos)=='number'){centerx=hpos*ca.width;}
if(typeof(x)=='number')centerx=x;if(typeof(y)=='number')vpos=y;if(typeof(prop['chart.title.halign'])=='string'){halign=prop['chart.title.halign'];}
if(typeof(prop['chart.title.valign'])=='string'){valign=prop['chart.title.valign'];}
if(typeof(prop['chart.title.color']!=null)){var oldColor=co.fillStyle
var newColor=prop['chart.title.color']
co.fillStyle=newColor?newColor:'black';}
var font=prop['chart.text.font'];if(typeof(prop['chart.title.font'])=='string'){font=prop['chart.title.font'];}
RG.Text2(obj,{'font':font,'size':size,'x':centerx,'y':vpos,'text':text,'valign':valign,'halign':halign,'bounding':bgcolor!=null,'bounding.fill':bgcolor,'bold':bold,'tag':'title'});co.fillStyle=oldColor;}
RGraph.getMouseXY=function(e)
{var el=e.target;var ca=el;var caStyle=ca.style;var offsetX=0;var offsetY=0;var x;var y;var ISFIXED=(ca.style.position=='fixed');var borderLeft=parseInt(caStyle.borderLeftWidth)||0;var borderTop=parseInt(caStyle.borderTopWidth)||0;var paddingLeft=parseInt(caStyle.paddingLeft)||0
var paddingTop=parseInt(caStyle.paddingTop)||0
var additionalX=borderLeft+paddingLeft;var additionalY=borderTop+paddingTop;if(typeof(e.offsetX)=='number'&&typeof(e.offsetY)=='number'){if(ISFIXED){if(ISOPERA){x=e.offsetX;y=e.offsetY;}else if(ISWEBKIT){x=e.offsetX-paddingLeft-borderLeft;y=e.offsetY-paddingTop-borderTop;}else if(ISIE){x=e.offsetX-paddingLeft;y=e.offsetY-paddingTop;}else{x=e.offsetX;y=e.offsetY;}}else{if(!ISIE&&!ISOPERA){x=e.offsetX-borderLeft-paddingLeft;y=e.offsetY-borderTop-paddingTop;}else if(ISIE){x=e.offsetX-paddingLeft;y=e.offsetY-paddingTop;}else{x=e.offsetX;y=e.offsetY;}}}else{if(typeof(el.offsetParent)!='undefined'){do{offsetX+=el.offsetLeft;offsetY+=el.offsetTop;}while((el=el.offsetParent));}
x=e.pageX-offsetX-additionalX;y=e.pageY-offsetY-additionalY;x-=(2*(parseInt(document.body.style.borderLeftWidth)||0));y-=(2*(parseInt(document.body.style.borderTopWidth)||0));}
return[x,y];}
RGraph.getCanvasXY=function(canvas)
{var x=0;var y=0;var el=canvas;do{x+=el.offsetLeft;y+=el.offsetTop;if(el.tagName.toLowerCase()=='table'&&(ISCHROME||ISSAFARI)){x+=parseInt(el.border)||0;y+=parseInt(el.border)||0;}
el=el.offsetParent;}while(el&&el.tagName.toLowerCase()!='body');var paddingLeft=canvas.style.paddingLeft?parseInt(canvas.style.paddingLeft):0;var paddingTop=canvas.style.paddingTop?parseInt(canvas.style.paddingTop):0;var borderLeft=canvas.style.borderLeftWidth?parseInt(canvas.style.borderLeftWidth):0;var borderTop=canvas.style.borderTopWidth?parseInt(canvas.style.borderTopWidth):0;if(navigator.userAgent.indexOf('Firefox')>0){x+=parseInt(document.body.style.borderLeftWidth)||0;y+=parseInt(document.body.style.borderTopWidth)||0;}
return[x+paddingLeft+borderLeft,y+paddingTop+borderTop];}
RGraph.isFixed=function(canvas)
{var obj=canvas;var i=0;while(obj&&obj.tagName.toLowerCase()!='body'&&i<99){if(obj.style.position=='fixed'){return obj;}
obj=obj.offsetParent;}
return false;}
RGraph.Register=function(obj)
{if(!obj.Get('chart.noregister')){RGraph.ObjectRegistry.Add(obj);obj.Set('chart.noregister',true);}}
RGraph.Redraw=function()
{var objectRegistry=RGraph.ObjectRegistry.objects.byCanvasID;var tags=document.getElementsByTagName('canvas');for(var i=0,len=tags.length;i<len;++i){if(tags[i].__object__&&tags[i].__object__.isRGraph){if(!tags[i].noclear){RGraph.Clear(tags[i],arguments[0]?arguments[0]:null);}}}
for(var i=0,len=objectRegistry.length;i<len;++i){if(objectRegistry[i]){var id=objectRegistry[i][0];objectRegistry[i][1].Draw();}}}
RGraph.RedrawCanvas=function(canvas)
{var objects=RGraph.ObjectRegistry.getObjectsByCanvasID(canvas.id);if(!arguments[1]||(typeof(arguments[1])=='boolean'&&!arguments[1]==false)){RGraph.Clear(canvas);}
for(var i=0,len=objects.length;i<len;++i){if(objects[i]){if(objects[i]&&objects[i].isRGraph){objects[i].Draw();}}}}
RGraph.background.Draw=function(obj)
{var RG=RGraph;var ca=canvas=obj.canvas;var co=context=obj.context;var prop=obj.properties;var height=0;var gutterLeft=obj.gutterLeft;var gutterRight=obj.gutterRight;var gutterTop=obj.gutterTop;var gutterBottom=obj.gutterBottom;var variant=prop['chart.variant'];co.fillStyle=prop['chart.text.color'];if(variant=='3d'){co.save();co.translate(10,-5);}
if(typeof(prop['chart.title.xaxis'])=='string'&&prop['chart.title.xaxis'].length){var size=prop['chart.text.size']+2;var font=prop['chart.text.font'];var bold=prop['chart.title.xaxis.bold'];if(typeof(prop['chart.title.xaxis.size'])=='number'){size=prop['chart.title.xaxis.size'];}
if(typeof(prop['chart.title.xaxis.font'])=='string'){font=prop['chart.title.xaxis.font'];}
var hpos=((ca.width-gutterLeft-gutterRight)/2)+gutterLeft;var vpos=ca.height-gutterBottom+25;if(typeof(prop['chart.title.xaxis.pos'])=='number'){vpos=ca.height-(gutterBottom*prop['chart.title.xaxis.pos']);}
RG.Text2(obj,{'font':font,'size':size,'x':hpos,'y':vpos,'text':prop['chart.title.xaxis'],'halign':'center','valign':'center','bold':bold,'tag':'title xaxis'});}
if(typeof(prop['chart.title.yaxis'])=='string'&&prop['chart.title.yaxis'].length){var size=prop['chart.text.size']+2;var font=prop['chart.text.font'];var angle=270;var bold=prop['chart.title.yaxis.bold'];var color=prop['chart.title.yaxis.color'];if(typeof(prop['chart.title.yaxis.pos'])=='number'){var yaxis_title_pos=prop['chart.title.yaxis.pos']*gutterLeft;}else{var yaxis_title_pos=((gutterLeft-25)/gutterLeft)*gutterLeft;}
if(typeof(prop['chart.title.yaxis.size'])=='number'){size=prop['chart.title.yaxis.size'];}
if(typeof(prop['chart.title.yaxis.font'])=='string'){font=prop['chart.title.yaxis.font'];}
if(prop['chart.title.yaxis.align']=='right'||prop['chart.title.yaxis.position']=='right'){angle=90;yaxis_title_pos=prop['chart.title.yaxis.pos']?(ca.width-gutterRight)+(prop['chart.title.yaxis.pos']*gutterRight):ca.width-gutterRight+prop['chart.text.size']+5;}else{yaxis_title_pos=yaxis_title_pos;}
co.fillStyle=color;RG.Text2(obj,{'font':font,'size':size,'x':yaxis_title_pos,'y':((ca.height-gutterTop-gutterBottom)/2)+gutterTop,'valign':'center','halign':'center','angle':angle,'bold':bold,'text':prop['chart.title.yaxis'],'tag':'title yaxis'});}
var bgcolor=prop['chart.background.color'];if(bgcolor){co.fillStyle=bgcolor;co.fillRect(gutterLeft,gutterTop,ca.width-gutterLeft-gutterRight,ca.height-gutterTop-gutterBottom);}
co.beginPath();co.fillStyle=prop['chart.background.barcolor1'];co.strokeStyle=co.fillStyle;height=(ca.height-gutterBottom);for(var i=gutterTop;i<height;i+=80){co.fillRect(gutterLeft,i,ca.width-gutterLeft-gutterRight,Math.min(40,ca.height-gutterBottom-i));}
co.fillStyle=prop['chart.background.barcolor2'];co.strokeStyle=co.fillStyle;height=(ca.height-gutterBottom);for(var i=(40+gutterTop);i<height;i+=80){co.fillRect(gutterLeft,i,ca.width-gutterLeft-gutterRight,i+40>(ca.height-gutterBottom)?ca.height-(gutterBottom+i):40);}
co.beginPath();if(prop['chart.background.grid']){if(prop['chart.background.grid.autofit']){if(prop['chart.background.grid.autofit.align']){obj.Set('chart.background.grid.autofit.numhlines',prop['chart.ylabels.count']);if(obj.type=='line'){if(prop['chart.labels']&&prop['chart.labels'].length){obj.Set('chart.background.grid.autofit.numvlines',prop['chart.labels'].length-1);}else{obj.Set('chart.background.grid.autofit.numvlines',obj.data[0].length-1);}}else if(obj.type=='bar'&&prop['chart.labels']&&prop['chart.labels'].length){obj.Set('chart.background.grid.autofit.numvlines',prop['chart.labels'].length);}}
var vsize=((ca.width-gutterLeft-gutterRight))/prop['chart.background.grid.autofit.numvlines'];var hsize=(ca.height-gutterTop-gutterBottom)/prop['chart.background.grid.autofit.numhlines'];obj.Set('chart.background.grid.vsize',vsize);obj.Set('chart.background.grid.hsize',hsize);}
co.beginPath();co.lineWidth=prop['chart.background.grid.width']?prop['chart.background.grid.width']:1;co.strokeStyle=prop['chart.background.grid.color'];if(prop['chart.background.grid.dashed']&&typeof co.setLineDash=='function'){co.setLineDash([3,2]);}
if(prop['chart.background.grid.dotted']&&typeof co.setLineDash=='function'){co.setLineDash([1,2]);}
if(prop['chart.background.grid.hlines']){height=(ca.height-gutterBottom)
for(y=gutterTop;y<height;y+=prop['chart.background.grid.hsize']){context.moveTo(gutterLeft,Math.round(y));context.lineTo(ca.width-gutterRight,Math.round(y));}}
if(prop['chart.background.grid.vlines']){var width=(ca.width-gutterRight)
for(x=gutterLeft;x<=width;x+=prop['chart.background.grid.vsize']){co.moveTo(Math.round(x),gutterTop);co.lineTo(Math.round(x),ca.height-gutterBottom);}}
if(prop['chart.background.grid.border']){co.strokeStyle=prop['chart.background.grid.color'];co.strokeRect(Math.round(gutterLeft),Math.round(gutterTop),ca.width-gutterLeft-gutterRight,ca.height-gutterTop-gutterBottom);}}
context.stroke();if(typeof co.setLineDash=='function'){co.setLineDash([1,0]);}
if(variant=='3d'){co.restore();}
if(typeof(prop['chart.title'])=='string'){if(obj.type=='gantt'){gutterTop-=10;}
RG.DrawTitle(obj,prop['chart.title'],gutterTop,null,prop['chart.title.size']?prop['chart.title.size']:prop['chart.text.size']+2);}
co.stroke();}
RGraph.array_clone=function(obj)
{var RG=RGraph;if(obj==null||typeof(obj)!='object'){return obj;}
var temp=[];for(var i=0,len=obj.length;i<len;++i){if(typeof(obj[i])=='number'){temp[i]=(function(arg){return Number(arg);})(obj[i]);}else if(typeof(obj[i])=='string'){temp[i]=(function(arg){return String(arg);})(obj[i]);}else if(typeof(obj[i])=='function'){temp[i]=obj[i];}else{temp[i]=RG.array_clone(obj[i]);}}
return temp;}
RGraph.number_format=function(obj,num)
{var RG=RGraph;var ca=obj.canvas;var co=obj.context;var prop=obj.properties;var i;var prepend=arguments[2]?String(arguments[2]):'';var append=arguments[3]?String(arguments[3]):'';var output='';var decimal='';var decimal_seperator=typeof(prop['chart.scale.point'])=='string'?prop['chart.scale.point']:'.';var thousand_seperator=typeof(prop['chart.scale.thousand'])=='string'?prop['chart.scale.thousand']:',';RegExp.$1='';var i,j;if(typeof(prop['chart.scale.formatter'])=='function'){return prop['chart.scale.formatter'](obj,num);}
if(String(num).indexOf('e')>0){return String(prepend+String(num)+append);}
num=String(num);if(num.indexOf('.')>0){var tmp=num;num=num.replace(/\.(.*)/,'');decimal=tmp.replace(/(.*)\.(.*)/,'$2');}
var seperator=thousand_seperator;var foundPoint;for(i=(num.length-1),j=0;i>=0;j++,i--){var character=num.charAt(i);if(j%3==0&&j!=0){output+=seperator;}
output+=character;}
var rev=output;output='';for(i=(rev.length-1);i>=0;i--){output+=rev.charAt(i);}
if(output.indexOf('-'+prop['chart.scale.thousand'])==0){output='-'+output.substr(('-'+prop['chart.scale.thousand']).length);}
if(decimal.length){output=output+decimal_seperator+decimal;decimal='';RegExp.$1='';}
if(output.charAt(0)=='-'){output=output.replace(/-/,'');prepend='-'+prepend;}
return prepend+output+append;}
RGraph.DrawBars=function(obj)
{var prop=obj.properties;var co=obj.context;var ca=obj.canvas;var RG=RGraph;var hbars=prop['chart.background.hbars'];if(hbars===null){return;}
co.beginPath();for(i=0,len=hbars.length;i<len;++i){var start=hbars[i][0];var length=hbars[i][1];var color=hbars[i][2];if(RG.is_null(start))start=obj.scale2.max
if(start>obj.scale2.max)start=obj.scale2.max;if(RG.is_null(length))length=obj.scale2.max-start;if(start+length>obj.scale2.max)length=obj.scale2.max-start;if(start+length<(-1*obj.scale2.max))length=(-1*obj.scale2.max)-start;if(prop['chart.xaxispos']=='center'&&start==obj.scale2.max&&length<(obj.scale2.max*-2)){length=obj.scale2.max*-2;}
var x=prop['chart.gutter.left'];var y=obj.getYCoord(start);var w=ca.width-prop['chart.gutter.left']-prop['chart.gutter.right'];var h=obj.getYCoord(start+length)-y;if(ISOPERA!=-1&&prop['chart.xaxispos']=='center'&&h<0){h*=-1;y=y-h;}
if(prop['chart.xaxispos']=='top'){y=ca.height-y;h*=-1;}
co.fillStyle=color;co.fillRect(x,y,w,h);}}
RGraph.DrawInGraphLabels=function(obj)
{var RG=RGraph;var ca=obj.canvas;var co=obj.context;var prop=obj.properties;var labels=prop['chart.labels.ingraph'];var labels_processed=[];var fgcolor='black';var bgcolor='white';var direction=1;if(!labels){return;}
for(var i=0,len=labels.length;i<len;i+=1){if(typeof(labels[i])=='number'){for(var j=0;j<labels[i];++j){labels_processed.push(null);}}else if(typeof(labels[i])=='string'||typeof(labels[i])=='object'){labels_processed.push(labels[i]);}else{labels_processed.push('');}}
RG.NoShadow(obj);if(labels_processed&&labels_processed.length>0){for(var i=0,len=labels_processed.length;i<len;++i){if(labels_processed[i]){var coords=obj.coords[i];if(coords&&coords.length>0){var x=(obj.type=='bar'?coords[0]+(coords[2]/2):coords[0]);var y=(obj.type=='bar'?coords[1]+(coords[3]/2):coords[1]);var length=typeof(labels_processed[i][4])=='number'?labels_processed[i][4]:25;co.beginPath();co.fillStyle='black';co.strokeStyle='black';if(obj.type=='bar'){if(obj.Get('chart.xaxispos')=='top'){length*=-1;}
if(prop['chart.variant']=='dot'){co.moveTo(Math.round(x),obj.coords[i][1]-5);co.lineTo(Math.round(x),obj.coords[i][1]-5-length);var text_x=Math.round(x);var text_y=obj.coords[i][1]-5-length;}else if(prop['chart.variant']=='arrow'){co.moveTo(Math.round(x),obj.coords[i][1]-5);co.lineTo(Math.round(x),obj.coords[i][1]-5-length);var text_x=Math.round(x);var text_y=obj.coords[i][1]-5-length;}else{co.arc(Math.round(x),y,2.5,0,6.28,0);co.moveTo(Math.round(x),y);co.lineTo(Math.round(x),y-length);var text_x=Math.round(x);var text_y=y-length;}
co.stroke();co.fill();}else if(obj.type=='line'){if(typeof(labels_processed[i])=='object'&&typeof(labels_processed[i][3])=='number'&&labels_processed[i][3]==-1){co.moveTo(Math.round(x),y+5);co.lineTo(Math.round(x),y+5+length);co.stroke();co.beginPath();co.moveTo(Math.round(x),y+5);co.lineTo(Math.round(x)-3,y+10);co.lineTo(Math.round(x)+3,y+10);co.closePath();var text_x=x;var text_y=y+5+length;}else{var text_x=x;var text_y=y-5-length;co.moveTo(Math.round(x),y-5);co.lineTo(Math.round(x),y-5-length);co.stroke();co.beginPath();co.moveTo(Math.round(x),y-5);co.lineTo(Math.round(x)-3,y-10);co.lineTo(Math.round(x)+3,y-10);co.closePath();}
co.fill();}
co.beginPath();co.fillStyle=(typeof(labels_processed[i])=='object'&&typeof(labels_processed[i][1])=='string')?labels_processed[i][1]:'black';RG.Text2(obj,{'font':prop['chart.text.font'],'size':prop['chart.text.size'],'x':text_x,'y':text_y,'text':(typeof(labels_processed[i])=='object'&&typeof(labels_processed[i][0])=='string')?labels_processed[i][0]:labels_processed[i],'valign':'bottom','halign':'center','bounding':true,'bounding.fill':(typeof(labels_processed[i])=='object'&&typeof(labels_processed[i][2])=='string')?labels_processed[i][2]:'white','tag':'labels ingraph'});co.fill();}}}}}
RGraph.FixEventObject=function(e)
{if(ISOLD){var e=event;e.pageX=(event.clientX+document.body.scrollLeft);e.pageY=(event.clientY+document.body.scrollTop);e.target=event.srcElement;if(!document.body.scrollTop&&document.documentElement.scrollTop){e.pageX+=parseInt(document.documentElement.scrollLeft);e.pageY+=parseInt(document.documentElement.scrollTop);}}
if(!e.stopPropagation){e.stopPropagation=function(){window.event.cancelBubble=true;}}
return e;}
RGraph.HideCrosshairCoords=function()
{var RG=RGraph;var div=RG.Registry.Get('chart.coordinates.coords.div');if(div&&div.style.opacity==1&&div.__object__.Get('chart.crosshairs.coords.fadeout')){setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0.9;},50);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0.8;},100);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0.7;},150);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0.6;},200);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0.5;},250);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0.4;},300);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0.3;},350);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0.2;},400);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0.1;},450);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.opacity=0;},500);setTimeout(function(){RG.Registry.Get('chart.coordinates.coords.div').style.display='none';},550);}}
RGraph.Draw3DAxes=function(obj)
{var prop=obj.properties;var co=obj.context;var ca=obj.canvas;var gutterLeft=prop['chart.gutter.left'];var gutterRight=prop['chart.gutter.right'];var gutterTop=prop['chart.gutter.top'];var gutterBottom=prop['chart.gutter.bottom'];co.strokeStyle='#aaa';co.fillStyle='#ddd';co.beginPath();co.moveTo(gutterLeft,gutterTop);co.lineTo(gutterLeft+10,gutterTop-5);co.lineTo(gutterLeft+10,ca.height-gutterBottom-5);co.lineTo(gutterLeft,ca.height-gutterBottom);co.closePath();co.stroke();co.fill();co.beginPath();co.moveTo(gutterLeft,ca.height-gutterBottom);co.lineTo(gutterLeft+10,ca.height-gutterBottom-5);co.lineTo(ca.width-gutterRight+10,ca.height-gutterBottom-5);co.lineTo(ca.width-gutterRight,ca.height-gutterBottom);co.closePath();co.stroke();co.fill();}
RGraph.OldBrowserCompat=function(co)
{if(!co){return;}
if(!co.measureText){co.measureText=function(text)
{var textObj=document.createElement('DIV');textObj.innerHTML=text;textObj.style.position='absolute';textObj.style.top='-100px';textObj.style.left=0;document.body.appendChild(textObj);var width={width:textObj.offsetWidth};textObj.style.display='none';return width;}}
if(!co.fillText){co.fillText=function(text,targetX,targetY)
{return false;}}
if(!co.canvas.addEventListener){window.addEventListener=function(ev,func,bubble)
{return this.attachEvent('on'+ev,func);}
co.canvas.addEventListener=function(ev,func,bubble)
{return this.attachEvent('on'+ev,func);}}}
RGraph.strokedCurvyRect=function(co,x,y,w,h)
{var r=arguments[5]?arguments[5]:3;var corner_tl=(arguments[6]||arguments[6]==null)?true:false;var corner_tr=(arguments[7]||arguments[7]==null)?true:false;var corner_br=(arguments[8]||arguments[8]==null)?true:false;var corner_bl=(arguments[9]||arguments[9]==null)?true:false;co.beginPath();co.moveTo(x+(corner_tl?r:0),y);co.lineTo(x+w-(corner_tr?r:0),y);if(corner_tr){co.arc(x+w-r,y+r,r,PI+HALFPI,TWOPI,false);}
co.lineTo(x+w,y+h-(corner_br?r:0));if(corner_br){co.arc(x+w-r,y-r+h,r,TWOPI,HALFPI,false);}
co.lineTo(x+(corner_bl?r:0),y+h);if(corner_bl){co.arc(x+r,y-r+h,r,HALFPI,PI,false);}
co.lineTo(x,y+(corner_tl?r:0));if(corner_tl){co.arc(x+r,y+r,r,PI,PI+HALFPI,false);}
co.stroke();}
RGraph.filledCurvyRect=function(co,x,y,w,h)
{var r=arguments[5]?arguments[5]:3;var corner_tl=(arguments[6]||arguments[6]==null)?true:false;var corner_tr=(arguments[7]||arguments[7]==null)?true:false;var corner_br=(arguments[8]||arguments[8]==null)?true:false;var corner_bl=(arguments[9]||arguments[9]==null)?true:false;co.beginPath();if(corner_tl){co.moveTo(x+r,y+r);co.arc(x+r,y+r,r,PI,PI+HALFPI,false);}else{co.fillRect(x,y,r,r);}
if(corner_tr){co.moveTo(x+w-r,y+r);co.arc(x+w-r,y+r,r,PI+HALFPI,0,false);}else{co.moveTo(x+w-r,y);co.fillRect(x+w-r,y,r,r);}
if(corner_br){co.moveTo(x+w-r,y+h-r);co.arc(x+w-r,y-r+h,r,0,HALFPI,false);}else{co.moveTo(x+w-r,y+h-r);co.fillRect(x+w-r,y+h-r,r,r);}
if(corner_bl){co.moveTo(x+r,y+h-r);co.arc(x+r,y-r+h,r,HALFPI,PI,false);}else{co.moveTo(x,y+h-r);co.fillRect(x,y+h-r,r,r);}
co.fillRect(x+r,y,w-r-r,h);co.fillRect(x,y+r,r+1,h-r-r);co.fillRect(x+w-r-1,y+r,r+1,h-r-r);co.fill();}
RGraph.HideZoomedCanvas=function()
{var interval=15;var frames=10;if(typeof(__zoomedimage__)=='object'){var obj=__zoomedimage__.obj;var prop=obj.properties;}else{return;}
if(prop['chart.zoom.fade.out']){for(var i=frames,j=1;i>=0;--i,++j){if(typeof(__zoomedimage__)=='object'){setTimeout("__zoomedimage__.style.opacity = "+String(i/10),j*interval);}}
if(typeof(__zoomedbackground__)=='object'){setTimeout("__zoomedbackground__.style.opacity = "+String(i/frames),j*interval);}}
if(typeof(__zoomedimage__)=='object'){setTimeout("__zoomedimage__.style.display = 'none'",prop['chart.zoom.fade.out']?(frames*interval)+10:0);}
if(typeof(__zoomedbackground__)=='object'){setTimeout("__zoomedbackground__.style.display = 'none'",prop['chart.zoom.fade.out']?(frames*interval)+10:0);}}
RGraph.AddCustomEventListener=function(obj,name,func)
{var RG=RGraph;if(typeof(RG.events[obj.uid])=='undefined'){RG.events[obj.uid]=[];}
RG.events[obj.uid].push([obj,name,func]);return RG.events[obj.uid].length-1;}
RGraph.FireCustomEvent=function(obj,name)
{var RG=RGraph;if(obj&&obj.isRGraph){if(obj[name]){(obj[name])(obj);}
var uid=obj.uid;if(typeof(uid)=='string'&&typeof(RG.events)=='object'&&typeof(RG.events[uid])=='object'&&RG.events[uid].length>0){for(var j=0;j<RG.events[uid].length;++j){if(RG.events[uid][j]&&RG.events[uid][j][1]==name){RG.events[uid][j][2](obj);}}}}}
RGraph.SetConfig=function(obj,config)
{for(i in config){if(typeof(i)=='string'){obj.Set(i,config[i]);}}
return obj;}
RGraph.RemoveAllCustomEventListeners=function()
{var RG=RGraph;var id=arguments[0];if(id&&RG.events[id]){RG.events[id]=[];}else{RG.events=[];}}
RGraph.RemoveCustomEventListener=function(obj,i)
{var RG=RGraph;if(typeof(RG.events)=='object'&&typeof(RG.events[obj.id])=='object'&&typeof(RG.events[obj.id][i])=='object'){RG.events[obj.id][i]=null;}}
RGraph.DrawBackgroundImage=function(obj)
{var prop=obj.properties;var ca=obj.canvas;var co=obj.context;var RG=RGraph;if(typeof(prop['chart.background.image'])=='string'){if(typeof(ca.__rgraph_background_image__)=='undefined'){var img=new Image();img.__object__=obj;img.__canvas__=ca;img.__context__=co;img.src=obj.Get('chart.background.image');ca.__rgraph_background_image__=img;}else{img=ca.__rgraph_background_image__;}
img.onload=function()
{obj.__rgraph_background_image_loaded__=true;RG.Clear(ca);RG.RedrawCanvas(ca);}
var gutterLeft=obj.gutterLeft;var gutterRight=obj.gutterRight;var gutterTop=obj.gutterTop;var gutterBottom=obj.gutterBottom;var stretch=prop['chart.background.image.stretch'];var align=prop['chart.background.image.align'];if(typeof(align)=='string'){if(align.indexOf('right')!=-1){var x=ca.width-img.width-gutterRight;}else{var x=gutterLeft;}
if(align.indexOf('bottom')!=-1){var y=ca.height-img.height-gutterBottom;}else{var y=gutterTop;}}else{var x=gutterLeft;var y=gutterTop;}
var x=typeof(prop['chart.background.image.x'])=='number'?prop['chart.background.image.x']:x;var y=typeof(prop['chart.background.image.y'])=='number'?prop['chart.background.image.y']:y;var w=stretch?ca.width-gutterLeft-gutterRight:img.width;var h=stretch?ca.height-gutterTop-gutterBottom:img.height;if(typeof(prop['chart.background.image.w'])=='number')w=prop['chart.background.image.w'];if(typeof(prop['chart.background.image.h'])=='number')h=prop['chart.background.image.h'];co.drawImage(img,x,y,w,h);}}
RGraph.hasTooltips=function(obj)
{var prop=obj.properties;if(typeof(prop['chart.tooltips'])=='object'&&prop['chart.tooltips']){for(var i=0,len=prop['chart.tooltips'].length;i<len;++i){if(!RGraph.is_null(obj.Get('chart.tooltips')[i])){return true;}}}else if(typeof(prop['chart.tooltips'])=='function'){return true;}
return false;}
RGraph.CreateUID=function()
{return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c)
{var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);return v.toString(16);});}
RGraph.ObjectRegistry.Add=function(obj)
{var uid=obj.uid;var id=obj.canvas.id;var RG=RGraph;RG.ObjectRegistry.objects.byUID.push([uid,obj]);RG.ObjectRegistry.objects.byCanvasID.push([id,obj]);}
RGraph.ObjectRegistry.Remove=function(obj)
{var id=obj.id;var uid=obj.uid;var RG=RGraph;for(var i=0;i<RG.ObjectRegistry.objects.byUID.length;++i){if(RG.ObjectRegistry.objects.byUID[i]&&RG.ObjectRegistry.objects.byUID[i][1].uid==uid){RG.ObjectRegistry.objects.byUID[i]=null;}}
for(var i=0;i<RG.ObjectRegistry.objects.byCanvasID.length;++i){if(RG.ObjectRegistry.objects.byCanvasID[i]&&RG.ObjectRegistry.objects.byCanvasID[i][1]&&RG.ObjectRegistry.objects.byCanvasID[i][1].uid==uid){RG.ObjectRegistry.objects.byCanvasID[i]=null;}}}
RGraph.ObjectRegistry.Clear=function()
{var RG=RGraph;if(arguments[0]){var id=(typeof(arguments[0])=='object'?arguments[0].id:arguments[0]);var objects=RG.ObjectRegistry.getObjectsByCanvasID(id);for(var i=0;i<objects.length;++i){RG.ObjectRegistry.Remove(objects[i]);}}else{RG.ObjectRegistry.objects={};RG.ObjectRegistry.objects.byUID=[];RG.ObjectRegistry.objects.byCanvasID=[];}}
RGraph.ObjectRegistry.List=function()
{var list=[];var RG=RGraph;for(var i=0,len=RG.ObjectRegistry.objects.byUID.length;i<len;++i){if(RG.ObjectRegistry.objects.byUID[i]){list.push(RG.ObjectRegistry.objects.byUID[i][1].type);}}
if(arguments[0]){return list;}else{p(list);}}
RGraph.ObjectRegistry.ClearByType=function(type)
{var RG=RGraph;var objects=RG.ObjectRegistry.objects.byUID;for(var i=0;i<objects.length;++i){if(objects[i]){var uid=objects[i][0];var obj=objects[i][1];if(obj&&obj.type==type){RG.ObjectRegistry.Remove(obj);}}}}
RGraph.ObjectRegistry.Iterate=function(func)
{var objects=RGraph.ObjectRegistry.objects.byUID;for(var i=0;i<objects.length;++i){if(typeof arguments[1]=='string'){var types=arguments[1].split(/,/);for(var j=0;j<types.length;++j){if(types[j]==objects[i][1].type){func(objects[i][1]);}}}else{func(objects[i][1]);}}}
RGraph.ObjectRegistry.getObjectsByCanvasID=function(id)
{var store=RGraph.ObjectRegistry.objects.byCanvasID;var ret=[];for(var i=0;i<store.length;++i){if(store[i]&&store[i][0]==id){ret.push(store[i][1]);}}
return ret;}
RGraph.ObjectRegistry.getFirstObjectByXY=RGraph.ObjectRegistry.getObjectByXY=function(e)
{var canvas=e.target;var ret=null;var objects=RGraph.ObjectRegistry.getObjectsByCanvasID(canvas.id);for(var i=(objects.length-1);i>=0;--i){var obj=objects[i].getObjectByXY(e);if(obj){return obj;}}}
RGraph.ObjectRegistry.getObjectsByXY=function(e)
{var canvas=e.target;var ret=[];var objects=RGraph.ObjectRegistry.getObjectsByCanvasID(canvas.id);for(var i=(objects.length-1);i>=0;--i){var obj=objects[i].getObjectByXY(e);if(obj){ret.push(obj);}}
return ret;}
RGraph.ObjectRegistry.getObjectByUID=function(uid)
{var objects=RGraph.ObjectRegistry.objects.byUID;for(var i=0;i<objects.length;++i){if(objects[i]&&objects[i][1].uid==uid){return objects[i][1];}}}
RGraph.ObjectRegistry.bringToFront=function(obj)
{var redraw=typeof arguments[1]=='undefined'?true:arguments[1];RGraph.ObjectRegistry.Remove(obj);RGraph.ObjectRegistry.Add(obj);if(redraw){RGraph.RedrawCanvas(obj.canvas);}}
RGraph.ObjectRegistry.getObjectsByType=function(type)
{var objects=RGraph.ObjectRegistry.objects.byUID;var ret=[];for(var i=0;i<objects.length;++i){if(objects[i]&&objects[i][1]&&objects[i][1].type&&objects[i][1].type&&objects[i][1].type==type){ret.push(objects[i][1]);}}
return ret;}
RGraph.ObjectRegistry.getFirstObjectByType=function(type)
{var objects=RGraph.ObjectRegistry.objects.byUID;for(var i=0;i<objects.length;++i){if(objects[i]&&objects[i][1]&&objects[i][1].type==type){return objects[i][1];}}
return null;}
RGraph.getAngleByXY=function(cx,cy,x,y)
{var angle=Math.atan((y-cy)/(x-cx));angle=Math.abs(angle)
if(x>=cx&&y>=cy){angle+=TWOPI;}else if(x>=cx&&y<cy){angle=(HALFPI-angle)+(PI+HALFPI);}else if(x<cx&&y<cy){angle+=PI;}else{angle=PI-angle;}
if(angle>TWOPI){angle-=TWOPI;}
return angle;}
RGraph.getHypLength=function(x1,y1,x2,y2)
{var ret=Math.sqrt(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)));return ret;}
RGraph.getRadiusEndPoint=function(cx,cy,angle,radius)
{var x=cx+(Math.cos(angle)*radius);var y=cy+(Math.sin(angle)*radius);return[x,y];}
RGraph.InstallEventListeners=function(obj)
{var RG=RGraph;var prop=obj.properties;if(ISOLD){return;}
if(RG.InstallCanvasClickListener){RG.InstallWindowMousedownListener(obj);RG.InstallWindowMouseupListener(obj);RG.InstallCanvasMousemoveListener(obj);RG.InstallCanvasMouseupListener(obj);RG.InstallCanvasMousedownListener(obj);RG.InstallCanvasClickListener(obj);}else if(RG.hasTooltips(obj)||prop['chart.adjustable']||prop['chart.annotatable']||prop['chart.contextmenu']||prop['chart.resizable']||prop['chart.key.interactive']||prop['chart.events.click']||prop['chart.events.mousemove']||typeof obj.onclick=='function'||typeof obj.onmousemove=='function'){alert('[RGRAPH] You appear to have used dynamic features but not included the file: RGraph.common.dynamic.js');}}
RGraph.pr=function(obj)
{var indent=(arguments[2]?arguments[2]:'    ');var str='';var counter=typeof arguments[3]=='number'?arguments[3]:0;if(counter>=5){return'';}
switch(typeof obj){case'string':str+=obj+' ('+(typeof obj)+', '+obj.length+')';break;case'number':str+=obj+' ('+(typeof obj)+')';break;case'boolean':str+=obj+' ('+(typeof obj)+')';break;case'function':str+='function () {}';break;case'undefined':str+='undefined';break;case'null':str+='null';break;case'object':if(RGraph.is_null(obj)){str+=indent+'null\n';}else{str+=indent+'Object {'+'\n'
for(j in obj){str+=indent+'    '+j+' => '+RGraph.pr(obj[j],true,indent+'    ',counter+1)+'\n';}
str+=indent+'}';}
break;default:str+='Unknown type: '+typeof obj+'';break;}
if(!arguments[1]){alert(str);}
return str;}
RGraph.DashedLine=function(co,x1,y1,x2,y2)
{var size=5;if(typeof(arguments[5])=='number'){size=arguments[5];}
var dx=x2-x1;var dy=y2-y1;var num=Math.floor(Math.sqrt((dx*dx)+(dy*dy))/size);var xLen=dx/num;var yLen=dy/num;var count=0;do{(count%2==0&&count>0)?co.lineTo(x1,y1):co.moveTo(x1,y1);x1+=xLen;y1+=yLen;}while(count++<=num);}
RGraph.AJAX=function(url,callback)
{if(window.XMLHttpRequest){var httpRequest=new XMLHttpRequest();}else if(window.ActiveXObject){var httpRequest=new ActiveXObject("Microsoft.XMLHTTP");}
httpRequest.onreadystatechange=function()
{if(this.readyState==4&&this.status==200){this.__user_callback__=callback;this.__user_callback__(this.responseText);}}
httpRequest.open('GET',url,true);httpRequest.send();}
RGraph.AJAX.POST=function(url,data,callback)
{var crumbs=[];if(window.XMLHttpRequest){var httpRequest=new XMLHttpRequest();}else if(window.ActiveXObject){var httpRequest=new ActiveXObject("Microsoft.XMLHTTP");}
httpRequest.onreadystatechange=function()
{if(this.readyState==4&&this.status==200){this.__user_callback__=callback;this.__user_callback__(this.responseText);}}
httpRequest.open('POST',url,true);httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");for(i in data){if(typeof i=='string'){crumbs.push(i+'='+encodeURIComponent(data[i]));}}
httpRequest.send(crumbs.join('&'));}
RGraph.AJAX.getNumber=function(url,callback)
{RGraph.AJAX(url,function()
{var num=parseFloat(this.responseText);callback(num);});}
RGraph.AJAX.getString=function(url,callback)
{RGraph.AJAX(url,function()
{var str=String(this.responseText);callback(str);});}
RGraph.AJAX.getJSON=function(url,callback)
{RGraph.AJAX(url,function()
{var json=eval('('+this.responseText+')');callback(json);});}
RGraph.AJAX.getCSV=function(url,callback)
{var seperator=arguments[2]?arguments[2]:',';RGraph.AJAX(url,function()
{var regexp=new RegExp(seperator);var arr=this.responseText.split(regexp);for(var i=0,len=arr.length;i<len;++i){arr[i]=parseFloat(arr[i]);}
callback(arr);});}
RGraph.RotateCanvas=function(ca,x,y,angle)
{var co=ca.getContext('2d');co.translate(x,y);co.rotate(angle);co.translate(0-x,0-y);}
RGraph.MeasureText=function(text,bold,font,size)
{if(typeof(__rgraph_measuretext_cache__)=='undefined'){__rgraph_measuretext_cache__=[];}
var str=text+':'+bold+':'+font+':'+size;if(typeof(__rgraph_measuretext_cache__)=='object'&&__rgraph_measuretext_cache__[str]){return __rgraph_measuretext_cache__[str];}
if(!__rgraph_measuretext_cache__['text-div']){var div=document.createElement('DIV');div.style.position='absolute';div.style.top='-100px';div.style.left='-100px';document.body.appendChild(div);__rgraph_measuretext_cache__['text-div']=div;}else if(__rgraph_measuretext_cache__['text-div']){var div=__rgraph_measuretext_cache__['text-div'];}
div.innerHTML=text.replace(/\r\n/g,'<br />');div.style.fontFamily=font;div.style.fontWeight=bold?'bold':'normal';div.style.fontSize=size+'pt';var size=[div.offsetWidth,div.offsetHeight];__rgraph_measuretext_cache__[str]=size;return size;}
RGraph.Text2=function(obj,opt)
{if(obj&&obj.isRGraph){var co=obj.context;var ca=obj.canvas;}else if(typeof obj=='string'){var ca=document.getElementById(obj);var co=ca.getContext('2d');}else if(typeof obj.getContext=='function'){var ca=obj;var co=ca.getContext('2d');}else if(obj.toString().indexOf('CanvasRenderingContext2D')!=-1){var co=obj;var ca=obj.context;}
var x=opt.x;var y=opt.y;var originalX=x;var originalY=y;var text=opt.text;var text_multiline=text.split(/\r?\n/g);var numlines=text_multiline.length;var font=opt.font?opt.font:'Arial';var size=opt.size?opt.size:10;var size_pixels=size*1.5;var bold=opt.bold;var halign=opt.halign?opt.halign:'left';var valign=opt.valign?opt.valign:'bottom';var tag=typeof opt.tag=='string'&&opt.tag.length>0?opt.tag:'';var marker=opt.marker;var angle=opt.angle||0;if(typeof opt.boundingFill=='string')opt['bounding.fill']=opt.boundingFill;if(typeof opt.boundingStroke=='string')opt['bounding.stroke']=opt.boundingStroke;var bounding=opt.bounding;var bounding_stroke=opt['bounding.stroke']?opt['bounding.stroke']:'black';var bounding_fill=opt['bounding.fill']?opt['bounding.fill']:'rgba(255,255,255,0.7)';var bounding_shadow=opt['bounding.shadow'];var bounding_shadow_color=opt['bounding.shadow.color']||'#ccc';var bounding_shadow_blur=opt['bounding.shadow.blur']||3;var bounding_shadow_offsetx=opt['bounding.shadow.offsetx']||3;var bounding_shadow_offsety=opt['bounding.shadow.offsety']||3;var bounding_linewidth=opt['bounding.linewidth']||1;var ret={};if(typeof text=='number'){text=String(text);}
if(typeof text!='string'){alert('[RGRAPH TEXT] The text given must a string or a number');return;}
if(angle!=0){co.save();co.translate(x,y);co.rotate((Math.PI/180)*angle)
x=0;y=0;}
co.font=(opt.bold?'bold ':'')+size+'pt '+font;var width=0;for(var i=0;i<numlines;++i){width=Math.max(width,co.measureText(text_multiline[i]).width);}
var height=size_pixels*numlines;if(opt.marker){var marker_size=10;var strokestyle=co.strokeStyle;co.beginPath();co.strokeStyle='red';co.moveTo(x,y-marker_size);co.lineTo(x,y+marker_size);co.moveTo(x-marker_size,y);co.lineTo(x+marker_size,y);co.stroke();co.strokeStyle=strokestyle;}
if(halign=='center'){co.textAlign='center';var boundingX=x-2-(width/2);}else if(halign=='right'){co.textAlign='right';var boundingX=x-2-width;}else{co.textAlign='left';var boundingX=x-2;}
if(valign=='center'){co.textBaseline='middle';y-=1;y-=((numlines-1)/2)*size_pixels;var boundingY=y-(size_pixels/2)-2;}else if(valign=='top'){co.textBaseline='top';var boundingY=y-2;}else{co.textBaseline='bottom';if(numlines>1){y-=((numlines-1)*size_pixels);}
var boundingY=y-size_pixels-2;}
var boundingW=width+4;var boundingH=height+4;if(bounding){var pre_bounding_linewidth=co.lineWidth;var pre_bounding_strokestyle=co.strokeStyle;var pre_bounding_fillstyle=co.fillStyle;var pre_bounding_shadowcolor=co.shadowColor;var pre_bounding_shadowblur=co.shadowBlur;var pre_bounding_shadowoffsetx=co.shadowOffsetX;var pre_bounding_shadowoffsety=co.shadowOffsetY;co.lineWidth=bounding_linewidth;co.strokeStyle=bounding_stroke;co.fillStyle=bounding_fill;if(bounding_shadow){co.shadowColor=bounding_shadow_color;co.shadowBlur=bounding_shadow_blur;co.shadowOffsetX=bounding_shadow_offsetx;co.shadowOffsetY=bounding_shadow_offsety;}
co.strokeRect(boundingX,boundingY,boundingW,boundingH);co.fillRect(boundingX,boundingY,boundingW,boundingH);co.lineWidth=pre_bounding_linewidth;co.strokeStyle=pre_bounding_strokestyle;co.fillStyle=pre_bounding_fillstyle;co.shadowColor=pre_bounding_shadowcolor
co.shadowBlur=pre_bounding_shadowblur
co.shadowOffsetX=pre_bounding_shadowoffsetx
co.shadowOffsetY=pre_bounding_shadowoffsety}
if(numlines>1){for(var i=0;i<numlines;++i){co.fillText(text_multiline[i],x,y+(size_pixels*i));}}else{co.fillText(text,x,y);}
if(angle!=0){if(angle==90){if(halign=='left'){if(valign=='bottom'){boundingX=originalX-2;boundingY=originalY-2;boundingW=height+4;boundingH=width+4;}
if(valign=='center'){boundingX=originalX-(height/2)-2;boundingY=originalY-2;boundingW=height+4;boundingH=width+4;}
if(valign=='top'){boundingX=originalX-height-2;boundingY=originalY-2;boundingW=height+4;boundingH=width+4;}}else if(halign=='center'){if(valign=='bottom'){boundingX=originalX-2;boundingY=originalY-(width/2)-2;boundingW=height+4;boundingH=width+4;}
if(valign=='center'){boundingX=originalX-(height/2)-2;boundingY=originalY-(width/2)-2;boundingW=height+4;boundingH=width+4;}
if(valign=='top'){boundingX=originalX-height-2;boundingY=originalY-(width/2)-2;boundingW=height+4;boundingH=width+4;}}else if(halign=='right'){if(valign=='bottom'){boundingX=originalX-2;boundingY=originalY-width-2;boundingW=height+4;boundingH=width+4;}
if(valign=='center'){boundingX=originalX-(height/2)-2;boundingY=originalY-width-2;boundingW=height+4;boundingH=width+4;}
if(valign=='top'){boundingX=originalX-height-2;boundingY=originalY-width-2;boundingW=height+4;boundingH=width+4;}}}else if(angle==180){if(halign=='left'){if(valign=='bottom'){boundingX=originalX-width-2;boundingY=originalY-2;boundingW=width+4;boundingH=height+4;}
if(valign=='center'){boundingX=originalX-width-2;boundingY=originalY-(height/2)-2;boundingW=width+4;boundingH=height+4;}
if(valign=='top'){boundingX=originalX-width-2;boundingY=originalY-height-2;boundingW=width+4;boundingH=height+4;}}else if(halign=='center'){if(valign=='bottom'){boundingX=originalX-(width/2)-2;boundingY=originalY-2;boundingW=width+4;boundingH=height+4;}
if(valign=='center'){boundingX=originalX-(width/2)-2;boundingY=originalY-(height/2)-2;boundingW=width+4;boundingH=height+4;}
if(valign=='top'){boundingX=originalX-(width/2)-2;boundingY=originalY-height-2;boundingW=width+4;boundingH=height+4;}}else if(halign=='right'){if(valign=='bottom'){boundingX=originalX-2;boundingY=originalY-2;boundingW=width+4;boundingH=height+4;}
if(valign=='center'){boundingX=originalX-2;boundingY=originalY-(height/2)-2;boundingW=width+4;boundingH=height+4;}
if(valign=='top'){boundingX=originalX-2;boundingY=originalY-height-2;boundingW=width+4;boundingH=height+4;}}}else if(angle==270){if(halign=='left'){if(valign=='bottom'){boundingX=originalX-height-2;boundingY=originalY-width-2;boundingW=height+4;boundingH=width+4;}
if(valign=='center'){boundingX=originalX-(height/2)-4;boundingY=originalY-width-2;boundingW=height+4;boundingH=width+4;}
if(valign=='top'){boundingX=originalX-2;boundingY=originalY-width-2;boundingW=height+4;boundingH=width+4;}}else if(halign=='center'){if(valign=='bottom'){boundingX=originalX-height-2;boundingY=originalY-(width/2)-2;boundingW=height+4;boundingH=width+4;}
if(valign=='center'){boundingX=originalX-(height/2)-4;boundingY=originalY-(width/2)-2;boundingW=height+4;boundingH=width+4;}
if(valign=='top'){boundingX=originalX-2;boundingY=originalY-(width/2)-2;boundingW=height+4;boundingH=width+4;}}else if(halign=='right'){if(valign=='bottom'){boundingX=originalX-height-2;boundingY=originalY-2;boundingW=height+4;boundingH=width+4;}
if(valign=='center'){boundingX=originalX-(height/2)-2;boundingY=originalY-2;boundingW=height+4;boundingH=width+4;}
if(valign=='top'){boundingX=originalX-2;boundingY=originalY-2;boundingW=height+4;boundingH=width+4;}}}
co.restore();}
co.textBaseline='alphabetic';co.textAlign='left';ret.x=boundingX;ret.y=boundingY;ret.width=boundingW;ret.height=boundingH
ret.object=obj;ret.text=text;ret.tag=tag;if(obj&&obj.isRGraph&&obj.coordsText){obj.coordsText.push(ret);}
return ret;}
RGraph.sequentialIndexToGrouped=function(index,data)
{var group=0;var grouped_index=0;while(--index>=0){if(RGraph.is_null(data[group])){group++;grouped_index=0;continue;}
if(typeof data[group]=='number'){group++
grouped_index=0;continue;}
grouped_index++;if(grouped_index>=data[group].length){group++;grouped_index=0;}}
return[group,grouped_index];}
if(!Array.prototype.forEach){Array.prototype.forEach=function(fn,scope){for(var i=0,len=this.length;i<len;++i){fn.call(scope,this[i],i,this);}}}
function empty(value)
{if(!value||value.length<=0){return true;}
return false;}
RGraph.Highlight.Rect=function(obj,shape)
{var ca=obj.canvas;var co=obj.context;var prop=obj.properties;if(prop['chart.tooltips.highlight']){co.lineWidth=1;co.beginPath();co.strokeStyle=prop['chart.highlight.stroke'];co.fillStyle=prop['chart.highlight.fill'];co.strokeRect(shape['x'],shape['y'],shape['width'],shape['height']);co.fillRect(shape['x'],shape['y'],shape['width'],shape['height']);co.stroke;co.fill();}}
RGraph.Highlight.Point=function(obj,shape)
{var prop=obj.properties;var ca=obj.canvas;var co=obj.context;if(prop['chart.tooltips.highlight']){co.beginPath();co.strokeStyle=prop['chart.highlight.stroke'];co.fillStyle=prop['chart.highlight.fill'];var radius=prop['chart.highlight.point.radius']||2;co.arc(shape['x'],shape['y'],radius,0,TWOPI,0);co.stroke();co.fill();}}
RGraph.LinearGradient=function(obj,x1,y1,x2,y2,color1,color2){var gradient=obj.context.createLinearGradient(x1,y1,x2,y2);var numColors=arguments.length-5;for(var i=5;i<arguments.length;++i){var color=arguments[i];var stop=(i-5)/(numColors-1);gradient.addColorStop(stop,color);}return gradient;}
RGraph.RadialGradient=function(obj,x1,y1,r1,x2,y2,r2,color1,color2){var gradient=obj.context.createRadialGradient(x1,y1,r1,x2,y2,r2);var numColors=arguments.length-7;for(var i=7;i<arguments.length;++i){var color=arguments[i];var stop=(i-7)/(numColors-1);gradient.addColorStop(stop,color);}return gradient;}
RGraph.array_shift=function(arr){var ret=[];for(var i=1;i<arr.length;++i){ret.push(arr[i]);}return ret;}
RGraph.AddEventListener=function(id,e,func){var type=arguments[3]?arguments[3]:'unknown';RGraph.Registry.Get('chart.event.handlers').push([id,e,func,type]);}
RGraph.ClearEventListeners=function(id){if(id&&id=='window'){window.removeEventListener('mousedown',window.__rgraph_mousedown_event_listener_installed__,false);window.removeEventListener('mouseup',window.__rgraph_mouseup_event_listener_installed__,false);}else{var canvas=document.getElementById(id);canvas.removeEventListener('mouseup',canvas.__rgraph_mouseup_event_listener_installed__,false);canvas.removeEventListener('mousemove',canvas.__rgraph_mousemove_event_listener_installed__,false);canvas.removeEventListener('mousedown',canvas.__rgraph_mousedown_event_listener_installed__,false);canvas.removeEventListener('click',canvas.__rgraph_click_event_listener_installed__,false);}}
RGraph.HidePalette=function(){var div=RGraph.Registry.Get('palette');if(typeof(div)=='object'&&div){div.style.visibility='hidden';div.style.display='none';RGraph.Registry.Set('palette',null);}}
RGraph.random=function(min,max){var dp=arguments[2]?arguments[2]:0;var r=Math.random();return Number((((max-min)*r)+min).toFixed(dp));}
RGraph.random.array=function(num,min,max){var arr=[];for(var i=0;i<num;i++)arr.push(RGraph.random(min,max));return arr;}
RGraph.NoShadow=function(obj){obj.context.shadowColor='rgba(0,0,0,0)';obj.context.shadowBlur=0;obj.context.shadowOffsetX=0;obj.context.shadowOffsetY=0;}
RGraph.SetShadow=function(obj,color,offsetx,offsety,blur){obj.context.shadowColor=color;obj.context.shadowOffsetX=offsetx;obj.context.shadowOffsetY=offsety;obj.context.shadowBlur=blur;}
RGraph.array_reverse=function(arr){var newarr=[];for(var i=arr.length-1;i>=0;i--){newarr.push(arr[i]);}return newarr;}
RGraph.Registry.Set=function(name,value){RGraph.Registry.store[name]=value;return value;}
RGraph.Registry.Get=function(name){return RGraph.Registry.store[name];}
RGraph.degrees2Radians=function(degrees){return degrees*(PI/180);}
RGraph.log=(function(n,base){var log=Math.log;return function(n,base){return log(n)/(base?log(base):1);};})();RGraph.is_array=function(obj){return obj!=null&&obj.constructor.toString().indexOf('Array')!=-1;}
RGraph.trim=function(str){return RGraph.ltrim(RGraph.rtrim(str));}
RGraph.ltrim=function(str){return str.replace(/^(\s|\0)+/,'');}
RGraph.rtrim=function(str){return str.replace(/(\s|\0)+$/,'');}
RGraph.GetHeight=function(obj){return obj.canvas.height;}
RGraph.GetWidth=function(obj){return obj.canvas.width;}
RGraph.is_null=function(arg){if(arg==null||(typeof(arg))=='object'&&!arg){return true;}return false;}
RGraph.Timer=function(label){if(typeof(RGraph.TIMER_LAST_CHECKPOINT)=='undefined'){RGraph.TIMER_LAST_CHECKPOINT=Date.now();}var now=Date.now();console.log(label+': '+(now-RGraph.TIMER_LAST_CHECKPOINT).toString());RGraph.TIMER_LAST_CHECKPOINT=now;}
RGraph.Async=function(func){return setTimeout(func,arguments[1]?arguments[1]:1);}
RGraph.isIE=function(){return navigator.userAgent.indexOf('MSIE')>0;};ISIE=RGraph.isIE();RGraph.isIE6=function(){return navigator.userAgent.indexOf('MSIE 6')>0;};ISIE6=RGraph.isIE6();RGraph.isIE7=function(){return navigator.userAgent.indexOf('MSIE 7')>0;};ISIE7=RGraph.isIE7();RGraph.isIE8=function(){return navigator.userAgent.indexOf('MSIE 8')>0;};ISIE8=RGraph.isIE8();RGraph.isIE9=function(){return navigator.userAgent.indexOf('MSIE 9')>0;};ISIE9=RGraph.isIE9();RGraph.isIE10=function(){return navigator.userAgent.indexOf('MSIE 10')>0;};ISIE10=RGraph.isIE10();RGraph.isIE9up=function(){navigator.userAgent.match(/MSIE (\d+)/);return Number(RegExp.$1)>=9;};ISIE9UP=RGraph.isIE9up();RGraph.isIE10up=function(){navigator.userAgent.match(/MSIE (\d+)/);return Number(RegExp.$1)>=10;};ISIE10UP=RGraph.isIE10up();RGraph.isOld=function(){return ISIE6||ISIE7||ISIE8;};ISOLD=RGraph.isOld();RGraph.Reset=function(canvas){canvas.width=canvas.width;RGraph.ObjectRegistry.Clear(canvas);canvas.__rgraph_aa_translated__=false;}
function pd(variable){RGraph.pr(variable);}
function p(variable){RGraph.pr(arguments[0],arguments[1],arguments[3]);}
function a(variable){alert(variable);}
function cl(variable){return console.log(variable);}