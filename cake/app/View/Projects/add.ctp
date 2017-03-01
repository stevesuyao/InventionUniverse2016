<div class="projects form">
	<?php echo $this->Form->create(); ?>
		<fieldset>
			<legend>
				<?php echo __('Add Project'); ?>
			</legend>
			<?php
				echo $this->Form->input('Project.name');
				echo $this->Form->input('Project.description');
				//echo $this->Form->input('user_id', array('options'=>$options));
				echo $this->Form->input('Project.link');
			?>
		</fieldset>
	<?php echo $this->Form->end(__('Submit')); ?>
</div>
