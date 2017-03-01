<?php
//App::uses('AppModel', 'Model', 'UserStarEdge');
App::uses('AppModel', 'Model');
App::uses('SimplePasswordHasher', 'Controller/Component/Auth');
//App::uses('SimplePasswordHasher');

class User extends AppModel {
    //var $name = 'User';

    public function beforeSave($options = array()) {
        if (isset($this->data[$this->alias]['password'])) {
            $this->data[$this->alias]['password'] = AuthComponent::password($this->data[$this->alias]['password']);
        }
        if (!isset($this->data[$this->alias]['role'])) {
            $this->data[$this->alias]['role'] = 'author';
        }

        return true;
    }

   /* public $belongsTo = array(
        'Star' => array(
            'className'     => 'star',
            'conditions'    => '',
            'order'         => '',
            'foreignKey'    => 'star_id'
        )
    );*/
    public $hasOne = array(
        'Planet' => array(
            'className' => 'planet'
        ),
        'Profile' => array(
            'className' => 'profile'
        )
    );
    public $validate = array(
        'username' => array(
            'required' => array(
                'rule' => array('isUnique'),
                'message' => 'This email has already been used.'
            )
        ),
        'password' => array(
            'required' => array(
                'rule' => array('minLength', 6),
                'message' => 'Password must be at least 6 characters long.'
            )
        )
        /*'role' => array(
            'valid' => array(
                'rule' => array('inList', array('admin', 'author')),
                'message' => 'Please enter a valid role',
                'allowEmpty' => false
            )
        ),
        'star_id' => array(
            'required' => array(
                'rule' => array('notEmpty'),
                'message' => 'A star_id is required',
                'allowEmpty' => true
            )
        )*/
    );
   /*public function beforeSave($options = array()) {
        if (isset($this->data[$this->alias]['password'])) {
            $passwordHasher = new SimplePasswordHasher();
            $this->data[$this->alias]['password'] = $passwordHasher->hash(
                $this->data[$this->alias]['password']
            );
        }
        return true;
    }*/

}


