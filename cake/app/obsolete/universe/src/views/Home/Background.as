package views.Home {
	
	import flash.system.Capabilities;
	import mx.containers.Canvas;
	import mx.core.UIComponent;

	/**
	 * The starry background.
	 */
	public class Background extends UIComponent {
		
		public var stars:Array; /* of Star */
		
		public function init():void {
			// By making the background size the screen resolution, 
			// we won't have problems when the user shrinks or expands the window.
			width = Capabilities.screenResolutionX;
			height = Capabilities.screenResolutionY;
			
			stars = new Array();
			
			// Create stars.
			var numStars:int = (width + height) * 0.05;
			for (var i:int = 0; i < numStars; i++) {
				var s:Star = new Star(
					Math.random() * width, 
					Math.random() * height, 
					Math.random() * Star.STAR_SIZE
				);
				stars.push(s);
			}
			
			draw();
		}
		
		/** Repaints all stars by randomly shuffling position and size. Equivalent to initializing a new background. */
		public function randomize():void {
			for each (var s:Star in stars) {
				s.x = Math.random() * width;
				s.y = Math.random() * height;
				s.size = Math.random() * Star.STAR_SIZE;
			}
			
			draw();
		}
		
		/** Clears palette and draws all stars. */
		public function draw():void {
			graphics.clear();
			
			graphics.beginFill(Star.STAR_COLOR, 1.0);
			
			for each (var s:Star in stars) {
				graphics.drawCircle(s.x, s.y, s.size);
			}
			
			graphics.endFill();
		}
		
		/** 
		 * Moves all stars in the background by (x,y), tiling the stars when they move out of bounds, and redraws.
		 * 
		 * @param x Amount to move along the x-axis.
		 * @param y Amount to move along the y-axis.
		 */
		public function moveStars(x:Number, y:Number):void {
			for each (var s:Star in stars) {
				s.x += x;
				if (s.x < 0) {
					s.x += width;
				} else if (s.x > width) {
					s.x -= width;
				}
				
				s.y += y;
				if (s.y < 0) {
					s.y += height;
				} else if (s.y > height) {
					s.y -= height;
				}
			}
			
			draw();
		}
	}
	
}

// Private inner class.
class Star {
	
	public static const STAR_COLOR:uint = 0xFFFFFF;
	public static const STAR_SIZE:Number = 3.0;
	
	public var x:Number;
	public var y:Number;
	public var size:Number;
	
	public function Star(x:Number, y:Number, size:Number):void {
		this.x = x;
		this.y = y;
		this.size = size;
	}
	
}