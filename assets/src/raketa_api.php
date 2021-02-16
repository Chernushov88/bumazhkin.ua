<?php
$recepients = "leads@bp.planfix.com";
$sitename = "bumazhkin.com";

$mail = trim($_POST["mail"]);
$phone = trim($_POST["phone"]);
$name = trim($_POST["name"]);
$data_form = trim($_POST["data_form"]);
$vopros_form = trim($_POST["vopros"]);
$vopros2_form = trim($_POST["vopros2"]);
$predloz = trim($_POST["predloz"]);
$uslugi = trim($_POST["uslugi"]);
$details = trim($_POST["details"]);
$utm_source= trim($_POST["utm_source"]);
$utm_campaign= trim($_POST["utm_campaign"]);
$utm_medium= trim($_POST["utm_medium"]);
$date_submitted= date("Y-m-d");
$time_submitted= date("H:i");
$ip_address= $_SERVER["REMOTE_ADDR"];
$page_variant_name= trim($_POST["page_variant_name"]);
$page_uuid= trim($_POST["page_uuid"]);
$page_name= trim($_POST["page_name"]);
$page_url= trim($_POST["url"]);
$ref= trim($_POST["ref"]);
$src= trim($_POST["src"]);
$utm_term= trim($_POST["utm_term"]);
$utm_content= trim($_POST["utm_content"]);
$lead_name= trim($_POST["lead_name"]);
$lead_price= trim($_POST["lead_price"]);
$event_id= trim($_POST["event_id"]);
$landing_version= trim($_POST["landing_version"]);
$event_type= trim($_POST["event_type"]);
$event_subject= trim($_POST["event_subject"]);
$event_source= trim($_POST["event_source"]);
$event_motivation= trim($_POST["event_motivation"]);
$message_template_id= trim($_POST["message_template_id"]);
$product_id= trim($_POST["product_id"]);
$GA_client_ID = $_COOKIE["_ga"];

$pagetitle = "Новая регистрация с сайта";

//SEND MESSAGE TO TELEGRAM
function sendMessage($chatID, $messaggio, $token) {
$url = "https://api.telegram.org/" . $token . "/sendMessage?chat_id=" . $chatID;
$url = $url . "&text=" . urlencode($messaggio);
$ch = curl_init();
$optArray = array(
CURLOPT_URL => $url,
CURLOPT_RETURNTRANSFER => true
);
curl_setopt_array($ch, $optArray);
$result = curl_exec($ch);
curl_close($ch);
}

$pagetitleMessage = "";
$nameMessag = "";
$nameMail = "";
$mailMessag = "";
$mailMail = "";
$dataFormMessag = "";
$dataFormMail = "";
$voprosFormMessag = "";
$voprosFormMail = "";
$phoneMessag = "";
$phoneMail = "";
$vopros2FormMessag = "";
$vopros2FormMail = "";
$uslugiMessag = "";
$uslugiMail = "";
$predlozMessag = "";
$predlozMail = "";

if($pagetitle) {
	$pagetitleMessage = "‼ ".$pagetitle." ‼";
}
if($name) {
	$nameMessag = "\n👤 Имя: ".$name;
	$nameMail = "Имя: ".$name."<br>";
}

if($mail) {
	$mailMessag = "\n📧 E-mail: ".$mail;
	$mailMail = "E-mail: ".$mail."<br>";
}

if($data_form) {
	$dataFormMessag = "\n📝 Отправленная форма: ".$data_form;
	$dataFormMail = "Отправленная форма: ".$data_form."<br>";
}

if($vopros_form) {
	$voprosFormMessag = "\n🏢 Несколько слов о вашем бизнесе: ".$vopros_form;
	$voprosFormMail = "Несколько слов о вашем бизнесе: ".$vopros_form."<br>";
}

if($phone) {
	$phoneMessag = "\n☎ Телефон: ".$phone;
	$phoneMail = "Телефон: ".$phone."<br>";
}

if($vopros2_form) {
	$vopros2FormMessag = "\n❓ Вопрос: ".$vopros2_form;
	$vopros2FormMail = "Вопрос: ".$vopros2_form."<br>";
}

if($uslugi) {
	$uslugiMessag = "\n📝 Выбранная услуга: ".$uslugi;
	$uslugiMail = "Выбранная услуга: ".$uslugi."<br>";
}

if($predloz) {
	$predlozMessag = "\n📝 Пакетное предложение: ".$predloz;
	$predlozMail = "Пакетное предложение: ".$predloz."<br>";
}

$messaggio = "$pagetitleMessage $nameMessag $mailMessag $phoneMessag $dataFormMessag $voprosFormMessag $vopros2FormMessag $uslugiMessag $predlozMessag
🔗 page_url: $page_url
📅 date_submitted: $date_submitted
⏲ time_submitted: $time_submitted


lead_name: $lead_name
lead_price: $lead_price
ref: $ref
utm_source: $utm_source
utm_campaign: $utm_campaign
utm_medium: $utm_medium
utm_term: $utm_term
utm_content: $utm_content
";

$message = "
$nameMail
$mailMail
$phoneMail
$dataFormMail
$voprosFormMail
$vopros2FormMail
$uslugiMail
$predlozMail
page_url: $page_url<br>
date_submitted: $date_submitted<br>
time_submitted: $time_submitted<br>
lead_name: $lead_name<br>
lead_price: $lead_price<br>
ref: $ref<br>
utm_source: $utm_source<br>
utm_campaign: $utm_campaign<br>
utm_medium: $utm_medium<br>
utm_term: $utm_term<br>
utm_content: $utm_content<br>
";


$token = "bot766204164:AAFJ-s2rGyCZL7J2K3u-3Wk7s3wP2fy2u50";
if($name == "test"){
	$chatID = "-257864813";
	sendMessage($chatID, $messaggio, $token);
} else {
$chatID = "-1001351824752";
sendMessage($chatID, $messaggio, $token);

$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=urf-8" . "\r\n";
$headers .= "From: bumazhkin.com";
mail($recepients, $pagetitle, $message, $headers);
}
?>