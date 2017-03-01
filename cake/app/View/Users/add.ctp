<!-- app/View/Users/add.ctp -->
<div class="users form">
	<?php echo $this->Form->create(); ?>
		<fieldset>
			<legend>
				<?php echo __('Add User'); ?>
			</legend>
			<?php
				echo $this->Form->input('User.username');
				echo $this->Form->input('User.password');
				echo $this->Form->input('User.role', array(
					'options' => array('admin' => 'Admin', 'author' => 'Author')
					)
				);
				echo $this->Form->input('star_id', array('options'=>$options));
			?>
		</fieldset>
	<?php echo $this->Form->end(__('Submit')); ?>
</div>
