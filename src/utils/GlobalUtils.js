export function makeCapitalize(string){
    let capitalizeString="";
    const firstCapitalString=string.charAt(0).toUpperCase();
    capitalizeString=firstCapitalString.concat(string.slice(1)) 
    return capitalizeString;
}

export function getAuthToken(){
    return localStorage.getItem("token");
}