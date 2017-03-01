<?php
App::uses('AppModel', 'Model');

class Quadrant extends AppModel {
    var $name = 'Quadrant';

    public $hasMany = array(
        'Galaxy' => array(
            'className' => 'galaxy',

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
    );
}


