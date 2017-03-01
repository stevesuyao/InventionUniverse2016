<?php
App::uses('AppModel', 'Model');
class Galaxy extends AppModel {
    var $name = 'Galaxy';
    /*public $belongsTo = array(
        'Quadrant' => array(
            'className'     => 'quadrant',
            'conditions'    => '',
            'order'         => '',
            'foreignKey'    => 'quadrant_id'
        )
    );*/
    /*public $hasOne = array(
        'QuadrantGalaxyEdge' => array(
            'className' => 'QuadrantGalaxyEdge',
            'conditions'   => '',
            'dependent'    => 'true',
            'foreignKey'  => ''
        )
    );*/

    public $hasMany = array(
        'System' => array(
            'className' => 'system',

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
        'quadrant_id' => array(
            'required' => array(
                'rule' => array('notEmpty'),
                'message' => 'A quadrant_id is required'
            )
        )
    );
}
