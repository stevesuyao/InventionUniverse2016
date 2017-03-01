<!-- File: /app/View/Posts/view.ctp -->
<h1>Username:<?php echo h($user['User']['username']); ?></h1>
<p>ID: <?php echo $user['User']['id']; ?></p>
<p>Created: <?php echo h($user['User']['created']); ?></p>
<p>Modified: <?php echo $user['User']['modified']; ?></p>
<p>Password: <?php echo $user['User']['password']; ?></p>
<p>Hits: <?php echo $user['User']['hits']; ?></p>