// use local storage as your db for now
const addToDb = id => {
    const exists = getDb();
    let route_info = {};
    if (!exists) {
      route_info[id] = 1;
    }
    else {
      route_info = JSON.parse(exists);
      if (route_info[id]) {
        const newCount = route_info[id] + 1;
        route_info[id] = newCount;
      }
      else {
        route_info[id] = 1;
      }
    }
    updateDb(route_info);
  }
  
  const getDb = () => localStorage.getItem('route_info');
  const updateDb = info => {
    localStorage.setItem('route_info', JSON.stringify(info));
  }
  
  const removeFromDb = id => {
    const exists = getDb();
    if (!exists) {
  
    }
    else {
      const route_info = JSON.parse(exists);
      delete route_info[id];
      updateDb(route_info);
    }
  }
  
  const getStoredCart = () => {
    const exists = getDb();
    return exists ? JSON.parse(exists) : {};
  }
  
  const clearRouteInfo = () => {
    localStorage.removeItem('route_info');
  }
  
  export { addToDb, removeFromDb as deleteFromDb, clearRouteInfo, getStoredCart }