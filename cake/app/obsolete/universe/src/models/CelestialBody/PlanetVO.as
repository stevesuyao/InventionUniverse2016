package models.CelestialBody {
	
	[Bindable]
	[RemoteClass(alias="PlanetVO")]
	public class PlanetVO	{
		/** Maximum resume file size in bytes. */
		public static const MAX_RESUME_SIZE:int = 1024 * 1024 * 5;
		
		public var id:int;
		public var parent_id:int;
		public var name:String;
		public var description:String;
		public var image_url:String;
		
		public var password:String;
		public var salt:String;
		public var first_name:String;
		public var last_name:String;
		public var email:String;
		public var birth_date:String;
		public var hometown:String;
		public var school:String;
		public var hobbies:String;
		public var quotations:String;
		public var heroes:String;
		public var interests:String;
		public var goals:String;
		public var resume_url:String;
		public var avatar_url:String;

		// Joined area.
		public var project_count:int;
		
		// Fields below do not map to database values.
		// Used for convenience when drawing planetary systems.
		/** The planetary system that this planet belongs to. */
		public var parent:PlanetarySystemVO;
		
		public function PlanetVO(copy:PlanetVO = null) {
			if (copy != null) {
				// Copy every field.
				this.id 			 	 = copy.id;
				this.parent_id 	 = copy.parent_id;
				this.name 		 	 = copy.name;
				this.description = copy.description;
				this.image_url 	 = copy.image_url;
				this.password 	= copy.password;
				this.salt 			= copy.salt;
				this.first_name = copy.first_name;
				this.last_name 	= copy.last_name;
				this.email 			= copy.email;
				this.birth_date = copy.birth_date
				this.hometown 	= copy.hometown;
				this.school 		= copy.school;
				this.hobbies 		= copy.hobbies;
				this.quotations = copy.quotations;
				this.heroes 		= copy.heroes;
				this.interests 	= copy.interests;
				this.goals 			= copy.goals;
				this.resume_url = copy.resume_url;
				this.avatar_url = copy.avatar_url;
				
				this.project_count = copy.project_count;
			}
		}
		
	}
	
}