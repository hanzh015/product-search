const request = require("request");

const findDetails = (specs, callback)=>{
    //construct a valid url
    var url = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=HanZhang-productS-PRD-055b8f5d2-328d8822&siteid=0&version=967";
    /*
    specs has the following structure
    ItemID:
     */
    url += "&ItemID=" + specs.ItemId;
    url += "&IncludeSelector=Description,Details,ItemSpecifics";

    request({url,json:true}, (error,{body})=>{
        //check the returned json if error occurs
        if(error){
            console.log("error happened");
        }
        else if(body.Ack=="Failure"){
            callback(undefined,{"error": "invalidinput"});
        }
        else{
            callback(undefined,body.Item);
        }
    })
}

module.exports = findDetails;