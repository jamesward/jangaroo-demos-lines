joo.classLoader.prepare("package joo.flash",/* {

import flash.display.DisplayObject
import flash.display.Stage
import joo.classLoader
import joo.DynamicClassLoader
import joo.getQualifiedObject*/

"public class Run",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  "public static function main",function main(id/* : String*/, primaryDisplayObjectClassName/* : String*/)/* : void*/ {
    (joo.classLoader/*as DynamicClassLoader*/).import_(primaryDisplayObjectClassName);
    (joo.classLoader/*as DynamicClassLoader*/).complete(function joo$flash$Run$13_50()/* : void*/ {
      var stage/* : Stage*/ = flash.display.Stage.getInstance(id);
      var primaryDisplayObjectClass/* : Class*/ = joo.getQualifiedObject(primaryDisplayObjectClassName)/*as Class*/;
      stage.addChildAt(new primaryDisplayObjectClass()/*as DisplayObject*/, 0);
    });
  },

];},["main"],["flash.display.Stage"], "0.7.1", "0.7.5"
);