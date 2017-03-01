<h1>List of Galaxies</h1>
<table>
    <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Description</th>
        <th>Quadrant ID</th>
    </tr>


    <?php foreach ($galaxies as $galaxy): ?>
    <tr>
        <td>
        <?php echo $galaxy['Galaxy']['name']; ?>
        </td>
        <td>
             <?php echo $galaxy['Galaxy']['id']; ?>
        </td>
        <td>
            <?php echo $galaxy['Galaxy']['description']; ?>
        </td>
        <td>
        <?php echo $this->Html->link($galaxy['Galaxy']['quadrant_id'],
            array('controller' => 'galaxies', 'action' => 'galaxieslist', $galaxy['Quadrant']['id'])); ?>
        </td>

    </tr>
    <?php endforeach; ?>
    <?php unset($post); ?>
</table>