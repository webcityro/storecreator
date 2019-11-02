<?php

return [
   'role_structure' => [
      'owner' => [
         'users' => 'c,r,u,d',
         'acl' => 'c,r,u,d',
         'profile' => 'r,u',
         'categories' => 'c,r,u,d',
         'attributes' => 'c,r,u,d',
         'attributes-groups' => 'c,r,u,d',
         'attributes-templates' => 'c,r,u,d',
         'products' => 'c,r,u,d',
         'products-from-feeds' => 'c,r,u,d',
         'added-price' => 'c,r,u,d',
         'stores' => 'c,r,u,d',
         'units-of-measurement' => 'c,r,u,d',
         'mapping' => 'c,r,u,d',
         'errors' => 'c,r,u,d',
      ],
      'admin' => [
         'users' => 'c,r,u,d',
         'profile' => 'r,u'
      ],
      'user' => [
         'profile' => 'r,u'
      ],
   ],
   'permission_structure' => [],
   'permissions_map' => [
      'c' => 'create',
      'r' => 'read',
      'u' => 'update',
      'd' => 'delete'
   ]
];
