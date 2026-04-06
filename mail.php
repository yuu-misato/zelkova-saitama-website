<?php
// ZELKOVA SAITAMA - Contact Form Handler
// xserver PHP mail handler

// Set headers
header('Content-Type: text/html; charset=UTF-8');

// Allowed origin check
$allowed_domain = 'zelkovasaitama.net';

// Sanitize input
function clean($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Check if POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

// Get form data
$type    = clean($_POST['type'] ?? '');
$name    = clean($_POST['name'] ?? '');
$company = clean($_POST['company'] ?? '');
$email   = clean($_POST['email'] ?? '');
$phone   = clean($_POST['phone'] ?? '');
$message = clean($_POST['message'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($message) || empty($type)) {
    header('Location: contact.html?status=error');
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: contact.html?status=error');
    exit;
}

// Type labels
$type_labels = [
    'general'  => '一般のお問い合わせ',
    'sponsor'  => 'スポンサーシップ',
    'media'    => 'メディア取材',
    'business' => 'ビジネス提携',
    'other'    => 'その他',
];
$type_label = $type_labels[$type] ?? $type;

// Compose email
$to = 'info@zelkovasaitama.net';
$subject = "【ZELKOVA SAITAMA】お問い合わせ: {$type_label} - {$name}";

$body = <<<EOT
━━━━━━━━━━━━━━━━━━━━━━━━━━
ZELKOVA SAITAMA 公式サイト お問い合わせ
━━━━━━━━━━━━━━━━━━━━━━━━━━

■ お問い合わせ種別
{$type_label}

■ お名前
{$name}

■ 会社名
{$company}

■ メールアドレス
{$email}

■ 電話番号
{$phone}

■ お問い合わせ内容
{$message}

━━━━━━━━━━━━━━━━━━━━━━━━━━
※ このメールはzelkovasaitama.netのお問い合わせフォームから自動送信されています。
EOT;

// Email headers
$headers  = "From: noreply@zelkovasaitama.net\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$sent = mb_send_mail($to, $subject, $body, $headers);

// Auto-reply to sender
if ($sent) {
    $reply_subject = "【ZELKOVA SAITAMA】お問い合わせを受け付けました";
    $reply_body = <<<EOT
{$name} 様

この度はZELKOVA SAITAMAへお問い合わせいただき、誠にありがとうございます。

以下の内容でお問い合わせを受け付けました。
内容を確認の上、3営業日以内にご返信いたします。

━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お問い合わせ種別: {$type_label}
■ お問い合わせ内容:
{$message}
━━━━━━━━━━━━━━━━━━━━━━━━━━

ZELKOVA SAITAMA 3x3
https://zelkovasaitama.net
EOT;

    $reply_headers  = "From: info@zelkovasaitama.net\r\n";
    $reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mb_send_mail($email, $reply_subject, $reply_body, $reply_headers);
}

// Redirect
if ($sent) {
    header('Location: contact.html?status=success');
} else {
    header('Location: contact.html?status=error');
}
exit;
?>
