<?php
App::uses('AppModel', 'Model');

class Project extends AppModel {
    var $name = 'Project';
    public $belongsTo = array(
        'User' => array(
            'className'     => 'user',
            'conditions'    => '',
            'order'         => '',
            'foreignKey'    => 'user_id'
        )
    );
    public $hasOne = array(
        'UserProjectEdge' => array(
            'className' => 'UserProjectEdge',
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
        'user_id' => array(
            'required' => array(
                'rule' => array('notEmpty'),
                'message' => 'A user_id is required'
            )
        ),
        'link' => array(
            'required' => array(
                'rule' => array('notEmpty'),
                'message' => 'A link is required'
            )
        )
    );
}


