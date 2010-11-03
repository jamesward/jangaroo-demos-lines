joo.classLoader.prepare("package flash.events",/* {*/
"public class Event extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$defaultPrevented=$$l+'defaultPrevented',$propagationStopped=$$l+'propagationStopped',$immediatePropagationStopped=$$l+'immediatePropagationStopped';return[


  "public function Event",function $Event(type/* : String*/, bubbles/* : Boolean = false*/, cancelable/* : Boolean = false*/) {if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = false;}this[$super]();
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
  },

  "public var",{ type/* : String*/: undefined},

  "public var",{ bubbles/* : Boolean*/: undefined},

  "public var",{ cancelable/* : Boolean*/: undefined},

  "public var",{ eventPhase/* : uint*/: undefined},

  "public var",{ target/* : Object*/: undefined},

  "public var",{ currentTarget/* : Object*/: undefined},

  "public function preventDefault",function preventDefault()/* : void*/ {
    if (this.cancelable) {
      this[$defaultPrevented] = true;
    }
  },

  "public function isDefaultPrevented",function isDefaultPrevented()/* : Boolean*/ {
    return this[$defaultPrevented];
  },

  "public function formatToString",function formatToString(className/* : String, ... rest*/)/* : String*/ {var rest=Array.prototype.slice.call(arguments,1);
    var sb/* : Array*/ = ["[", className, " "];
    for (var i/* :uint*/ = 0; i < rest.length; ++i) {
      sb.push(rest[i],"=",this[rest[i]]," ");
    }
    sb.push("]");
    return sb.join("");
  },

  "public function toString",function toString()/*:String*/ {
    return this.formatToString("Event", "type", "bubbles", "cancelable", "eventPhase");
  },

  "public function stopPropagation",function stopPropagation()/* : void*/ {
    this[$propagationStopped] = true;
  },

  "public function isPropagationStopped",function isPropagationStopped()/* : Boolean*/ {
    return this[$propagationStopped];
  },

  "public function stopImmediatePropagation",function stopImmediatePropagation()/* : void*/ {
    this[$immediatePropagationStopped] = true;
  },

  "public function isImmediatePropagationStopped",function isImmediatePropagationStopped()/* : Boolean*/ {
    return this[$immediatePropagationStopped];
  },

  "public function clone",function clone()/* : Event*/ {
    return new flash.events.Event(this.type, this.bubbles, this.cancelable);
  },

  "static public const",{ ENTER_FRAME/*:String*/ : "enterFrame"},

  "static public const",{ ID3/*:String*/ : "id3"},
  "static public const",{ SOUND_COMPLETE/*:String*/ : "soundComplete"},
  "static public const",{ INIT/*:String*/ : "init"},
  "static public const",{ RENDER/*:String*/ : "render"},
  "static public const",{ TAB_ENABLED_CHANGE/*:String*/ : "tabEnabledChange"},

  "static public const",{ ADDED_TO_STAGE/*:String*/ : "addedToStage"},
  "static public const",{ TAB_CHILDREN_CHANGE/*:String*/ : "tabChildrenChange"},
  "static public const",{ RESIZE/*:String*/ : "resize"},
  "static public const",{ CHANGE/*:String*/ : "change"},
  "static public const",{ COMPLETE/*:String*/ : "complete"},

  "static public const",{ FULLSCREEN/*:String*/ : "fullScreen"},
  "static public const",{ REMOVED/*:String*/ : "removed"},
  "static public const",{ CONNECT/*:String*/ : "connect"},
  "static public const",{ SCROLL/*:String*/ : "scroll"},
  "static public const",{ OPEN/*:String*/ : "open"},

  "static public const",{ CLOSE/*:String*/ : "close"},
  "static public const",{ MOUSE_LEAVE/*:String*/ : "mouseLeave"},
  "static public const",{ ADDED/*:String*/ : "added"},
  "static public const",{ TAB_INDEX_CHANGE/*:String*/ : "tabIndexChange"},
  "static public const",{ REMOVED_FROM_STAGE/*:String*/ : "removedFromStage"},

  "static public const",{ ACTIVATE/*:String*/ : "activate"},
  "static public const",{ DEACTIVATE/*:String*/ : "deactivate"},
  "static public const",{ CANCEL/*:String*/ : "cancel"},
  "static public const",{ SELECT/*:String*/ : "select"},
  "static public const",{ UNLOAD/*:String*/ : "unload"},

  "private var",{ defaultPrevented/* : Boolean*/ : false},
  "private var",{ propagationStopped/*:Boolean*/: undefined},
  "private var",{ immediatePropagationStopped/*:Boolean*/: undefined},
];},[],["Object"], "0.7.1", "0.7.5"
);