<?php

class RocketsController extends AppController {
    var $name = 'Rockets';
    public $components = array('RequestHandler');

    public function beforeFilter() {
        parent::beforeFilter();
        
       $this->Auth->allow('rocketslist','gethottest');
        
    }
    

    public function rocketslist($planet_id) {
        $rockets = $this->Rocket->find('all', array(
            'conditions' => array('Rocket.planet_id' => $planet_id),
            'group' => 'Rocket.id'
            )
        );
        $this->set(array(
            'rockets' => $rockets,
            '_serialize' => array('rockets')
        ));
        
    }

    public function gethottest(){
          $rockets = $this->Rocket->find('first', array('order' => 'Rocket.hits DESC'));
        $this->set(array(
            'rockets' => $rockets,
            '_serialize' => array('rockets')
        ));
    }
    
    public function index() {
        $this->Rocket->recursive = 0;
        $rockets = $this->Rocket->find('all', array('group' => 'Rocket.id'));
        //$this->set('stars', $stars);
        $this->set(array(
            'rockets' => $rockets,
            '_serialize' => array('rockets')
        ));
        
    }

    public function add() {
        //to-do: test if the planet_id belongs to the auth user
        if ($this->request->is('post')) {
                $this->Rocket->create();
                $this->Rocket->set($this->request->data);
                if($this->Rocket->validates()){
                        if(!$this->Rocket->data['Rocket']['photo']['name']){
                              $message = array(
                                              'text' =>__('Please make sure you have choosed a photo.'),
                                              'type' => 'error',
                                          );
                        }
                        else {

                            if($this->Rocket->save($this->request->data)) {     
                                $message = array(
                                    'text' => __('New rocket Saved.'),
                                    'type' => 'success',
                                    'Rocket' => $this->Rocket->findById($this->Rocket->id)
                                    );
                              }
                              else {
                                     $message = array(
                                          'text' => __('server error.'),
                                          'type' => 'error'
                                      );
                              }
                        }       
                } 
                else {
                    $errors = $this->Rocket->validationErrors;
                    $message = array(
                            'text' => $errors,
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
                            'text' => __('http method error'),
                            'type' => 'error'
                        ),
                        '_serialize' => array('message')
                    ));
                   
        }
      
    }

    public function delete($id = null) {
        $this->request->onlyAllow('post');
        $this->Rocket->id = $id;
        if (!$this->Rocket->exists()) {
              $message = array(
                          'text' => __('invalid id.'),
                          'type' => 'error'
                          );
        }
        else {

              if ($this->Rocket->delete()) {
                   $message = array(
                              'text' => __('Rocket deleted.'),
                              'type' => 'success'
                              );
            }
            else {
                  $message = array(
                              'text' => __('server error.'),
                              'type' => 'error'
                              );
            }

        }
        
        $this->set(array(
            'message' => $message,
            '_serialize' => array('message')
        ));
        //to-do:  secure this method for allow user delete only the Rockets belongs to him
  }
  
}
