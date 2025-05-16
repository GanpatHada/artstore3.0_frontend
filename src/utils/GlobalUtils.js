export function makeCapitalize(stringText){
    let capitalizeString="";
    const firstCapitalCharacter=stringText.charAt(0).toUpperCase();
    const remainingSmallCharacters=stringText.slice(1).toLowerCase();
    capitalizeString=firstCapitalCharacter.concat(remainingSmallCharacters) 
    return capitalizeString;
}

export const getAuthToken=()=>localStorage.getItem('accessToken');

