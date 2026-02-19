<?php
// contact_new.php - Hardened Version (No third-party dependencies)

// ============================================================
// CONFIGURATION — Edit these values
// ============================================================
define('TO_EMAIL',          'info@alliedcodesolutions.com');
define('FROM_EMAIL',        'info@alliedcodesolutions.com');
define('ALLOWED_ORIGIN',    'https://alliedcodesolutions.com'); // Your frontend domain
define('RATE_LIMIT_DIR',    sys_get_temp_dir());                // Dir to store rate-limit files
define('RATE_LIMIT_MAX',    5);                                 // Max submissions per window
define('RATE_LIMIT_WINDOW', 600);                               // Window in seconds (10 min)
define('MAX_FILE_SIZE',     1 * 1024 * 1024);                  // 1 MB
define('MAX_MESSAGE_LEN',   5000);                             // Max message characters
define('CAPTCHA_SECRET',    'YOUR_STRONG_RANDOM_SECRET');       // Change this! Used to sign tokens
define('CAPTCHA_TTL',       600);                               // Token valid for 10 minutes
// ============================================================


// ============================================================
// CORS
// ============================================================
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === ALLOWED_ORIGIN) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: ");
}
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


// ============================================================
// HELPERS
// ============================================================

function respond(int $code, string $status, string $message, array $extra = []): void {
    http_response_code($code);
    echo json_encode(array_merge(['status' => $status, 'message' => $message], $extra));
    exit;
}

function sanitize(string $input, int $maxLen = 500): string {
    $input = trim($input);
    $input = substr($input, 0, $maxLen);
    $input = strip_tags($input);
    $input = preg_replace('/[\r\n\t]/', ' ', $input); // Header injection guard
    return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
}

function isValidEmail(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false && strlen($email) <= 254;
}

function isValidPhone(string $phone): bool {
    return preg_match('/^[\d\s\+\-\(\)]{7,20}$/', $phone) === 1;
}


// ============================================================
// RATE LIMITING (file-based sliding window, no DB needed)
// ============================================================
function checkRateLimit(): void {
    $ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key  = preg_replace('/[^a-zA-Z0-9_]/', '_', $ip);
    $file = RATE_LIMIT_DIR . "/rl_contact_{$key}.json";
    $now  = time();
    $data = [];

    if (file_exists($file)) {
        $data = json_decode(file_get_contents($file), true) ?? [];
    }

    // Purge timestamps outside the window
    $data = array_values(array_filter($data, fn($ts) => ($now - $ts) < RATE_LIMIT_WINDOW));

    if (count($data) >= RATE_LIMIT_MAX) {
        respond(429, 'error', 'Too many requests. Please try again in a few minutes.');
    }

    $data[] = $now;
    file_put_contents($file, json_encode($data), LOCK_EX);
}


// ============================================================
// SIMPLE MATH CAPTCHA  (no Google, no JS library)
//
// Flow:
//   Step 1 — Frontend calls GET /contact_new.php?action=captcha
//             Returns: { question: "What is 4 + 7?", token: "<signed_token>" }
//
//   Step 2 — User types the answer into the form.
//
//   Step 3 — Frontend POSTs the form including:
//             captcha_token=<token>   (received in step 1)
//             captcha_answer=11       (user's typed answer)
//
//   Server verifies the answer matches what was baked into the token.
//   Tokens expire after CAPTCHA_TTL seconds and are single-use.
// ============================================================

function generateCaptchaToken(int $a, int $b, int $answer): string {
    $expires   = time() + CAPTCHA_TTL;
    $nonce     = bin2hex(random_bytes(8)); // Prevents token reuse
    $payload   = "{$a}:{$b}:{$answer}:{$expires}:{$nonce}";
    $signature = hash_hmac('sha256', $payload, CAPTCHA_SECRET);
    return base64_encode("{$payload}|{$signature}");
}

