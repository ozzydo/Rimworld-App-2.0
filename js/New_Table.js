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

//Global Variable Initilization from Local Storage
let NameOfPawn={"0": "Enter a Pawn"}
let SkillsOfPawns={"0": ["1","1","1","1","1","1","1","1","1","1","1","1"]}
let FlamesOfPawns={"0": [0,0,0,0,0,0,0,0,0,0,0,0]}
//Global Variable Initilization from Local Storage

//Variables used in this script

let NumberOfPawn=0
let SkillList=["Shooting","Melee","Construction","Mining","Cooking","Plants","Animals","Crafting","Artistic","Medical","Social","Intellectual"]
let JobList=["Warden","Handle","Cook","Hunt","Construct","Grow","Mine","Plant Cut","Smith","Tailor","Art","Craft","Haul","Clean","Research"]
let JobList_wIndexofSkills=[10,6,4,"Special",2,5,3,5,7,7,8,7,"Haul","Clean",11]//Special=(Shooting+Animals)/2

let NumberofJobs=15

let JobsOfPawns={}
let SkillArray={}
let FlameJobofPawns={}//new addition

let Average={}
let BeginnerPoint={}
let BeginnerPointCoef=1
let IntermediatePoint={}
let IntermediatePointCoef=5/2
let MasterPoint=20

let TitleofPawns={}
let TitleNumbersofPawn={}
let TitleofJobs={}
let TitleNumbersofJobs={}
//Variables used in this script

//Getting data from Local Storage
LocalStorageGetting()

Job()
SkillArray=SkillArrayCreator(JobsOfPawns,NumberOfPawn,NumberofJobs)
AverageofJobs()
BeginnerPointJobs()
IntermediatePointJobs()
TitleofPawnDecision()
//IntermediatePawnDecision()
TitleNumbersofPawn=TitleCounter(TitleofPawns,NumberOfPawn,NumberofJobs)
TitleofJobs=SkillArrayCreator(TitleofPawns,NumberOfPawn,NumberofJobs)
TitleNumbersofJobs=TitleCounter(TitleofJobs,NumberofJobs,NumberOfPawn)

function LocalStorageGetting(){
    let UnstringfiedNameOfPawn=localStorage.getItem("NameOfPawn")
    NameOfPawn=JSON.parse(UnstringfiedNameOfPawn)
    let UnstringfiedSkillsOfPawns=localStorage.getItem("SkillsOfPawns")
    SkillsOfPawns=JSON.parse(UnstringfiedSkillsOfPawns)
    let UnstringfiedFlamesOfPawns=localStorage.getItem("FlamesOfPawns")
    FlamesOfPawns=JSON.parse(UnstringfiedFlamesOfPawns)
    let UnstringfiedPawnLimitValue=localStorage.getItem("PawnLimitValue")
    PawnLimitValue=JSON.parse(UnstringfiedPawnLimitValue)
    let UnstringfiedJobLimitValue=localStorage.getItem("JobLimitValue")
    JobLimitValue=JSON.parse(UnstringfiedJobLimitValue)
    
    NumberOfPawn=Object.keys(NameOfPawn).length
}
//Getting data from Local Storage

