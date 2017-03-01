<?php
App::uses('AppModel', 'Model');
class Profile extends AppModel {
    var $name = 'Profile';
/*    public $belongsTo = array(
        'User' => array(
            'className'     => 'quadrant',
            'conditions'    => '',
            'order'         => '',
            'foreignKey'    => 'quadrant_id'
        )
    );*/

    //define the Upload behavior 
    public $actsAs = array(
        'Upload.Upload' => array(
            'photo' => array(
                'fields' => array(
                    'dir' => 'avatar_url'
                )
            )
        )
    );

    public $validate = array(
      'photo' => array(
           'uploadRule-1'=>array(
                'rule' => array('isValidMimeType', array('image/png','image/jpeg','image/gif'),false),
                'message' => 'Error: File must be jpg/png/gif'
            ),
           'uploadRule-2'=>array(
                'rule' => array('isBelowMaxSize', 2024000,false),
                'message' => 'File is larger than the maximum filesize 2MB'
            )
        )
    );

}
