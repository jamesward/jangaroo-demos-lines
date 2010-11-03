(function(theGlobalObject) {
  theGlobalObject['int'] = theGlobalObject['$$int'] = function $int(num) {
    var i = Math.floor(num);
    if (this===theGlobalObject) {
      return i;
    }
    var result = new Number(i);
    result.constructor = $int;
    return result;
  };
  theGlobalObject['int'].MAX_VALUE =  2147483647;
  theGlobalObject['int'].MIN_VALUE = -2147483648;
})(this);(function(theGlobalObject) {
  theGlobalObject['uint'] = theGlobalObject['$$uint'] = function $uint(num) {
    var ui = Math.abs(Math.floor(num));
    if (this===theGlobalObject) {
      return ui;
    }
    var result = new Number(ui);
    result.constructor = $uint;
    return result;
  };
  theGlobalObject['uint'].MAX_VALUE =  4294967295;
  theGlobalObject['uint'].MIN_VALUE =  0;
})(this);
(function(theGlobalObject){
  // define alias "js" for the top-level package, so that name-clashes in AS3 can be resolved:
  theGlobalObject.js = theGlobalObject;
  // defined here to avoid global name space pollution and unneccessary closures:
  function clone(object) {
    var empty = function(){ };
    empty.prototype =  object;
    return new empty();
  }
  function createGetQualified(create) {
    return (function(name) {
      var object = theGlobalObject;
      if (name) {
        var parts = name.split(".");
        for (var i=0; i<parts.length; ++i) {
          var subobject = object[parts[i]];
          try {
            if(String(subobject).indexOf("[JavaPackage")==0) {
              subobject =  null;
            }
          } catch(e) {
            subobject = null;
          }
          if (!subobject) {
            if (create) {
              subobject = object[parts[i]] = {};
            } else {
              return null;
            }
          }
          object = subobject;
        }
      }
      return object;
    });
  }

  theGlobalObject.joo = {
    version: "0.7.1",
    getOrCreatePackage: createGetQualified(true),
    getQualifiedObject: createGetQualified(false),

    /*
    unsupported ActionScript features:
      - private non-static members
      - field initializers
      - typed catch clauses
      - dynamic class loading + resource bundles
      - all classes must reside within the joo package

     Caveat: static code blocks are executed immediately

     */
    classLoader: {
      prepare: function(packageDef, classDef, memberFactory) {
        var classMatch = classDef.match(/^\s*((public|internal|final|dynamic)\s+)*class\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.]+))?(\s+implements\s+([a-zA-Z$_0-9.,\s]+))?\s*$/);
        var className = classMatch[3];
        var $extends = classMatch[5];
        var constructor;
        var publicConstructor = joo[className] = function() {
          constructor.apply(this, arguments);
        };
        var superConstructor;
        if ($extends) {
          superConstructor = joo.getQualifiedObject($extends);
          publicConstructor.prototype = clone(superConstructor.prototype);
        } else {
          superConstructor = Object;
        }
        var level = "$" + className + "_";
        publicConstructor.prototype[level + "super"] = superConstructor;
        var privateStatics = {};
        var members = memberFactory(level, privateStatics);
        var staticInitializer;
        for (var i = 0; i < members.length; ++i) {
          var memberDeclaration = members[i];
          switch (typeof memberDeclaration) {
            case "function": staticInitializer = memberDeclaration; break;
            case "string":
              var isStatic = memberDeclaration.match(/\bstatic\b/);
              var isPrivate = memberDeclaration.match(/\bprivate\b/);
              var target = isStatic ? isPrivate ? privateStatics : publicConstructor : publicConstructor.prototype;
              var member = members[++i];
              if (typeof member == "function") {
                var methodName = memberDeclaration.match(/function\s+([a-zA-Z$_0-9]+)/)[1];
                if (methodName == className) {
                  constructor = member;
                } else {
                  target[methodName] = member;
                }
              } else {
                for (var m in member) {
                  target[m] = member[m];
                }
              }
          }
        }
        if (staticInitializer) {
          staticInitializer();
        }
      },
      init: function() {
        // ignore
      }
    }
  };
})(this);
// function assert(cond : Object, file : String, line : uint, column : uint) : void
joo.assert = function joo$assert(cond, file, line, column) {
  if (!cond)
    throw new Error(file+"("+line+":"+column+"): assertion failed");
};
// simulate ActionScript's Class object for type casts and "is"
Class = function joo$Class(c){return c;};
Class.$class = {
  init: function(){},
  isInstance: function(f){return typeof f=="function";}
};
// function trace(msg : String) : void
joo.trace = function joo$trace(msg) {
  msg = "AS3: " + msg;
  var console;
  if ((console = joo.getQualifiedObject("console")) && console.log) {
    console.log(msg);
  } else if ((console = joo.getQualifiedObject("runtime")) && console.trace) {
    console.trace(msg);
  } else if (console = joo.getQualifiedObject("trace")) {
    console(msg);
  } else if (console = joo.getQualifiedObject("opera")) {
    console.postError(msg);
  }
};
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

"public class MemberDeclaration",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(RegExp,Error,Object);}, 

  "public static const",{
          METHOD_TYPE_GET/* : String*/ : "get",
          METHOD_TYPE_SET/* : String*/ : "set",
          MEMBER_TYPE_VAR/* : String*/ : "var",
          MEMBER_TYPE_CONST/* : String*/ : "const",
          MEMBER_TYPE_FUNCTION/* : String*/ : "function",
          MEMBER_TYPE_CLASS/* : String*/ : "class",
          MEMBER_TYPE_INTERFACE/* : String*/ : "interface",
          MEMBER_TYPE_NAMESPACE/* : String*/ : "namespace",
          NAMESPACE_PRIVATE/* : String*/ : "private",
          NAMESPACE_INTERNAL/* : String*/ : "internal",
          NAMESPACE_PROTECTED/* : String*/ : "protected",
          NAMESPACE_PUBLIC/* : String*/ : "public",
          STATIC/* : String*/ : "static",
          FINAL/* : String*/ : "final",
          NATIVE/* : String*/ : "native",
          OVERRIDE/* : String*/ : "override",
          VIRTUAL/* : String*/ : "virtual"},

  "private static var",{ SUPPORTS_GETTERS_SETTERS/* : Boolean*/: undefined},
  "private static var",{ DEFINE_METHOD/* : Object*/: undefined},
  "private static var",{ LOOKUP_METHOD/* : Object*/: undefined},function()

