<?php
// header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization,Content-type,username,password,apiKey');


App::uses('AppController', 'Controller');
App::uses('AuthComponent', 'Controller/Component');

class UsersController extends AppController {
	public $helpers = array('Html', 'Js');
    var $name = 'Users';
    public $components = array('RequestHandler');

    public function beforeFilter() {
        parent::beforeFilter();
        // Allow users to register and logout.
        $this->Auth->allow('add', 'login', 'logout');
    }
    public function login() {
        //if ($this->request->is('post')) {

            /*if ($this->Auth->login()) {
                   $this->set(array(
                        'message' => array(
                            'text' => __('You are logged in!'),
                            'type' => 'error'
                        ),
                        '_serialize' => array('message')
                        ));
                //return $this->redirect($this->Auth->redirect());
            }
            else{
                //$this->Session->setFlash(__('Invalid username or password, try again'));

                $this->set(array(
                    'message' => array(
                        'text' => __('Invalid username or password, try again'),
                        'type' => 'error'
                    ),
                    '_serialize' => array('message')
                ));
            }*/
            
            if( $this->Session->read('Auth.User')){
                //refresh session user
                $user = $this->Session->read('Auth.User');
                $this->Auth->login($user);
                $user_new = $this->Session->read('Auth.User');
                $user['Planet'] = $user_new['Planet'];
                $user['Profile'] = $user_new['Profile'];
                //get user position
                if($user['Planet']['system_id']){
                    $this->System = ClassRegistry::init('System');
                    $this->Galaxy = ClassRegistry::init('Galaxy');
                    $system = $this->System->findById($user['Planet']['system_id']);
                    $galaxyID = $system['System']['galaxy_id'];
                    $galaxy = $this->Galaxy->findById($galaxyID);
                    $qudrantID = $galaxy['Galaxy']['quadrant_id'];
                    $user['Planet']['galaxy_id'] = $galaxyID;
                    $user['Planet']['qudrant_id'] = $qudrantID;
                }

                $this->set(array(
                    'message' => array(
                        'text' => __('You have already logged in!'),
                        'type' => 'error',
                        'user' => $user
                        ),
                    

                    '_serialize' => array('message')
                ));

            } else{

            if ($this->Auth->login()) {
                $user = $this->Session->read('Auth.User');
                if($user['Planet']['system_id']){
                    $this->System = ClassRegistry::init('System');
                    $this->Galaxy = ClassRegistry::init('Galaxy');
                    $system = $this->System->findById($user['Planet']['system_id']);
                    $galaxyID = $system['System']['galaxy_id'];
                    $galaxy = $this->Galaxy->findById($galaxyID);
                    $qudrantID = $galaxy['Galaxy']['quadrant_id'];
                    $user['Planet']['galaxy_id'] = $galaxyID;
                    $user['Planet']['qudrant_id'] = $qudrantID;
                }
                $this->set(array(
                    'message' => array(
                        'text' => __('You are logged in!'),
                        'type' => 'sucess',
                        'user' => $user,//$this->Session->read('Auth.User')
                        ),
                    

                    '_serialize' => array('message')
                ));
            } else {
                 $this->set(array(
                    'message' => array(
                        'text' => __('Invalid username or password, try again'),
                        'type' => 'error',
                        'user' => $this->Auth->user()
                    ),
                    '_serialize' => array('message')
                ));
             
        }
    }

    }

    
    public function test($id = null) {
        if (!$id) {
            throw new NotFoundException(__('Invalid user'));
        }
        $user = $this->User->findById($id);
        $hits = $user['User']['hits'];
        $newhits = $hits + 1;
        $this->User->updateAll(
            array('User.hits' => $newhits),
            array('User.id' => $id)
        );
        $this->set('user', $user);
    }
    
    public function logout() {
        //$this->Session->setFlash(__('You have been logged out'));
       // return $this->redirect($this->Auth->logout());

        $this->Auth->logout();
        $this->set(array(
            'message' => array(
                'text' => __('You have logged out, please login again.'),
                'type' => 'info',
                //'user' => $this->Auth->user()
                ),
            '_serialize' => array('message')

            ));
        $this->Session->destroy();
    }
    
    public function index() {
        $this->User->recursive = 0;
        $users = $this->User->find('all', array('group' => 'User.id'));
        $this->set('users', $users);
    }

