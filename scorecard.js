let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");

// let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
function processMatch(url){
    request(url,cb);
}
function cb(error,response,html){
    if(error){
        console.log(error);
    }else if(response.statusCode == 404){
        console.log("page not found");
    }else{
        dataExtracter(html);
    }
}

function dataExtracter(html){
    let searchTool=cheerio.load(html);
    let Mainfolder=path.join(process.cwd(),"cricbuzz");
    if(fs.existsSync(Mainfolder) == false){
        fs.mkdirSync(Mainfolder);
    }
    let iplfolder=path.join(Mainfolder,"ipl");
    if(fs.existsSync(iplfolder) == false){
        fs.mkdirSync(iplfolder);
    }
    let InningsArr=searchTool(".Collapsible");
    // let htmldata="";
    for(let i=0;i<InningsArr.length;i++){
        let teamNameElement=searchTool(InningsArr[i]).find("h5");
        // htmldata += searchTool(InningsArr[i]).html();
        // fs.writeFileSync("t.html",htmldata);
        let teams=teamNameElement.text();
        // console.log(teamName);
        let teamsplit=teams.split("INNINGS")[0];
        // console.log(teamsplit);
        let teamName=teamsplit.trim();

        let teamfolder=path.join(iplfolder,teamName);
        if(fs.existsSync(teamfolder) == false){
            fs.mkdirSync(teamfolder);
        }
        // console.log(teams);
        let batsmanName=searchTool(InningsArr[i]).find(".table.batsman tbody tr");
        // console.log(batsmanName.length);
        for(let j=0;j<batsmanName.length;j++){
            let numberOftd=searchTool(batsmanName[j]).find("td");
            // console.log(numberOftd.length);
            if(numberOftd.length == 8){
                let playername=searchTool(numberOftd[0]).text();
                // console.log(playername);
                let playerfolder = path.join(teamfolder,playername + ".xlsx");
                if(fs.existsSync(playerfolder) == false){
                    fs.writeFileSync(playerfolder,"ridham");
                }
            }
        }
        // console.log("--------------------");
    }
}
module.exports = {
    processMatch
}