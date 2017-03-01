<?php
App::uses('AppModel', 'Model');
class System extends AppModel {
    var $name = 'System';
    // public $belongsTo = array(
    //     'Galaxy' => array(
    //         'className'     => 'galaxy',
    //         'conditions'    => '',
    //         'order'         => '',
    //         'foreignKey'    => 'galaxy_id'
    //     )
    // );

    public $hasMany = array(
        'Planet' => array(
            'className' => 'planet',

        )

    );
   
    /*public $validate = array(
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
    );*/
}