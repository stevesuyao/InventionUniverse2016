<?php
App::uses('AppModel', 'Model');
class Rocket extends AppModel {
    var $name = 'Rocket';
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
                'deleteFolderOnDelete' => true,
                'fields' => array(
                    'dir' => 'image_url'
                )
            )
        )
    );


    public $validate = array(
      'photo' => array(
           'uploadRule-1'=>array(
                'rule' => array('isValidMimeType', array('image/png','image/jpeg','image/gif')),
                'message' => 'Error: File must be jpg/png/gif'
            ),
           'uploadRule-2'=>array(
                'rule' => array('isBelowMaxSize', 2024000),
                'message' => 'File is larger than the maximum filesize 2MB'
            )
        )
    );

}
