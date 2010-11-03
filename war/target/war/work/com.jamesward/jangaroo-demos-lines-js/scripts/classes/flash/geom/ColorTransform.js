joo.classLoader.prepare("package flash.geom",/* {*/

/**
 * The ColorTransform class lets you adjust the color values in a display object.
 */
"public class ColorTransform",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$maps=$$l+'maps';return[function(){joo.classLoader.init(Array);}, 
  /**
   * A decimal value that is multiplied with the alpha transparency channel value. 
   */
  "public var",{ alphaMultiplier/* : Number*/: undefined},
  /**
   * A number from -255 to 255 that is added to the alpha transparency channel value after it has been
   * multiplied by the alphaMultiplier value.
   */
  "public var",{ alphaOffset/* : Number*/: undefined},
  /**
   * A decimal value that is multiplied with the blue channel value.
   */
  "public var",{ blueMultiplier/* : Number*/: undefined},
  /**
   * A number from -255 to 255 that is added to the blue channel value after it has been multiplied by the
   * blueMultiplier value.
   */
  "public var",{ blueOffset/* : Number*/: undefined},
  /**
   * A decimal value that is multiplied with the green channel value.
   */
  "public var",{ greenMultiplier/* : Number*/: undefined},
  /**
   * A number from -255 to 255 that is added to the green channel value after it has been multiplied by the
   * greenMultiplier value.
   */
  "public var",{ greenOffset/* : Number*/: undefined},
  /**
   * A decimal value that is multiplied with the red channel value. 
   */
  "public var",{ redMultiplier/* : Number*/: undefined},
  /**
   * A number from -255 to 255 that is added to the red channel value after it has been multiplied by the
   * redMultiplier value.
   */
  "public var",{ redOffset/* : Number*/: undefined},

  /**
   * The RGB color value for a ColorTransform object.
   */
  "public function get color",function get$color ()/* : uint*/ {
    return this.redOffset << 16 | this.greenOffset << 8 || this.blueOffset; 
  },

  "public function set color",function set$color (newColor/* : uint*/)/* : void*/ {
    this.redOffset   = newColor >> 16 & 0xF;
    this.greenOffset = newColor >>  8 & 0xF;
    this.blueOffset  = newColor       & 0xF;
    this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 1;
  },

  /**
   * Creates a ColorTransform object for a display object. 
   */
  "public function ColorTransform",function $ColorTransform (redMultiplier/* : Number = 1*/, greenMultiplier/* : Number = 1*/, blueMultiplier/* : Number = 1*/,
                                  alphaMultiplier/* : Number = 1*/,
                                  redOffset/* : Number = 0*/, greenOffset/* : Number = 0*/, blueOffset/* : Number = 0*/,
                                  alphaOffset/*:Number = 0*/) {if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){redMultiplier = 1;}greenMultiplier = 1;}blueMultiplier = 1;}alphaMultiplier = 1;}redOffset = 0;}greenOffset = 0;}blueOffset = 0;}alphaOffset = 0;}this[$super]();
    this.redMultiplier = redMultiplier;
    this.greenMultiplier = greenMultiplier;
    this.blueMultiplier = blueMultiplier;
    this.alphaMultiplier = alphaMultiplier;
    this.redOffset = redOffset;
    this.greenOffset = greenOffset;
    this.blueOffset = blueOffset;
    this.alphaOffset = alphaOffset;
  },

  /**
   * Concatenates the ColorTranform object specified by the second parameter with the current ColorTransform
   * object and sets the current object as the result, which is an additive combination of the two color
   * transformations.
   */
  "public function concat",function concat (second/*:ColorTransform*/)/* : void*/ {
    this.redMultiplier *= second.redMultiplier;
    this.greenMultiplier *= second.greenMultiplier;
    this.blueMultiplier *= second.blueMultiplier;
    this.alphaMultiplier *= second.alphaMultiplier;
    this.redOffset += second.redOffset;
    this.greenOffset += second.greenOffset;
    this.blueOffset += second.blueOffset;
    this.alphaOffset += second.alphaOffset;
  },

  "private var",{ maps/* : Array*/: undefined},

  "public function getComponentMaps",function getComponentMaps()/* : Array*/ {
    if (!this[$maps]) {
      var offsets/* : Array*/ = [this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset];
      var multipliers/* : Array*/ = [this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier];
      this[$maps] = new Array(4);
      for (var c/*:uint*/ = 0; c < 4; ++c) {
        var offset/* : Number*/ = offsets[c];
        var multiplier/* : Number*/ = multipliers[c];
        var map/* : Array*/;
        if (offset==0 && multiplier==1) {
          map = null;
        } else {
          map = new Array(256);
          for (var b/*:uint*/ = 0; b < 256; ++b) {
            var val/* : Number*/ = offset + multiplier * b;
            map[b] = val <= 0 ? 0 : val <= 255 ? val : 255;
          }
        }
        this[$maps][c] = map;
      }
    }
    return this[$maps];
  },

  /**
   * Formats and returns a string that describes all of the properties of the ColorTransform object.
   */
  "public function toString",function toString ()/* : String*/ {
    return "[ColorTransform("+[this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier,
      this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset].join(", ")+")]";
  },

];},[],["Array"], "0.7.1", "0.7.5"
);