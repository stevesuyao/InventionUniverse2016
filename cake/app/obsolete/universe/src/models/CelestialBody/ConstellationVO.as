package models.CelestialBody {
	
	[Bindable]
	[RemoteClass(alias="ConstellationVO")]
	public class ConstellationVO {
		public var id:int;
		public var name:String;
		public var description:String;
		public var image_url:String;
	}
	
}