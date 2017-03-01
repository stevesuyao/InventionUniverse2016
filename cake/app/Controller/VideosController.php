<?php

class VideosController extends AppController {
    var $name = 'Videos';
    public $components = array('RequestHandler');

    public function beforeFilter() {
        parent::beforeFilter();
        
       $this->Auth->allow('videoslist');
        
    }
    

    public function videoslist($planet_id) {
        $videos = $this->Video->find('all', array(
            'conditions' => array('Video.planet_id' => $planet_id),
            'group' => 'Video.id'
            )
        );
        $this->set(array(
            'videos' => $videos,
            '_serialize' => array('videos')
        ));
        
    }

    public function get($id){
        //$this->Profile->recursive = 0;
        //$profile = $this->Profile->find('first',array('conditions' => array('user_id' => $id)));
        $video = $this->Video->findById($id);
         //$profiles = $this->Profile->find('all', array('group' => 'Profile.id'));
        $this->set(array(
             'message' => array(
                            'type' => 'sucess',
                            'video' => $video
                        ),
            '_serialize' => array('message')
        ));
    }
    
    public function index() {
        $this->Video->recursive = 0;
        $videos = $this->Video->find('all', array('group' => 'Video.id'));
        //$this->set('stars', $stars);
        $this->set(array(
            'videos' => $videos,
            '_serialize' => array('videos')
        ));
        
    }

    public function add() {

      if ($this->request->is('POST')) {


            $this->Video->create();

            if($this->Video->validates()) {
                // add Video
                if($this->Video->save($this->request->data)) {  
                        $message = array(
                            'text' => __('New Video Saved.'),
                            'type' => 'success',
                            'Video' => $this->Video->findById($this->Video->id)
                            );
                }
                else{
                       $message = array(
                            'text' => __('Adding Project fails. Please make sure your file size is not larger than 4MB.'),
                            'type' => 'error'
                            );
                }
                      
            } 
            else {

                  $errors = $this->Planet->validationErrors;
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
                          'type' => 'error',
                          'test' => $this->request
                      ),
                      '_serialize' => array('message')
                  ));
                  //$this->response->statusCode(400);
      }  
  }

    public function delete($id = null) {
          $this->request->onlyAllow('post');
          $this->Video->id = $id;
          if (!$this->Video->exists()) {
                $message = array(
                            'text' => __('invalid id.'),
                            'type' => 'error'
                            );
          }
          else {

                if ($this->Video->delete()) {
                     $message = array(
                                'text' => __('Video deleted.'),
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
          //to-do:  secure this method for allow user delete only the Videos belongs to him
    }

    public function edit($id = null) {

       if ($this->request->is('post')) {

            if($this->Auth->login()) {
              // validate username and password
                $video = $this->Video->findById($id);
                $this->Video->id = $id;
                $userId = $this->Auth->user('id');
                $video_planetId = $this->Video->findAllById($id)[0]['Video']['planet_id'];
                $this->Planet = ClassRegistry::init('Planet');
                $planet_id = $this->Planet->findByUserId($userId)['Planet']['id'];

                if($video_planetId === $planet_id) {
                    $this->Video->set($this->request->data);

                    if($this->Video->save($this->request->data)) {     
                        $message = array(
                            'text' => __('Project is updated.'),
                            'type' => 'success',
                            'video' => $this->Video->findById($id)
                            );
                    } 
                    else {
                        $errors = $this->Video->validationErrors;
                        $message = array(
                                'text' => $errors,
                                'type' => 'error',
                            );
                    }

                  // $message = array(
                  //                   'text' => __('test right, can edit'),
                  //                   'type' => 'sucess',
                                    
                  //               ); 

                }
                else {

                    $message = array(
                                    'text' => __('not your video, no right to edit'),
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

        else {
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


