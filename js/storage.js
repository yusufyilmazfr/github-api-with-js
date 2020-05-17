class LocalStorage {
  setItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  pushItem(key, data) {
    let modifiedData = this.getItem(key);
    if (!modifiedData) {
      modifiedData = [];
    }
    modifiedData.push(data);
    this.setItem(key, modifiedData);
  }
  clear() {
    localStorage.clear();
  }
}
