<h1>List of Galaxies</h1>
<table>
    <tr>
        <th>name</th>
        <th>id</th>
    </tr>


    <?php foreach ($galaxies as $galaxy): ?>
    <tr>
        <td><?php echo $galaxy['Galaxy']['name']; ?></td>
        <td><?php echo $galaxy['Galaxy']['id']; ?></td>
    </tr>
    <?php endforeach; ?>
    <?php unset($post); ?>
</table>