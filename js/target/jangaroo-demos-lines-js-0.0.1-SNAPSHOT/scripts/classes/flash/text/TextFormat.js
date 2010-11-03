joo.classLoader.prepare("package flash.text",/* {*/

/**
 * The TextFormat class represents character formatting information.
 */
"public class TextFormat extends Object",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[ 

  /**
   * Creates a TextFormat object with the specified properties.
   */
  "public function TextFormat",function $TextFormat(font/*:String = null*/, size/*:Object = null*/, color/*:Object = null*/,
                             bold/*:Object = null*/, italic/*:Object = null*/, underline/*:Object = null*/,
                             url/*:String = null*/, target/*:String = null*/, align/*:String = null*/,
                             leftMargin/*:Object = null*/, rightMargin/*:Object = null*/,
                             indent/*:Object = null*/, leading/*:Object = null*/) {if(arguments.length<13){if(arguments.length<12){if(arguments.length<11){if(arguments.length<10){if(arguments.length<9){if(arguments.length<8){if(arguments.length<7){if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){if(arguments.length<2){if(arguments.length<1){font = null;}size = null;}color = null;}bold = null;}italic = null;}underline = null;}url = null;}target = null;}align = null;}leftMargin = null;}rightMargin = null;}indent = null;}leading = null;}this[$super]();
    this.align = align;
    this.blockIndent = this.blockIndent;
    this.bold = bold;
    this.bullet = this.bullet;
    this.color = color;
    this.display = this.display;
    this.font = font;
    this.indent = indent;
    this.italic = italic;
    this.kerning = this.kerning;
    this.leading = leading;
    this.leftMargin = leftMargin;
    this.letterSpacing = this.letterSpacing;
    this.rightMargin = rightMargin;
    this.size = size;
    this.tabStops = this.tabStops;
    this.target = target;
    this.underline = underline;
    this.url = url;
  },

  /** Indicates the alignment of the paragraph. */
  "public var",{ align/* : String*/: undefined},

  /** Indicates the block indentation in pixels. */
  "public var",{ blockIndent/* : Object*/: undefined},

  /** Specifies whether the text is boldface. */
  "public var",{ bold/* : Object*/: undefined},

  /** Indicates that the text is part of a bullet list. */
  "public var",{ bullet/* : Object*/: undefined},

  /** Indicates the color of the text. */
  "public var",{ color/* : Object*/: undefined},

  "public var",{ display/* : String*/: undefined},

  /** The name of the font for text in this text format, as a string. */
  "public var",{ font/* : String*/: undefined},

  /** Indicates the indentation from the left margin to the first character in the paragraph. */
  "public var",{ indent/* : Object*/: undefined},

  /** Indicates whether text in this text format is italicized. */
  "public var",{ italic/* : Object*/: undefined},

  /** A Boolean value that indicates whether kerning is enabled (true) or disabled (false). */
  "public var",{ kerning/* : Object*/: undefined},

  /** An integer representing the amount of vertical space (called leading) between lines. */
  "public var",{ leading/* : Object*/: undefined},

  /** The left margin of the paragraph, in pixels. */
  "public var",{ leftMargin/* : Object*/: undefined},

  /** A number representing the amount of space that is uniformly distributed between all characters. */
  "public var",{ letterSpacing/* : Object*/: undefined},

  /** The right margin of the paragraph, in pixels. */
  "public var",{ rightMargin/* : Object*/: undefined},

  /** The point size of text in this text format. */
  "public var",{ size/* : Object*/: undefined},

  /** Specifies custom tab stops as an array of non-negative integers. */
  "public var",{ tabStops/* : Array*/: undefined},

  /** Indicates the target window where the hyperlink is displayed. */
  "public var",{ target/* : String*/: undefined},

  /** Indicates whether the text that uses this text format is underlined (true) or not (false). */
  "public var",{ underline/* : Object*/: undefined},

  /** Indicates the target URL for the text in this text format. */
  "public var",{ url/* : String*/: undefined},

];},[],["Object"], "0.7.1", "0.7.5"
);