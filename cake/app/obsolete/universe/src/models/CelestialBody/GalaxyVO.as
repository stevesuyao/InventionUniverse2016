package models.CelestialBody {
	
	[Bindable]
	[RemoteClass(alias="GalaxyVO")]
	public class GalaxyVO {
		public var id:int;
		public var parent_id:int;
		public var name:String;
		public var description:String;
		public var image_url:String;
	}
	
}