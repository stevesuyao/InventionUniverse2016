<h1>List of Stars</h1>
<table>
	<tr>
		<th>name</th>
		<th>id</th>
		<th>galaxy_id</th>
	</tr>
	<?php foreach ($stars as $star): ?>
	<tr>
		<td><?php echo $star['Star']['name']; ?></td>
		<td><?php echo $star['Star']['id']; ?></td>
		<td><?php echo $star['Star']['galaxy_id']; ?></td>
	</tr>
	<?php endforeach; ?>
	<?php unset($post); ?>
</table>