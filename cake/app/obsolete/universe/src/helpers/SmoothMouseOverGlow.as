package helpers {
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.filters.GlowFilter;
	
	import mx.core.UIComponent;
	
	/**
	 * An animated glow on mouseOver based on GlowFilter.
	 * @author William Chou
	 */
	public class SmoothMouseOverGlow {
		private var mouseOverArea:UIComponent;
		private var toGlow:UIComponent;
		
		private var isGlow:Boolean = false;
		private var filter:GlowFilter; 
		private var glowBlur:int;
		
		/**
		 * Creates a new SmoothMouseOverGlow. Enables glow by default.
		 * @param mouseOverArea UIComponent that triggers mouseOver event.
		 * @param toGlow UIComponent that glows.
		 * @param glowColor GlowFilter color.
		 * @param glowAlpha GlowFilter alpha.
		 * @param glowStrength GlowFilter strength.
		 * @param glowBlur GlowFilter blur.
		 */
		public function SmoothMouseOverGlow(mouseOverArea:UIComponent, toGlow:UIComponent, glowColor:uint = 0xffffff, glowAlpha:int = 30, glowStrength:int = 2, glowBlur:int = 15):void 
			{
			this.mouseOverArea = mouseOverArea;
			this.toGlow = toGlow;
			this.filter = new GlowFilter(glowColor, glowAlpha, 0, 0, glowStrength, 3, false, false);
			
			this.glowBlur = glowBlur;
			
			start();
		}
		
		/**
		 * Enables glowing effect on mouseOver.
		 */
		public function start():void {
			mouseOverArea.addEventListener(MouseEvent.MOUSE_OVER, enableGlow);
			mouseOverArea.addEventListener(MouseEvent.MOUSE_OUT, disableGlow);
		}
		
		/**
		 * Disables glowing effect on mouseOver.
		 */
		public function stop():void {
			mouseOverArea.removeEventListener(MouseEvent.MOUSE_OVER, enableGlow);
			mouseOverArea.removeEventListener(MouseEvent.MOUSE_OUT, disableGlow);
		}

		private function enableGlow(e:MouseEvent):void {
			isGlow = true;
			mouseOverArea.addEventListener(Event.ENTER_FRAME, glow);
		}
		
		private function disableGlow(e:MouseEvent):void {
			isGlow = false;
			mouseOverArea.addEventListener(Event.ENTER_FRAME, glow);
		}
		
		// Animates glow smoothly over time.
		private function glow(e:Event):void {
			if (isGlow) {
				// Fade in.
				if (filter.blurX < glowBlur) {
					filter.blurX++;
					filter.blurY++;
					toGlow.filters = [filter];
				} else {
					mouseOverArea.removeEventListener(Event.ENTER_FRAME, glow);
				}
			} else {
				// Fade out.
				if (filter.blurX > 0) {
					filter.blurX--;
					filter.blurY--;
					toGlow.filters = [filter];
				} else {
					mouseOverArea.removeEventListener(Event.ENTER_FRAME, glow);
					toGlow.filters = [];
				}
			}
		}

	}
}