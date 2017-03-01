<?php

class SkillsController extends AppController {
    var $name = 'Skills';
    public $components = array('RequestHandler');

    public function beforeFilter() {
          parent::beforeFilter();
          
         $this->Auth->allow('skillslist');
          
      }
      

    public function skillslist($planet_id) {
          $skills = $this->Skill->find('all', array(
              'conditions' => array('Skill.planet_id' => $planet_id),
              'group' => 'Skill.id'
              )
          );
          $this->set(array(
              'skills' => $skills,
              '_serialize' => array('skills')
          ));
          
      }
      
    public function index() {
          $this->Skill->recursive = 0;
          $skills = $this->Skill->find('all', array('group' => 'Skill.id'));
          //$this->set('stars', $stars);
          $this->set(array(
              'skills' => $skills,
              '_serialize' => array('skills')
          ));
          
      }

    public function add() {

      if ($this->request->is('post')) {

            //$this->Skill->create();
            $this->Skill->set($this->request->data);

            if($this->Skill->validates()) {
                // add skill
                if($this->Skill->save($this->request->data)) {  
                        $message = array(
                            'text' => __('New Skill Saved.'),
                            'type' => 'success',
                            'skill' => $this->Skill->findById($this->Skill->id)
                            );
                }
                else{
                       $message = array(
                            'text' => __('Adding Skills fails.'),
                            'type' => 'error'
                            );
                }
                      
            } 
            else {

                  $errors = $this->Skill->validationErrors;
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
                          'text' => __('http tyep error'),
                          'type' => 'error'
                      ),
                      '_serialize' => array('message')
                  ));
                  //$this->response->statusCode(400);
      }  
  }

    public function delete($id = null) {
          $this->request->onlyAllow('post');
          $this->Skill->id = $id;
          if (!$this->Skill->exists()) {
                $message = array(
                            'text' => __('invalid id.'),
                            'type' => 'error'
                            );
          }
          else {

                if ($this->Skill->delete()) {
                     $message = array(
                                'text' => __('Skill deleted.'),
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
          //to-do:  secure this method for allow user delete only the skills belongs to him
    }
}
