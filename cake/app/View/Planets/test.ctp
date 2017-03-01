<h1>List of Star Paths</h1>
<table>
    <tr>
        <th>Path to image</th>
    </tr>
    <?php 
    	$index = 1;
		foreach ($starpaths as $starpath): 
	?>
    <tr>
        <td>
        	<?php
        		echo $starpath;
        		echo $this->Html->image(
        			$starpath,
        			array(
    					'url' => array(
    						'controller' => 'users',
    						'action' => 'userslist',
    						$index
    					)
					)
				);
				$index++;
        	?>
        </td>
    </tr>
    <?php endforeach; ?>
    <?php unset($post); ?>
</table>