<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');


$product_json = './product.json';
$products = file_get_contents($product_json);
$products = json_decode($products);

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode(($products));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $product = file_get_contents('php://input');
    $product = json_decode($product);
    $product->id = uniqid();
    array_push($products, $product);
    file_put_contents($product_json, json_encode($products));
    echo json_encode(array(
            "product"=>$products, 
            "message"=> array(
                "message"=> "Product added",
                "msg_type"=> "alert-success"
            )
        ));
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $product = file_get_contents('php://input');
    $product = json_decode($product);
    foreach($products as $key => $value) {
            if($value->id === $product->id) {
                unset($products[$key]);
            }
    }
    file_put_contents($product_json, json_encode(array_values($products)));
    echo json_encode(array(
        "product"=>$products, 
        "message"=> array(
            "message"=>"Product deleted",
            "msg_type"=> "alert-success"
        )
    ));
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $product = file_get_contents('php://input');
    $product = json_decode($product);
    foreach($products as $key => $value) {
            if($value->id === $product->id) {
                $products[$key] = $product;
                break;
            }
    }
    file_put_contents($product_json, json_encode($products));
    echo json_encode(array(
        "product"=>$products, 
        "message"=> array(
            "message"=>"Product updated",
            "msg_type"=> "alert-success"
        )
    ));
}