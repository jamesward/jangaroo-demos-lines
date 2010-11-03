joo.classLoader.prepare("package",/*
{
	import flash.display.Bitmap
	import flash.display.BitmapData
	import flash.display.GradientType
	import flash.display.PixelSnapping
	import flash.display.Shape
	import flash.display.Sprite
	import flash.events.Event
//	import flash.filters.BlurFilter;
	import flash.geom.ColorTransform
	import flash.geom.Matrix*/
//	import flash.geom.Point;
//	import flash.media.SoundChannel;
//	import flash.media.SoundTransform;

	/**
	 * @author Andre Michelle, http://lab.andre-michelle.com/lines
	 * Adapted for Jangaroo by Frank Wienberg (FWI).
	 */
	"public class ParticleApplication extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$bitmap=$$l+'bitmap',$shape=$$l+'shape',$particles=$$l+'particles',$forceXPhase=$$l+'forceXPhase',$forceYPhase=$$l+'forceYPhase',$init=$$l+'init',$onEnterFrame=$$l+'onEnterFrame',$render=$$l+'render';return[function(){joo.classLoader.init(flash.display.BitmapData,flash.display.Bitmap,FPS,flash.geom.Matrix,flash.display.PixelSnapping,Array,Math,flash.display.GradientType,flash.display.Shape,flash.events.Event,Particle,flash.geom.ColorTransform);},
	
		"static public const",{ WIDTH/*: int*/ : 384},
		"static public const",{ HEIGHT/*: int*/ : 384},
		
		"static private const",{ PARTICLE_NUM/*: int*/ : 100},
		
		"private var",{ bitmap/*: Bitmap*/: undefined},
		// FWI optimization: always reuse the same Shape object!
		"private var",{ shape/*: Shape*/: undefined},
		
		"private var",{ particles/*: Array*/: undefined},
		
		"private var",{ forceXPhase/*: Number*/: undefined},
		"private var",{ forceYPhase/*: Number*/: undefined},
		
		"public function ParticleApplication",function $ParticleApplication()
		{this[$super]();
			//stage.frameRate = 44.444;
			this[$init]();
		},
		
		"private function init",function init()/*: void*/
		{
			var m/*: Matrix*/ = new flash.geom.Matrix();
			m.createGradientBox( ParticleApplication.WIDTH, ParticleApplication.HEIGHT, Math.PI/2 );
			
			this.graphics.beginGradientFill( flash.display.GradientType.LINEAR, [ 0x212121, 0x404040, 0x0 ], [ 1, 1, 1 ], [ 0, 0x84, 0xff ], m );
			this.graphics.drawRect( 0, 0, ParticleApplication.WIDTH, ParticleApplication.HEIGHT );
			this.graphics.endFill();
			
			this[$forceXPhase] = Math.random() * Math.PI;
			this[$forceYPhase] = Math.random() * Math.PI;
			
			this[$particles] = new Array();
			
			var particle/*: Particle*/;
			
			var a/*: Number*/;
			var r/*: Number*/;
			
			for( var i/*: int*/ = 0 ; i < $$private.PARTICLE_NUM ; i++ )
			{
				a = Math.PI * 2 / $$private.PARTICLE_NUM * i;
				r = ( 1 + i / $$private.PARTICLE_NUM * 4 ) * 1;
				
				particle = new Particle( Math.cos( a ) * 32, Math.sin( a ) * 32 );
				particle.vx = Math.sin( -a ) * r;
				particle.vy = -Math.cos( a ) * r;
				this[$particles].push( particle );
			}
			
			this[$bitmap] = new flash.display.Bitmap( new flash.display.BitmapData ( ParticleApplication.WIDTH, ParticleApplication.HEIGHT, true, 0 ), flash.display.PixelSnapping.AUTO, false );
			this.addChild( this[$bitmap] );
			
			// FWI optimization: always reuse the same Shape object!
			this[$shape] = new flash.display.Shape();
			// FWI: transform on drawing, not on blitting into the bitmap:
			this[$shape].transform.matrix = new flash.geom.Matrix( 1, 0, 0, 1, ParticleApplication.WIDTH >> 1, ParticleApplication.HEIGHT >> 1 );
			this.addEventListener( flash.events.Event.ENTER_FRAME, $$bound(this,$onEnterFrame) );
			
			this.addChild( new FPS() );
		},
		
		"private function onEnterFrame",function onEnterFrame( event/*: Event*/ )/*: void*/
		{
			this[$render]();
		},
		
		"private function render",function render()/*: void*/
		{
			var bitmapData/*: BitmapData*/ = this[$bitmap].bitmapData;
			
			bitmapData.colorTransform( bitmapData.rect, new flash.geom.ColorTransform( 1, 1, 1, 1, 0, 0, 0, -1 ) );
			
			var p0/*: Particle*/;
			var p1/*: Particle*/;
			
			var dx/*: Number*/;
			var dy/*: Number*/;
			var dd/*: Number*/;
			
			// FWI optimization: always reuse the same Shape object!
			//var shape: Shape = new Shape();
			
			this[$shape].graphics.clear();
			this[$shape].graphics.lineStyle( 0, 0xffffff, 1 );
			
			this[$forceXPhase] += .0025261;
			this[$forceYPhase] += .000621;
			
			var forceX/*: Number*/ = 1000 + Math.sin( this[$forceXPhase] ) * 500;
			var forceY/*: Number*/ = 1000 + Math.sin( this[$forceYPhase] ) * 500;
			
			for/* each*/(var $1 in this[$particles] )
			{ p0= this[$particles][$1];
				this[$shape].graphics.moveTo( p0.sx + 192, p0.sy + 192);
				
				p0.vx -= p0.sx / forceX;
				p0.vy -= p0.sy / forceY;
				
				p0.sx += p0.vx;
				p0.sy += p0.vy;
				
				this[$shape].graphics.lineTo( p0.sx + 192, p0.sy + 192);
			}
			
			// FWI optimization: always reuse the same Shape object!
			// FWI: transform on drawing, not on blitting into the bitmap:
//			bitmapData.draw( shape, new Matrix( 1, 0, 0, 1, WIDTH >> 1, HEIGHT >> 1 ) );
			bitmapData.draw( this[$shape] );
		},
	];},[],["flash.display.Sprite","flash.geom.Matrix","Math","flash.display.GradientType","Array","Particle","flash.display.Bitmap","flash.display.BitmapData","flash.display.PixelSnapping","flash.display.Shape","flash.events.Event","FPS","flash.geom.ColorTransform"], "0.7.1", "0.7.5"
);