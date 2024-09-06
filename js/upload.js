let UpdateButtonPawnsImport=document.getElementById('UpdateButtonPawnsImport')
UpdateButtonPawnsImport.addEventListener("click", SortingImportData) 

let NameOfPawn={"0": "Enter a Pawn"}
let SkillsOfPawns={"0": ["1","1","1","1","1","1","1","1","1","1","1","1"]}
let FlamesOfPawns={"0": [0,0,0,0,0,0,0,0,0,0,0,0]}
let PawnIndex=0

let output={};



        document.getElementById('data').addEventListener('change', function() {
            var reader = new FileReader();
            reader.onload = function() {
                var arrayBuffer = this.result,
                    array = new Uint8Array(arrayBuffer),
                    binaryString = String.fromCharCode.apply(null, array);
                /* set up XMLHttpRequest */
                // var url = "http://myclassbook.org/wp-content/uploads/2017/12/Test.xlsx";
                // var oReq = new XMLHttpRequest();
                // oReq.open("GET", url, true);
                // oReq.responseType = "arraybuffer";

                // oReq.onload = function(e) {
                // var arraybuffer = oReq.response;

                /* convert data to binary string */
                // var data = new Uint8Array(arraybuffer);
                // var arr = new Array();
                // for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                // var bstr = arr.join("");

                /* Call XLSX */
                var workbook = XLSX.read(binaryString, {
                    type: "binary"
                });

                /* DO SOMETHING WITH workbook HERE */
                var first_sheet_name = workbook.SheetNames[0];
                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];
                output = XLSX.utils.sheet_to_json(worksheet, {
                    raw: true
                });
                console.log(output);
                // }

                // oReq.send();
            }
            reader.readAsArrayBuffer(this.files[0]);
        });

function LocalStorageGetting(){
    let UnstringfiedNameOfPawn=localStorage.getItem("NameOfPawn")
    NameOfPawn=JSON.parse(UnstringfiedNameOfPawn)
    let UnstringfiedFlamesOfPawns=localStorage.getItem("FlamesOfPawns")
    FlamesOfPawns=JSON.parse(UnstringfiedFlamesOfPawns)
    let UnstringfiedSkillsOfPawns=localStorage.getItem("SkillsOfPawns")
    SkillsOfPawns=JSON.parse(UnstringfiedSkillsOfPawns)
    
}
  

function SortingImportData() {

    LocalStorageGetting()

    let NumberofPawn=output.length
    let numberofSkills=12
    let bufferarray=[]
    let bufferarray2=[]

    for(var i=0;i<NumberofPawn;i++){
        NameOfPawn[i]=output[i]["Name"]
        
        bufferarray[0]=output[i]["Shooting"]
        bufferarray[1]=output[i]["Melee"]
        bufferarray[2]=output[i]["Construction"]
        bufferarray[3]=output[i]["Mining"]
        bufferarray[4]=output[i]["Cooking"]
        bufferarray[5]=output[i]["Plants"]
        bufferarray[6]=output[i]["Animal"]
        bufferarray[7]=output[i]["Crafting"]
        bufferarray[8]=output[i]["Artistic"]
        bufferarray[9]=output[i]["Medical"]
        bufferarray[10]=output[i]["Social"]
        bufferarray[11]=output[i]["Intellectual"]

        SkillsOfPawns[i]=bufferarray

        bufferarray2[0]=output[i]["FofSho"]
        bufferarray2[1]=output[i]["FofMel"]
        bufferarray2[2]=output[i]["FofCon"]
        bufferarray2[3]=output[i]["FofMin"]
        bufferarray2[4]=output[i]["FofCoo"]
        bufferarray2[5]=output[i]["FofPla"]
        bufferarray2[6]=output[i]["FofAni"]
        bufferarray2[7]=output[i]["FofCra"]
        bufferarray2[8]=output[i]["FofArt"]
        bufferarray2[9]=output[i]["FofMed"]
        bufferarray2[10]=output[i]["FofSoc"]
        bufferarray2[11]=output[i]["FofInt"]

        FlamesOfPawns[i]=bufferarray2

        bufferarray=[]
        bufferarray2=[]
    }

    PawnIndex=output.length

    console.log(NameOfPawn)
    console.log(SkillsOfPawns)
    console.log(FlamesOfPawns)

    LocalStorageSetting()
}

function LocalStorageSetting(){
    let NameOfPawnJson=JSON.stringify(NameOfPawn)
    localStorage.setItem("NameOfPawn", NameOfPawnJson)
    let SkillsOfPawnsJson=JSON.stringify(SkillsOfPawns)
    localStorage.setItem("SkillsOfPawns", SkillsOfPawnsJson)
    let FlamesOfPawnsJson=JSON.stringify(FlamesOfPawns)
    localStorage.setItem("FlamesOfPawns", FlamesOfPawnsJson)
    let PawnIndexJson=JSON.stringify(PawnIndex)
    localStorage.setItem("PawnIndex", PawnIndexJson)
}