<div class="users form">
<?php echo $this->Form->create('Quadrant'); ?>
    <fieldset>
        <legend><?php echo __('Add Quadrant'); ?></legend>
        <?php echo $this->Form->input('name');
        echo $this->Form->input('description');
        ?>
    </fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>