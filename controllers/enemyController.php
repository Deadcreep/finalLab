<?php

class enemyController extends Controller {

	public function index() {		
		$enemies = $this->model->load();
        $this->setResponce($enemies);
	}
	
	public function view($data) {
		$enemy = $this->model->load($data['id']);
        $this->setResponce($enemy);
	}
	
	public function add() {
        $data = file_get_contents('php://input');
        $data = json_decode($data, true);
		if((isset($data['id'])) && (isset($data['name']))
			&& (isset($data['image'])) && (isset($data['power'])) && (isset($data['speed'])))
		{
			$dataToSave = array(
				'id'=>$data['id'],
				'name'=>$data['name'],
				'image'=>$data['image'],
				'power'=>$data['power'],
				'speed'=>$data['speed']
			);
			$addedItem=$this->model->create($dataToSave);
			$this->setResponce($addedItem);
		}
	}
	
	public function edit($id) {
        $data = file_get_contents('php://input');
        $data = json_decode($data, true);

        if((isset($data['id'])) && (isset($data['name']))
			&& (isset($data['image'])) && (isset($data['power'])) && (isset($data['speed'])))
		{			
			$dataToUpd=array(
				'id'=>$data['id'],
				'name'=>$data['name'],
				'image'=>$data['image'],
				'power'=>$data['power'],
				'speed'=>$data['speed']
			);

			$updItem=$this->model->save($data['id'], $dataToUpd);
			$this->setResponce($updItem);
		}
	}
	
	public function delete($id) {

		$delItem = $this->model->delete($id['id']);
        $this->setResponce($delItem);
	}

}