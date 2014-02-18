
if(typeof(RGraph)=='undefined')RGraph={isRGraph:true,type:'common'};RGraph.Annotating_canvas_onmousedown=function(e)
{if(e.button==0){e.target.__object__.Set('chart.mousedown',true);var obj=e.target.__object__;obj.context.beginPath();obj.context.strokeStyle=obj.Get('chart.annotate.color');obj.context.lineWidth=1;var mouseXY=RGraph.getMouseXY(e);var mouseX=mouseXY[0];var mouseY=mouseXY[1];RGraph.Registry.Set('annotate.actions',[obj.Get('chart.annotate.color')]);obj.context.moveTo(mouseX,mouseY);RGraph.Registry.Set('annotate.last.coordinates',[mouseX,mouseY]);RGraph.Registry.Set('started.annotating',false);RGraph.Registry.Set('chart.annotating',obj);RGraph.FireCustomEvent(obj,'onannotatebegin');}
return false;}
RGraph.Annotating_window_onmouseup=function(e)
{var obj=RGraph.Registry.Get('chart.annotating');if(e.button!=0||!obj){return;}
var tags=document.getElementsByTagName('canvas');for(var i=0;i<tags.length;++i){if(tags[i].__object__){tags[i].__object__.Set('chart.mousedown',false);}}
if(RGraph.Registry.Get('annotate.actions')&&RGraph.Registry.Get('annotate.actions').length>0&&window.localStorage){var id='__rgraph_annotations_'+e.target.id+'__';var annotations=window.localStorage[id]?window.localStorage[id]+'|':'';annotations+=RGraph.Registry.Get('annotate.actions');window.localStorage[id]=annotations;}
RGraph.Registry.Set('annotate.actions',[]);RGraph.FireCustomEvent(obj,'onannotateend');}
RGraph.Annotating_canvas_onmousemove=function(e)
{var obj=e.target.__object__;var mouseXY=RGraph.getMouseXY(e);var mouseX=mouseXY[0];var mouseY=mouseXY[1];var lastXY=RGraph.Registry.Get('annotate.last.coordinates');if(obj.Get('chart.mousedown')){obj.context.beginPath();if(!lastXY){obj.context.moveTo(mouseX,mouseY)}else{obj.context.strokeStyle=obj.properties['chart.annotate.color'];obj.context.moveTo(lastXY[0],lastXY[1]);obj.context.lineTo(mouseX,mouseY);}
RGraph.Registry.Set('annotate.actions',RGraph.Registry.Get('annotate.actions')+'|'+mouseX+','+mouseY);RGraph.Registry.Set('annotate.last.coordinates',[mouseX,mouseY]);RGraph.FireCustomEvent(obj,'onannotate');obj.context.stroke();}}
RGraph.ShowPalette=RGraph.Showpalette=function(e)
{var isSafari=navigator.userAgent.indexOf('Safari')?true:false;e=RGraph.FixEventObject(e);var canvas=e.target.parentNode.__canvas__;var context=canvas.getContext('2d');var obj=canvas.__object__;var div=document.createElement('DIV');var coords=RGraph.getMouseXY(e);div.__object__=obj;div.className='RGraph_palette';div.style.position='absolute';div.style.backgroundColor='white';div.style.border='1px solid black';div.style.left=0;div.style.top=0;div.style.padding='3px';div.style.opacity=0;div.style.boxShadow='rgba(96,96,96,0.5) 3px 3px 3px';div.style.WebkitBoxShadow='rgba(96,96,96,0.5) 3px 3px 3px';div.style.MozBoxShadow='rgba(96,96,96,0.5) 3px 3px 3px';var colors=['Black','Red','Magenta','Black','Yellow','Green','Orange','White','Cyan'];for(var i=0,len=colors.length;i<len;i+=1){var div2=document.createElement('DIV');div2.cssClass='RGraph_palette_color';div2.style.fontSize='12pt';div2.style.cursor='pointer';div2.style.padding='1px';div2.style.paddingRight='10px';var span=document.createElement('SPAN');span.style.display='inline-block';span.style.marginRight='3px';span.style.width='17px';span.style.height='17px';span.style.backgroundColor=colors[i];div2.appendChild(span);div2.innerHTML+=colors[i];div2.onmouseover=function()
{this.style.backgroundColor='#eee';}
div2.onmouseout=function()
{this.style.backgroundColor='';}
div2.onclick=function(e)
{var color=this.childNodes[0].style.backgroundColor;obj.Set('chart.annotate.color',color);}
div.appendChild(div2);}
document.body.appendChild(div);div.style.left=e.pageX+'px';div.style.top=e.pageY+'px';if((e.pageX+(div.offsetWidth+5))>document.body.offsetWidth){div.style.left=(e.pageX-div.offsetWidth)+'px';}
RGraph.Registry.Set('palette',div);setTimeout("RGraph.Registry.Get('palette').style.opacity = 0.2",50);setTimeout("RGraph.Registry.Get('palette').style.opacity = 0.4",100);setTimeout("RGraph.Registry.Get('palette').style.opacity = 0.6",150);setTimeout("RGraph.Registry.Get('palette').style.opacity = 0.8",200);setTimeout("RGraph.Registry.Get('palette').style.opacity = 1",250);RGraph.HideContext();window.onclick=function()
{RGraph.HidePalette();}
e.stopPropagation();return false;}
RGraph.ClearAnnotations=function(canvas)
{if(typeof(canvas)=='string'){var id=canvas;canvas=document.getElementById(id);}else{var id=canvas.id}
var obj=canvas.__object__;if(window.localStorage&&window.localStorage['__rgraph_annotations_'+id+'__']&&window.localStorage['__rgraph_annotations_'+id+'__'].length){window.localStorage['__rgraph_annotations_'+id+'__']=[];RGraph.FireCustomEvent(obj,'onannotateclear');}}
RGraph.ReplayAnnotations=function(obj)
{if(!window.localStorage){return;}
var context=obj.context;var annotations=window.localStorage['__rgraph_annotations_'+obj.id+'__'];var i,len,move,coords;context.beginPath();context.lineWidth=2;if(annotations&&annotations.length){annotations=annotations.split('|');}else{return;}
for(i=0,len=annotations.length;i<len;++i){if(annotations[i].match(/^[a-z]+$/)){context.stroke();context.beginPath();context.strokeStyle=annotations[i];move=true;continue;}
coords=annotations[i].split(',');coords[0]=Number(coords[0]);coords[1]=Number(coords[1]);if(move){context.moveTo(coords[0],coords[1]);move=false;}else{context.lineTo(coords[0],coords[1]);}}
context.stroke();}
window.addEventListener('load',function(e)
{setTimeout(function()
{var tags=document.getElementsByTagName('canvas');for(var i=0;i<tags.length;++i){if(tags[i].__object__&&tags[i].__object__.isRGraph&&tags[i].__object__.Get('chart.annotatable')){RGraph.ReplayAnnotations(tags[i].__object__);}}},100);},false);