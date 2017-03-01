<?php
	echo $this->Html->charset();
	echo $this->Html->css(array('nav', 'minimap', 'controlbar', 'z-index', 'upload-box', 'search-box-display'));
	echo $this->Html->script(array('interface', 'interface-cross-hairs'));
?>

<!--body background="/cake/img/background.png" style="font:12px Arial, Helvetica, sans-serif; text-align:center;" overflow:hidden;-->
<div id="z-index-main-page">
	<div id="cross-hairs" style=" position:absolute; margin-left:-8.5%; margin-top:-9%;">
		<img src="/cake/img/biostuff5.png" width="200" height="200"/>
	</div>
	<div id="frame" class="frame">
		<div id="toggle-slide-frame">
			<div id="navDiv1"><img src="/cake/img/nav_frame1.png" width="100%" height="100%"/></div>
			<div id="nav-background"><img src="/cake/img/nav-back.png" width="100%" height="100%"/></div>
			<div id="inside-frame">
				<div id="navDiv2frame-bio" class="navDiv2frame">
					<div id="navDiv2left-bio" class="navDiv2left"><img src="/cake/img/avatar.png" width="100%" height="100%"/></div>
					<div id="navDiv2center-bio" class="navDiv2center"><label id="label-center-bio">Click here to try changing the bio</label></div>
					<div id="navDiv2right-bio" class="navDiv2right"><img src="/cake/img/nav_blank.png" width="100%" height="100%"/></div>
				</div>
				<div id="navDiv2frame-pro" class="navDiv2frame">
					<div id="navDiv2left-pro" class="navDiv2left"><img src="/cake/img/avatar.png" width="100%" height="100%"/></div>
					<div id="navDiv2center-pro" class="navDiv2center"><img id="project-image" src="/cake/img/nav_projects_nav2_center.png" width="60%" height="75%"/></div>
					<div id="navDiv2right-pro" class="navDiv2right"><img src="/cake/img/nav_blank.png" width="100%" height="100%"/></div>
				</div>
				<div id="navDiv2frame-roc" class="navDiv2frame">
					<div id="navDiv2left-roc" class="navDiv2left"><img src="/cake/img/nav_blank.png" width="100%" height="100%"/></div>
					<div id="navDiv2center-roc" class="navDiv2center"><img src="/cake/img/nav_rocket_nav2_center.png" width="100%" height="100%"/></div>
					<div id="navDiv2right-roc" class="navDiv2right"><img src="/cake/img/nav_blank.png" width="100%" height="100%"/></div>
				</div>
				<div id="navDiv3frame">
					<div id="navDiv3left"><img id="navDiv3left-arrow-image" src="/cake/img/nav_projects_frame3_left.png" width="100%" height="100%"/></div>
					<div id="navDiv3center">
						<ul id="menu">
							<li><a id="label-link-bio" class="label-links">Bio|</a></li>
							<li><a href="http://www.build-it-yourself.com/" target="_blank" class="label-links" >Website|</a></li>
							<li><a id="label-link-ski" class="label-links">Skill Set|</a></li>
							<li><a id="label-link-pro" class="label-links">Projects|</a></li>
							<li><a id="label-link-roc" class="label-links">Rocket</a></li>
						</ul>
					</div>
					<div id="navDiv3right"><img id="navDiv3right-arrow-image" src="/cake/img/nav_projects_frame3_right.png" width="100%" height="100%"/></div>
				</div>
			</div>
		</div>
		<div id="opening-bar">
			<img src="/cake/img/opening-bar.png" width="26%">
		</div>
	</div>

	<div>
		<img src="/cake/img/biostuff1.png" style="margin-top:30px" width="200" height="200" style="text-align:center" />
	</div>
	<div style=" position:absolute; margin-left:5%; bottom:80%;">
		<img src="/cake/img/biostuff2.png" width="100" height="100"/>
	</div>
	<div id="minimap1"><img src="/cake/img/minimap1.png" width="100%" height="100%"/>
	</div>
	<div id="minimap2"><img src="/cake/img/minimap2.png" width="100%" height="100%"/>
	</div>
	<div id="controlbar"><img src="/cake/img/controlbar.png" width="150%" height="130%"/>
	</div>
	<div id="button-upload">
		<div id="button-upload-normal">
			<img src="/cake/img/buttons/upload-normal.png" width="67%"/>
		</div>
		<div id="button-upload-hover">
			<img src="/cake/img/buttons/upload-hover.png" width="66%"/>
		</div>
	</div>
	<div id="button-search">
		<div id="button-search-normal">
			<img src="/cake/img/buttons/search-normal.png" width="67%"/>
		</div>
		<div id="button-search-hover">
			<img src="/cake/img/buttons/search-hover.png" width="66%"/>
		</div>
	</div>
	<div id="search-box">
		<input class="search-box" type="text" placeholder="Search...">
	</div>
</div>
<div id="search-box-display">
</div>
<div id="upload-box">
	<div id="upload-title">Upload your stuff here</div>
	<div id="upload-box-close">
		X
	</div>
	<div id="upload-biography">
		<div id="upload-biography-title">
			Change your Biography
		</div>
		<div id="upload-biography-text">
			<textarea>You chage your biography here</textarea>
		</div>
	</div>
	<div id="upload-summary">
		<div id="upload-summary-title">
			Change your Summary
		</div>
		<div id="upload-summary-text">
			<textarea>You chage your summary here</textarea>
		</div>
	</div>
	<div id="upload-projects">
		<div id="upload-projects-title">
			Add more projects
		</div>
		<div id="upload-projects-text">
			<form enctype="multipart/form-data">
				<table id="projects-form">
						<tr>
							<td><font color="white" size="4px">Name</font></td>
							<td>
								<input type="text" placeholder="Your project name"></input>
							</td>
						</tr>
						<tr>
							<td><font color="white" size="4px">Description</font></td>
							<td>
								<textarea placeholder="Your project descriptiton" width="9%"></textarea>
							</td>
						</tr>
						<tr>
							<td><font color="white" size="4px">URL</font></td>
							<td>
								<input type="text" placeholder="Your project URL(If you have one)"></input>
							</td>
						</tr>
						<tr>
							<td><font color="white" size="4px">Image</font></td>
							<td>
								<input type="file" placeholder="Upload project image"></input>
							</td>
						</tr>
				</table>
			</form>
		</div>
	</div>
</div>
