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
);