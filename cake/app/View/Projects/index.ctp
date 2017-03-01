<h1>List of Projects</h1>
<table>
    <tr>
        <th>name</th>
        <th>id</th>
        <th>description</th>
        <th>user_id</th>
        <th>created</th>
    </tr>
    <?php foreach ($projects as $project): ?>
    <tr>
        <td><?php echo $project['Project']['name']; ?></td>
        <td><?php echo $project['Project']['id']; ?></td>
        <td><?php echo $project['Project']['description']; ?></td>
        <td><?php echo $project['Project']['user_id']; ?></td>
        <td><?php echo $project['Project']['created']; ?></td>
    </tr>
    <?php endforeach; ?>
    <?php unset($post); ?>
</table>