<?php
class menuController extends Controller {
	
	public function index() {
		$menu = $this->model->load(); // просим все записи
		$this->setResponce($menu); // возвращаем ответ
	}
}