// class flash.display.Bitmap
joo.classLoader.prepare("package flash.display",
"public class Bitmap extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createElement=$$l+'createElement',$_bitmapData=$$l+'_bitmapData',$_pixelSnapping=$$l+'_pixelSnapping',$_smoothing=$$l+'_smoothing';return[
"public function Bitmap",function(bitmapData,pixelSnapping,smoothing){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){bitmapData=null;}pixelSnapping="auto";}smoothing=false;}
this[$_bitmapData]=bitmapData;
this[$super]();
this[$_pixelSnapping]=pixelSnapping;
this[$_smoothing]=smoothing;
},
"override protected function createElement",function(){
return this[$_bitmapData].canvas;
},
"public function get bitmapData",function(){
return this[$_bitmapData];
},
"public function set bitmapData",function(value){
this[$_bitmapData]=value;
},
"public function get pixelSnapping",function(){
return this[$_pixelSnapping];
},
"public function set pixelSnapping",function(value){
this[$_pixelSnapping]=value;
},
"public function get smoothing",function(){
return this[$_smoothing];
},
"public function set smoothing",function(value){
this[$_smoothing]=value;
},
"private var",{_bitmapData: undefined},
"private var",{_pixelSnapping: undefined},
"private var",{_smoothing: undefined},
];},[],["flash.display.DisplayObject"], "0.7.1", "0.7.5"
);
// class flash.display.BitmapData
joo.classLoader.prepare("package flash.display",
"public class BitmapData implements flash.display.IBitmapDrawable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_transparent=$$l+'_transparent',$_width=$$l+'_width',$_height=$$l+'_height',$context=$$l+'context';return[function(){joo.classLoader.init(flash.geom.Rectangle);},
"public function BitmapData",function(width,height,transparent,fillColor){if(arguments.length<4){if(arguments.length<3){transparent=true;}fillColor=0xFFFFFFFF;}this[$super]();
this[$_transparent]=transparent;
this.canvas=window.document.createElement("canvas");
this.canvas.width=this[$_width]=width;
this.canvas.height=this[$_height]=height;
this.canvas.style.position="absolute";
this[$context]=this.canvas.getContext("2d");
},
"public function get rect",function(){
return new flash.geom.Rectangle(0,0,this[$_width],this[$_height]);
},
"public function get transparent",function(){
return this[$_transparent];
},
"public function get width",function(){
return this[$_width];
},
"public function get height",function(){
return this[$_height];
},
"public function colorTransform",function(rect,colorTransform){
if(colorTransform.alphaOffset==0
&&colorTransform.redMultiplier>=0&&colorTransform.redMultiplier<=1
&&colorTransform.redMultiplier==colorTransform.greenMultiplier
&&colorTransform.redMultiplier==colorTransform.blueMultiplier
&&colorTransform.redMultiplier==colorTransform.alphaMultiplier){
if(colorTransform.redOffset>=0&&colorTransform.greenOffset>=0&&colorTransform.blueOffset>=0){
this[$context].save();
this[$context].setTransform(1,0,0,1,0,0);
var alpha=1;
if(colorTransform.redMultiplier==1){
this[$context].globalCompositeOperation="lighter";
}else{
this[$context].globalCompositeOperation="source-over";
alpha-=colorTransform.alphaMultiplier;
}
this[$context].fillStyle="rgba("+
[colorTransform.redOffset,colorTransform.greenOffset,colorTransform.blueOffset,
alpha]
.join(",")+")";
this[$context].fillRect(rect.x,rect.y,rect.width,rect.height);
this[$context].restore();
return;
}
}
var input=this[$context].getImageData(rect.x,rect.y,rect.width,rect.height);
var w=input.width,h=input.height;
var inputData=input.data;
var maps=colorTransform.getComponentMaps();
var i;
for(var m=0;m<4;++m){
var map=maps[m];
if(map){
for(i=inputData.length-4+m;i>=0;i-=4){
inputData[i]=map[inputData[i]];
}
}
}
this[$context].putImageData(input,rect.x,rect.y);
},
"public function draw",function(source,matrix,colorTransform,
blendMode,clipRect,smoothing){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){matrix=null;}colorTransform=null;}blendMode=null;}clipRect=null;}smoothing=false;}
var element=is(source,flash.display.BitmapData)?(source).canvas:(source).getElement();
if(matrix){
this[$context].save();
this[$context].setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
}
this[$context].drawImage(element,0,0);
if(matrix){
this[$context].restore();
}
},
"private var",{_transparent: undefined},
"private var",{_width: undefined},
"private var",{_height: undefined},
"internal var",{canvas: undefined},
"private var",{context: undefined},
];},[],["flash.display.IBitmapDrawable","flash.geom.Rectangle"], "0.7.1", "0.7.5"
);
// class flash.display.BitmapDataChannel
joo.classLoader.prepare("package flash.display",
"public class BitmapDataChannel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static const",{ALPHA:8},
"public static const",{BLUE:4},
"public static const",{GREEN:2},
"public static const",{RED:1},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.display.CapsStyle
joo.classLoader.prepare("package flash.display",
"public class CapsStyle",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static const",{NONE:"butt"},
"public static const",{ROUND:"round"},
"public static const",{SQUARE:"square"},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.display.DisplayObject
joo.classLoader.prepare("package flash.display",
"public class DisplayObject extends flash.events.EventDispatcher implements flash.display.IBitmapDrawable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$addEventListener=$$l+'addEventListener',$removeEventListener=$$l+'removeEventListener',$transformAndDispatch=$$l+'transformAndDispatch',$dispatchWithOwnTarget=$$l+'dispatchWithOwnTarget',$_stage=$$l+'_stage',$_parent=$$l+'_parent',$_elem=$$l+'_elem',$_x=$$l+'_x',$_y=$$l+'_y',$_width=$$l+'_width',$_height=$$l+'_height',$_transform=$$l+'_transform';return[function(){joo.classLoader.init(flash.events.KeyboardEvent,int,flash.events.MouseEvent,flash.geom.Transform,flash.events.Event);},
"private static var",{buttonDownTracking:false},
"private static var",{buttonDown:false},
"public function DisplayObject",function(){
this[$super]();
this[$_stage]=flash.display.Stage.getInstance();
this[$_elem]=this.createElement();
if(!isNaN(this[$_stage].stageWidth)&&!isNaN(this[$_stage].stageHeight)){
this[$_width]=this[$_stage].stageWidth;
this[$_height]=this[$_stage].stageHeight;
}
this.updateSize();
},
"public function get stage",function(){
return this[$_stage];
},
"public function get parent",function(){
return this[$_parent];
},
"public function set parent",function(parent){
this[$_parent]=parent;
this.updateSize();
},
"private static function createEventMap",function(){var events=arguments;
var result={};
for(var i=0;i<events.length;++i){
result[events[i].toLowerCase()]=events[i];
}
return result;
},
"private static const",{DELEGATED_EVENT_MAP:function(){return(
$$private.createEventMap(flash.events.MouseEvent.CLICK,flash.events.MouseEvent.MOUSE_DOWN,flash.events.MouseEvent.MOUSE_UP,flash.events.MouseEvent.MOUSE_MOVE,
flash.events.KeyboardEvent.KEY_DOWN,flash.events.KeyboardEvent.KEY_UP));}},
"override public function addEventListener",function(type,listener,useCapture,
priority,useWeakReference){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture=false;}priority=0;}useWeakReference=false;}
var newEventType=!this.hasEventListener(type);
this[$addEventListener](type,listener,useCapture,priority,useWeakReference);
var jsType=type.toLowerCase();
if(newEventType){
if($$private.DELEGATED_EVENT_MAP[jsType]==type){
if(!$$private.buttonDownTracking&&type.substr(0,5)==='mouse'){
$$private.buttonDownTracking=true;
var stageElem=this.stage.getElement();
stageElem.addEventListener('mousedown',function(){
$$private.buttonDown=true;
},true);
stageElem.addEventListener('mouseup',function(){
$$private.buttonDown=false;
},true);
}
this[$_elem].addEventListener(jsType,$$bound(this,$transformAndDispatch),useCapture);
}else if(this!=this.stage&&flash.events.Event.ENTER_FRAME==type){
this.stage.addEventListener(type,$$bound(this,$dispatchWithOwnTarget),useCapture,priority,useWeakReference);
}
}
},
"override public function removeEventListener",function(type,listener,useCapture){if(arguments.length<3){useCapture=false;}
this[$removeEventListener](type,listener,useCapture);
var jsType=type.toLowerCase();
if($$private.DELEGATED_EVENT_MAP[jsType]==type){
this[$_elem].removeEventListener(jsType,$$bound(this,$transformAndDispatch),useCapture);
}
},
"private function transformAndDispatch",function(event){
var type=$$private.DELEGATED_EVENT_MAP[event.type];
var flashEvent=
type.substring(0,5)=='mouse'
?new flash.events.MouseEvent(type,true,true,event.pageX-this.stage.x,event.pageY-this.stage.y,null,
event.ctrlKey,event.altKey,event.shiftKey,$$private.buttonDown)
:new flash.events.KeyboardEvent(type,true,true,event['charCode'],event.keyCode||event['which'],0,
event.ctrlKey,event.altKey,event.shiftKey,event.ctrlKey,event.ctrlKey);
return this.dispatchEvent(flashEvent);
},
"private function dispatchWithOwnTarget",function(event){
return this.dispatchEvent(event.clone());
},
"public function get x",function(){
return this[$_x];
},
"public function set x",function(value){
this[$_x]=isNaN(value)?0:value;
if(this[$_elem]){
this[$_elem].style.left=value+"px";
this.updateSize();
}
},
"public function get y",function(){
return this[$_y];
},
"public function set y",function(value){
this[$_y]=isNaN(value)?0:value;
if(this[$_elem]){
this[$_elem].style.top=value+"px";
this.updateSize();
}
},
"public function get width",function(){
return this[$_elem]?this[$_elem].offsetWidth||this[$_width]:this[$_width];
},
"public function set width",function(value){
this[$_width]=value;
this.updateSize();
},
"public function get height",function(){
return this[$_elem]?this[$_elem].offsetHeight||this[$_height]:this[$_height];
},
"public function set height",function(value){
this[$_height]=value;
this.updateSize();
},
"protected function updateSize",function(){
var parent=this.parent;
if(parent){
if(!isNaN(parent.x)&&!isNaN(parent.width)){
this[$_elem].style.width=Math.min(this[$_width]||int.MAX_VALUE,(parent.x+parent.width-this[$_x]))+"px";
}
if(!isNaN(parent.y)&&!isNaN(parent.height)){
this[$_elem].style.height=Math.min(this[$_height]||int.MAX_VALUE,(parent.y+parent.height-this[$_y]))+"px";
}
}
},
"protected function createElement",function(){
var elem=window.document.createElement(this.getElementName());
elem.style.position="absolute";
elem.style['MozUserSelect']='none';
elem.style['KhtmlUserSelect']='none';
elem['unselectable']='on';
elem['onselectstart']=function(){return false;};
return elem;
},
"protected function getElementName",function(){
return"div";
},
"public function getElement",function(){
return this[$_elem];
},
"public function get transform",function(){
if(!this[$_transform])
this[$_transform]=new flash.geom.Transform(this);
return this[$_transform];
},
"public function set transform",function(value){
this[$_transform]=value;
},
"public var",{rotation: undefined},
"private var",{_stage: undefined},
"private var",{_parent: undefined},
"private var",{_elem: undefined},
"private var",{_x:0,_y:0,_width: undefined,_height: undefined},
"private var",{_transform: undefined},
];},[],["flash.events.EventDispatcher","flash.display.IBitmapDrawable","flash.display.Stage","flash.events.MouseEvent","flash.events.KeyboardEvent","flash.events.Event","Math","int","flash.geom.Transform"], "0.7.1", "0.7.5"
);
// class flash.display.DisplayObjectContainer
joo.classLoader.prepare("package flash.display",
"public class DisplayObjectContainer extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$updateSize=$$l+'updateSize',$children=$$l+'children';return[
"public function DisplayObjectContainer",function(){
this[$children]=[];
this[$super]();
},
"public function get numChildren",function(){
return this[$children].length;
},
"public function addChild",function(child){
return this.addChildAt(child,this[$children].length);
},
"public function addChildAt",function(child,index){
var refChild=this[$children][index];
this[$children].splice(index,0,child);
child.parent=this;
if(refChild){
this.getElement().insertBefore(child.getElement(),refChild.getElement());
}else{
this.getElement().appendChild(child.getElement());
}
return child;
},
"public function getChildAt",function(index){
return this[$children][index];
},
"override protected function updateSize",function(){
this[$updateSize]();
this[$children].forEach(function(child){
child.updateSize();
});
},
"private var",{children: undefined},
];},[],["flash.display.InteractiveObject"], "0.7.1", "0.7.5"
);
// class flash.display.FrameLabel
joo.classLoader.prepare("package flash.display",
"public class FrameLabel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_frame=$$l+'_frame',$_name=$$l+'_name';return[
"private var",{_frame: undefined},
"private var",{_name: undefined},
"public function FrameLabel",function(){this[$super]();
},
"public function get frame",function(){
return this[$_frame];
},
"public function get name",function(){
return this[$_name];
},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.display.GradientType
joo.classLoader.prepare("package flash.display",
"public class GradientType extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static const",{LINEAR:"linear"},
"public static const",{RADIAL:"radial"},
];},[],["Object"], "0.7.1", "0.7.5"
);
// class flash.display.Graphics
joo.classLoader.prepare("package flash.display",
"public class Graphics",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$context=$$l+'context',$insideFill=$$l+'insideFill',$_beginFill=$$l+'_beginFill',$createGradientStyle=$$l+'createGradientStyle';return[function(){joo.classLoader.init(flash.geom.Matrix,flash.display.CapsStyle,Math,flash.display.GradientType,flash.display.JointStyle,flash.geom.Point);},
"private var",{context: undefined},
"private var",{insideFill:false},
"public function Graphics",function(context){this[$super]();
this[$context]=context;
this[$context].moveTo(0,0);
this[$context].lineCap=flash.display.CapsStyle.ROUND;
this[$context].lineJoin=flash.display.JointStyle.ROUND;
this[$context].miterLimit=3;
},
"internal function get renderingContext",function(){
return this[$context];
},
"public function lineStyle",function(thickness,color,alpha,
pixelHinting,scaleMode,
caps,
joints,miterLimit){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){thickness=NaN;}color=0;}alpha=1.0;}pixelHinting=false;}scaleMode="normal";}caps=null;}joints=null;}miterLimit=3;}
if(!isNaN(thickness)){
this[$context].lineWidth=thickness||1;
}
this[$context].strokeStyle=flash.display.Graphics.toRGBA(color,alpha);
this[$context].lineCap=caps||flash.display.CapsStyle.ROUND;
this[$context].lineJoin=joints||flash.display.JointStyle.ROUND;
this[$context].miterLimit=miterLimit;
},
"public function lineGradientStyle",function(type,colors,alphas,ratios,matrix,
spreadMethod,interpolationMethod,
focalPointRatio){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix=null;}spreadMethod="pad";}interpolationMethod="rgb";}focalPointRatio=0;}
this[$context].strokeStyle=this[$createGradientStyle](type,colors,alphas,ratios,
matrix,spreadMethod,interpolationMethod,focalPointRatio);
},
"public function lineTo",function(x,y){
this[$context].lineTo(x,y);
if(!this[$insideFill]){
this[$context].stroke();
this[$context].beginPath();
this[$context].moveTo(x,y);
}
},
"public function curveTo",function(controlX,controlY,anchorX,anchorY){
this[$context].quadraticCurveTo(controlX,controlY,anchorX,anchorY);
if(!this[$insideFill]){
this[$context].stroke();
}
},
"public function drawCircle",function(x,y,radius){
this[$context].moveTo(x+radius,y);
this[$context].arc(x,y,radius,0,2*Math.PI,false);
if(this[$insideFill]){
this[$context].fill();
}
this[$context].stroke();
this[$context].beginPath();
this[$context].moveTo(x,y);
},
"public function drawRect",function(x,y,width,height){
if(this[$insideFill]){
this[$context].fillRect(x,y,width,height);
}
this[$context].strokeRect(x,y,width,height);
},
"public function drawRoundRect",function(x,y,width,height,
ellipseWidth,ellipseHeight){if(arguments.length<6){ellipseHeight=NaN;}
if(ellipseHeight==0||ellipseWidth==0){
this.drawRect(x,y,width,height);
return;
}
if(isNaN(ellipseHeight)){
ellipseHeight=ellipseWidth;
}
var x_lw=x+ellipseWidth;
var x_r=x+width;
var x_rw=x_r-ellipseWidth;
var y_tw=y+ellipseHeight;
var y_b=y+height;
var y_bw=y_b-ellipseHeight;
this[$context].beginPath();
this[$context].moveTo(x_lw,y);
this[$context].lineTo(x_rw,y);
this[$context].quadraticCurveTo(x_r,y,x_r,y_tw);
this[$context].lineTo(x_r,y_bw);
this[$context].quadraticCurveTo(x_r,y_b,x_rw,y_b);
this[$context].lineTo(x_lw,y_b);
this[$context].quadraticCurveTo(x,y_b,x,y_bw);
this[$context].lineTo(x,y_tw);
this[$context].quadraticCurveTo(x,y,x_lw,y);
this[$context].closePath();
if(this[$insideFill]){
this[$context].fill();
}
this[$context].stroke();
},
"public function moveTo",function(x,y){
this[$context].beginPath();
this[$context].moveTo(x,y);
},
"public function clear",function(){
this.lineStyle();
this[$context].save();
this[$context].setTransform(1,0,0,1,0,0);
this[$context].fillStyle="";
this[$context].clearRect(0,0,this[$context].canvas.width,this[$context].canvas.height);
this[$context].restore();
this[$insideFill]=false;
this[$context].moveTo(0,0);
},
"public function beginFill",function(color,alpha){if(arguments.length<2){alpha=1.0;}
this[$_beginFill](flash.display.Graphics.toRGBA(color,alpha));
},
"private function _beginFill",function(fillStyle){
this[$context].beginPath();
this[$context].fillStyle=fillStyle;
this[$insideFill]=true;
},
"public function beginGradientFill",function(type,colors,alphas,ratios,
matrix,spreadMethod,
interpolationMethod,focalPointRatio){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix=null;}spreadMethod="pad";}interpolationMethod="rgb";}focalPointRatio=0;}
this[$_beginFill](this[$createGradientStyle](type,colors,alphas,ratios,
matrix,spreadMethod,interpolationMethod,focalPointRatio));
},
"private function createGradientStyle",function(type,colors,alphas,ratios,
matrix,spreadMethod,
interpolationMethod,focalPointRatio){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){matrix=null;}spreadMethod="pad";}interpolationMethod="rgb";}focalPointRatio=0;}
var gradient;
var p0=new flash.geom.Point(0,0);
var p1=new flash.geom.Point(-flash.geom.Matrix.MAGIC_GRADIENT_FACTOR/2,0);
var p2=type==flash.display.GradientType.LINEAR
?new flash.geom.Point(0,-flash.geom.Matrix.MAGIC_GRADIENT_FACTOR/2)
:new flash.geom.Point(flash.geom.Matrix.MAGIC_GRADIENT_FACTOR/2*focalPointRatio,0);
if(matrix){
p0=matrix.transformPoint(p0);
p1=matrix.transformPoint(p1);
p2=matrix.transformPoint(p2);
}
if(type==flash.display.GradientType.LINEAR){
var x1;
var y1;
if(p2.x==p0.x){
x1=p1.x;
y1=p1.y;
}else if(p2.y==p0.y){
x1=p1.x;
y1=p2.x;
}else{
var d=-(p2.x-p0.x)/(p2.y-p0.y);
x1=(p1.x/d+p1.y+d*p0.x-p0.y)/(d+1/d);
y1=d*(x1-p0.x)+p0.y;
}
var x2=p0.x+(p0.x-x1);
var y2=p0.y+(p0.y-y1);
gradient=this[$context].createLinearGradient(x1,y1,x2,y2);
}else{
var rx=p1.x-p0.x;
var ry=p1.y-p0.y;
var r=rx==0?Math.abs(ry):ry==0?Math.abs(rx):Math.sqrt(rx*rx+ry*ry);
gradient=this[$context].createRadialGradient(p2.x,p2.y,0,p0.x,p0.y,r);
}
for(var i=0;i<colors.length;++i){
gradient.addColorStop(ratios[i]/255,flash.display.Graphics.toRGBA(colors[i],alphas[i]));
}
return gradient;
},
"public function endFill",function(){
this[$context].closePath();
this[$context].fill();
this[$context].stroke();
this[$insideFill]=false;
},
"public static function toRGBA",function(color,alpha){if(arguments.length<2){alpha=1.0;}
return"rgba("+[color>>16,color>>8&0xFF,color&0xFF,alpha].join(",")+")";
},
];},["toRGBA"],["flash.display.CapsStyle","flash.display.JointStyle","Math","flash.geom.Point","flash.geom.Matrix","flash.display.GradientType"], "0.7.1", "0.7.5"
);
// class flash.display.IBitmapDrawable
joo.classLoader.prepare("package flash.display",
"public interface IBitmapDrawable",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
];},[],[], "0.7.1", "0.7.5"
);
// class flash.display.InteractiveObject
joo.classLoader.prepare("package flash.display",
"public class InteractiveObject extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public var",{mouseEnabled: undefined},
"public function InteractiveObject",function(){
this[$super]();
},
];},[],["flash.display.DisplayObject"], "0.7.1", "0.7.5"
);
// class flash.display.InterpolationMethod
joo.classLoader.prepare("package flash.display",
"public class InterpolationMethod extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{LINEAR_RGB:"linear_rgb"},
"public static const",{RGB:"rgb"},
];},[],["Object"], "0.7.1", "0.7.5"
);
// class flash.display.JointStyle
joo.classLoader.prepare("package flash.display",
"public class JointStyle",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static const",{BEVEL:"bevel"},
"public static const",{MITER:"miter"},
"public static const",{ROUND:"round"},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.display.LineScaleMode
joo.classLoader.prepare("package flash.display",
"public class LineScaleMode extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{HORIZONTAL:"horizontal"},
"public static const",{NONE:"none"},
"public static const",{NORMAL:"normal"},
"public static const",{VERTICAL:"vertical"},
];},[],["Object"], "0.7.1", "0.7.5"
);
// class flash.display.MovieClip
joo.classLoader.prepare("package flash.display",
"public class MovieClip extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function MovieClip",function(){
this[$super]();
},
];},[],["flash.display.Sprite"], "0.7.1", "0.7.5"
);
// class flash.display.PixelSnapping
joo.classLoader.prepare("package flash.display",
"public class PixelSnapping",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static const",{ALWAYS:"always"},
"public static const",{AUTO:"auto"},
"public static const",{NEVER:"never"},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.display.Shape
joo.classLoader.prepare("package flash.display",
"public class Shape extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createElement=$$l+'createElement',$transform=$$l+'transform',$_graphics=$$l+'_graphics';return[function(){joo.classLoader.init(flash.display.Graphics);},
"public function Shape",function(){
this[$super]();
},
"override protected function createElement",function(){
var canvas=flash.display.Shape.createCanvas();
canvas.style.position="absolute";
return canvas;
},
"internal static function createCanvas",function(){
var canvas=window.document.createElement("canvas");
canvas.width=flash.display.Stage.getInstance().stageWidth;
canvas.height=flash.display.Stage.getInstance().stageHeight;
return canvas;
},
"internal static function createGraphics",function(canvas){
return new flash.display.Graphics(canvas.getContext("2d"));
},
"public function get graphics",function(){
if(!this[$_graphics]){
this[$_graphics]=flash.display.Shape.createGraphics(this.getElement());
}
return this[$_graphics];
},
"override public function set transform",function(value){
this[$transform]=value;
var m=value.matrix;
if(m){
this.graphics.renderingContext.setTransform(m.a,m.b,m.c,m.d,m.tx,m.ty);
}
},
"private var",{_graphics: undefined},
];},["createCanvas","createGraphics"],["flash.display.DisplayObject","flash.display.Stage","flash.display.Graphics"], "0.7.1", "0.7.5"
);
// class flash.display.SimpleButton
joo.classLoader.prepare("package flash.display",
"public class SimpleButton extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$getElementName=$$l+'getElementName',$_upState=$$l+'_upState',$_overState=$$l+'_overState',$_downState=$$l+'_downState',$_hitTestState=$$l+'_hitTestState',$_enabled=$$l+'_enabled',$_trackAsMenu=$$l+'_trackAsMenu',$_useHandCursor=$$l+'_useHandCursor';return[
"public function SimpleButton",function(upState,overState,
downState,hitTestState){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){upState=null;}overState=null;}downState=null;}hitTestState=null;}
this[$super]();
this[$_upState]=upState;
this[$_overState]=overState;
this[$_downState]=downState;
this[$_hitTestState]=hitTestState;
},
"override protected function getElementName",function(){
return"button";
},
"public function get downState",function(){
return this[$_downState];
},
"public function set downState",function(value){
this[$_downState]=value;
},
"public function get enabled",function(){
return this[$_enabled];
},
"public function set enabled",function(value){
this[$_enabled]=value;
},
"public function get hitTestState",function(){
return this[$_hitTestState];
},
"public function set hitTestState",function(value){
this[$_hitTestState]=value;
},
"public function get overState",function(){
return this[$_overState];
},
"public function set overState",function(value){
this[$_overState]=value;
},
"public function get trackAsMenu",function(){
return this[$_trackAsMenu];
},
"public function set trackAsMenu",function(value){
this[$_trackAsMenu]=value;
},
"public function get upState",function(){
return this[$_upState];
},
"public function set upState",function(value){
this[$_upState]=value;
},
"public function get useHandCursor",function(){
return this[$_useHandCursor];
},
"public function set useHandCursor",function(value){
this[$_useHandCursor]=value;
},
"private var",{_upState: undefined},
"private var",{_overState: undefined},
"private var",{_downState: undefined},
"private var",{_hitTestState: undefined},
"private var",{_enabled:true},
"private var",{_trackAsMenu: undefined},
"private var",{_useHandCursor: undefined},
];},[],["flash.display.InteractiveObject"], "0.7.1", "0.7.5"
);
// class flash.display.SpreadMethod
joo.classLoader.prepare("package flash.display",
"public class SpreadMethod extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[

"public static const",{PAD:"pad"},
"public static const",{REFLECT:"reflect"},
"public static const",{REPEAT:"repeat"},
];},[],["Object"], "0.7.1", "0.7.5"
);
// class flash.display.Sprite
joo.classLoader.prepare("package flash.display",
"public class Sprite extends flash.display.DisplayObjectContainer",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$transform=$$l+'transform',$_graphics=$$l+'_graphics';return[function(){joo.classLoader.init(flash.display.Graphics);},
"public function Sprite",function(){
this[$super]();
},
"public function get graphics",function(){
if(!this[$_graphics]){
var canvas=flash.display.Shape.createCanvas();
var element=this.getElement();
if(element.firstChild){
element.insertBefore(canvas,element.firstChild);
}else{
element.appendChild(canvas);
}
this[$_graphics]=new flash.display.Graphics(canvas.getContext("2d"));
}
return this[$_graphics];
},
"override public function set transform",function(value){
this[$transform]=value;
var m=value.matrix;
if(m){
this.graphics.renderingContext.setTransform(m.a,m.b,m.c,m.d,m.tx,m.ty);
}
},
"private var",{_graphics: undefined},
];},[],["flash.display.DisplayObjectContainer","flash.display.Shape","flash.display.Graphics"], "0.7.1", "0.7.5"
);
// class flash.display.Stage
joo.classLoader.prepare("package flash.display",
"public class Stage extends flash.display.DisplayObjectContainer",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$x=$$l+'x',$y=$$l+'y',$createElement=$$l+'createElement',$enterFrame=$$l+'enterFrame',$id=$$l+'id',$_frameRate=$$l+'_frameRate',$frameTimer=$$l+'frameTimer';return[function(){joo.classLoader.init(flash.events.Event,flash.events.TimerEvent,flash.utils.Timer);},
"private static var",{instance: undefined},
"public static function getInstance",function(id){if(arguments.length<1){id="stage";}
if(!$$private.instance){
new flash.display.Stage(id);
}
return $$private.instance;
},
"public function Stage",function(id){
this[$id]=id;
$$private.instance=this;
this[$super]();
this[$frameTimer]=new flash.utils.Timer(1000/this[$_frameRate]);
this[$frameTimer].addEventListener(flash.events.TimerEvent.TIMER,$$bound(this,$enterFrame));
this[$frameTimer].start();
},
"override public function get x",function(){
return this.getElement().offsetLeft;
},
"override public function get y",function(){
return this.getElement().offsetTop;
},
"public function get stageHeight",function(){
return this.getElement().offsetHeight;
},
"public function set stageHeight",function(value){
this.getElement()['offsetHeight']=value;
},
"public function get stageWidth",function(){
return this.getElement().offsetWidth;
},
"public function set stageWidth",function(value){
this.getElement()['offsetWidth']=value;
},
"override protected function createElement",function(){
var element=window.document.getElementById(this[$id]);
element.style.position="relative";
element.setAttribute("tabindex","0");
var width=element.getAttribute("width");
if(width){
element.style.width=width+"px";
}
var height=element.getAttribute("height");
if(height){
element.style.height=height+"px";
}
element.innerHTML="";
return element;
},
"private function enterFrame",function(){
this.dispatchEvent(new flash.events.Event(flash.events.Event.ENTER_FRAME,false,false));
},
"public function get frameRate",function(){
return this[$_frameRate];
},
"public function set frameRate",function(value){
this[$_frameRate]=value;
this[$frameTimer].delay=1000/value;
},
"private var",{id: undefined},
"private var",{_frameRate:30},
"private var",{frameTimer: undefined},
];},["getInstance"],["flash.display.DisplayObjectContainer","flash.utils.Timer","flash.events.TimerEvent","flash.events.Event"], "0.7.1", "0.7.5"
);
// class flash.events.Event
joo.classLoader.prepare("package flash.events",
"public class Event extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$defaultPrevented=$$l+'defaultPrevented',$propagationStopped=$$l+'propagationStopped',$immediatePropagationStopped=$$l+'immediatePropagationStopped';return[

"public function Event",function(type,bubbles,cancelable){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}this[$super]();
this.type=type;
this.bubbles=bubbles;
this.cancelable=cancelable;
},
"public var",{type: undefined},
"public var",{bubbles: undefined},
"public var",{cancelable: undefined},
"public var",{eventPhase: undefined},
"public var",{target: undefined},
"public var",{currentTarget: undefined},
"public function preventDefault",function(){
if(this.cancelable){
this[$defaultPrevented]=true;
}
},
"public function isDefaultPrevented",function(){
return this[$defaultPrevented];
},
"public function formatToString",function(className){var rest=Array.prototype.slice.call(arguments,1);
var sb=["[",className," "];
for(var i=0;i<rest.length;++i){
sb.push(rest[i],"=",this[rest[i]]," ");
}
sb.push("]");
return sb.join("");
},
"public function toString",function(){
return this.formatToString("Event","type","bubbles","cancelable","eventPhase");
},
"public function stopPropagation",function(){
this[$propagationStopped]=true;
},
"public function isPropagationStopped",function(){
return this[$propagationStopped];
},
"public function stopImmediatePropagation",function(){
this[$immediatePropagationStopped]=true;
},
"public function isImmediatePropagationStopped",function(){
return this[$immediatePropagationStopped];
},
"public function clone",function(){
return new flash.events.Event(this.type,this.bubbles,this.cancelable);
},
"static public const",{ENTER_FRAME:"enterFrame"},
"static public const",{ID3:"id3"},
"static public const",{SOUND_COMPLETE:"soundComplete"},
"static public const",{INIT:"init"},
"static public const",{RENDER:"render"},
"static public const",{TAB_ENABLED_CHANGE:"tabEnabledChange"},
"static public const",{ADDED_TO_STAGE:"addedToStage"},
"static public const",{TAB_CHILDREN_CHANGE:"tabChildrenChange"},
"static public const",{RESIZE:"resize"},
"static public const",{CHANGE:"change"},
"static public const",{COMPLETE:"complete"},
"static public const",{FULLSCREEN:"fullScreen"},
"static public const",{REMOVED:"removed"},
"static public const",{CONNECT:"connect"},
"static public const",{SCROLL:"scroll"},
"static public const",{OPEN:"open"},
"static public const",{CLOSE:"close"},
"static public const",{MOUSE_LEAVE:"mouseLeave"},
"static public const",{ADDED:"added"},
"static public const",{TAB_INDEX_CHANGE:"tabIndexChange"},
"static public const",{REMOVED_FROM_STAGE:"removedFromStage"},
"static public const",{ACTIVATE:"activate"},
"static public const",{DEACTIVATE:"deactivate"},
"static public const",{CANCEL:"cancel"},
"static public const",{SELECT:"select"},
"static public const",{UNLOAD:"unload"},
"private var",{defaultPrevented:false},
"private var",{propagationStopped: undefined},
"private var",{immediatePropagationStopped: undefined},
];},[],["Object"], "0.7.1", "0.7.5"
);
// class flash.events.EventDispatcher
joo.classLoader.prepare("package flash.events",
"public class EventDispatcher extends Object implements flash.events.IEventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$captureListeners=$$l+'captureListeners',$listeners=$$l+'listeners',$target=$$l+'target';return[
"public function EventDispatcher",function(target){if(arguments.length<1){target=null;}this[$super]();
this[$target]=target;
this[$captureListeners]={};
this[$listeners]={};
},
"public function dispatchEvent",function(event){
event.target=this[$target]||this;
var listeners=this[$listeners][event.type];
if(listeners){
for(var i=0;i<listeners.length;++i){
if(listeners[i](event)===false){
event.stopPropagation();
event.preventDefault();
}
if(event.isImmediatePropagationStopped()){
return false;
}
}
}
return event.isDefaultPrevented();
},
"public function willTrigger",function(type){
return this.hasEventListener(type);
},
"public function addEventListener",function(type,listener,useCapture,priority,useWeakReference){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture=false;}priority=0;}useWeakReference=false;}
var listenersByType=useCapture?this[$captureListeners]:this[$listeners];
if(!(type in listenersByType)){
listenersByType[type]=[listener];
}else{
listenersByType[type].push(listener);
}
},
"public function removeEventListener",function(type,listener,useCapture){if(arguments.length<3){useCapture=false;}
var listenersByType=useCapture?this[$captureListeners]:this[$listeners];
var listeners=listenersByType[type];
if(listeners){
for(var i=0;i<listeners.length;++i){
if(listeners[i]==listener){
if(listeners.length==1){
delete listenersByType[type];
}else{
listeners.splice(i,1);
}
return;
}
}
}
},
"public function hasEventListener",function(type){
return this[$listeners][type]||this[$captureListeners][type];
},
"public function toString",function(){
return["EventDispatcher[target=",this[$target],"]"].join("");
},
"private var",{captureListeners: undefined},
"private var",{listeners: undefined},
"private var",{target: undefined},
];},[],["Object","flash.events.IEventDispatcher"], "0.7.1", "0.7.5"
);
// class flash.events.IEventDispatcher
joo.classLoader.prepare("package flash.events",
"public interface IEventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[,,,,,,
];},[],[], "0.7.1", "0.7.5"
);
// class flash.events.KeyboardEvent
joo.classLoader.prepare("package flash.events",
"public class KeyboardEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[
"public var",{altKey: undefined},
"public var",{charCode: undefined},
"public var",{commandKey: undefined},
"public var",{controlKey: undefined},
"public var",{ctrlKey: undefined},
"public var",{keyCode: undefined},
"public var",{keyLocation: undefined},
"public var",{shiftKey: undefined},
"public function KeyboardEvent",function(type,bubbles,cancelable,charCodeValue,
keyCodeValue,keyLocationValue,ctrlKeyValue,
altKeyValue,shiftKeyValue,
controlKeyValue,commandKeyValue){if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){bubbles=true;}cancelable=false;}charCodeValue=0;}keyCodeValue=0;}keyLocationValue=0;}ctrlKeyValue=false;}altKeyValue=false;}shiftKeyValue=false;}controlKeyValue=false;}commandKeyValue=false;}
this[$super](type,bubbles,cancelable);
this.charCode=charCodeValue;
this.keyCode=keyCodeValue;
this.keyLocation=keyLocationValue;
this.ctrlKey=ctrlKeyValue;
this.altKey=altKeyValue;
this.shiftKey=shiftKeyValue;
this.controlKey=controlKeyValue;
this.commandKey=commandKeyValue;
},
"override public function clone",function(){
return null;
},
"override public function toString",function(){
return null;
},
"public function updateAfterEvent",function(){
},
"public static const",{KEY_DOWN:"keyDown"},
"public static const",{KEY_UP:"keyUp"},
];},[],["flash.events.Event"], "0.7.1", "0.7.5"
);
// class flash.events.MouseEvent
joo.classLoader.prepare("package flash.events",
"public class MouseEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[
"public static const",{CLICK:"click"},
"public static const",{DOUBLE_CLICK:"doubleClick"},
"public static const",{MOUSE_DOWN:"mouseDown"},
"public static const",{MOUSE_MOVE:"mouseMove"},
"public static const",{MOUSE_OUT:"mouseOut"},
"public static const",{MOUSE_OVER:"mouseOver"},
"public static const",{MOUSE_UP:"mouseUp"},
"public static const",{MOUSE_WHEEL:"mouseWheel"},
"public static const",{ROLL_OUT:"rollOut"},
"public static const",{ROLL_OVER:"rollOver"},
"public var",{altKey: undefined},
"public var",{buttonDown: undefined},
"public var",{ctrlKey: undefined},
"public var",{delta: undefined},
"public var",{localX: undefined},
"public var",{localY: undefined},
"public var",{relatedObject: undefined},
"public var",{shiftKey: undefined},
"public function get stageX",function(){
return(this.target).x+this.localX;
},
"public function get stageY",function(){
return(this.target).y+this.localY;
},
"public override function clone",function(){
return new flash.events.MouseEvent(this.type,this.bubbles,this.cancelable,this.localX,this.localY,this.relatedObject,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta);
},
"public function MouseEvent",function(type,bubbles,cancelable,
localX,localY,relatedObject,
ctrlKey,altKey,shiftKey,
buttonDown,delta){if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){type=null;}bubbles=true;}cancelable=false;}localX=NaN;}localY=NaN;}relatedObject=null;}ctrlKey=false;}altKey=false;}shiftKey=false;}buttonDown=false;}delta=0;}
this[$super](type,bubbles,cancelable);
this.localX=localX;
this.localY=localY;
this.relatedObject=relatedObject;
this.ctrlKey=ctrlKey;
this.altKey=altKey;
this.shiftKey=shiftKey;
this.buttonDown=buttonDown;
this.delta=delta;
},
"public override function toString",function(){
return this.formatToString("Event","type","bubbles","cancelable","eventPhase",
"localX","localY","relatedObject","ctrlKey","altKey","shiftKey","buttonDown","delta");
},
"public function updateAfterEvent",function(){
},
];},[],["flash.events.Event"], "0.7.1", "0.7.5"
);
// class flash.events.TimerEvent
joo.classLoader.prepare("package flash.events",
"public class TimerEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[
"public static const",{TIMER:"timer"},
"public static const",{TIMER_COMPLETE:"timerComplete"},
"public function TimerEvent",function(type,bubbles,cancelable){if(arguments.length<3){if(arguments.length<2){bubbles=false;}cancelable=false;}
this[$super](type,bubbles,cancelable);
},
"override public function clone",function(){
return new flash.events.TimerEvent(this.type,this.bubbles,this.cancelable);
},
"override public function toString",function(){
return this.formatToString("TimerEvent","type","bubbles","cancelable");
},
"public function updateAfterEvent",function(){
},
];},[],["flash.events.Event"], "0.7.1", "0.7.5"
);
// class flash.geom.ColorTransform
joo.classLoader.prepare("package flash.geom",
"public class ColorTransform",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$maps=$$l+'maps';return[function(){joo.classLoader.init(Array);},
"public var",{alphaMultiplier: undefined},
"public var",{alphaOffset: undefined},
"public var",{blueMultiplier: undefined},
"public var",{blueOffset: undefined},
"public var",{greenMultiplier: undefined},
"public var",{greenOffset: undefined},
"public var",{redMultiplier: undefined},
"public var",{redOffset: undefined},
"public function get color",function(){
return this.redOffset<<16|this.greenOffset<<8||this.blueOffset;
},
"public function set color",function(newColor){
this.redOffset=newColor>>16&0xF;
this.greenOffset=newColor>>8&0xF;
this.blueOffset=newColor&0xF;
this.redMultiplier=this.greenMultiplier=this.blueMultiplier=1;
},
"public function ColorTransform",function(redMultiplier,greenMultiplier,blueMultiplier,
alphaMultiplier,
redOffset,greenOffset,blueOffset,
alphaOffset){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){redMultiplier=1;}greenMultiplier=1;}blueMultiplier=1;}alphaMultiplier=1;}redOffset=0;}greenOffset=0;}blueOffset=0;}alphaOffset=0;}this[$super]();
this.redMultiplier=redMultiplier;
this.greenMultiplier=greenMultiplier;
this.blueMultiplier=blueMultiplier;
this.alphaMultiplier=alphaMultiplier;
this.redOffset=redOffset;
this.greenOffset=greenOffset;
this.blueOffset=blueOffset;
this.alphaOffset=alphaOffset;
},
"public function concat",function(second){
this.redMultiplier*=second.redMultiplier;
this.greenMultiplier*=second.greenMultiplier;
this.blueMultiplier*=second.blueMultiplier;
this.alphaMultiplier*=second.alphaMultiplier;
this.redOffset+=second.redOffset;
this.greenOffset+=second.greenOffset;
this.blueOffset+=second.blueOffset;
this.alphaOffset+=second.alphaOffset;
},
"private var",{maps: undefined},
"public function getComponentMaps",function(){
if(!this[$maps]){
var offsets=[this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset];
var multipliers=[this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier];
this[$maps]=new Array(4);
for(var c=0;c<4;++c){
var offset=offsets[c];
var multiplier=multipliers[c];
var map;
if(offset==0&&multiplier==1){
map=null;
}else{
map=new Array(256);
for(var b=0;b<256;++b){
var val=offset+multiplier*b;
map[b]=val<=0?0:val<=255?val:255;
}
}
this[$maps][c]=map;
}
}
return this[$maps];
},
"public function toString",function(){
return"[ColorTransform("+[this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,
this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset].join(", ")+")]";
},
];},[],["Array"], "0.7.1", "0.7.5"
);
// class flash.geom.Matrix
joo.classLoader.prepare("package flash.geom",
"public class Matrix",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.geom.Point);},
"public function Matrix",function(a,b,c,d,tx,ty){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){a=1;}b=0;}c=0;}d=1;}tx=0;}ty=0;}this[$super]();
this.a=a;
this.b=b;
this.c=c;
this.d=d;
this.tx=tx;
this.ty=ty;
},
"public var",{a: undefined},
"public var",{b: undefined},
"public var",{c: undefined},
"public var",{d: undefined},
"public var",{tx: undefined},
"public var",{ty: undefined},
"public function clone",function(){
return new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
},
"public function concat",function(m){
var a=this.a;
var b=this.b;
var c=this.c;
var d=this.d;
var tx=this.tx;
var ty=this.ty;
this.a=m.a*a+m.c*b;
this.b=m.b*a+m.d*b;
this.c=m.a*c+m.c*d;
this.d=m.b*c+m.d*d;
this.tx=m.a*tx+m.c*ty+m.tx;
this.ty=m.b*tx+m.d*ty+m.ty;
},
"public function createBox",function(scaleX,scaleY,rotation,tx,ty){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){scaleX=1;}scaleY=1;}rotation=0;}tx=0;}ty=0;}
if(rotation==0){
this.a=this.d=1;
this.b=this.c=0;
}else{
this.a=Math.cos(rotation);
this.b=Math.sin(rotation);
this.c=-this.b;
this.d=this.a;
}
if(scaleX!=1){
this.a*=scaleX;
this.c*=scaleY;
}
if(scaleY!=1){
this.b*=scaleY;
this.d*=scaleY;
}
this.tx=tx;
this.ty=ty;
},
"public static const",{MAGIC_GRADIENT_FACTOR:16384/10},
"public function createGradientBox",function(width,height,rotation,tx,ty){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){width=NaN;}height=NaN;}rotation=0;}tx=0;}ty=0;}
this.createBox(width/flash.geom.Matrix.MAGIC_GRADIENT_FACTOR,height/flash.geom.Matrix.MAGIC_GRADIENT_FACTOR,rotation,tx+width/2,ty+height/2);
},
"public function transformPoint",function(point){
return new flash.geom.Point(this.a*point.x+this.c*point.y+this.tx,this.b*point.x+this.d*point.y+this.ty);
},
"public function deltaTransformPoint",function(point){
return new flash.geom.Point(this.a*point.x+this.c*point.y,this.b*point.x+this.d*point.y);
},
"public function identity",function(){
this.a=this.d=1;
this.b=this.c=this.tx=this.ty=0;
},
"public function invert",function(){
var a=this.a;
var b=this.b;
var c=this.c;
var d=this.d;
var tx=this.tx;
var ty=this.ty;
var det=a*d-c*b;
this.a=d/det;
this.b=-b/det;
this.c=-c/det;
this.d=a/det;
this.tx=(c*ty-tx*d)/det;
this.ty=(tx*b-a*ty)/det;
},
"public function translate",function(dx,dy){
this.tx+=dx;this.ty+=dy;
},
"public function scale",function(sx,sy){
if(sx!=1){
this.a*=sx;
this.c*=sx;
}
if(sy!=1){
this.b*=sy;
this.d*=sy;
}
},
"public function rotate",function(angle){
if(angle!=0){
var cos=Math.cos(angle);
var sin=Math.sin(angle);
var a=this.a;
var b=this.b;
var c=this.c;
var d=this.d;
this.a=a*cos-c*sin;
this.b=a*sin+c*cos;
this.c=b*cos-d*sin;
this.d=b*sin+d*cos;
}
},
"public function toString",function(){
return"("+["a="+this.a,"b="+this.b,"c="+this.c,"d="+this.d,"tx="+this.tx,"ty="+this.ty].join(", ")+")";
},
];},[],["Math","flash.geom.Point"], "0.7.1", "0.7.5"
);
// class flash.geom.Point
joo.classLoader.prepare("package flash.geom",
"public class Point",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function Point",function(x,y){if(arguments.length<2){if(arguments.length<1){x=0;}y=0;}this[$super]();
this.x=x;
this.y=y;
},
"public function get length",function(){
return Math.sqrt(this.x^2+this.y^2);
},
"public var",{x: undefined},
"public var",{y: undefined},
"public function add",function(v){
return new flash.geom.Point(this.x+v.x,this.y+v.y);
},
"public function clone",function(){
return new flash.geom.Point(this.x,this.y);
},
"public static function distance",function(pt1,pt2){
return Math.sqrt((pt2.x-pt1.x)^2+(pt2.y-pt2.y)^2);
},
"public function equals",function(toCompare){
return this.x==toCompare.x&&this.y==toCompare.y;
},
"public static function interpolate",function(pt1,pt2,f){
return 0;
},
"public function normalize",function(thickness){
},
"public function offset",function(dx,dy){
this.x+=dx;
this.y+=dy;
},
"public static function polar",function(len,angle){
return null;
},
"public function subtract",function(v){
return new flash.geom.Point(this.x-v.x,this.y-v.y);
},
"public function toString",function(){
return["(x=",this.x,", y=",this.y,")"].join("");
},
];},["distance","interpolate","polar"],["Math"], "0.7.1", "0.7.5"
);
// class flash.geom.Rectangle
joo.classLoader.prepare("package flash.geom",
"public class Rectangle",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.geom.Point);},
"public var",{height: undefined},
"public var",{width: undefined},
"public var",{x: undefined},
"public var",{y: undefined},
"public function get topLeft",function(){
return new flash.geom.Point(this.x,this.y);
},
"public function set topLeft",function(topLeft){
this.left=topLeft.x;
this.top=topLeft.y;
},
"public function get bottom",function(){
return this.x+this.height;
},
"public function set bottom",function(value){
this.height=value-this.x;
},
"public function get bottomRight",function(){
return new flash.geom.Point(this.right,this.bottom);
},
"public function set bottomRight",function(bottomRight){
this.right=bottomRight.x;
this.bottom=bottomRight.y;
},
"public function get left",function(){
return this.x+this.width;
},
"public function set left",function(left){
this.width+=this.x-left;
this.x=left;
},
"public function get right",function(){
return this.x+this.width;
},
"public function set right",function(value){
this.width=value-this.x;
},
"public function get size",function(){
return new flash.geom.Point(this.width,this.height);
},
"public function set size",function(value){
this.width=value.x;
this.height=value.y;
},
"public function get top",function(){
return this.y;
},
"public function set top",function(value){
this.height+=this.y-value;
this.y=value;
},
"public function clone",function(){
return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
},
"public function contains",function(x,y){
return this.x<=x&&x<=this.right&&this.y<=y&&y<=this.bottom;
},
"public function containsPoint",function(point){
return this.contains(point.x,point.y);
},
"public function containsRect",function(rect){
return this.containsPoint(rect.topLeft)&&this.containsPoint(rect.bottomRight);
},
"public function equals",function(toCompare){
return this.x==toCompare.x&&this.y==toCompare.y&&this.width==toCompare.width&&this.height==toCompare.height;
},
"public function inflate",function(dx,dy){
this.width+=dx;
this.height+=dy;
},
"public function inflatePoint",function(point){
this.inflate(point.x,point.y);
},
"public function intersection",function(toIntersect){
var x=Math.max(this.x,toIntersect.x);
var right=Math.min(this.right,toIntersect.right);
if(x<=right){
var y=Math.max(this.y,toIntersect.y);
var bottom=Math.min(this.bottom,toIntersect.bottom);
if(y<=bottom){
return new flash.geom.Rectangle(x,y,right-x,bottom-y);
}
}
return new flash.geom.Rectangle();
},
"public function intersects",function(toIntersect){
return Math.max(this.x,toIntersect.x)<=Math.min(this.right,toIntersect.right)
&&Math.max(this.y,toIntersect.y)<=Math.min(this.bottom,toIntersect.bottom);
},
"public function isEmpty",function(){
return this.x==0&&this.y==0&&this.width==0&&this.height==0;
},
"public function offset",function(dx,dy){
this.x+=dx;
this.y+=dy;
},
"public function offsetPoint",function(point){
this.offset(point.x,point.y);
},
"public function Rectangle",function(x,y,width,height){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){x=0;}y=0;}width=0;}height=0;}this[$super]();
this.x=x;
this.y=y;
this.width=width;
this.height=height;
},
"public function setEmpty",function(){
this.x=this.y=this.width=this.height=0;
},
"public function toString",function(){
return"[Rectangle("+[this.x,this.y,this.width,this.height].join(", ")+")]";
},
"public function union",function(toUnion){
var x=Math.min(this.x,toUnion.x);
var y=Math.min(this.y,toUnion.y);
return new flash.geom.Rectangle(x,y,Math.max(this.right,toUnion.right)-x,Math.max(this.bottom-toUnion.bottom)-y);
},
];},[],["flash.geom.Point","Math"], "0.7.1", "0.7.5"
);
// class flash.geom.Transform
joo.classLoader.prepare("package flash.geom",
"public class Transform",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$displayObject=$$l+'displayObject',$_colorTransform=$$l+'_colorTransform',$_matrix=$$l+'_matrix';return[function(){joo.classLoader.init(flash.geom.Rectangle);},
"public function Transform",function(displayObject){this[$super]();
this[$displayObject]=displayObject;
},
"private var",{displayObject: undefined},
"public function get colorTransform",function(){
return this[$_colorTransform];
},
"public function set colorTransform",function(value){
this[$_colorTransform]=value;
},
"private var",{_colorTransform: undefined},
"public function get concatenatedColorTransform",function(){
var concCT=this[$_colorTransform];
var currentDO=this[$displayObject].parent;
while(currentDO){
concCT.concat(currentDO.transform.colorTransform);
currentDO=currentDO.parent;
}
return this.colorTransform;
},
"public function get matrix",function(){
return this[$_matrix];
},
"public function set matrix",function(value){
this[$_matrix]=value;
this[$displayObject].transform=this;
},
"private var",{_matrix: undefined},
"public function get concatenatedMatrix",function(){
var concMatrix=this[$_matrix];
var currentDO=this[$displayObject].parent;
while(currentDO){
concMatrix.concat(currentDO.transform.matrix);
currentDO=currentDO.parent;
}
return concMatrix;
},
"public function get pixelBounds",function(){
return new flash.geom.Rectangle(this[$displayObject].x,this[$displayObject].y,this[$displayObject].width,this[$displayObject].height);
},
];},[],["flash.geom.Rectangle"], "0.7.1", "0.7.5"
);
// class flash.net.URLLoader
joo.classLoader.prepare("package flash.net",
"public class URLLoader extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$readyStateChanged=$$l+'readyStateChanged',$createEvent=$$l+'createEvent',$xmlHttpRequest=$$l+'xmlHttpRequest';return[function(){joo.classLoader.init(flash.events.Event,js.XMLHttpRequest,Error,flash.net.URLLoaderDataFormat);},
"public var",{bytesLoaded:0},
"public var",{bytesTotal:0},
"public var",{data: undefined},
"public var",{dataFormat:function(){return(flash.net.URLLoaderDataFormat.TEXT);}},
"public function URLLoader",function(request){if(arguments.length<1){request=null;}this[$super]();this.dataFormat=this.dataFormat();
if(request){
this.load(request);
}
},
"public function close",function(){
this[$xmlHttpRequest].abort();
},
"public function load",function(request){
try{
this[$xmlHttpRequest]=new js.XMLHttpRequest();
}catch(e){if(is(e,Error)){
throw new Error("Your browser does not support XMLHttpRequest: "+e.message);
}else throw e;}
this[$xmlHttpRequest].onreadystatechange=$$bound(this,$readyStateChanged);
this[$xmlHttpRequest].open(request.method,request.url,true);
this[$xmlHttpRequest].send(null);
},
"private function readyStateChanged",function(){
trace("URLLoader: "+this[$xmlHttpRequest].readyState);
if(this[$xmlHttpRequest].readyState==js.XMLHttpRequest.DONE){
this.data=this[$xmlHttpRequest].responseText;
}
var event=this[$createEvent]();
if(event){
this.dispatchEvent(event);
}
},
"private function createEvent",function(){
switch(this[$xmlHttpRequest].readyState){
case js.XMLHttpRequest.OPENED:return new flash.events.Event(flash.events.Event.OPEN,false,false);
case js.XMLHttpRequest.DONE:return new flash.events.Event(flash.events.Event.COMPLETE,false,false);
}
return null;
},
"private var",{xmlHttpRequest: undefined},
];},[],["flash.events.EventDispatcher","flash.net.URLLoaderDataFormat","js.XMLHttpRequest","Error","flash.events.Event"], "0.7.1", "0.7.5"
);
// class flash.net.URLLoaderDataFormat
joo.classLoader.prepare("package flash.net",
"public class URLLoaderDataFormat",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static const",{BINARY:"binary"},
"public static const",{TEXT:"text"},
"public static const",{VARIABLES:"variables"},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.net.URLRequest
joo.classLoader.prepare("package flash.net",
"public class URLRequest",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.net.URLRequestMethod);},
"public function URLRequest",function(url){if(arguments.length<1){url=null;}this[$super]();this.method=this.method();
this.url=url;
},
"public var",{contentType: undefined},
"public var",{data: undefined},
"public var",{method:function(){return(flash.net.URLRequestMethod.GET);}},
"public var",{requestHeaders: undefined},
"public var",{url: undefined},
];},[],["flash.net.URLRequestMethod"], "0.7.1", "0.7.5"
);
// class flash.net.URLRequestHeader
joo.classLoader.prepare("package flash.net",
"public class URLRequestHeader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public var",{name: undefined},
"public var",{value: undefined},
"public function URLRequestHeader",function(name,value){if(arguments.length<2){if(arguments.length<1){name="";}value="";}this[$super]();
},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.net.URLRequestMethod
joo.classLoader.prepare("package flash.net",
"public class URLRequestMethod",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static const",{GET:"GET"},
"public static const",{POST:"POST"},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.net.URLVariables
joo.classLoader.prepare("package flash.net",
"public class URLVariables",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function URLVariables",function(source){if(arguments.length<1){source=null;}this[$super]();
},
"public function decode",function(source){
},
"public function toString",function(){
return"";
},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.system.Capabilities
joo.classLoader.prepare("package flash.system",
"public class Capabilities",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static function get isDebugger",function(){
return true;
},
"public static function get os",function(){
return"jangaroo";
},
"public static function get version",function(){
return"jangaroo";
},
];},["isDebugger","os","version"],[], "0.7.1", "0.7.5"
);
// class flash.system.System
joo.classLoader.prepare("package flash.system",
"public class System",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function System",function(){this[$super]();
},
"public static function get totalMemory",function(){
return 0;
},
"public static function setClipboard",function(c){
},
];},["totalMemory","setClipboard"],[], "0.7.1", "0.7.5"
);
// class flash.text.TextField
joo.classLoader.prepare("package flash.text",
"public class TextField extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_backgroundColor=$$l+'_backgroundColor',$_border=$$l+'_border',$_borderColor=$$l+'_borderColor',$_defaultTextFormat=$$l+'_defaultTextFormat',$_htmlText=$$l+'_htmlText',$_text=$$l+'_text',$getElementName=$$l+'getElementName',$updateElementProperty=$$l+'updateElementProperty';return[function(){joo.classLoader.init(flash.text.TextFormatAlign,flash.text.TextFormat);},
"public function TextField",function(){
this[$super]();
this.defaultTextFormat=new flash.text.TextFormat();
},
"public var",{alwaysShowSelection: undefined},
"public var",{antiAliasType: undefined},
"public var",{autoSize: undefined},
"public var",{background: undefined},
"private var",{_backgroundColor: undefined},
"public function get backgroundColor",function(){
return this[$_backgroundColor];
},
"public function set backgroundColor",function(val){
this[$_backgroundColor]=val;
this[$updateElementProperty]("style.backgroundColor",flash.display.Graphics.toRGBA(val));
},
"private var",{_border: undefined},
"public function get border",function(){
return this[$_border];
},
"public function set border",function(val){
this[$_border]=val;
this[$updateElementProperty]("style.borderWidth",val?"1px":"0");
},
"private var",{_borderColor: undefined},
"public function get borderColor",function(){
return this[$_borderColor];
},
"public function set borderColor",function(val){
this[$_borderColor]=val;
this[$updateElementProperty]("style.borderColor",flash.display.Graphics.toRGBA(val));
},
"public var",{bottomScrollV: undefined},
"public var",{caretIndex: undefined},
"public var",{condenseWhite: undefined},
"private var",{_defaultTextFormat: undefined},
"public function get defaultTextFormat",function(){
return this[$_defaultTextFormat];
},
"public function set defaultTextFormat",function(val){
this[$_defaultTextFormat]=val;
this[$updateElementProperty]("style.fontFamily",val.font||"serif");
this[$updateElementProperty]("style.fontSize",val.size||"12px");
this[$updateElementProperty]("style.color",val.color?flash.display.Graphics.toRGBA(val.color):"black");
this[$updateElementProperty]("style.fontWeight",val.bold?"bold":"normal");
this[$updateElementProperty]("style.textAlign",val.align||flash.text.TextFormatAlign.LEFT);
},
"public var",{displayAsPassword: undefined},
"public var",{embedFonts: undefined},
"public var",{gridFitType: undefined},
"private var",{_htmlText: undefined},
"public function get htmlText",function(){
return this[$_htmlText];
},
"public function set htmlText",function(val){
this[$_htmlText]=val;
this[$updateElementProperty]("innerHTML",val);
},
"public var",{length: undefined},
"public var",{maxChars: undefined},
"public var",{maxScrollH: undefined},
"public var",{maxScrollV: undefined},
"public var",{mouseWheelEnabled: undefined},
"public var",{multiline: undefined},
"public var",{numLines: undefined},
"public var",{restrict: undefined},
"public var",{scrollH: undefined},
"public var",{scrollV: undefined},
"public var",{selectable: undefined},
"public var",{selectedText: undefined},
"public var",{selectionBeginIndex: undefined},
"public var",{selectionEndIndex: undefined},
"public var",{sharpness: undefined},
"private var",{_text: undefined},
"public function get text",function(){
return this[$_text];
},
"public function set text",function(val){
this[$_text]=val;
this[$updateElementProperty]("innerHTML",val.replace(/\n/g,'<br />'));
},
"public var",{_textColor: undefined},
"public function get textColor",function(){
return this._textColor;
},
"public function set textColor",function(val){
this._textColor=val;
this[$updateElementProperty]("style.color",flash.display.Graphics.toRGBA(val));
},
"public var",{textHeight: undefined},
"public var",{textWidth: undefined},
"public var",{thickness: undefined},
"public var",{type: undefined},
"public var",{useRichTextClipboard: undefined},
"public var",{wordWrap: undefined},
"override protected function getElementName",function(){
return"span";
},
"private function updateElementProperty",function(propertyPath,value){
var element=this.getElement();
if(element){
var propertyPathArcs=propertyPath.split(".");
var lastIndex=propertyPathArcs.length-1;
for(var i=0;i<lastIndex;++i){
element=element[propertyPathArcs[i]];
}
element[propertyPathArcs[lastIndex]]=value;
}
},
];},[],["flash.display.InteractiveObject","flash.text.TextFormat","flash.display.Graphics","flash.text.TextFormatAlign"], "0.7.1", "0.7.5"
);
// class flash.text.TextFormat
joo.classLoader.prepare("package flash.text",
"public class TextFormat extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function TextFormat",function(font,size,color,
bold,italic,underline,
url,target,align,
leftMargin,rightMargin,
indent,leading){if(arguments.length<13){if(arguments.length<12){if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){font=null;}size=null;}color=null;}bold=null;}italic=null;}underline=null;}url=null;}target=null;}align=null;}leftMargin=null;}rightMargin=null;}indent=null;}leading=null;}this[$super]();
this.align=align;
this.blockIndent=this.blockIndent;
this.bold=bold;
this.bullet=this.bullet;
this.color=color;
this.display=this.display;
this.font=font;
this.indent=indent;
this.italic=italic;
this.kerning=this.kerning;
this.leading=leading;
this.leftMargin=leftMargin;
this.letterSpacing=this.letterSpacing;
this.rightMargin=rightMargin;
this.size=size;
this.tabStops=this.tabStops;
this.target=target;
this.underline=underline;
this.url=url;
},
"public var",{align: undefined},
"public var",{blockIndent: undefined},
"public var",{bold: undefined},
"public var",{bullet: undefined},
"public var",{color: undefined},
"public var",{display: undefined},
"public var",{font: undefined},
"public var",{indent: undefined},
"public var",{italic: undefined},
"public var",{kerning: undefined},
"public var",{leading: undefined},
"public var",{leftMargin: undefined},
"public var",{letterSpacing: undefined},
"public var",{rightMargin: undefined},
"public var",{size: undefined},
"public var",{tabStops: undefined},
"public var",{target: undefined},
"public var",{underline: undefined},
"public var",{url: undefined},
];},[],["Object"], "0.7.1", "0.7.5"
);
// class flash.text.TextFormatAlign
joo.classLoader.prepare("package flash.text",
"public final class TextFormatAlign",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static const",{CENTER:"center"},
"public static const",{JUSTIFY:"justify"},
"public static const",{LEFT:"left"},
"public static const",{RIGHT:"right"},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.utils.Dictionary
joo.classLoader.prepare("package flash.utils",
"public class Dictionary",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function Dictionary",function(weak){if(arguments.length<1){weak=false;}this[$super]();
},
];},[],[], "0.7.1", "0.7.5"
);
// class flash.utils.Timer
joo.classLoader.prepare("package flash.utils",
"public class Timer extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_delay=$$l+'_delay',$_repeatCount=$$l+'_repeatCount',$_currentCount=$$l+'_currentCount',$tick=$$l+'tick',$checkComplete=$$l+'checkComplete',$timer=$$l+'timer';return[function(){joo.classLoader.init(flash.events.TimerEvent);},

"public function Timer",function(delay,repeatCount){if(arguments.length<2){repeatCount=0;}this[$super]();
this[$_delay]=delay;
this[$_repeatCount]=repeatCount;
},
"public function get delay",function(){
return this[$_delay];
},
"public function set delay",function(val){
this[$_delay]=val;
if(this[$timer]){
this.stop();
this.start();
}
},
"private var",{_delay: undefined},
"public function get repeatCount",function(){
return this[$_repeatCount];
},
"public function set repeatCount",function(val){
this[$_repeatCount]=val;
this[$checkComplete]();
},
"private var",{_repeatCount: undefined},
"public function get running",function(){
return this[$timer]!=null;
},
"public function get currentCount",function(){
return this[$_currentCount];
},
"private var",{_currentCount:0},
"public function start",function(){
if(!this[$timer]){
this[$timer]=window.setInterval($$bound(this,$tick),this[$_delay]);
}
},
"public function stop",function(){
if(this[$timer]){
window.clearInterval(this[$timer]);
this[$timer]=null;
}
},
"public function reset",function(){
this.stop();
this[$_currentCount]=0;
},
"private function tick",function(){
if(!this[$timer]){
return;
}
++this[$_currentCount];
try{
this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER));
}finally{
this[$checkComplete]();
}
},
"private function checkComplete",function(){
if(this[$_repeatCount]>0&&this[$_currentCount]>=this[$_repeatCount]){
this.stop();
this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER_COMPLETE));
}
},
"private var",{timer:null},
];},[],["flash.events.EventDispatcher","flash.events.TimerEvent"], "0.7.1", "0.7.5"
);
// class joo.flash.Run
joo.classLoader.prepare("package joo.flash",
"public class Run",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static function main",function(id,primaryDisplayObjectClassName){
(joo.classLoader).import_(primaryDisplayObjectClassName);
(joo.classLoader).complete(function(){
var stage=flash.display.Stage.getInstance(id);
var primaryDisplayObjectClass=joo.getQualifiedObject(primaryDisplayObjectClassName);
stage.addChildAt(new primaryDisplayObjectClass(),0);
});
},
];},["main"],["flash.display.Stage"], "0.7.1", "0.7.5"
);
