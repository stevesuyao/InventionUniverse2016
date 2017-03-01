<h1>List of Quadrants</h1>
<table>
    <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Description</th>
        <th>x</th>
        <th>y</th>
    </tr>


    <?php foreach ($quadrants as $quadrant): ?>
    <tr>
        <td>
        <?php echo $quadrant['Quadrant']['name']; ?>
        </td>
        <td>
             <?php echo $quadrant['Quadrant']['id']; ?>
        </td>
        <td>
            <?php echo $quadrant['Quadrant']['description']; ?>
        </td>
        <td>
            <?php echo $quadrant['Quadrant']['x']; ?>
        </td>
        <td>
            <?php echo $quadrant['Quadrant']['y']; ?>
        </td>
    </tr>
    <?php endforeach; ?>
    <?php unset($post); ?>
</table>