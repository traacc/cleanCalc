<?php

$method = $_SERVER['REQUEST_METHOD'];
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
//$data = json_decode('{"type":"tires","height":"a","width":"a","depth":"a","tiresSize":"a","tiresNumbers":"a","name":"aaaaa","phone":"+7111111111","email":"1@1.com"}', true);
print_r($data);

$titles = array(
	"name"=>"Имя",
	"phone"=>"Телефон",
	"objectType"=>"Тип помещения",
	"flat"=>"Квартира",
	"house"=>"Дом",
	"non-living"=>"Нежилое помещение",
	"general"=>"Генеральная уборка",
	"wet"=>"Влажная уборка",
	"afterRepiar"=>"После ремонта",
	"support"=>"Поддерживающая",
	"ju"=>"Обслуживание юр лиц",
	"windows"=>"Мытье окон",
	"special"=>"Спец заказы",
	"cleaningType"=>"Тип уборки",
	"rooms" => "Количество комнат",
	"fqType" => "Переодичность",
	"once"=>"Разово",
	"many"=>"Регулярно",
	"sqM2"=>"Площадь",
	"workersCount"=>"Количество работников",
	"daysInWeek"=>"Дней в неделю",
	"standartPlastic" => "Мойка окон стандарт пластковое 1 створка (150 руб/шт)",
	"panoramic" => "Панорамное окно (300 руб/м2)",
	"balconyCount" => "Количество балконов",
	"windowWash" => "Мойка окон стандарт пластковое 1 створка (150 руб/шт)",
	"chair" => "Количество шин",
	"chair2" => "Длинна рулона",
	"seat" => "Масса рулона",
	"bedMatter" => "Диаметр рулона",
	"curtains" => "Диаметр внутренего вала",
	"ironing" => "Количество ярусов",
	"luster" => "Нагрузка на ярусы",
	"item" => "Имя пользователя",
	"fridge" => "Номер телефона",
	"totalCosts"=>"Стоимость",
);

function generateHtmlRow($key, $value) {
	return  "<tr style='background-color: #f8f8f8;'>"  . "
	<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
	<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
	</tr>";
}


$c = true;
	$project_name = trim("Prosklad");
	$admin_email  = trim("bs.nothing@yandex.ru");
	$form_subject = trim("Новая заявка на сайте");
	$email_message = "";
	$tl_message = "";
	foreach ( $data as $key => $value ) {
		//if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
			if($key=="objectType"||$key=="cleaningType"||$key=="fqType"){
				$email_message .= generateHtmlRow($titles[$key], $titles[$value]);
			} else {
				$email_message .= generateHtmlRow($titles[$key], $value);
			}

			/*$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
			<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$titles[$key]</b></td>
			<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
		</tr>
		";	
		$tlmessage .= "<b>" . $titles[$key] . "</b>" . PHP_EOL . $value . PHP_EOL;*/
	}


echo $email_message;
$email_message = "<table style='width: 100%;'>$email_message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: noreplay@prosklad.su' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

if(mail($admin_email, adopt($form_subject), $email_message, $headers )){
	$result = "success";
} else $result = "error";
