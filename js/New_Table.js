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
let CapacityArray=[]
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

let ComparisionArray=[]

let AssignedJobsofPawns={}

let CookCounted=[]
let CraftCounted=[]
let ResearchCounted=[]

let Priorty1Occupation=[]
//Variables used in this script

//Getting data from Local Storage
LocalStorageGetting()
//AssignerInitializer()
Priorty1Creator()
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

AssignedJobsofPawns=JSON.parse(JSON.stringify(TitleofPawns))

TitleCapacityComparator()
AssignIndex()
JobRunOrdered()

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
    let UnstringfiedCapacityArray=localStorage.getItem("CapacityArray")
    CapacityArray=JSON.parse(UnstringfiedCapacityArray)
    
    NumberOfPawn=Object.keys(NameOfPawn).length
}
//Getting data from Local Storage

function Priorty1Creator(){
    let currarray=[]
    for(var i=0;i<NumberOfPawn;i++){
        currarray[i]=NameOfPawn[i]
    }
    Priorty1Occupation=JSON.parse(JSON.stringify(currarray))
}

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

function TitleCapacityComparator(){
    let Comparision=0
    for(var i=0;i<NumberofJobs;i++){
        Comparision=(TitleNumbersofJobs[i][0]/CapacityArray[i])*1
        ComparisionArray[i]=Comparision
    }
}

function AssignIndex(){
    //JobList=["Warden","Handle","Cook","Hunt","Construct","Grow","Mine","Plant Cut","Smith","Tailor","Art","Craft","Haul","Clean","Research"]
    for(var i=0;i<JobList.length;i++){
        AssigningMaster(JobList[i],"Master",1)
    }
}

function AssigningMaster(Job,Check,value){
    index=GetIndex(Job)
    let a
    for(var i=0;i<NumberOfPawn;i++){
        a=TitleofPawns[i][index]
        if(a==Check){
            AssignedJobsofPawns[i][index]=value
        }
    }
}

function GetIndex(Job){
    for(var i=0;i<JobList.length;i++){
        if(JobList[i]==Job){
            return i
        }
    }
}

function AssignedCounter(Job,value,prohibit){
    index=GetIndex(Job)
    let sum=0
    let a
    for(var i=0;i<NumberOfPawn;i++){
        a=AssignedJobsofPawns[i][index]
        if(a==value){
            sum++
            if(prohibit==1){
                Priorty1Occupation[i]=1
            }
        }
    }
    return sum
    sum=0
}

function AssignLeftCapacity(Job,Slot,Title,Value){
    let a=0
    index=GetIndex(Job)
    let currarray=[]
    let currarrayValues=[]
    let currarrayValuesGraded=[]
    currarray=GetIndexofAsked(Job,Title)
    console.log("currarray")
    console.log(currarray)
    console.log("Slot")
    console.log(Slot)
    if(currarray.length==0){
        //console.log("Here")
        return 0
    }
    else if(Slot<=currarray.length&&currarray.length!=0){
        //console.log("Here3")
        currarrayValues=GetValueofAsked(currarray,index)
        console.log("currarrayValues")
        console.log(currarrayValues)
        currarrayValuesGraded=Grader(currarrayValues)
        console.log("currarrayValuesGraded")
        console.log(currarrayValuesGraded)
        for(var i=0;i<Slot;i++){
            for(var j=0;j<currarray.length;j++){
                if(Priorty1Occupation[currarray[j]]!=1){
                    if(currarrayValuesGraded[j]==i){
                        AssignedJobsofPawns[currarray[j]][index]=Value
                    }                    
                }
            }
        }
        return 1
    }
    else if(Slot>currarray.length&&currarray.length!=0){
        AssigningMaster(Job,Title,Value)
        //console.log("Here4")
        return 0
    }
}

function GetIndexofAsked(Job,Title){
    index=GetIndex(Job)
    let currarray=[]
    for(var i=0;i<NumberOfPawn;i++){
        if(TitleofPawns[i][index]==Title&&Priorty1Occupation[i]!=1){//&&Priorty1Occupation[i]!=1
            currarray.push(i)
        }
    }
    return currarray
}

function GetValueofAsked(Array,index){
    let currarray=[]
    for(var i=0;i<Array.length;i++){
        currarray[i]=JobsOfPawns[Array[i]][index]
    }
    return currarray
}

//import from tablescript.js
function Grader(Array){
    let Grade=0
    let Sorting_Value=0
    let Individual_Value=0
    let GradeArray=[]
    let NoneFlag=0
    for(let a=0;a<Array.length;a++){
        Sorting_Value=Array[a]
        for(let b=0;b<Array.length;b++){
            Individual_Value=Array[b]
            if(Sorting_Value=="None"||Sorting_Value=="Haul"||Sorting_Value=="Clean"){
                Grade=Array.length-NoneFlag
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
    return GradeArray
    Individual_Value=0
    Grade=0
    GradeArray=[] 
}
//import from tablescript.js



function JobRunOrdered(){
    Cook()
    Crafting()
    Researching()
}

function Cook(){
    let JobNow="Cook"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",1)
    CookCounted[0]=AssignedCounter(JobNow,1,1)

    if(CookCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-CookCounted[0],"Upper-Intermediate",1)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            CookCounted[0]=AssignedCounter(JobNow,1,1)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-CookCounted[0],"Intermediate",1)
            ResearchCounted[0]=AssignedCounter(JobNow,1,1)
            if(Result==0){
                CookCounted[0]=AssignedCounter(JobNow,1,1)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-CookCounted[0],"Beginner",1)
                ResearchCounted[0]=AssignedCounter(JobNow,1,1)
            }
        }
    }
}

function Crafting(){
    let JobNow="Craft"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",1)
    CraftCounted[0]=AssignedCounter(JobNow,1,1)

    if(CookCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-CraftCounted[0],"Upper-Intermediate",1)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            CraftCounted[0]=AssignedCounter(JobNow,1,1)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-CraftCounted[0],"Intermediate",1)
            ResearchCounted[0]=AssignedCounter(JobNow,1,1)
            if(Result==0){
                CraftCounted[0]=AssignedCounter(JobNow,1,1)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-CraftCounted[0],"Beginner",1)
                ResearchCounted[0]=AssignedCounter(JobNow,1,1)
            }
        }
    }
}

function Researching(){
    let JobNow="Research"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",1)
    ResearchCounted[0]=AssignedCounter(JobNow,1,1)

    if(CookCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ResearchCounted[0],"Upper-Intermediate",1)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            ResearchCounted[0]=AssignedCounter(JobNow,1,1)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ResearchCounted[0],"Intermediate",1)
            ResearchCounted[0]=AssignedCounter(JobNow,1,1)
            if(Result==0){
                ResearchCounted[0]=AssignedCounter(JobNow,1,1)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ResearchCounted[0],"Beginner",1)
                ResearchCounted[0]=AssignedCounter(JobNow,1,1)
            }
        }
    }
}

