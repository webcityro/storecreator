<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => ':attribute trebuie sa fie acceptat.',
    'active_url'           => ':attribute trebuie sa contina un URL valid.',
    'after'                => ':attribute trebuie sa contina o data ulterioara datei de :date.',
    'after_or_equal'       => ':attribute trebuie sa contina o data ulterioara sau egala cu data de :date.',
    'alpha'                => ':attribute poate contine doar litere.',
    'alpha_dash'           => ':attribute poate contine doar litere, cifre sau cratime.',
    'alpha_num'            => ':attribute poate contine doar litere sau cifre.',
    'array'                => ':attribute trebuie sa contina un array.',
    'before'               => ':attribute trebuie sa contina o data anterioara datei de :date.',
    'before_or_equal'      => ':attribute trebuie sa contina o data anterioara sau egala cu data de :date.',
    'between'              => [
        'numeric' => ':attribute trebuie sa fie intre :min si :max.',
        'file'    => ':attribute trebuie sa contina intre :min si :max kilobytes.',
        'string'  => ':attribute trebuie sa contina intre :min si :max caractere.',
        'array'   => ':attribute trebuie sa contina intre :min si :max elemente.',
    ],
    'boolean'              => ':attribute trebuie sa contina o valoare de true sau false.',
    'confirmed'            => 'Confimarea :attribute este incorecta.',
    'date'                 => ':attribute nu contine o data valida.',
    'date_format'          => ':attribute nu respecta formatul :format.',
    'different'            => ':attribute si :other nu pot coincide.',
    'digits'               => ':attribute trebuie sa contina :digits cifre.',
    'digits_between'       => ':attribute trebuie sa contina intre :min si :max cifre.',
    'dimensions'           => ':attribute contine o imagine cu dimesiuni invalide.',
    'distinct'             => ':attribute contine valori duble.',
    'email'                => ':attribute trebuie sa contina o adresa de E-mail valida.',
    'exists'               => ':attribute selectat(a) este invalid(a).',
    'file'                 => ':attribute trebuie sa contina un fisier.',
    'filled'               => ':attribute trebuie sa aiba o valoare.',
    'image'                => ':attribute trebuie sa contina o imagine.',
    'in'                   => ':attribute selectat(a) este invalid(a).',
    'in_array'             => 'Campul :attribute nu exista in :other.',
    'integer'              => ':attribute trebuie sa fie un numar intreg.',
    'ip'                   => ':attribute trebuie sa contina o adresa de IP valida.',
    'ipv4'                 => ':attribute trebuie sa contina o adresa de IPv4 valida.',
    'ipv6'                 => ':attribute trebuie sa contina o adresa de IPv6 valida.',
    'json'                 => ':attribute trebuie sa contina un string de JSON valid.',
    'max'                  => [
        'numeric' => ':attribute nu poate fi mai mare de cat :max.',
        'file'    => ':attribute nu poate fi mai mare de :max kilobytes.',
        'string'  => ':attribute nu poate fi mai mare de :max caractere.',
        'array'   => ':attribute nu poate contine mai mult de :max obiecte.',
    ],
    'mimes'                => ':attribute trebuie sa fie un fisier de tip: :values.',
    'mimetypes'            => ':attribute trebuie sa fie un fisier de tip: :values.',
    'min'                  => [
        'numeric' => ':attribute trebuie sa fie minim :min.',
        'file'    => ':attribute trebuie sa fie de minim :min kilobytes.',
        'string'  => ':attribute trebuie sa contina minim :min caractere.',
        'array'   => ':attribute trebuie sa contina minim :min elemente.',
    ],
    'not_in'               => ':attribute selectat(a) este invalid(a).',
    'numeric'              => ':attribute trebuie sa fie un numar.',
    'present'              => 'Campul ":attribute" trebuie sa fie prezent.',
    'regex'                => ':attribute contine un format invalid.',
    'required'             => 'Campul ":attribute" este obligatoriu.',
    'required_if'          => 'Campul ":attribute" este obligatoriu atunci cand :other este :value.',
    'required_unless'      => 'Campul ":attribute" este obligatoriu atunci cand :other nu este :values.',
    'required_with'        => 'Campul ":attribute" este obligatoriu atunci cand oricare dintre campurile urmatoare (:values) sunt prezente.',
    'required_with_all'    => 'Campul ":attribute" este obligatoriu atunci cand toate campurile urmatoare (:values) sunt prezente.',
    'required_without'     => 'Campul ":attribute" este obligatoriu atunci cand oricare dintre din campurile (:values) nu sunt prezente.',
    'required_without_all' => 'Campul ":attribute" este obligatoriu atunci cand niciunul din campurile (:values) nu sunt prezente.',
    'same'                 => ':attribute si :other nu coincid.',
    'size'                 => [
        'numeric' => ':attribute trebuie sa fie :size.',
        'file'    => ':attribute trebuie sa aiba :size kilobytes.',
        'string'  => ':attribute trebuie sa contina :size caractere.',
        'array'   => ':attribute trebuie sa contina :size elemente.',
    ],
    'string'               => ':attribute trebuie sa contina un string.',
    'timezone'             => ':attribute trebuie sa contina o zona valida.',
    'unique'               => ':attribute exista deja.',
    'uploaded'             => ':attribute nu s-a putut uploada.',
    'url'                  => ':attribute contine un format invalid.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],

];
