//Get Element
let UpdateButtonSkill=document.getElementById('UpdateButtonPawns')
let PawnLimit=document.getElementById('PawnLimit')
let PawnLimitValue=0
let JobLimit=document.getElementById('JobLimit')
let JobLimitValue=0
let General=document.getElementById('btnradio1')
let Detailed=document.getElementById('btnradio2')
//Get Element

//Global Variables
let NameOfPawn={"0": "Enter a Pawn"}
let SkillList=["Shooting","Melee","Construction","Mining","Cooking","Plants","Animals","Crafting","Artistic","Medical","Social","Intellectual"]
let NumberOfSkills=12
let BestNameListofSkills={}
let JobofPawn={}





//Pawn Info update from main page
LocalStorageGetting()
//Pawn Info update from main page

MaintainInputValue()



UpdateButtonSkill.addEventListener("click", JobList)

//JobList()


function LocalStorageGetting(){
    let UnstringfiedNameOfPawn=localStorage.getItem("NameOfPawn")
    NameOfPawn=JSON.parse(UnstringfiedNameOfPawn)
    let UnstringfiedBestNameListObject=localStorage.getItem("BestNameListObject")
    BestNameListofSkills=JSON.parse(UnstringfiedBestNameListObject)
    
}

function JobList(){
    
    PawnLimitValue=Number(PawnLimit.value)
    JobLimitValue=Number(JobLimit.value)
    console.log(JobLimitValue)

    for(let a=0;a<Object.keys(NameOfPawn).length;a++){
        //console.log("I was here")
        let CurJobArray=[]
        let CurName=NameOfPawn[a]
        //console.log("CurName")
        //console.log(CurName)
        for(let b=0;b<Object.keys(BestNameListofSkills).length;b++){
            //console.log("I was here")
            let CurArray=BestNameListofSkills[b]
            //console.log("CurArray")
            //console.log(CurArray)
            for(let c=0;c<PawnLimitValue;c++){
                //console.log("CurArray[c]")
                //console.log(CurArray[c])
                if(CurName===CurArray[c]){
                    CurJobArray[b]=1
                    //console.log("CurJobArray")
                    //console.log(CurJobArray)
                    
                    //console.log("JobofPawn")
                    //console.log(JobofPawn)
                    break
            

                }
                else{
                    CurJobArray[b]=0
                    //console.log("CurJobArray")
                    //console.log(CurJobArray)
                    
                    //console.log("I was zero")
                }
            }
            //console.log("--------------------------------------------------")
            //JobofPawn[a]=CurJobArray
        }
        JobofPawn[a]=CurJobArray
        //console.log("JobofPawn")
        //console.log(JobofPawn)
        //console.log("=================================================")
    }

    LocalStorageSetting()
}

function MaintainInputValue(){
    
    let UnstringfiedPawnLimitValue=localStorage.getItem("PawnLimitValue")
    PawnLimitValue=JSON.parse(UnstringfiedPawnLimitValue)
    console.log(PawnLimitValue)
    let UnstringfiedJobLimitValue=localStorage.getItem("JobLimitValue")
    JobLimitValue=JSON.parse(UnstringfiedJobLimitValue)
    console.log(JobLimitValue)
    console.log(typeof(PawnLimitValue))

    if(typeof(PawnLimitValue)!='string'&& typeof(PawnLimitValue)!='number'){
        PawnLimitValue=0
        JobLimitValue=0
    }
    PawnLimit.value=PawnLimitValue.toString()
    JobLimit.value=JobLimitValue.toString()
}

function LocalStorageSetting(){
    let PawnLimitValueJson=JSON.stringify(PawnLimitValue)
    localStorage.setItem("PawnLimitValue", PawnLimitValueJson)
    let JobLimitValueJson=JSON.stringify(JobLimitValue)
    localStorage.setItem("JobLimitValue", JobLimitValueJson)
    console.log(JobLimitValueJson)

}

function GenerateRow(){
    
}