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
let JobList_wIndexofSkills=[10,6,4,"Special",2,5,3,5,7,7,8,7,"Haul","Clean",11]//Special=(Shooting+Animals)/2
let NewArrayofJob={}
let NewArray=[]

//RecentStrategy

let JobsOfPawns={}
let PawnsSkillGrades={}
let SkillArray={}
let BestPawnLimit=8

//RecentStrategy



//Pawn Info update from main page
LocalStorageGetting()
//Pawn Info update from main page

MaintainInputValue()


//JobList_wIndexofSkills.forEach(JobSkillMapping)
//JobSkillMapping()

UpdateButtonSkill.addEventListener("click", JobListGeneral)
UpdateButtonSkill.addEventListener("click", GenerateAllRows)
General.addEventListener("click", JobListGeneral)
General.addEventListener("click", GenerateAllRows)
//JobList()


//RecentStrategy

Job()

//Import from Skill.js

PawnsSkillGrades=Grader_Skills(JobsOfPawns,Object.keys(NameOfPawn).length)

PawnsSkillGradesOrdered=GradeOrderer(PawnsSkillGrades,Object.keys(NameOfPawn).length)

SkillArrayCreator()

SkillGrades=Grader_Skills(SkillArray,15)

SkillGradesOrdered=GradeOrderer(SkillGrades,15)

BestNameListofSkills=BestNameList(SkillGradesOrdered,NameOfPawn,15,BestPawnLimit,1)

//Import from Skill.js

//RecentStrategy



function LocalStorageGetting(){
    let UnstringfiedNameOfPawn=localStorage.getItem("NameOfPawn")
    NameOfPawn=JSON.parse(UnstringfiedNameOfPawn)
    //let UnstringfiedBestNameListObject=localStorage.getItem("BestNameListObject")
    //BestNameListofSkills=JSON.parse(UnstringfiedBestNameListObject)
    let UnstringfiedSkillsOfPawns=localStorage.getItem("SkillsOfPawns")
    SkillsOfPawns=JSON.parse(UnstringfiedSkillsOfPawns)
    
}

function JobListGeneral(){
    
    PawnLimitValue=Number(PawnLimit.value)
    JobLimitValue=Number(JobLimit.value)
    //console.log(JobLimitValue)

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
    //JobList_wIndexofSkills.forEach(JobSkillMapping)
}

function MaintainInputValue(){
    
    let UnstringfiedPawnLimitValue=localStorage.getItem("PawnLimitValue")
    PawnLimitValue=JSON.parse(UnstringfiedPawnLimitValue)
    //console.log(PawnLimitValue)
    let UnstringfiedJobLimitValue=localStorage.getItem("JobLimitValue")
    JobLimitValue=JSON.parse(UnstringfiedJobLimitValue)
    //console.log(JobLimitValue)
    //console.log(typeof(PawnLimitValue))

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
    //console.log(JobLimitValueJson)

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
    //console.log("I was here")

    let Removal=document.querySelectorAll('.a')

    for(var x=0;x<Removal.length;x++){
        Removal[x].remove(Removal.firstChild)
        //console.log("I was here deleting")
        }

   for(let a=0;a<Object.keys(NameOfPawn).length;a++){
    let CurName=NameOfPawn[a]
    let CurArray=JobofPawn[a]
    GenerateSingleRow(CurName,CurArray)
   } 
}

//RecentStrategy

function Job(){
    let PawnArray=[]
    let JobArray=[]
    for(let a=0;a<Object.keys(NameOfPawn).length;a++){
        PawnArray=SkillsOfPawns[a]
        JobArray=JobMapper(PawnArray)
        JobsOfPawns[a]=JobArray
        PawnArray=[]
        JobArray=[]
    }
}

function JobMapper(PawnArray){
    let JobArray=[]
    let CurrVal=0
    for(let a=0;a<15;a++){
        if(JobList_wIndexofSkills[a]=="Special"){
            let B=PawnArray[0]
            let C=PawnArray[6]
            if(B=="None"||C=="None"){
                JobArray[a]="None"
            }
            else{
                JobArray[a]=(B+C)/2
            }         
        }
        else if(JobList_wIndexofSkills[a]=="Haul" || JobList_wIndexofSkills[a]=="Clean"){
            if(JobList_wIndexofSkills[a]=="Haul"){
                JobArray[a]="Haul"
            }
            else{
                JobArray[a]="Clean"
            }
        }
        else{
            CurrVal=JobList_wIndexofSkills[a]
            JobArray[a]=PawnArray[CurrVal]
        }
        CurrVal=0
    }
    return JobArray
}

//Import from Skill.js

