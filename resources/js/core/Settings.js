class Settings {
   constructor(settings) {
      this.settings = settings;
   }

   get(key) {
      let keys = key.split('.');
      let setting = this.settings.filter(setting => setting.code == keys[0] && setting.key == keys[1])[0];
      return setting ? setting.value : '';
   }
}

export default Settings;