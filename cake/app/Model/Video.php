<?php
App::uses('AppModel', 'Model');
class Video extends AppModel {
    var $name = 'Video';
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
                'deleteFolderOnDelete' => false,
                'fields' => array(
                    'dir' => 'file_url'
                )
            ),
            'pdf' => array(
                'deleteFolderOnDelete' => false,
               'fields' => array(
                    'dir' => 'file_url'
               ) 
            ),
            'ppt' => array(
                'deleteFolderOnDelete' => false,
               'fields' => array(
                    'dir' => 'file_url'
               ) 
            ),
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
        ),
        'pdf' => array(
           'uploadRule-1'=>array(
                'rule' => array('isValidMimeType', array('application/pdf'),false),
                'message' => 'Error: File must be pdf'
            ),
           'uploadRule-2'=>array(
                'rule' => array('isBelowMaxSize', 8096000,false),
                'message' => 'File is larger than the maximum filesize 8MB'
            )
        ),
        'ppt' => array(
           'uploadRule-1'=>array(
                'rule' => array('isValidMimeType', array('application/vnd.ms-powerpoint','application/msword'),false),
                'message' => 'Error: File must be ppt'
            ),
           'uploadRule-2'=>array(
                'rule' => array('isBelowMaxSize', 8096000,false),
                'message' => 'File is larger than the maximum filesize 8MB'
            )
        ),
    );

}
