<?php
App::uses('AppModel', 'Model');
class Planet extends AppModel {
    var $name = 'Planet';

    //define the Upload behavior 
    public $actsAs = array(
        'Upload.Upload' => array(
            'photo' => array(
                'fields' => array(
                    'dir' => 'image_url'
                )
            )
        )
    );

    public $hasMany = array(
        'Skill' => array(
            'className' => 'skill',

        ),
        'Video' => array(
            'className' => 'video',
        ),
        'Rocket' => array(
            'className'=> 'rocket'
        )

    );

    // public $belongsTo = array(
    //     'System' => array(
    //         'className'     => 'system',
    //         'conditions'    => '',
    //         'order'         => '',
    //         'foreignKey'    => 'system_id'
    //     )
    // );

   /* public $belongsTo = array(
        'User' => array(
            'className' => 'user',
            'conditions'    => '',
            'order'         => '',
            'fileds' => 'modified',
            'foreignKey'    => 'user_id'

        )

    );*/

    /*public function isOwnedBy($planet, $user) {
        return $this->field('id', array('id' => $planet, 'user_id' => $user)) !== false;
    }*/
   
    public $validate = array(
      'user_id' => array(
            'required' => array(
                'rule' => array('isUnique'),  // one user can only have one planet!
                'message' => 'you already got a planet.'
            )
        ),
      'photo' => array(
           'uploadRule-1'=>array(
                'rule' => array('isValidMimeType', array('image/png','image/jpeg','image/gif'),false),
                'message' => 'Error: File must be jpg/png/gif'
            ),
           'uploadRule-2'=>array(
                'rule' => array('isBelowMaxSize', 2024000, false),
                'message' => 'File is larger than the maximum filesize 2MB'
            )
        ),
      'name'=> array(
            'requiered' => array(
                'rule' => array('notBlank'),
                'message' => 'please name the planet first.'
            )
        )

    );

}