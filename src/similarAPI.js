const request = require("request");

const findSimilar = (specs, callback)=>{
    //construct a valid url
	
	//user key = HanZhang-productS-PRD-055b8f5d2-328d8822
    var url = "http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=HanZhang-productS-PRD-055b8f5d2-328d8822&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD";
    /*
    specs has the following structure
    ItemID:
     */
    url += "&itemId=" + specs.ItemId;
    url += "&maxResults=20";

    request({url}, (error,{body})=>{
        //check the returned json if error occurs
        if(error){
            callback(undefined,{"error": "invalidinput"});
            console.log("error happened");
        }
        else if(body.Ack=="Failure"){
            callback(undefined,{"error": "invalidinput"});
        }
        else{
            //callback(undefined,body.getSimilarItemsResponse.itemRecommendations);
            callback(undefined,body);
        }
    })
}

module.exports = findSimilar;