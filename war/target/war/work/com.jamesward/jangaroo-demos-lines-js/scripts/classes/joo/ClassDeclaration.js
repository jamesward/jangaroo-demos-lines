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

"public class ClassDeclaration extends joo.SystemClassDeclaration",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$dependencies=$$l+'dependencies',$doComplete=$$l+'doComplete',$createInitializingStaticMethod=$$l+'createInitializingStaticMethod',$deleteInitializingStaticMethod=$$l+'deleteInitializingStaticMethod',$doInit=$$l+'doInit',$isInstance=$$l+'isInstance';return[ 

  "private var",{ dependencies/* : Array*/: undefined},

  "public function ClassDeclaration",function $ClassDeclaration(packageDef/*:String*/, classDef/*:String*/, memberDeclarations/*:Function*/,
          publicStaticMethods/* : Array*/, dependencies/* : Array*/) {
    this[$super](packageDef, classDef, memberDeclarations, publicStaticMethods);
    this[$dependencies] = dependencies;
  },

  "public function getDependencies",function getDependencies()/* : Array*/ {
    return this[$dependencies];
  },

  "override protected function doComplete",function doComplete()/*:void*/ {
    this[$doComplete]();
    $$private.createInitializingConstructor(this);
    this.publicStaticMethodNames.forEach($$bound(this,$createInitializingStaticMethod));
  },

  "private static function createInitializingConstructor",function createInitializingConstructor(classDeclaration/* : ClassDeclaration*/)/* : void*/ {
    // anonymous function has to be inside a static function, or jooc will replace "this" with "$this":
    classDeclaration.constructor_ = function joo$ClassDeclaration$42_37()/* : void*/ {
      classDeclaration.init();
      assert((classDeclaration.constructor_!=null), "C:\\Users\\fwienber\\git\\jangaroo-tools\\target\\checkout\\jangaroo-core\\jangaroo-runtime\\src\\main\\joo\\joo\\ClassDeclaration.as", 44, 7); // must have been set, at least to a default constructor!
      classDeclaration.constructor_.apply(this, arguments);
    };
  },

  "private function createInitializingStaticMethod",function createInitializingStaticMethod(methodName/* : String*/)/* : void*/ {
    var classDeclaration/* : ClassDeclaration*/ = this;
    classDeclaration.publicConstructor[methodName] = function joo$ClassDeclaration$51_54()/* : **/ {
      //assert(!classDeclaration.inited);
      classDeclaration.init();
      return classDeclaration.publicConstructor[methodName].apply(null, arguments);
    };
  },

  "private function deleteInitializingStaticMethod",function deleteInitializingStaticMethod(methodName/* : String*/)/* : void*/ {
    delete this.publicConstructor[methodName];
  },

  "protected override function doInit",function doInit()/*:void*/ {
    this.publicStaticMethodNames.forEach($$bound(this,$deleteInitializingStaticMethod));
    this[$doInit]();
    this.interfaces.forEach(function joo$ClassDeclaration$65_29(interface_/* : String*/, i/* : uint*/, interfaces/* : Array*/)/* : void*/ {
      interfaces[i] = joo.classLoader.getRequiredClassDeclaration(interface_);
      interfaces[i].init();
    });
  },

  /**
   * Determines if the specified <code>Object</code> is assignment-compatible
   * with the object represented by this <code>ClassDefinition</code>.
   * The method returns <code>true</code> if the specified
   * <code>Object</code> argument is non-null and can be cast to the
   * reference type represented by this <code>Class</code> object without
   * raising a <code>ClassCastException.</code> It returns <code>false</code>
   * otherwise.
   */
  "public override function isInstance",function isInstance(object/* : Object*/)/* : Boolean*/ {
    return typeof object == "object" && object.constructor["$class"] ? this.isAssignableFrom(object.constructor["$class"]) : false;
  },

  /**
   * Determines if the class or interface represented by this
   * <code>ClassDefinition</code> object is either the same as, or is a super class or
   * super interface of, the class or interface represented by the specified
   * <code>ClassDefinition</code> parameter. It returns <code>true</code> if so;
   * otherwise it returns <code>false</code>.
   */
  "protected function isAssignableFrom",function isAssignableFrom(cd/* : NativeClassDeclaration*/)/* : Boolean*/ {
    do {
      if (this===cd) {
        return true;
      }
      // TODO: optimize: pre-calculate set of all implemented interfaces of a class!
      if (this.isInterface()) {
        // I am an interface: search all implemented interfaces recursively:
        if (cd.interfaces.some($$bound(this,"isAssignableFrom"))) {
          return true;
        }
      }
      cd = cd.superClassDeclaration;
    } while(cd);
    return false;
  },

];},[],["joo.SystemClassDeclaration"], "0.7.1", "0.7.5"
);