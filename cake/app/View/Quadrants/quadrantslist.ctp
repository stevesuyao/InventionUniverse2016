<h1>List of Quadrants</h1>
<table>
    <tr>
        <th>name</th>
        <th>id</th>
    </tr>


    <?php foreach ($quadrants as $quadrant): ?>
    <tr>
        <td><?php echo $quadrant['Quadrant']['name']; ?></td>
        <td><?php echo $quadrant['Quadrant']['id']; ?></td>
    </tr>
    <?php endforeach; ?>
    <?php unset($post); ?>
</table>