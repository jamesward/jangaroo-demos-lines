joo.classLoader.prepare("package flash.net",/* {*/
/**
 * A URLRequestHeader object encapsulates a single HTTP request header and consists of a name/value pair.
 * URLRequestHeader objects are used in the requestHeaders property of the URLRequest class.
 * <p>The following request headers cannot be used:
 * Accept-Ranges, Age, Allow, Allowed, Connection, Content-Length, Content-Location, Content-Range, ETag, Host,
 * Last-Modified, Location, Max-Forwards, Proxy-Authenticate, Proxy-Authorization, Public, Range, Retry-After,
 * Server, TE, Trailer, Transfer-Encoding, Upgrade, URI, Vary, Via, Warning, WWW-Authenticate, x-flash-version,
 * Referer, Get, Post, Put, Delete, Options, and Trace.
 * <p>URLRequestHeader objects are restricted in length. If the cumulative length of a URLRequestHeader object
 * (the length of the name property plus the value property) or an array of URLRequestHeader objects used in the
 * URLRequest.requestHeaders property exceeds the acceptable length, Adobe� Flash� Player throws an exception.
 * @see URLRequest
 * @see URLLoader 
 */
"public class URLRequestHeader",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   * An HTTP request header name (such as Content-Type or SOAPAction).
   */
  "public var",{ name/* : String*/: undefined},

  /**
   * The value associated with the name property (such as text/plain). 
   */
  "public var",{ value/* : String*/: undefined},

  /**
   * Creates a new URLRequestHeader object that encapsulates a single HTTP request header.
   * URLRequestHeader objects are used in the requestHeaders property of the URLRequest class.
   * @param name (default = "") An HTTP request header name (such as Content-Type or SOAPAction).
   * @param value (default = "") The value associated with the name property (such as text/plain). }
   */
  "public function URLRequestHeader",function $URLRequestHeader(name/*:String = ""*/, value/*:String = ""*/) {if(arguments.length<2){if(arguments.length<1){name = "";}value = "";}this[$super]();
    
  },

];},[],[], "0.7.1", "0.7.5"
);