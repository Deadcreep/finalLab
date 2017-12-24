<?php

class userController extends Controller {

	public function index(){
		$users = $this->model->load();		// просим у модели все записи
		$this->setResponce($users);		// возвращаем ответ 
	}

	public function view($data){
		$user = $this->model->load($data['id']); // просим у модели конкретную запись
		$this->setResponce($user);
	}

	public function add(){
	    $data = file_get_contents('php://input');
	    $data = json_decode($data, true);

		if((isset($_POST['id'])) && (isset($_POST['name'])) && (isset($_POST['score'])))
		{
			$dataToSave = array('id'=>$_POST['id'], 'name'=>$_POST['name'], 'score'=>$_POST['score']);
			$addedItem = $this->model->create($dataToSave);
			$this->setResponce($addedItem);
		}
	}

	public function edit($id){
        $data = file_get_contents('php://input');
        $data = json_decode($data, true);
		
		if((isset($_PUT['id'])) && (isset($_PUT['name'])) && (isset($_PUT['score'])))
		{
			$dataToUpd = array('id'=>$data['id'], 'name'=>$data['name'], 'score'=>$data['score'] );
			$updItem = $this->model->save($data['id'], $dataToUpd);
			$this->setResponce($updItem);
		}
	}

	public function delete($data) {
		$deletedItem = $this->model->delete($data['id']);
        $this->setResponce($deletedItem);
	}

}