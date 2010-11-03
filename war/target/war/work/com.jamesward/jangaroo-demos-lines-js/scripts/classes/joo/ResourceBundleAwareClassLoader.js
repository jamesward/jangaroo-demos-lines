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
);