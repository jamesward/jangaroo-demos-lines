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

"public class StandardClassLoader extends joo.SystemClassLoader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$imports=$$l+'imports',$createClassDeclaration=$$l+'createClassDeclaration',$init=$$l+'init';return[function(){joo.classLoader.init(joo.ClassDeclaration);}, 

  "private static var",{ classDeclarations/* : Array*/ :function(){return( []);}},

  "private var",{ imports/* : Array*/: undefined},

  "public function StandardClassLoader",function $StandardClassLoader() {this[$super]();
    this[$imports] = [];
  },

  "override protected function createClassDeclaration",function createClassDeclaration(packageDef/* : String*/, classDef/* : String*/, memberFactory/* : Function*/,
                                                  publicStaticMethodNames/* : Array*/, dependencies/* : Array*/)/*:SystemClassDeclaration*/ {
    var cd/* : ClassDeclaration*/ = new joo.ClassDeclaration(packageDef, classDef, memberFactory, publicStaticMethodNames, dependencies);
    $$private.classDeclarations.push(cd); // remember all created classes for later initialization.
    return cd;
  },

  "public function loadScript",function loadScript(uri/*:String*/)/*:Object*/ {
    var joo__loadScript/*:Function*/ = joo.getQualifiedObject("joo__loadScript");
    if (joo__loadScript) {
      joo__loadScript(uri);
      return {};
    }
    var document/*:**/ = joo.getQualifiedObject("document");
    var script/*:Object*/ = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("HEAD")[0].appendChild(script);
    script.src = uri;
    return script;
  },

  /**
   * Import the class given by its fully qualified class name (package plus name).
   * All imports are collected in a hash and can be used in the #complete() callback function.
   * @param fullClassName : String the fully qualified class name (package plus name) of the class to load and import.
   */
  "public function import_",function import_(fullClassName/* : String*/)/* : void*/ {    
    this[$imports].push(fullClassName);
  },

  /**
   * Run the static main method of a class given by its fully qualified name (package plus name), handing through the
   * given arguments (args).
   * The main method is executed after all classes are completed (see #complete()).
   * @param mainClassName : String the fully qualified name (package plus name) or the constructor function
   *   of the class to run.
   * @param args the arguments to hand over to the main method of the given class.
   */
  "public function run",function run(mainClassName/* : String, ...args*/)/* : void*/ {var $this=this;var args=Array.prototype.slice.call(arguments,1);
    this.complete(function joo$StandardClassLoader$69_19()/* : void*/ {
      var mainClass/* : SystemClassDeclaration*/ = $this.getRequiredClassDeclaration(mainClassName)/*as SystemClassDeclaration*/;
      mainClass.publicConstructor["main"].apply(null,args);
    });
  },

  /**
   * Explicitly initialize the static members of the given class (constructor function).
   * If the class is not yet initialized, Initializers of static variables and static code blocks are called (once).
   * This is only necessary when you want to access constants of a class without importing the class,
   * or when you have loaded the class explicitly and want its static code to execute.
   * Explicit initializing is <i>not</i> necessary when you
   * - import the class or
   * - load the class and use the constructor or a static method of the class. This will trigger initialization
   *   automatically.
   * @param classes the classes (type Function) to initialize.
   * @return Function the initialized class (constructor function).
   */
  "public override function init",function init(/*... classes*/)/* : Function*/ {var classes=arguments;
    var clazz/* : Function*/;
    for (var i/*:int*/ =0; i<classes.length; ++i) {
      if ("$class" in classes[i]) {
        ((clazz = classes[i])["$class"]/*as NativeClassDeclaration*/).init();
      }
    }
    return clazz;
  },

  /**
   * Tell Jangaroo to load and initialize all required classes, then call the given function.
   * The function receives an import hash, which can be used in pure JavaScript in a 'with' statement
   * (Jangaroo does not support 'with', there, you would use import declarations!) like this:
   * <pre>
   * joo.classLoader.import_("com.custom.Foo");
   * joo.classLoader.complete(function(imports){with(imports){
   *   Foo.doSomething("bar");
   * }});
   * </pre>
   * @param onCompleteCallback : Function
   * @return void
   */
  "public function complete",function complete(onCompleteCallback/* : Function = undefined*/)/* : void*/ {
    this.completeAll();
    if (onCompleteCallback) {
      this.doCompleteCallbacks([onCompleteCallback]);
    }
  },

  "protected function completeAll",function completeAll()/* : void*/ {
    $$private.classDeclarations.forEach(function joo$StandardClassLoader$118_31(classDeclaration/* : ClassDeclaration*/)/* : void*/ {
      classDeclaration.complete();
      // init native class patches immediately:
      if (classDeclaration.isNative()) {
        classDeclaration.init();
      }
    });
  },

  "protected function doCompleteCallbacks",function doCompleteCallbacks(onCompleteCallbacks/* : Array*//*Function*/)/* : void*/ {
    if (onCompleteCallbacks.length) {
      var importMap/* : Object*/ = {};
      this[$imports].forEach(function joo$StandardClassLoader$130_23(fullClassName/*:String*/)/*:void*/ {
        var className/* : String*/ = fullClassName.substring(fullClassName.lastIndexOf(".") + 1);
        importMap[className] = joo.classLoader.getRequiredClassDeclaration(fullClassName).init().publicConstructor;
      });
      for (var i/*:int*/ = 0; i < onCompleteCallbacks.length; ++i) {
        (onCompleteCallbacks[i]/*as Function*/)(importMap);
      }
    }
  },
];},[],["joo.SystemClassLoader","joo.ClassDeclaration"], "0.7.1", "0.7.5"
);