<?php

namespace SC\Http\Controllers\Test;

use Illuminate\Http\Request;
use Response;

class FormTestsController {
    public function index() {
        return view('test.form');
    }

    public function store(Request $request) {
        return $request;
    }

    public function getCategories(Request $request, Response $response) {
        $cats = [
            'it' => [
                'motherboards' => 'Motherboards',
                'cpus' => 'CPUs',
                'ram' => 'RAM'
            ],
            'diy' => [
                'hemmers' => 'Hemmers',
                'screwdrivers' => 'Screwdrivers',
                'pliers' => 'pliers'
            ],
            'fashion' => [
                'heats' => 'Heats',
                'pants' => 'Pants',
                'sorts' => 'Sorts'
            ],
        ];

        return response()->json($cats[$request->store]);
    }

    public function getProduct(Request $request, Response $response) {
        $cats = [
            'it' => [
                'motherboards' => [
                    'gigabyte' => 'Gigabyte',
                    'asua' => 'Asus',
                    'msi' => 'MSI'
                ],
                'cpus' => [
                    'intel' => 'Intel',
                    'amd' => 'AMD'
                ],
                'ram' => [
                    'corsair' => 'Corsair',
                    'team' => 'Team'
                ]
            ],
            'diy' => [
                'hemmers' => [
                    'onekg' => '1 KG',
                    'g500' => '500 g',
                    'g250' => '253 g'
                ],
                'screwdrivers' => [
                    'philips' => 'Philips',
                    'standard' => 'Standard',
                    'torx' => 'Torx'
                ],
                'pliers' => [
                    'slipJoint' => 'Slip-Joint',
                    'WaterPump' => 'Water-Pump',
                    'linesmans' => 'Linesman\'s'
                ]
            ],
            'fashion' => [
                'heats' => [
                    'red' => 'Red',
                    'blue' => 'Blue'
                ],
                'pants' => [
                    'brown' => 'Brown',
                    'black' => 'Black'
                ],
                'sorts' => [
                    'pink' => 'Pink',
                    'orange' => 'Orange'
                ]
            ],
        ];

        return response()->json($cats[$request->store][$request->category]);
    }

    public function getTotal(Request $request, Response $response) {
        return response()->json(['total' => 99.99]);
    }
}
