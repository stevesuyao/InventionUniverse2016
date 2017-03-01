<?php
class ProjectsController extends AppController {
    var $name = 'Projects';
    public function index() {
        $this->Project->recursive = 0;
        $projects = $this->Project->find('all', array('group' => 'Project.id'));
        $this->set('projects', $projects);
    }
    
    public function add() {
        $this->User = ClassRegistry::init('User');
        $users = $this->User->find('all', array('group' => 'user.id'));
        $this->set('users', $users);      
        $options = array();
        foreach ($users as $user) {
            $name = $user['User']['username'];
            array_push($options, $name);
        }
        $options = array_filter(array_merge(array(0), $options));
        $this->set('options',$options);
        if ($this->request->is('post')) {
            $this->Project->create();
            $connect = ($this->request->data);
            $userid = $this->Auth->user('id'); //added for Authorization purposes
            $this->request->data['Project']['user_id'] = $userid; //this one too
            if ($this->Project->save($this->request->data)) {
                $projectid = $this->Project->id;
                //$userid = $connect['Project']['user_id'];
                $this->UserProjectEdge = ClassRegistry::init('UserProjectEdge');
                $edge = new UserProjectEdge();
                $edge->create();
                $edgedata = array(
                    'UserProjectEdge' => array('project_id' => $projectid,'user_id' => $userid)
                );
                $edge->set($edgedata);
                $edge->save();
                $this->Session->setFlash(__('The project has been saved'));
                return $this->redirect(array('action' => 'index'));
            }
            $this->Session->setFlash(
                __('The project could not be saved. Please, try again.')
            );
        }
    }
}