package models.Skill {
	
	[Bindable]
	[RemoteClass(alias="SkillVO")]
	public class SkillVO {
		public var id:int;
		public var parent_id:int;
		public var type_id:int;
		public var level_id:int;
		public var name:String;
		
		// Joined from SkillLevel and SkillType.
		public var type:String;
		public var level:String;
	}
	
}