package views.Home {
	
	import flash.events.MouseEvent;
	import flash.geom.Matrix;
	import flash.geom.Point;
	
	import mx.core.Application;
	import mx.controls.Image;
	import mx.core.UIComponent;

	/**
	 * The user-navigated rocket.
	 */
	public class Rocket extends Image	{		
		
		/** Component to be parent of rocket. */
		private var container:UIComponent;
		/** Component that target ranges will be drawn on. */
		private var canvas:UIComponent; 
		
		public static const IMAGE_WIDTH:int = 30;
		public static const IMAGE_HEIGHT:int = 60;
		
		// Rocket movement parameters.
		public static const RANGE:Number = 100;
		public static const ACCELERATION:Number = 0.7;
		public static const MAX_SPEED:Number = 10.0;
		public static const ONE_MINUS_DRAG:Number = 0.95;
		
		/** Is the rocket accelerating? */
		public var isMouseDown:Boolean = false;
		/** Are we drawing a target right now? */
		public var isDrawTarget:Boolean = false;
		/** A frozen rocket does not rotate to mouse or move on mouse-down. Useful when mouse is over control panel/minimap. */
		public var isFrozen:Boolean = false;
			
		/** Current speed of the rocket. */
		public var velocity:Point = new Point();
		/** Rocket direction vector. */
		public var direction:Point = new Point();

		// Position of current target (celestial body with mouseOver).
		private var targetX:Number;
		private var targetY:Number;
		private var target:Object;
		
		// Avoids redundant computation.
		public static const DEGREES_TO_RADIANS:Number = 0.0174532;//92519943295769236907684886;
		public static const PI_OVER_TWO:Number = 1.57079;//63267948966192313216916398;
		private var halfWidth:Number;
		private var halfHeight:Number;

		public function Rocket(container:UIComponent, canvas:UIComponent):void {	
			super();
			
			this.container = container;
			
			this.canvas = canvas;
								
			source = "assets/swf/rocket.swf";
			
			// TODO Change starting position.
			x = 300;
			y = 300;
			
			// Initially transparent until universe fades in.
			alpha = 0.0; 
			
			maintainAspectRatio = false;
			
			width = IMAGE_WIDTH;
			height = IMAGE_HEIGHT;
			
			halfWidth = width / 2.0;
			halfHeight = height / 2.0;
			
			addListeners();
		}

		/** Adds mouse listeners and shows the rocket. */
		public function show():void {
			removeListeners(); // Avoid duplicate listeners.
			
			this.visible = true;
			
			addListeners();
		}
		
		/** Removes mouse listeners and hides the rocket. */
		public function hide():void {
			this.visible = false;
			
			removeListeners();
		}

		/** Add relevant event listeners. */
		private function addListeners():void {			
			// Rocket rotation.
			container.addEventListener(MouseEvent.MOUSE_MOVE, rotateToMouse);
			
			// Mouse movement.
			container.addEventListener(MouseEvent.MOUSE_DOWN, enableAcceleration);
			container.addEventListener(MouseEvent.MOUSE_UP, disableAcceleration);
		}
		
		/** Remove relevant event listeners. */
		private function removeListeners():void {
			// Rocket rotation.
			container.removeEventListener(MouseEvent.MOUSE_MOVE, rotateToMouse);
			
			// Mouse movement.
			container.removeEventListener(MouseEvent.MOUSE_DOWN, enableAcceleration);
			container.removeEventListener(MouseEvent.MOUSE_UP, disableAcceleration);
		}
		
		/** Rotates the rocket to point to the position of the mouse. */
		private function rotateToMouse(e:MouseEvent):void {
			if (isFrozen) {
				return;
			}
			
			var m:Matrix = new Matrix();				
			
			var currentRotation:Number = rotation * DEGREES_TO_RADIANS;
			
			// Rocket-center-to-mouse vector in rocket's local coordinates.
			var vx:Number = mouseX - halfWidth;
			var vy:Number = mouseY - halfHeight;
			
			// Since Flex takes the top-left corner of the image as the rotation axis by default, 
			// need to translate to set center, and translate back after rotation.
			m.translate(-halfWidth, -halfHeight);
			m.rotate(Math.atan2(vy, vx) + PI_OVER_TWO);
			m.translate(halfWidth, halfHeight);

			// Concat world transform onto local transform.
			m.concat(transform.matrix);

			transform.matrix = m;
			
			// Set direction vector.
			currentRotation = rotation * DEGREES_TO_RADIANS;
			
			direction.x = Math.sin(currentRotation);
			direction.y = -Math.cos(currentRotation);
			direction.normalize(1.0);
		}
		
		/** Starts rocket acceleration. */
		public function enableAcceleration(e:MouseEvent):void {
			isMouseDown = true;
		}
		
		/** Stops rocket acceleration. */
		public function disableAcceleration(e:MouseEvent):void {
			isMouseDown = false;
		}
		
		/** Accelerates the speed of the rocket by the span of one frame. */
		public function accelerate():void {			
			velocity.x += direction.x * ACCELERATION;
			velocity.y += direction.y * ACCELERATION;
			
			if (velocity.length > MAX_SPEED) {
				velocity.normalize(MAX_SPEED);
			}
		}
		
		/** Sets a target reference via position coordinates; add event listeners to draw target range. */
		public function setTarget(x:Number, y:Number, target:Object):void {
			targetX = x;
			targetY = y;
			this.target = target;
			
			isDrawTarget = true;
		}
		
		/** Unset the target reference; remove event listeners. */
		public function unsetTarget():void {			
			isDrawTarget = false;
			target = null;
			
			canvas.graphics.clear();
		}
		
		/** Draws a red circle around the target position if the rocket is too far away, a green circle otherwise. */
		public function drawTargetRange(offsetX:Number, offsetY:Number):void {
			canvas.graphics.clear();
			
			var dx:Number = targetX - x + offsetX;
			var dy:Number = targetY - y + offsetY;
			var distance:Number = Math.sqrt(dx*dx + dy*dy);
			
			if (distance <= Rocket.RANGE) {
				canvas.graphics.lineStyle(0.5, 0x00ff00, 0.5); // Green.
				
				if (isMouseDown) { // Zoom into an object if it is close enough. 
					Application.application.testRangeAndZoomIn(targetX, targetY, target);
					unsetTarget();
					isMouseDown = false;
				}
			} else {
				canvas.graphics.lineStyle(0.5, 0xff0000, 0.5); // Red.
			}
			
			canvas.graphics.drawCircle(targetX, targetY, Rocket.RANGE);
		}
		
		/** Moves the position of the rocket by its current speed. */
		public function moveRocket():void {
			if (isFrozen) {
				return;
			}
			
			x += velocity.x;
			y += velocity.y;
			
			velocity.x *= ONE_MINUS_DRAG;
			velocity.y *= ONE_MINUS_DRAG;
		}
		
		public function getCenter():Point {
			var center:Point = new Point(x, y);
			
			center.x -= direction.x * halfHeight;
			center.y -= direction.y * halfHeight;
			center.x -= direction.y * halfWidth;
			center.y -= -direction.x * halfWidth;
			
			return center;
		}
		
		public function getHalfDiagonal():Number {
			return Math.sqrt(halfWidth*halfWidth + halfHeight*halfHeight);
		}
	}
}