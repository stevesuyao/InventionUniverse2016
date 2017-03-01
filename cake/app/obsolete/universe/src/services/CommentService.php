<?php

require_once ('models/Comment/Comment.php');

class CommentService {
	
	private static function matchFields($comment, $array) {
		$comment->id 				= $array['id'];
		$comment->planet_id = $array['planet_id'];
		$comment->author_id = $array['author_id'];
		$comment->text 			= $array['text'];
	}
	
	/**
	 * Inserts a comment. The author of the comment must be logged in.
	 * @param $planet_id ID of the planet being commented on.
	 * @param $author_id ID of the planet authoring this comment.
	 * @param $text The textual content of the comment.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function putComment($planet_id, $author_id, $text) {
		if (!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $author_id)) {
			return false;
		}
		
		include('db.php');
		
		$stmt = $db->prepare('
			INSERT INTO comments (planet_id, author_id, text) 
			VALUES (?, ?, ?)
			');
		
		return $stmt->execute(array($planet_id, $author_id, $text));
	}
	
	/**
	 * Gets all the comments belonging to a planet.
	 * @param $planet_id The ID of the planet.
	 * @return Array An array of Comment objects if successful, false otherwise.
	 */
	public function getCommentsByPlanetID($planet_id) {
		include('db.php');
		
		// Get the author planet's name in addition to ID via a join.
		$stmt = $db->prepare('
			SELECT C.*, P.name AS author 
			FROM comments C, planets P 
			WHERE C.planet_id = ? AND C.author_id = P.id 
			ORDER BY id DESC
			');
		
		if ($stmt->execute(array($planet_id))) {
			$result = $stmt->fetchAll();
			
			if ($result) {
				$comments = array();
				
				foreach ($result as $i => $row) {
					$comments[$i] = new Comment();
					
					self::matchFields($comments[$i], $row);
					
					// Not a natural field of COMMENTS so we match manually.
					$comments[$i]->author = $row['author'];
				}
				return $comments;
			}
		}
		return NULL;
	}
	
	/**
	 * Retrieves a comment.
	 * @param $comment_id ID of the comment to get.
	 * @return Comment The comment object if successfull, NULL otherwise.
	 */
	public function getCommentByID($comment_id) {
		include('db.php');
		
		$stmt = $db->prepare('
			SELECT *
			FROM comments
			WHERE id = ?
			');
		
		if ($stmt->execute(array($comment_id))) {
			$result = $stmt->fetch();
			
			if ($result) {
				$comment = new Comment();
				
				self::matchFields($comment, $result);
				
				return $comment;
			}
		}
		return NULL;
	}
	
	/**
	 * Deletes a comment. Owner of the comment must be logged in.
	 * @param $comment_id ID of comment to delete.
	 * @return Boolean True if successful, false otherwise.
	 */
	public function deleteCommentByID($comment_id) {
		$comment = $this->getCommentByID($comment_id);
		
		if (!$comment) {
			return false;
		}
		
		if (!isset($_SESSION['planet_id']) || ($_SESSION['planet_id'] != $comment->planet_id)) {
			return false;
		}
		
		include('db.php');
		
		$stmt = $db->prepare('DELETE FROM comments WHERE id = ?');
		return $stmt->execute(array($comment->id));
	}
	
}