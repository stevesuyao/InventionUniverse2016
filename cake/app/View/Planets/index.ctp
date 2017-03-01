<h1>List of Stars</h1>
<table>
    <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Description</th>
        <th>Galaxy ID</th>
    </tr>


    <?php foreach ($stars as $star): ?>
    <tr>
        <td>
        <?php echo $star['Star']['name']; ?>
        </td>
        <td>
             <?php echo $star['Star']['id']; ?>
        </td>
        <td>
            <?php echo $star['Star']['description']; ?>
        </td>
        <td>
        <?php echo $this->Html->link($star['Star']['galaxy_id'],
            array('controller' => 'stars', 'action' => 'starslist', $star['Galaxy']['id'])); ?>
        </td>

    </tr>
    <?php endforeach; ?>
    <?php unset($post); ?>
</table>