package views.Home {
	
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	import mx.containers.Canvas;
	import mx.controls.Image;
	import mx.core.UIComponent;
	import mx.effects.Fade;
	
	/**
	 * Provides navigation of a universe.
	 * Adds four invisible border components that scroll the perspective of the universe on mouseOver.
	 * 
	 * @author William Chou
	 */
	public class Navigation {
		
		// Enumeration of cue directions.
		public static var TOP:int = 0;
		public static var BOTTOM:int = 1;
		public static var LEFT:int = 2;
		public static var RIGHT:int = 3;
		
		/** The width of the border area that will trigger scrolling. */
		public static const SCROLL_BOUND:Number = 120;
		/** Coefficient of scrolling speed. */
		public static const SCROLL_SPEED:Number = 0.1;
		/** Coefficient of scrolling speed of background relative to foreground. */
		public static const BACKGROUND_SPEED_SCALE:Number = 0.7;

		private var container:UIComponent;

		/** Is the mouse currently over one of the listener components? */
		public var isNavigating:Boolean = false;

		// Invisible listener components that toggle screen movement on mouse-over.
		private var top:Canvas;
		private var bottom:Canvas;
		private var left:Canvas;
		private var right:Canvas;
		
		private var topLeft:Canvas;
		private var topRight:Canvas;
		private var bottomLeft:Canvas;
		private var bottomRight:Canvas;
		
		[Bindable]
		[Embed(source='assets/swf/arrow.swf')]
		private var arrow:Class;
		[Bindable]
		[Embed(source='assets/swf/stop.swf')]
		private var stop:Class;
		
		// Directional cues that appear when scrolling in a direction.
		public var imgTop:Image;
		public var imgBottom:Image;
		public var imgLeft:Image;
		public var imgRight:Image;
		
		// Fade effect for cues.
		private var fadeTop:Fade;
		private var fadeBottom:Fade;
		private var fadeLeft:Fade;
		private var fadeRight:Fade;
		
		public function Navigation(container:UIComponent) {
			this.container = container;
			
 			top = new Canvas();
			container.addChild(top);
			
			bottom = new Canvas();
			container.addChild(bottom);

			left = new Canvas();
			container.addChild(left);
			
			right = new Canvas();
			container.addChild(right);
			
			topLeft = new Canvas();
			container.addChild(topLeft);
			
			topRight = new Canvas();
			container.addChild(topRight);
			
			bottomLeft = new Canvas();
			container.addChild(bottomLeft);
			
			bottomRight = new Canvas();
			container.addChild(bottomRight);
			
			// DIRECTIONAL CUES.			
			imgTop = new Image();
			imgTop.rotation = -90;
			imgTop.alpha = 0.0;
			top.addChild(imgTop);
			
			imgBottom = new Image();
			imgBottom.rotation = 90;
			imgBottom.alpha = 0.0;
			bottom.addChild(imgBottom);
			
			imgLeft = new Image();
			imgLeft.rotation = 180;
			imgLeft.alpha = 0.0;
			left.addChild(imgLeft);
			
			imgRight = new Image();
			imgRight.alpha = 0.0;
			right.addChild(imgRight);
			
			// Set initial positions of listener components and cues.
			reposition();
			
			// EFFECTS.			
			fadeTop = new Fade();
			fadeTop.alphaTo = 0.0;
			
			fadeBottom = new Fade();
			fadeBottom.alphaTo = 0.0;
			
			fadeLeft = new Fade();
			fadeLeft.alphaTo = 0.0;
			
			fadeRight = new Fade();
			fadeRight.alphaTo = 0.0;
			
			// EVENT LISTENERS.
			top.addEventListener(					MouseEvent.MOUSE_OVER, startMoveListening);
			bottom.addEventListener(			MouseEvent.MOUSE_OVER, startMoveListening);
			left.addEventListener(				MouseEvent.MOUSE_OVER, startMoveListening);
			right.addEventListener(				MouseEvent.MOUSE_OVER, startMoveListening);
			topLeft.addEventListener(			MouseEvent.MOUSE_OVER, startMoveListening);
			topRight.addEventListener(		MouseEvent.MOUSE_OVER, startMoveListening);
			bottomLeft.addEventListener(	MouseEvent.MOUSE_OVER, startMoveListening);
			bottomRight.addEventListener(	MouseEvent.MOUSE_OVER, startMoveListening);
			
			top.addEventListener(					MouseEvent.MOUSE_OUT, stopMoveListening);
			bottom.addEventListener(			MouseEvent.MOUSE_OUT, stopMoveListening);
			left.addEventListener(				MouseEvent.MOUSE_OUT, stopMoveListening);
			right.addEventListener(				MouseEvent.MOUSE_OUT, stopMoveListening);
			topLeft.addEventListener(			MouseEvent.MOUSE_OUT, stopMoveListening);
			topRight.addEventListener(		MouseEvent.MOUSE_OUT, stopMoveListening);
			bottomLeft.addEventListener(	MouseEvent.MOUSE_OUT, stopMoveListening);
			bottomRight.addEventListener(	MouseEvent.MOUSE_OUT, stopMoveListening);
			
			// Reposition listeners and cues on window resize.
			container.addEventListener(Event.RESIZE, reposition);
		}

		private function reposition(e:Event = null):void {
			// LISTENER COMPONENTS.
			top.width 		= container.width - SCROLL_BOUND * 2;
			top.height 		= SCROLL_BOUND;
			top.x 				= SCROLL_BOUND;
			
			bottom.width 	= container.width - SCROLL_BOUND * 2;
			bottom.height = SCROLL_BOUND * 2; // To compensate for control panel.
			bottom.x 			= SCROLL_BOUND;
			bottom.y 			= container.height - bottom.height;
			
			left.width 		= SCROLL_BOUND;
			left.height 	= container.height - SCROLL_BOUND * 2;
			left.y 				= SCROLL_BOUND;
			
			right.width 	= SCROLL_BOUND;
			right.height 	= container.height - SCROLL_BOUND * 2;
			right.x 			= container.width - right.width;
			right.y 			= SCROLL_BOUND;
			
			topLeft.width 			= left.width;
			topLeft.height 			= top.height;
			
			topRight.width 			= right.width;
			topRight.height 		= top.height;
			topRight.x 					= right.x;
			
			bottomLeft.width 		= left.width;
			bottomLeft.height 	= bottom.height;
			bottomLeft.y 				= bottom.y;
			
			bottomRight.width 	=	right.width;
			bottomRight.height 	= bottom.height;
			bottomRight.x 			= right.x;
			bottomRight.y 			= bottom.y;
			
			// CUES.
			var halfSize:Number = 30; // Half-width of cue image.
			
			imgTop.x 		= top.width/2 - halfSize;
			imgTop.y 		= top.height/2;
			
			imgBottom.x = bottom.width/2 + halfSize;
			imgBottom.y = 50;
			
			imgLeft.x 	= left.width/2;
			imgLeft.y 	= left.height/2 + halfSize;
			
			imgRight.x 	= right.width/2;
			imgRight.y 	= right.height/2 - halfSize;
		}
		
		/** Enables navigation. */
		public function enable():void {
			top.visible 				= true;
			bottom.visible 			= true;
			left.visible 				= true;
			right.visible 			= true;
			
			topLeft.visible 		= true;
			topRight.visible 		= true;
			bottomLeft.visible 	= true;
			bottomRight.visible = true;
		}
		
		/** Disables navigation. */
		public function disable():void {
			top.visible 				= false;
			bottom.visible 			= false;
			left.visible 				= false;
			right.visible 			= false;
			
			topLeft.visible 		= false;
			topRight.visible 		= false;
			bottomLeft.visible 	= false;
			bottomRight.visible = false;
		}
		
		// Add and remove enterFrame listeners based on mouseOver and mouseOut behavior on 
		// invisible scroll borders. This frees the application from excess polling on enterFrame.
		/** Starts the event listener mechanism that controls universe scrolling. */
		private function startMoveListening(e:MouseEvent):void { 	
			isNavigating = true;
			
			// Show relevant directional cues.
			if (e.currentTarget == top || e.currentTarget == topLeft || e.currentTarget == topRight) {
				fadeTop.stop();
				imgTop.alpha = 1.0;
			}
			if (e.currentTarget == bottom || e.currentTarget == bottomLeft || e.currentTarget == bottomRight) {
				fadeBottom.stop();
				imgBottom.alpha = 1.0;
			}
			if (e.currentTarget == left || e.currentTarget == topLeft || e.currentTarget == bottomLeft) {
				fadeLeft.stop();
				imgLeft.alpha = 1.0;
			}
			if (e.currentTarget == right || e.currentTarget == topRight || e.currentTarget == bottomRight) {
				fadeRight.stop();
				imgRight.alpha = 1.0;
			}
		}
		
		/** Stops the event listener mechanism that controls universe scrolling. */
		private function stopMoveListening(e:MouseEvent):void { 
			isNavigating = false;
			
			// Hide directional cues.
			fadeTop.play([imgTop]);
			fadeBottom.play([imgBottom]);
			fadeLeft.play([imgLeft]);
			fadeRight.play([imgRight]);
		}
		
		/** Computes amount to scroll screen for one frame based on current mouse position. */
		public function calculateMove():Point {
			var mouseX:Number = container.mouseX;
			var mouseY:Number = container.mouseY;

			// Amounts to move screen based on mouse movement.
			var moveX:Number = 0;
			var moveY:Number = 0;
						
			// Left & right edge.
			if (mouseX < left.width) {
				moveX = Math.abs(left.width - mouseX);
			} else if (mouseX > (container.width - right.width)) {
				moveX = - Math.abs(right.width - (container.width - mouseX));
			}
			
			// Top & bottom edges.
			if (mouseY < top.height) {
				moveY = Math.abs(top.height - mouseY);
			} else if (mouseY > (container.height - bottom.height)) {
				moveY = - Math.abs(bottom.height - (container.height - mouseY));
			}
			
			// Finally move perspective.
			return new Point(moveX * SCROLL_SPEED, moveY * SCROLL_SPEED);
		}
	
		public function setCue(cue:int, isArrow:Boolean):void {
			switch (cue) {
				case TOP: imgTop.source = isArrow ? arrow : stop; break;
				case LEFT: imgLeft.source = isArrow ? arrow : stop; break;
				case BOTTOM: imgBottom.source = isArrow ? arrow : stop; break;
				case RIGHT: imgRight.source = isArrow ? arrow : stop; break;
			}
		}
	
	}
}