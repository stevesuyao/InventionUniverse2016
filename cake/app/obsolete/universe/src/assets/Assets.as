package assets {
	
	/**
	 * Utility class for assets references outside of InventionUniverse.mxml, because ASDocs sucks.
	 * http://blog.lyraspace.com/2008/12/02/developing-flex-with-asdoc-in-mind/
	 */
	public class Assets	{
		
		///////////////////////////////////////////////////////////////////////////
		// WELCOME SCREEN
		///////////////////////////////////////////////////////////////////////////
		
		[Embed(source='swf/login_panel/blank_panel.swf')]
		[Bindable]
		public var welcome_base:Class;
		
		[Embed(source='swf/login_panel/biy.swf')]
		[Bindable]
		public var welcome_biy:Class;
		
		[Embed(source='swf/login_panel/form.swf')]
		[Bindable]
		public var welcome_form:Class;
		
		[Embed(source='swf/login_panel/login.swf')]
		[Bindable]
		public var welcome_login:Class;
		
		[Embed(source='swf/login_panel/signup.swf')]
		[Bindable]
		public var welcome_signup:Class;
		
		[Embed(source='assets/swf/login_panel/testride.swf')]
		[Bindable]
		public var welcome_testride:Class;
		
		[Embed(source='swf/login_panel/mission.swf')]
		[Bindable]
		public var welcome_mission:Class;
		
		[Embed(source='assets/swf/login_panel/news.swf')]
		[Bindable]
		public var welcome_news:Class;
		
		///////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////
		
		// Singleton.
		private static var instance:Assets;
		
		/** Returns the singleton instance of Assets. */
		public static function getInstance():Assets {
			if (instance == null) {
				instance = new Assets();
			}
			
			return instance;
		}
		
		/** Constructor. */
		public function Assets() {
			if (instance != null) {
				throw new Error("Error: Singletons can only be instantiated via getInstance() method!");
			}
			
			Assets.instance = this;
		}

	}
}