{
  // no static initializers in system classes, use static block:
  $$private.SUPPORTS_GETTERS_SETTERS = "__defineGetter__" in Object['prototype'];
  $$private.DEFINE_METHOD = {
    "get":  "__defineGetter__",
    "set": "__defineSetter__"
  };
  $$private.LOOKUP_METHOD = {
    "get": "__lookupGetter__",
    "set": "__lookupSetter__"
  };
},

  "public static function create",function create(memberDeclarationStr/* : String*/)/* : MemberDeclaration*/ {
    var tokens/* : Array*/ = memberDeclarationStr.split(/\s+//*as String*/)/*as Array*/;
    // ignore imports:
    return tokens[0]=="import" ? null
           : new joo.MemberDeclaration(tokens);
  },

  "internal var",{
          _namespace/* : String*/ :function(){return( joo.MemberDeclaration.NAMESPACE_INTERNAL);},
          _static/* : Boolean*/ : false,
          _final/* : Boolean*/ : false,
          _native/* : Boolean*/ : false,
          _override/* : Boolean*/ : false,
          _cloneFactory/* : Function*/: undefined},
  "public var",{
          memberType/* : String*/: undefined,
          getterOrSetter/* : String*/: undefined,
          memberName/* : String*/: undefined,
          slot/* : String*/: undefined,
          value/* : **/: undefined},

  "public function MemberDeclaration",function $MemberDeclaration(tokens/* : Array*/) {this[$super]();this._namespace=this._namespace();
    for (var j/*:int*/ =0; j<tokens.length; ++j) {
      var token/* : String*/ = tokens[j];
      if (!this.memberType) {
        switch(token) {
          case joo.MemberDeclaration.STATIC:
          case joo.MemberDeclaration.FINAL:
          case joo.MemberDeclaration.NATIVE:
          case joo.MemberDeclaration.OVERRIDE:
            this["_"+token] = true; break;
          case joo.MemberDeclaration.MEMBER_TYPE_VAR:
          case joo.MemberDeclaration.MEMBER_TYPE_CONST:
          case joo.MemberDeclaration.MEMBER_TYPE_FUNCTION:
          case joo.MemberDeclaration.MEMBER_TYPE_CLASS:
            this.memberType = token; break;
          case joo.MemberDeclaration.VIRTUAL:
            break; // ignore, but do not consider a namespace
          default:
            // "private", "public", "protected", "internal" or a custom namespace:
            this._namespace = token;
        }
      } else {
        if (this.isMethod() && $$private.LOOKUP_METHOD[this.memberName]) {
          this.getterOrSetter = this.memberName; // detected getter or setter
        }
        this.memberName = token; // token following the member type is the member name
        if (this.memberType === joo.MemberDeclaration.MEMBER_TYPE_CLASS) {
          break; // let classLoader.prepare parse the rest!
        }
      }
    }
    if (!this.memberType) {
      throw new Error("Missing member type in declaration '" + tokens.join(" ") + "'.");
    }
  },

  "public function getQualifiedName",function getQualifiedName()/* : String*/ {
    return this._namespace+"::"+this.memberName;
  },

  "public function isPrivate",function isPrivate()/* : Boolean*/ {
    return this._namespace==joo.MemberDeclaration.NAMESPACE_PRIVATE;
  },

  "public function isStatic",function isStatic()/* : Boolean*/ {
    return this._static;
  },

  "public function isFinal",function isFinal()/* : Boolean*/ {
    return this._final;
  },

  "public function isNative",function isNative()/* : Boolean*/ {
    return this._native;
  },

  "public function isOverride",function isOverride()/* : Boolean*/ {
    return this._override;
  },

  "public function isMethod",function isMethod()/* : Boolean*/ {
    return this.memberType==joo.MemberDeclaration.MEMBER_TYPE_FUNCTION;
  },

  "internal function initSlot",function initSlot(level/* : int*/)/* : void*/ {
    this.slot = this.isPrivate() && !this.isStatic()
            ? "$" + level + this.memberName
            : this.memberName;
  },

  // public function retrieveMember(source : Object) : Function
  /* not needed if we take reflection seriously!
   retrieveMember: function joo$MemberDeclaration$getMember(source) {
   return this.getterOrSetter==METHOD_TYPE_GET ? source.__lookupGetter__(this.memberName)
   : this.getterOrSetter==METHOD_TYPE_SET ? source.__lookupSetter__(this.memberName)
   : source[this.memberName];
   },*/

  "public function getNativeMember",function getNativeMember(publicConstructor/* : Function*/)/* : **/ {
    var target/* : **/ = this.isStatic() ? publicConstructor : publicConstructor.prototype;
    if (this.memberType==joo.MemberDeclaration.MEMBER_TYPE_FUNCTION && this.getterOrSetter) {
      // native variables are only declared as getter/setter functions, never implemented as such:
      this.memberType = joo.MemberDeclaration.MEMBER_TYPE_VAR;
      this.getterOrSetter = null;
    }
    try {
      var member/* : **/ = target[this.memberName];
    } catch (e/* : **/) {
      // ignore Firefox' native member access exceptions.
    }
    if (typeof member!="function") {
      var memberObject/* : Object*/ = {};
      memberObject[this.memberName] = member;
      member = memberObject;
    }
    return member;
  },

  "public function hasOwnMember",function hasOwnMember(target/* : Object*/)/* : Boolean*/ {
    // fast path:
    if (!this.getterOrSetter && target.hasOwnProperty) {
      return target.hasOwnProperty(this.slot);
    }
    var value/* : **/ = this.retrieveMember(target);
    if (value!==undefined && target.constructor) {
      // is it really target's own member? Retrieve super's value:
      var superTarget/* : Function*/ = target.constructor.prototype/*as Function*/;
      var superValue/* : **/ = this.retrieveMember(superTarget);
      if (value!==superValue) {
        return true;
      }
    }
    return false;
  },

  "public function retrieveMember",function retrieveMember(target/* : Object*/)/* : **/ {
    if (!target) {
      return undefined;
    }
    var slot/* : String*/ = this.slot;
    if (this.getterOrSetter) {
      if ($$private.SUPPORTS_GETTERS_SETTERS) {
        return target[$$private.LOOKUP_METHOD[this.getterOrSetter]](slot);
      } else {
        slot = this.getterOrSetter+"$"+slot;
      }
    }
    return target[slot];
  },

  "public function storeMember",function storeMember(target/* : Object*/)/* : void*/ {
    // store only if not native:
    if (!this.isNative()) {
      var slot/* : String*/ = this.slot;
      if (this.getterOrSetter) {
        if ($$private.SUPPORTS_GETTERS_SETTERS) {
          // defining a getter or setter disables the counterpart setter/getter from the prototype,
          // so copy that setter/getter before, if "target" does not already define it:
          var oppositeMethodType/*:**/ = this.getterOrSetter==joo.MemberDeclaration.METHOD_TYPE_GET ? joo.MemberDeclaration.METHOD_TYPE_SET : joo.MemberDeclaration.METHOD_TYPE_GET;
          var counterpart/* : Function*/ = target[$$private.LOOKUP_METHOD[oppositeMethodType]](slot);
          // if counterpart is defined, check that it is not overridden (differs from prototype's counterpart):
          if (counterpart && counterpart===target.constructor.prototype[$$private.LOOKUP_METHOD[oppositeMethodType]](slot)) {
              // set the counterpart directly on target. This may be redundant, but we cannot find out.
            target[$$private.DEFINE_METHOD[oppositeMethodType]](slot, counterpart);
          }
          target[$$private.DEFINE_METHOD[this.getterOrSetter]](slot, this.value);
          return;
        } else {
          slot = this.getterOrSetter+"$"+slot;
        }
      }
      target[slot] = this.value;
    }
  },

  "public function hasInitializer",function hasInitializer()/* : Boolean*/ {
    return this.memberType!=joo.MemberDeclaration.MEMBER_TYPE_FUNCTION && typeof this.value=="function" && this.value.constructor!==RegExp;
  },

  "public function _getCloneFactory",function _getCloneFactory()/* : Function*/ {
    if (!this._cloneFactory) {
      this._cloneFactory = function joo$MemberDeclaration$240_28()/* : void*/ { };
      this._cloneFactory.prototype = this;
    }
    return this._cloneFactory;
  },

  "public function clone",function clone(changedProperties/* : Object*/)/* : MemberDeclaration*/ {
    var CloneFactory/* : Function*/ = this._getCloneFactory();
    var clone/* : MemberDeclaration*/ = new CloneFactory();
    for (var m/*:String*/ in changedProperties) {
      clone[m] = changedProperties[m];
    }
    return clone;
  },

  "public function toString",function toString()/* : String*/ {
    var sb/* : Array*/ = [this._namespace];
    if (this._static) {
      sb.push(joo.MemberDeclaration.STATIC);
    }
    if (this._override) {
      sb.push(joo.MemberDeclaration.OVERRIDE);
    }
    sb.push(this.memberType);
    if (this.getterOrSetter) {
      sb.push(this.getterOrSetter);
    }
    sb.push(this.memberName);
    return sb.join(" ");
  },

];},["create"],["Object","Error","RegExp"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(/*
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
);joo.classLoader.prepare(/*
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

"public class SystemClassDeclaration extends joo.NativeClassDeclaration",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$doComplete=$$l+'doComplete',$doInit=$$l+'doInit';return[function(){joo.classLoader.init(joo.MemberDeclaration,Object,Error);}, 

  "protected static function createPublicConstructor",function createPublicConstructor(cd/* : NativeClassDeclaration*/)/* : Function*/ {
    return function joo$SystemClassDeclaration$constructor()/* : void*/ {
      this.constructor =  cd.publicConstructor;
      cd.constructor_.apply(this, arguments);
    };
  },

  "private static function is_",function is_(object/* : **/, type/* : Function*/)/* : Boolean*/ {
    if (!type || object===undefined || object===null) {
      return false;
    }
    // instanceof or constructor may return false negatives:
    if (object instanceof type || object.constructor===type) {
      return true;
    }
    if (type["$class"]) {
      return (type["$class"]/*as NativeClassDeclaration*/).isInstance(object);
    }
    return false;
  },

  "private static function boundMethod",function boundMethod(object/*:Object*/, methodName/*:String*/)/*:Function*/ {
    return object['$$b_'+methodName] ||
      (object['$$b_'+methodName] = function joo$SystemClassDeclaration$45_36()/*:**/ {
        return object[methodName].apply(object,arguments);
      });
  },function()

{
  // publish "is" and "boundMethod" as "joo.is" and "joo.boundMethod" for use from JavaScript:
  var jooPackage/*:**/ = joo.getQualifiedObject("joo");
  jooPackage["is"] = $$private.is_;
  jooPackage["boundMethod"] = $$private.boundMethod;
},

  "protected var",{
          package_/* : Object*/: undefined,
          type/* : String*/ :function(){return( joo.MemberDeclaration.MEMBER_TYPE_CLASS);},
          namespace_/* : String*/ :function(){return( joo.MemberDeclaration.NAMESPACE_INTERNAL);},
          className/* : String*/: undefined,
          native_/* : Boolean*/ : false,
          extends_/* : String*/ : "Object",
          privateStatics/* : Object*/: undefined,
          memberDeclarations/* : **/: undefined /* Function, then Array */,
          memberDeclarationsByQualifiedName/* : Object*/: undefined,
          staticInitializers/* : Array*/: undefined/*<MemberDeclaration>*/,
          publicStaticMethodNames/* : Array*/: undefined},

  "private static const",{ DECLARATION_PATTERN_CLASS/*:RegExp*/ :/^\s*((public|internal|final|dynamic)\s+)*class\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.]+))?(\s+implements\s+([a-zA-Z$_0-9.,\s]+))?\s*$/},
  "private static const",{ DECLARATION_PATTERN_INTERFACE/*:RegExp*/ :/^\s*((public|internal)\s+)?interface\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.,\s]+))?\s*$/},
  "private static const",{ DECLARATION_PATTERN_NAMESPACE/*:RegExp*/ :/^\s*((public|internal)\s+)?namespace\s+([A-Za-z][a-zA-Z$_0-9]*)\s*$/},

  "public function SystemClassDeclaration",function $SystemClassDeclaration(packageDef/* : String*/, classDef/* : String*/, memberDeclarations/* : Function*/,
          publicStaticMethodNames/* : Array*/) {this[$super]();this.namespace_=this.namespace_();this.type=this.type();
    var packageName/* : String*/ = packageDef.split(/\s+//*as String*/)[1] || "";
    this.package_ = joo.getOrCreatePackage(packageName);
    var classMatch/* : Array*/ = classDef.match($$private.DECLARATION_PATTERN_CLASS);
    var interfaces/* : String*/;
    if (classMatch) {
      if (classMatch[5]) {
        this.extends_ = classMatch[5];
      }
      interfaces = classMatch[7];
    } else {
      classMatch = classDef.match($$private.DECLARATION_PATTERN_INTERFACE);
      if (classMatch) {
        this.type = joo.MemberDeclaration.MEMBER_TYPE_INTERFACE;
        interfaces = classMatch[5];
      } else {
        classMatch = classDef.match($$private.DECLARATION_PATTERN_NAMESPACE);
        if (classMatch) {
          this.type = joo.MemberDeclaration.MEMBER_TYPE_NAMESPACE;
        }
      }
    }
    if (!classMatch) {
      throw new Error("SyntaxError: \""+classDef+"\" does not match.");
    }
    this.namespace_ = classMatch[2];
    this.className    = classMatch[3];
    var fullClassName/* : String*/ = this.className;
    if (packageName) {
      fullClassName = packageName+"."+this.className;
    }
    this.interfaces = interfaces ? interfaces.split(/\s*,\s*//*as String*/)/*as Array*/ : [];
    this.memberDeclarations = memberDeclarations;
    this.publicStaticMethodNames = publicStaticMethodNames;
    var publicConstructor/* : Function*/ = joo.getQualifiedObject(fullClassName)/*as Function*/;
    if (publicConstructor) {
      this.native_ = true;
    } else {
      publicConstructor = joo.SystemClassDeclaration.createPublicConstructor(this);
      this.package_[this.className] = publicConstructor;
    }
    this.create(fullClassName, publicConstructor);
    this.privateStatics = {};
  },

  "public function isClass",function isClass()/* : Boolean*/ {
    return this.type === joo.MemberDeclaration.MEMBER_TYPE_CLASS;
  },

  "public function isInterface",function isInterface()/* : Boolean*/ {
    return this.type === joo.MemberDeclaration.MEMBER_TYPE_INTERFACE;
  },

  "public function isNamespace",function isNamespace()/* : Boolean*/ {
    return this.type === joo.MemberDeclaration.MEMBER_TYPE_NAMESPACE;
  },

  "public function isNative",function isNative()/* : Boolean*/ {
    return this.native_;
  },

  "protected override function doComplete",function doComplete()/* : void*/ {
    this.superClassDeclaration = joo.classLoader.getRequiredClassDeclaration(this.extends_);
    this.superClassDeclaration.complete();
    this.level = this.superClassDeclaration.level + 1;
    var Super/* : Function*/ = this.superClassDeclaration.Public;
    if (!this.native_) {
      this.publicConstructor.prototype = new Super();
      this.publicConstructor["superclass"] = this.publicConstructor.prototype; // Ext Core compatibility!
    }
    this.Public = joo.NativeClassDeclaration.createEmptyConstructor(this.publicConstructor);
  },

  "protected function initMembers",function initMembers()/* : void*/ {
    this.staticInitializers = [];
    var memberDeclarations/* : Array*/ = this.memberDeclarations("$" + this.level, this.privateStatics);
    this.memberDeclarations = [];
    this.memberDeclarationsByQualifiedName = {};
    this.constructor_ = null;
    for (var i/*:int*/ =0; i<memberDeclarations.length; ++i) {
      var item/* : **/ = memberDeclarations[i];
      switch (typeof item) {
        case "undefined":
          continue;
        case "function":
          this.staticInitializers.push(item);
          break;
        case "string":
          var memberDeclaration/* : MemberDeclaration*/ = joo.MemberDeclaration.create(item);
          if (memberDeclaration) {
            if (!memberDeclaration.isNative()) {
              if (++i >= memberDeclarations.length) {
                throw new Error(this + ": Member expected after modifiers '" + item + "'.");
              }
              var member/* : Object*/ = memberDeclarations[i];
            }
            switch (memberDeclaration.memberType) {
              case joo.MemberDeclaration.MEMBER_TYPE_FUNCTION:
                this.initMethod(memberDeclaration, member/*as Function*/);
                break;
              case joo.MemberDeclaration.MEMBER_TYPE_CLASS:
                var secondaryClass/*:SystemClassDeclaration*/ = joo.classLoader.prepare(this.package_ + "." + this.className, item, member/*as Function*/,
                  memberDeclarations[++i], [], joo.version);
                this.privateStatics[memberDeclaration.memberName] = secondaryClass.publicConstructor;
                break;
              default:
                for (var memberName/*:String*/ in member) {
                  this._storeMember(this._createMemberDeclaration(memberDeclaration, {memberName: memberName}), member[memberName]);
                }
            }
          }
      }
    }
    if (!this.isInterface()) {
      if (!this.native_) {
        this.publicConstructor.prototype["$" + this.level + "super"] = this.superClassDeclaration.constructor_;
      }
      if (!this.constructor_) {
        // reuse native public constructor or super class constructor:
        this.constructor_ = this.native_ ? this.publicConstructor : this.superClassDeclaration.constructor_;
      }
    }
  },

  "protected function initMethod",function initMethod(memberDeclaration/* : MemberDeclaration*/, member/* : Function*/)/* : void*/ {
    if (memberDeclaration.memberName == this.className && !memberDeclaration.isStatic()) {
      if (memberDeclaration.getterOrSetter) {
        throw new Error(this+": Class name cannot be used for getter or setter: "+memberDeclaration);
      }
      this.constructor_ = memberDeclaration.isNative() ? this.publicConstructor : member;
    } else {
      memberDeclaration.initSlot(this.level);
      if (memberDeclaration.isNative()) {
        member = memberDeclaration.getNativeMember(this.publicConstructor);
      }
      if (memberDeclaration.isMethod()) {
        if (this.extends_!="Object") {
          var superMethod/* : Function*/ = memberDeclaration.retrieveMember(this.superClassDeclaration.Public.prototype);
        }
        var overrides/* : Boolean*/ = ! !superMethod
          && superMethod!==member
          && superMethod!==Object['prototype'][memberDeclaration.memberName];
        if (overrides !== memberDeclaration.isOverride()) {
          var msg/* : String*/ = overrides
                  ? "Method overrides without 'override' modifier"
                  : "Method with 'override' modifier does not override";
          throw new Error(this+": "+msg+": "+memberDeclaration);
        }
        if (overrides) {
          // found overriding: store super class' method as private member:
          this._storeMember(this._createMemberDeclaration(memberDeclaration, {_namespace: joo.MemberDeclaration.NAMESPACE_PRIVATE}), superMethod);
        }
      }
      this._storeMember(memberDeclaration, member);
    }
  },

  "protected function _createMemberDeclaration",function _createMemberDeclaration(memberDeclaration/* : MemberDeclaration*/, changedProperties/* : Object*/)/* : MemberDeclaration*/ {
    var newMemberDeclaration/* : MemberDeclaration*/ = memberDeclaration.clone(changedProperties);
    newMemberDeclaration.initSlot(this.level);
    return newMemberDeclaration;
  },

  "protected function _storeMember",function _storeMember(memberDeclaration/* : MemberDeclaration*/, value/* : Object*/)/* : void*/ {
    this.memberDeclarations.push(memberDeclaration);
    this.memberDeclarationsByQualifiedName[memberDeclaration.getQualifiedName()] = memberDeclaration;
    memberDeclaration.value = value;
    var _static/* : Boolean*/ = memberDeclaration.isStatic();
    var _private/* : Boolean*/ = memberDeclaration.isPrivate();
    var target/* : Object*/ = _static ? _private ? this.privateStatics : this.publicConstructor : this.publicConstructor.prototype;

    // for compatibility with Prototype (which defines Node as an Object in IE):
    if (!target) {
      target = {};
    }
    
    if (!memberDeclaration.hasOwnMember(target)) {
      memberDeclaration.storeMember(target);
      if (memberDeclaration.hasInitializer()) {
        if (_static) {
          this.staticInitializers.push(memberDeclaration);
        }
      }
    }
  },

  "protected override function doInit",function doInit()/* : void*/ {
    this.superClassDeclaration.init();
    this.initMembers();
    for (var i/*:int*/ =0; i<this.staticInitializers.length; ++i) {
      var staticInitializer/* : **/ = this.staticInitializers[i];
      if (typeof staticInitializer=="function") {
        staticInitializer();
      } else {
        var target/* : Object*/ = staticInitializer.isPrivate() ? this.privateStatics : this.publicConstructor;
        target[staticInitializer.slot] = target[staticInitializer.slot]();
      }
    }
  },

  "public function getMemberDeclaration",function getMemberDeclaration(namespace_/* : String*/, memberName/* : String*/)/* : MemberDeclaration*/ {
    var memberDeclaration/*:MemberDeclaration*/ = this.memberDeclarationsByQualifiedName[namespace_ + "::" + memberName];
    return !memberDeclaration && this.superClassDeclaration && this.superClassDeclaration["getMemberDeclaration"]
      ? (this.superClassDeclaration/*as SystemClassDeclaration*/).getMemberDeclaration(namespace_, memberName)
      : memberDeclaration;

  },
];},[],["joo.NativeClassDeclaration","joo.MemberDeclaration","Error","Object"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(/*
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

"public class SystemClassLoader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(joo.NativeClassDeclaration,Error,joo.SystemClassDeclaration);}, function()

{
  joo.classLoader = new joo.SystemClassLoader();
},

  "public static const",{ classDeclarationsByName/* : Object*//*<String,SystemClassDeclaration>*/ :function(){return( {});}},

  "public var",{ debug/* : Boolean*/ : false},

  "public function SystemClassLoader",function $SystemClassLoader() {this[$super]();    
  },

  "public function prepare",function prepare(packageDef/* : String*/, classDef/* : String*/, memberFactory/* : Function*/,
                          publicStaticMethodNames/* : Array*/, dependencies/* : Array*/, version/*:String*/)/* : SystemClassDeclaration*/ {
    var cd/* : SystemClassDeclaration*/ = this.createClassDeclaration(packageDef, classDef, memberFactory, publicStaticMethodNames, dependencies);
    if (version !== joo.version) {
      throw new Error("Runtime version " + joo.version + " and class version " + version
        + " of " + cd.fullClassName + " do not match. "
        + "Please recompile with the correct compiler version or replace jangaroo-runtime[-debug].js.");
    }
    joo.SystemClassLoader.classDeclarationsByName[cd.fullClassName] = cd;
    return cd;
  },

  "protected function createClassDeclaration",function createClassDeclaration(packageDef/* : String*/, classDef/* : String*/, memberFactory/* : Function*/,
                          publicStaticMethodNames/* : Array*/, dependencies/* : Array*/)/* : SystemClassDeclaration*/ {
    return new joo.SystemClassDeclaration(packageDef, classDef, memberFactory, publicStaticMethodNames).init()/*as SystemClassDeclaration*/;
  },

  "public function getClassDeclaration",function getClassDeclaration(fullClassName/* : String*/)/* : NativeClassDeclaration*/ {
    var cd/* : NativeClassDeclaration*/ = joo.SystemClassLoader.classDeclarationsByName[fullClassName];
    if (!cd) {
      var constructor_/* : Function*/ = joo.getQualifiedObject(fullClassName);
      if (constructor_) {
        if (!constructor_["$class"]) {
          // create SystemClassDeclaration for native classes:
          cd = this.createNativeClassDeclaration(fullClassName, constructor_).init();
          joo.SystemClassLoader.classDeclarationsByName[fullClassName] = cd;
        } else {
          cd = constructor_["$class"];
        }
      }
    }
    return cd;
  },

  /**
   * @param className
   * @return NativeClassDeclaration the class declaration with the given name.
   * @throws Error - ClassNotFound
   */
  "public function getRequiredClassDeclaration",function getRequiredClassDeclaration(className/* : String*/)/* : NativeClassDeclaration*/ {
    var cd/* : NativeClassDeclaration*/ = this.getClassDeclaration(className);
    if (!cd) {
      throw new Error("Class not found: "+className);
    }
    return cd;
  },

  "protected function createNativeClassDeclaration",function createNativeClassDeclaration(fullClassName/* : String*/, nativeClass/* : Function*/)/* : NativeClassDeclaration*/ {
    return new joo.NativeClassDeclaration().create(fullClassName, nativeClass);
  },

  "public function init",function init(/*... classes*/)/* :Function*/ {var classes=arguments;
    return null;
  },
];},[],["Error","joo.SystemClassDeclaration","joo.NativeClassDeclaration"], "0.7.1", "0.7.5"
);joo.classLoader.prepare("package",/* {*/
/**
 * The ArgumentError class represents an error that occurs when the arguments supplied in a function do not match the
 * arguments defined for that function. This error occurs, for example, when a function is called with the wrong number
 * of arguments, an argument of the incorrect type, or an invalid argument.
 */
"public class ArgumentError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   * Creates a new ArgumentError object.
   * @param message A string associated with the error.
   */
  "public function ArgumentError",function $ArgumentError(message/*:String = ""*/) {if(arguments.length<1){message = "";}
    this[$super](message);
  },
];},[],["Error"], "0.7.1", "0.7.5"
);joo.classLoader.prepare("package",/* {*/
/**
 * The DefinitionError class represents an error that occurs when user code attempts to define an identifier that is
 * already defined. This error commonly occurs in redefining classes, interfaces, and functions.
 */
"public class DefinitionError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   * Creates a new DefinitionError object.
   * @param message A string associated with the error.
   */
  "public function DefinitionError",function $DefinitionError(message/*:String = ""*/) {if(arguments.length<1){message = "";}
    this[$super](message);
  },
];},[],["Error"], "0.7.1", "0.7.5"
);joo.classLoader.prepare("package",/* {*/
/**
 * The SecurityError exception is thrown when some type of security violation takes place.
 * <p>Examples of security errors:
 * <ul>
 * <li>An unauthorized property access or method call is made across a security sandbox boundary.
 * <li>An attempt was made to access a URL not permitted by the security sandbox.
 * <li>A socket connection was attempted to an unauthorized port number, e.g. a port above 65535.
 * <li>An attempt was made to access the user's camera or microphone, and the request to access the device was denied
 *   by the user.
 * </ul>
 */
"public class SecurityError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   * Creates a new SecurityError object.
   * @param message A string associated with the error.
   */
  "public function SecurityError",function $SecurityError(message/*:String = ""*/) {if(arguments.length<1){message = "";}
    this[$super](message);
  },
];},[],["Error"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(/**
 * API and documentation by Adobe�.
 * Licensed under http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
"package",/* {*/

/**
 * The Array class lets you access and manipulate arrays.
 * Array indices are zero-based, which means that the first element in the array is [0], the second element is [1],
 * and so on. To create an Array object, you use the new Array() constructor . Array() can also be invoked as
 * a function. In addition, you can use the array access ([]) operator to initialize an array or access the elements
 * of an array.
 * <p>You can store a wide variety of data types in an array element, including numbers, strings, objects, and even
 * other arrays. You can create a multidimensional array by creating an indexed array and assigning to each of its
 * elements a different indexed array. Such an array is considered multidimensional because it can be used to represent
 * data in a table.</p>
 * <p>Arrays are sparse arrays, meaning there might be an element at index 0 and another at index 5, but nothing in the
 * index positions between those two elements. In such a case, the elements in positions 1 through 4 are undefined,
 * which indicates the absence of an element, not necessarily the presence of an element with the value undefined.</p>
 * <p>Array assignment is by reference rather than by value. When you assign one array variable to another array
 * variable, both refer to the same array:</p>
 * <pre>
 * var oneArray:Array = new Array("a", "b", "c");
 * var twoArray:Array = oneArray; // Both array variables refer to the same array.
 * twoArray[0] = "z";
 * trace(oneArray);               // Output: z,b,c.
 * </pre>
 * <p>Do not use the Array class to create associative arrays (also called hashes), which are data structures that
 * contain named elements instead of numbered elements. To create associative arrays, use the Object class.
 * Although ActionScript permits you to create associative arrays using the Array class, you cannot use any of
 * the Array class methods or properties with associative arrays.</p>
 * <p>You can extend the Array class and override or add methods. However, you must specify the subclass as dynamic
 * or you will lose the ability to store data in an array.</p>
 * @see Object
 */
"public dynamic class Array extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   * Specifies case-insensitive sorting for the Array class sorting methods.
   * You can use this constant for the options parameter in the sort() or sortOn() method.
   * The value of this constant is 1.
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ CASEINSENSITIVE/* : uint*/ : 1},

  /**
   * Specifies descending sorting for the Array class sorting methods.
   * You can use this constant for the options parameter in the sort() or sortOn() method.
   * The value of this constant is 2.
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ DESCENDING/* : uint*/ : 2},

  /**
   * Specifies numeric (instead of character-string) sorting for the Array class sorting methods.
   * Including this constant in the options parameter causes the sort() and sortOn() methods to sort numbers as numeric
   * values, not as strings of numeric characters. Without the NUMERIC constant, sorting treats each array element as
   * a character string and produces the results in Unicode order.
   * <p>For example, given the array of values <code>[2005, 7, 35]</code>, if the NUMERIC constant is not included in
   * the options parameter, the sorted array is <code>[2005, 35, 7]</code>, but if the NUMERIC constant is included,
   * the sorted array is <code>[7, 35, 2005]</code>.
   * This constant applies only to numbers in the array; it does not apply to strings that contain numeric data such
   * as <code>["23", "5"]</code>.</p>
   * <p>The value of this constant is 16.</p>
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ NUMERIC/* : uint*/ : 16},

  /**
   * Specifies that a sort returns an array that consists of array indices.
   * <p>You can use this constant for the options parameter in the sort() or sortOn() method, so you have access to
   * multiple views of the array elements while the original array is unmodified.</p>
   * <p>The value of this constant is 8.</p>
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ RETURNINDEXEDARRAY/* : uint*/ : 8},

  /**
   * Specifies the unique sorting requirement for the Array class sorting methods.
   * <p>You can use this constant for the options parameter in the sort() or sortOn() method. The unique sorting
   * option terminates the sort if any two elements or fields being sorted have identical values.</p>
   * <p>The value of this constant is 4.</p>
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ UNIQUESORT/* : uint*/ : 4},

  /**
   * A non-negative integer specifying the number of elements in the array.
   * <p>This property is automatically updated when new elements are added to the array.</p>
   * <p>When you assign a value to an array element (for example, my_array[index] = value), if index is a number,
   * and index+1 is greater than the length property, the length property is updated to index+1.</p>
   * <p><b>Example</b></p>
   * <p>The following code creates an Array object names with the string element Bill. It then uses the push() method to
   * add another string element Kyle. The length of the array, as determined by the length property, was one element
   * before the use of push() and is two elements after push() is called. Another string, Jeff, is added to make the
   * length of names three elements. The shift() method is then called twice to remove Bill and Kyle, making the final
   * array of length one.</p>
   * <pre>
   * var names:Array = new Array("Bill");
   * names.push("Kyle");
   * trace(names.length); // 2
   * names.push("Jeff");
   * trace(names.length); // 3
   *
   * names.shift();
   * names.shift();
   * trace(names.length); // 1
   * </pre>
   */
  "public native function get length"/*() : uint;*/,

  /**
   * Change the length of this array.
   * <p><b>Note:</b> If you assign a value to the length property that is shorter than the existing length, the array
   * will be truncated.</p>
   * @param value A non-negative integer specifying the new number of elements in the array.
   * @see Array#length
   */
  "public native function set length"/*(value : uint):void;*/,

  /**
   * Lets you create an array of the specified number of elements.
   * If you don't specify any parameters, an array containing 0 elements is created.
   * If you specify a number of elements, an array is created with numElements number of elements.
   * <p><b>Note:</b> The constructor accepts variable types of arguments. The constructor behaves differently depending
   * on the type and number of arguments passed, as detailed in the following.
   * ActionScript 3.0 does not support method or constructor overloading.</p>
   * <p>If there are more than one parameter or one parameter that is not a number, you create an array that contains
   * the specified elements. You can specify values of any type. The first element in an array always has an index
   * (or position) of 0.</p>
   * <p><b>Example</b></p>
   * The following example creates the Array object myArr with no arguments and an initial length of 0:
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_Array extends Sprite {
   *   public function Array_Array() {
   *     var myArr:Array = new Array();
   *     trace(myArr.length); // 0
   *   }
   * }
   * }
   * </pre>
   * <p><b>Example</b></p>
   * <p>The following example creates an Array object with 5 initial elements, with a length of 5, and populates the
   * first element with the string "one", and adds the string element "six" to the end of the array by using the push()
   * method:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_Array_2 extends Sprite {
   *   public function Array_Array_2() {
   *     var myArr:Array = new Array(5);
   *     trace(myArr.length); // 5
   *     myArr[0] = "one";
   *     myArr.push("six");
   *     trace(myArr);         // one,,,,,six
   *     trace(myArr.length); // 6
   *   }
   * }
   * }
   * </pre>
   * <p><b>Example</b></p>
   * The following example creates a new Array object with an initial length of 3, populates the array with the
   * string elements one, two, and three, and then converts the elements to a string.
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_Array_3 extends Sprite {
   *
   *   public function Array_Array_3() {
   *     var myArr:Array = new Array("one", "two", "three");
   *     trace(myArr.length); // 3
   *     trace(myArr);          // one,two,three
   *   }
   * }
   * }
   * </pre>
   * @param values A comma-separated list of one or more arbitrary values or an integer that specifies the number of
   *  elements in the array. If only a single numeric parameter is passed to the Array constructor, it is assumed to
   *  specify the array's length property.
   * @throws RangeError The argument is a number that is not an integer greater than or equal to 0.
   * @see Array#length
   */
  "public native function Array"/*(... values);*/,

  /**
   * Concatenates the elements specified in the parameters with the elements in an array and creates a new array.
   * If the parameters specify an array, the elements of that array are concatenated.
   * <p><b>Example</b></p>
   * The following code creates four Array objects:
   * <ul>
   * <li>The numbers array, which contains the numbers 1, 2, and 3.
   * <li>The letters array, which contains the letters a, b, and c.
   * <li>The numbersAndLetters array, which calls the concat() method to produce the array [1,2,3,a,b,c].
   * <li>The lettersAndNumbers array, which calls the concat() method to produce the array [a,b,c,1,2,3].
   * </ul>
   * <pre>
   * var numbers:Array = new Array(1, 2, 3);
   * var letters:Array = new Array("a", "b", "c");
   * var numbersAndLetters:Array = numbers.concat(letters);
   * var lettersAndNumbers:Array = letters.concat(numbers);
   *
   * trace(numbers);       // 1,2,3
   * trace(letters);       // a,b,c
   * trace(numbersAndLetters); // 1,2,3,a,b,c
   * trace(lettersAndNumbers); // a,b,c,1,2,3
   * </pre>
   * @param args A value of any data type (such as numbers, elements, or strings) to be concatenated in a new array.
   *   If you don't pass any values, the new array is a duplicate of the original array.
   * @return An array that contains the elements from this array followed by elements from the parameters.
   */
  "public native function concat"/*(... args) : Array;*/,

  /**
   * Executes a test function on each item in the array until an item is reached that returns false for the specified
   * function. You use this method to determine whether all items in an array meet a criterion, such as having values
   * less than a particular number.
   * <p>For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:</p>
   * <pre>
   * function myFunction(){
   *  //your code here
   * }
   * </pre>
   * Suppose you then use the filter() method on an array called myArray:
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * Because myFunction is a member of the Timeline class, which cannot be overridden by me, the runtime will throw
   * an exception. You can avoid this runtime error by assigning the function to a variable, as follows:
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * <p><b>Example</b></p>
   * The following example tests two arrays to determine whether every item in each array is a number. It also
   * outputs the results of the test, showing that isNumeric is true for the first array and false for the second:
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_every extends Sprite {
   *   public function Array_every() {
   *     var arr1:Array = new Array(1, 2, 4);
   *     var res1:Boolean = arr1.every(isNumeric);
   *     trace("isNumeric:", res1); // true
   *
   *     var arr2:Array = new Array(1, 2, "ham");
   *     var res2:Boolean = arr2.every(isNumeric);
   *     trace("isNumeric:", res2); // false
   *   }
   *   private function isNumeric(element:*, index:int, arr:Array):Boolean {
   *     return (element is Number);
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple comparison
   * (for example, item < 20) or a more complex operation, and is invoked with three arguments; the value of an item,
   * the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):Boolean;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   * @return A Boolean value of true if all items in the array return true for the specified function; otherwise, false.
   * @see Array#some
   */
  "public function every",function every(callback/* : Function*/, thisObject/* : * = null*/)/* : Boolean*/ {if(arguments.length<2){thisObject = null;}
    var i/* : uint*/ = 0,
            j/* : uint*/ = this.length;
    // for maximum performance, repeat for-loop code with different function invocations:
    if (thisObject) {
      for (; i < j; i++) {
        if (i in this) {
          if (!callback.call(thisObject, this[i], i, this)) {
            return false;
          }
        }
      }
    } else {
      for (; i < j; i++) {
        if (i in this) {
          if (!callback(this[i], i, this)) {
            return false;
          }
        }
      }
    }
    return true;
  },

  /**
   * Executes a test function on each item in the array and constructs a new array for all items that return true for
   * the specified function. If an item returns false, it is not included in the new array.
   * <p>For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:</p>
   * <pre>
   * function myFunction(){
   *   //your code here
   * }
   * </pre>
   * <p>Suppose you then use the filter() method on an array called myArray:</p>
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * <p>Because myFunction is a member of the Timeline class, which cannot be overridden by me, the runtime will throw
   * an exception. You can avoid this runtime error by assigning the function to a variable, as follows:</p>
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * <p><b>Example</b></p>
   * <p>The following example creates an array of all employees who are managers:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_filter extends Sprite {
   *   public function Array_filter() {
   *     var employees:Array = new Array();
   *     employees.push({name:"Employee 1", manager:false});
   *     employees.push({name:"Employee 2", manager:true});
   *     employees.push({name:"Employee 3", manager:false});
   *     trace("Employees:");
   *     employees.forEach(traceEmployee);
   *
   *     var managers:Array = employees.filter(isManager);
   *     trace("Managers:");
   *     managers.forEach(traceEmployee);
   *   }
   *   private function isManager(element:*, index:int, arr:Array):Boolean {
   *     return (element.manager == true);
   *   }
   *   private function traceEmployee(element:*, index:int, arr:Array):void {
   *     trace("\t" + element.name + ((element.manager) ? " (manager)" : ""));
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple comparison
   * (for example, item < 20) or a more complex operation, and is invoked with three arguments; the value of an item,
   * the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):void;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   * @return A new array that contains all items from the original array that returned true.
   * @see Array#map
   */
  "public function filter",function filter(callback/* : Function*/, thisObject/* : * = undefined*/)/* : Array*/ {
    var len/* : uint*/ = this.length;
    var res/* : Array*/ = [];
    var i/* : uint*/ = 0;
    var val/* : **/;
    if (thisObject) {
      // for maximum performance, repeat for-loop code with different function invocations:
      for (; i < len; i++) {
        if (i in this) {
          val = this[i];
          if (callback.call(thisObject, val, i, this)) {
            res.push(val);
          }
        }
      }
    } else {
      for (; i < len; i++) {
        if (i in this) {
          val = this[i];
          if (callback(val, i, this)) {
            res.push(val);
          }
        }
      }
    }
    return res;
  },

  /**
   * Executes a function on each item in the array.
   * <p>For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:</p>
   * <pre>
   * function myFunction(){
   *   //your code here
   * }
   * </pre>
   * <p>Suppose you then use the filter() method on an array called myArray:</p>
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * <p>Because myFunction is a member of the Timeline class, which cannot be overridden by me, the runtime will throw an
   * exception. You can avoid this runtime error by assigning the function to a variable, as follows:</p>
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * <p><b>Example</b></p>
   * <p>The following example runs the trace() statement in the traceEmployee() function on each item in the array:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_forEach extends Sprite {
   *   public function Array_forEach() {
   *     var employees:Array = new Array();
   *     employees.push({name:"Employee 1", manager:false});
   *     employees.push({name:"Employee 2", manager:true});
   *     employees.push({name:"Employee 3", manager:false});
   *     trace(employees);
   *     employees.forEach(traceEmployee);
   *   }
   *   private function traceEmployee(element:*, index:int, arr:Array):void {
   *     trace(element.name + " (" + element.manager + ")");
   *   }
   * }
   * }
   * </pre>
   * <p>The following example also runs the trace() statement in a slightly altered traceEmployee() function on each item
   * in the array:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_forEach_2 extends Sprite {
   *   public function Array_forEach_2() {
   *      var employeeXML:XML = &lt;employees>
   *          &lt;employee name="Steven" manager="false" />
   *          &lt;employee name="Bruce" manager="true" />
   *          &lt;employee name="Rob" manager="false" />
   *        &lt;/employees>;
   *      var employeesList:XMLList = employeeXML.employee;
   *      var employeesArray:Array = new Array();
   *      for each (var tempXML:XML in employeesList) {
   *        employeesArray.push(tempXML);
   *     }
   *     employeesArray.sortOn("@name");
   *     employeesArray.forEach(traceEmployee);
   *   }
   *   private function traceEmployee(element:*, index:Number, arr:Array):void {
   *     trace(element.@name + ((element.@manager == "true") ? " (manager)" : ""));
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple command
   * (for example, a trace() statement) or a more complex operation, and is invoked with three arguments; the value of
   * an item, the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):void;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   */
  "public function forEach",function forEach(callback/*:Function*/, thisObject/*:* = undefined*/)/* : void*/ {
    var i/* : uint*/ = 0,
            j/* : uint*/ = this.length;
    // for maximum performance, repeat for-loop code with different function invocations:
    if (thisObject) {
      for (; i < j; i++) {
        if (i in this) {
          callback.call(thisObject, this[i], i, this);
        }
      }
    } else {
      for (; i < j; i++) {
        if (i in this) {
          callback(this[i], i, this);
        }
      }
    }
  },


  /**
   * Searches for an item in an array by using strict equality (===) and returns the index position of the item.
   * <p><b>Example</b></p>
   * <p>The following example displays the position of the specified array:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_indexOf extends Sprite {
   *   public function Array_indexOf() {
   *     var arr:Array = new Array(123,45,6789);
   *     arr.push("123-45-6789");
   *     arr.push("987-65-4321");
   *
   *     var index:int = arr.indexOf("123");
   *     trace(index); // -1
   *
   *     var index2:int = arr.indexOf(123);
   *     trace(index2); // 0
   *   }
   * }
   * }
   * </pre>
   * @param searchElement The item to find in the array.
   * @param fromIndex (default = 0) The location in the array from which to start searching for the item.
   * @return A zero-based index position of the item in the array.
   *  If the searchElement argument is not found, the return value is -1.
   * @see Array#lastIndexOf()
   */
  "public function indexOf",function indexOf(searchElement/* : **/, fromIndex/* : int = 0*/)/* : int*/ {if(arguments.length<2){fromIndex = 0;}
    var len/* : uint*/ = this.length;
    for (var i/*:uint*/ = (fromIndex < 0) ? Math.max(0, len + fromIndex) : fromIndex || 0; i < len; i++) {
      if (searchElement === this[i])
        return i;
    }
    return -1;
  },


  /**
   * Converts the elements in an array to strings, inserts the specified separator between the elements, concatenates
   * them, and returns the resulting string. A nested array is always separated by a comma (,), not by the separator
   * passed to the join() method.
   * <p><b>Example</b></p>
   * <p>The following code creates an Array object myArr with elements one, two, and three and then a string containing one
   * and two and three using the join() method.</p>
   * <pre>
   * var myArr:Array = new Array("one", "two", "three");
   * var myStr:String = myArr.join(" and ");
   * trace(myArr); // one,two,three
   * trace(myStr); // one and two and three
   * </pre>
   * <p>The following code creates an Array object specialChars with elements (, ), -, and a blank space and then creates a
   * string containing (888) 867-5309. Then, using a for loop, it removes each type of special character listed in
   * specialChars to produce a string (myStr) that contains only the digits of the phone number remaining: 888675309.
   * Note that other characters, such as +, could have been added to specialChars and then this routine would work with
   * international phone number formats.</p>
   * <pre>
   * var phoneString:String = "(888) 867-5309";
   *
   * var specialChars:Array = new Array("(", ")", "-", " ");
   * var myStr:String = phoneString;
   *
   * var ln:uint = specialChars.length;
   * for(var i:uint; i < ln; i++) {
   *   myStr = myStr.split(specialChars[i]).join("");
   * }
   *
   * var phoneNumber:Number = new Number(myStr);
   *
   * trace(phoneString); // (888) 867-5309
   * trace(phoneNumber); // 8888675309
   * </pre>
   * @param sep A character or string that separates array elements in the returned string. If you omit this parameter,
   *   a comma is used as the default separator.
   * @return A string consisting of the elements of an array converted to strings and separated by the specified parameter.
   * @see String#split
   */
  "public native function join"/*(sep : *) : String;*/,


  /**
   * Searches for an item in an array, working backward from the last item, and returns the index position of the
   * matching item using strict equality (===).
   * <p><b>Example</b></p>
   * <p>The following example displays the position of the specified array:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_lastIndexOf extends Sprite {
   *   public function Array_lastIndexOf() {
   *     var arr:Array = new Array(123,45,6789,123,984,323,123,32);
   *
   *     var index:int = arr.indexOf(123);
   *     trace(index); // 0
   *
   *     var index2:int = arr.lastIndexOf(123);
   *     trace(index2); // 6
   *   }
   * }
   * }
   * </pre>
   * @param searchElement The item to find in the array.
   * @param fromIndex (default = 0x7fffffff) The location in the array from which to start searching for the item.
   *   The default is the maximum value allowed for an index. If you do not specify fromIndex, the search starts at
   *   the last item in the array.
   * @return A zero-based index position of the item in the array. If the searchElement argument is not found, the
   *   return value is -1.
   * @see Array#indexOf()
   */
  "public function lastIndexOf",function lastIndexOf(searchElement/*:**/, fromIndex/*:int = 0x7fffffff*/)/* : int*/ {if(arguments.length<2){fromIndex = 0x7fffffff;}
    // TODO: test!
    var len/* : uint*/ = this.length;
    for (var i/*:int*/ = ((fromIndex < 0) ? Math.max(len, len - fromIndex) : fromIndex || len) - 1; i >= 0; i--) {
      if (searchElement === this[i])
        return i;
    }
    return -1;
  },

  /**
   * Executes a function on each item in an array, and constructs a new array of items corresponding to the results of
   * the function on each item in the original array.
   * For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:
   * <pre>
   * function myFunction(){
   *   //your code here
   * }
   * </pre>
   * Suppose you then use the filter() method on an array called myArray:
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * Because myFunction is a member of the Timeline class, which cannot be overridden by me, Flash Player will throw
   * an exception. You can avoid this runtime error by assigning the function to a variable, as follows:
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * <p><b>Example</b></p>
   * The following example changes all items in the array to use uppercase letters:
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_map extends Sprite {
   *   public function Array_map() {
   *     var arr:Array = new Array("one", "two", "Three");
   *     trace(arr); // one,two,Three
   *
   *     var upperArr:Array = arr.map(toUpper);
   *     trace(upperArr); // ONE,TWO,THREE
   *   }
   *   private function toUpper(element:*, index:int, arr:Array):String {
   *     return String(element).toUpperCase();
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple command
   * (such as changing the case of an array of strings) or a more complex operation, and is invoked with three
   * arguments; the value of an item, the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):void;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   * @return A new array that contains the results of the function on each item in the original array.
   * @see Array#filter()
   */
  "public function map",function map(callback/* : Function*/, thisObject/* : * = null*/)/* : Array*/ {if(arguments.length<2){thisObject = null;}
    var results/* : Array*/ = [];
    var i/* : uint*/ = 0,
            j/* : uint*/ = this.length;
    // for maximum performance, repeat for-loop code with different function invocations:
    if (thisObject) {
      for (; i < j; i++) {
        results[i] = callback.call(thisObject, this[i], i, this);
      }
    } else {
      for (; i < j; i++) {
        results[i] = callback(this[i], i, this);
      }
    }
    return results;
  },


  /**
   * Removes the last element from an array and returns the value of that element.
   * <p><b>Example</b></p>
   * The following code creates an Array object letters with elements a, b, and c. The last element (c) is then removed
   * from the array using the pop() method and assigned to the String object letter.
   * <pre>
   * var letters:Array = new Array("a", "b", "c");
   * trace(letters); // a,b,c
   * var letter:String = letters.pop();
   * trace(letters); // a,b
   * trace(letter);  // c
   * </pre>
   * @return The value of the last element (of any data type) in the specified array.
   * @see Array#push()
   * @see Array#shift()
   * @see Array#unshift()
   */
  "public native function pop"/*() : Object;*/,


  /**
   * Adds one or more elements to the end of an array and returns the new length of the array.
   * <p><b>Example</b></p>
   * The following code creates an empty Array object letters and then populates the array with
   * the elements a, b, and c using the push() method.
   * <pre>
   * var letters:Array = new Array();
   *
   * letters.push("a");
   * letters.push("b");
   * letters.push("c");
   *
   * trace(letters.toString()); // a,b,c
   * </pre>
   * The following code creates an Array object letters, which is initially populated with the element a.
   * The push() method is then used once to add the elements b and c to the end of the array, which is three elements
   * after the push.
   * <pre>
   * var letters:Array = new Array("a");
   * var count:uint = letters.push("b", "c");
   *
   * trace(letters); // a,b,c
   * trace(count);   // 3
   * </pre>
   * @param args One or more values to append to the array.
   * @return An integer representing the length of the new array.
   * @see Array#pop()
   * @see Array#shift()
   * @see Array#unshift()
   */
  "public native function push"/*(... args) : uint;*/,


  /**
   * Reverses the array in place.
   * <p><b>Example</b></p>
   * The following code creates an Array object letters with elements a, b, and c. The order of the array elements is
   * then reversed using the reverse() method to produce the array [c,b,a].
   * <pre>
   * var letters:Array = new Array("a", "b", "c");
   * trace(letters); // a,b,c
   * letters.reverse();
   * trace(letters); // c,b,a
   * </pre>
   * @return The new array.
   */
  "public native function reverse"/*() : Array;*/,


  /**
   * Removes the first element from an array and returns that element.
   * The remaining array elements are moved from their original position, i, to i-1.
   * <p><b>Example</b></p>
   * <p>The following code creates the Array object letters with elements a, b, and c. The shift() method is then used to
   * remove the first element (a) from letters and assign it to the string firstLetter.</p>
   * <pre>
   * var letters:Array = new Array("a", "b", "c");
   * var firstLetter:String = letters.shift();
   * trace(letters);     // b,c
   * trace(firstLetter); // a
   * </pre>
   * @return The first element (of any data type) in an array.
   * @see Array#pop()
   * @see Array#push()
   * @see Array#unshift()
   */
  "public native function shift"/*() : Object;*/,

  /**
   * Returns a new array that consists of a range of elements from the original array, without modifying the original
   * array. The returned array includes the startIndex element and all elements up to, but not including, the endIndex
   * element.
   * <p><b>Example</b></p>
   * <p>The following code creates an Array object letters with elements [a,b,c,d,e,f]. The array someLetters is then
   * created by calling the slice() method on elements one (b) through three (d), resulting in an array with
   * elements b and c.</p>
   * <pre>
   * var letters:Array = new Array("a", "b", "c", "d", "e", "f");
   * var someLetters:Array = letters.slice(1,3);
   *
   * trace(letters);     // a,b,c,d,e,f
   * trace(someLetters); // b,c
   * </pre>
   * The following code creates an Array object letters with elements <code>[a,b,c,d,e,f]</code>.
   * The array someLetters is then created by calling the slice() method on element two (c), resulting in an array with
   * elements <code>[c,d,e,f]</code>.
   *
   * var letters:Array = new Array("a", "b", "c", "d", "e", "f");
   * var someLetters:Array = letters.slice(2);
   *
   * trace(letters);     // a,b,c,d,e,f
   * trace(someLetters); // c,d,e,f
   * </pre>
   * * The following code creates an Array object letters with elements [a,b,c,d,e,f]. The array someLetters is then
   * * created by calling the slice() method on the second to last element from the end (e), resulting in an array with
   * * elements e and f.
   * <pre>
   * var letters:Array = new Array("a", "b", "c", "d", "e", "f");
   * var someLetters:Array = letters.slice(-2);
   *
   * trace(letters);     // a,b,c,d,e,f
   * trace(someLetters); // e,f
   * </pre>
   * If you don't pass any parameters, a duplicate of the original array is created.
   * @param startIndex (default = 0) A number specifying the index of the starting point for the slice. If start is a
   * negative number, the starting point begins at the end of the array, where -1 is the last element.
   * @param endIndex (default = -1) A number specifying the index of the ending point for the slice. If you omit this
   * parameter, the slice includes all elements from the starting point to the end of the array. If end is a negative
   * number, the ending point is specified from the end of the array, where -1 is the last element.
   * @return An array that consists of a range of elements from the original array.
   */
  "public native function slice"/*(startIndex : int = 0, endIndex : int = -1) : Array;*/,

  /**
   * Executes a test function on each item in the array until an item is reached that returns true. Use this method to
   * determine whether any items in an array meet a criterion, such as having a value less than a particular number.
   *
   * For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:
   * <pre>
   * function myFunction(){
   *   //your code here
   * }
   * </pre>
   * * Suppose you then use the filter() method on an array called myArray:
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * Because myFunction is a member of the Timeline class, which cannot be overridden by me, the runtime will throw an
   * exception. You can avoid this runtime error by assigning the function to a variable, as follows:
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * * <p><b>Example</b></p>
   * * The following example displays which values are undefined:
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_some extends Sprite {
   *   public function Array_some() {
   *     var arr:Array = new Array();
   *     arr[0] = "one";
   *     arr[1] = "two";
   *     arr[3] = "four";
   *     var isUndef:Boolean = arr.some(isUndefined);
   *     if (isUndef) {
   *       trace("array contains undefined values: " + arr);
   *     } else {
   *       trace("array contains no undefined values.");
   *     }
   *   }
   *   private function isUndefined(element:*, index:int, arr:Array):Boolean {
   *     return (element == undefined);
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple comparison
   * (for example item < 20) or a more complex operation, and is invoked with three arguments; the value of an item,
   * the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):Boolean;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   * @return A Boolean value of true if any items in the array return true for the specified function; otherwise false.
   * @see Array#every()
   */
  "public function some",function some(callback/* : Function*/, thisObject/* : * = null*/)/* : Boolean*/ {if(arguments.length<2){thisObject = null;}
    var i/* : uint*/ = 0,
            j/* : uint*/ = this.length;
    // for maximum performance, repeat for-loop code with different function invocations:
    if (thisObject) {
      for (; i < j; i++) {
        if (i in this) {
          if (callback.call(thisObject, this[i], i, this)) {
            return true;
          }
        }
      }
    } else {
      for (; i < j; i++) {
        if (i in this) {
          if (callback(this[i], i, this)) {
            return true;
          }
        }
      }
    }
    return false;
  },

  /**
   * Sorts the elements in an array. This method sorts according to Unicode values. (ASCII is a subset of Unicode.)
   * By default, Array.sort() works in the following way:
   * <ul>
   * <li>Sorting is case-sensitive (Z precedes a).
   * <li>Sorting is ascending (a precedes b).
   * <li>The array is modified to reflect the sort order; multiple elements that have identical sort fields are placed
   *   consecutively in the sorted array in no particular order.
   * <li>All elements, regardless of data type, are sorted as if they were strings, so 100 precedes 99, because "1" is
   *   a lower string value than "9".
   * </ul>
   * To sort an array by using settings that deviate from the default settings, you can either use one of the sorting
   * options described in the sortOptions portion of the ...args parameter description, or you can create your own
   * custom function to do the sorting. If you create a custom function, you call the sort() method, and use the name
   * of your custom function as the first argument (compareFunction).
   *
   * <p><b>Example</b></p>
   * The following code creates the Array object vegetables with elements
   * <code>[spinach, green pepper, cilantro, onion, avocado]</code>.
   * The array is then sorted by the sort() method, which is called with no parameters. The result is vegetables sorted
   * in alphabetical order (<code>[avocado, cilantro, green pepper, onion, spinach]</code>).
   * <pre>
   * var vegetables:Array = new Array("spinach",
   *   "green pepper",
   *   "cilantro",
   *   "onion",
   *   "avocado");
   *
   * trace(vegetables); // spinach,green pepper,cilantro,onion,avocado
   * vegetables.sort();
   * trace(vegetables); // avocado,cilantro,green pepper,onion,spinach
   * </pre>
   * The following code creates the Array object vegetables with elements
   * <code>[spinach, green pepper, Cilantro, Onion, and Avocado]</code>.
   * The array is then sorted by the sort() method, which is called with no parameters the first time; the result is
   * <code>[Avocado,Cilantro,Onion,green pepper,spinach]</code>.
   * Then sort() is called on vegetables again with the CASEINSENSITIVE constant as a parameter. The result is
   * vegetables sorted in alphabetical order (<code>[Avocado, Cilantro, green pepper, Onion, spinach]</code>).
   * <pre>
   * var vegetables:Array = new Array("spinach",
   *   "green pepper",
   *   "Cilantro",
   *   "Onion",
   *   "Avocado");
   *
   * vegetables.sort();
   * trace(vegetables); // Avocado,Cilantro,Onion,green pepper,spinach
   * vegetables.sort(Array.CASEINSENSITIVE);
   * trace(vegetables); // Avocado,Cilantro,green pepper,Onion,spinach
   * </pre>
   * The following code creates the empty Array object vegetables, which is then populated through five calls to push().
   * Each time push() is called, a new Vegetable object is created by a call to the Vegetable() constructor, which
   * accepts a String (name) and Number (price) object. Calling push() five times with the values shown results in the
   * following array:
   * <code>[lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44]</code>.
   * The sort() method is then used to sort the array, resulting in the array
   * <code>[asparagus:3.99, celery:1.29, lettuce:1.49, spinach:1.89, squash:1.44]</code>.
   * <pre>
   * var vegetables:Array = new Array();
   * vegetables.push(new Vegetable("lettuce", 1.49));
   * vegetables.push(new Vegetable("spinach", 1.89));
   * vegetables.push(new Vegetable("asparagus", 3.99));
   * vegetables.push(new Vegetable("celery", 1.29));
   * vegetables.push(new Vegetable("squash", 1.44));
   *
   * trace(vegetables);
   * // lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44
   *
   * vegetables.sort();
   *
   * trace(vegetables);
   * // asparagus:3.99, celery:1.29, lettuce:1.49, spinach:1.89, squash:1.44
   *
   * //The following code defines the Vegetable class
   * class Vegetable {
   *   private var name:String;
   *   private var price:Number;
   *
   *   public function Vegetable(name:String, price:Number) {
   *     this.name = name;
   *     this.price = price;
   *   }
   *
   *   public function toString():String {
   *     return " " + name + ":" + price;
   *   }
   * }
   * </pre>
   * The following example is exactly the same as the previous one, except that the sort() method is used with a custom
   * sort function (sortOnPrice), which sorts according to price instead of alphabetically. Note that the new function
   * getPrice() extracts the price.
   * <pre>
   * var vegetables:Array = new Array();
   * vegetables.push(new Vegetable("lettuce", 1.49));
   * vegetables.push(new Vegetable("spinach", 1.89));
   * vegetables.push(new Vegetable("asparagus", 3.99));
   * vegetables.push(new Vegetable("celery", 1.29));
   * vegetables.push(new Vegetable("squash", 1.44));
   *
   * trace(vegetables);
   * // lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44
   *
   * vegetables.sort(sortOnPrice);
   *
   * trace(vegetables);
   * // celery:1.29, squash:1.44, lettuce:1.49, spinach:1.89, asparagus:3.99
   *
   * function sortOnPrice(a:Vegetable, b:Vegetable):Number {
   *   var aPrice:Number = a.getPrice();
   *   var bPrice:Number = b.getPrice();
   *
   *   if(aPrice > bPrice) {
   *     return 1;
   *   } else if(aPrice < bPrice) {
   *     return -1;
   *   } else  {
   *     //aPrice == bPrice
   *     return 0;
   *   }
   * }
   *
   * // The following code defines the Vegetable class and should be in a separate package.
   * class Vegetable {
   *   private var name:String;
   *   private var price:Number;
   *
   *   public function Vegetable(name:String, price:Number) {
   *     this.name = name;
   *     this.price = price;
   *   }
   *
   *   public function getPrice():Number {
   *     return price;
   *   }
   *
   *   public function toString():String {
   *     return " " + name + ":" + price;
   *   }
   * }
   * </pre>
   * The following code creates the Array object numbers with elements <code>[3,5,100,34,10]</code>.
   * A call to sort() without any parameters sorts alphabetically, producing the undesired result
   * <code>[10,100,3,34,5]</code>.
   * To properly sort numeric values, you must pass the constant NUMERIC to the sort() method, which sorts numbers
   * as follows: <code>[3,5,10,34,100]</code>.
   * <p><b>Note:</b> The default behavior of the sort() function is to handle each entity as a string.
   * The Array.NUMERIC argument does not actually convert other data types to the Number data type; it simply allows
   * the sort algorithm to recognize numbers.</p>
   * <pre>
   * var numbers:Array = new Array(3,5,100,34,10);
   *
   * trace(numbers); // 3,5,100,34,10
   * numbers.sort();
   * trace(numbers); // 10,100,3,34,5
   * numbers.sort(Array.NUMERIC);
   * trace(numbers); // 3,5,10,34,100
   * </pre>
   * @param args The arguments specifying a comparison function and one or more values that determine the behavior of
   *   the sort. This method uses the syntax and argument order <code>Array.sort(compareFunction, sortOptions)</code>
   *   with the arguments defined as follows:
   * <ul>
   * <li>compareFunction - A comparison function used to determine the sorting order of elements in an array.
   *   This argument is optional. A comparison function should take two arguments to compare.
   *   Given the elements A and B, the result of compareFunction can have one of the following three values:
   *   <ul>
   *   <li>-1, if A should appear before B in the sorted sequence
   *   <li>0, if A equals B
   *   <li>1, if A should appear after B in the sorted sequence
   *   </ul>
   * <li>sortOptions - One or more numbers or defined constants, separated by the | (bitwise OR) operator, that change
   *   the behavior of the sort from the default. This argument is optional. The following values are acceptable for
   *   sortOptions:
   *   <ul>
   *   <li>1 or Array.CASEINSENSITIVE
   *   <li>2 or Array.DESCENDING
   *   <li>4 or Array.UNIQUESORT
   *   <li>8 or Array.RETURNINDEXEDARRAY
   *   <li>16 or Array.NUMERIC
   *   </ul>
   * </ul>
   * For more information, see the Array.sortOn() method.
   * <p><b>Note:</b> The Array.sort() method is defined in the ECMAScript (ECMA-262) edition 3 language specification,
   * but the array sorting options introduced in Flash Player 7 are Flash-specific extensions to ECMA-262.
   * @return The return value depends on whether you pass any arguments, as described in the following list:
   * <ul>
   * <li>If you specify a value of 4 or Array.UNIQUESORT for the sortOptions argument of the ...args parameter and two
   * or more elements being sorted have identical sort fields, Flash returns a value of 0 and does not modify the array.
   * <li>If you specify a value of 8 or Array.RETURNINDEXEDARRAY for the sortOptions argument of the ...args parameter,
   * Flash returns a sorted numeric array of the indices that reflects the results of the sort and does not modify the
   * array.
   * <li>Otherwise, Flash returns nothing and modifies the array to reflect the sort order.
   * </ul>
   * @see Array#sortOn()
   */
  "public native function sort"/*(... args) : Array;*/,

  /**
   * Sorts the elements in an array according to one or more fields in the array.
   * The array should have the following characteristics:
   * <ul>
   * <li>The array is an indexed array, not an associative array.
   * <li>Each element of the array holds an object with one or more properties.
   * <li>All of the objects have at least one property in common, the values of which can be used to sort the array.
   * Such a property is called a field.
   * </ul>
   * <p>If you pass multiple fieldName parameters, the first field represents the primary sort field, the second
   * represents the next sort field, and so on. Flash sorts according to Unicode values. (ASCII is a subset of Unicode.)
   * If either of the elements being compared does not contain the field that is specified in the fieldName parameter,
   * the field is assumed to be set to undefined, and the elements are placed consecutively in the sorted array in no
   * particular order.</p>
   * By default, Array.sortOn() works in the following way:
   * <ul>
   * <li>Sorting is case-sensitive (Z precedes a).
   * <li>Sorting is ascending (a precedes b).
   * <li>The array is modified to reflect the sort order; multiple elements that have identical sort fields are placed
   *   consecutively in the sorted array in no particular order.
   * <li>Numeric fields are sorted as if they were strings, so 100 precedes 99, because "1" is a lower string value
   *   than "9".
   * </ul>
   * <p>Use the options parameter to override the default sort behavior. To sort a simple array (for example, an array
   * with only one field), or to specify a sort order that the options parameter doesn't support, use Array.sort().</p>
   * To pass multiple flags, separate them with the bitwise OR (|) operator:
   * <pre>
   * my_array.sortOn(someFieldName, Array.DESCENDING | Array.NUMERIC);
   * </pre>
   * Specify a different sorting option for each field when you sort by more than one field. The options parameter
   * accepts an array of sort options such that each sort option corresponds to a sort field in the fieldName parameter.
   * The following example sorts the primary sort field, a, using a descending sort; the secondary sort field, b, using
   * a numeric sort; and the tertiary sort field, c, using a case-insensitive sort:
   * <pre>
   * Array.sortOn (["a", "b", "c"], [Array.DESCENDING, Array.NUMERIC, Array.CASEINSENSITIVE]);
   * </pre>
   * <b>Note:</b> The fieldName and options arrays must have the same number of elements; otherwise, the options array
   * is ignored. Also, the Array.UNIQUESORT and Array.RETURNINDEXEDARRAY options can be used only as the first element
   * in the array; otherwise, they are ignored.
   * <p><b>Example</b></p>
   * The following code creates an empty Array object vegetables and the array is then populated using five calls to
   * push(). Each time push() is called, a new Vegetable object is created by calling the Vegetable() constructor,
   * which accepts a String (name) and Number (price) object. Calling push() five times with the values shown results
   * in the following array:
   * <code>[lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44]</code>.
   * The sortOn() method is then used with the name parameter to produce the following array:
   * <code>[asparagus:3.99, celery:1.29, lettuce:1.49, spinach:1.89, squash:1.44]</code>.
   * The sortOn() method is then called again with the price parameter, and the NUMERIC and DESCENDING constants to
   * produce an array sorted by numbers in descending order:
   * <code>[asparagus:3.99, spinach:1.89, lettuce:1.49, squash:1.44, celery:1.29]</code>.
   * <pre>
   * var vegetables:Array = new Array();
   * vegetables.push(new Vegetable("lettuce", 1.49));
   * vegetables.push(new Vegetable("spinach", 1.89));
   * vegetables.push(new Vegetable("asparagus", 3.99));
   * vegetables.push(new Vegetable("celery", 1.29));
   * vegetables.push(new Vegetable("squash", 1.44));
   *
   * trace(vegetables);
   * // lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44
   *
   * vegetables.sortOn("name");
   * trace(vegetables);
   * // asparagus:3.99, celery:1.29, lettuce:1.49, spinach:1.89, squash:1.44
   *
   * vegetables.sortOn("price", Array.NUMERIC | Array.DESCENDING);
   * trace(vegetables);
   * // asparagus:3.99, spinach:1.89, lettuce:1.49, squash:1.44, celery:1.29
   *
   * class Vegetable {
   * public var name:String;
   * public var price:Number;
   *
   * public function Vegetable(name:String, price:Number) {
   * this.name = name;
   * this.price = price;
   * }
   *
   * public function toString():String {
   * return " " + name + ":" + price;
   * }
   * }
   * </pre>
   *  The following code creates an empty Array object records and the array is then populated using three calls to
   * push(). Each time push() is called, the strings name and city and a zip number are added to records. Three for
   * loops are used to print the array elements. The first for loop prints the elements in the order in which they were
   * added. The second for loop is run after records has been sorted by name and then city using the sortOn() method.
   * The third for loop produces different output because records is re-sorted by city then by name.
   * <pre>
   * var records:Array = new Array();
   * records.push({name:"john", city:"omaha", zip:68144});
   * records.push({name:"john", city:"kansas city", zip:72345});
   * records.push({name:"bob", city:"omaha", zip:94010});
   *
   * for(var i:uint = 0; i < records.length; i++) {
   *   trace(records[i].name + ", " + records[i].city);
   * }
   * // Results:
   * // john, omaha
   * // john, kansas city
   * // bob, omaha
   *
   * trace("records.sortOn('name', 'city');");
   * records.sortOn(["name", "city"]);
   * for(var i:uint = 0; i < records.length; i++) {
   * trace(records[i].name + ", " + records[i].city);
   * }
   * // Results:
   * // bob, omaha
   * // john, kansas city
   * // john, omaha
   *
   * trace("records.sortOn('city', 'name');");
   * records.sortOn(["city", "name"]);
   * for(var i:uint = 0; i < records.length; i++) {
   *   trace(records[i].name + ", " + records[i].city);
   * }
   * // Results:
   * // john, kansas city
   * // bob, omaha
   * // john, omaha
   * </pre>
   * <p>The following code creates an empty Array object users and the array is then populated using four calls to push().
   * Each time push() is called, a User object is created with the User() constructor and a name string and age uint
   * are added to users. The resulting array set is <code>[Bob:3,barb:35,abcd:3,catchy:4]</code>.</p>
   * The array is then sorted in the following ways:
   * <ol>
   * <li>By name only, producing the array
   *   <code>[Bob:3,abcd:3,barb:35,catchy:4]</code>
   * <li>By name and using the CASEINSENSITIVE constant, producing the array
   *   <code>[abcd:3,barb:35,Bob:3,catchy:4]</code>
   * <li>By name and using the CASEINSENSITIVE and DESCENDING constants, producing the array
   *   <code>[catchy:4,Bob:3,barb:35,abcd:3]</code>
   * <li>By age only, producing the array
   *   <code>[abcd:3,Bob:3,barb:35,catchy:4]</code>
   * <li>By age and using the NUMERIC constant, producing the array
   *   <code>[Bob:3,abcd:3,catchy:4,barb:35]</code>
   * <li>By age and using the DESCENDING and NUMERIC constants, producing the array
   *   <code>[barb:35,catchy:4,Bob:3,abcd:3]</code>
   * </ol>
   * An array called indices is then created and assigned the results of a sort by age and using the NUMERIC and
   * RETURNINDEXEDARRAY constants, resulting in the array [Bob:3,abcd:3,catchy:4,barb:35], which is then printed out
   * using a for loop.
   * <pre>
   * class User {
   *   public var name:String;
   *   public var age:Number;
   *   public function User(name:String, age:uint) {
   *     this.name = name;
   *     this.age = age;
   *   }
   *
   *   public function toString():String {
   *     return this.name + ":" + this.age;
   *   }
   * }
   *
   * var users:Array = new Array();
   * users.push(new User("Bob", 3));
   * users.push(new User("barb", 35));
   * users.push(new User("abcd", 3));
   * users.push(new User("catchy", 4));
   *
   * trace(users); // Bob:3,barb:35,abcd:3,catchy:4
   *
   * users.sortOn("name");
   * trace(users); // Bob:3,abcd:3,barb:35,catchy:4
   *
   * users.sortOn("name", Array.CASEINSENSITIVE);
   * trace(users); // abcd:3,barb:35,Bob:3,catchy:4
   *
   * users.sortOn("name", Array.CASEINSENSITIVE | Array.DESCENDING);
   * trace(users); // catchy:4,Bob:3,barb:35,abcd:3
   *
   * users.sortOn("age");
   * trace(users); // abcd:3,Bob:3,barb:35,catchy:4
   *
   * users.sortOn("age", Array.NUMERIC);
   * trace(users); // Bob:3,abcd:3,catchy:4,barb:35
   *
   * users.sortOn("age", Array.DESCENDING | Array.NUMERIC);
   * trace(users); // barb:35,catchy:4,Bob:3,abcd:3
   *
   * var indices:Array = users.sortOn("age", Array.NUMERIC | Array.RETURNINDEXEDARRAY);
   * var index:uint;
   * for(var i:uint = 0; i < indices.length; i++) {
   *   index = indices[i];
   *   trace(users[index].name, ": " + users[index].age);
   * }
   *
   * // Results:
   * // Bob : 3
   * // abcd : 3
   * // catchy : 4
   * // barb : 35
   * </pre>
   * @param fieldName A string that identifies a field to be used as the sort value, or an array in which the first
   * element represents the primary sort field, the second represents the secondary sort field, and so on.
   * @param options (default = null) One or more numbers or names of defined constants, separated by the bitwise OR (|)
   * operator, that change the sorting behavior. The following values are acceptable for the options parameter:
   * <ul>
   * <li>Array.CASEINSENSITIVE or 1
   * <li>Array.DESCENDING or 2
   * <li>Array.UNIQUESORT or 4
   * <li>Array.RETURNINDEXEDARRAY or 8
   * <li>Array.NUMERIC or 16
   * </ul>
   * Code hinting is enabled if you use the string form of the flag (for example, DESCENDING) rather than the numeric
   * form (2).
   * @return The return value depends on whether you pass any parameters:
   * <ul>
   *   <li>If you specify a value of 4 or Array.UNIQUESORT for the options parameter, and two or more elements being
   * sorted have identical sort fields, a value of 0 is returned and the array is not modified.
   *   <li>If you specify a value of 8 or Array.RETURNINDEXEDARRAY for the options parameter, an array is returned
   * that reflects the results of the sort and the array is not modified.
   *   <li>Otherwise, nothing is returned and the array is modified to reflect the sort order.
   * </ul>
   * @see Array#sort()
   public function sortOn(fieldName : Object, options : Object = null) : Array {
   // TODO: implement!
   // Mind that this method is not even supported in Firefox, so it changes Array.prototype and may break
   // for [each] in loops!
   return null;
   }
   */

  /**
   * Adds elements to and removes elements from an array. This method modifies the array without making a copy.
   * <p><b>Note:</b> To override this method in a subclass of Array, use ...args for the parameters, as this example
   * shows:</p>
   * <pre>
   * public override function splice(...args) {
   *   // your statements here
   * }
   * </pre>
   * <p><b>Example</b></p>
   * The following code creates the Array object vegetables with the elements
   * <code>[spinach, green pepper, cilantro, onion, avocado]</code>.
   * The splice() method is then called with the parameters 2 and 2, which assigns cilantro and onion to the spliced
   * array. The vegetables array then contains [spinach,green pepper,avocado]. The splice() method is called a second
   * time using the parameters 1, 0, and the spliced array to assign
   * <code>[spinach,cilantro,onion,green pepper,avocado]</code> to vegetables.
   * <pre>
   * var vegetables:Array = new Array("spinach",
   * "green pepper",
   * "cilantro",
   * "onion",
   * "avocado");
   *
   * var spliced:Array = vegetables.splice(2, 2);
   * trace(vegetables); // spinach,green pepper,avocado
   * trace(spliced);    // cilantro,onion
   *
   * vegetables.splice(1, 0, spliced);
   * trace(vegetables); // spinach,cilantro,onion,green pepper,avocado
   * </pre>
   * @param startIndex An integer that specifies the index of the element in the array where the insertion or deletion
   * begins. You can use a negative integer to specify a position relative to the end of the array (for example, -1 is
   * the last element of the array).
   * @param deleteCount An integer that specifies the number of elements to be deleted. This number includes the
   * element specified in the startIndex parameter. If you do not specify a value for the deleteCount parameter, the
   * method deletes all of the values from the startIndex element to the last element in the array. If the value
   * is 0, no elements are deleted.
   * @param values An optional list of one or more comma-separated values, or an array, to insert into the array at
   * the position specified in the startIndex parameter.
   * @return An array containing the elements that were removed from the original array.
   */
  "public native function splice"/*(startIndex : int, deleteCount : uint, ... values) : Array;*/,

  /**
   * Returns a string that represents the elements in the specified array. Every element in the array, starting with
   * index 0 and ending with the highest index, is converted to a concatenated string and separated by commas. In the
   * ActionScript 3.0 implementation, this method returns the same value as the Array.toString() method.
   * @return A string of array elements.
   * @see Array#toString()
   */
  "public native function toLocaleString"/*() : String;*/,

  /**
   * Returns a string that represents the elements in the specified array. Every element in the array, starting with
   * index 0 and ending with the highest index, is converted to a concatenated string and separated by commas.
   * To specify a custom separator, use the Array.join() method.
   * <p><b>Example</b></p>
   * The following code creates an Array, converts the values to strings, and stores them in the vegnums variable of
   * the String data type.
   * <pre>
   * var vegetables:Array = new Array();
   * vegetables.push(1);
   * vegetables.push(2);
   * vegetables.push(3);
   * vegetables.push(4);
   * vegetables.push(5);
   * var vegnums:String = vegetables.toString();
   * trace(vegnums+",6");
   * // 1,2,3,4,5,6
   * </pre>
   * @return A string of array elements.
   * @see String#split()
   * @see Array#join()
   */
  "public native function toString"/*() : String;*/,

  /**
   * Adds one or more elements to the beginning of an array and returns the new length of the array. The other elements
   * in the array are moved from their original position, i, to i+1.
   * <p><b>Example</b></p>
   * The following code creates the empty Array object names. The strings Bill and Jeff are added by the push() method,
   * and then the strings Alfred and Kyle are added to the beginning of names by two calls to the unshift() method.
   * <pre>
   * var names:Array = new Array();
   * names.push("Bill");
   * names.push("Jeff");
   *
   * trace(names); // Bill,Jeff
   *
   * names.unshift("Alfred");
   * names.unshift("Kyle");
   *
   * trace(names); // Kyle,Alfred,Bill,Jeff
   * </pre>
   * @param args One or more numbers, elements, or variables to be inserted at the beginning of the array.
   * @return An integer representing the new length of the array.
   * @see Array#pop()
   * @see Array#push()
   * @see Array#shift()
   */
  "public native function unshift"/*(... args) : uint;*/,

];},[],["Object","Math"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(/**
 * API and documentation by Adobe®.
 * Licensed under http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
"package",/* {*/

/**
 * The Date class represents date and time information. An instance of the Date class represents a particular point
 * in time for which the properties such as month, day, hours, and seconds can be queried or modified. The Date
 * class lets you retrieve date and time values relative to universal time (Greenwich mean time, now called universal
 * time or UTC) or relative to local time, which is determined by the local time zone setting on the operating system
 * that is running Flash Player. The methods of the Date class are not static but apply only to the individual Date
 * object specified when the method is called. The <code>Date.UTC()</code> and <code>Date.parse()</code> methods are
 * exceptions; they are static methods.
 * <p>To use the Date class, construct a Date instance using the <code>new</code> operator.</p>
 * <p>ActionScript 3.0 adds several new accessor properties that can be used in place of many Date class methods
 * that access or modify Date instances. ActionScript 3.0 also includes several new variations of the
 * <code>toString()</code> method that are included for ECMA-262 3rd Edition compliance, including:
 * <code>Date.toLocaleString()</code>, <code>Date.toTimeString()</code>, <code>Date.toLocaleTimeString()</code>,
 * <code>Date.toDateString()</code>, and <code>Date.toLocaleDateString()</code>.</p>
 *
 * <p>To compute relative time or time elapsed, see the <code>getTimer()</code> method in the flash.utils package.</p>
 *
 * @example
 * The following example shows various uses of the <code>Date()</code> constructor to assign the
 * following variables:
 * <ul>
 *  <li><code>myDate1</code> calls <code>Date()</code> with no parameters, which sets <code>myDate1</code> to the
 *    current date and time (according to your current system's date and time).</li>
 *  <li><code>myDate2</code> calls <code>Date()</code> with the <code>year</code> (<code>2000</code>), month
 *    (<code>0</code> = January), and <code>day</code> (<code>1</code>) parameters passed to it.</li>
 *  <li><code>myDate3</code> calls <code>Date()</code> with the <code>year</code> (<code>65</code> = 1965),
 *    <code>month</code> (<code>2</code> = March), the <code>day</code> (<code>6</code>), the <code>hour</code>
 *    (<code>9</code>), the <code>minute</code> (<code>30</code>), the <code>second</code> (<code>15</code>)
 *    and the <code>millisecond</code>-+ (<code>0</code>) passed as parameters.</li><li><code>myDate4</code> calls
 *    <code>Date()</code> with the time value representing the number of milliseconds <b>before</b> (since the value
 *    is negative) 0:00:00 GMT January 1, 1970.</li>
 * </ul>
 * <pre>
 * package {
 *     import flash.display.Sprite;
 *
 *     public class DateExample extends Sprite{
 *         public function DateExample() {
 *             var myDate1:Date = new Date();
 *             trace(myDate1); // [NOW]
 *
 *             var myDate2:Date = new Date(2000, 0, 1);
 *             trace(myDate2); // Sat Jan 1 00:00:00 GMT-0800 2000
 *
 *             var myDate3:Date = new Date(65, 2, 6, 9, 30, 15, 0);
 *             trace(myDate3); // Sat Mar 6 09:30:15 GMT-0800 1965
 *
 *             var myDate4:Date = new Date(-14159025000);
 *             trace(myDate4); // Sun Jul 20 19:56:15 GMT-0700 1969
 *         }
 *     }
 * }
 * </pre>
 *
 * @see flash.utils.getTimer
 * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_1.html Working with dates and times
 *
 */
"public dynamic class Date extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   *   Constructs a new Date object that holds the specified date and time.
   *
   * <p>The <code>Date()</code> constructor takes up to seven parameters (year, month, ..., millisecond) to specify a date
   *  and time to the millisecond. The date that the newly constructed Date object contains depends on the number, and
   *  data type, of arguments passed. </p>
   * <ul>
   *  <li>If you pass no arguments, the Date object is assigned the current date and time.</li>
   *  <li>If you pass one argument of data type Number, the Date object is assigned a time value based on the number of
   *  milliseconds since January 1, 1970 0:00:000 GMT, as specified by the lone argument.</li>
   *  <li>If you pass one argument of data type String, and the string contains a valid date, the Date object  contains a
   *  time value based on that date.</li>
   *  <li>If you pass two or more arguments, the Date object is assigned a time value based on the argument values passed,
   *  which represent the date's year, month, date, hour, minute, second, and milliseconds.</li>
   * </ul>
   * <p>If you pass a string to the Date class constructor, the date can be in a variety of formats, but must at least
   *  include the month, date, and year. For example, <code>Feb 1 2005</code> is valid, but <code>Feb 2005</code> is not.
   *  The following list indicates some of the valid formats:</p>
   * <ul>
   *  <li>Day Month Date Hours:Minutes:Seconds GMT Year (for instance, "Tue Feb 1 00:00:00 GMT-0800 2005", which matches
   *  <code>toString()</code>)</li>
   *  <li>Day Month Date Year Hours:Minutes:Seconds AM/PM (for instance, "Tue Feb 1 2005 12:00:00 AM", which matches
   *  <code>toLocaleString()</code>)</li>
   *  <li>Day Month Date Year (for instance, "Tue Feb 1 2005", which matches <code>toDateString()</code>)</li>
   *  <li>Month/Day/Year (for instance, "02/01/2005")</li>
   *  <li>Month/Year (for instance, "02/2005")</li>
   * </ul>
   *
   * @param yearOrTimevalue If other parameters are specified, this number represents a
   *   year (such as 1965); otherwise, it represents a time value. If the number represents a year, a
   *   value of 0 to 99 indicates 1900 through 1999; otherwise all four digits of the year must be
   *   specified. If the number represents a time value (no other parameters are specified), it is the
   *   number of milliseconds before or after 0:00:00 GMT January 1, 1970; a negative values represents
   *   a time <i>before</i> 0:00:00 GMT January 1, 1970, and a positive value represents a time after.
   * @param month An integer from 0 (January) to 11 (December).
   * @param date (default = <code>1</code>) An integer from 1 to 31.
   * @param hour (default = <code>0</code>) An integer from 0 (midnight) to 23 (11 p.m.).
   * @param minute (default = <code>0</code>) An integer from 0 to 59.
   * @param second (default = <code>0</code>) An integer from 0 to 59.
   * @param millisecond (default = <code>0</code>) An integer from 0 to 999 of milliseconds.
   *
   * @see #getMonth()
   * @see #getDate()
   * @see #getFullYear()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public native function Date"/*(yearOrTimevalue:Number = undefined, month:Number = undefined, date:Number = 1, hour:Number = 0, minute:Number = 0, second:Number = 0, millisecond:Number = 0);*/,

  /**
   * The day of the month (an integer from 1 to 31) specified by a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getDate()
   * @see #setDate()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function get date",function get$date()/*:Number*/ { return this.getDate(); },

  /**
   * The day of the month (an integer from 1 to 31) specified by a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getDate()
   * @see #setDate()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function set date",function set$date(value/*:Number*/)/*:void*/ { this.setDate(value); },

  /**
   * The day of the month (an integer from 1 to 31) of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCDate()
   * @see setUTCDate()
   */
  "public function get dateUTC",function get$dateUTC()/*:Number*/ { return this.getUTCDate(); }, "public function set dateUTC",function set$dateUTC(value/*:Number*/)/*:void*/ { this.setUTCDate(value); },

  /**
   * The day of the week (0 for Sunday, 1 for Monday, and so on) specified by this
   * <code>Date</code> according to local time. Local time is determined by the operating
   * system on which Flash Player is running.
   * @see #getDay()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public native function get day"/*():Number;*/,

  /**
   * The day of the week (0 for Sunday, 1 for Monday, and so on) of this <code>Date</code> according to universal time (UTC).
   * @see #getUTCDay()
   */
  "public native function get dayUTC"/*():Number;*/,

  /**
   * The full year (a four-digit number, such as 2000) of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getFullYear()
   * @see #setFullYear()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function get fullYear",function get$fullYear()/*:Number*/ { return this.getFullYear(); },

  /**
   * The full year (a four-digit number, such as 2000) of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getFullYear()
   * @see #setFullYear()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function set fullYear",function set$fullYear(value/*:Number*/)/*:void*/ { this.setFullYear(value); },

  /**
   * The four-digit year of a <code>Date</code> object according to universal time (UTC).
   * @see #getUTCFullYear()
   * @see #setUTCFullYear()
   */
  "public function get fullYearUTC",function get$fullYearUTC()/*:Number*/ { return this.getUTCFullYear(); },

  /**
   * The four-digit year of a <code>Date</code> object according to universal time (UTC).
   * @see #getUTCFullYear()
   * @see #setUTCFullYear()
   */
  "public function set fullYearUTC",function set$fullYearUTC(value/*:Number*/)/*:void*/ { this.setUTCFullYear(value); },

  /**
   * The hour (an integer from 0 to 23) of the day portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getHours()
   * @see #setHours()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function get hours",function get$hours()/*:Number*/ { return this.getHours(); },

  /**
   * The hour (an integer from 0 to 23) of the day portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getHours()
   * @see #setHours()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function set hours",function set$hours(value/*:Number*/)/*:void*/ { this.setHours(value); },

  /**
   * The hour (an integer from 0 to 23) of the day of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCHours()
   * @see setUTCHours()
   */
  "public function get hoursUTC",function get$hoursUTC()/*:Number*/ { return this.getUTCHours(); },

  /**
   * The hour (an integer from 0 to 23) of the day of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCHours()
   * @see setUTCHours()
   */
  "public function set hoursUTC",function set$hoursUTC(value/*:Number*/)/*:void*/ { this.setUTCHours(value); },

  /**
   * The milliseconds (an integer from 0 to 999) portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getMilliseconds()
   * @see setMilliseconds()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function get milliseconds",function get$milliseconds()/*:Number*/ { return this.getMilliseconds(); },

  /**
   * The milliseconds (an integer from 0 to 999) portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getMilliseconds()
   * @see setMilliseconds()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function set milliseconds",function set$milliseconds(value/*:Number*/)/*:void*/ { this.setMilliseconds(value); },

  /**
   * The milliseconds (an integer from 0 to 999) portion of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCMilliseconds()
   * @see #setUTCMilliseconds()
   */
  "public function get millisecondsUTC",function get$millisecondsUTC()/*:Number*/ { return this.getUTCMilliseconds(); },

  /**
   * The milliseconds (an integer from 0 to 999) portion of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCMilliseconds()
   * @see #setUTCMilliseconds()
   */
  "public function set millisecondsUTC",function set$millisecondsUTC(value/*:Number*/)/*:void*/ { this.setUTCMilliseconds(value); },

  /**
   * The minutes (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see getMinutes()
   * @see setMinutes()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function get minutes",function get$minutes()/*:Number*/ { return this.getMinutes(); },

  /**
   * The minutes (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see getMinutes()
   * @see setMinutes()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function set minutes",function set$minutes(value/*:Number*/)/*:void*/ { this.setMinutes(value); },

  /**
   * The minutes (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCMinutes()
   * @see #setUTCMinutes()
   */
  "public function get minutesUTC",function get$minutesUTC()/*:Number*/ { return this.getUTCMinutes(); },

  /**
   * The minutes (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCMinutes()
   * @see #setUTCMinutes()
   */
  "public function set minutesUTC",function set$minutesUTC(value/*:Number*/)/*:void*/ { this.setUTCMinutes(value); },

  /**
   * The month (0 for January, 1 for February, and so on) portion of a <code>
   * Date</code> object according to local time. Local time is determined by the operating system
   * on which Flash Player is running.
   * @see #getMonth()
   * @see #setMonth()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function get month",function get$month()/*:Number*/ { return this.getMonth(); },

  /**
   * The month (0 for January, 1 for February, and so on) portion of a <code>
   * Date</code> object according to local time. Local time is determined by the operating system
   * on which Flash Player is running.
   * @see #getMonth()
   * @see #setMonth()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function set month",function set$month(value/*:Number*/)/*:void*/ { this.setMonth(value); },

  /**
   * The month (0 [January] to 11 [December]) portion of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCMonth()
   * @see #setUTCMonth()
   */
  "public function get monthUTC",function get$monthUTC()/*:Number*/ { return this.getUTCMonth(); },

  /**
   * The month (0 [January] to 11 [December]) portion of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCMonth()
   * @see #setUTCMonth()
   */
  "public function set monthUTC",function set$monthUTC(value/*:Number*/)/*:void*/ { this.setUTCMonth(value); },

  /**
   * The seconds (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getSeconds()
   * @see #setSeconds()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function get seconds",function get$seconds()/*:Number*/ { return this.getSeconds(); },

  /**
   * The seconds (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * @see #getSeconds()
   * @see #setSeconds()
   * @see http://livedocs.adobe.com/flex/3/html/08_Dates_and_times_3.html Managing calendar dates and times
   */
  "public function set seconds",function set$seconds(value/*:Number*/)/*:void*/ { this.setSeconds(value); },

  /**
   * The seconds (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCSeconds()
   * @see #setUTCSeconds()
   */
  "public function get secondsUTC",function get$secondsUTC()/*:Number*/ { return this.getUTCSeconds(); },

  /**
   * The seconds (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to universal time (UTC).
   * @see #getUTCSeconds()
   * @see #setUTCSeconds()
   */
  "public function set secondsUTC",function set$secondsUTC(value/*:Number*/)/*:void*/ { this.setUTCSeconds(value); },

  /**
   * The number of milliseconds since midnight January 1, 1970, universal time,
   * for a <code>Date</code> object. Use this method to represent a specific instant in time
   * when comparing two or more <code>Date</code> objects.
   * @see #getTime()
   * @see #setTime()
   */
  "public function get time",function get$time()/*:Number*/ { return this.getTime(); },

  /**
   * The number of milliseconds since midnight January 1, 1970, universal time,
   * for a <code>Date</code> object. Use this method to represent a specific instant in time
   * when comparing two or more <code>Date</code> objects.
   * @see #getTime()
   * @see #setTime()
   */
  "public function set time",function set$time(value/*:Number*/)/*:void*/ { this.setTime(value); },

  /**
   * The difference, in minutes, between universal time (UTC) and the computer's local time.
   * Specifically, this value is the number of minutes you need to add to the computer's local
   * time to equal UTC. If your computer's time is set later than UTC, the value will be negative.
   * @see getTimezoneOffset()
   */
  "public native function get timezoneOffset"/*():Number;*/,

  /**
   * Returns the day of the month (an integer from 1 to 31) specified by a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).
   * The <code>getDate()</code> method is then called, which retrieves the day of the month.
   * <pre>
   * package {
   *     import flash.display.Sprite;
   *
   *     public class DateExample extends Sprite {
   *
   *         public function DateExample() {
   *             var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   *             trace(someBirthday);            // Sat Nov 30 01:20:00 GMT-0800 1974
   *             trace(someBirthday.getDate()); // 30
   *         }
   *     }
   * }
   * </pre>
   *
   * @return Number The day of the month (1 - 31) a <code>Date</code> object represents.
   *
   * @see #getMonth()
   * @see #getFullYear()
   */
  "public native function getDate"/*():Number;*/,

  /**
   * Returns the day of the week (0 for Sunday, 1 for Monday, and so on) specified by this
   * <code>Date</code> according to local time. Local time is determined by the operating
   * system on which Flash Player is running.
   *
   * @example
   * The following example creates a new Array object <code>weekDayLabels</code>, with elements
   * <code>[Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday]</code> and a new Date object
   * <code>someBirthday</code> with parameters <code>year</code> (<code>1974</code>), <code>month</code>
   * (<code>10</code> = November), <code>day</code> (<code>30</code>), <code>hour</code> (<code>1</code>)
   * and <code>minute</code> (<code>20</code>).
   * The <code>getDay()</code> method is then called twice, which first shows the day of the month
   * as 6 and then shows the day of the week using <code>weekDayLabels</code>.
   * <pre>
   * var weekDayLabels:Array = new Array("Sunday",
   *                     "Monday",
   *                     "Tuesday",
   *                     "Wednesday",
   *                     "Thursday",
   *                     "Friday",
   *                     "Saturday");
   *
   * var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   * trace(someBirthday);                       // Sat Nov 30 01:20:00 GMT-0800 1974
   * trace(someBirthday.getDay());            // 6
   * trace(weekDayLabels[someBirthday.getDay()]); // Saturday
   * </pre>
   * @return Number A numeric version of the day of the week (0 - 6) a <code>Date</code> object represents.
   */
  "public native function getDay"/*():Number;*/,

  /**
   * Returns the full year (a four-digit number, such as 2000) of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).
   * The <code>getFullYear()</code> method is then called, which retrieves the four-digit year.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   * trace(someBirthday);           // Sat Nov 30 01:20:00 GMT-0800 1974
   * trace(someBirthday.getFullYear()); // 1974
   * </pre>
   *
   * @return Number The full year a <code>Date</code> object represents.
   */
  "public native function getFullYear"/*():Number;*/,

  /**
   * Returns the hour (an integer from 0 to 23) of the day portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).
   * The <code>getHours()</code> and <code>getMinutes()</code> methods are then called, which
   * retrieves the hours and the minutes in 24-hour format.  Finally, a string <code>localTime</code>
   * is created and assigned to the result of a call to the function <code>getUSClockTime()</code>, which, in turn calls
   * <code>getHours()</code> and <code>getMinutes()</code> again, resulting in the time <code>03:05 PM</code>.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 15, 5);
   *
   * trace(someBirthday); // Sat Nov 30 15:20:00 GMT-0800 1974
   * trace(someBirthday.getHours() + ":" + someBirthday.getMinutes()); // 15:5
   *
   * var localTime:String = getUSClockTime(someBirthday.getHours(), someBirthday.getMinutes());
   * trace(localTime);    // 03:05 PM
   *
   * function getUSClockTime(hrs:uint, mins:uint):String {
   *     var modifier:String = "PM";
   *     var minLabel:String = doubleDigitFormat(mins);
   *
   *     if(hrs &gt; 12) {
   *         hrs = hrs-12;
   *     } else if(hrs == 0) {
   *         modifier = "AM";
   *         hrs = 12;
   *     } else if(hrs &lt; 12) {
   *         modifier = "AM";
   *     }
   *
   *     return (doubleDigitFormat(hrs) + ":" + minLabel + " " + modifier);
   * }
   *
   * function doubleDigitFormat(num:uint):String {
   *     if(num &lt; 10) {
   *         return ("0" + num);
   *     }
   *     return num;
   * }
   * </pre>
   *
   * @return Number The hour (0 - 23) of the day a <code>Date</code> object represents.
   *
   */
  "public native function getHours"/*():Number;*/,

  /**
   * Returns the milliseconds (an integer from 0 to 999) portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The <code>getMilliseconds()</code> method is then called, which retrieves the milliseconds of the
   * Date object <code>now</code> at the time it was created.
   * <pre>
   * var now:Date = new Date();
   * trace(now.getMilliseconds());
   * </pre>
   *
   * @return Number The milliseconds portion of a <code>Date</code> object.
   */
  "public native function getMilliseconds"/*():Number;*/,

  /**
   * Returns the minutes (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The <code>getMinutes()</code> method is then called, which retrieves the minutes of the
   * Date object <code>now</code> at the time it was created.
   * <pre>
   * var now:Date = new Date();
   * trace(now);
   * trace(now.getMinutes());
   * </pre>
   *
   * @return Number The minutes portion of a <code>Date</code> object.
   */
  "public native function getMinutes"/*():Number;*/,

  /**
   * Returns the month (0 for January, 1 for February, and so on) portion of this <code>
   * Date</code> according to local time. Local time is determined by the operating system
   * on which Flash Player is running.
   *
   * @example
   * The following example creates a new Array object <code>monthLabels</code>, with elements
   * <code>January</code> through <code>December</code> and a new Date object <code>now</code> with no parameters.
   * The <code>getMonth()</code> method is then called twice, which first returns the month number and
   * then the month name of the month the Date object <code>now</code> was created.
   * <pre>
   * var monthLabels:Array = new Array("January",
   *                   "February",
   *                   "March",
   *                   "April",
   *                   "May",
   *                   "June",
   *                   "July",
   *                   "August",
   *                   "September",
   *                   "October",
   *                   "November",
   *                   "December");
   *
   * var now:Date = new Date();
   * trace(now.getMonth());
   * trace(monthLabels[now.getMonth()]);
   * </pre>
   *
   * @return Number The month (0 - 11) portion of a <code>Date</code> object.
   */
  "public native function getMonth"/*():Number;*/,

  /**
   * Returns the seconds (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   *
   * @example
   * The following example creates a new  Date object <code>now</code> with no parameters.
   * The <code>getSeconds()</code> method is then called, which retrieves the seconds of the
   * Date object <code>now</code> at the time it was created.
   * <pre>
   * var now:Date = new Date();
   * trace(now.getSeconds());
   * </pre>
   *
   * @return Number The seconds (0 to 59) portion of a <code>Date</code> object.
   */
  "public native function getSeconds"/*():Number;*/,

  /**
   * Returns the number of milliseconds since midnight January 1, 1970, universal time,
   * for a <code>Date</code> object. Use this method to represent a specific instant in time
   * when comparing two or more <code>Date</code> objects.
   *
   * @example
   * The following example creates a new Date object <code>mlk</code> with parameters
   * <code>year</code> (<code>1929</code>), <code>month</code> (<code>0</code> = January), and
   * <code>day</code> (<code>15</code>). The <code>getTime()</code> method is then called, which
   * retrieves the milliseconds since midnight January 1, 1970, which is negative since the year is
   * set to 1929.
   * <pre>
   * var mlk:Date = new Date(1929, 0, 15);
   * trace(mlk);           // Tue Jan 15 00:00:00 GMT-0800 1929
   * trace(mlk.getTime()); // -1292601600000
   * </pre>
   *
   * The following example creates a new Date object <code>now</code> with no parameters
   * and then uses the following DateMath (created below) class methods to add time to the original Date
   * object <code>now</code> from the time it was created:
   * <ul>
   *   <li><code>addSeconds()</code>: adds 30 seconds to <code>now</code>.</li>
   *   <li><code>addMinutes()</code>: adds 30 minutes to  <code>now</code>.</li>
   *   <li><code>addHours()</code>: adds 6 hours to the Date object <code>now</code>.</li>
   *   <li><code>addDays()</code>: adds 30 days to the Date object <code>now</code>.</li>
   *   <li><code>addWeeks()</code>: adds 4 weeks to <code>now</code>.</li>
   * </ul>
   *
   * <pre>
   * var now:Date = new Date();
   * trace(now);
   * trace(DateMath.addSeconds(now, 30));
   * trace(DateMath.addMinutes(now, 30));
   * trace(DateMath.addHours(now, 6));
   * trace(DateMath.addDays(now, 30));
   * trace(DateMath.addWeeks(now, 4));
   *
   * class DateMath {
   *     public static function addWeeks(date:Date, weeks:Number):Date {
   *         return addDays(date, weeks*7);
   *     }
   *
   *     public static function addDays(date:Date, days:Number):Date {
   *         return addHours(date, days*24);
   *     }
   *
   *     public static function addHours(date:Date, hrs:Number):Date {
   *         return addMinutes(date, hrs*60);
   *     }
   *
   *     public static function addMinutes(date:Date, mins:Number):Date {
   *         return addSeconds(date, mins*60);
   *     }
   *
   *     public static function addSeconds(date:Date, secs:Number):Date {
   *         var mSecs:Number = secs * 1000;
   *         var sum:Number = mSecs + date.getTime();
   *         return new Date(sum);
   *     }
   * }
   * </pre>
   *
   * <b>Note</b>: it's important to use getTime when performing Date arithmetic because it will continue
   *  to work during leap years and doesn't require a bunch of if logic like following pseudo-code:
   * <pre>
   * function addMonths(num:Number):void {
   * 	currentMonth = currentMonth + num;
   * 	if(currentMonth > 12) {
   * 		currentYear++;
   * 		currentMonth = currentMonth - 12;
   * 	}
   * }
   * </pre>
   *
   * @return Number The number of milliseconds since Jan 1, 1970 that a <code>Date</code> object represents.
   */
  "public native function getTime"/*():Number;*/,

  /**
   * Returns the difference, in minutes, between universal
   * time (UTC) and the computer's local time.
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The <code>getTimezoneOffset()</code> method is then called, which retrieves the difference (in minutes) of the
   * time <code>now</code> was created and Universal Time.  The time zone offset is then converted to hours by
   * dividing the result by 60.
   * <pre>
   * var date:Date = new Date();
   * trace(date.getTimezoneOffset() / 60);
   * </pre>
   *
   * @return Number The minutes you need to add to the computer's local time value to equal UTC. If
   *   your computer's time is set later than UTC, the return value will be negative.
   */
  "public native function getTimezoneOffset"/*():Number;*/,

  /**
   * Returns the day of the month (an integer from 1 to 31) of a <code>Date</code> object,
   * according to universal time (UTC).
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   *
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).
   * The <code>getUTCDate()</code> method is then called, which retrieves the day of the month, according to the UTC.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   * trace(someBirthday);             // Sat Nov 30 01:20:00 GMT-0800 1974
   * trace(someBirthday.getUTCDate()); // 30</pre></div></div></div><a name="getUTCDay()"></a><table class="detailHeader" cellpadding="0" cellspacing="0"><tr><td class="detailHeaderName">getUTCDay</td><td class="detailHeaderParens">()</td><td class="detailHeaderType">method</td><td class="detailHeaderRule">&nbsp;</td></tr></table><div class="detailBody"><code> <a href="statements.html#AS3">AS3</a> function getUTCDay():<a href="Number.html">Number</a></code><p></p><p>
   *
   * @return Number The UTC day of the month (1 to 31) that a <code>Date</code> object represents.
   *
   * @see #getDate()
   */
  "public native function getUTCDate"/*():Number;*/,

  /**
   * Returns the day of the week (0 for Sunday, 1 for Monday, and so on) of this <code>Date</code> according to
   * universal time (UTC).
   *
   * @example
   * The following example creates a new Array object <code>weekDayLabels</code>, with elements
   * <code>[Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday]</code> and a new Date object
   * <code>someBirthday</code> with parameters <code>year</code> (<code>1974</code>), <code>month</code>
   * (<code>10</code> = November), <code>day</code> (<code>30</code>), <code>hour</code> (<code>1</code>) and
   * <code>minute</code> (<code>20</code>).
   * The <code>getUTCDay()</code> method is then called twice, which first shows the day of the month
   * as 6 and then shows the day of the week using <code>weekDayLabels</code>, according to the UTC.
   * <pre>
   * var weekDayLabels:Array = new Array("Sunday",
   *                     "Monday",
   *                     "Tuesday",
   *                     "Wednesday",
   *                     "Thursday",
   *                     "Friday",
   *                     "Saturday");
   *
   * var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   * trace(someBirthday);           // Sat Nov 30 01:20:00 GMT-0800 1974
   * trace(someBirthday.getUTCDay()); // 6
   * trace(weekDayLabels[someBirthday.getUTCDay()]); // Saturday
   * </pre>
   *
   * @return Number The UTC day of the week (0 to 6) that a <code>Date</code> object represents.
   *
   * @see #getDay()
   */

  "public native function getUTCDay"/*():Number;*/,

  /**
   * Returns the four-digit year of a <code>Date</code> object according to universal time (UTC).
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).
   * The <code>getUTCFullYear()</code> method is then called, which retrieves the four-digit year, according to the UTC.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   * trace(someBirthday);                 // Sat Nov 30 01:20:00 GMT-0800 1974
   * trace(someBirthday.getUTCFullYear()); // 1974
   * </pre>
   *
   * @return Number The UTC four-digit year a <code>Date</code> object represents.
   *
   * @see #getFullYear()
   *
   */
  "public native function getUTCFullYear"/*():Number;*/,

  /**
   * Returns the hour (an integer from 0 to 23) of the day of a <code>Date</code> object
   * according to universal time (UTC).
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).
   * The <code>getHours()</code> and <code>getMinutes()</code> methods are then called, which retrieves
   * the hours and the minutes in 24-hour format.  Finally, a string <code>localTime</code> is created and
   * assigned to the result of a call to the function <code>getUSClockTime()</code>, which, in turn calls
   * <code>getHours()</code> and <code>getMinutes()</code> again, resulting in the time <code>03:05 PM</code>.
   * Lastly, a String variable <code>utcTime</code> is created in the same manner as <code>localTime</code>,
   * and in this case, the result is the same.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 15, 5);
   *
   * trace(someBirthday); // Sat Nov 30 15:20:00 GMT-0800 1974
   * trace(someBirthday.getHours() + ":" + someBirthday.getMinutes()); // 15:5
   *
   * var localTime:String = getUSClockTime(someBirthday.getHours(), someBirthday.getMinutes());
   * trace(localTime);    // 03:05 PM
   *
   * var utcTime:String = getUSClockTime(someBirthday.getUTCHours(), someBirthday.getUTCMinutes());
   * trace(utcTime);      // 11:05 PM
   *
   * function getUSClockTime(hrs:uint, mins:uint):String {
   *     var modifier:String = "PM";
   *     var minLabel:String = doubleDigitFormat(mins);
   *
   *     if(hrs &gt; 12) {
   *         hrs = hrs-12;
   *     } else if(hrs == 0) {
   *         modifier = "AM";
   *         hrs = 12;
   *     } else if(hrs &lt; 12) {
   *         modifier = "AM";
   *     }
   *
   *     return (doubleDigitFormat(hrs) + ":" + minLabel + " " + modifier);
   * }
   *
   * function doubleDigitFormat(num:uint):String {
   *     if(num &lt; 10) {
   *         return ("0" + num);
   *     }
   *     return num;
   * }
   * </pre>
   *
   * @return Number The UTC hour of the day (0 to 23) a <code>Date</code> object represents.
   *
   * @see #getHours()
   */
  "public native function getUTCHours"/*():Number;*/,

  /**
   * Returns the milliseconds (an integer from 0 to 999) portion of a <code>Date</code> object
   * according to universal time (UTC).
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The <code>getUTCMilliseconds()</code> method is then called, which retrieves the milliseconds of the
   * Date object <code>now</code> at the time it was created, according to the UTC
   * <pre>
   * var now:Date = new Date();
   * trace(now.getUTCMilliseconds());
   * </pre>
   *
   * @return Number The UTC milliseconds portion of a <code>Date</code> object.
   */
  "public native function getUTCMilliseconds"/*():Number;*/,

  /**
   * Returns the minutes (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to universal time (UTC).
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The <code>getUTCMinutes()</code> method is then called, which retrieves the minutes of the
   * Date object <code>now</code> at the time it was created, according to the UTC.
   *
   * <pre>
   * var now:Date = new Date();
   * trace(now.getUTCMinutes());
   * </pre>
   *
   * @return Number The UTC minutes portion of a <code>Date</code> object.
   */
  "public native function getUTCMinutes"/*():Number;*/,

  /**
   * Returns the month (0 [January] to 11 [December]) portion of a <code>Date</code> object
   * according to universal time (UTC).
   *
   * @example
   * The following example creates a new Array object <code>monthLabels</code>, with elements
   * <code>January</code> through <code>December</code> and a new Date object <code>now</code> with no parameters.
   * The <code>getUTCMonth()</code> method is then called twice, which first returns the month number and
   * then the month name of the month the Date object <code>now</code> was created, according to the UTC
   *
   * <pre>
   *
   * var monthLabels:Array = new Array("January",
   *                   "February",
   *                   "March",
   *                   "April",
   *                   "May",
   *                   "June",
   *                   "July",
   *                   "August",
   *                   "September",
   *                   "October",
   *                   "November",
   *                   "December");
   *
   * var now:Date = new Date();
   * trace(now.getMonth());
   * trace(now.getUTCMonth());
   * trace(monthLabels[now.getUTCMonth()]);</pre></div></div></div><a name="getUTCSeconds()"></a><table class="detailHeader" cellpadding="0" cellspacing="0"><tr><td class="detailHeaderName">getUTCSeconds</td><td class="detailHeaderParens">()</td><td class="detailHeaderType">method</td><td class="detailHeaderRule">&nbsp;</td></tr></table><div class="detailBody"><code> <a href="statements.html#AS3">AS3</a> function getUTCSeconds():<a href="Number.html">Number</a></code><p></p><p>
   *
   * @return Number The UTC month portion of a <code>Date</code> object.
   *
   * @see #getMonth()
   */
  "public native function getUTCMonth"/*():Number;*/,

  /**
   * Returns the seconds (an integer from 0 to 59) portion of a <code>Date</code> object
   * according to universal time (UTC).
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The <code>getUTCSeconds()</code> method is then called, which retrieves the seconds of the
   * Date object <code>now</code> at the time it was created, according to the UTC
   * <pre>
   * var now:Date = new Date();
   * trace(now.getUTCSeconds());
   * </pre>
   *
   * @return Number The UTC seconds portion of a <code>Date</code> object.
   */
  "public native function getUTCSeconds"/*():Number;*/,

  /**
   * Converts a string representing a date into a number equaling the number of milliseconds
   * elapsed since January 1, 1970, UTC.
   *
   * @example
   * The following example assigns a date string to <code>dateParsed</code> for November 30, 1974.
   * The <code>Date.parse()</code> method is then called, which converts the date into milliseconds since January 1, 1970.
   * <pre>
   * var dateParsed:String = "Sat Nov 30 1974";
   *
   * var milliseconds:Number = Date.parse(dateParsed);
   * trace(milliseconds); // 155030400000
   * </pre>
   *
   * @param date A string representation of a date, which conforms to the format for the output of
   *   <code>Date.toString()</code>. The date format for the output of <code>Date.toString()</code> is:
   * <pre>
   * Day Mon DD HH:MM:SS TZD YYYY
   * </pre>
   * <p>For example: </p>
   * <pre>
   * Wed Apr 12 15:30:17 GMT-0700 2006
   * </pre>
   * <p>The Time Zone Designation (TZD) is always in the form <code>GMT-HHMM</code> or <code>UTC-HHMM</code> indicating the
   * hour and minute offset relative to Greenwich Mean Time (GMT), which is now also called universal time (UTC).
   * The year month and day terms can be separated by a forward slash (<code>/</code>) or by spaces, but never by a
   * dash (<code>-</code>). Other supported formats include the following (you can include partial representations of these
   * formats; that is, just the month, day, and year):</p>
   *   *  <pre>
   * MM/DD/YYYY HH:MM:SS TZD
   * HH:MM:SS TZD Day Mon/DD/YYYY
   * Mon DD YYYY HH:MM:SS TZD
   * Day Mon DD HH:MM:SS TZD YYYY
   * Day DD Mon HH:MM:SS TZD YYYY
   * Mon/DD/YYYY HH:MM:SS TZD
   * YYYY/MM/DD HH:MM:SS TZD
   * </pre>
   *
   * @return Number A number representing the milliseconds elapsed since January 1, 1970, UTC.
   *
   * @see #toString()
   */
  "public static native function parse"/*(date : String):Number;*/,

  /**
   * Sets the day of the month, according to local time, and returns the new time in
   * milliseconds. Local time is determined by the operating system on which Flash Player
   * is running.
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   *
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).  The
   * method <code>getDate()</code> is then called, which retrieves the day of the month.  Next
   * <code>setDate()</code> is called with the <code>day</code> parameter set to <code>20</code> and
   * then <code>getDate()</code> is called again, which retrieves the newly set day of month.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   * trace(someBirthday);            // Sat Nov 30 01:20:00 GMT-0800 1974
   * trace(someBirthday.getDate()); // 30
   *
   * someBirthday.setDate(20);
   * trace(someBirthday.getDate()); // 20
   * </pre>
   *
   * @param day An integer from 1 to 31.
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setDate"/*(day:Number):Number;*/,

  /**
   * Sets the year, according to local time, and returns the new time in milliseconds. If
   * the <code>month</code> and <code>day</code> parameters are specified,
   * they are set to local time. Local time is determined by the operating system on which
   * Flash Player is running.
   * <p>
   * Calling this method does not modify the other fields of the <code>Date</code> but
   * <code>Date.getUTCDay()</code> and <code>Date.getDay()</code> can report a new value
   * if the day of the week changes as a result of calling this method.
   * </p>
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).  The
   * method <code>getFullYear()</code> is then called, which retrieves the four-digit year.
   * Next <code>setFullYear()</code> is called with the <code>year</code> parameter set to
   * <code>2000</code> and then <code>getFullYear()</code> is called again, which retrieves the newly set year.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   * trace(someBirthday);           // Sat Nov 30 01:20:00 GMT-0800 1974
   * trace(someBirthday.getFullYear()); // 1974
   *
   * someBirthday.setFullYear(2000);
   * trace(someBirthday.getFullYear()); // 2000
   * </pre>
   *
   * @param year Number A four-digit number specifying a year. Two-digit numbers do not represent
   *   four-digit years; for example, 99 is not the year 1999, but the year 99.
   * @param month An integer from 0 (January) to 11 (December).
   * @param day A number from 1 to 31.
   *
   * @return Number The new time, in milliseconds.
   *
   * @see #getUTCDay()
   */

  "public native function setFullYear"/*(year:Number, month: Number = 1, day: Number = 1):Number;*/,

  /**
   * Sets the hour, according to local time, and returns the new time in milliseconds.
   * Local time is determined by the operating system on which Flash Player is running.
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).  The methods
   * <code>getHours()</code> and
   * <code>getMinutes()</code> are then called, which retrieves the hours and minutes.  Next <code>setHours()</code>
   * is called with the <code>hour</code> parameter set to <code>12</code> and then <code>getHours()</code> and
   * <code>getMinutes()</code> are called again, which retrieves the newly set hours and minutes.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 15, 20);
   *
   * trace(someBirthday); // Sat Nov 30 15:20:00 GMT-0800 1974
   * trace(someBirthday.getHours() + ":" + someBirthday.getMinutes()); // 15:20
   *
   * someBirthday.setHours(12);
   * trace(someBirthday.getHours() + ":" + someBirthday.getMinutes()); // 12:20
   * </pre>
   *
   * @param hour An integer from 0 (midnight) to 23 (11 p.m.).
   * @param minute An integer from 0 to 59.
   * @param second An integer from 0 to 59.
   * @param millisecond An integer from 0 to 999.
   *
   * @return Number The new time, in milliseconds.
   *
   */
  "public native function setHours"/*(hour:Number, minute: Number = 1, second: Number = 1, millisecond : Number = 1):Number;*/,

  /**
   * Sets the milliseconds, according to local time, and returns the new time in
   * milliseconds. Local time is determined by the operating system on which Flash Player
   * is running.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The method <code>getMilliseconds()</code> is then called, which retrieves the milliseconds when
   * <code>now</code> was created.  Then another new Date object <code>before</code> with an additional
   * call to <code>setMilliseconds()</code> with the <code>millisecond</code> parameter set to <code>4</code> and
   * <code>getMilliseconds()</code> is called again, which retrieves the newly set milliseconds.
   *
   * <pre>
   * var now:Date = new Date();
   * trace(now);
   * trace(now.getMilliseconds());
   *
   * var before:Date = new Date(now.setMilliseconds(4));
   * trace(before);
   * trace(before.getMilliseconds());
   * </pre>
   *
   * @param millisecond An integer from 0 to 999.
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setMilliseconds"/*(millisecond: Number):Number;*/,

  /**
   * Sets the minutes, according to local time, and returns the new time in milliseconds.
   * Local time is determined by the operating system on which Flash Player is running.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The method <code>getMinutes()</code> is then called, which retrieves the minutes when
   * <code>now</code> was created.  Then another new Date object <code>before</code> with an additional
   * call to <code>setMinutes()</code> with the <code>minute</code> parameter set to <code>0</code> and
   * <code>getMinutes()</code> is called again, which retrieves the newly set minutes.
   *
   * <pre>
   * var now:Date = new Date();
   * trace(now);
   * trace(now.getMinutes());
   *
   * var before:Date = new Date(now.setMinutes(0));
   * trace(before);
   * trace(before.getMinutes());
   * </pre>
   *
   * @param minute An integer from 0 to 59.
   * @param second An integer from 0 to 59.
   * @param millisecond An integer from 0 to 999.
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setMinutes"/*(minute: Number, second: Number = 1, millisecond : Number = 1):Number;*/,

  /**
   * Sets the month and optionally the day of the month, according to local time, and
   * returns the new time in milliseconds. Local time is determined by the operating
   * system on which Flash Player is running.
   *
   * @example
   * The following example creates a new Array object <code>monthLabels</code>, with elements
   * <code>January</code> through <code>December</code> and a new month object <code>now</code> with no parameters.
   * The method <code>getMonth()</code> is then called, which retrieves the month in which
   * <code>now</code> was created.  Next <code>setMonth()</code> is called with the <code>month</code> parameter set to
   * <code>0</code> and then <code>getMonth()</code> is called again, which retrieves the newly set month..
   * <pre>
   * var monthLabels:Array = new Array("January",
   *                   "February",
   *                   "March",
   *                   "April",
   *                   "May",
   *                   "June",
   *                   "July",
   *                   "August",
   *                   "September",
   *                   "October",
   *                   "November",
   *                   "December");
   *
   * var now:Date = new Date();
   * trace(now.getMonth());
   * trace(monthLabels[now.getMonth()]);
   *
   * now.setMonth(0);
   * trace(now.getMonth());             // 0
   * trace(monthLabels[now.getMonth()]); // January
   * </pre>
   *
   * @param month An integer from 0 (January) to 11 (December).
   * @param day An integer from 1 to 31.
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setMonth"/*(month: Number, day: Number = 1):Number;*/,

  /**
   * Sets the seconds, according to local time, and returns the new time in milliseconds.
   * Local time is determined by the operating system on which Flash Player is running.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The method <code>getseconds()</code> is then called, which retrieves the seconds when
   * <code>now</code> was created.  Then the <code>setSeconds()</code> is called with the <code>second</code>
   * parameter set to <code>0</code> and
   * <code>getSeconds()</code> is called again, which retrieves the newly set seconds.
   * <pre>
   *
   * var now:Date = new Date();
   * trace(now.getSeconds());
   *
   * now.setSeconds(0);
   * trace(now.getSeconds()); // 0
   * </pre>
   *
   * @param second An integer from 0 to 59.
   * @param millisecond An integer from 0 to 999.
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setSeconds"/*(second: Number, millisecond : Number = 1):Number;*/,

  /**
   * Sets the date in milliseconds since midnight on January 1, 1970, and returns the new
   * time in milliseconds.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The <code>setTime()</code> method is then called, with the <code>millisecond</code> parameter set
   * to <code>-1292601600000</code>, which sets the time to <code>Tue Jan 15 00:00:00 GMT-0800 1929</code>.
   * <pre>
   * var now:Date = new Date();
   * trace(now);
   *
   * now.setTime(-1292601600000);
   * trace(now); // Tue Jan 15 00:00:00 GMT-0800 1929
   * </pre>
   *
   * @param millisecond An integer value where 0 is midnight on January 1, universal time (UTC).
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setTime"/*(millisecond: Number):Number;*/,

  /**
   * Sets the day of the month, in universal time (UTC), and returns the new time in
   * milliseconds. Calling this method does not modify the other fields of a <code>Date
   * </code> object, but the <code>Date.getUTCDay()</code> and <code>Date.getDay()</code> methods can report
   * a new value if the day of the week changes as a result of calling this method.
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   *
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).  The method
   * <code>getUTCDate()</code> is called and correctly returns the day of the month.  Next <code>setUTCDate()</code>
   *
   * is called with the <code>day</code> parameter set to <code>1</code> and a <code>trace()</code> statement
   * confirms the date was correctly set.
   * <pre>
   *
   * var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   * trace(someBirthday); // Sat Nov 30 01:20:00 GMT-0800 1974
   * trace(someBirthday.getUTCDate()); // 30
   *
   * someBirthday.setUTCDate(1);
   * trace(someBirthday); // Fri Nov 1 01:20:00 GMT-0800 1974
   * </pre>
   *
   * @param day A number; an integer from 1 to 31.
   *
   * @return Number The new time, in milliseconds.
   *
   * @see #getUTCDay()
   */
  "public native function setUTCDate"/*(day: Number):Number;*/,

  /**
   * Sets the year, in universal time (UTC), and returns the new time in milliseconds.
   * <p>Optionally, this method can also set the month and day of the month. Calling
   * this method does not modify the other fields, but the <code>Date.getUTCDay()</code> and
   * <code>Date.getDay()</code> methods can report a new value if the day of the week changes as a
   * result of calling this method.
   * </p>
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).  The method
   * <code>getUTCFullYear()</code> is called and correctly returns the four-digit year.  Next <code>setUTCFullYear()</code>
   *
   * is called with the <code>year</code> parameter set to <code>1975</code> and a <code>trace()</code> statement
   * confirms the year was correctly set.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 1, 20);
   * trace(someBirthday); // Sat Nov 30 01:20:00 GMT-0800 1974
   * trace(someBirthday.getUTCFullYear()); // 1974
   *
   * someBirthday.setUTCFullYear(1975);
   * trace(someBirthday); // Thu Nov 30 01:20:00 GMT-0800 1975
   * </pre>
   *
   * @param year An integer that represents the year specified as a full four-digit year, such as 2000.
   * @param month An integer from 0 (January) to 11 (December).
   * @param day An integer from 1 to 31.
   * @return Number An integer.
   *
   * @see #getUTCDay()
   */
  "public native function setUTCFullYear"/*(year:Number, month: Number = 1, day: Number = 1):Number;*/,

  /**
   * Sets the hour, in universal time (UTC), and returns the new time in milliseconds.
   * Optionally, the minutes, seconds, and milliseconds can be specified.
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>).  The methods
   * <code>getHours()</code>, <code>getMinutes()</code>, <code>getUTCHours()</code>, and <code>getUTCMinutes()</code>
   *
   * are then called, which retrieves the hours and minutes. Next <code>setUTCHours()</code> is called with the
   * <code>hour</code> parameter set to <code>12</code> and then the methods <code>getHours()</code>,
   * <code>getMinutes()</code>, <code>getUTCHours()</code>, and <code>getUTCMinutes()</code> are re-called and
   * correctly display the updated hour.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 15, 20);
   *
   * trace(someBirthday); // Sat Nov 30 15:20:00 GMT-0800 1974
   * trace(someBirthday.getHours() + ":" + someBirthday.getMinutes());     // 15:20
   * trace(someBirthday.getUTCHours() + ":" + someBirthday.getUTCMinutes()); // 23:20
   *
   * someBirthday.setUTCHours(12);
   * trace(someBirthday.getHours() + ":" + someBirthday.getMinutes());     // 4:20
   * trace(someBirthday.getUTCHours() + ":" + someBirthday.getUTCMinutes()); // 12:20
   * </pre>
   *
   * @param hour An integer from 0 (midnight) to 23 (11 p.m.).
   * @param minute An integer from 0 to 59.
   * @param second An integer from 0 to 59.
   * @param millisecond An integer from 0 to 999.
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setUTCHours"/*(hour:Number, minute: Number = 1, second: Number = 1, millisecond : Number = 1):Number;*/,

  /**
   * Sets the milliseconds, in universal time (UTC), and returns the new time in milliseconds.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The method <code>getUTCMilliseconds()</code> is then called, which retrieves the UTCMilliseconds when
   * <code>now</code> was created.  Then another new Date object <code>before</code> with an additional
   * call to <code>setUTCMilliseconds()</code> with the <code>millisecond</code> parameter set to <code>4</code> and
   * <code>getUTCMilliseconds()</code> is called again, which retrieves the newly set milliseconds.
   * <pre>
   * var now:Date = new Date();
   * trace(now);
   * trace(now.getUTCMilliseconds());
   *
   * var before:Date = new Date(now.setUTCMilliseconds(4));
   * trace(before);
   * trace(before.getUTCMilliseconds());
   * </pre>
   *
   * @param millisecond An integer from 0 to 999.
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setUTCMilliseconds"/*(millisecond: Number):Number;*/,

  /**
   * Sets the minutes, in universal time (UTC), and returns the new time in milliseconds.
   * Optionally, you can specify the seconds and milliseconds.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The method <code>getUTCMinutes()</code> is then called, which retrieves the UTCMinutes when
   * <code>now</code> was created.  Then another new Date object <code>before</code> with an additional
   * call to <code>setUTCMinutes()</code> with the <code>minute</code> parameter set to <code>0</code> and
   * <code>getUTCMinutes()</code> is called again, which retrieves the newly set minutes.
   *
   * <pre>
   * var now:Date = new Date();
   * trace(now);
   * trace(now.getUTCMinutes());
   *
   * var before:Date = new Date(now.setUTCMinutes(0));
   * trace(before);
   * trace(before.getUTCMinutes());
   * </pre>
   *
   * @param minute An integer from 0 to 59.
   * @param second An integer from 0 to 59.
   * @param millisecond An integer from 0 to 999.
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setUTCMinutes"/*(minute: Number, second: Number = 1, millisecond : Number = 1):Number;*/,

  /**
   * Sets the month, and optionally the day, in universal time(UTC) and returns the new
   * time in milliseconds. Calling this method does not modify the other fields, but the
   * <code>Date.getUTCDay()</code> and <code>Date.getDay()</code> methods might report a new
   * value if the day of the week changes as a result of calling this method.
   *
   * @example
   * The following example creates a new Array object <code>UTCMonthLabels</code>, with elements
   * <code>January</code> through <code>December</code> and a new UTCMonth object <code>now</code> with no parameters.
   * The method <code>getUTCMonth()</code> is then called, which retrieves the UTCMonth in which
   * <code>now</code> was created.  Next <code>setUTCMonth()</code> is called with the <code>month</code> parameter set to
   * <code>0</code> and then <code>getUTCMonth()</code> is called again, which retrieves the newly set month..
   * <pre>
   * var UTCMonthLabels:Array = new Array("January",
   *                   "February",
   *                   "March",
   *                   "April",
   *                   "May",
   *                   "June",
   *                   "July",
   *                   "August",
   *                   "September",
   *                   "October",
   *                   "November",
   *                   "December");
   *
   * var now:Date = new Date();
   * trace(now.getUTCMonth());
   * trace(UTCMonthLabels[now.getUTCMonth()]);
   *
   * now.setUTCUTCMonth(0);
   * trace(now.getUTCMonth());              // 0
   * trace(UTCMonthLabels[now.getUTCMonth()]); // January
   * </pre>
   *
   * @param month An integer from 0 (January) to 11 (December).
   * @param day An integer from 1 to 31.
   *
   * @return Number The new time, in milliseconds.
   *
   * @see #getDay()
   */
  "public native function setUTCMonth"/*(month: Number, day: Number = 1):Number;*/,

  /**
   * Sets the seconds, and optionally the milliseconds, in universal time (UTC) and
   * returns the new time in milliseconds.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters.
   * The method <code>getUTCSeconds()</code> is then called, which retrieves the seconds when
   * <code>now</code> was created.  Then the <code>setUTCSeconds()</code> is called with the <code>second</code>
   *
   * parameter set to <code>0</code> and <code>getUTCSeconds()</code> is called again, which retrieves the
   * newly set seconds.
   * <pre>
   *
   * var now:Date = new Date();
   * trace(now.getUTCSeconds());
   *
   * now.setUTCSeconds(0);
   * trace(now.getUTCSeconds()); // 0
   * </pre>
   *
   * @param second An integer from 0 to 59.
   * @param millisecond An integer from 0 to 999.
   *
   * @return Number The new time, in milliseconds.
   */
  "public native function setUTCSeconds"/*(second: Number, millisecond : Number = 0):Number;*/,

  /**
   * Returns a string representation of the day and date only, and does not include the time or timezone.
   * Contrast with the following methods:
   * <ul>
   *   <li><code>Date.toTimeString()</code>, which returns only the time and timezone</li>
   *   <li><code>Date.toString()</code>, which returns not only the day and date, but also the time and timezone.</li>
   * </ul>
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters
   * and then the following methods are called within a <code>trace()</code> statement
   * <ul>
   *   <li><code>toString</code>: displays all parameters for <code>now</code> at the time <code>now</code> was
   *     created.</li>
   *   <li><code>toDateString()</code>: displays the <code>day</code>, <code>month</code>, and <code>year</code>
   *     parameters for the time <code>now</code> was created.</li>
   * </ul>
   * <pre>
   * var now:Date = new Date();
   * trace(now);
   * trace(now.toDateString());
   * </pre>
   *
   * @return String The string representation of day and date only.
   *
   * @see #toString()
   */
  "public native function toDateString"/*():String;*/,

  /**
   * Returns a String representation of the day and date only, and does not include the time or timezone.
   * This method returns the same value as <code>Date.toDateString</code>.
   * Contrast with the following methods:
   * <ul>
   *   <li><code>Date.toTimeString()</code>, which returns only the time and timezone</li>
   *   <li><code>Date.toString()</code>, which returns not only the day and date, but also the time and timezone.</li>
   * </ul>
   * @return String The <code>String</code> representation of day and date only.
   *
   * @see #toDateString()
   * @see #toTimeString()
   * @see #toString()
   */
  "public native function toLocaleDateString"/*():String;*/,

  /**
   * Returns a String representation of the day, date, time, given in local time.
   * Contrast with the <code>Date.toString()</code> method, which returns the same information (plus the timezone)
   * with the year listed at the end of the string.
   *
   * @return String A string representation of a <code>Date</code> object in the local timezone.
   */
  "public native function toLocaleString"/*():String;*/,

  /**
   * Returns a String representation of the time only, and does not include the day, date, year, or timezone.
   * Contrast with the <code>Date.toTimeString()</code> method, which returns the time and timezone.
   *
   * @return String The string representation of time and timezone only.
   *
   * @see #toTimeString()
   */
  "public native function toLocaleTimeString"/*():String;*/,

  /**
   * Returns a String representation of the day, date, time, and timezone.
   * The date format for the output is:
   * <pre>
   * Day Mon Date HH:MM:SS TZD YYYY
   * </pre>
   * <p>For example:</p>
   * <pre>
   * Wed Apr 12 15:30:17 GMT-0700 2006
   * </pre>
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters
   * and then <code>toString</code> is called within a <code>trace()</code> statement, which
   * displays all parameters for <code>now</code> at the time <code>now</code> was created.
   * <pre>
   * var now:Date = new Date();
   * trace(now);
   * </pre>
   *
   * @return String The string representation of a <code>Date</code> object.
   */
  "public native function toString"/*():String;*/,

  /**
   * Returns a String representation of the time and timezone only, and does not include the day and date.
   * Contrast with the <code>Date.toDateString()</code> method, which returns only the day and date.
   *
   * @return String The string representation of time and timezone only.
   *
   * @see #toDateString()
   */
  "public native function toTimeString"/*():String;*/,

  /**
   * Returns a String representation of the day, date, and time in universal time (UTC).
   * For example, the date February 1, 2005 is returned as <code>Tue Feb 1 00:00:00 2005 UTC</code>.
   *
   * @return String The string representation of a <code>Date</code> object in UTC time.
   *
   * @see #toString()
   */
  "public native function toUTCString"/*():String;*/,


  /**
   * Returns the number of milliseconds between midnight on January 1, 1970, universal time,
   * and the time specified in the parameters. This method uses universal time, whereas the
   * <code>Date</code> constructor uses local time.
   * <p>This method is useful if you want to pass a UTC date to the Date class constructor.
   * Because the Date class constructor accepts the millisecond offset as an argument, you
   * can use the Date.UTC() method to convert your UTC date into the corresponding millisecond
   * offset, and send that offset as an argument to the Date class constructor:</p>
   *
   * @example
   * The following example creates a new Date object <code>someBirthday</code> with parameters
   * <code>year</code> (<code>1974</code>), <code>month</code> (<code>10</code> = November), <code>day</code>
   * (<code>30</code>), <code>hour</code> (<code>1</code>) and <code>minute</code> (<code>20</code>) using local
   * time.  Then a call to <code>UTC()</code> within a <code>setTime()</code> method resets the same parameters
   * to universal time.
   * <pre>
   * var someBirthday:Date = new Date(1974, 10, 30, 15, 20);
   * trace(someBirthday.toString());
   *
   * someBirthday.setTime(Date.UTC(1974, 10, 30, 15, 20));
   * trace(someBirthday.toString());
   * </pre>
   *
   * @param year A four-digit integer that represents the year (for example, 2000).
   * @param month An integer from 0 (January) to 11 (December).
   * @param date (default = <code>1</code>)<code></code> &mdash; An integer from 1 to 31.
   * @param hour (default = <code>0</code>)<code></code> &mdash; An integer from 0 (midnight) to 23 (11 p.m.).
   * @param minute (default = <code>0</code>)<code></code> &mdash; An integer from 0 to 59.
   * @param second (default = <code>0</code>)<code></code> &mdash; An integer from 0 to 59.
   * @param millisecond (default = <code>0</code>)<code></code> &mdash; An integer from 0 to 999.
   *
   * @return Number The number of milliseconds since January 1, 1970 and the specified date and time.
   */
  "public native static function UTC"/*(year:Number, month:Number, date:Number = 1, hour:Number = 0, minute:Number = 0, second:Number = 0, millisecond:Number = 0):String;*/,

  /**
   * Returns the number of milliseconds since midnight January 1, 1970, universal time,
   * for a <code>Date</code> object.
   *
   * @example
   * The following example creates a new Date object <code>now</code> with no parameters
   * The <code>getTime()</code> method is then called, which retrieves the number of milliseconds between
   * the time <code>now</code> was created and midnight on
   * January 1, 1970, and then <code>valueOf()</code> is called, which retrieves the same thing.
   * <pre>
   * var now:Date = new Date();
   * trace(now.getTime());
   * trace(now.valueOf());
   * </pre>
   *
   * @return Number The number of milliseconds since January 1, 1970 that a <code>Date</code> object represents.
   */
  "public native function valueOf"/*():Number;*/,

  /**
   * @deprecated
   * @return Number the year since 1900
   */
  "public native function getYear"/*():Number;*/,

  /**
   * @deprecated
   * @param year the year since 1900
   * @return Number
   */
  "public native function setYear"/*(year: Number):Number;*/,


  /**
   * JavaScript only.
   * @return String
   */
  "public native function toGMTString"/*():String;*/,

];},[],["Object"], "0.7.1", "0.7.5"

);joo.classLoader.prepare(/*
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
);joo.classLoader.prepare(/*
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
);joo.classLoader.prepare(/*
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
);joo.classLoader.prepare(/*
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

// JangarooScript runtime support. Author: Manuel Ohlendorf

"package joo",/* {*/

"public class ResourceBundleAwareClassLoader extends joo.DynamicClassLoader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createClassDeclaration=$$l+'createClassDeclaration',$escape=$$l+'escape',$readLocaleFromCookie=$$l+'readLocaleFromCookie',$setCookie=$$l+'setCookie',$getLocaleCookieExpiry=$$l+'getLocaleCookieExpiry',$getLocalizedResourceClassName=$$l+'getLocalizedResourceClassName';return[function(){joo.classLoader.init(Date);}, 

  "private static const",{ DAYS_TILL_LOCALE_COOKIE_EXPIRY/*:int*/ : 10*356},

  "private static const",{ RESOURCE_BUNDLE_PATTERN/*:RegExp*/ :/_properties$/},

  "public var",{ supportedLocales/*:Array*/: undefined},
  "public var",{ defaultLocale/*:String*/: undefined},
  "public var",{ localeCookieName/*:String*/: undefined},
  "public var",{ localeCookiePath/*:String*/ :function(){return( joo.getQualifiedObject("location.pathname"));}},
  "public var",{ localeCookieDomain/*:String*/ : null},

  "public static var",{ INSTANCE/*:ResourceBundleAwareClassLoader*/: undefined},

  "public function ResourceBundleAwareClassLoader",function $ResourceBundleAwareClassLoader(supportedLocales/*:Array = ["en"]*/, defaultLocale/*:String = "en"*/, localeCookieName/*:String = "joo.locale"*/) {if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){supportedLocales = ["en"];}defaultLocale = "en";}localeCookieName = "joo.locale";}
    joo.ResourceBundleAwareClassLoader.INSTANCE = this;
    this[$super]();this.localeCookiePath=this.localeCookiePath();
    this.supportedLocales = supportedLocales;
    this.defaultLocale = defaultLocale;
    this.localeCookieName = localeCookieName;
  },

  "override protected function createClassDeclaration",function createClassDeclaration(packageDef/* : String*/, classDef/* : String*/, memberFactory/* : Function*/,
                                                     publicStaticMethodNames/* : Array*/, dependencies/* : Array*/)/*:SystemClassDeclaration*/ {
    var cd/* : ClassDeclaration*/ = this[$createClassDeclaration](packageDef, classDef, memberFactory, publicStaticMethodNames, dependencies)/*as ClassDeclaration*/;
    if (cd.fullClassName.match($$private.RESOURCE_BUNDLE_PATTERN)) {
      cd.getDependencies().push(this[$getLocalizedResourceClassName](cd));
    }
    return cd;
  },

  "public function createSingleton",function createSingleton(resourceBundle/*:Class*/)/*:Object*/ {
    var cd/*:NativeClassDeclaration*/ = resourceBundle['$class']/*as NativeClassDeclaration*/;
    var fullLocalizedClassName/*:String*/ = this[$getLocalizedResourceClassName](cd);
    var LocalizedResourceBundle/*:Class*/ = joo.getQualifiedObject(fullLocalizedClassName);
    return new LocalizedResourceBundle();
  },

  "private function escape",function escape(s/*:String*/)/*:String*/ {
    return s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
  },

  "private function readLocaleFromCookie",function readLocaleFromCookie()/*:String*/ {
    var cookieKey/* : String*/ = this[$escape](this.localeCookieName);
    var document/*:**/ = joo.getQualifiedObject("document");
    var match/* : Array*/ = document.cookie.match("(?:^|;)\\s*" + cookieKey + "=([^;]*)");
    return match ? decodeURIComponent(match[1]) : null;
  },

  "private function setCookie",function setCookie(name/*:String*/, value/*:String*/,
                             path/*:String = null*/,
                             expires/*:Date = null*/,
                             domain/*:String = null*/,
                             secure/*:Boolean = false*/)/*:void*/ {if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){path = null;}expires = null;}domain = null;}secure = false;}
    var document/*:**/ = joo.getQualifiedObject("document");
    document.cookie =
            name + "=" + encodeURIComponent(value) +
                    ((expires === null) ? "" : ("; expires=" + expires.toGMTString())) +
                    ((path === null) ? "" : ("; path=" + path)) +
                    ((domain === null) ? "" : ("; domain=" + domain)) +
                    (secure ? "; secure" : "");
  },

  "private function getLocaleCookieExpiry",function getLocaleCookieExpiry()/*:Date*/ {
    var date/*:Date*/ = new Date();
    date.setTime(date.getTime() + ($$private.DAYS_TILL_LOCALE_COOKIE_EXPIRY * 24 * 60 * 60 * 1000));
    return date;
  },

  "public function setLocale",function setLocale(locale/* :String*/ )/*:void*/ {
    this[$setCookie](this.localeCookieName, locale, this.localeCookiePath, this[$getLocaleCookieExpiry](), this.localeCookieDomain);
  },

  "public function getLocale",function getLocale()/*:String*/ {
    var userLocale/*:String*/ = this[$readLocaleFromCookie]();

    if (!userLocale) {
      var navigator/*:**/ = joo.getQualifiedObject("navigator");
      if (navigator) {
        userLocale = navigator['language'] || navigator['browserLanguage']
          || navigator['systemLanguage'] || navigator['userLanguage'];
        if (userLocale) {
          userLocale = userLocale.replace(/-/g, "_");
        }
      }
    }

    if (!userLocale) {
      userLocale = this.defaultLocale;
    }

    //find longest match
    var longestMatch/*:String*/ = "";
    for (var i/*:int*/ = 0; i < this.supportedLocales.length; i++) {
      if (userLocale.indexOf(this.supportedLocales[i]) === 0
        && this.supportedLocales[i].length > longestMatch.length) {
        longestMatch = this.supportedLocales[i];
      }
    }
    return longestMatch;
  },

  "private function getLocalizedResourceClassName",function getLocalizedResourceClassName(cd/*:NativeClassDeclaration*/)/*:String*/ {
    var localizedResourceClassName/*:String*/ = cd.fullClassName;
    var locale/*:String*/ = this.getLocale();
    if (locale && locale !== this.defaultLocale) {
      localizedResourceClassName += "_" + locale;
    }
    return localizedResourceClassName;
  },

];},[],["joo.DynamicClassLoader","Date"], "0.7.1", "0.7.5"
);new joo.DynamicClassLoader().debug = true;