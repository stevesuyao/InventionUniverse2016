<?php

class PlanetsController extends AppController {
    var $name = 'Planets';
    public $components = array('RequestHandler');

    public function beforeFilter() {
        parent::beforeFilter();
        
       $this->Auth->allow('index','planetslist');
        
    }
    
    /*public function isAuthorized($user) {
        // All registered users can add posts
        if ($this->action === 'add') {
            return true;
        }
        // The owner of a post can edit and delete it
        if (in_array($this->action, array('edit', 'delete'))) {
            $planettId = $this->request->params['pass'][0];
            if ($this->Planet->isOwnedBy($planetId, $user['id'])) {
                return true;
            }
        }
        return parent::isAuthorized($user);
    }*/



    public function planetslist($system_id) {
        $planets = $this->Planet->find('all', array(
            'conditions' => array('Planet.system_id' => $system_id),
            'group' => 'Planet.id'
            )
        );
        $this->set(array(
            'planets' => $planets,
            '_serialize' => array('planets')
        ));
        
    }
    
    public function index() {
        $this->Planet->recursive = 0;
        $planets = $this->Planet->find('all', array('group' => 'Planet.id'));
        //$this->set('stars', $stars);
        $this->set(array(
            'planets' => $planets,
            '_serialize' => array('planets')
        ));
        
    }

    public function add() {

    if ($this->request->is('post')) {

        if($this->Auth->login()){  // validate username and password

           //$this->Planet->create();
            $this->request->data['Planet']['user_id'] = $this->Auth->user('id');

            $this->Planet->set($this->request->data);


           /* $validater = array('user_id' => array(
                        'isUnique' => array(
                            'rule' => array('isUnique'),
                            'message' => 'you have alraedy got a planet.'
                        )
                        
                ));

            $this->Planet->validate = $validater;  // add data validation in controller*/

            if($this->Planet->validates()){
                if(!$this->Planet->data['Planet']['photo']['name']){
                    $message = array(
                        'text' =>array('photo'=> array("Please make sure you have named your planet and choosed a photo.")),
                        'type' => 'error',
                    );

                }else{  // add planet
                    $this->Planet->save($this->request->data); 
                    // refresh session user data
                    // $this->User = ClassRegistry::init('User');
                    // $user = $this->User->field('name', array(
                    //     'User.id' => $this->Session->read('Auth.User.id')
                    // )); 
                    // $this->Auth->login($user);  
                    $message = array(
                        'text' => __('New planet Saved.'),
                        'type' => 'success',
                        'planet' => $this->Planet->find('first', array(
                                                            'conditions' => array('user_id' => $this->request->data['Planet']['user_id'])
                                                            
                                                      ))
                        );
                }
                    
            } else {
                $errors = $this->Planet->validationErrors;
                $message = array(
                        'text' => $errors,
                        'type' => 'error',
                    );
            }

       }

        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
        
    }else{
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

/*public function testadd(){

    if ($this->request->is('post')) {
        $this->Planet->create();
        $da = $this->request->data;
        if ($this->Planet->save($this->request->data)) {
            $this->set(array(
                    'message' => array(
                        'data' => $da,
                        'type' => 'success'
                    ),
                    '_serialize' => array('message')
                ));
        } else {
            $this->Session->setFlash(__('The thumb could not be saved. Please, try again.'));
        }
    } else{

    }

  }*/
   

   public function edit($id) {

          if ($this->request->is('POST')) {

                if($this->Auth->login()){

                    $this->Planet->id = $id;
                    //$this->request->data['Planet']['description'] = 'test';
                    $userId = $this->Auth->user('id');
                    $planet_userId = $this->Planet->findAllById($id)[0]['Planet']['user_id'];
                    if($userId === $planet_userId){

                            if ($this->Planet->save($this->request->data)) {

                                $planet = $this->Planet->findById($id);
                                $message = array(
                                    'text' => __('Your planet has been updated.'),
                                    'type' => 'success',
                                    'planet' => $planet
                                );
                            } else {
                                $errors = $this->Planet->validationErrors;
                                $message = array(
                                    'text' => $errors,
                                    'type' => 'error'
                                );
                            }

                    } 
                    else{
                        //$test = $this->Planet->isOwnedBy($planetId, );
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
                else {
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
                    'text' => __('server fail'),
                    'type' => 'error'
                ),
                '_serialize' => array('message')
            ));

        }
    }


}
