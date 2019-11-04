class User {
   constructor(auth) {
      this.data = auth.data;
      this.roles = auth.roles;
      this.permissions = auth.permissions;
      this.stores = auth.stores;
   }

   hasRole(role) {
      let roles = role.split('|');

      for (let r of this.roles) {
         if (roles.indexOf(r.name) > -1) { return true; }
      }
      return false;
   }

   hasPermission(permission) {
      let permissions = permission.split('|');

      for (let p of this.permissions) {
         if (permissions.indexOf(p.name) > -1) { return true; }
      }
      return false;
   }

   can(permission) {
      return this.hasPermission(permission);
   }
}

export default User;