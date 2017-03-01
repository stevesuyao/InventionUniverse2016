<?php
// header('Access-Control-Allow-Origin: *');
class GalaxiesController extends AppController {
    var $name = 'Galaxies';
    public $helpers = array('Html', 'Js');
    public $components = array('RequestHandler');

    
    public function beforeFilter() {
        parent::beforeFilter();
        // Allow users to register and logout.
        $this->Auth->allow('index');
    }

    public function galaxieslist($quadrant_id = null) {
        if (!$quadrant_id) {
            throw new NotFoundException(__('Invalid Quadrant'));
        }
        $this->Galaxy->recursive = 0;
        $galaxies = $this->Galaxy->find('all', array(
            'conditions' => array('Galaxy.quadrant_id' => $quadrant_id),
            'group' => 'Galaxy.id'
            )
        );
        //$this->set('galaxies', $galaxies);
        $this->set(array(
            'galaxies' => $galaxies,
            '_serialize' => array('galaxies')
        ));
    }
    public function index() {
        $this->Galaxy->recursive = 0;  //Cake fetches a Group, its domain and its associated Users
        $galaxies = $this->Galaxy->find('all', array('group' => 'Galaxy.id'));
        //$this->set('galaxies', $galaxies);
        $this->set(array(
            'galaxies' => $galaxies,
            '_serialize' => array('galaxies')
        ));
    }
	public function add() {
	    $this->User = ClassRegistry::init('User');
	    $userid = $this->Auth->user('id');
	    $currentuser = $this->User->find('first', array(
            'conditions' => array('User.id' => $userid)
                ));
    	$role = $currentuser['User']['role'];
    	if (!($role == 'admin')) {
    	    $this->Session->setFlash(__('You do not have the authority to add a galaxy!'));
    	    $this->redirect(array('action'=>'index'));
            }
        $this->Quadrant = ClassRegistry::init('Quadrant');
        $quadrants = $this->Quadrant->find('all', array('group' => 'Quadrant.id'));
        $this->set('quadrants', $quadrants);
        $options = array();
        foreach ($quadrants as $quadrant) {
            $name = $quadrant['Quadrant']['name'];
            $quadid = $quadrant['Quadrant']['id'];
            $this->QuadrantGalaxyEdge = ClassRegistry::init('QuadrantGalaxyEdge');
            $current = $this->QuadrantGalaxyEdge->find('all', array(
                'conditions' => array('QuadrantGalaxyEdge.galaxy_id' => $quadid)
                ));
            $current = array_filter(array_merge(array(0), $current));
            $capacity = count($current);
            if ($capacity < 25) { // We want to have 24 galaxies per quadrant
                array_push($options, $name);
            }
        }
        $options = array_filter(array_merge(array(0), $options));
        $this->set('options',$options);
        if ($this->request->is('post')) {
        	//$this->request->data['Galaxy']['user_id'] = $this->Auth->user('id'); //added for Authorization purposes

            if ($this->Galaxy->save($this->request->data)) {
                $value = ($this->request->data);
                $name = $value['Galaxy']['name'];
                $description = $value['Galaxy']['description'];
                $quadid = $value['Galaxy']['quadrant_id'];
                $current = $this->Galaxy->find('first', array(
                    'conditions' => array('Galaxy.name' => $name),
                    'group' => 'Galaxy.id')
                );
                $galaxyid = $current['Galaxy']['id'];
                $quadrantid = $current['Galaxy']['quadrant_id'];
                $edge = new QuadrantGalaxyEdge();
                $edge->create();
                $edgedata = array(
                    'QuadrantGalaxyEdge' => array(
                        'quadrant_id' => $quadrantid,
                        'galaxy_id' => $galaxyid
                    )
                );
                $edge->set($edgedata);
                $edge->save();
                $this->Session->setFlash(__('The galaxy has been saved'));
                return $this->redirect(array('action' => 'index'));
                }
            $this->Session->setFlash(
                __('The galaxy could not be saved. Please, try again.')
            );
        }
    }
}