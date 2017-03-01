/**
 * Thumbnail generator for image files.
 * Copyright 2009 - Build-it-Yourself.com
 * @author Wenyu 'Hearson' Zhang
 */
import java.io.*;
import java.awt.image.*;
import java.awt.*;
import java.awt.geom.*;
import javax.imageio.*;

public class GetImageThumbnail {

	private static void errExit(int errCode, String errMessage) {
		System.err.println(errMessage);
		System.exit(errCode);
	}
	
	/**
	 * @param args - First argument for input file, second argument for output file.
	 */
	public static void main(String[] args) {
		// This program takes 2 parameters.
		if (args.length != 2) {
			errExit(1, "Error: this program takes 2 parameters.");
		}
		
		File fileIn = new File(args[0]);
		File fileOut = new File(args[1]);
		
		try {
			BufferedImage image = ImageIO.read(fileIn);
			BufferedImage resizedImage;
			double scaleRatio;
			
			if ( image.getHeight() == 0 || image.getWidth() == 0 ) {
				errExit(2, "Error: bad image file.");
			}
			
			if ( image.getHeight()*4/3 < image.getWidth() ) {
				scaleRatio = 160.0 / image.getWidth();
				resizedImage = new BufferedImage(160, (int)(image.getHeight() * scaleRatio), BufferedImage.TYPE_INT_ARGB);
			} else {
				scaleRatio = 120.0 / image.getHeight();
				resizedImage = new BufferedImage((int)(image.getWidth() * scaleRatio), 120, BufferedImage.TYPE_INT_ARGB);
			}
			
			Graphics2D g = resizedImage.createGraphics();
			AffineTransform at = new AffineTransform(
					scaleRatio, 0, 0, scaleRatio, 0, 0
				);
			g.drawRenderedImage(image, at);
			ImageIO.write(resizedImage, "PNG", fileOut);

		} catch (Exception e) {
			e.printStackTrace();
			errExit(1, "Error: cannot manipulate image file \"" + fileIn.getAbsolutePath() + "\".");
		}
	}

}
