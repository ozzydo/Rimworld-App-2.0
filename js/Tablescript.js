//Get Element
let UpdateButtonSkill=document.getElementById('UpdateButtonPawns')
let PawnLimit=document.getElementById('PawnLimit')
let PawnLimitValue=0
let JobLimit=document.getElementById('JobLimit')
let JobLimitValue=0
let General=document.getElementById('btnradio1')
let Detailed=document.getElementById('btnradio2')
let Tbody=document.getElementById('tbody')
//Get Element

//Global Variables
let NameOfPawn={"0": "Enter a Pawn"}
let SkillList=["Shooting","Melee","Construction","Mining","Cooking","Plants","Animals","Crafting","Artistic","Medical","Social","Intellectual"]
let NumberOfSkills=12
let BestNameListofSkills={}
let JobofPawn={}
let JobList=["Warden","Handle","Cook","Hunt","Construct","Grow","Mine","Plant Cut","Smith","Tailor","Art","Craft","Haul","Clean","Research"]





//Pawn Info update from main page
LocalStorageGetting()
//Pawn Info update from main page

MaintainInputValue()



UpdateButtonSkill.addEventListener("click", JobListGeneral)
UpdateButtonSkill.addEventListener("click", GenerateAllRows)
General.addEventListener("click", JobListGeneral)
General.addEventListener("click", GenerateAllRows)
//JobList()


function LocalStorageGetting(){
    let UnstringfiedNameOfPawn=localStorage.getItem("NameOfPawn")
    NameOfPawn=JSON.parse(UnstringfiedNameOfPawn)
    let UnstringfiedBestNameListObject=localStorage.getItem("BestNameListObject")
    BestNameListofSkills=JSON.parse(UnstringfiedBestNameListObject)
    
}

function JobListGeneral(){
    
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

function GenerateSingleRow(Name,JobArray){
    let Tr=document.createElement('tr')
    Tr.classList.add('text-center')
    Tr.classList.add('a')
    Tbody.append(Tr)

    let Th=document.createElement('th')
    Th.setAttribute('scope','row')
    Th.innerHTML = `${Name}`
    Tr.append(Th)

    for(let a=0;a<JobArray.length;a++){
        let Td=document.createElement('td')
            Tr.append(Td)
        
        if(JobArray[a]==1){
            let Input=document.createElement('input')
            Input.classList.add('form-check-input')
            Input.setAttribute('type','checkbox')
            Input.setAttribute('value','')
            Input.setAttribute('checked','')
            Td.append(Input)
        }
        else if(JobArray[a]==0){
            let Input=document.createElement('input')
            Input.classList.add('form-check-input')
            Input.setAttribute('type','checkbox')
            Input.setAttribute('value','')
            Td.append(Input)
        }
    }
}

function GenerateAllRows(){
    console.log("I was here")

    let Removal=document.querySelectorAll('.a')

    for(var x=0;x<Removal.length;x++){
        Removal[x].remove(Removal.firstChild)
        console.log("I was here deleting")
        }

   for(let a=0;a<Object.keys(NameOfPawn).length;a++){
    let CurName=NameOfPawn[a]
    let CurArray=JobofPawn[a]
    GenerateSingleRow(CurName,CurArray)
   } 
}