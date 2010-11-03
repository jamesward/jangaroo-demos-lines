package
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.GradientType;
	import flash.display.PixelSnapping;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
//	import flash.filters.BlurFilter;
	import flash.geom.ColorTransform;
	import flash.geom.Matrix;
//	import flash.geom.Point;
//	import flash.media.SoundChannel;
//	import flash.media.SoundTransform;

	/**
	 * @author Andre Michelle, http://lab.andre-michelle.com/lines
	 * Adapted for Jangaroo by Frank Wienberg (FWI).
	 */
	public class ParticleApplication extends flash.display.Sprite
	{
		static public const WIDTH: int = 384;
		static public const HEIGHT: int = 384;
		
		public native function ParticleApplication();
	}
}