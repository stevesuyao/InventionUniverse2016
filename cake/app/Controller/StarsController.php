<?php
header('Access-Control-Allow-Origin: *');
class StarsController extends AppController {
    var $name = 'Stars';
    public $helpers = array('Html', 'Js');
    public $components = array('RequestHandler');
    
    public function starslist($galaxy_id = null) {
        if (!$galaxy_id) {
            throw new NotFoundException(__('Invalid Galaxy'));
        }
        $stars = $this->Star->find('all', array(
            'conditions' => array('Star.galaxy_id' => $galaxy_id),
            'group' => 'Star.id'
            )
        );
        $this->set('stars', $stars);
    }
    public function test($galaxy_id = null) {
    	$starpaths = array('stars/star_1.jpg', 'stars/star_2.jpg', 'stars/star_3.jpg', 'stars/star_5.jpg');
    	$starids = array('1', '2', '3', '5');
    	$this->set('starids', $starids);
    	$this->set('starpaths', $starpaths);
    	Debugger::dump($starpaths);
    	Debugger::dump($starids);
    	
    }
    public function index() {
        $this->Star->recursive = 0;
        $stars = $this->Star->find('all', array('group' => 'Star.id'));
        //$this->set('stars', $stars);
        $this->set(array(
            'stars' => $stars,
            '_serialize' => array('stars')
        ));
        
    }
    public function add() {
        $this->Galaxy = ClassRegistry::init('Galaxy');
        $this->User = ClassRegistry::init('User');
	    $userid = $this->Auth->user('id');
	    $currentuser = $this->User->find('first', array(
            'conditions' => array('User.id' => $userid)
                ));
    	$role = $currentuser['User']['role'];
    	if (!($role == 'admin')) {
    	    $this->Session->setFlash(__('You do not have the authority to add a star!'));
    	    $this->redirect(array('action'=>'index'));
            }
        $galaxies = $this->Galaxy->find('all', array('group' => 'Galaxy.id'));
        $this->set('galaxies', $galaxies);
        $options = array();
        foreach ($galaxies as $galaxy) {
            $name = $galaxy['Galaxy']['name'];
            $galid = $galaxy['Galaxy']['id'];
            $this->GalaxyStarEdge = ClassRegistry::init('GalaxyStarEdge');
            $current = $this->GalaxyStarEdge->find('all', array(
                'conditions' => array('GalaxyStarEdge.star_id' => $galid)
                )
            );
            $current = array_filter(array_merge(array(0), $current));
            $capacity = count($current);
            if ($capacity < 37) {
                array_push($options, $name);
            }
        }
        $options = array_filter(array_merge(array(0), $options));
        $this->set('options',$options);
        if ($this->request->is('post')) {
            $userid = $this->Auth->user('id'); //added for Authorization purposes
            $this->request->data['Star']['user_id'] = $userid; //this one too
            if ($this->Star->save($this->request->data)) {
                $value = ($this->request->data);
                $name = $value['Star']['name'];
                $description = $value['Star']['description'];
                $galid = $value['Star']['galaxy_id'];
                $current = $this->Star->find('first', array(
                    'conditions' => array('Star.name' => $name),
                    'group' => 'Star.id'
                    )
                );
                $starid = $current['Star']['id'];
                $galaxyid = $current['Star']['galaxy_id'];
                $edge = new GalaxyStarEdge();
                $edge->create();
                $edgedata = array(
                    'GalaxyStarEdge' => array(
                        'star_id' => $starid,
                        'galaxy_id' => $galaxyid
                    )
                );
                $edge->set($edgedata);
                $edge->save();
                $this->Session->setFlash(__('The star has been saved'));
                return $this->redirect(array('action' => 'index'));
            }
            $this->Session->setFlash(
                __('The star could not be saved. Please, try again.')
            );
        }
    }
}