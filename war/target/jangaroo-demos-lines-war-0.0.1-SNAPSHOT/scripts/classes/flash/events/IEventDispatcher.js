joo.classLoader.prepare("package flash.events",/* {

import flash.events.Event*/

/**
 * The IEventDispatcher interface defines methods for adding or removing event listeners, checks whether specific types
 * of event listeners are registered, and dispatches events.
 * <p>Event targets are an important part of the Flash� Player event model. The event target serves as the focal point
 * for how events flow through the display list hierarchy. When an event such as a mouse click or a keypress occurs,
 * Flash Player dispatches an Event object into the event flow from the root of the display list. The Event object
 * makes a round-trip journey to the event target, which is conceptually divided into three phases: the capture phase
 * includes the journey from the root to the last node before the event target's node; the target phase includes only
 * the event target node; and the bubbling phase includes any subsequent nodes encountered on the return trip to the
 * root of the display list.
 * <p>In general, the easiest way for a user-defined class to gain event dispatching capabilities is to extend
 * EventDispatcher. If this is impossible (that is, if the class is already extending another class), you can instead
 * implement the IEventDispatcher interface, create an EventDispatcher member, and write simple hooks to route calls
 * into the aggregated EventDispatcher.
 */
"public interface IEventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ /*

  function IEventDispatcher():*;*/,/*

  /**
   * Dispatches an event into the event flow. The event target is the EventDispatcher object upon which dispatchEvent()
   * is called.
   * @param event The Event object dispatched into the event flow.
   * @return A value of true unless preventDefault() is called on the event, in which case it returns false.
   * /
  function dispatchEvent(event : flash.events.Event) : Boolean;*/,/*

  /**
   * Checks whether the EventDispatcher object has any listeners registered for a specific type of event. This allows
   * you to determine where an EventDispatcher object has altered handling of an event type in the event flow hierarchy.
   * To determine whether a specific event type will actually trigger an event listener, use
   * IEventDispatcher.willTrigger().
   * <p>The difference between hasEventListener() and willTrigger() is that hasEventListener() examines only the object
   * to which it belongs, whereas willTrigger() examines the entire event flow for the event specified by the type
   * parameter.
   * 
   * @param type The type of event.
   * @return A value of true if a listener of the specified type is registered; false otherwise.
   * @see #willTrigger()
   * /
  function hasEventListener(type : String) : Boolean;*/,/*

  /**
   * Checks whether an event listener is registered with this EventDispatcher object or any of its ancestors for the
   * specified event type. This method returns true if an event listener is triggered during any phase of the event
   * flow when an event of the specified type is dispatched to this EventDispatcher object or any of its descendants.
   * <p>The difference between hasEventListener() and willTrigger() is that hasEventListener() examines only the object
   * to which it belongs, whereas willTrigger() examines the entire event flow for the event specified by the type
   * parameter.
   *  
   * @param type The type of event.
   * @return A value of true if a listener of the specified type will be triggered; false otherwise.
   * /
  function willTrigger(type : String) : Boolean;*/,/*

  /**
   * Removes a listener from the EventDispatcher object. If there is no matching listener registered with the
   * EventDispatcher object, a call to this method has no effect.
   * @param type The type of event.
   * @param listener The listener object to remove.
   * @param useCapture (default = false) Specifies whether the listener was registered for the capture phase or the
   *   target and bubbling phases. If the listener was registered for both the capture phase and the target and
   *   bubbling phases, two calls to removeEventListener() are required to remove both: one call with useCapture set
   *   to true, and another call with useCapture set to false.
   * /
  function removeEventListener(type : String, listener : Function, useCapture : Boolean = false) : void;*/,/*

  /**
   * Registers an event listener object with an EventDispatcher object so that the listener receives notification of
   * an event. You can register event listeners on all nodes in the display list for a specific type of event, phase,
   * and priority.
   * <p>After you successfully register an event listener, you cannot change its priority through additional calls to
   * addEventListener(). To change a listener's priority, you must first call removeEventListener(). Then you can
   * register the listener again with the new priority level.
   * <p>After the listener is registered, subsequent calls to addEventListener() with a different value for either type
   * or useCapture result in the creation of a separate listener registration. For example, if you first register a
   * listener with useCapture set to true, it listens only during the capture phase. If you call addEventListener()
   * again using the same listener object, but with useCapture set to false, you have two separate listeners: one that
   * listens during the capture phase, and another that listens during the target and bubbling phases.
   * <p>You cannot register an event listener for only the target phase or the bubbling phase. Those phases are coupled
   * during registration because bubbling applies only to the ancestors of the target node.
   * <p>When you no longer need an event listener, remove it by calling EventDispatcher.removeEventListener();
   * otherwise, memory problems might result. Objects with registered event listeners are not automatically removed
   * from memory because the garbage collector does not remove objects that still have references.
   * <p>Copying an EventDispatcher instance does not copy the event listeners attached to it. (If your newly created
   * node needs an event listener, you must attach the listener after creating the node.) However, if you move an
   * EventDispatcher instance, the event listeners attached to it move along with it.
   * <p>If the event listener is being registered on a node while an event is also being processed on this node, the
   * event listener is not triggered during the current phase but may be triggered during a later phase in the event
   * flow, such as the bubbling phase.
   * <p>If an event listener is removed from a node while an event is being processed on the node, it is still
   * triggered by the current actions. After it is removed, the event listener is never invoked again (unless it is
   * registered again for future processing).
   * 
   * @param type The type of event.
   * @param listener The listener function that processes the event. This function must accept an Event object as its
   *   only parameter and must return nothing, as this example shows:
   *   <code>function(evt:Event):void</code>
   *   The function can have any name.
   * @param useCapture (default = false) Determines whether the listener works in the capture phase or the target and
   *   bubbling phases. If useCapture is set to true, the listener processes the event only during the capture phase
   *   and not in the target or bubbling phase. If useCapture is false, the listener processes the event only during
   *   the target or bubbling phase. To listen for the event in all three phases, call addEventListener() twice, once
   *   with useCapture set to true, then again with useCapture set to false.
   * @param priority (default = 0) The priority level of the event listener. Priorities are designated by a 32-bit
   *   integer. The higher the number, the higher the priority. All listeners with priority n are processed before
   *   listeners of priority n-1. If two or more listeners share the same priority, they are processed in the order
   *   in which they were added. The default priority is 0.
   * @param useWeakReference (default = false) Determines whether the reference to the listener is strong or weak.
   *   A strong reference (the default) prevents your listener from being garbage-collected. A weak reference does not.
   *   Class-level member functions are not subject to garbage collection, so you can set useWeakReference to true for
   *   class-level member functions without subjecting them to garbage collection. If you set useWeakReference to true
   *   for a listener that is a nested inner function, the function will be garbge-collected and no longer persistent.
   *   If you create references to the inner function (save it in another variable) then it is not garbage-collected
   *   and stays persistent.
   * /
  function addEventListener(type : String, listener : Function, useCapture : Boolean = false, priority :int = 0, useWeakReference : Boolean = false) : void;*/,
];},[],[], "0.7.1", "0.7.5"
);