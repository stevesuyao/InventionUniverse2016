<!-- app/View/Users/add.ctp -->
<div class="users form">
	<?php echo $this->Form->create('Star'); ?>
		<fieldset>
			<legend>
				<?php echo __('Add Star'); ?>
			</legend>
			<?php
				echo $this->Form->input('name');
				echo $this->Form->input('details');
			?>
		</fieldset>
	<?php echo $this->Form->end(__('Submit')); ?>
</div>