joo.classLoader.prepare("package flash.display",/* {*/

/**
 * The BitmapDataChannel class is an enumeration of constant values that indicate which channel to use:
 * red, blue, green, or alpha transparency.
 * <p>When you call some methods, you can use the bitwise OR operator (|) to combine BitmapDataChannel constants to
 * indicate multiple color channels.
 * <p>The BitmapDataChannel constants are provided for use as values in the following:
 * <ul>
 * <li>The sourceChannel and destChannel parameters of the flash.display.BitmapData.copyChannel() method
 * <li>The channelOptions parameter of the flash.display.BitmapData.noise() method
 * <li>The flash.filters.DisplacementMapFilter.componentX and flash.filters.DisplacementMapFilter.componentY properties
 * </ul>
 * @see flash.display.BitmapData.copyChannel()
 * @see flash.display.BitmapData.noise()
 * @see flash.filters.DisplacementMapFilter.componentX
 * @see flash.filters.DisplacementMapFilter.componentY
 */
"public class BitmapDataChannel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   * The alpha channel.
   */
  "public static const",{ ALPHA/*:uint*/ : 8},

  /**
   * The blue channel.
   */
  "public static const",{ BLUE/*:uint*/ : 4},

  /**
   * The green channel.
   */
  "public static const",{ GREEN/*:uint*/ : 2},

  /**
   * The red channel.
   */
  "public static const",{ RED/*:uint*/ : 1},

];},[],[], "0.7.1", "0.7.5"
);