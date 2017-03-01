<div class="planets form">


<?php echo $this->Form->create('Planet', array('type' => 'file')); ?>
	<fieldset>
       <legend><?php echo __('Add Planet'); ?></legend>
    <?php echo $this->Form->input('Planet.name'); ?>
    <?php echo $this->Form->input('Planet.photo', array('type' => 'file')); ?>
    <?php echo $this->Form->input('Planet.image_url', array('type' => 'hidden')); ?>
    </fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>