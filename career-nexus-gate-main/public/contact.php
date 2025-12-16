<?php
// contact.php

// 1. Allow React to talk to this PHP file
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Only POST allowed"]);
    exit;
}

// 2. CONFIGURATION (Edit this!)
$to = "info@alliedcodesolutions.com"; // Your Receiving Email
$from_email = "info@alliedcodesolutions.com"; // Your Hostinger Email (Must match actual account)

// 3. Get Form Data (No Company field)
$name = $_POST['name'] ?? 'Unknown';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? 'New Inquiry';
$message_body = $_POST['message'] ?? '';
$phone = $_POST['phone'] ?? '';
$country_code = $_POST['country_code'] ?? '';

// 4. Create Email Body
$subject_line = "New Website Message: " . $subject;
$message_content = "
New Contact Submission
----------------------
Name: $name
Email: $email
Phone: $country_code $phone

Message:
$message_body
";

// 5. Handle Attachment & Send
$boundary = md5(time());

// Headers
$headers = "From: $from_email\r\n";
$headers .= "Reply-To: $email\r\n"; // Clicking reply goes to the customer
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Message Body
$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $message_content . "\r\n";

// Attachment Logic
if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == UPLOAD_ERR_OK) {
    $file_tmp = $_FILES['attachment']['tmp_name'];
    $file_name = $_FILES['attachment']['name'];
    $file_size = $_FILES['attachment']['size'];
    
    // Read the file
    $handle = fopen($file_tmp, "r");
    $content = fread($handle, $file_size);
    fclose($handle);
    $encoded_content = chunk_split(base64_encode($content));

    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"$file_name\"\r\n";
    $body .= "Content-Description: $file_name\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$file_name\"; size=$file_size;\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= $encoded_content . "\r\n";
}

$body .= "--$boundary--";

// 6. Send
if (mail($to, $subject_line, $body, $headers)) {
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Mail failed"]);
}
?>