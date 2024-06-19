const {main} = require("./helper")
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('No arguments provided.');
  } else {
    console.log('Checking for ', args[0]);
    main1(args)
  }
async function main1(args){
    
    const res=await main(args[0]);
    console.log(res);
}