function markTokenUsed(string $token): void {
    $decoded = base64_decode($token, true);
    if (!$decoded) return;

    $parts = explode('|', $decoded);
    if (count($parts) !== 2) return;

    $fields = explode(':', $parts[0]);
    if (count($fields) !== 5) return;

    $nonce = $fields[4];
    $file  = RATE_LIMIT_DIR . "/captcha_used_{$nonce}.lock";

    if (file_exists($file)) {
        respond(400, 'error', 'CAPTCHA token already used. Please refresh and try again.');
    }

    file_put_contents($file, time(), LOCK_EX);
}

function verifyCaptchaToken(string $token, string $userAnswer): void {
    $decoded = base64_decode($token, true);
    if ($decoded === false) {
        respond(400, 'error', 'Invalid CAPTCHA token.');
    }

    $parts = explode('|', $decoded);
    if (count($parts) !== 2) {
        respond(400, 'error', 'Malformed CAPTCHA token.');
    }

    [$payload, $signature] = $parts;

    // Constant-time comparison prevents timing attacks
    $expectedSig = hash_hmac('sha256', $payload, CAPTCHA_SECRET);
    if (!hash_equals($expectedSig, $signature)) {
        respond(400, 'error', 'CAPTCHA token signature invalid.');
    }

    $fields = explode(':', $payload);
    if (count($fields) !== 5) {
        respond(400, 'error', 'Malformed CAPTCHA payload.');
    }

    [, , $answer, $expires,] = $fields;

    if (time() > (int)$expires) {
        respond(400, 'error', 'CAPTCHA expired. Please refresh and try again.');
    }

    if ((int)$userAnswer !== (int)$answer) {
        respond(400, 'error', 'Incorrect CAPTCHA answer. Please try again.');
    }
}


// ============================================================
// ROUTE: GET ?action=captcha  →  issue a fresh math challenge
// ============================================================
if ($_SERVER['REQUEST_METHOD'] === 'GET' && ($_GET['action'] ?? '') === 'captcha') {
    $a      = random_int(1, 15);
    $b      = random_int(1, 15);
    $answer = $a + $b;
    $token  = generateCaptchaToken($a, $b, $answer);

    echo json_encode([
        'status'   => 'ok',
        'question' => "What is {$a} + {$b}?",
        'token'    => $token,
    ]);
    exit;
}


