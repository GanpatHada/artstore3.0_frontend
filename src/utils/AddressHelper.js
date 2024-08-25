
async function getCurrentPositionAsync() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(handleAddressFetchSuccess(position));
        },
        (error) => {
          handleAddressFetchFailure(error);
          reject(error);
        }
      );
    });
  }
  
  function handleAddressFetchSuccess(position) {
    const address = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    return address;
  }
  
  function handleAddressFetchFailure(error) {
    return null;
  }
  
  async function getLocationCordinates() {
    try {
      const position = await getCurrentPositionAsync();
      return position;
    } catch (error) {
      throw error;
    }
  }
  
  const getAutoLocation = async () => {
    try {
      const { longitude, latitude } = await getLocationCordinates();
      const geocodeUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=66c633bae3a67479005997vkd61a5ce`;
      const address = await fetch(geocodeUrl);
      const addressJson = await address.json();
      return addressJson.address;
    } catch (error) {
      console.log(error);
    }
  };
  
  export { getAutoLocation };
  