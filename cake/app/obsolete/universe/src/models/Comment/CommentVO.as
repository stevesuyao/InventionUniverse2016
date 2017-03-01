package models.Comment {
	
	[Bindable]
	[RemoteClass(alias="CommentVO")]
	public class CommentVO {
		public var id:int;
		public var planet_id:int;
		public var author_id:int;
		public var text:String;
		
		// This field is actually the NAME of the AUTHOR_ID from the PLANETS table. 
		// Joined by the controller and stored here for convenience.
		public var author:String;
	}
	
}