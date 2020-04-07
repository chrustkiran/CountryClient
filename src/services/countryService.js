const CountryService  = {

 process : (formData)=>{
    let headers = new Headers();
    headers = headers.delete('Content-Type')
    const PROCESS_URL = process.env.REACT_APP_BASE_URL  + 'process';
    return fetch(PROCESS_URL, {
        method: 'post',
        body: formData,
        headers : headers
    });
},

getCountryInfo : () => {
    const GETCOUNTY = 'getAllCountyInfo'
    return fetch(process.env.REACT_APP_BASE_URL + GETCOUNTY)
    .then(response =>  response.json());
},

delteAll : () => {
    const DELETEALL = 'deleteAll'
    return fetch(process.env.REACT_APP_BASE_URL + DELETEALL);
}


}
export default CountryService;