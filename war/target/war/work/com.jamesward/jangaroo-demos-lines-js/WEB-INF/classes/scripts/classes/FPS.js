joo.classLoader.prepare("package",/*
{
	import flash.events.Event
	import flash.text.TextField
	import flash.text.TextFormat
	import flash.utils.getTimer*/
	
	"public class FPS extends flash.text.TextField",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$fs=$$l+'fs',$ms=$$l+'ms',$onEnterFrame=$$l+'onEnterFrame';return[function(){joo.classLoader.init(flash.events.Event,flash.text.TextFormat);},
	
		"private var",{ fs/*: int*/: undefined},
		"private var",{ ms/*: int*/: undefined},
		
		"public function FPS",function $FPS()
		{this[$super]();
			var format/*: TextFormat*/ = new flash.text.TextFormat();
			
			format.color = 0x666666;
			format.size = 10;
			format.bold = true;
			format.font = 'Verdana';
			
			this.textColor = 0xcecece;
			this.autoSize = "left";
			this.defaultTextFormat = format;
			
			this[$ms] = flash.utils.getTimer();
			this[$fs] = 0;
			
			this.addEventListener( flash.events.Event.ENTER_FRAME, $$bound(this,$onEnterFrame) );
		},
		
		"private function onEnterFrame",function onEnterFrame( event/*: Event*/ )/*: void*/
		{
			if( flash.utils.getTimer() - 1000 > this[$ms] )
			{
				this[$ms] = flash.utils.getTimer();
				this.text = this[$fs].toString();
				this[$fs] = 0;
			}
			else
			{
				++this[$fs];
			}
		},
	];},[],["flash.text.TextField","flash.text.TextFormat","flash.events.Event"], "0.7.1", "0.7.5"
);