joo.classLoader.prepare("package js",/* {*/
"public interface Location",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ /*

  /**
   * The part of the URL that follows the # symbol, including the # symbol.
   * /
  native function hash()     :String;*/,/*
  /**
   * The part of the URL that follows the # symbol, including the # symbol.
   * /
  native function hash(value:String):void;*/,/*
  /**
   * The host name and port number.
   * /
  native function host()     :String;*/,/*
  /**
   * The host name and port number.
   * /
  native function host(value:String):void;*/,/*
  /**
   * The host name (without the port number or square brackets).
   * /
  native function hostname() :String;*/,/*
  /**
   * The host name (without the port number or square brackets).
   * /
  native function hostname(value:String):void;*/,/*
  /**
   * The entire URL.
   * /
  native function href()     :String;*/,/*
  /**
   * The entire URL.
   * /
  native function href(value:String):void;*/,/*
  /**
   * The path (relative to the host).
   * /
  native function pathname() :String;*/,/*
  /**
   * The path (relative to the host).
   * /
  native function pathname(value:String):void;*/,/*
  /**
   * The port number of the URL.
   * /
  native function port()     :String;*/,/*
  /**
   * The port number of the URL.
   * /
  native function port(value:String):void;*/,/*
  /**
   * The protocol of the URL.
   * /
  native function protocol() :String;*/,/*
  /**
   * The protocol of the URL.
   * /
  native function protocol(value:String):void;*/,/*
  /**
   * The part of the URL that follows the ? symbol, including the ? symbol.
   * /
  native function search()   :String;*/,/*
  /**
   * The part of the URL that follows the ? symbol, including the ? symbol.
   * /
  native function search(value:String):void;*/,/*

  /**
   * Load the document at the provided URL.
   * /
  native function assign(url:String):void;*/,/*

  /**
   * Reload the document from the current URL.
   * @param forceGet when true, causes the page to always be reloaded from the server. If false or not specified, the
   *   browser may reload the page from its cache.
   * /
  native function reload(forceGet:Boolean = false):void;*/,/*

  /**
   * Replace the current document with the one at the provided URL. The difference from the assign() method is that
   * after using replace() the current page will not be saved in session history, meaning the user won't be able to use
   * the Back button to navigate to it.
   * @param url the new URL to load the document from.
   * /
  native function replace(url:String):void;*/,/*

  /**
   * Returns the string representation of the Location object's URL. See the JavaScript reference for details.
   * /
  native function toString():String;*/,
];},[],[], "0.7.1", "0.7.5"
);