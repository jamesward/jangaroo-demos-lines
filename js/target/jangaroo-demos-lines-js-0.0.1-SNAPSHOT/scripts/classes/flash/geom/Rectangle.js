joo.classLoader.prepare("package flash.geom",/* {

import flash.geom.Point*/

/**
 * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and
 * by its width and its height.
 */
"public class Rectangle",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(flash.geom.Point);}, 
  /**
   * The height of the rectangle, in pixels.
   */
  "public var",{ height/* : Number*/: undefined},
  /**
   * The width of the rectangle, in pixels.
   */
  "public var",{ width/* : Number*/: undefined},
  /**
   * The x coordinate of the top-left corner of the rectangle.
   */
  "public var",{ x/* : Number*/: undefined},
  /**
   * The y coordinate of the top-left corner of the rectangle.
   */
  "public var",{ y/* : Number*/: undefined},

  /**
   * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
   */
  "public function get topLeft",function get$topLeft ()/* : Point*/ {
    return new flash.geom.Point(this.x, this.y);
  },

  "public function set topLeft",function set$topLeft (topLeft/* : Point*/)/* : void*/ {
    this.left = topLeft.x;
    this.top = topLeft.y;
  },

  /**
   * The sum of the y and height properties.
   */
  "public function get bottom",function get$bottom ()/* : Number*/ {
    return this.x+this.height;
  },

  "public function set bottom",function set$bottom (value/*:Number*/)/* : void*/ {
    this.height = value - this.x;
  },

  /**
   * The location of the Rectangle object's bottom-right corner, determined by the values of the right and
   * bottom properties.
   */
  "public function get bottomRight",function get$bottomRight ()/* : Point*/ {
    return new flash.geom.Point(this.right, this.bottom);
  },

  "public function set bottomRight",function set$bottomRight (bottomRight/* : Point*/)/* : void*/ {
    this.right = bottomRight.x;
    this.bottom = bottomRight.y;
  },

  /**
   * The x coordinate of the top-left corner of the rectangle.
   */
  "public function get left",function get$left ()/* : Number*/ {
    return this.x+this.width;
  },

  "public function set left",function set$left (left/* : Number*/)/* : void*/ {
    this.width += this.x - left;
    this.x = left;
  },

  /**
   * The sum of the x and width properties.
   */
  "public function get right",function get$right ()/* : Number*/ {
    return this.x + this.width;
  },
  "public function set right",function set$right (value/*:Number*/)/* : void*/ {
    this.width = value - this.x;
  },

  /**
   * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
   */
  "public function get size",function get$size()/* : Point*/ {
    return new flash.geom.Point(this.width, this.height);
  },

  "public function set size",function set$size (value/*:Point*/)/* : void*/ {
    this.width = value.x;
    this.height = value.y;
  },

  /**
   * The y coordinate of the top-left corner of the rectangle.
   */
  "public function get top",function get$top ()/* : Number*/ {
    return this.y;
  },
  "public function set top",function set$top (value/*:Number*/)/* : void*/ {
    this.height += this.y - value;
    this.y = value;
  },

  /**
   * Returns a copy of this Rectangle object.
   */
  "public function clone",function clone ()/* : Rectangle*/ {
    return new flash.geom.Rectangle(this.x, this.y, this.width, this.height);
  },

  /**
   * Determines if the specified point is contained within the rectangular region.
   */
  "public function contains",function contains (x/*:Number*/, y/*:Number*/)/* : Boolean*/ {
    return this.x <= x && x <= this.right && this.y <= y && y <= this.bottom;
  },

  /**
   * Determines if the specified point is contained within the rectangular region defined by this Rectangle
   * object using a Point object as a parameter.
   */
  "public function containsPoint",function containsPoint (point/*:Point*/)/* : Boolean*/ {
    return this.contains(point.x, point.y);
  },

  /**
   * Determines if the Rectangle object specified by the rect parameter is contained within this Rectangle object.
   */
  "public function containsRect",function containsRect (rect/*:Rectangle*/)/* : Boolean*/ {
    return this.containsPoint(rect.topLeft) && this.containsPoint(rect.bottomRight);
  },

  /**
   * Determines if the object specified in the toCompare parameter is equal to this Rectangle object.
   */
  "public function equals",function equals (toCompare/*:Rectangle*/)/* : Boolean*/ {
    return this.x==toCompare.x && this.y==toCompare.y && this.width==toCompare.width && this.height==toCompare.height;
  },

  /**
   * Increases the size of the Rectangle object by the specified amounts, in pixels.
   */
  "public function inflate",function inflate (dx/*:Number*/, dy/*:Number*/)/* : void*/ {
    this.width += dx;
    this.height += dy;
  },

  /**
   * Increases the size of the Rectangle object using a Point object as a parameter.
   */
  "public function inflatePoint",function inflatePoint (point/*:Point*/)/* : void*/ {
    this.inflate(point.x, point.y);
  },

  /**
   * Returns the area of intersection.
   */
  "public function intersection",function intersection (toIntersect/*:Rectangle*/)/* : Rectangle*/ {
    var x/* : Number*/ = Math.max(this.x, toIntersect.x);
    var right/* : Number*/ = Math.min(this.right, toIntersect.right);
    if (x <= right) {
      var y/* : Number*/ = Math.max(this.y, toIntersect.y);
      var bottom/* : Number*/ = Math.min(this.bottom, toIntersect.bottom);
      if (y <= bottom) {
        return new flash.geom.Rectangle(x, y, right-x, bottom-y);
      }
    }
    return new flash.geom.Rectangle();
  },

  /**
   * Determines if the object specified in the toIntersect parameter intersects with this Rectangle object.
   */
  "public function intersects",function intersects (toIntersect/*:Rectangle*/)/* : Boolean*/ {
    return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right)
        && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
  },

  /**
   * Determines whether or not this Rectangle object is empty.
   */
  "public function isEmpty",function isEmpty ()/* : Boolean*/ {
    return this.x==0 && this.y==0 && this.width==0 && this.height==0;
  },

  /**
   * Adjusts the location of the Rectangle object.
   */
  "public function offset",function offset (dx/*:Number*/, dy/*:Number*/)/* : void*/ {
    this.x += dx;
    this.y += dy;
  },

  /**
   * Adjusts the location of the Rectangle object using a Point object as a parameter.
   */
  "public function offsetPoint",function offsetPoint (point/*:Point*/)/* : void*/ {
    this.offset(point.x, point.y);
  },

  /**
   * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the
   * specified width and height.
   */
  "public function Rectangle",function $Rectangle (x/*:Number = 0*/, y/*:Number = 0*/, width/*:Number = 0*/, height/*:Number = 0*/) {if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){x = 0;}y = 0;}width = 0;}height = 0;}this[$super]();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  },

  /**
   * Sets all properties to 0.
   */
  "public function setEmpty",function setEmpty ()/* : void*/ {
    this.x = this.y = this.width = this.height = 0;
  },

  /**
   * Builds and returns a string that lists the horizontal and vertical positions and the width and height of the Rectangle object.
   */
  "public function toString",function toString ()/* : String*/ {
    return "[Rectangle("+[this.x,this.y,this.width,this.height].join(", ")+")]";
  },

  /**
   * Adds two rectangles together to create a new Rectangle object.
   */
  "public function union",function union (toUnion/*:Rectangle*/)/* : Rectangle*/ {
    var x/* : Number*/ = Math.min(this.x, toUnion.x);
    var y/* : Number*/ = Math.min(this.y, toUnion.y);
    return new flash.geom.Rectangle(x, y, Math.max(this.right,toUnion.right)-x, Math.max(this.bottom-toUnion.bottom)-y);
  },
];},[],["flash.geom.Point","Math"], "0.7.1", "0.7.5"
);