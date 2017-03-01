package helpers {
	
	import flash.events.MouseEvent;
	
	import mx.core.UIComponent;
	import mx.effects.Zoom;
	import mx.effects.easing.Bounce;
	
	public class MouseOverZoom {
		
		private var zoom:Zoom;
		
		private var target:UIComponent;
		
		private var easeIn:Function = Bounce.easeIn;
		private var easeOut:Function = Bounce.easeOut;
		
		/** Adds a rollOver zoom effect to a UIComponent.
		 *  Requires target exists and that target's width and height is defined. */
		public function MouseOverZoom(scale:Number, target:UIComponent)	{			
			zoom = new Zoom();
			
			this.target = target;
			
			target.width *= scale;
			target.height *= scale;
			
			zoom.zoomWidthFrom = zoom.zoomHeightFrom = 
				target.scaleX = target.scaleY = 1.0 / scale;
			
			enable();
		}
		
		public function setEasingFunctions(easeIn:Function, easeOut:Function):void {
			this.easeIn = easeIn;
			this.easeOut = easeOut;
		}
		
		// Event listener for mouse events that performs the effect playing.
		private function doZoom(e:MouseEvent):void {
			var isRollOut:Boolean = (e.type == MouseEvent.ROLL_OUT);
				
			zoom.easingFunction = isRollOut ? easeIn : easeOut;
			
			if (zoom.isPlaying) {
				zoom.reverse();
			} else {
				zoom.play([target], isRollOut);
			}
		}
		
		/** Enables this MouseOverZoom effect. */
		public function enable():void {
			target.addEventListener(MouseEvent.ROLL_OVER, doZoom);
			target.addEventListener(MouseEvent.ROLL_OUT, doZoom);
		}
		
		/** Disables this MouseOverZoom effect. */
		public function disable():void {
			target.removeEventListener(MouseEvent.ROLL_OVER, doZoom);
			target.removeEventListener(MouseEvent.ROLL_OUT, doZoom);
		}

		/** Restores original form of target by playing zoom effect in reverse. */
		public function restore():void {
			zoom.play([target], true);
		}

	}
}