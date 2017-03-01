<div class="container">
	<a href='#'>
		<div class="search-tab active_search_tab">User Search</div>
	</a>
	<div class="col-md-12 purple search_box">
		<?php
			echo $this->Form->create('Users');
			echo $this->Form->input('User.id');
			echo $this->Form->end('Search')
		?>
	</div>
</div>