// ============================================================
// ROUTE: POST  →  process the contact form
// ============================================================
try {

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respond(405, 'error', 'Only POST requests are allowed.');
    }

    // 1. Rate limit
    checkRateLimit();

    // 2. CAPTCHA — single-use token + answer check
    $captchaToken  = $_POST['captcha_token']  ?? '';
    $captchaAnswer = $_POST['captcha_answer'] ?? '';

    if (empty($captchaToken) || $captchaAnswer === '') {
        respond(400, 'error', 'CAPTCHA token and answer are required.');
    }

    markTokenUsed($captchaToken);                          // Enforce single-use before verify
    verifyCaptchaToken($captchaToken, $captchaAnswer);     // Signature + expiry + answer check

    // 3. Honeypot (must be present but empty)
    if (!isset($_POST['company'])) {
        respond(400, 'error', "Property 'company' not found on the object.");
    }
    if (!empty($_POST['company'])) {
        respond(400, 'error', 'Invalid submission.');
    }

    // 4. Required fields
    foreach (['name', 'email'] as $field) {
        if (empty(trim($_POST[$field] ?? ''))) {
            respond(400, 'error', "Field '$field' is required.");
        }
    }

    // 5. Sanitize & validate all inputs
    $name         = sanitize($_POST['name']         ?? '', 100);
    $email        = sanitize($_POST['email']        ?? '', 254);
    $subject      = sanitize($_POST['subject']      ?? 'No Subject', 200);
    $message_body = sanitize($_POST['message']      ?? '', MAX_MESSAGE_LEN);
    $phone        = sanitize($_POST['phone']        ?? '', 20);
    $country_code = sanitize($_POST['country_code'] ?? '', 10);

    if (!isValidEmail($email)) {
        respond(400, 'error', 'Invalid email address.');
    }

    if (!empty($phone) && !isValidPhone($phone)) {
        respond(400, 'error', 'Invalid phone number format.');
    }

    // 6. File upload validation
    $isResume  = false;
    $file_name = '';

    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] !== UPLOAD_ERR_NO_FILE) {

        $fileError = $_FILES['attachment']['error'];

        if ($fileError !== UPLOAD_ERR_OK) {
            $uploadErrors = [
                UPLOAD_ERR_INI_SIZE   => 'File exceeds the server upload limit.',
                UPLOAD_ERR_FORM_SIZE  => 'File exceeds the form upload limit.',
                UPLOAD_ERR_PARTIAL    => 'File was only partially uploaded.',
                UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder on server.',
                UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk.',
                UPLOAD_ERR_EXTENSION  => 'Upload blocked by a server extension.',
            ];
            respond(400, 'error', $uploadErrors[$fileError] ?? 'Unknown upload error.');
        }

        // Size check
        if ($_FILES['attachment']['size'] > MAX_FILE_SIZE) {
            respond(400, 'error', 'File too large. Maximum 1MB allowed.');
        }

        // Real MIME detection via magic bytes — NOT the client-declared type
        $finfo    = new finfo(FILEINFO_MIME_TYPE);
        $realMime = $finfo->file($_FILES['attachment']['tmp_name']);

        $allowedMimes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!in_array($realMime, $allowedMimes, true)) {
            respond(400, 'error', 'Invalid file type. Only PDF, DOC, and DOCX are accepted.');
        }

        // Sanitize filename — whitelist chars, strip path traversal
        $file_name = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', basename($_FILES['attachment']['name']));
        $file_name = substr($file_name, 0, 100);

        $isResume = true;
    }

    // 7. Build email
    $subject_prefix = $isResume ? 'Resume Builder Submission' : 'New Contact Form Submission - ';
    $subject_line   = preg_replace('/[\r\n]/', '', $subject_prefix . $subject); // Strip injection chars

    $message_content = $isResume
        ? "Resume Builder Submission\n----------------------\nName: $name\nEmail: $email\nPhone: $country_code $phone\n"
        : "New Contact Submission\n----------------------\nName: $name\nEmail: $email\nPhone: $country_code $phone\n\nMessage:\n$message_body\n";

    $boundary = bin2hex(random_bytes(16)); // Cryptographically random

    $safe_from  = isValidEmail(FROM_EMAIL) ? FROM_EMAIL : '';
    $safe_reply = isValidEmail($email)     ? $email     : FROM_EMAIL;

    $headers  = "From: $safe_from\r\n";
    $headers .= "Reply-To: $safe_reply\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    $body  = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message_content . "\r\n";

    if ($isResume && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
        $file_tmp  = $_FILES['attachment']['tmp_name'];
        $file_size = $_FILES['attachment']['size'];
        $handle    = fopen($file_tmp, 'rb');
        $content   = fread($handle, $file_size);
        fclose($handle);
        $encoded   = chunk_split(base64_encode($content));

        $body .= "--$boundary\r\n";
        $body .= "Content-Type: application/octet-stream; name=\"$file_name\"\r\n";
        $body .= "Content-Description: $file_name\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$file_name\"; size=$file_size;\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= $encoded . "\r\n";
    }

    $body .= "--$boundary--";

    // 8. Send
    if (mail(TO_EMAIL, $subject_line, $body, $headers)) {
        respond(200, 'success', 'Your message has been sent successfully.');
    } else {
        respond(500, 'error', 'Mail delivery failed. Please try again later.');
    }

} catch (Throwable $e) {
    // Log internally — never expose raw error details to the client
    error_log('[contact_new.php] Error: ' . $e->getMessage());
    respond(500, 'error', 'An unexpected error occurred. Please try again later.');
}
?>