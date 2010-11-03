joo.classLoader.prepare("package flash.text",/*
{
  import js.Element
  import flash.display.Graphics
  import flash.display.InteractiveObject
  //import flash.display.DisplayObject;
  //import flash.geom.Rectangle;
  //import flash.text.StyleSheet;
  //import flash.text.TextLineMetrics;

  /**
   * Flash Player dispatches the textInput event when a user enters one or more characters of text.
   * @eventType flash.events.TextEvent.TEXT_INPUT
   * /
  //[Event(name="textInput", type="flash.events.TextEvent")]

  /**
   * Dispatched by a TextField object after the user scrolls.
   * @eventType flash.events.Event.SCROLL
   * /
  [Event(name="scroll", type="flash.events.Event")] 

  /**
   * Dispatched when a user clicks a hyperlink in an HTML-enabled text field, where the URL begins with "event:".
   * @eventType flash.events.TextEvent.LINK
   * /
  //[Event(name="link", type="flash.events.TextEvent")]

  /**
   * Dispatched after a control value is modified, unlike the textInput event, which is dispatched before the value is modified.
   * @eventType flash.events.Event.CHANGE
   * /
  [Event(name="change", type="flash.events.Event")]*/ 

  /// The TextField class is used to create display objects for text display and input.
  "public class TextField extends flash.display.InteractiveObject",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$_backgroundColor=$$l+'_backgroundColor',$_border=$$l+'_border',$_borderColor=$$l+'_borderColor',$_defaultTextFormat=$$l+'_defaultTextFormat',$_htmlText=$$l+'_htmlText',$_text=$$l+'_text',$getElementName=$$l+'getElementName',$updateElementProperty=$$l+'updateElementProperty';return[function(){joo.classLoader.init(flash.text.TextFormatAlign,flash.text.TextFormat);}, 

    /// Creates a new TextField instance.
    "public function TextField",function $TextField () {
      this[$super]();
      this.defaultTextFormat = new flash.text.TextFormat();
    },

    /// When set to true and the text field is not in focus, Flash Player highlights the selection in the text field in gray.
    "public var",{ alwaysShowSelection/* : Boolean*/: undefined},

    /// The type of anti-aliasing used for this text field.
    "public var",{ antiAliasType/* : String*/: undefined},

    /// Controls automatic sizing and alignment of text fields.
    "public var",{ autoSize/* : String*/: undefined},

    /// Specifies whether the text field has a background fill.
    "public var",{ background/* : Boolean*/: undefined},

    /// The color of the text field background.
    "private var",{ _backgroundColor/* : uint*/: undefined},

    "public function get backgroundColor",function get$backgroundColor()/* : uint*/ {
      return this[$_backgroundColor];
    },

    "public function set backgroundColor",function set$backgroundColor(val/* : uint*/)/* : void*/ {
      this[$_backgroundColor] = val;
      this[$updateElementProperty]("style.backgroundColor", flash.display.Graphics.toRGBA(val));
    },

    /// Specifies whether the text field has a border.
    "private var",{ _border/* : Boolean*/: undefined},

    "public function get border",function get$border()/*:Boolean*/ {
      return this[$_border];
    },

    "public function set border",function set$border(val/*:Boolean*/)/*:void*/ {
      this[$_border] = val;
      this[$updateElementProperty]("style.borderWidth", val ? "1px" : "0");
    },

    /// The color of the text field border.
    "private var",{ _borderColor/* : uint*/: undefined},

    "public function get borderColor",function get$borderColor()/*:uint*/ {
      return this[$_borderColor];
    },

    "public function set borderColor",function set$borderColor(val/*:uint*/)/*:void*/ {
      this[$_borderColor] = val;
      this[$updateElementProperty]("style.borderColor", flash.display.Graphics.toRGBA(val));
    },

    /// An integer (1-based index) that indicates the bottommost line that is currently visible in the specified text field.
    "public var",{ bottomScrollV/* : int*/: undefined},

    /// The index of the insertion point (caret) position.
    "public var",{ caretIndex/* : int*/: undefined},

    /// A Boolean value that specifies whether extra white space (spaces, line breaks, and so on) in a text field with HTML text is removed.
    "public var",{ condenseWhite/* : Boolean*/: undefined},

    /// Specifies the format applied to newly inserted text, such as text inserted with the replaceSelectedText() method or text entered by a user.
    "private var",{ _defaultTextFormat/* : TextFormat*/: undefined},

    "public function get defaultTextFormat",function get$defaultTextFormat()/* : TextFormat*/ {
      return this[$_defaultTextFormat];
    },

    "public function set defaultTextFormat",function set$defaultTextFormat(val/* : TextFormat*/)/* : void*/ {
      this[$_defaultTextFormat] = val;
      this[$updateElementProperty]("style.fontFamily", val.font || "serif");
      this[$updateElementProperty]("style.fontSize",   val.size || "12px");
      this[$updateElementProperty]("style.color",      val.color ? flash.display.Graphics.toRGBA(val.color/*as uint*/) : "black");
      this[$updateElementProperty]("style.fontWeight", val.bold ? "bold" : "normal");
      this[$updateElementProperty]("style.textAlign",  val.align || flash.text.TextFormatAlign.LEFT);
      // TODO: listen to property changes of my defaultTextFormat object?
    },

    /// Specifies whether the text field is a password text field.
    "public var",{ displayAsPassword/* : Boolean*/: undefined},

    /// Specifies whether to render by using embedded font outlines.
    "public var",{ embedFonts/* : Boolean*/: undefined},

    /// The type of grid fitting used for this text field.
    "public var",{ gridFitType/* : String*/: undefined},

    "private var",{ _htmlText/* : String*/: undefined},

    /// Contains the HTML representation of the text field contents.
    "public function get htmlText",function get$htmlText()/*:String*/ {
      return this[$_htmlText];
    },

    /// Sets the HTML representation of the text field contents.
    "public function set htmlText",function set$htmlText(val/*:String*/)/*:void*/ {
      this[$_htmlText] = val;
      this[$updateElementProperty]("innerHTML", val);
    },

    /// The number of characters in a text field.
    "public var",{ length/* : int*/: undefined},

    /// The maximum number of characters that the text field can contain, as entered by a user.
    "public var",{ maxChars/* : int*/: undefined},

    /// The maximum value of scrollH.
    "public var",{ maxScrollH/* : int*/: undefined},

    /// The maximum value of scrollV.
    "public var",{ maxScrollV/* : int*/: undefined},

    /// A Boolean value that indicates whether Flash Player automatically scrolls multiline text fields when the user clicks a text field and rolls the mouse wheel.
    "public var",{ mouseWheelEnabled/* : Boolean*/: undefined},

    /// Indicates whether field is a multiline text field.
    "public var",{ multiline/* : Boolean*/: undefined},

    /// Defines the number of text lines in a multiline text field.
    "public var",{ numLines/* : int*/: undefined},

    /// Indicates the set of characters that a user can enter into the text field.
    "public var",{ restrict/* : String*/: undefined},

    /// The current horizontal scrolling position.
    "public var",{ scrollH/* : int*/: undefined},

    /// The vertical position of text in a text field.
    "public var",{ scrollV/* : int*/: undefined},

    /// A Boolean value that indicates whether the text field is selectable.
    "public var",{ selectable/* : Boolean*/: undefined},

    "public var",{ selectedText/* : String*/: undefined},

    /// The zero-based character index value of the first character in the current selection.
    "public var",{ selectionBeginIndex/* : int*/: undefined},

    /// The zero-based character index value of the last character in the current selection.
    "public var",{ selectionEndIndex/* : int*/: undefined},

    /// The sharpness of the glyph edges in this text field.
    "public var",{ sharpness/* : Number*/: undefined},

    /// Attaches a style sheet to the text field.
    //public var styleSheet : StyleSheet;

    /// A string that is the current text in the text field.
    "private var",{ _text/* : String*/: undefined},

    "public function get text",function get$text()/* : String*/ {
      return this[$_text];
    },

    "public function set text",function set$text(val/*:String*/)/* : void*/ {
      this[$_text] = val;
      //updateElementProperty("firstChild.data", val); TODO: does not work if TextNode does not yet exit!
      this[$updateElementProperty]("innerHTML", val.replace(/\n/g, '<br />'));
    },

    /// The color of the text in a text field, in hexadecimal format.
    "public var",{ _textColor/* : uint*/: undefined},

    "public function get textColor",function get$textColor()/* : uint*/ {
      return this._textColor;
    },

    "public function set textColor",function set$textColor(val/*:uint*/)/* : void*/ {
      this._textColor = val;
      this[$updateElementProperty]("style.color", flash.display.Graphics.toRGBA(val));
    },

    /// The height of the text in pixels.
    "public var",{ textHeight/* : Number*/: undefined},

    /// The width of the text in pixels.
    "public var",{ textWidth/* : Number*/: undefined},

    /// The thickness of the glyph edges in this text field.
    "public var",{ thickness/* : Number*/: undefined},

    /// The type of the text field.
    "public var",{ type/* : String*/: undefined},

    /// Specifies whether to copy and paste the text formatting along with the text.
    "public var",{ useRichTextClipboard/* : Boolean*/: undefined},

    /// A Boolean value that indicates whether the text field has word wrap.
    "public var",{ wordWrap/* : Boolean*/: undefined},

    /// Appends text to the end of the existing text of the TextField.
    //public function appendText (newText:String) : void;

    /// Returns a rectangle that is the bounding box of the character.
    //public function getCharBoundaries (charIndex:int) : Rectangle;

    /// Returns the zero-based index value of the character.
    //public function getCharIndexAtPoint (x:Number, y:Number) : int;

    /// The zero-based index value of the character.
    //public function getFirstCharInParagraph (charIndex:int) : int;

    /// Returns a DisplayObject reference for the given id, for an image or SWF file that has been added to an HTML-formatted text field by using an &lt;img&gt; tag.
    //public function getImageReference (id:String) : DisplayObject;

    /// The zero-based index value of the line at a specified point.
    //public function getLineIndexAtPoint (x:Number, y:Number) : int;

    /// The zero-based index value of the line containing the character that the the charIndex parameter specifies.
    //public function getLineIndexOfChar (charIndex:int) : int;

    /// Returns the number of characters in a specific text line.
    //public function getLineLength (lineIndex:int) : int;

    /// Returns metrics information about a given text line.
    //public function getLineMetrics (lineIndex:int) : TextLineMetrics;

    /// The zero-based index value of the first character in the line.
    //public function getLineOffset (lineIndex:int) : int;

    /// The text string contained in the specified line.
    //public function getLineText (lineIndex:int) : String;

    /// The zero-based index value of the character.
    //public function getParagraphLength (charIndex:int) : int;

    //public function getRawText () : String;

    /// Returns a TextFormat object.
    //public function getTextFormat (beginIndex:int = -1, endIndex:int = -1) : TextFormat;

    //public function getTextRuns (beginIndex:int = 0, endIndex:int = 2147483647) : Array;

    //public function getXMLText (beginIndex:int = 0, endIndex:int = 2147483647) : String;

    //public function insertXMLText (beginIndex:int = null, endIndex:int = null, richText:String = null, pasting:Boolean = false) : void;

    /// Replaces the current selection with the contents of the value parameter.
    //public function replaceSelectedText (value:String) : void;

    /// Replaces a range of characters.
    //public function replaceText (beginIndex:int, endIndex:int, newText:String) : void;

    /// Sets a new text selection.
    //public function setSelection (beginIndex:int, endIndex:int) : void;

    /// Applies text formatting.
    //public function setTextFormat (format:TextFormat = null, beginIndex:int = -1, endIndex:int = -1) : void;

    "override protected function getElementName",function getElementName()/*:String*/ {
      return "span";
    },

    "private function updateElementProperty",function updateElementProperty(propertyPath/* : String*/, value/* : Object*/)/* : void*/ {
      var element/* : Element*/ = this.getElement();
      if (element) {
        var propertyPathArcs/* : Array*/ = propertyPath.split(".");
        var lastIndex/* : uint*/ = propertyPathArcs.length - 1;
        for (var i/*:uint*/ =0; i<lastIndex; ++i) {
          element = element[propertyPathArcs[i]];
        }
        element[propertyPathArcs[lastIndex]] = value;
      }
    },

  ];},[],["flash.display.InteractiveObject","flash.text.TextFormat","flash.display.Graphics","flash.text.TextFormatAlign"], "0.7.1", "0.7.5"
);