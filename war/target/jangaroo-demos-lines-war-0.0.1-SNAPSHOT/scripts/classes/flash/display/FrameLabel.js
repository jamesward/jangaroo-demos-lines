joo.classLoader.prepare("package flash.display",/* {*/

/**
 * The FrameLabel object contains properties that specify a frame number and the corresponding label name.
 * The Scene class includes a labels property, which is an array of FrameLabel objects for the scene.
 * @see Scene.labels
 * @see MovieClip.currentLabel
 * @see MovieClip.currentScene
 * @see MovieClip.scenes
 * @see MovieClip.gotoAndPlay()
 * @see MovieClip.gotoAndStop()
 */
"public class FrameLabel",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_frame=$$l+'_frame',$_name=$$l+'_name';return[ 

  "private var",{ _frame/*:int*/: undefined},
  "private var",{ _name/*:String*/: undefined},

  "public function FrameLabel",function $FrameLabel() {this[$super]();
  },

  /**
   * The frame number containing the label.
   */
    "public function get frame",function get$frame()/*:int*/ {
      return this[$_frame];
    },

  /**
   * The name of the label.
   */
  "public function get name",function get$name()/*:String*/ {
    return this[$_name];
  },
];},[],[], "0.7.1", "0.7.5"
);