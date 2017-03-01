package models.Project {
	import flash.utils.ByteArray;
	
	
	[Bindable]
	[RemoteClass(alias="ProjectVO")]
	public class ProjectVO {
		/** Maximum project file size in bytes. */
		public static const MAX_PROJECT_SIZE:int = 1024 * 1024 * 10;
		
		public var id:int;
		public var parent_id:int;
		public var name:String;
		public var description:String;
		public var type_id:int;
		public var url:String;
		public var thumbnail_url:String;
		
		// This field is actually the name of the type_id from the "project_types table". 
		// Joined by the controller and stored here for convenience.
		public var type:String;
	}
}