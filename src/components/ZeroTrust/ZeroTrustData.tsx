import axios from 'axios';

export var ZT:any = {};

async function GetZTFile(filename:any){
    return axios(`./zt/${filename}.json`).then(response => {
        ZT = {...ZT, 
        ...response.data};
    });
}

export async function GetZeroTrustFilesAll(){

    if(Object.keys(ZT).length > 0) return;

    let promiseMe:any = [];
    promiseMe.push(GetZTFile('zt-desc'))
    promiseMe.push(GetZTFile('zt-800mapping'))
 
    return await Promise.all(promiseMe);
  }

export default function ZeroTrustData(props:any){
    return(
        <></>
    )
}