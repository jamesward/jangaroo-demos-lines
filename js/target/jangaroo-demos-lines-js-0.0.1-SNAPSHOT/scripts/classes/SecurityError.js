joo.classLoader.prepare("package",/* {*/
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
);