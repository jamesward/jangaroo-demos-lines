joo.classLoader.prepare("package flash.geom",/* {

import flash.geom.Rectangle
import flash.display.DisplayObject
import flash.display.Shape*/

/**
 * The Transform class provides access to color adjustment properties and two- or three-dimensional
 * transformation objects that can be applied to a display object.
 */
"public class Transform",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$displayObject=$$l+'displayObject',$_colorTransform=$$l+'_colorTransform',$_matrix=$$l+'_matrix';return[function(){joo.classLoader.init(flash.geom.Rectangle);}, 

  "public function Transform",function $Transform (displayObject/* : DisplayObject*/) {this[$super]();
    this[$displayObject] = displayObject;
  },

  "private var",{ displayObject/* : DisplayObject*/: undefined},

  /**
   * A ColorTransform object containing values that universally adjust the colors in the display object.
   * @return
   */
  "public function get colorTransform",function get$colorTransform ()/* : ColorTransform*/ {
    return this[$_colorTransform];
  },

  "public function set colorTransform",function set$colorTransform (value/* : ColorTransform*/)/* : void*/ {
    this[$_colorTransform] = value;
  },

  "private var",{ _colorTransform/* : ColorTransform*/: undefined},

  /**
   * A ColorTransform object representing the combined color transformations applied to the display object
   * and all of its parent objects, back to the root level.
   * @return
   */
  "public function get concatenatedColorTransform",function get$concatenatedColorTransform ()/* : ColorTransform*/ {
    var concCT/* : ColorTransform*/ = this[$_colorTransform];
    var currentDO/* : DisplayObject*/ = this[$displayObject].parent;
    while (currentDO) {
      concCT.concat(currentDO.transform.colorTransform);
      currentDO = currentDO.parent;
    }
    return this.colorTransform;
  },

  /**
   * A Matrix object containing values that alter the scaling, rotation, and translation of the display object.
   * @return
   */
  "public function get matrix",function get$matrix ()/* : Matrix*/ {
    return this[$_matrix];
  },
  "public function set matrix",function set$matrix (value/*:Matrix*/)/* : void*/ {
    this[$_matrix] = value;
    this[$displayObject].transform = this;
  },

  "private var",{ _matrix/* : Matrix*/: undefined},

  /**
   * A Matrix object representing the combined transformation matrixes of the display object and all of its
   * parent objects, back to the root level.
   * @return
   */
  "public function get concatenatedMatrix",function get$concatenatedMatrix ()/* : Matrix*/ {
    var concMatrix/* : Matrix*/ = this[$_matrix];
    var currentDO/* : DisplayObject*/ = this[$displayObject].parent;
    while (currentDO) {
      concMatrix.concat(currentDO.transform.matrix);
      currentDO = currentDO.parent;
    }
    return concMatrix;
  },

  /**
   * A Rectangle object that defines the bounding rectangle of the display object on the stage.
   * @return
   */
  "public function get pixelBounds",function get$pixelBounds ()/* : Rectangle*/ {
    return new flash.geom.Rectangle(this[$displayObject].x, this[$displayObject].y, this[$displayObject].width, this[$displayObject].height);
  },

];},[],["flash.geom.Rectangle"], "0.7.1", "0.7.5"
);