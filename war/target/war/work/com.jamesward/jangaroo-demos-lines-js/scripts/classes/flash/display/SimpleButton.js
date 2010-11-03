joo.classLoader.prepare("package flash.display",/* {*/

//import flash.media.SoundTransform;

/**
 * The SimpleButton class lets you control all instances of button symbols in a SWF file.
 */
"public class SimpleButton extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$getElementName=$$l+'getElementName',$_upState=$$l+'_upState',$_overState=$$l+'_overState',$_downState=$$l+'_downState',$_hitTestState=$$l+'_hitTestState',$_enabled=$$l+'_enabled',$_trackAsMenu=$$l+'_trackAsMenu',$_useHandCursor=$$l+'_useHandCursor';return[ 

  /**
   * Creates a new SimpleButton instance.
   * @param upState (default null) a display object that is used as the visual object for the button "Down" state
   * @param overState
   * @param downState
   * @param hitTestState
   */
  "public function SimpleButton",function $SimpleButton (upState/*:DisplayObject = null*/, overState/*:DisplayObject = null*/,
                                downState/*:DisplayObject = null*/, hitTestState/*:DisplayObject = null*/) {if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){upState = null;}overState = null;}downState = null;}hitTestState = null;}
    this[$super]();
    this[$_upState] = upState;
    this[$_overState] = overState;
    this[$_downState] = downState;
    this[$_hitTestState] = hitTestState;
  },

  "override protected function getElementName",function getElementName()/*:String*/ {
    return "button";
  },

  /**
   * Specifies a display object that is used as the visual object for the button "Down" state&#8212;the state that the
   * button is in when the user clicks the hitTestState object.
   * @return the display object that is used as the visual object for the button "Down" state
   */
  "public function get downState",function get$downState ()/* : DisplayObject*/ {
    return this[$_downState];
  },

  "public function set downState",function set$downState (value/*:DisplayObject*/)/* : void*/ {
    this[$_downState] = value;
  },

  /**
   * A Boolean value that specifies whether a button is enabled.
   * @return whether a button is enabled.
   */
  "public function get enabled",function get$enabled ()/* : Boolean*/ {
    return this[$_enabled];
  },

  "public function set enabled",function set$enabled (value/*:Boolean*/)/* : void*/ {
    this[$_enabled] = value;
  },

  /// Specifies a display object that is used as the hit testing object for the button.
  "public function get hitTestState",function get$hitTestState ()/* : DisplayObject*/ {
    return this[$_hitTestState];
  },

  "public function set hitTestState",function set$hitTestState (value/*:DisplayObject*/)/* : void*/ {
    this[$_hitTestState] = value;
  },

  /// Specifies a display object that is used as the visual object for the button over state &#8212; the state that the button is in when the mouse is positioned over the button.
  "public function get overState",function get$overState ()/* : DisplayObject*/ {
    return this[$_overState];
  },

  "public function set overState",function set$overState (value/*:DisplayObject*/)/* : void*/ {
    this[$_overState] = value;
  },

  /// The SoundTransform object assigned to this button.
/*
  public function get soundTransform () : SoundTransform {
    return this._soundTransform;
  }

  public function set soundTransform (sndTransform:SoundTransform) : void {
    this._soundTransform = sndTransform;
  }
*/
  /// Indicates whether other display objects that are SimpleButton or MovieClip objects can receive mouse release events.
  "public function get trackAsMenu",function get$trackAsMenu ()/* : Boolean*/ {
    return this[$_trackAsMenu];
  },

  "public function set trackAsMenu",function set$trackAsMenu (value/*:Boolean*/)/* : void*/ {
    this[$_trackAsMenu] = value;
  },

  /// Specifies a display object that is used as the visual object for the button up state &#8212; the state that the button is in when the mouse is not positioned over the button.
  "public function get upState",function get$upState ()/* : DisplayObject*/ {
    return this[$_upState];
  },

  "public function set upState",function set$upState (value/*:DisplayObject*/)/* : void*/ {
    this[$_upState] = value;
  },

  /// A Boolean value that, when set to true, indicates whether Flash Player displays the hand cursor when the mouse rolls over a button.
  "public function get useHandCursor",function get$useHandCursor ()/* : Boolean*/ {
    return this[$_useHandCursor];
  },

  "public function set useHandCursor",function set$useHandCursor (value/*:Boolean*/)/* : void*/ {
    this[$_useHandCursor] = value;
  },

  "private var",{ _upState/* : DisplayObject*/: undefined},
  "private var",{ _overState/* : DisplayObject*/: undefined},
  "private var",{ _downState/* : DisplayObject*/: undefined},
  "private var",{ _hitTestState/* : DisplayObject*/: undefined},
//  private var _soundTransform : SoundTransform;
  "private var",{ _enabled/* : Boolean*/ : true},
  "private var",{ _trackAsMenu/* : Boolean*/: undefined},
  "private var",{ _useHandCursor/* : Boolean*/: undefined},
];},[],["flash.display.InteractiveObject"], "0.7.1", "0.7.5"
);