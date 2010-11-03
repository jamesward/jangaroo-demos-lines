joo.classLoader.prepare("package flash.display",/* {
import js.CanvasRenderingContext2D
import js.Element
import js.HTMLCanvasElement
import flash.geom.Transform
import flash.geom.Matrix*/

/**
 * The Shape class is used to create lightweight shapes by using the ActionScript drawing application program interface
 * (API). The Shape class includes a graphics property, which lets you access methods from the Graphics class.
 * <p>The Sprite class also includes a graphics property, and it includes other features not available to the Shape
 * class. For example, a Sprite object is a display object container, whereas a Shape object is not (and cannot contain
 * child display objects). For this reason, Shape objects consume less memory than Sprite objects that contain the same
 * graphics. However, a Sprite object supports mouse click events, while a Shape object does not.
 * @see flash.display.Graphics
 * @see flash.display.Sprite
 */
"public class Shape extends flash.display.DisplayObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createElement=$$l+'createElement',$transform=$$l+'transform',$_graphics=$$l+'_graphics';return[function(){joo.classLoader.init(flash.display.Graphics);}, 

  /**
   * Creates a new Shape object.
   */
  "public function Shape",function $Shape() {
    this[$super]();
  },

  "override protected function createElement",function createElement()/* : Element*/ {
    var canvas/* : HTMLCanvasElement*/ = flash.display.Shape.createCanvas();
    canvas.style.position = "absolute";
    return canvas;
  },

  "internal static function createCanvas",function createCanvas()/* : HTMLCanvasElement*/ {
    var canvas/* : HTMLCanvasElement*/ = window.document.createElement("canvas")/*as HTMLCanvasElement*/;
    // TODO: adjust width and height when drawing into the canvas!
    canvas.width = flash.display.Stage.getInstance().stageWidth;
    canvas.height = flash.display.Stage.getInstance().stageHeight;
    return canvas;
  },

  "internal static function createGraphics",function createGraphics(canvas/* : HTMLCanvasElement*/)/* : Graphics*/ {
    return new flash.display.Graphics(canvas.getContext("2d")/*as CanvasRenderingContext2D*/);
  },

  /**
   * Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur.
   * @return  the Graphics object belonging to this Shape object
   */
  "public function get graphics",function get$graphics()/* : Graphics*/ {
    if (!this[$_graphics]) {
      this[$_graphics] = flash.display.Shape.createGraphics(this.getElement()/*as HTMLCanvasElement*/);
    }
    return this[$_graphics];
  },

  "override public function set transform",function set$transform(value/*:Transform*/)/*:void*/ {
    this[$transform] = value;
    var m/* : Matrix*/ = value.matrix;
    if (m) {
      this.graphics.renderingContext.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
    }
  },

  "private var",{ _graphics/* : Graphics*/: undefined},
];},["createCanvas","createGraphics"],["flash.display.DisplayObject","flash.display.Stage","flash.display.Graphics"], "0.7.1", "0.7.5"
);