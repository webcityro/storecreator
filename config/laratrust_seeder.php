<?php

return [
   'role_structure' => [
      'owner' => [
         'users' => 'c,r,u,d',
         'acl' => 'c,r,u,d',
         'profile' => 'r,u',
         // 'categories' => 'c,r,u,d',
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
