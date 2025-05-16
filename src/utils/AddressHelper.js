const geocodeUrl=process.env.REACT_APP_GEOCODE_BASE_URL;
const geocodeKey=process.env.REACT_APP_GEOCODE_KEY;

export function getAddressMode(pathname){
   if(pathname.includes("/my_account/address/edit/"))
     return 'EDIT'
   if(pathname.includes("/my_account/address/add")) 
     return 'ADD' 
}

export function getRequiredAddress(addresses,addressId){
    const requiredAddress = addresses.find((address) => address._id.toString() === addressId);
    if (!requiredAddress) 
        return null
    const {_id,...remainingAddressObject}=requiredAddress;
    return remainingAddressObject;
  };

export function makeAddressPrimayHandler(addresses,addressId)
{
  const requiredAddress=addresses.find(address=>address._id.toString()===addressId);
  const remainingAddress=addresses.filter(address=>address._id.toString()!==addressId);
  const resultAddress=[requiredAddress,...remainingAddress]
  return resultAddress;

}

export function editAddressHandler(addresses,addresssData)
{
  const updatedAddresses=addresses.map(address=>{
    if(address._id.toString()===addresssData._id.toString())
      return addresssData;
    return address;
  })
  return updatedAddresses
}


async function getCurrentPositionAsync() {
  const position = await new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
  return handleAddressFetchSuccess(position);
}

function handleAddressFetchSuccess(position) {
  const{latitude,longitude}=position.coords;
  const address = {latitude,longitude};
  return address;
}

function getRequiredDetails(address){
   console.log(address)
   const addressDetails = {}
   addressDetails['country']=address.country || "";
   addressDetails['state']=address.state || "";
   addressDetails['city']=address.city || address.city_district || address.state_district || address.county || ""
   addressDetails['address1']=address.house_number  || ""
   addressDetails['address2']=address.road || address.suburb || address.town || address.village || ""
   addressDetails['landmark']=address.neighbourhood || ""
   addressDetails['pinCode']=address.postcode || ""

   return addressDetails;

}



const getAutoLocation = async () => {
  try {
    const { longitude, latitude } = await getCurrentPositionAsync();
    let address = await fetch(`${geocodeUrl}?lat=${latitude}&lon=${longitude}&api_key=${geocodeKey}`);
    if (!address.ok) {
      throw new Error(`Failed to fetch address: ${address.statusText}`);
    }
    address = await address.json();
    return getRequiredDetails(address.address);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export function getAddressString(addressObj) {
  let addressString = "";
  for (let i in addressObj) {
    if (i === "_id") continue;
    addressString = addressString.concat(" , ", addressObj[i]);
  }
  return addressString.replace(",", "");
}

export { getAutoLocation };
