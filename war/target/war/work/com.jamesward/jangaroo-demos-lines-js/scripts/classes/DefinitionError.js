joo.classLoader.prepare("package",/* {*/
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
);