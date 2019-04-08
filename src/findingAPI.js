const request = require('request');

const findProducts = (specs, callback) =>{
    //construct valid url
    var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=HanZhang-productS-PRD-055b8f5d2-328d8822&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=50";
    /*specs structure:
    {
        keywords:iphone,
        Category:All Category,
        New:True,
        Used:True,
        Unspecified:true,
        LocalPickup:true,
        FreeShipping:true,
        Distance:10,
        Zipcode:90007
    }
     */
    //note we don't check the validation  of specs here
    url = url + "&keywords=" + specs.keywords;
    url = url + "&buyerPostalCode=" + specs.Zipcode;
    if(specs.Category!="AllCategory"){
        var cat = 0;
        url = url + "&categoryId=";
        if(specs.Category=="Art"){cat=550;}
        else if(specs.Category=="Baby"){cat=2984;}
        else if(specs.Category=="Books"){cat=267;}
        else if(specs.Category=="CSA"){cat=11450;}
        else if(specs.Category=="CTN"){cat=58058;}
        else if(specs.Category=="HB"){cat=26395;}
        else if(specs.Category=="Music"){cat=11233;}
        else if(specs.Category=="VGC"){cat=1249;}
        else{}
        url += cat;
    }
    //add distance info
    var idx = 0;
    url = url + "&itemFilter(" + idx + ").name=MaxDistance&itemFilter(" + idx + ").value=" + specs.Distance;
    //add shipping info
    idx += 1;
    url = url + "&itemFilter(" + idx + ").name=FreeShippingOnly&itemFilter(" + idx + ").value=" + specs.FreeShipping;
    idx += 1;
    url = url + "&itemFilter(" + idx + ").name=LocalPickupOnly&itemFilter(" + idx + ").value=" + specs.LocalPickup;
    idx += 1;
    //hide duplicated items
    url = url + "&itemFilter(" + idx + ").name=HideDuplicateItems&itemFilter(" + idx + ").value=true";
    idx += 1;
    if(!(specs.New=='false'&&specs.Used=='false'&&specs.Unspecified=='false')){
        var j=0;
        url = url + "&itemFilter(" + idx + ").name=Condition";
        if(specs.New=='true'){url = url + "&itemFilter(" + idx + ").value(" + j + ")=New"; j+=1;}
        if(specs.Used=='true'){url = url + "&itemFilter(" + idx + ").value(" + j + ")=Used"; j+=1;}
        if(specs.New=='true'){url = url + "&itemFilter(" + idx + ").value(" + j + ")=Unspecified"; j+=1;}
        idx += 1;
    }
    //add output selector
    url += url + "&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo";
    //done

    request({url,json:true}, (error,{body})=>{
        //check the returned json if error occurs
        if(error){
            callback("api error",undefined);
        }
        else if(body.errorMessage){
            callback(undefined,{"error": "invalidinput"});
        }
        else{
            callback(undefined,body.findItemsAdvancedResponse[0].searchResult[0]);
        }
    })
}

module.exports = findProducts;