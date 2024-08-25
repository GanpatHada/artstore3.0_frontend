export async function addAddress(address,defaultAddress,startLoading,stopLoading){
   const url="https://artstore3-0-backend-1.onrender.com/user/address"
   const addressBody={address:{...address},markDefault:defaultAddress}
   startLoading();
   try {
    const response=await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM4Y2JjNTgxNTdhMGZiMDMyODFjYzciLCJpYXQiOjE3MjQ0MzU0MTl9.fwqXMh8yXHZrMK9gKE85FhuwAxHJQh5wCJCulhmviWk"
        },
        body:JSON.stringify(addressBody)
    });
    const responseJson=await response.json();
    console.log(responseJson)
   } catch (error) {
    console.log(error)
   }
   finally{
     stopLoading();
   }
}