    public function view($id = null) {
        if (!$id) {
            throw new NotFoundException(__('Invalid user'));
        }
        $user = $this->User->findById($id);
        $hits = $user['User']['hits'];
        $newhits = $hits + 1;
        $this->User->updateAll(
            array('User.hits' => $newhits),
            array('User.id' => $id)
        );
        if (!$user) {
            throw new NotFoundException(__('Invalid user'));
        }
        $this->set('user', $user);
    }
    
    public function userslist($star_id = null) {
        if (!$star_id) {
            throw new NotFoundException(__('Invalid Star'));
        }
        $users = $this->User->find('all', array(
            'conditions' => array('User.star_id' => $star_id),
            'group' => 'User.id'
            )
        );
        $this->set('users', $users);
    }
    public function search() {
        if ($this->request->is('post')) {
            $value = $this->request->data['User']['id'];
            $this->redirect(array('controller'=>'users', 'action'=>'view', $value));
        }
    }
    public function add() {
        /*$this->Star = ClassRegistry::init('Star');
        $stars = $this->Star->find('all', array('group' => 'Star.id'));
        $this->set('stars', $stars);
        $options = array();
        foreach ($stars as $star) {
            $name = $star['Star']['name'];
            $starid = $star['Star']['id'];
            $this->UserStarEdge = ClassRegistry::init('UserStarEdge');
            $current = $this->UserStarEdge->find('all', array(
                'conditions' => array('UserStarEdge.star_id' => $starid)
                )
            );
            $current = array_filter(array_merge(array(0), $current));
            $capacity = count($current);
            if ($capacity < 11) {
                array_push($options, $name);
            }
        }
        $options = array_filter(array_merge(array(0), $options));
        $this->set('options',$options);
        if ($this->request->is('post')) {
            $this->User->create();
            $connect = ($this->request->data);
            if ($this->User->save($this->request->data)) {
                $uid = $this->User->id;
                $starid = $connect['User']['star_id'];
                $edge = new UserStarEdge();
                $edge->create();
                $edgedata = array(
                    'UserStarEdge' => array('user_id' => $uid,'star_id' => $starid)
                );
                $edge->set($edgedata);
                $edge->save();
                $this->Session->setFlash(__('The user has been saved'));
                return $this->redirect(array('action' => 'index'));
            }
            $this->Session->setFlash(
                __('The user could not be saved. Please, try again.')
            );
        }*/
         $this->Profile = ClassRegistry::init('Profile');
         if ($this->request->is('post')) {
            $this->User->create();

            if ($this->User->save($this->request->data)) {
                $uid = $this->User->id;
                $email = $this->User->findAllById($uid)[0]['User']['username'];
                $profile = new Profile();  
                $profile->create();
                $profiledata = array(
                    'Profile' => array('user_id' => $uid, 'email' =>$email)
                );
                $profile->set($profiledata);
                $profile->save();  // save a new profile for new user
                $this->Profile->create();
                $this->set(array(
                    'message' => array(
                        'text' => __('Signup successfully'),
                        'type' => 'success'
                    ),
                    '_serialize' => array('message')
                ));
            } else {
                $errors = $this->User->validationErrors;
                $this->set(array(
                     
                    'message' => array(
                        'text' => __('This username has already been used.'),
                        'type' => 'error',
                        'errors' => $errors
                    ),
                    '_serialize' => array('message')
                ));
                
            }
    
        }

        else {

            $this->set(array(
                    'message' => array(
                        'text' => __('server fail'),
                        'type' => 'error'
                    ),
                    '_serialize' => array('message')
                ));
                $this->response->statusCode(400);
            }
        
    }
    
    public function edit($id = null) {
        if (!$id) {
            throw new NotFoundException('No ID supplied');
            $this->redirect(array('controller'=>'users', 'action'=>'index'));
        } 
        $data = $this->User->findById($id); 
        if ($this->request->is('get')) { 
            $this->request->data = $data;
        }
        if ($this->request->is('post') || $this->request->is('put')) {
           $this->User->id = $id; 
           $this->User->save($this->request->data);
           $this->redirect(array('action'=>'index'));
        } 
    }

    public function delete($id = null) {
        $this->request->onlyAllow('post');
        $this->User->id = $id;
        if (!$this->User->exists()) {
            throw new NotFoundException(__('Invalid user'));
        }
        if ($this->User->delete()) {
            $this->Session->setFlash(__('User deleted'));
            return $this->redirect(array('action' => 'index'));
        }
        $this->Session->setFlash(__('User was not deleted'));
        return $this->redirect(array('action' => 'index'));
    }
}