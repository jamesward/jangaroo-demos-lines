joo.classLoader.prepare("package",/*
{
	import flash.display.Sprite
	
	[SWF(backgroundColor='0x212121', frameRate='30', width='384', height='384')]*/

	"public class Lines extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$app=$$l+'app';return[function(){joo.classLoader.init(ParticleApplication);},
	
		"private var",{ app/*:ParticleApplication*/: undefined},
		
		"public function Lines",function $Lines()
		{this[$super]();
			this.stage.frameRate = 44.444;
			//stage.scaleMode = "noScale";
			
			this[$app] = new ParticleApplication();
			this.addChild( this[$app] );
		},
	];},[],["flash.display.Sprite","ParticleApplication"], "0.7.1", "0.7.5"
);