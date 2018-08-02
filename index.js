const XLSX = require('xlsx');
const sc = require('status-check');

let headers = ["URL", "Status"];
let input;
let resArray = [];
let finalstatusArray = [];

(function checkStatus() {
    sc.testLinkStatus("input.csv", function (data) {
        input = JSON.stringify(data);
        for (let i = 0; i <= input.length - 1; i++) {
            resArray.push(input[i].url);
            resArray.push(input[i].statusCode);
            finalstatusArray.push(resArray);
            resArray = [];
        }
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
