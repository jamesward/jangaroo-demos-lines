joo.classLoader.prepare("package flash.utils",/* {

import flash.events.EventDispatcher
import flash.events.TimerEvent

[Event(name="timerComplete",type="flash.events.TimerEvent")]
[Event(name="timer",type="flash.events.TimerEvent")]*/
/**
 * The Timer class is the interface to timers, which let you run code on
   a specified time sequence. Use the <code>start()</code> method to
   start a timer. Add an event listener for the timer event to set up
   code to be run on the timer interval.
   <p>You can create Timer objects to run once or repeat at specified
   intervals to execute code on a schedule. Depending on the environment
   (available memory and other factors), events may be dispatched at
   slightly offset intervals. Memory-intensive scripts may also offset
   the events.
 */
"public class Timer extends flash.events.EventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_delay=$$l+'_delay',$_repeatCount=$$l+'_repeatCount',$_currentCount=$$l+'_currentCount',$tick=$$l+'tick',$checkComplete=$$l+'checkComplete',$timer=$$l+'timer';return[function(){joo.classLoader.init(flash.events.TimerEvent);},


  /**
   * Constructs a new Timer object with the specified <code>delay</code>
     and <code>repeatCount</code> states.
   * <p>The timer does not start automatically; you must call the
     <code>start()</code> method to start it.
   * @param delay The delay between timer events, in milliseconds.
   * @param repeatCount (default = 0) � Specifies the number of
     repetitions. If zero, the timer repeats infinitely. If nonzero, the
     timer runs the specified number of times and then stops.
   * @throws Error if the delay specified is negative or not a finite
     number
   */
  "public function Timer",function $Timer(delay/* : Number*/, repeatCount/* : int = 0*/) {if(arguments.length<2){repeatCount = 0;}this[$super]();
    this[$_delay] = delay;
    this[$_repeatCount] = repeatCount;
  },

  /**
   * Return the delay, in milliseconds, between timer events.
   * @return the delay, in milliseconds, between timer events.
   */
  "public function get delay",function get$delay()/*:Number*/ {
    return this[$_delay];
  },

  /**
   * The delay, in milliseconds, between timer events. If
   * you set the delay interval while the timer is running, the timer
   * will restart at the same <code>repeatCount</code> iteration.
   */
  "public function set delay",function set$delay(val/*:Number*/)/*:void*/ {
    this[$_delay] = val;
    if (this[$timer]) {
      this.stop();
      this.start();
    }
  },

  "private var",{ _delay/* : Number*/: undefined},

  /**
   * The total number of times the timer is set to run.
   * @return the total number of times the timer is set to run.
   */
  "public function get repeatCount",function get$repeatCount()/* : int*/ {
    return this[$_repeatCount];
  },

  /**
   * The total number of times the timer is set to run. If
   * the repeat count is set to 0, the timer continues forever or until
   * the <code>stop()</code> method is invoked or the program stops. If
   * the repeat count is nonzero, the timer runs the specified number
   * of times. If <code>repeatCount</code> is set to a total that is
   * the same or less then <code>currentCount</code> the timer stops
   * and will not fire again.
   */
  "public function set repeatCount",function set$repeatCount(val/* : int*/)/* : void*/ {
    this[$_repeatCount] = val;
    this[$checkComplete]();
  },

  "private var",{ _repeatCount/* : int*/: undefined},

  /**
   * The timer's current state; <code>true</code> if the
   * timer is running, otherwise <code>false</code>.
   */
  "public function get running",function get$running()/* : Boolean*/ {
    return this[$timer]!=null;
  },

  /**
   * The total number of times the timer has fired since it
   * started at zero. If the timer has been reset, only the fires since
   * the reset are counted.
   */
  "public function get currentCount",function get$currentCount()/* : int*/ {
    return this[$_currentCount];
  },

  "private var",{ _currentCount/* : int*/ : 0},

  /**
   * Starts the timer, if it is not already running.
   */
  "public function start",function start()/* : void*/ {
    if (!this[$timer]) {
      this[$timer] = window.setInterval($$bound(this,$tick), this[$_delay]);
    }
  },

  /**
   * Stops the timer. When <code>start()</code> is called after
     <code>stop()</code>, the timer instance runs for the
     <code>remaining</code> number of repetitions, as set by the
     <code>repeatCount</code> property.
   */
  "public function stop",function stop()/* : void*/ {
    if (this[$timer]) {
      window.clearInterval(this[$timer]);
      this[$timer] = null;
    }
  },

  /**
   * Stops the timer, if it is running, and sets the <code>currentCount</code> property back to 0, like the reset
   * button of a stopwatch. Then, when <code>start()</code> is called, the timer instance runs for the specified
   * number of repetitions, as set by the <code>repeatCount</code> value.
   * @see flash.utils.Timer
   */
  "public function reset",function reset()/* : void*/ {
    this.stop();
    this[$_currentCount] = 0;
  },

  "private function tick",function tick()/* : void*/ {
    if (!this[$timer]) {
      // oops, a tick occurred although timer has been stopped:
      return;
    }
    ++this[$_currentCount];
    try {
      this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER));
    } finally {
      this[$checkComplete]();
    }
  },

  "private function checkComplete",function checkComplete()/* : void*/ {
    if (this[$_repeatCount] > 0 && this[$_currentCount] >= this[$_repeatCount]) {
      this.stop();
      this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER_COMPLETE));
    }
  },

  "private var",{ timer/* : Object*/ : null},
];},[],["flash.events.EventDispatcher","flash.events.TimerEvent"], "0.7.1", "0.7.5"
);