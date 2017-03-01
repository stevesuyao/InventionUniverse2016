<?php
App::uses('AppModel', 'Model');
class Star extends AppModel {
    var $name = 'Star';
    public $belongsTo = array(
        'Galaxy' => array(
            'className'     => 'galaxy',
            'conditions'    => '',
            'order'         => '',
            'foreignKey'    => 'galaxy_id'
        )
    );
    public $hasOne = array(
        'GalaxyStarEdge' => array(
            'className' => 'GalaxyStarEdge',
            'conditions'   => '',
            'dependent'    => 'true',
            'foreignKey'  => ''
        )
    );
    public $validate = array(
        'name' => array(
            'required' => array(
                'rule' => array('notEmpty'),
                'message' => 'A name is required'
            )
        ),
        'description' => array(
            'required' => array(
                'rule' => array('notEmpty'),
                'message' => 'A description is required'
            )
        ),
        'galaxy_id' => array(
            'required' => array(
                'rule' => array('notEmpty'),
                'message' => 'A galaxy_id is required'
            )
        )
    );
}