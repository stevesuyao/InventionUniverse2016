<?php

class ProfilesController extends AppController {
    var $name = 'Profiles';
    public $components = array('RequestHandler');

   public function beforeFilter() {
        parent::beforeFilter();
        
       $this->Auth->allow('get');
        
    }

    public function get($id){
        //$this->Profile->recursive = 0;
        //$profile = $this->Profile->find('first',array('conditions' => array('user_id' => $id)));
        $profile = $this->Profile->findByUserId($id);
         //$profiles = $this->Profile->find('all', array('group' => 'Profile.id'));
        $this->set(array(
             'message' => array(
                            'type' => 'sucess',
                            'profile' => $profile
                        ),
            '_serialize' => array('message')
        ));
    }

    
    public function edit($id) {

       if ($this->request->is('post')) {

            if($this->Auth->login()){  // validate username and password
                $profile = $this->Profile->findById($id);
                $this->Profile->id = $id;
                $userId = $this->Auth->user('id');
                $profile_userId = $this->Profile->findAllById($id)[0]['Profile']['user_id'];

                if($userId === $profile_userId){
                    $this->Profile->set($this->request->data);

                //if($this->Profile->validates()){
                    // if(!$this->Planet->data['Planet']['photo']['name']){
                    //     $message = array(
                    //         'text' =>array('photo'=> array("Please make sure you have named your planet and choosed a photo.")),
                    //         'type' => 'error',
                    //     );

                    // }else{  
                    // update profile
                    if($this->Profile->save($this->request->data)) {     
                        $message = array(
                            'text' => __('Profile is updated.'),
                            'type' => 'success',
                            'profile' => $this->Profile->findById($id)
                            );
                    } 
                    else {
                        $errors = $this->Profile->validationErrors;
                        $message = array(
                                'text' => $errors,
                                'type' => 'error',
                            );
                    }

                }
                else{
                    $message = array(
                                    'text' => __('not your planet, no right to edit'),
                                    'type' => 'error',
                                    
                                ); 
                }

                $this->set(array(
                        'message' => $message,
                        '_serialize' => array('message')
                    ));
            
            }
            else{
                $this->set(array(
                        'message' => array(
                            'text' => __('please login first'),
                            'type' => 'error'
                        ),
                        '_serialize' => array('message')
                        ));

                }
        }

        else{
                $this->set(array(
                        'message' => array(
                            'text' => __('server fails'),
                            'type' => 'error'
                        ),
                        '_serialize' => array('message')
                    ));
                    //$this->response->statusCode(400);
        }
    }
          
}