function Job(){
    let FlameArray=[]
    let PawnArray=[]
    let FlameJobArray=[]
    let JobArray=[]
    for(let a=0;a<Object.keys(NameOfPawn).length;a++){
        FlameArray=FlamesOfPawns[a]
        PawnArray=SkillsOfPawns[a]
        //console.log("PawnArray")
        //console.log(PawnArray)
        JobArray=JobMapper(PawnArray)
        FlameJobArray=JobMapper(FlameArray)
        //console.log("JobArray")
        //console.log(JobArray)
        FlameJobofPawns[a]=FlameJobArray
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

function SkillArrayCreator(TargetObject,NumberofPawn,NumberofJobs){
    let CurrentSkillArray=[]
    let CurrentPawn=[]
    let TargetOutput={}
    for(let CounterOfSkills=0;CounterOfSkills<NumberofJobs;CounterOfSkills++){
        for(let CounterOfPawns=0;CounterOfPawns<NumberofPawn;CounterOfPawns++){
            CurrentPawn=Array.from(TargetObject[CounterOfPawns])
            //console.log(CurrentPawn)
            //console.log(Array.from(CurrentPawn))
            //console.log("CurrentPawn")
            CurrentSkillArray[CounterOfPawns]=CurrentPawn[CounterOfSkills]
            //console.log(CurrentSkillArray)
            //console.log("CurrentSkillArray")
        }
        
        TargetOutput[CounterOfSkills]=CurrentSkillArray
        //console.log(SkillArray)
        //console.log("SkillArray") 
        CurrentPawn=[] 
        CurrentSkillArray=[]   
    }
    return TargetOutput
}

function AverageofJobs(){
    let CurrAverage=0
    let currSum=0
    let currarraygrader=[]
    for(var i=0;i<NumberofJobs;i++){
        currarraygrader=SkillArray[i]
        for(var g=0;g<currarraygrader.length;g++){
            if(currarraygrader[g]=='None'){
                currSum=currSum
            }
            else if(i==12||i==13){
                currsum=0
            }
            else{
                currSum=currSum+currarraygrader[g]
            }         
        }
        CurrAverage=(currSum)/(currarraygrader.length)
        Average[i]=CurrAverage
        CurrAverage=0
        currSum=0
        currarraygrader=[]
    }

}

function BeginnerPointJobs(){
    for(var i=0;i<NumberofJobs;i++){
        BeginnerPoint[i]=Average[i]*BeginnerPointCoef
    }
}

function IntermediatePointJobs(){
    for(var i=0;i<NumberofJobs;i++){
        IntermediatePoint[i]=Average[i]*(IntermediatePointCoef)
    }
}

function TitleofPawnDecision(){
    let currarray=[]
    let currarrayFlame=[]
    let currTitle=[]
    for(var i=0;i<NumberOfPawn;i++){
        currarray=JobsOfPawns[i]
        currarrayFlame=FlameJobofPawns[i]
        //console.log("currarrayFlame")
        //console.log(currarrayFlame)
        for(var j=0;j<NumberofJobs;j++){
            if(currarray[j]<BeginnerPoint[j]&&currarrayFlame[j]>0){
                currTitle[j]="Beginner"
            }
            else if(currarray[j]>BeginnerPoint[j]&&currarray[j]<IntermediatePoint[j]&&currarrayFlame[j]>0){
                currTitle[j]="Intermediate"
            }
            else if(currarray[j]>IntermediatePoint[j]&&currarray[j]!=MasterPoint){
                //console.log("currarrayFlame[j]")
                //console.log(currarrayFlame[j])
                if(currarrayFlame[j]==0){
                    currTitle[j]="Upper-Intermediate"
                    //console.log("I was here")
                }
                else if(currarrayFlame[j]>0){
                    currTitle[j]="Upper-Intermediate_Flame"
                    //console.log("I was here2")
                }
            }
            else if(currarray[j]==MasterPoint){
                currTitle[j]="Master"
            }
            else if(currarrayFlame[j]=="Haul"||currarrayFlame[j]=="Clean"){
                currTitle[j]=0
            }
            else{
                currTitle[j]=0
            }
        }
        TitleofPawns[i]=currTitle
        currTitle=[]
    }
}

//Input --> TitleofPawns ,eğer ters bir array kullanacaksan number inputlerını ters gir
//Maybe I will not use this one
function TitleCounter(TargetInput,NumberOfPawn,NumberofJobs){
    let TargetOutput={}
    let currarray=[]
    let currSumGen=0
    let currSumBeg=0
    let currSumInt=0
    let currSumUp=0
    let currSumUpF=0
    let currSumMaster=0
    let currOutputArray=[]
    for(var i=0;i<NumberOfPawn;i++){
        currarray=TargetInput[i]
        for(var j=0;j<NumberofJobs;j++){
            if(currarray[j]==0){
                currSumGen=currSumGen
            }
            else{
                currSumGen++
                if(currarray[j]=="Beginner"){
                    currSumBeg++
                }
                else if(currarray[j]=="Intermediate"){
                    currSumInt++
                }
                else if(currarray[j]=="Upper-Intermediate"){
                    currSumUp++
                }
                else if(currarray[j]=="Upper-Intermediate_Flame"){
                    currSumUpF++
                }
                else if(currarray[j]=="Master"){
                    currSumMaster++
                }
            }           
        }
        currOutputArray[0]=currSumGen
        currOutputArray[1]=currSumBeg
        currOutputArray[2]=currSumInt
        currOutputArray[3]=currSumUp
        currOutputArray[4]=currSumUpF
        currOutputArray[5]=currSumMaster
        TargetOutput[i]=currOutputArray
        currSumGen=0
        currSumBeg=0
        currSumInt=0
        currSumUp=0
        currSumUpF=0
        currSumMaster=0
        currOutputArray=[]
    }
    return TargetOutput
}
//Maybe I will not use this one

