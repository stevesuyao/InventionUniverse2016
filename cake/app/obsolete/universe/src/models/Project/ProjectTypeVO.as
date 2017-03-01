package models.Project {
	
	[Bindable]
	[RemoteClass(alias="ProjectTypeVO")]
	public class ProjectTypeVO {
		public var id:int;
		public var name:String;
		public var extension:String;
		
		public function ProjectTypeVO(id:int = 0, name:String = null, extension:String = null):void {
			if (id != 0) {
				this.id = id;
			}
			
			if (name != null) {
				this.name = name;
			}
			
			if (extension != null) {
				this.extension = extension;
			}
		}
	}
}