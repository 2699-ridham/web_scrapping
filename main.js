let request=require("request");
let cheerio=require("cheerio");
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let scobj=require("./scorecard");
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }else if(response.statusCode == 404){
        console.log("page not found");
    }else{
        dataExtractor(html);
    }
}

function dataExtractor(html){
    let searchTool=cheerio.load(html);
    let anchorrep=searchTool('a[data-hover="View All Results"]');
    let link=anchorrep.attr("href");
    let fullPageLink=`https://www.espncricinfo.com${link}`;
    console.log(fullPageLink);

    request(fullPageLink,allMatchPagecb);
}

function allMatchPagecb(error,response,html){
    if(error){
        console.log(error);
    }else if(response.statusCode == 404){
        console.log("page not found");
    }else{
        // console.log(html);
        getAllScoreCardLink(html);
    }
}
function getAllScoreCardLink(html){
    let searchTool=cheerio.load(html);
    let ScoreArr=searchTool('a[data-hover="Scorecard"]');
    for(let i=0;i<ScoreArr.length;i++){
        let link=searchTool(ScoreArr[i]).attr("href");
        let fullMatchPageLink=`https://www.espncricinfo.com${link}`;
        // console.log("Match-links ",fullMatchPageLink);
        scobj.processMatch(fullMatchPageLink);
    }
    console.log("---------------------");
}