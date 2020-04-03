const CountryService  = {

 process : (zipName)=>{
    const PROCESS_URL = 'process?zipname=';
    return fetch(process.env.REACT_APP_BASE_URL+PROCESS_URL+zipName)
    .then(response => response.json());
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