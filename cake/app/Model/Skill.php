<?php
App::uses('AppModel', 'Model');
class Skill extends AppModel {
    var $name = 'Skill';
/*    public $belongsTo = array(
        'User' => array(
            'className'     => 'quadrant',
            'conditions'    => '',
            'order'         => '',
            'foreignKey'    => 'quadrant_id'
        )
    );*/



    public $validate = array(

      'type'=> array(
            'requiered' => array(
                'rule' => array('notBlank'),
                'message' => 'please add skill type.'
            )
        ),
       'name'=> array(
            'requiered' => array(
                'rule' => array('notBlank'),
                'message' => 'please add skill name.'
            )
        ),
       'level'=> array(
            'requiered' => array(
                'rule' => array('notBlank'),
                'message' => 'please add skill level.'
            )
        ),
       // 'star_id' => array(
       //      'required' => array(
       //          'rule' => array('notEmpty'),
       //          'message' => 'A star_id is required',
       //          'allowEmpty' => true
       //      )

    );

}
