<?php
class indexController extends Controller {
	public function index(){
        $responce = "<!DOCTYPE html>
        <html lang=\"en\" ng-app=\"game\">
        <head>
            <meta charset=\"UTF-8\">
            <link rel=\"stylesheet\" href=\"./css/styles.css\">
            <script src=\"js/lib/angular.js\"></script>
            <script src=\"js/lib/angular-route.js\"></script>
            <script src=\"js/lib/angular-resource.js\"></script>
            <script src=\"js/app.js\"></script>
            <title>Menu</title>
        </head>
           <body link=\"black\" vlink=\"#DFB143\"><ng-view></ng-view></body>
        </html>";
		$this->setResponce($responce);
	}
}