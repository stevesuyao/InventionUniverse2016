<?php echo $this->Form->create('User'); ?>
<fieldset>
	<legend>
		<?php echo __('edit User'); ?>
	</legend>
	<?php 
		echo $this->Form->input('username');
		echo $this->Form->input('password');
		echo $this->Form->input('role', array(
			'options' => array('admin' => 'Admin', 'author' => 'Author')
			)
		);
	?>
</fieldset>
<?php echo $this->Form->end(__('Submit')); ?>