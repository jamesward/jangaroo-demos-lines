joo.classLoader.prepare("package flash.events",/* {

import flash.events.Event*/

"public class TimerEvent extends flash.events.Event",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$clone=$$l+'clone',$toString=$$l+'toString';return[ 

  "public static const",{ TIMER/* : String*/ : "timer"},
  "public static const",{ TIMER_COMPLETE/*:String*/ : "timerComplete"},

  "public function TimerEvent",function $TimerEvent(type/* : String*/, bubbles/* : Boolean = false*/, cancelable/* : Boolean = false*/) {if(arguments.length<3){if(arguments.length<2){bubbles = false;}cancelable = false;}
    this[$super](type, bubbles, cancelable);
  },

  "override public function clone",function clone()/* : Event*/ {
    return new flash.events.TimerEvent(this.type, this.bubbles, this.cancelable);
  },

  "override public function toString",function toString()/* : String*/ {
    return this.formatToString("TimerEvent", "type", "bubbles", "cancelable");
  },

  "public function updateAfterEvent",function updateAfterEvent()/* : void*/ {
    // TODO
  },
];},[],["flash.events.Event"], "0.7.1", "0.7.5"
);