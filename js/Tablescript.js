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
let Summation={}

//RecentStrategy

//Detailed
let ObjectofPoints={}
let ObjectofindexofPoints={}
let ObjectAverage={}
let ObjectofGradedPoints={}
//Detailed


//Pawn Info update from main page
LocalStorageGetting()
//Pawn Info update from main page

MaintainInputValue()




UpdateButtonSkill.addEventListener("click", JobListGeneral)
UpdateButtonSkill.addEventListener("click", TripleFunc)
General.addEventListener("click", JobListGeneral)
General.addEventListener("click", TripleFunc)
Detailed.addEventListener("click", DetailedTablePointPicker)
Detailed.addEventListener("click", DetailedGenerateAllRows)


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

    GenerateAllRows()

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
        //console.log("PawnArray")
        //console.log(PawnArray)
        JobArray=JobMapper(PawnArray)
        //console.log("JobArray")
        //console.log(JobArray)
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

function TripleFunc(){
    let LocalSum=0
    let CurrArr=[]
    HaulCleanDeleter()
    for(let a=0;a<Object.keys(NameOfPawn).length;a++){
        CurrArr=JobofPawn[a]
        for(let b=0;b<CurrArr.length;b++){
            if(LocalSum<JobLimitValue){
                LocalSum=LocalSum+CurrArr[b]
                //console.log("CurrArr")
                //console.log(CurrArr)
                //console.log("LocalSum")
                //console.log(LocalSum)
            }
            else if(CurrArr[b]==1){
                CurrArr[b]=0
                JobsOfPawns[a][b]="None"
            }
        }
            //console.log("LocalSum")
            //console.log(LocalSum)
        Summation[a]=LocalSum
        LocalSum=0
        CurrArr=[]
    }
    HaulnClean()
    GenerateAllRows()
}

function HaulCleanDeleter(){
    for(let a=0;a<JobLimitValue;a++){
        JobofPawn[a][12]=0
        JobofPawn[a][13]=0
    }
}

function HaulnClean(){
    for(let a=0;a<Object.keys(NameOfPawn).length;a++){
        if(Summation[a]<JobLimitValue){
            if(JobLimitValue-Summation[a]==1){
                JobofPawn[a][12]=1
                //console.log("JobofPawn")
                //console.log(JobofPawn)
            }
            else{
                JobofPawn[a][12]=1
                JobofPawn[a][13]=1
            }
        }
    }
}

//Import from Skill.js

//RecentStrategy

// Detailed

function DetailedTablePointPicker(){
    let Points=[]
    let indexofPoints=[]
    let currarray=[]
    let pushingValue=0
    for(var c=0;c<Object.keys(NameOfPawn).length;c++){
        currarray=JobofPawn[c]
        //console.log("currarray")
        //console.log(currarray)
        for(var d=0;d<currarray.length;d++){
            if(currarray[d]==1){
                pushingValue=HaulnCleanDetecter(SkillArray[d][c])
                Points.push(pushingValue)
                indexofPoints.push(d)
            }
            else{
                //console.log("I was here")
            }
        }
        ObjectofPoints[c]=Points
        //console.log("ObjectofPoints")
        //console.log(ObjectofPoints)
        Points=[]
        ObjectofindexofPoints[c]=indexofPoints
        //console.log("ObjectofindexofPoints")
        //console.log(ObjectofindexofPoints)
        indexofPoints=[]
    }
    DetailedTableAverage()
    DetailedTablePointGrader()
}

//Haul and Clean Detection for Detailed Table
function HaulnCleanDetecter(PushValue){
    if(PushValue=="Haul"||PushValue=="Clean"){
        PushValue=100
    }
    else{
        PushValue=PushValue
    }

    return PushValue
}
//Haul and Clean Detection for Detailed Table

function DetailedTableAverage(){
    let CurrAverage=0
    let currSum=0
    let currarraygrader=[]
    for(var f=0;f<Object.keys(NameOfPawn).length;f++){
        currarraygrader=ObjectofPoints[f]
        for(var g=0;g<currarraygrader.length;g++){
            currSum=currSum+currarraygrader[g]
        }
        CurrAverage=(currSum)/(currarraygrader.length)

        ObjectAverage[f]=CurrAverage
        //console.log("ObjectAverage")
        //console.log(ObjectAverage)
        CurrAverage=0
        currSum=0
        currarraygrader=[]
    }
}


function DetailedTablePointGrader(){
    let currarraygrader=[]
    let currgrade=1
    let currentPoint=0
    let middlearray=[]
    for(var h=0;h<Object.keys(NameOfPawn).length;h++){
        currarraygrader=ObjectofPoints[h]       
        for(var e=0;e<currarraygrader.length;e++){
            currentPoint=currarraygrader[e]
            for(var k=0;k<currarraygrader.length;k++){
                if(k!=e){
                    if(currentPoint>currarraygrader[k]){
                        currgrade=currgrade
                    }
                    else if(currentPoint<currarraygrader[k]){
                        if(currgrade<4){
                            currgrade=currgrade+1
                        }
                        else{
                            currgrade=currgrade
                        }
                    }
                    else{
                        if(currentPoint>ObjectAverage[h]){
                            currgrade=currgrade
                        }
                        else if(currentPoint<ObjectAverage[h]){
                            if(currgrade<4){
                                currgrade=currgrade+1
                            }
                        }
                    }
                }
            }
            middlearray.push(currgrade)
            //console.log("middlearray")
            //console.log(middlearray)
            currgrade=1
        }
        ObjectofGradedPoints[h]=middlearray
        middlearray=[]
    }    

    DetailedTableReplacer()
}

function DetailedTableReplacer(){
    for(var i=0;i<Object.keys(NameOfPawn).length;i++){
        for(var j=0;j<ObjectofindexofPoints[i].length;j++){
            if(ObjectofGradedPoints[i][j]!=1){
            JobofPawn[i][ObjectofindexofPoints[i][j]]=ObjectofGradedPoints[i][j]
            //console.log("I am not 1")
            }
            else{
                //console.log("i")
                //console.log(i)
                //console.log("j")
                //console.log(j)
                //console.log("ObjectofindexofPoints[i][j]")
                //console.log(ObjectofindexofPoints[i][j])
                JobofPawn[i][ObjectofindexofPoints[i][j]]=1
            }
        }
    }
}

function DetailedGenerateSingleRow(Name,JobArray){
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
        
        if(JobArray[a]!=0){
            let Text=document.createElement('span')
            Text.classList.add('badge')
            Text.classList.add('text-bg-primary')
            Text.appendChild( document.createTextNode(JobArray[a].toString()))
            Td.append(Text)

            //let Input=document.createElement('input')
            //Input.classList.add('form-check-input')
            //Input.setAttribute('type','checkbox')
            //Input.setAttribute('value','')
            //Input.setAttribute('checked','')
            //Td.append(Input)
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

function DetailedGenerateAllRows(){
    //console.log("I was here")

    let Removal=document.querySelectorAll('.a')

    for(var x=0;x<Removal.length;x++){
        Removal[x].remove(Removal.firstChild)
        //console.log("I was here deleting")
        }

   for(let a=0;a<Object.keys(NameOfPawn).length;a++){
    let CurName=NameOfPawn[a]
    let CurArray=JobofPawn[a]
    DetailedGenerateSingleRow(CurName,CurArray)
   } 
}

JobListGeneral()
TripleFunc()
