<?php
// header('Access-Control-Allow-Origin: *');
class SystemsController extends AppController {
    var $name = 'Systems';
    public $helpers = array('Html', 'Js');
    public $components = array('RequestHandler');
    

    public function beforeFilter() {
        parent::beforeFilter();
        // Allow users to register and logout.
        $this->Auth->allow('index','systemslist');
    }

    public function systemslist($galaxy_id) {
       // if (!$galaxy_id) {
           // throw new NotFoundException(__('Invalid Galaxy'));
        //}
        //$galaxy_id = 1;
        $systems = $this->System->find('all', array(
            'conditions' => array('System.galaxy_id' => $galaxy_id),
            'group' => 'System.id'
            )
        );
       // $this->set('systems', $systems);
        $this->set(array(
            'systems' => $systems,
            '_serialize' => array('systems')
        ));
        
    }
    
    public function index() {
        $this->System->recursive = 0;
        $systems = $this->System->find('all', array('group' => 'System.id'));
        //$this->set('stars', $stars);
        $this->set(array(
            'systems' => $systems,
            '_serialize' => array('systems')
        ));
        
    }
   
        
}
