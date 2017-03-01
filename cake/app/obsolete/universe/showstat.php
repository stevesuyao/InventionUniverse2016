<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  </head>
  <body>
    <center>
      <?php
	 require_once('db.php');
	 $M = array('', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	 $stmt = $db->prepare('
      SELECT * FROM statistics
      ORDER BY year ASC, month ASC
      ');
      $stmt->execute() or die("DATABASE ERROR");
      
      $result = $stmt->fetchAll();
      ?>
      <h1>Usage Statistics for Invention Universe</h1>
      <h2>Overall</h2>
      <table width="550px" border="1" cellpadding="3" cellspacing="0">
	<tr>
	  <td width="19%"><b>Overall</b></td>
	  <td width="27%"><b>Visits</b></td>
	  <td width="27%"><b>Registrations</b></td>
	  <td width="27%"><b>Projects</b></td>
	</tr>
	<tr>
	  <td><b>Total</b></td>
	  <td><?php echo number_format($result[0]['visits']); ?></td>
	  <td><?php echo number_format($result[0]['users']); ?></td>
	  <td><?php echo number_format($result[0]['projects']); ?></td>
	</tr>
      </table>

      <?php
	 $result[0]['visits'] = $result[0]['users'] = $result[0]['projects'] = 0;
	 $tail = sizeof($result);
	 $head = $tail-1;
	 
	 while ($head) {
	 while ($result[$head]['year'] == $result[$head-1]['year']) $head--;
	 
	 echo '<h2>Year: ' . $result[$head]['year'] . '</h2>';
	 ?>
      <table width="550px" border="1" cellpadding="3" cellspacing="0">
	<tr>
	  <td width="19%"><b>Year <?php echo $result[$head]['year']; ?></b></td>
	  <td width="27%"><b>Visits</b></td>
	  <td width="27%"><b>Registrations</b></td>
	  <td width="27%"><b>Projects</b></td>
	</tr>
	<?php
	   for ($i=$head; $i<$tail; $i++) {
				    echo "<tr>";
				    echo "<td>" . $M[$result[$i]['month']] . "</td>";
				    echo "<td>" . number_format($result[$i]['visits']-$result[$i-1]['visits']) . "</td>";
				    echo "<td>" . number_format($result[$i]['users']-$result[$i-1]['users']) . "</td>";
				    echo "<td>" . number_format($result[$i]['projects']-$result[$i-1]['projects']) . "</td>";
				    echo "</tr>";
				    }
				    ?>
	   <tr>
	     <td><b>Total</b></td>
	     <td>
	       <?php echo number_format($result[$tail-1]['visits']-$result[$head-1]['visits']); ?>
	     </td>
	     <td>
	       <?php echo number_format($result[$tail-1]['users']-$result[$head-1]['users']); ?>
	     </td>
	     <td>
	       <?php echo number_format($result[$tail-1]['projects']-$result[$head-1]['projects']); ?>
	     </td>
	   </tr>
      </table>
      <?php
	 $tail = $head;
	 $head--;
	 }
	 ?>
    </center>
  </body>
</html>
