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

"public class DynamicClassLoader extends joo.StandardClassLoader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$onCompleteCallbacks=$$l+'onCompleteCallbacks',$pendingDependencies=$$l+'pendingDependencies',$pendingClassState=$$l+'pendingClassState',$prepare=$$l+'prepare',$doCompleteCallbacks=$$l+'doCompleteCallbacks',$internalDoCompleteCallbacks=$$l+'internalDoCompleteCallbacks',$createClassLoadErrorHandler=$$l+'createClassLoadErrorHandler',$import_=$$l+'import_',$run=$$l+'run',$load=$$l+'load',$determineUrlPrefix=$$l+'determineUrlPrefix',$complete=$$l+'complete',$loadPendingDependencies=$$l+'loadPendingDependencies';return[ 

  "public static const",{ STANDARD_URL_PREFIX/*:String*/ : "scripts/classes/"},

  "private static function isEmpty",function isEmpty(object/* : Object*/)/* : Boolean*/ {
    //noinspection LoopStatementThatDoesntLoopJS
    for (var m/*:String*/ in object) {
      return false;
    }
    return true;
  },

  "public static var",{ INSTANCE/*:DynamicClassLoader*/: undefined},

  "public var",{ urlPrefix/* : String*/: undefined},
  "private var",{ onCompleteCallbacks/* : Array*//*<Function>*/ :function(){return( []);}},

  "public function DynamicClassLoader",function $DynamicClassLoader() {this[$super]();this[$onCompleteCallbacks]=this[$onCompleteCallbacks]();this[$pendingDependencies]=this[$pendingDependencies]();this[$pendingClassState]=this[$pendingClassState]();
    this.debug = joo.classLoader.debug;
    this.urlPrefix = joo.classLoader['urlPrefix'];
    joo.classLoader = joo.DynamicClassLoader.INSTANCE = this;
    if (!this.urlPrefix) {
      this.urlPrefix = this[$determineUrlPrefix]();
    }
  },

  /**
   * Keep record of all classes whose dependencies still have to be loaded.
   */
  "private var",{ pendingDependencies/* : Array*//*<ClassDeclaration>*/ :function(){return( []);}},
  /**
   * false => pending
   * true => loading
   */
  "private var",{ pendingClassState/* : Object*//*<String,Boolean>*/ :function(){return( {});}},

  "override public function prepare",function prepare(packageDef/*:String*/, classDef/*:String*/, memberFactory/*:Function*/, publicStaticMethodNames/*:Array*/, dependencies/*:Array*/, version/*:String*/)/*:SystemClassDeclaration*/ {
    var cd/*:SystemClassDeclaration*/ = this[$prepare](packageDef, classDef, memberFactory, publicStaticMethodNames, dependencies, version);
    this[$pendingDependencies].push(cd);
    if (delete this[$pendingClassState][cd.fullClassName]) {
      if (this.debug) {
        trace("prepared class " + cd.fullClassName + ", removed from pending classes.");
      }
      if (this[$onCompleteCallbacks].length) {
        this[$loadPendingDependencies]();
        if ($$private.isEmpty(this[$pendingClassState])) {
          this.doCompleteCallbacks(this[$onCompleteCallbacks]);
        }
      }
    }
    return cd;
  },

  "override protected function doCompleteCallbacks",function doCompleteCallbacks(onCompleteCallbacks/* : Array*//*Function*/)/*:void*/ {var $this=this;
    this[$onCompleteCallbacks] = [];
    // "invoke later":
    joo.getQualifiedObject("setTimeout")(function joo$DynamicClassLoader$76_38()/* : void*/ {
      $this.completeAll();
      $this[$internalDoCompleteCallbacks](onCompleteCallbacks);
    }, 0);
  },

  "private function internalDoCompleteCallbacks",function internalDoCompleteCallbacks(onCompleteCallbacks/* : Array*//*Function*/)/*:void*/ {
    this[$doCompleteCallbacks](onCompleteCallbacks);
  },

  // separate factory function to move the anonymous function out of the caller's scope:
  "private function createClassLoadErrorHandler",function createClassLoadErrorHandler(fullClassName/*:String*/, url/*:String*/)/*:Function*/ {var $this=this;
    return function joo$DynamicClassLoader$88_12()/*:void*/ {
      $this.classLoadErrorHandler(fullClassName, url);
    };
  },

  "public function classLoadErrorHandler",function classLoadErrorHandler(fullClassName/*:String*/, url/*:String*/)/*:void*/ {
    trace("Class "+fullClassName+" not found at URL ["+url+"].");
  },

  /**
   * Import the class given by its fully qualified class name (package plus name).
   * All imports are collected in a hash and can be used in the #complete() callback function.
   * Additionally, the DynamicClassLoader tries to load the class from a URL if it is not present on #complete().
   * @param fullClassName : String the fully qualified class name (package plus name) of the class to load and import.
   */
  "public override function import_",function import_(fullClassName/* : String*/)/* : void*/ {
    this[$import_](fullClassName);
    this[$load](fullClassName);
  },

  "override public function run",function run(mainClassName/* : String, ...args*/)/*:void*/ {var args=Array.prototype.slice.call(arguments,1);
    this[$load](mainClassName);
    args.splice(0,0,mainClassName);
    this[$run].apply(this,args);
  },

  "private function load",function load(fullClassName/* : String*/)/* : void*/ {
    if (!this.getClassDeclaration(fullClassName)) {
      if (this[$onCompleteCallbacks].length==0) {
        if (this[$pendingClassState][fullClassName]===undefined) {
          // we are not yet in completion phase: just add to pending classes:
          this[$pendingClassState][fullClassName] = false;
          if (this.debug) {
            trace("added to pending classes: "+fullClassName+".");
          }
        }
      } else {
        if (this[$pendingClassState][fullClassName]!==true) {
          // trigger loading:
          this[$pendingClassState][fullClassName] = true;
          var url/*:String*/ = this.getUri(fullClassName);
          if (this.debug) {
            trace("triggering to load class " + fullClassName + " from URL " + url + ".");
          }
          var script/*:Object*/ = this.loadScript(url);
          // script.onerror does not work in IE, but since this feature is for debugging only, we don't mind:
          script.onerror = this[$createClassLoadErrorHandler](fullClassName, script['src']);
        }
      }
    }
  },

  "protected function getBaseUri",function getBaseUri()/* : String*/ {
    return this.urlPrefix;
  },

  "private function determineUrlPrefix",function determineUrlPrefix()/*:String*/ {/*
    const*/var RUNTIME_URL_PATTERN/*:RegExp*/ =/^(.*)\bjangaroo-runtime[^.]*\.js$/;
    var document/*:**/ = joo.getQualifiedObject("document");
    if (document) {
      var scripts/*:Array*/ = document["getElementsByTagName"]("SCRIPT");
      for (var i/*:int*/ =0; i<scripts.length; ++i) {
        var match/*:Array*/ = RUNTIME_URL_PATTERN.exec(scripts[i].src);
        if (match) {
          var code/*:String*/ = scripts[i]["innerHTML"];
          if (code && code.length) {
            joo.getQualifiedObject("setTimeout")(function joo$DynamicClassLoader$154_46()/* : void*/ {
              joo.getQualifiedObject("eval")(code);
            }, 0);
          }
          return match[1] + "classes/";
        }
      }
    }
    if (this.debug) {
      trace("WARNING: no joo.classLoader.urlPrefix set and Jangaroo Runtime script element not found. "
        + "Falling back to standard urlPrefix '" + joo.DynamicClassLoader.STANDARD_URL_PREFIX + "'.");
    }
    return joo.DynamicClassLoader.STANDARD_URL_PREFIX;
  },

  "protected function getUri",function getUri(fullClassName/* : String*/)/* : String*/ {
    var baseUri/* : String*/ = this.getBaseUri();
    return baseUri + fullClassName.replace(/\./g,"/") + ".js";
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
  "public override function complete",function complete(onCompleteCallback/* : Function = undefined*/)/* : void*/ {
    if (onCompleteCallback || this[$onCompleteCallbacks].length==0) {
      this[$onCompleteCallbacks].push(onCompleteCallback || $$private.defaultOnCompleteCallback);
    }
    this[$loadPendingDependencies]();
    if ($$private.isEmpty(this[$pendingClassState])) {
      // no deferred classes: do not behave any different than my super class
      this[$complete](onCompleteCallback);
    } else {
      for (var c/*:String*/ in this[$pendingClassState]) {
        this[$load](c);
      }
    }
  },

  "private static function defaultOnCompleteCallback",function defaultOnCompleteCallback()/* : void*/ {
    trace("All classes loaded!");
  },

  "private function loadPendingDependencies",function loadPendingDependencies()/*:void*/ {
    for (var j/*:int*/ =0; j<this[$pendingDependencies].length; ++j) {
      var dependencies/* : Array*/ = (this[$pendingDependencies][j]/*as ClassDeclaration*/).getDependencies();
      for (var i/*:int*/ =0; i<dependencies.length; ++i) {
        this[$load](dependencies[i]);
      }
    }
    this[$pendingDependencies] = [];
  },
];},[],["joo.StandardClassLoader"], "0.7.1", "0.7.5"
);