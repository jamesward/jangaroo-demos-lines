joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Frank Wienberg

"package joo",/* {*/

"public class NativeClassDeclaration",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Error);}, 

  "internal static function createEmptyConstructor",function createEmptyConstructor(constructor_/* : Function*/)/* : Function*/ {
    var emptyConstructor/* : Function*/ = function joo$NativeClassDeclaration$23_39()/* : void*/ {
      this.constructor = constructor_;
    };
    emptyConstructor.prototype =  constructor_.prototype;
    return emptyConstructor;
  },

  "public var",{
          level/* : int*/ : -1,
          fullClassName/* : String*/: undefined,
          constructor_/* : Function*/: undefined,
          publicConstructor/* : Function*/: undefined,
          completed/*  : Boolean*/ : false,
          inited/*  : Boolean*/ : false,
          Public/* : Function*/: undefined,
          superClassDeclaration/* : NativeClassDeclaration*/: undefined,
          interfaces/* : Array*/: undefined},

  "public function NativeClassDeclaration",function $NativeClassDeclaration() {this[$super]();
  },

  "public function create",function create(fullClassName/* : String*/, publicConstructor/* : Function*/)/* : NativeClassDeclaration*/ {
    this.fullClassName = fullClassName;
    this.publicConstructor = publicConstructor;
    try {
      this.publicConstructor["$class"] = this;
    } catch(e){if(is (e,Error)) {
      // ignore that expando properties do not work with certain native objects in certain browsers, e.g. IE7 / XMLHttpRequest
    }else throw e;}
    return this;
  },

  "public function complete",function complete()/* : NativeClassDeclaration*/ {
    if (!this.completed) {
      this.completed = true;
      this.doComplete();
    }
    return this;
  },

  // built-in Error constructor called as function unfortunately always creates a new Error object, so we have to emulate it:
  "private static const",{ ERROR_CONSTRUCTOR/*:Function*/ : function joo$NativeClassDeclaration$64_53(message/*:String*/)/*:void*/ {
    this.message = message || "";
  }},

  "protected function doComplete",function doComplete()/* : void*/ {
    this.interfaces = [];
    this.constructor_ = this.publicConstructor === Error ? $$private.ERROR_CONSTRUCTOR : this.publicConstructor;
    this.Public = joo.NativeClassDeclaration.createEmptyConstructor(this.publicConstructor);
  },

  "public function init",function init()/* : NativeClassDeclaration*/ {
    if (!this.inited) {
      this.inited = true;
      this.complete();
      this.doInit();
    }
    return this;
  },

  "protected function doInit",function doInit()/* : void*/ {
  },

  "public function isInstance",function isInstance(object/* : Object*/)/* : Boolean*/ {
    return object instanceof this.constructor_ || object && object.constructor===this.constructor_;
  },

  "public function getQualifiedName",function getQualifiedName()/* : String*/ {
    // AS uses namespace notation (::) to separate package and class name:
    return this.fullClassName.replace(/\.([^\.]+)^/, "::");
  },

  "public function toString",function toString()/* : String*/ {
    return this.fullClassName;
  },
];},["createEmptyConstructor"],["Error"], "0.7.1", "0.7.5"
);