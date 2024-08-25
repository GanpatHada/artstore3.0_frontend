export async function login({email,password},startLoading,stopLoading) {
    const url = "https://artstore3-0-backend-1.onrender.com/user/login";
    startLoading();
    try {
      const response = await fetch(url,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email,password})
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
    finally{
      stopLoading();
    }
  }

  export async function signup(signupDetails)
  {
    const url="https://artstore3-0-backend-1.onrender.com/user/signup";
    try{
      const response = await fetch(url,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(signupDetails)
      })
      return await response.json()
    }
    catch (error){
      console.error(error);
    }
    finally{

    }

  }

