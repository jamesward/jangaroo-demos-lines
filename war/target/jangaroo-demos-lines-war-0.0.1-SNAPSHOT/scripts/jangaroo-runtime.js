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
joo.classLoader.prepare(
"package joo",
"public class MemberDeclaration",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(RegExp,Error,Object);},
"public static const",{
METHOD_TYPE_GET:"get",
METHOD_TYPE_SET:"set",
MEMBER_TYPE_VAR:"var",
MEMBER_TYPE_CONST:"const",
MEMBER_TYPE_FUNCTION:"function",
MEMBER_TYPE_CLASS:"class",
MEMBER_TYPE_INTERFACE:"interface",
MEMBER_TYPE_NAMESPACE:"namespace",
NAMESPACE_PRIVATE:"private",
NAMESPACE_INTERNAL:"internal",
NAMESPACE_PROTECTED:"protected",
NAMESPACE_PUBLIC:"public",
STATIC:"static",
FINAL:"final",
NATIVE:"native",
OVERRIDE:"override",
VIRTUAL:"virtual"},
"private static var",{SUPPORTS_GETTERS_SETTERS: undefined},
"private static var",{DEFINE_METHOD: undefined},
"private static var",{LOOKUP_METHOD: undefined},function()
{
$$private.SUPPORTS_GETTERS_SETTERS="__defineGetter__"in Object['prototype'];
$$private.DEFINE_METHOD={
"get":"__defineGetter__",
"set":"__defineSetter__"
};
$$private.LOOKUP_METHOD={
"get":"__lookupGetter__",
"set":"__lookupSetter__"
};
},
"public static function create",function(memberDeclarationStr){
var tokens=memberDeclarationStr.split(/\s+/);
return tokens[0]=="import"?null
:new joo.MemberDeclaration(tokens);
},
"internal var",{
_namespace:function(){return(joo.MemberDeclaration.NAMESPACE_INTERNAL);},
_static:false,
_final:false,
_native:false,
_override:false,
_cloneFactory: undefined},
"public var",{
memberType: undefined,
getterOrSetter: undefined,
memberName: undefined,
slot: undefined,
value: undefined},
"public function MemberDeclaration",function(tokens){this[$super]();this._namespace=this._namespace();
for(var j=0;j<tokens.length;++j){
var token=tokens[j];
if(!this.memberType){
switch(token){
case joo.MemberDeclaration.STATIC:
case joo.MemberDeclaration.FINAL:
case joo.MemberDeclaration.NATIVE:
case joo.MemberDeclaration.OVERRIDE:
this["_"+token]=true;break;
case joo.MemberDeclaration.MEMBER_TYPE_VAR:
case joo.MemberDeclaration.MEMBER_TYPE_CONST:
case joo.MemberDeclaration.MEMBER_TYPE_FUNCTION:
case joo.MemberDeclaration.MEMBER_TYPE_CLASS:
this.memberType=token;break;
case joo.MemberDeclaration.VIRTUAL:
break;
default:
this._namespace=token;
}
}else{
if(this.isMethod()&&$$private.LOOKUP_METHOD[this.memberName]){
this.getterOrSetter=this.memberName;
}
this.memberName=token;
if(this.memberType===joo.MemberDeclaration.MEMBER_TYPE_CLASS){
break;
}
}
}
if(!this.memberType){
throw new Error("Missing member type in declaration '"+tokens.join(" ")+"'.");
}
},
"public function getQualifiedName",function(){
return this._namespace+"::"+this.memberName;
},
"public function isPrivate",function(){
return this._namespace==joo.MemberDeclaration.NAMESPACE_PRIVATE;
},
"public function isStatic",function(){
return this._static;
},
"public function isFinal",function(){
return this._final;
},
"public function isNative",function(){
return this._native;
},
"public function isOverride",function(){
return this._override;
},
"public function isMethod",function(){
return this.memberType==joo.MemberDeclaration.MEMBER_TYPE_FUNCTION;
},
"internal function initSlot",function(level){
this.slot=this.isPrivate()&&!this.isStatic()
?"$"+level+this.memberName
:this.memberName;
},
"public function getNativeMember",function(publicConstructor){
var target=this.isStatic()?publicConstructor:publicConstructor.prototype;
if(this.memberType==joo.MemberDeclaration.MEMBER_TYPE_FUNCTION&&this.getterOrSetter){
this.memberType=joo.MemberDeclaration.MEMBER_TYPE_VAR;
this.getterOrSetter=null;
}
try{
var member=target[this.memberName];
}catch(e){
}
if(typeof member!="function"){
var memberObject={};
memberObject[this.memberName]=member;
member=memberObject;
}
return member;
},
"public function hasOwnMember",function(target){
if(!this.getterOrSetter&&target.hasOwnProperty){
return target.hasOwnProperty(this.slot);
}
var value=this.retrieveMember(target);
if(value!==undefined&&target.constructor){
var superTarget=target.constructor.prototype;
var superValue=this.retrieveMember(superTarget);
if(value!==superValue){
return true;
}
}
return false;
},
"public function retrieveMember",function(target){
if(!target){
return undefined;
}
var slot=this.slot;
if(this.getterOrSetter){
if($$private.SUPPORTS_GETTERS_SETTERS){
return target[$$private.LOOKUP_METHOD[this.getterOrSetter]](slot);
}else{
slot=this.getterOrSetter+"$"+slot;
}
}
return target[slot];
},
"public function storeMember",function(target){
if(!this.isNative()){
var slot=this.slot;
if(this.getterOrSetter){
if($$private.SUPPORTS_GETTERS_SETTERS){
var oppositeMethodType=this.getterOrSetter==joo.MemberDeclaration.METHOD_TYPE_GET?joo.MemberDeclaration.METHOD_TYPE_SET:joo.MemberDeclaration.METHOD_TYPE_GET;
var counterpart=target[$$private.LOOKUP_METHOD[oppositeMethodType]](slot);
if(counterpart&&counterpart===target.constructor.prototype[$$private.LOOKUP_METHOD[oppositeMethodType]](slot)){
target[$$private.DEFINE_METHOD[oppositeMethodType]](slot,counterpart);
}
target[$$private.DEFINE_METHOD[this.getterOrSetter]](slot,this.value);
return;
}else{
slot=this.getterOrSetter+"$"+slot;
}
}
target[slot]=this.value;
}
},
"public function hasInitializer",function(){
return this.memberType!=joo.MemberDeclaration.MEMBER_TYPE_FUNCTION&&typeof this.value=="function"&&this.value.constructor!==RegExp;
},
"public function _getCloneFactory",function(){
if(!this._cloneFactory){
this._cloneFactory=function(){};
this._cloneFactory.prototype=this;
}
return this._cloneFactory;
},
"public function clone",function(changedProperties){
var CloneFactory=this._getCloneFactory();
var clone=new CloneFactory();
for(var m in changedProperties){
clone[m]=changedProperties[m];
}
return clone;
},
"public function toString",function(){
var sb=[this._namespace];
if(this._static){
sb.push(joo.MemberDeclaration.STATIC);
}
if(this._override){
sb.push(joo.MemberDeclaration.OVERRIDE);
}
sb.push(this.memberType);
if(this.getterOrSetter){
sb.push(this.getterOrSetter);
}
sb.push(this.memberName);
return sb.join(" ");
},
];},["create"],["Object","Error","RegExp"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(
"package joo",
"public class NativeClassDeclaration",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(Error);},
"internal static function createEmptyConstructor",function(constructor_){
var emptyConstructor=function(){
this.constructor=constructor_;
};
emptyConstructor.prototype=constructor_.prototype;
return emptyConstructor;
},
"public var",{
level:-1,
fullClassName: undefined,
constructor_: undefined,
publicConstructor: undefined,
completed:false,
inited:false,
Public: undefined,
superClassDeclaration: undefined,
interfaces: undefined},
"public function NativeClassDeclaration",function(){this[$super]();
},
"public function create",function(fullClassName,publicConstructor){
this.fullClassName=fullClassName;
this.publicConstructor=publicConstructor;
try{
this.publicConstructor["$class"]=this;
}catch(e){if(is(e,Error)){
}else throw e;}
return this;
},
"public function complete",function(){
if(!this.completed){
this.completed=true;
this.doComplete();
}
return this;
},
"private static const",{ERROR_CONSTRUCTOR:function(message){
this.message=message||"";
}},
"protected function doComplete",function(){
this.interfaces=[];
this.constructor_=this.publicConstructor===Error?$$private.ERROR_CONSTRUCTOR:this.publicConstructor;
this.Public=joo.NativeClassDeclaration.createEmptyConstructor(this.publicConstructor);
},
"public function init",function(){
if(!this.inited){
this.inited=true;
this.complete();
this.doInit();
}
return this;
},
"protected function doInit",function(){
},
"public function isInstance",function(object){
return object instanceof this.constructor_||object&&object.constructor===this.constructor_;
},
"public function getQualifiedName",function(){
return this.fullClassName.replace(/\.([^\.]+)^/,"::");
},
"public function toString",function(){
return this.fullClassName;
},
];},["createEmptyConstructor"],["Error"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(
"package joo",
"public class SystemClassDeclaration extends joo.NativeClassDeclaration",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$doComplete=$$l+'doComplete',$doInit=$$l+'doInit';return[function(){joo.classLoader.init(joo.MemberDeclaration,Object,Error);},
"protected static function createPublicConstructor",function(cd){
return function joo$SystemClassDeclaration$constructor(){
this.constructor=cd.publicConstructor;
cd.constructor_.apply(this,arguments);
};
},
"private static function is_",function(object,type){
if(!type||object===undefined||object===null){
return false;
}
if(object instanceof type||object.constructor===type){
return true;
}
if(type["$class"]){
return(type["$class"]).isInstance(object);
}
return false;
},
"private static function boundMethod",function(object,methodName){
return object['$$b_'+methodName]||
(object['$$b_'+methodName]=function(){
return object[methodName].apply(object,arguments);
});
},function()
{
var jooPackage=joo.getQualifiedObject("joo");
jooPackage["is"]=$$private.is_;
jooPackage["boundMethod"]=$$private.boundMethod;
},
"protected var",{
package_: undefined,
type:function(){return(joo.MemberDeclaration.MEMBER_TYPE_CLASS);},
namespace_:function(){return(joo.MemberDeclaration.NAMESPACE_INTERNAL);},
className: undefined,
native_:false,
extends_:"Object",
privateStatics: undefined,
memberDeclarations: undefined,
memberDeclarationsByQualifiedName: undefined,
staticInitializers: undefined,
publicStaticMethodNames: undefined},
"private static const",{DECLARATION_PATTERN_CLASS:/^\s*((public|internal|final|dynamic)\s+)*class\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.]+))?(\s+implements\s+([a-zA-Z$_0-9.,\s]+))?\s*$/},
"private static const",{DECLARATION_PATTERN_INTERFACE:/^\s*((public|internal)\s+)?interface\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.,\s]+))?\s*$/},
"private static const",{DECLARATION_PATTERN_NAMESPACE:/^\s*((public|internal)\s+)?namespace\s+([A-Za-z][a-zA-Z$_0-9]*)\s*$/},
"public function SystemClassDeclaration",function(packageDef,classDef,memberDeclarations,
publicStaticMethodNames){this[$super]();this.namespace_=this.namespace_();this.type=this.type();
var packageName=packageDef.split(/\s+/)[1]||"";
this.package_=joo.getOrCreatePackage(packageName);
var classMatch=classDef.match($$private.DECLARATION_PATTERN_CLASS);
var interfaces;
if(classMatch){
if(classMatch[5]){
this.extends_=classMatch[5];
}
interfaces=classMatch[7];
}else{
classMatch=classDef.match($$private.DECLARATION_PATTERN_INTERFACE);
if(classMatch){
this.type=joo.MemberDeclaration.MEMBER_TYPE_INTERFACE;
interfaces=classMatch[5];
}else{
classMatch=classDef.match($$private.DECLARATION_PATTERN_NAMESPACE);
if(classMatch){
this.type=joo.MemberDeclaration.MEMBER_TYPE_NAMESPACE;
}
}
}
if(!classMatch){
throw new Error("SyntaxError: \""+classDef+"\" does not match.");
}
this.namespace_=classMatch[2];
this.className=classMatch[3];
var fullClassName=this.className;
if(packageName){
fullClassName=packageName+"."+this.className;
}
this.interfaces=interfaces?interfaces.split(/\s*,\s*/):[];
this.memberDeclarations=memberDeclarations;
this.publicStaticMethodNames=publicStaticMethodNames;
var publicConstructor=joo.getQualifiedObject(fullClassName);
if(publicConstructor){
this.native_=true;
}else{
publicConstructor=joo.SystemClassDeclaration.createPublicConstructor(this);
this.package_[this.className]=publicConstructor;
}
this.create(fullClassName,publicConstructor);
this.privateStatics={};
},
"public function isClass",function(){
return this.type===joo.MemberDeclaration.MEMBER_TYPE_CLASS;
},
"public function isInterface",function(){
return this.type===joo.MemberDeclaration.MEMBER_TYPE_INTERFACE;
},
"public function isNamespace",function(){
return this.type===joo.MemberDeclaration.MEMBER_TYPE_NAMESPACE;
},
"public function isNative",function(){
return this.native_;
},
"protected override function doComplete",function(){
this.superClassDeclaration=joo.classLoader.getRequiredClassDeclaration(this.extends_);
this.superClassDeclaration.complete();
this.level=this.superClassDeclaration.level+1;
var Super=this.superClassDeclaration.Public;
if(!this.native_){
this.publicConstructor.prototype=new Super();
this.publicConstructor["superclass"]=this.publicConstructor.prototype;
}
this.Public=joo.NativeClassDeclaration.createEmptyConstructor(this.publicConstructor);
},
"protected function initMembers",function(){
this.staticInitializers=[];
var memberDeclarations=this.memberDeclarations("$"+this.level,this.privateStatics);
this.memberDeclarations=[];
this.memberDeclarationsByQualifiedName={};
this.constructor_=null;
for(var i=0;i<memberDeclarations.length;++i){
var item=memberDeclarations[i];
switch(typeof item){
case"undefined":
continue;
case"function":
this.staticInitializers.push(item);
break;
case"string":
var memberDeclaration=joo.MemberDeclaration.create(item);
if(memberDeclaration){
if(!memberDeclaration.isNative()){
if(++i>=memberDeclarations.length){
throw new Error(this+": Member expected after modifiers '"+item+"'.");
}
var member=memberDeclarations[i];
}
switch(memberDeclaration.memberType){
case joo.MemberDeclaration.MEMBER_TYPE_FUNCTION:
this.initMethod(memberDeclaration,member);
break;
case joo.MemberDeclaration.MEMBER_TYPE_CLASS:
var secondaryClass=joo.classLoader.prepare(this.package_+"."+this.className,item,member,
memberDeclarations[++i],[],joo.version);
this.privateStatics[memberDeclaration.memberName]=secondaryClass.publicConstructor;
break;
default:
for(var memberName in member){
this._storeMember(this._createMemberDeclaration(memberDeclaration,{memberName:memberName}),member[memberName]);
}
}
}
}
}
if(!this.isInterface()){
if(!this.native_){
this.publicConstructor.prototype["$"+this.level+"super"]=this.superClassDeclaration.constructor_;
}
if(!this.constructor_){
this.constructor_=this.native_?this.publicConstructor:this.superClassDeclaration.constructor_;
}
}
},
"protected function initMethod",function(memberDeclaration,member){
if(memberDeclaration.memberName==this.className&&!memberDeclaration.isStatic()){
if(memberDeclaration.getterOrSetter){
throw new Error(this+": Class name cannot be used for getter or setter: "+memberDeclaration);
}
this.constructor_=memberDeclaration.isNative()?this.publicConstructor:member;
}else{
memberDeclaration.initSlot(this.level);
if(memberDeclaration.isNative()){
member=memberDeclaration.getNativeMember(this.publicConstructor);
}
if(memberDeclaration.isMethod()){
if(this.extends_!="Object"){
var superMethod=memberDeclaration.retrieveMember(this.superClassDeclaration.Public.prototype);
}
var overrides=! !superMethod
&&superMethod!==member
&&superMethod!==Object['prototype'][memberDeclaration.memberName];
if(overrides!==memberDeclaration.isOverride()){
var msg=overrides
?"Method overrides without 'override' modifier"
:"Method with 'override' modifier does not override";
throw new Error(this+": "+msg+": "+memberDeclaration);
}
if(overrides){
this._storeMember(this._createMemberDeclaration(memberDeclaration,{_namespace:joo.MemberDeclaration.NAMESPACE_PRIVATE}),superMethod);
}
}
this._storeMember(memberDeclaration,member);
}
},
"protected function _createMemberDeclaration",function(memberDeclaration,changedProperties){
var newMemberDeclaration=memberDeclaration.clone(changedProperties);
newMemberDeclaration.initSlot(this.level);
return newMemberDeclaration;
},
"protected function _storeMember",function(memberDeclaration,value){
this.memberDeclarations.push(memberDeclaration);
this.memberDeclarationsByQualifiedName[memberDeclaration.getQualifiedName()]=memberDeclaration;
memberDeclaration.value=value;
var _static=memberDeclaration.isStatic();
var _private=memberDeclaration.isPrivate();
var target=_static?_private?this.privateStatics:this.publicConstructor:this.publicConstructor.prototype;
if(!target){
target={};
}
if(!memberDeclaration.hasOwnMember(target)){
memberDeclaration.storeMember(target);
if(memberDeclaration.hasInitializer()){
if(_static){
this.staticInitializers.push(memberDeclaration);
}
}
}
},
"protected override function doInit",function(){
this.superClassDeclaration.init();
this.initMembers();
for(var i=0;i<this.staticInitializers.length;++i){
var staticInitializer=this.staticInitializers[i];
if(typeof staticInitializer=="function"){
staticInitializer();
}else{
var target=staticInitializer.isPrivate()?this.privateStatics:this.publicConstructor;
target[staticInitializer.slot]=target[staticInitializer.slot]();
}
}
},
"public function getMemberDeclaration",function(namespace_,memberName){
var memberDeclaration=this.memberDeclarationsByQualifiedName[namespace_+"::"+memberName];
return!memberDeclaration&&this.superClassDeclaration&&this.superClassDeclaration["getMemberDeclaration"]
?(this.superClassDeclaration).getMemberDeclaration(namespace_,memberName)
:memberDeclaration;
},
];},[],["joo.NativeClassDeclaration","joo.MemberDeclaration","Error","Object"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(
"package joo",
"public class SystemClassLoader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[function(){joo.classLoader.init(joo.NativeClassDeclaration,Error,joo.SystemClassDeclaration);},function()
{
joo.classLoader=new joo.SystemClassLoader();
},
"public static const",{classDeclarationsByName:function(){return({});}},
"public var",{debug:false},
"public function SystemClassLoader",function(){this[$super]();
},
"public function prepare",function(packageDef,classDef,memberFactory,
publicStaticMethodNames,dependencies,version){
var cd=this.createClassDeclaration(packageDef,classDef,memberFactory,publicStaticMethodNames,dependencies);
if(version!==joo.version){
throw new Error("Runtime version "+joo.version+" and class version "+version
+" of "+cd.fullClassName+" do not match. "
+"Please recompile with the correct compiler version or replace jangaroo-runtime[-debug].js.");
}
joo.SystemClassLoader.classDeclarationsByName[cd.fullClassName]=cd;
return cd;
},
"protected function createClassDeclaration",function(packageDef,classDef,memberFactory,
publicStaticMethodNames,dependencies){
return new joo.SystemClassDeclaration(packageDef,classDef,memberFactory,publicStaticMethodNames).init();
},
"public function getClassDeclaration",function(fullClassName){
var cd=joo.SystemClassLoader.classDeclarationsByName[fullClassName];
if(!cd){
var constructor_=joo.getQualifiedObject(fullClassName);
if(constructor_){
if(!constructor_["$class"]){
cd=this.createNativeClassDeclaration(fullClassName,constructor_).init();
joo.SystemClassLoader.classDeclarationsByName[fullClassName]=cd;
}else{
cd=constructor_["$class"];
}
}
}
return cd;
},
"public function getRequiredClassDeclaration",function(className){
var cd=this.getClassDeclaration(className);
if(!cd){
throw new Error("Class not found: "+className);
}
return cd;
},
"protected function createNativeClassDeclaration",function(fullClassName,nativeClass){
return new joo.NativeClassDeclaration().create(fullClassName,nativeClass);
},
"public function init",function(){var classes=arguments;
return null;
},
];},[],["Error","joo.SystemClassDeclaration","joo.NativeClassDeclaration"], "0.7.1", "0.7.5"
);joo.classLoader.prepare("package",
"public class ArgumentError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function ArgumentError",function(message){if(arguments.length<1){message="";}
this[$super](message);
},
];},[],["Error"], "0.7.1", "0.7.5"
);joo.classLoader.prepare("package",
"public class DefinitionError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function DefinitionError",function(message){if(arguments.length<1){message="";}
this[$super](message);
},
];},[],["Error"], "0.7.1", "0.7.5"
);joo.classLoader.prepare("package",
"public class SecurityError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function SecurityError",function(message){if(arguments.length<1){message="";}
this[$super](message);
},
];},[],["Error"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(
"package",
"public dynamic class Array extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public static const",{CASEINSENSITIVE:1},
"public static const",{DESCENDING:2},
"public static const",{NUMERIC:16},
"public static const",{RETURNINDEXEDARRAY:8},
"public static const",{UNIQUESORT:4},
"public native function get length",
"public native function set length",
"public native function Array",
"public native function concat",
"public function every",function(callback,thisObject){if(arguments.length<2){thisObject=null;}
var i=0,
j=this.length;
if(thisObject){
for(;i<j;i++){
if(i in this){
if(!callback.call(thisObject,this[i],i,this)){
return false;
}
}
}
}else{
for(;i<j;i++){
if(i in this){
if(!callback(this[i],i,this)){
return false;
}
}
}
}
return true;
},
"public function filter",function(callback,thisObject){
var len=this.length;
var res=[];
var i=0;
var val;
if(thisObject){
for(;i<len;i++){
if(i in this){
val=this[i];
if(callback.call(thisObject,val,i,this)){
res.push(val);
}
}
}
}else{
for(;i<len;i++){
if(i in this){
val=this[i];
if(callback(val,i,this)){
res.push(val);
}
}
}
}
return res;
},
"public function forEach",function(callback,thisObject){
var i=0,
j=this.length;
if(thisObject){
for(;i<j;i++){
if(i in this){
callback.call(thisObject,this[i],i,this);
}
}
}else{
for(;i<j;i++){
if(i in this){
callback(this[i],i,this);
}
}
}
},
"public function indexOf",function(searchElement,fromIndex){if(arguments.length<2){fromIndex=0;}
var len=this.length;
for(var i=(fromIndex<0)?Math.max(0,len+fromIndex):fromIndex||0;i<len;i++){
if(searchElement===this[i])
return i;
}
return-1;
},
"public native function join",
"public function lastIndexOf",function(searchElement,fromIndex){if(arguments.length<2){fromIndex=0x7fffffff;}
var len=this.length;
for(var i=((fromIndex<0)?Math.max(len,len-fromIndex):fromIndex||len)-1;i>=0;i--){
if(searchElement===this[i])
return i;
}
return-1;
},
"public function map",function(callback,thisObject){if(arguments.length<2){thisObject=null;}
var results=[];
var i=0,
j=this.length;
if(thisObject){
for(;i<j;i++){
results[i]=callback.call(thisObject,this[i],i,this);
}
}else{
for(;i<j;i++){
results[i]=callback(this[i],i,this);
}
}
return results;
},
"public native function pop",
"public native function push",
"public native function reverse",
"public native function shift",
"public native function slice",
"public function some",function(callback,thisObject){if(arguments.length<2){thisObject=null;}
var i=0,
j=this.length;
if(thisObject){
for(;i<j;i++){
if(i in this){
if(callback.call(thisObject,this[i],i,this)){
return true;
}
}
}
}else{
for(;i<j;i++){
if(i in this){
if(callback(this[i],i,this)){
return true;
}
}
}
}
return false;
},
"public native function sort",
"public native function splice",
"public native function toLocaleString",
"public native function toString",
"public native function unshift",
];},[],["Object","Math"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(
"package",
"public dynamic class Date extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public native function Date",
"public function get date",function(){return this.getDate();},
"public function set date",function(value){this.setDate(value);},
"public function get dateUTC",function(){return this.getUTCDate();},"public function set dateUTC",function(value){this.setUTCDate(value);},
"public native function get day",
"public native function get dayUTC",
"public function get fullYear",function(){return this.getFullYear();},
"public function set fullYear",function(value){this.setFullYear(value);},
"public function get fullYearUTC",function(){return this.getUTCFullYear();},
"public function set fullYearUTC",function(value){this.setUTCFullYear(value);},
"public function get hours",function(){return this.getHours();},
"public function set hours",function(value){this.setHours(value);},
"public function get hoursUTC",function(){return this.getUTCHours();},
"public function set hoursUTC",function(value){this.setUTCHours(value);},
"public function get milliseconds",function(){return this.getMilliseconds();},
"public function set milliseconds",function(value){this.setMilliseconds(value);},
"public function get millisecondsUTC",function(){return this.getUTCMilliseconds();},
"public function set millisecondsUTC",function(value){this.setUTCMilliseconds(value);},
"public function get minutes",function(){return this.getMinutes();},
"public function set minutes",function(value){this.setMinutes(value);},
"public function get minutesUTC",function(){return this.getUTCMinutes();},
"public function set minutesUTC",function(value){this.setUTCMinutes(value);},
"public function get month",function(){return this.getMonth();},
"public function set month",function(value){this.setMonth(value);},
"public function get monthUTC",function(){return this.getUTCMonth();},
"public function set monthUTC",function(value){this.setUTCMonth(value);},
"public function get seconds",function(){return this.getSeconds();},
"public function set seconds",function(value){this.setSeconds(value);},
"public function get secondsUTC",function(){return this.getUTCSeconds();},
"public function set secondsUTC",function(value){this.setUTCSeconds(value);},
"public function get time",function(){return this.getTime();},
"public function set time",function(value){this.setTime(value);},
"public native function get timezoneOffset",
"public native function getDate",
"public native function getDay",
"public native function getFullYear",
"public native function getHours",
"public native function getMilliseconds",
"public native function getMinutes",
"public native function getMonth",
"public native function getSeconds",
"public native function getTime",
"public native function getTimezoneOffset",
"public native function getUTCDate",
"public native function getUTCDay",
"public native function getUTCFullYear",
"public native function getUTCHours",
"public native function getUTCMilliseconds",
"public native function getUTCMinutes",
"public native function getUTCMonth",
"public native function getUTCSeconds",
"public static native function parse",
"public native function setDate",
"public native function setFullYear",
"public native function setHours",
"public native function setMilliseconds",
"public native function setMinutes",
"public native function setMonth",
"public native function setSeconds",
"public native function setTime",
"public native function setUTCDate",
"public native function setUTCFullYear",
"public native function setUTCHours",
"public native function setUTCMilliseconds",
"public native function setUTCMinutes",
"public native function setUTCMonth",
"public native function setUTCSeconds",
"public native function toDateString",
"public native function toLocaleDateString",
"public native function toLocaleString",
"public native function toLocaleTimeString",
"public native function toString",
"public native function toTimeString",
"public native function toUTCString",
"public native static function UTC",
"public native function valueOf",
"public native function getYear",
"public native function setYear",
"public native function toGMTString",
];},[],["Object"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(
"package joo",
"public class ClassDeclaration extends joo.SystemClassDeclaration",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$dependencies=$$l+'dependencies',$doComplete=$$l+'doComplete',$createInitializingStaticMethod=$$l+'createInitializingStaticMethod',$deleteInitializingStaticMethod=$$l+'deleteInitializingStaticMethod',$doInit=$$l+'doInit',$isInstance=$$l+'isInstance';return[
"private var",{dependencies: undefined},
"public function ClassDeclaration",function(packageDef,classDef,memberDeclarations,
publicStaticMethods,dependencies){
this[$super](packageDef,classDef,memberDeclarations,publicStaticMethods);
this[$dependencies]=dependencies;
},
"public function getDependencies",function(){
return this[$dependencies];
},
"override protected function doComplete",function(){
this[$doComplete]();
$$private.createInitializingConstructor(this);
this.publicStaticMethodNames.forEach($$bound(this,$createInitializingStaticMethod));
},
"private static function createInitializingConstructor",function(classDeclaration){
classDeclaration.constructor_=function(){
classDeclaration.init();
classDeclaration.constructor_.apply(this,arguments);
};
},
"private function createInitializingStaticMethod",function(methodName){
var classDeclaration=this;
classDeclaration.publicConstructor[methodName]=function(){
classDeclaration.init();
return classDeclaration.publicConstructor[methodName].apply(null,arguments);
};
},
"private function deleteInitializingStaticMethod",function(methodName){
delete this.publicConstructor[methodName];
},
"protected override function doInit",function(){
this.publicStaticMethodNames.forEach($$bound(this,$deleteInitializingStaticMethod));
this[$doInit]();
this.interfaces.forEach(function(interface_,i,interfaces){
interfaces[i]=joo.classLoader.getRequiredClassDeclaration(interface_);
interfaces[i].init();
});
},
"public override function isInstance",function(object){
return typeof object=="object"&&object.constructor["$class"]?this.isAssignableFrom(object.constructor["$class"]):false;
},
"protected function isAssignableFrom",function(cd){
do{
if(this===cd){
return true;
}
if(this.isInterface()){
if(cd.interfaces.some($$bound(this,"isAssignableFrom"))){
return true;
}
}
cd=cd.superClassDeclaration;
}while(cd);
return false;
},
];},[],["joo.SystemClassDeclaration"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(
"package joo",
"public class StandardClassLoader extends joo.SystemClassLoader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$imports=$$l+'imports',$createClassDeclaration=$$l+'createClassDeclaration',$init=$$l+'init';return[function(){joo.classLoader.init(joo.ClassDeclaration);},
"private static var",{classDeclarations:function(){return([]);}},
"private var",{imports: undefined},
"public function StandardClassLoader",function(){this[$super]();
this[$imports]=[];
},
"override protected function createClassDeclaration",function(packageDef,classDef,memberFactory,
publicStaticMethodNames,dependencies){
var cd=new joo.ClassDeclaration(packageDef,classDef,memberFactory,publicStaticMethodNames,dependencies);
$$private.classDeclarations.push(cd);
return cd;
},
"public function loadScript",function(uri){
var joo__loadScript=joo.getQualifiedObject("joo__loadScript");
if(joo__loadScript){
joo__loadScript(uri);
return{};
}
var document=joo.getQualifiedObject("document");
var script=document.createElement("script");
script.type="text/javascript";
document.getElementsByTagName("HEAD")[0].appendChild(script);
script.src=uri;
return script;
},
"public function import_",function(fullClassName){
this[$imports].push(fullClassName);
},
"public function run",function(mainClassName){var $this=this;var args=Array.prototype.slice.call(arguments,1);
this.complete(function(){
var mainClass=$this.getRequiredClassDeclaration(mainClassName);
mainClass.publicConstructor["main"].apply(null,args);
});
},
"public override function init",function(){var classes=arguments;
var clazz;
for(var i=0;i<classes.length;++i){
if("$class"in classes[i]){
((clazz=classes[i])["$class"]).init();
}
}
return clazz;
},
"public function complete",function(onCompleteCallback){
this.completeAll();
if(onCompleteCallback){
this.doCompleteCallbacks([onCompleteCallback]);
}
},
"protected function completeAll",function(){
$$private.classDeclarations.forEach(function(classDeclaration){
classDeclaration.complete();
if(classDeclaration.isNative()){
classDeclaration.init();
}
});
},
"protected function doCompleteCallbacks",function(onCompleteCallbacks){
if(onCompleteCallbacks.length){
var importMap={};
this[$imports].forEach(function(fullClassName){
var className=fullClassName.substring(fullClassName.lastIndexOf(".")+1);
importMap[className]=joo.classLoader.getRequiredClassDeclaration(fullClassName).init().publicConstructor;
});
for(var i=0;i<onCompleteCallbacks.length;++i){
(onCompleteCallbacks[i])(importMap);
}
}
},
];},[],["joo.SystemClassLoader","joo.ClassDeclaration"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(
"package joo",
"public class DynamicClassLoader extends joo.StandardClassLoader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$onCompleteCallbacks=$$l+'onCompleteCallbacks',$pendingDependencies=$$l+'pendingDependencies',$pendingClassState=$$l+'pendingClassState',$prepare=$$l+'prepare',$doCompleteCallbacks=$$l+'doCompleteCallbacks',$internalDoCompleteCallbacks=$$l+'internalDoCompleteCallbacks',$createClassLoadErrorHandler=$$l+'createClassLoadErrorHandler',$import_=$$l+'import_',$run=$$l+'run',$load=$$l+'load',$determineUrlPrefix=$$l+'determineUrlPrefix',$complete=$$l+'complete',$loadPendingDependencies=$$l+'loadPendingDependencies';return[
"public static const",{STANDARD_URL_PREFIX:"scripts/classes/"},
"private static function isEmpty",function(object){
for(var m in object){
return false;
}
return true;
},
"public static var",{INSTANCE: undefined},
"public var",{urlPrefix: undefined},
"private var",{onCompleteCallbacks:function(){return([]);}},
"public function DynamicClassLoader",function(){this[$super]();this[$onCompleteCallbacks]=this[$onCompleteCallbacks]();this[$pendingDependencies]=this[$pendingDependencies]();this[$pendingClassState]=this[$pendingClassState]();
this.debug=joo.classLoader.debug;
this.urlPrefix=joo.classLoader['urlPrefix'];
joo.classLoader=joo.DynamicClassLoader.INSTANCE=this;
if(!this.urlPrefix){
this.urlPrefix=this[$determineUrlPrefix]();
}
},
"private var",{pendingDependencies:function(){return([]);}},
"private var",{pendingClassState:function(){return({});}},
"override public function prepare",function(packageDef,classDef,memberFactory,publicStaticMethodNames,dependencies,version){
var cd=this[$prepare](packageDef,classDef,memberFactory,publicStaticMethodNames,dependencies,version);
this[$pendingDependencies].push(cd);
if(delete this[$pendingClassState][cd.fullClassName]){
if(this.debug){
trace("prepared class "+cd.fullClassName+", removed from pending classes.");
}
if(this[$onCompleteCallbacks].length){
this[$loadPendingDependencies]();
if($$private.isEmpty(this[$pendingClassState])){
this.doCompleteCallbacks(this[$onCompleteCallbacks]);
}
}
}
return cd;
},
"override protected function doCompleteCallbacks",function(onCompleteCallbacks){var $this=this;
this[$onCompleteCallbacks]=[];
joo.getQualifiedObject("setTimeout")(function(){
$this.completeAll();
$this[$internalDoCompleteCallbacks](onCompleteCallbacks);
},0);
},
"private function internalDoCompleteCallbacks",function(onCompleteCallbacks){
this[$doCompleteCallbacks](onCompleteCallbacks);
},
"private function createClassLoadErrorHandler",function(fullClassName,url){var $this=this;
return function(){
$this.classLoadErrorHandler(fullClassName,url);
};
},
"public function classLoadErrorHandler",function(fullClassName,url){
trace("Class "+fullClassName+" not found at URL ["+url+"].");
},
"public override function import_",function(fullClassName){
this[$import_](fullClassName);
this[$load](fullClassName);
},
"override public function run",function(mainClassName){var args=Array.prototype.slice.call(arguments,1);
this[$load](mainClassName);
args.splice(0,0,mainClassName);
this[$run].apply(this,args);
},
"private function load",function(fullClassName){
if(!this.getClassDeclaration(fullClassName)){
if(this[$onCompleteCallbacks].length==0){
if(this[$pendingClassState][fullClassName]===undefined){
this[$pendingClassState][fullClassName]=false;
if(this.debug){
trace("added to pending classes: "+fullClassName+".");
}
}
}else{
if(this[$pendingClassState][fullClassName]!==true){
this[$pendingClassState][fullClassName]=true;
var url=this.getUri(fullClassName);
if(this.debug){
trace("triggering to load class "+fullClassName+" from URL "+url+".");
}
var script=this.loadScript(url);
script.onerror=this[$createClassLoadErrorHandler](fullClassName,script['src']);
}
}
}
},
"protected function getBaseUri",function(){
return this.urlPrefix;
},
"private function determineUrlPrefix",function(){var RUNTIME_URL_PATTERN=/^(.*)\bjangaroo-runtime[^.]*\.js$/;
var document=joo.getQualifiedObject("document");
if(document){
var scripts=document["getElementsByTagName"]("SCRIPT");
for(var i=0;i<scripts.length;++i){
var match=RUNTIME_URL_PATTERN.exec(scripts[i].src);
if(match){
var code=scripts[i]["innerHTML"];
if(code&&code.length){
joo.getQualifiedObject("setTimeout")(function(){
joo.getQualifiedObject("eval")(code);
},0);
}
return match[1]+"classes/";
}
}
}
if(this.debug){
trace("WARNING: no joo.classLoader.urlPrefix set and Jangaroo Runtime script element not found. "
+"Falling back to standard urlPrefix '"+joo.DynamicClassLoader.STANDARD_URL_PREFIX+"'.");
}
return joo.DynamicClassLoader.STANDARD_URL_PREFIX;
},
"protected function getUri",function(fullClassName){
var baseUri=this.getBaseUri();
return baseUri+fullClassName.replace(/\./g,"/")+".js";
},
"public override function complete",function(onCompleteCallback){
if(onCompleteCallback||this[$onCompleteCallbacks].length==0){
this[$onCompleteCallbacks].push(onCompleteCallback||$$private.defaultOnCompleteCallback);
}
this[$loadPendingDependencies]();
if($$private.isEmpty(this[$pendingClassState])){
this[$complete](onCompleteCallback);
}else{
for(var c in this[$pendingClassState]){
this[$load](c);
}
}
},
"private static function defaultOnCompleteCallback",function(){
trace("All classes loaded!");
},
"private function loadPendingDependencies",function(){
for(var j=0;j<this[$pendingDependencies].length;++j){
var dependencies=(this[$pendingDependencies][j]).getDependencies();
for(var i=0;i<dependencies.length;++i){
this[$load](dependencies[i]);
}
}
this[$pendingDependencies]=[];
},
];},[],["joo.StandardClassLoader"], "0.7.1", "0.7.5"
);joo.classLoader.prepare(
"package joo",
"public class ResourceBundleAwareClassLoader extends joo.DynamicClassLoader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$createClassDeclaration=$$l+'createClassDeclaration',$escape=$$l+'escape',$readLocaleFromCookie=$$l+'readLocaleFromCookie',$setCookie=$$l+'setCookie',$getLocaleCookieExpiry=$$l+'getLocaleCookieExpiry',$getLocalizedResourceClassName=$$l+'getLocalizedResourceClassName';return[function(){joo.classLoader.init(Date);},
"private static const",{DAYS_TILL_LOCALE_COOKIE_EXPIRY:10*356},
"private static const",{RESOURCE_BUNDLE_PATTERN:/_properties$/},
"public var",{supportedLocales: undefined},
"public var",{defaultLocale: undefined},
"public var",{localeCookieName: undefined},
"public var",{localeCookiePath:function(){return(joo.getQualifiedObject("location.pathname"));}},
"public var",{localeCookieDomain:null},
"public static var",{INSTANCE: undefined},
"public function ResourceBundleAwareClassLoader",function(supportedLocales,defaultLocale,localeCookieName){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){supportedLocales=["en"];}defaultLocale="en";}localeCookieName="joo.locale";}
joo.ResourceBundleAwareClassLoader.INSTANCE=this;
this[$super]();this.localeCookiePath=this.localeCookiePath();
this.supportedLocales=supportedLocales;
this.defaultLocale=defaultLocale;
this.localeCookieName=localeCookieName;
},
"override protected function createClassDeclaration",function(packageDef,classDef,memberFactory,
publicStaticMethodNames,dependencies){
var cd=this[$createClassDeclaration](packageDef,classDef,memberFactory,publicStaticMethodNames,dependencies);
if(cd.fullClassName.match($$private.RESOURCE_BUNDLE_PATTERN)){
cd.getDependencies().push(this[$getLocalizedResourceClassName](cd));
}
return cd;
},
"public function createSingleton",function(resourceBundle){
var cd=resourceBundle['$class'];
var fullLocalizedClassName=this[$getLocalizedResourceClassName](cd);
var LocalizedResourceBundle=joo.getQualifiedObject(fullLocalizedClassName);
return new LocalizedResourceBundle();
},
"private function escape",function(s){
return s.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1");
},
"private function readLocaleFromCookie",function(){
var cookieKey=this[$escape](this.localeCookieName);
var document=joo.getQualifiedObject("document");
var match=document.cookie.match("(?:^|;)\\s*"+cookieKey+"=([^;]*)");
return match?decodeURIComponent(match[1]):null;
},
"private function setCookie",function(name,value,
path,
expires,
domain,
secure){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){path=null;}expires=null;}domain=null;}secure=false;}
var document=joo.getQualifiedObject("document");
document.cookie=
name+"="+encodeURIComponent(value)+
((expires===null)?"":("; expires="+expires.toGMTString()))+
((path===null)?"":("; path="+path))+
((domain===null)?"":("; domain="+domain))+
(secure?"; secure":"");
},
"private function getLocaleCookieExpiry",function(){
var date=new Date();
date.setTime(date.getTime()+($$private.DAYS_TILL_LOCALE_COOKIE_EXPIRY*24*60*60*1000));
return date;
},
"public function setLocale",function(locale){
this[$setCookie](this.localeCookieName,locale,this.localeCookiePath,this[$getLocaleCookieExpiry](),this.localeCookieDomain);
},
"public function getLocale",function(){
var userLocale=this[$readLocaleFromCookie]();
if(!userLocale){
var navigator=joo.getQualifiedObject("navigator");
if(navigator){
userLocale=navigator['language']||navigator['browserLanguage']
||navigator['systemLanguage']||navigator['userLanguage'];
if(userLocale){
userLocale=userLocale.replace(/-/g,"_");
}
}
}
if(!userLocale){
userLocale=this.defaultLocale;
}
var longestMatch="";
for(var i=0;i<this.supportedLocales.length;i++){
if(userLocale.indexOf(this.supportedLocales[i])===0
&&this.supportedLocales[i].length>longestMatch.length){
longestMatch=this.supportedLocales[i];
}
}
return longestMatch;
},
"private function getLocalizedResourceClassName",function(cd){
var localizedResourceClassName=cd.fullClassName;
var locale=this.getLocale();
if(locale&&locale!==this.defaultLocale){
localizedResourceClassName+="_"+locale;
}
return localizedResourceClassName;
},
];},[],["joo.DynamicClassLoader","Date"], "0.7.1", "0.7.5"
);joo.classLoader = new joo.DynamicClassLoader();