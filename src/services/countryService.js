import ndjsonStream from 'can-ndjson-stream';


const CountryService  = {


processStream : (formData)=>{
 
    let headers = new Headers();
    headers = headers.delete('Content-Type')
    const PROCESS_URL = process.env.REACT_APP_BASE_URL  + 'process';

fetch(PROCESS_URL,{
    method: 'post',
    body: formData,
    headers : headers
})  // make a fetch request to a NDJSON stream service
.then((response) => {
	return ndjsonStream(response.body); //ndjsonStream parses the response.body

}).then((exampleStream) => {
	let read;
	exampleStream.getReader().read().then((result) => {
		if (result.done) return;
        console.log(result.value);
        exampleStream.getReader().read().then(result); //recurse through the stream
	});
});
},

 process : (formData)=>{
    let headers = new Headers();
    headers = headers.delete('Content-Type')
    const PROCESS_URL = process.env.REACT_APP_BASE_URL  + 'process';
    return fetch(PROCESS_URL, {
        method: 'post',
        body: formData,
        headers : {}
    }).then(res => {console.log('done')});
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