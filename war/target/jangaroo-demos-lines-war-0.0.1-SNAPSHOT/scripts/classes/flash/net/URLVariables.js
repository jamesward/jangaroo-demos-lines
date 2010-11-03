joo.classLoader.prepare("package flash.net",/* {*/

/**
 * The URLVariables class allows you to transfer variables between a Flash� application and a server.
 * Use URLVariables objects with methods of the URLLoader class, with the data property of the URLRequest class,
 * and with flash.net package functions.
 * @see URLLoader
 */
"public class URLVariables",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   * Creates a new URLVariables object.
   * You pass URLVariables objects to the data property of URLRequest objects.
   * <p>If you call the URLVariables constructor with a string, the decode() method is automatically called to convert
   * the string to properties of the URLVariables object.
   * @param source (default = null) A URL-encoded string containing name/value pairs. 
   */
  "public function URLVariables",function $URLVariables(source/* : String = null*/) {if(arguments.length<1){source = null;}this[$super]();
    
  },

  /**
   * Converts the variable string to properties of the specified URLVariables object.
   * <p>This method is used internally by the URLVariables events. Most users do not need to call this method directly.
   * @param source A URL-encoded query string containing name/value pairs.
   * @throws Error The source parameter must be a URL-encoded query string containing name/value pairs.
   */
  "public function decode",function decode(source/* : String*/)/* : void*/ {
    
  },

  /**
   * Returns a string containing all enumerable variables, in the MIME content encoding application/x-www-form-urlencoded.
   * @return A URL-encoded string containing name/value pairs. 
   */
  "public function toString",function toString()/* : String*/ {
    return "";
  },
  
];},[],[], "0.7.1", "0.7.5"
);