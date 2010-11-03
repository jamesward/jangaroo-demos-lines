joo.classLoader.prepare("package",
"public class ParticleApplication extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$bitmap=$$l+'bitmap',$shape=$$l+'shape',$particles=$$l+'particles',$forceXPhase=$$l+'forceXPhase',$forceYPhase=$$l+'forceYPhase',$init=$$l+'init',$onEnterFrame=$$l+'onEnterFrame',$render=$$l+'render';return[function(){joo.classLoader.init(flash.display.BitmapData,flash.display.Bitmap,FPS,flash.geom.Matrix,flash.display.PixelSnapping,Array,Math,flash.display.GradientType,flash.display.Shape,flash.events.Event,Particle,flash.geom.ColorTransform);},

"static public const",{WIDTH:384},
"static public const",{HEIGHT:384},
"static private const",{PARTICLE_NUM:100},
"private var",{bitmap: undefined},
"private var",{shape: undefined},
"private var",{particles: undefined},
"private var",{forceXPhase: undefined},
"private var",{forceYPhase: undefined},
"public function ParticleApplication",function()
{this[$super]();
this[$init]();
},
"private function init",function()
{
var m=new flash.geom.Matrix();
m.createGradientBox(ParticleApplication.WIDTH,ParticleApplication.HEIGHT,Math.PI/2);
this.graphics.beginGradientFill(flash.display.GradientType.LINEAR,[0x212121,0x404040,0x0],[1,1,1],[0,0x84,0xff],m);
this.graphics.drawRect(0,0,ParticleApplication.WIDTH,ParticleApplication.HEIGHT);
this.graphics.endFill();
this[$forceXPhase]=Math.random()*Math.PI;
this[$forceYPhase]=Math.random()*Math.PI;
this[$particles]=new Array();
var particle;
var a;
var r;
for(var i=0;i<$$private.PARTICLE_NUM;i++)
{
a=Math.PI*2/$$private.PARTICLE_NUM*i;
r=(1+i/$$private.PARTICLE_NUM*4)*1;
particle=new Particle(Math.cos(a)*32,Math.sin(a)*32);
particle.vx=Math.sin(-a)*r;
particle.vy=-Math.cos(a)*r;
this[$particles].push(particle);
}
this[$bitmap]=new flash.display.Bitmap(new flash.display.BitmapData(ParticleApplication.WIDTH,ParticleApplication.HEIGHT,true,0),flash.display.PixelSnapping.AUTO,false);
this.addChild(this[$bitmap]);
this[$shape]=new flash.display.Shape();
this[$shape].transform.matrix=new flash.geom.Matrix(1,0,0,1,ParticleApplication.WIDTH>>1,ParticleApplication.HEIGHT>>1);
this.addEventListener(flash.events.Event.ENTER_FRAME,$$bound(this,$onEnterFrame));
this.addChild(new FPS());
},
"private function onEnterFrame",function(event)
{
this[$render]();
},
"private function render",function()
{
var bitmapData=this[$bitmap].bitmapData;
bitmapData.colorTransform(bitmapData.rect,new flash.geom.ColorTransform(1,1,1,1,0,0,0,-1));
var p0;
var p1;
var dx;
var dy;
var dd;
this[$shape].graphics.clear();
this[$shape].graphics.lineStyle(0,0xffffff,1);
this[$forceXPhase]+=.0025261;
this[$forceYPhase]+=.000621;
var forceX=1000+Math.sin(this[$forceXPhase])*500;
var forceY=1000+Math.sin(this[$forceYPhase])*500;
for(var $1 in this[$particles])
{p0=this[$particles][$1];
this[$shape].graphics.moveTo(p0.sx+192,p0.sy+192);
p0.vx-=p0.sx/forceX;
p0.vy-=p0.sy/forceY;
p0.sx+=p0.vx;
p0.sy+=p0.vy;
this[$shape].graphics.lineTo(p0.sx+192,p0.sy+192);
}
bitmapData.draw(this[$shape]);
},
];},[],["flash.display.Sprite","flash.geom.Matrix","Math","flash.display.GradientType","Array","Particle","flash.display.Bitmap","flash.display.BitmapData","flash.display.PixelSnapping","flash.display.Shape","flash.events.Event","FPS","flash.geom.ColorTransform"], "0.7.1", "0.7.5"
);