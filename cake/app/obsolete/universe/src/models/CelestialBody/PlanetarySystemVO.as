package models.CelestialBody {
	import flash.geom.Point;
	
	[Bindable]
	[RemoteClass(alias="PlanetarySystemVO")]
	public class PlanetarySystemVO {
		public static const MAX_CHILDREN:int = 10;
		
		public var id:int;
		public var parent_id:int;
		public var name:String;
		public var description:String;
		public var image_url:String;
		
		// Fields below do not map to database values.
		// Used for convenience when drawing planetary systems.
		/** The PlanetVO objects that belong to this planetary system. */
		public var children:Array = new Array();
	}
	
}