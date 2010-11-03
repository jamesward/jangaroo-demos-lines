package
{
	import flash.display.Sprite;
	
	[SWF(backgroundColor='0x212121', frameRate='30', width='384', height='384')]

	public class Lines extends Sprite
	{
		private var app:ParticleApplication;
		
		public function Lines()
		{
			stage.frameRate = 44.444;
			//stage.scaleMode = "noScale";
			
			app = new ParticleApplication();
			addChild( app );
		}
	}
}