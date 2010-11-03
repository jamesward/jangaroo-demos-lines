joo.classLoader.prepare("package flash.display",/* {
import flash.events.Event
import flash.events.TimerEvent
import flash.utils.Timer

import js.Element*/

/**
 * The Stage class represents the main drawing area. The Stage represents the entire area where Flash� content is shown.
 * <p>The Stage object is not globally accessible. You need to access it through the stage property of a DisplayObject
 * instance.
 * <p>The Stage class has several ancestor classes � DisplayObjectContainer, InteractiveObject, DisplayObject, and
 * EventDispatcher � from which it inherits properties and methods. Many of these properties and methods are either
 * inapplicable to Stage objects, or require security checks when called on a Stage object. The properties and methods
 * that require security checks are documented as part of the Stage class.
 * <p>In addition, the following inherited properties are inapplicable to Stage objects. If you try to set them, an
 * IllegalOperationError is thrown. These properties may always be read, but since they cannot be set, they will always
 * contain default values.
 * <ul>
 *   <li>accessibilityProperties
 *   <li>alpha
 *   <li>blendMode
 *   <li>cacheAsBitmap
 *   <li>contextMenu
 *   <li>filters
 *   <li>focusRect
 *   <li>loaderInfo
 *   <li>mask
 *   <li>mouseEnabled
 *   <li>name
 *   <li>opaqueBackground
 *   <li>rotation
 *   <li>scale9Grid
 *   <li>scaleX
 *   <li>scaleY
 *   <li>scrollRect
 *   <li>tabEnabled
 *   <li>tabIndex
 *   <li>transform
 *   <li>visible
 *   <li>x
 *   <li>y
 * </ul>
 */
"public class Stage extends flash.display.DisplayObjectContainer",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$x=$$l+'x',$y=$$l+'y',$createElement=$$l+'createElement',$enterFrame=$$l+'enterFrame',$id=$$l+'id',$_frameRate=$$l+'_frameRate',$frameTimer=$$l+'frameTimer';return[function(){joo.classLoader.init(flash.events.Event,flash.events.TimerEvent,flash.utils.Timer);}, 

  "private static var",{ instance/* : Stage*/: undefined},
  "public static function getInstance",function getInstance(id/*:String = "stage"*/)/* : Stage*/ {if(arguments.length<1){id = "stage";}
    if (!$$private.instance) {
      new flash.display.Stage(id);
    }
    return $$private.instance;
  },

  "public function Stage",function $Stage(id/* : String*/) {
    this[$id] = id;
    $$private.instance = this;
    this[$super]();
    this[$frameTimer] = new flash.utils.Timer(1000/this[$_frameRate]);
    this[$frameTimer].addEventListener(flash.events.TimerEvent.TIMER, $$bound(this,$enterFrame));
    this[$frameTimer].start();
  },

  "override public function get x",function get$x()/* : Number*/ {
    // TODO: consider offsetParent(s)!
    return this.getElement().offsetLeft;
  },

  "override public function get y",function get$y()/* : Number*/ {
    // TODO: consider offsetParent(s)!
    return this.getElement().offsetTop;
  },

  /// The current height, in pixels, of the Stage.
  "public function get stageHeight",function get$stageHeight ()/* : int*/ {
    return this.getElement().offsetHeight;
  },

  "public function set stageHeight",function set$stageHeight (value/* : int*/)/* : void*/ {
    this.getElement()['offsetHeight'] = value; // TODO: setter for offsetHeight!
  },

  /// Specifies the current width, in pixels, of the Stage.
  "public function get stageWidth",function get$stageWidth ()/* : int*/ {
    return this.getElement().offsetWidth;    
  },

  "public function set stageWidth",function set$stageWidth (value/* : int*/)/* : void*/ {
    this.getElement()['offsetWidth'] = value; // TODO: setter for offsetWidth
  },

  "override protected function createElement",function createElement()/*:Element*/ {
    var element/* : Element*/ = window.document.getElementById(this[$id]);
    element.style.position = "relative";
    element.setAttribute("tabindex", "0");
    var width/* : Object*/ = element.getAttribute("width");
    if (width) {
      element.style.width = width+"px";
    }
    var height/* : Object*/ = element.getAttribute("height");
    if (height) {
      element.style.height = height + "px";
    }
    element.innerHTML = "";
    return element;
  },

  "private function enterFrame",function enterFrame()/* : void*/ {
    this.dispatchEvent(new flash.events.Event(flash.events.Event.ENTER_FRAME, false, false));
  },

  /**
   * Gets the frame rate of the stage. The frame rate is defined as frames per second. By default the
   * rate is set to the frame rate of the first SWF file loaded. Valid range for the frame rate is from 0.01 to
   * 1000 frames per second.
   * @throws SecurityError Calling the frameRate property of a Stage object throws an exception for any
   *   caller that is not in the same security sandbox as the Stage owner (the main SWF file). To avoid this, the
   *   Stage owner can grant permission to the domain of the caller by calling the Security.allowDomain() method
   *   or the Security.allowInsecureDomain() method. For more information, see the "Security" chapter in
   *   Programming ActionScript 3.0.
   * @return the frame rate of the stage.
   */
  "public function get frameRate",function get$frameRate()/* : Number*/ {
    return this[$_frameRate];
  },

  /**
   * Sets the frame rate of the stage. The frame rate is defined as frames per second. By default the
   * rate is set to the frame rate of the first SWF file loaded. Valid range for the frame rate is from 0.01 to
   * 1000 frames per second.
   * <p>Note: An application might not be able to follow high frame rate settings, either because the target
   * platform is not fast enough or the player is synchronized to the vertical blank timing of the display
   * device (usually 60 Hz on LCD devices). In some cases, a target platform might also choose to lower the
   * maximum frame rate if it anticipates high CPU usage.
   * <p>For content running in Adobe AIR, setting the frameRate property of one Stage object changes the frame
   * rate for all Stage objects (used by different NativeWindow objects).
   * @param value the new frame rate in frames per second.
   */
  "public function set frameRate",function set$frameRate(value/* : Number*/)/* : void*/ {
    this[$_frameRate] = value;
    this[$frameTimer].delay = 1000/value;
  },

  "private var",{ id/* : String*/: undefined},
  "private var",{ _frameRate/* : Number*/ : 30},
  "private var",{ frameTimer/* : Timer*/: undefined},
];},["getInstance"],["flash.display.DisplayObjectContainer","flash.utils.Timer","flash.events.TimerEvent","flash.events.Event"], "0.7.1", "0.7.5"
);