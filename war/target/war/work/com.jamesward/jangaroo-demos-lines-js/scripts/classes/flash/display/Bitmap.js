joo.classLoader.prepare("package flash.display",/* {
import js.Element*/

"public class Bitmap extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createElement=$$l+'createElement',$_bitmapData=$$l+'_bitmapData',$_pixelSnapping=$$l+'_pixelSnapping',$_smoothing=$$l+'_smoothing';return[ 

  /**
   * Initializes a Bitmap object to refer to the specified BitmapData object.
   *
   * @param bitmapData (default = null) The BitmapData object being referenced.
   * @param pixelSnapping (default = "auto") Whether or not the Bitmap object is snapped to the nearest pixel.
   * @param smoothing (default = false) Whether or not the bitmap is smoothed when scaled.
   */
  "public function Bitmap",function $Bitmap(bitmapData/* : BitmapData = null*/, pixelSnapping/* : String = "auto"*/, smoothing/* : Boolean = false*/) {if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){bitmapData = null;}pixelSnapping = "auto";}smoothing = false;}
    this[$_bitmapData] = bitmapData;
    this[$super]();
    this[$_pixelSnapping] = pixelSnapping;
    this[$_smoothing] = smoothing;
  },

  "override protected function createElement",function createElement()/* : Element*/ {
    return this[$_bitmapData].canvas;
  },

  /**
   * The BitmapData object being referenced.
   * @return the BitmapData object being referenced.
   */
  "public function get bitmapData",function get$bitmapData()/* : BitmapData*/ {
    return this[$_bitmapData];
  },

  "public function set bitmapData",function set$bitmapData(value/* : BitmapData*/)/* : void*/ {
    this[$_bitmapData] = value;
  },

  /**
   * Returns whether or not the Bitmap object is snapped to the nearest pixel. The PixelSnapping class includes
   * possible values:
   * <ul>
   *   <li>PixelSnapping.NEVER�No pixel snapping occurs.
   *   <li>PixelSnapping.ALWAYS�The image is always snapped to the nearest pixel, independent of transformation.
   *   <li>PixelSnapping.AUTO�The image is snapped to the nearest pixel if it is drawn with no rotation or skew and it
   *       is drawn at a scale factor of 99.9% to 100.1%. If these conditions are satisfied, the bitmap image is drawn
   *       at 100% scale, snapped to the nearest pixel. Internally, this value allows the image to be drawn as fast as
   *       possible using the vector renderer.
   * </ul>
   * @return whether or not the Bitmap object is snapped to the nearest pixel.
   */
  "public function get pixelSnapping",function get$pixelSnapping()/* : String*/ {
    return this[$_pixelSnapping];
  },

  /**
   * Controls whether or not the Bitmap object is snapped to the nearest pixel. The PixelSnapping class includes
   * possible values:
   * <ul>
   *   <li>PixelSnapping.NEVER�No pixel snapping occurs.
   *   <li>PixelSnapping.ALWAYS�The image is always snapped to the nearest pixel, independent of transformation.
   *   <li>PixelSnapping.AUTO�The image is snapped to the nearest pixel if it is drawn with no rotation or skew and it
   *       is drawn at a scale factor of 99.9% to 100.1%. If these conditions are satisfied, the bitmap image is drawn
   *       at 100% scale, snapped to the nearest pixel. Internally, this value allows the image to be drawn as fast as
   *       possible using the vector renderer.
   * </ul>
   * @return whether or not the Bitmap object is snapped to the nearest pixel.
   */
  "public function set pixelSnapping",function set$pixelSnapping(value/* : String*/)/* : void*/ {
    this[$_pixelSnapping] = value;
  },

  /**
   * Returns whether or not the bitmap is smoothed when scaled. If true, the bitmap is smoothed when scaled. If false,
   * the bitmap is not smoothed when scaled.
   * @return whether or not the bitmap is smoothed when scaled.
   */
  "public function get smoothing",function get$smoothing()/*:Boolean*/ {
    return this[$_smoothing];
  },

  /**
   * Controls whether or not the bitmap is smoothed when scaled. If true, the bitmap is smoothed when scaled. If false,
   * the bitmap is not smoothed when scaled.
   */
  "public function set smoothing",function set$smoothing(value/* : Boolean*/)/* : void*/ {
    this[$_smoothing] = value;
  },

  "private var",{ _bitmapData/* : BitmapData*/: undefined},
  "private var",{ _pixelSnapping/* : String*/: undefined},
  "private var",{ _smoothing/* : Boolean*/: undefined},

];},[],["flash.display.DisplayObject"], "0.7.1", "0.7.5"
);