<h1>List of Users</h1>
<table>
	<tr>
		<th>username</th>
		<th>id</th>
		<th>star_id</th>
		<th>created</th>
	</tr>
	<?php foreach ($users as $user): ?>
	<tr>
		<td><?php echo $user['User']['username']; ?></td>
		<td>
			<?php
				echo $this->Html->link(
					$user['User']['id'],
					array(
						'controller' => 'users',
						'action' => 'view',
						$user['User']['id']
					)
				);
			?>
		</td>
		<td>
		 <?php
		 	echo $this->Html->link(
		 		$user['User']['star_id'],
		 		array(
		 			'controller' => 'users',
		 			'action' => 'userslist',
		 			$user['Star']['id']
		 		)
		 	);
		 ?>
		</td>
		<td>
			<?php echo $user['User']['created']; ?>
		</td>
	</tr>
	<?php endforeach; ?>
	<?php unset($post); ?>
</table>