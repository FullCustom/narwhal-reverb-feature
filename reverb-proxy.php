<?php
// reverb-proxy.php
ini_set('display_errors', 0); // Disable HTML error display
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log'); // Log errors to file

$token = '59ff7211ac382205accabbbdf9ff28935b35cb7580b343bf1cebceeaf3e6d47f'; // Move to .env or server config in production

// Allow CORS for testing (restrict in production)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Fetch Reverb API data
$apiUrl = 'https://api.reverb.com/api/listings?query=narwhal%20industries&per_page=6&sort_by=created_at&sort_order=desc';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Accept: application/hal+json, application/json",
    "Content-Type: application/hal+json",
    "Accept-Version: 3.0",
    "Authorization: Bearer $token"
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Enable SSL verification
curl_setopt($ch, CURLOPT_CAINFO, __DIR__ . '/cacert.pem'); // Path to CA bundle
curl_setopt($ch, CURLOPT_VERBOSE, true); // Enable verbose output

$response = curl_exec($ch);
if ($response === false) {
    $error = curl_error($ch);
    error_log("CURL Error: $error");
    echo json_encode(['error' => 'CURL failed: ' . $error]);
} else {
    echo $response;
}
curl_close($ch);
?>