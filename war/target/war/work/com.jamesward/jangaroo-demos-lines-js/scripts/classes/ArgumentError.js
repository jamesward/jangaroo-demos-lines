joo.classLoader.prepare("package",/* {*/
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
);