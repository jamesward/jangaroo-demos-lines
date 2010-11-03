joo.classLoader.prepare(////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2005-2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

"package mx.collections",/*
{
import flash.events.Event*/

/**
 *  The ArrayCollection class is a wrapper class that exposes an Array as
 *  a collection that can be accessed and manipulated using the methods
 *  and properties of the <code>ICollectionView</code> or <code>IList</code>
 *  interfaces. Operations on a ArrayCollection instance modify the data source;
 *  for example, if you use the <code>removeItemAt()</code> method on an
 *  ArrayCollection, you remove the item from the underlying Array.
 *
 *  @mxml
 *
 *  <p>The <code>&lt;mx:ArrayCollection&gt;</code> tag inherits all the attributes of its
 *  superclass, and adds the following attributes:</p>
 *
 *  <pre>
 *  &lt;mx:ArrayCollection
 *  <b>Properties</b>
 *  source="null"
 *  /&gt;
 *  </pre>
 *
 *  @example The following code creates a simple ArrayCollection object that
 *  accesses and manipulates an array with a single Object element.
 *  It retrieves the element using the IList interface <code>getItemAt</code>
 *  method and an IViewCursor object that it obtains using the ICollectionView
 *  <code>createCursor</code> method.
 *  <pre>
 *  var myCollection:ArrayCollection = new ArrayCollection([ { first: 'Matt', last: 'Matthews' } ]);
 *  var myCursor:IViewCursor = myCollection.createCursor();
 *  var firstItem:Object = myCollection.getItemAt(0);
 *  var firstItemFromCursor:Object = myCursor.current;
 *  if (firstItem == firstItemFromCursor)
 *        doCelebration();
 *  </pre>
 */
"public class ArrayCollection extends Array implements mx.collections.ListCollectionView",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Error);},
/*
  ////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2005-2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

import mx.core.mx_internal*/

/**
 *  @private
 *  Version string for this class.
 */
"mx_internal static const",{ VERSION/*:String*/ : "3.3.0.4852"},


  //--------------------------------------------------------------------------
  //
  //  Constructor
  //
  //--------------------------------------------------------------------------

  /**
   *  Constructor.
   *
   *  <p>Creates a new ArrayCollection using the specified source array.
   *  If no array is specified an empty array will be used.</p>
   */
  "public function ArrayCollection",function $ArrayCollection(source/*:Array = undefined*/)
  {
    this[$super]();

    if (source) {
      for (var i/*:uint*/ = 0; i < source.length; ++i) {
        this[i] = source[i];
      }
      this.length = source.length;
    }
  },

  //--------------------------------------------------------------------------
  //
  // IList Methods
  //
  //--------------------------------------------------------------------------

  /**
   * @inheritDoc
   */
  "public function getItemAt",function getItemAt(index/*:int*/, prefetch/*:int = 0*/)/*:Object*/ {if(arguments.length<2){prefetch = 0;}
    if (index < 0 || index >= this.length)
    {
      throw new /*Range*/Error("[collections] outOfBounds: " + index);
    }

    return this[index];
  },

  /**
   * @inheritDoc
   */
  "public function addItem",function addItem(item/*:Object*/)/*:void*/ {
    this[this.length++] = item;
  },

  /**
   * @inheritDoc
   */
  "public function toArray",function toArray()/*:Array*/ {
    var result/*:Array*/ = [];
    for (var i/*:uint*/ = 0; i < this.length; ++i) {
      result[i] = this[i];
    }
    return result;
  },

  /**
   * @inheritDoc
   */
  "public function getItemIndex",function getItemIndex(item/*:Object*/)/*:int*/ {
    return this.indexOf(item);
  },

  /**
   * @inheritDoc
   */
  "public function removeAll",function removeAll()/*:void*/ {
    this.length = 0;
  },

  /**
   * @inheritDoc
   */
  "public function setItemAt",function setItemAt(item/*:Object*/, index/*:int*/)/*:Object*/ {
    var oldItem/*:Object*/ = this.getItemAt(index);
    this[index] = item;
    return oldItem;
  },

  //--------------------------------------------------------------------------
  //
  // IList Methods
  //
  //--------------------------------------------------------------------------

  "public function addItemAt",function addItemAt(item/*:Object*/, index/*:int*/)/*:void*/ {
    throw new Error("not implemented");
  },

  "public function itemUpdated",function itemUpdated(item/*:Object*/, property/*:Object = null*/, oldValue/*:Object = null*/, newValue/*:Object = null*/)/*:void*/ {if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){property = null;}oldValue = null;}newValue = null;}
    throw new Error("not implemented");
  },

  "public function removeItemAt",function removeItemAt(index/*:int*/)/*:Object*/ {
    throw new Error("not implemented");
  },

  "public function dispatchEvent",function dispatchEvent(event/*:Event*/)/*:Boolean*/ {
    throw new Error("not implemented");
  },

  "public function hasEventListener",function hasEventListener(type/*:String*/)/*:Boolean*/ {
    throw new Error("not implemented");
  },

  "public function willTrigger",function willTrigger(type/*:String*/)/*:Boolean*/ {
    throw new Error("not implemented");
  },

  "public function removeEventListener",function removeEventListener(type/*:String*/, listener/*:Function*/, useCapture/*:Boolean = false*/)/*:void*/ {if(arguments.length<3){useCapture = false;}
    throw new Error("not implemented");
  },

  "public function addEventListener",function addEventListener(type/*:String*/, listener/*:Function*/, useCapture/*:Boolean = false*/, priority/*:int = 0*/, useWeakReference/*:Boolean = false*/)/*:void*/ {if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){useCapture = false;}priority = 0;}useWeakReference = false;}
    throw new Error("not implemented");
  },
];},[],["Array","mx.collections.ListCollectionView","Error"], "0.7.1", "0.7.5"
);