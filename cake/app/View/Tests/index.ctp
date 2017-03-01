<?php
	echo "Hello!";
	echo $this->Html->css('valeriastylesheet');
	$this->Html->scriptStart(array('inline' => false));
	echo $this->Js->alert('I am in the javascript');
	$this->Html->scriptEnd();
?>