<div class="users form">
<?php echo $this->Form->create('Galaxy'); ?>
    <fieldset>
        <legend><?php echo __('Add Galaxy'); ?></legend>
        <?php echo $this->Form->input('name');
        echo $this->Form->input('description');
        echo $this->Form->input('quadrant_id', array('options'=>$options));
        ?>
    </fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>