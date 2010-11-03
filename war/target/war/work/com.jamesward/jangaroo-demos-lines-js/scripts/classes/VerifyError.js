joo.classLoader.prepare("package",/* {*/
/**
 * The VerifyError class represents an error that occurs when a malformed
 * or corrupted class or library file is encountered.
 *
 * @see flash.display.Loader Loader class
 * @see http://help.adobe.com/en_US/as3/dev/WS5b3ccc516d4fbf351e63e3d118a9b90204-7ecf.html Responding to error events and status
 */
"public class VerifyError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   * Creates a new VerifyError object.
   * @param message A string associated with the error.
   */
  "public function VerifyError",function $VerifyError(message/*:String = ""*/) {if(arguments.length<1){message = "";}
    this[$super](message);
  },
];},[],["Error"], "0.7.1", "0.7.5"
);