function Grader_Skills(ObjectGiven,Cycle){
    let GradeObject={}
    let SkillDedicatedtoSkill=[]
    let Grade=0
    let Sorting_Value=0
    let Individual_Value=0
    let GradeArray=[]
    let NoneFlag=0
    //console.log("I was here, why")
    for(let x=0;x<Cycle;x++){
        SkillDedicatedtoSkill=ObjectGiven[x]
        //console.log(SkillDedicatedtoSkill)
        //console.log("SkillDedicatedtoSkill")
        
        for(let i=0;i<SkillDedicatedtoSkill.length;i++){
            //console.log(SkillDedicatedtoSkill)
            //console.log("SkillDedicatedtoSkill")
            if(SkillDedicatedtoSkill[i]=="None"||SkillDedicatedtoSkill[i]=="Haul"||SkillDedicatedtoSkill[i]=="Clean"){
                NoneFlag=NoneFlag+1
                //console.log("I was here")
                //console.log(NoneFlag)
                //console.log("i",i)
            }
        }

        for(let a=0;a<SkillDedicatedtoSkill.length;a++){
            Sorting_Value=SkillDedicatedtoSkill[a]
            for(let b=0;b<SkillDedicatedtoSkill.length;b++){
                Individual_Value=SkillDedicatedtoSkill[b]
                if(Sorting_Value=="None"||Sorting_Value=="Haul"||Sorting_Value=="Clean"){
                    Grade=SkillDedicatedtoSkill.length-NoneFlag
                    NoneFlag=NoneFlag-1
                    //console.log("I was here2")
                    //console.log(NoneFlag)
                    break
                }
                else if(Sorting_Value<Individual_Value){
                    Grade=Grade+1
                }
                else if(Sorting_Value==Individual_Value){
                    if(a!=b && a>b){
                        Grade=Grade+1
                    }
                }
            }
            GradeArray[a]=Grade
            Grade=0
        }
        GradeObject[x]=GradeArray
        Individual_Value=0
        Grade=0
        GradeArray=[] 
    }
    //console.log(GradeObject)
    //console.log("GradeObject")
    return GradeObject
}

function GradeOrderer(ObjectGiven2,Cycle2){
    let GradeOrderObject={}
    let GradesOfIndividual=[]
    let OrderedGradesOfIndividual=[]
    for(let x=0;x<Cycle2;x++){
        GradesOfIndividual=ObjectGiven2[x]
        //console.log(GradesOfIndividual)
        //console.log("GradesOfIndividual")
        for(let a=0;a<GradesOfIndividual.length;a++){
            for(let b=0;b<GradesOfIndividual.length;b++){
                //console.log(GradesOfIndividual[a])
                //console.log("GradesOfIndividual[a]")
                if(GradesOfIndividual[a]==b){
                    OrderedGradesOfIndividual[b]=a
                    //console.log(OrderedGradesOfIndividual[b])
                    //console.log("OrderedGradesOfIndividual[b]")
                }            
            }
        }
        GradesOfIndividual=[]
        GradeOrderObject[x]=OrderedGradesOfIndividual
        OrderedGradesOfIndividual=[]
    }
    return GradeOrderObject  
}

function SkillArrayCreator(){
    let CurrentSkillArray=[]
    let CurrentPawn=[]
    for(let CounterOfSkills=0;CounterOfSkills<15;CounterOfSkills++){
        for(let CounterOfPawns=0;CounterOfPawns<Object.keys(NameOfPawn).length;CounterOfPawns++){
            CurrentPawn=Array.from(JobsOfPawns[CounterOfPawns])
            //console.log(CurrentPawn)
            //console.log(Array.from(CurrentPawn))
            //console.log("CurrentPawn")
            CurrentSkillArray[CounterOfPawns]=CurrentPawn[CounterOfSkills]
            //console.log(CurrentSkillArray)
            //console.log("CurrentSkillArray")
        }
        
        SkillArray[CounterOfSkills]=CurrentSkillArray
        //console.log(SkillArray)
        //console.log("SkillArray") 
        CurrentPawn=[] 
        CurrentSkillArray=[]   
    }
}

function BestNameList(ObjectGiven3,ObjectGiven4,Cycle3,Cycle4,Mode){
    let BestNameListObject={}
    let CurrentNamesArray=[]
    let OutputNameArray=[]
    for(let x=0;x<Cycle3;x++){
        CurrentNamesArray=ObjectGiven3[x]
        for(let a=0;a<Cycle4;a++){
            OutputNameArray[a]=ObjectGiven4[CurrentNamesArray[a]]
        }
        BestNameListObject[x]=OutputNameArray
        OutputNameArray=[]
    }

        return BestNameListObject
    
}

//Import from Skill.js

//RecentStrategy