const XLSX = require('xlsx');
const sc = require('status-check');

let headers = ["URL", "Status"];
let resArray = [];
let finalstatusArray = [];

(function checkStatus() {
    sc.testLinkStatus("input.csv", function (data) {
        for (let i = 0; i <= data.length - 1; i++) {
            resArray.push(data[i].url);
            resArray.push(data[i].statusCode);
            finalstatusArray.push(resArray);
            resArray = [];
        }
        console.log(finalstatusArray);
        createSheet();
    }, true);
})();

function createSheet() {
    finalstatusArray.splice(0, 0, headers);
    let ws = XLSX.utils.aoa_to_sheet(finalstatusArray);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Output");
    XLSX.writeFile(wb, 'output.xlsx', { type: 'buffer', bookType: "xlsx" });
    console.log("Output xls has been created successfully!!!!")
}
