<?php
if (function_exists('curl_version')) {
    $curl = curl_version();
    echo "cURL Version: " . $curl['version'] . "\n";
} else {
    echo "cURL is not enabled.";
}
?>