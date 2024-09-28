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

General.addEventListener("click", GenerateAllRows)
General.addEventListener("click", ButtonStatusGeneral)
Detailed.addEventListener("click", DetailedGenerateAllRows)
Detailed.addEventListener("click", ButtonStatusDetailed)

UpdateButtonSkill.addEventListener("click", LocalStorageSetting)
UpdateButtonSkill.addEventListener("click", All)


//Global Variable Initilization from Local Storage
let NameOfPawn={"0": "Enter a Pawn"}
let SkillsOfPawns={"0": ["1","1","1","1","1","1","1","1","1","1","1","1"]}
let FlamesOfPawns={"0": [0,0,0,0,0,0,0,0,0,0,0,0]}
let CapacityArray=[]
let ButtonStatus=0
//Global Variable Initilization from Local Storage

//Variables used in this script

let NumberOfPawn=0
let SkillList=["Shooting","Melee","Construction","Mining","Cooking","Plants","Animals","Crafting","Artistic","Medical","Social","Intellectual"]
let JobList=["Warden","Handle","Cook","Hunt","Construct","Grow","Mine","Plant","Smith","Tailor","Art","Craft","Haul","Clean","Research"]
let Priorty2_JobList=["Construct","Grow","Mine","Plant","Smith","Tailor"]
let Priorty3_JobList=["Warden","Handle","Hunt","Art"]
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
let ConstructCounted=[]
let GrowCounted=[]
let MineCounted=[]
let PlantCounted=[]
let SmithCounted=[]
let TailorCounted=[]
let WardenCounted=[]
let HandleCounted=[]
let HuntCounted=[]
let ArtCounted=[]

let Priorty1Occupation=[]

let Priorty1CountedperPawn={}
let Priorty2CountedperPawn={}
let Priorty3CountedperPawn={}
let Priorty4CountedperPawn={}

let Priorty2Limit=2
//Variables used in this script

LocalStorageGetting()
All()


function All(){
    //console.log("Here")
    
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
    if(ButtonStatus==0){
        GenerateAllRows()
    }
    else{
        DetailedGenerateAllRows()
    }
    MaintainInputValue()
    LocalStorageSetting()   
}


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

function LocalStorageSetting(){

    PawnLimitValue=PawnLimit.value
    JobLimitValue=JobLimit.value

    let PawnLimitValueJson=JSON.stringify(PawnLimitValue)
    localStorage.setItem("PawnLimitValue", PawnLimitValueJson)
    let JobLimitValueJson=JSON.stringify(JobLimitValue)
    localStorage.setItem("JobLimitValue", JobLimitValueJson)
    //console.log(JobLimitValueJson)

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

function ButtonStatusGeneral(){
    ButtonStatus=0
}

function ButtonStatusDetailed(){
    ButtonStatus=1
}

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
    let b=Counted_Sum()
    for(var i=0;i<NumberOfPawn;i++){
        a=AssignedJobsofPawns[i][index]
        if(a==Check&&b[i]<PawnLimitValue){
            AssignedJobsofPawns[i][index]=value
        }
        else{
            if(a==Check){
                AssignedJobsofPawns[i][index]=value
            }
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
    /*
    if(Job=="Construct"){
        console.log("-----------------------------------------------------------------------------------")
        console.log("Job")
        console.log(Job)
        console.log("Title")
        console.log(Title)
        console.log("currarray")
        console.log(currarray)
        console.log("Slot")
        console.log(Slot)
    }
    /*
    console.log("-----------------------------------------------------------------------------------")
    console.log("Job")
    console.log(Job)
    console.log("currarray")
    console.log(currarray)
    console.log("Slot")
    console.log(Slot)
    */
    if(currarray.length==0){
        //console.log("Here")
        return 0
    }
    else if(Slot<=currarray.length&&currarray.length!=0){
        //console.log("Here3")
        currarrayValues=GetValueofAsked(currarray,index)
        //console.log("currarrayValues")
        //console.log(currarrayValues)
        currarrayValuesGraded=Grader(currarrayValues)
        //console.log("currarrayValuesGraded")
        //console.log(currarrayValuesGraded)
        for(var i=0;i<Slot;i++){
            for(var j=0;j<currarray.length;j++){
                if(Priorty1Occupation[currarray[j]]!=1||(Value==2&&Priorty2CountedperPawn[currarray[j]]<Priorty2Limit)||(Value==3&&Priorty1Occupation[currarray[j]]==1)){
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
    //console.log("index")
    //console.log(index)
    let currarray=[]
    for(var i=0;i<NumberOfPawn;i++){
        if(AssignedJobsofPawns[i][index]==Title&&Priorty1Occupation[i]!=1){//&&Priorty1Occupation[i]!=1
            //console.log("AssignedJobsofPawns[i][index]")
            //console.log(AssignedJobsofPawns[i][index])
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

//if a pawn has a priorty 1 job this function will delete the priorty 2 job from its assaigned job list
function Priorty2_Deleter(){
    let currarray=[]
    for(var i=0;i<NumberOfPawn;i++){
        if(Priorty1Occupation[i]==1){
            //console.log("------------------------------------------------------------")
            for(var j=0;j<Priorty2_JobList.length;j++){
                //console.log("Here2")
                index=GetIndex(Priorty2_JobList[j])
                //console.log("index")
                //console.log(index)
                AssignedJobsofPawns[i][index]=0
            }
        }
    }
}

function PawnsAssignedJobCounter(value){
    let sum=0
    let currobject={}
    for(var i=0;i<NumberOfPawn;i++){
        for(var j=0;j<NumberofJobs;j++){
            if(AssignedJobsofPawns[i][j]==value){
                sum=sum+1
            }           
        }
        currobject[i]=sum
        sum=0
    }        
    return currobject
}



function JobRunOrdered(){
    Cook()
    Crafting()
    Researching()
    Priorty1CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(1)))
    Priorty2_Deleter()
    Constructing()
    Priorty2CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(2)))
    Growing()
    Priorty2CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(2)))
    Mineing()
    Priorty2CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(2)))
    Planting()
    Priorty2CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(2)))
    Smithing()
    Priorty2CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(2)))
    Tailoring()
    Priorty2CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(2)))
    Wardening()
    Priorty3CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(3)))
    Handleing()
    Priorty3CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(3)))
    Hunting()
    Priorty3CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(3)))
    Arting()
    Priorty3CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(3)))
    Hauling()
    Cleaning()
    Priorty4CountedperPawn=JSON.parse(JSON.stringify(PawnsAssignedJobCounter(4)))
    Beginner()

    final_Deleter()
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

    if(CraftCounted[0]<CapacityArray[GetIndex(JobNow)]){
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

    if(ResearchCounted[0]<CapacityArray[GetIndex(JobNow)]){
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

function Constructing(){
    let JobNow="Construct"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",2)
    ConstructCounted[0]=AssignedCounter(JobNow,2,0)

    if(ConstructCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",2)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            ConstructCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Intermediate",2)
            ConstructCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                ConstructCounted[0]=AssignedCounter(JobNow,2,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Beginner",2)
                ConstructCounted[0]=AssignedCounter(JobNow,2,0)
            }
        }
    }
}

function Growing(){
    let JobNow="Grow"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",2)
    GrowCounted[0]=AssignedCounter(JobNow,2,0)

    if(GrowCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",2)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            GrowCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-GrowCounted[0],"Intermediate",2)
            GrowCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                GrowCounted[0]=AssignedCounter(JobNow,2,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-GrowCounted[0],"Beginner",2)
                GrowCounted[0]=AssignedCounter(JobNow,2,0)
            }
        }
    }
}

function Mineing(){
    let JobNow="Mine"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",2)
    MineCounted[0]=AssignedCounter(JobNow,2,0)

    if(MineCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",2)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            MineCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-MineCounted[0],"Intermediate",2)
            MineCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                MineCounted[0]=AssignedCounter(JobNow,2,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-MineCounted[0],"Beginner",2)
                MineCounted[0]=AssignedCounter(JobNow,2,0)
            }
        }
    }
}

function Planting(){
    let JobNow="Plant"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",2)
    PlantCounted[0]=AssignedCounter(JobNow,2,0)

    if(PlantCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",2)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            PlantCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-PlantCounted[0],"Intermediate",2)
            PlantCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                PlantCounted[0]=AssignedCounter(JobNow,2,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-PlantCounted[0],"Beginner",2)
                PlantCounted[0]=AssignedCounter(JobNow,2,0)
            }
        }
    }
}

function Smithing(){
    let JobNow="Smith"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",2)
    SmithCounted[0]=AssignedCounter(JobNow,2,0)

    if(SmithCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",2)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            SmithCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-SmithCounted[0],"Intermediate",2)
            SmithCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                SmithCounted[0]=AssignedCounter(JobNow,2,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-SmithCounted[0],"Beginner",2)
                SmithCounted[0]=AssignedCounter(JobNow,2,0)
            }
        }
    }
}

function Tailoring(){
    let JobNow="Tailor"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",2)
    TailorCounted[0]=AssignedCounter(JobNow,2,0)

    if(TailorCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",2)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            TailorCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-TailorCounted[0],"Intermediate",2)
            TailorCounted[0]=AssignedCounter(JobNow,2,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                TailorCounted[0]=AssignedCounter(JobNow,2,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-TailorCounted[0],"Beginner",2)
                TailorCounted[0]=AssignedCounter(JobNow,2,0)
            }
        }
    }
}

function Wardening(){
    let JobNow="Warden"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",3)
    WardenCounted[0]=AssignedCounter(JobNow,3,0)

    if(WardenCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",3)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            WardenCounted[0]=AssignedCounter(JobNow,3,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-WardenCounted[0],"Intermediate",3)
            WardenCounted[0]=AssignedCounter(JobNow,3,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                WardenCounted[0]=AssignedCounter(JobNow,3,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-WardenCounted[0],"Beginner",3)
                WardenCounted[0]=AssignedCounter(JobNow,3,0)
            }
        }
    }
}

function Handleing(){
    let JobNow="Handle"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",3)
    HandleCounted[0]=AssignedCounter(JobNow,3,0)

    if(HandleCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",3)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            HandleCounted[0]=AssignedCounter(JobNow,3,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-HandleCounted[0],"Intermediate",3)
            HandleCounted[0]=AssignedCounter(JobNow,3,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                HandleCounted[0]=AssignedCounter(JobNow,3,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-HandleCounted[0],"Beginner",3)
                HandleCounted[0]=AssignedCounter(JobNow,3,0)
            }
        }
    }
}

function Hunting(){
    let JobNow="Hunt"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",3)
    HuntCounted[0]=AssignedCounter(JobNow,3,0)

    if(HuntCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",3)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            HuntCounted[0]=AssignedCounter(JobNow,3,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-HuntCounted[0],"Intermediate",3)
            HuntCounted[0]=AssignedCounter(JobNow,3,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                HuntCounted[0]=AssignedCounter(JobNow,3,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-HuntCounted[0],"Beginner",3)
                HuntCounted[0]=AssignedCounter(JobNow,3,0)
            }
        }
    }
}

function Arting(){
    let JobNow="Art"
    AssigningMaster(JobNow,"Upper-Intermediate_Flame",3)
    ArtCounted[0]=AssignedCounter(JobNow,3,0)

    if(ArtCounted[0]<CapacityArray[GetIndex(JobNow)]){
        Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ConstructCounted[0],"Upper-Intermediate",3)
        //console.log("Result")
        //console.log(Result)
        if(Result==0){
            ArtCounted[0]=AssignedCounter(JobNow,3,0)
            //console.log("Here2")
            Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ArtCounted[0],"Intermediate",3)
            ArtCounted[0]=AssignedCounter(JobNow,3,0)
            //console.log("Result")
            //console.log(Result)
            if(Result==0){
                ArtCounted[0]=AssignedCounter(JobNow,3,0)
                //console.log("Here5")
                Result=AssignLeftCapacity(JobNow,CapacityArray[GetIndex(JobNow)]-ArtCounted[0],"Beginner",3)
                ArtCounted[0]=AssignedCounter(JobNow,3,0)
            }
        }
    }
}

function Hauling(){
    let JobNow="Haul"
    let Total=[]
    Total=Counted_Sum()
    //console.log("Total")
    //console.log(Total)
    AssigningHaulClean(JobNow,4,Total)
}

function Cleaning(){
    let JobNow="Clean"
    let Total=[]
    Total=Counted_Sum()
    //console.log("Total")
    //console.log(Total)
    AssigningHaulClean(JobNow,4,Total)
}

function Beginner(){
    //JobList=["Warden","Handle","Cook","Hunt","Construct","Grow","Mine","Plant Cut","Smith","Tailor","Art","Craft","Haul","Clean","Research"]
    for(var i=0;i<JobList.length;i++){
        AssigningMaster(JobList[i],"Beginner",4)
    }
}

function Counted_Sum(){
    let a
    let b
    let c
    let currarray=[]
    for(var i=0;i<NumberOfPawn;i++){       
        a=Priorty1CountedperPawn[i]
        b=Priorty2CountedperPawn[i]
        c=Priorty3CountedperPawn[i]
        currarray[i]=a+b+c
    }
    return currarray
}

function AssigningHaulClean(Job,value,Total){
    index=GetIndex(Job)
    for(var i=0;i<NumberOfPawn;i++){       
        if(Total[i]<JobLimitValue&&Priorty1Occupation[i]!=1){
            AssignedJobsofPawns[i][index]=value
        }
    }
}

function final_Deleter(){
    for(var i=0;i<NumberOfPawn;i++){
        for(var j=0;j<NumberofJobs;j++){
            if(typeof(AssignedJobsofPawns[i][j])=="string"){
                AssignedJobsofPawns[i][j]=0
            }
        }
    }
}

//çizdirme kısmı

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
        
        if(JobArray[a]!=0){
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
    let CurArray=AssignedJobsofPawns[a]
    GenerateSingleRow(CurName,CurArray)
   } 
}

function DetailedGenerateSingleRow(Name,JobArray){

    let ColorofBadge=""

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
            if(JobArray[a]==1){
                ColorofBadge="primary"
            }
            else if(JobArray[a]==2){
                ColorofBadge="success"
            }
            else if(JobArray[a]==3){
                ColorofBadge="danger"
            }
            else if(JobArray[a]==4){
                ColorofBadge="secondary"
            }
            let Text=document.createElement('span')
            Text.classList.add('badge')

            Text.classList.add(`text-bg-${ColorofBadge}`)
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
    let CurArray=AssignedJobsofPawns[a]
    DetailedGenerateSingleRow(CurName,CurArray)
   }  
}


//Simulation

let Warden_Load=2 //Number of pawn in custody
let Warden_ProgressInHour=0.2
let Warden_SequencesInHour=2
let Warden_CooldownTimeInHour=4
let Warden_StartingTime=8
let Warden_StartingType=1
let Warden_Slot=Warden_Load

let Warden_Calculated_Load=HowItWillTakeforOnePawn(Warden_Load,Warden_ProgressInHour)

let Simulation_Warden={
    "Index":0,
    "Load":Warden_Load,
    "ProgressInHour":Warden_ProgressInHour,
    "SequencesInHour":Warden_SequencesInHour,
    "CooldownTimeInHour":Warden_CooldownTimeInHour,
    "StartingTime":Warden_StartingTime,
    "StartingType":Warden_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Warden_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Warden_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Handle_Load=2   //Number of animal that will be tamed
let Handle_ProgressInHour=0.4
let Handle_SequencesInHour=4
let Handle_CooldownTimeInHour=6
let Handle_StartingTime=8
let Handle_StartingType=0
let Handle_Slot=Handle_Load

let Handle_Calculated_Load=HowItWillTakeforOnePawn(Handle_Load,Handle_ProgressInHour)

let Simulation_Handle={
    "Index":1,
    "Load":Handle_Load,
    "ProgressInHour":Handle_ProgressInHour,
    "SequencesInHour":Handle_SequencesInHour,
    "CooldownTimeInHour":Handle_CooldownTimeInHour,
    "StartingTime":Handle_StartingTime,
    "Starting type":Handle_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Handle_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Handle_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Cook_Load=30 //Number of meal need to be done
let Cook_ProgressInHour=4
let Cook_SequencesInHour=8
let Cook_CooldownTimeInHour=0
let Cook_StartingTime=8
let Cook_StartingType=1
let Cook_Slot=3

let Cook_Calculated_Load=HowItWillTakeforOnePawn(Cook_Load,Cook_ProgressInHour)

let Simulation_Cook={
    "Index":2,
    "Load":Cook_Load,
    "ProgressInHour":Cook_ProgressInHour,
    "SequencesInHour":Cook_SequencesInHour,
    "CooldownTimeInHour":Cook_CooldownTimeInHour,
    "StartingTime":Cook_StartingTime,
    "Starting type":Cook_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Cook_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Cook_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Hunt_Load=8 //Number of animal will be killed
let Hunt_ProgressInHour=1
let Hunt_SequencesInHour=6
let Hunt_CooldownTimeInHour=0
let Hunt_StartingTime=8
let Hunt_StartingType=1
let Hunt_Slot=Hunt_Load

let Hunt_Calculated_Load=HowItWillTakeforOnePawn(Hunt_Load,Hunt_ProgressInHour)

let Simulation_Hunt={
    "Index":3,
    "Load":Hunt_Load,
    "ProgressInHour":Hunt_ProgressInHour,
    "SequencesInHour":Hunt_SequencesInHour,
    "CooldownTimeInHour":Hunt_CooldownTimeInHour,
    "StartingTime":Hunt_StartingTime,
    "Starting type":Hunt_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Hunt_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Hunt_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Construct_Load=50 //Number of tiles will be build
let Construct_ProgressInHour=4
let Construct_SequencesInHour=8
let Construct_CooldownTimeInHour=0
let Construct_StartingTime=8
let Construct_StartingType=1
let Construct_Slot=Construct_Load

let Construct_Calculated_Load=HowItWillTakeforOnePawn(Construct_Load,Construct_ProgressInHour)

let Simulation_Construct={
    "Index":4,
    "Load":Construct_Load,
    "ProgressInHour":Construct_ProgressInHour,
    "SequencesInHour":Construct_SequencesInHour,
    "CooldownTimeInHour":Construct_CooldownTimeInHour,
    "StartingTime":Construct_StartingTime,
    "Starting type":Construct_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Construct_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Construct_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Grow_Load=400 //Number of tiles need to be taken care of
let Grow_ProgressInHour=10
let Grow_SequencesInHour=8
let Grow_CooldownTimeInHour=0
let Grow_StartingTime=8
let Grow_StartingType=1
let Grow_Slot=Grow_Load

let Grow_Calculated_Load=HowItWillTakeforOnePawn(Grow_Load,Grow_ProgressInHour)

let Simulation_Grow={
    "Index":5,
    "Load":Grow_Load,
    "ProgressInHour":Grow_ProgressInHour,
    "SequencesInHour":Grow_SequencesInHour,
    "CooldownTimeInHour":Grow_CooldownTimeInHour,
    "StartingTime":Grow_StartingTime,
    "Starting type":Grow_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Grow_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Grow_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Mine_Load=100 //Number of tiles need to be mined
let Mine_ProgressInHour=4
let Mine_SequencesInHour=6
let Mine_CooldownTimeInHour=2
let Mine_StartingTime=8
let Mine_StartingType=1
let Mine_Slot=Mine_Load

let Mine_Calculated_Load=HowItWillTakeforOnePawn(Mine_Load,Mine_ProgressInHour)

let Simulation_Mine={
    "Index":6,
    "Load":Mine_Load,
    "ProgressInHour":Mine_ProgressInHour,
    "SequencesInHour":Mine_SequencesInHour,
    "CooldownTimeInHour":Mine_CooldownTimeInHour,
    "StartingTime":Mine_StartingTime,
    "Starting type":Mine_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Mine_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Mine_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Plant_Load=60 //Plants need to be cut
let Plant_ProgressInHour=2
let Plant_SequencesInHour=4
let Plant_CooldownTimeInHour=2
let Plant_StartingTime=8
let Plant_StartingType=1
let Plant_Slot=Plant_Load

let Plant_Calculated_Load=HowItWillTakeforOnePawn(Plant_Load,Plant_ProgressInHour)

let Simulation_Plant={
    "Index":7,
    "Load":Plant_Load,
    "ProgressInHour":Plant_ProgressInHour,
    "SequencesInHour":Plant_SequencesInHour,
    "CooldownTimeInHour":Plant_CooldownTimeInHour,
    "StartingTime":Plant_StartingTime,
    "Starting type":Plant_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Plant_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Plant_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Smith_Load=10 //Items wait in line
let Smith_ProgressInHour=0.5
let Smith_SequencesInHour=4
let Smith_CooldownTimeInHour=4
let Smith_StartingTime=8
let Smith_StartingType=1
let Smith_Slot=2

let Smith_Calculated_Load=HowItWillTakeforOnePawn(Smith_Load,Smith_ProgressInHour)

let Simulation_Smith={
    "Index":8,
    "Load":Smith_Load,
    "ProgressInHour":Smith_ProgressInHour,
    "SequencesInHour":Smith_SequencesInHour,
    "CooldownTimeInHour":Smith_CooldownTimeInHour,
    "StartingTime":Smith_StartingTime,
    "Starting type":Smith_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Smith_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Smith_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Tailor_Load=8 //Number of clothes need to be created
let Tailor_ProgressInHour=0.2
let Tailor_SequencesInHour=2
let Tailor_CooldownTimeInHour=4
let Tailor_StartingTime=8
let Tailor_StartingType=1
let Tailor_Slot=1

let Tailor_Calculated_Load=HowItWillTakeforOnePawn(Tailor_Load,Tailor_ProgressInHour)

let Simulation_Tailor={
    "Index":9,
    "Load":Tailor_Load,
    "ProgressInHour":Tailor_ProgressInHour,
    "SequencesInHour":Tailor_SequencesInHour,
    "CooldownTimeInHour":Tailor_CooldownTimeInHour,
    "StartingTime":Tailor_StartingTime,
    "Starting type":Tailor_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Tailor_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Tailor_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Art_Load=6 //Number of statue in line
let Art_ProgressInHour=0.5
let Art_SequencesInHour=4
let Art_CooldownTimeInHour=4
let Art_StartingTime=8
let Art_StartingType=1
let Art_Slot=1

let Art_Calculated_Load=HowItWillTakeforOnePawn(Art_Load,Art_ProgressInHour)

let Simulation_Art={
    "Index":10,
    "Load":Art_Load,
    "ProgressInHour":Art_ProgressInHour,
    "SequencesInHour":Art_SequencesInHour,
    "CooldownTimeInHour":Art_CooldownTimeInHour,
    "StartingTime":Art_StartingTime,
    "Starting type":Art_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Art_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Art_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Craft_Load=20 //Number of component in line
let Craft_ProgressInHour=0.2
let Craft_SequencesInHour=8
let Craft_CooldownTimeInHour=0
let Craft_StartingTime=8
let Craft_StartingType=1
let Craft_Slot=2

let Craft_Calculated_Load=HowItWillTakeforOnePawn(Craft_Load,Craft_ProgressInHour)

let Simulation_Craft={
    "Index":11,
    "Load":Craft_Load,
    "ProgressInHour":Craft_ProgressInHour,
    "SequencesInHour":Craft_SequencesInHour,
    "CooldownTimeInHour":Craft_CooldownTimeInHour,
    "StartingTime":Craft_StartingTime,
    "Starting type":Craft_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Craft_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Craft_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Haul_Load=200 //Number of item need to be hauled
let Haul_ProgressInHour=4
let Haul_SequencesInHour=2
let Haul_CooldownTimeInHour=4
let Haul_StartingTime=8
let Haul_StartingType=1
let Haul_Slot=Haul_Load

let Haul_Calculated_Load=HowItWillTakeforOnePawn(Haul_Load,Haul_ProgressInHour)

let Simulation_Haul={
    "Index":12,
    "Load":Haul_Load,
    "ProgressInHour":Haul_ProgressInHour,
    "SequencesInHour":Haul_SequencesInHour,
    "CooldownTimeInHour":Haul_CooldownTimeInHour,
    "StartingTime":Haul_StartingTime,
    "Starting type":Haul_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Haul_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Haul_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Clean_Load=60 //Number of tiles need to be cleaned
let Clean_ProgressInHour=10
let Clean_SequencesInHour=2
let Clean_CooldownTimeInHour=4
let Clean_StartingTime=8
let Clean_StartingType=1
let Clean_Slot=Clean_Load

let Clean_Calculated_Load=HowItWillTakeforOnePawn(Clean_Load,Clean_ProgressInHour)

let Simulation_Clean={
    "Index":13,
    "Load":Clean_Load,
    "ProgressInHour":Clean_ProgressInHour,
    "SequencesInHour":Clean_SequencesInHour,
    "CooldownTimeInHour":Clean_CooldownTimeInHour,
    "StartingTime":Clean_StartingTime,
    "Starting type":Clean_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Clean_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Clean_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Research_Load=2000 //Number of points need to be completed
let Research_ProgressInHour=20
let Research_SequencesInHour=6
let Research_CooldownTimeInHour=2
let Research_StartingTime=8
let Research_StartingType=1
let Research_Slot=2

let Research_Calculated_Load=HowItWillTakeforOnePawn(Research_Load,Research_ProgressInHour)

let Simulation_Research={
    "Index":14,
    "Load":Research_Load,
    "ProgressInHour":Research_ProgressInHour,
    "SequencesInHour":Research_SequencesInHour,
    "CooldownTimeInHour":Research_CooldownTimeInHour,
    "StartingTime":Research_StartingTime,
    "Starting type":Research_StartingType, //1 is start without cooldown, 0 start with cooldown
    "SlotofJob":Research_Slot, //How many pawn can do it at the same time
    "Calculated_Load":Research_Calculated_Load //Calculated time of if one pawn would have done that job
}

let Simulation_Inputs={
    "0": Simulation_Warden,
    "1": Simulation_Handle,
    "2": Simulation_Cook, 
    "3": Simulation_Hunt,
    "4": Simulation_Construct,
    "5": Simulation_Grow,
    "6": Simulation_Mine,
    "7": Simulation_Plant,
    "8": Simulation_Smith,
    "9": Simulation_Tailor,
    "10": Simulation_Art,
    "11": Simulation_Craft,
    "12": Simulation_Haul,
    "13": Simulation_Clean,
    "14": Simulation_Research
}

function HowItWillTakeforOnePawn(Load,ProgressInHour){
  return Load/ProgressInHour
}

let Schedule_Days=2 //Customer input of how my days will be simulated
let Schedule_Hours=23 //Internal calibration - how many hours a day will be
let Schedule_Starting_Time=8 //The time pawns start working
let Schedule_Finishing_Time=20 //The time pawns finish working

let Schedule_Days_Array=Schedule_day_and_hour_array(Schedule_Days,Schedule_Hours,1)
let Schedule_Hours_Array=Schedule_day_and_hour_array(Schedule_Days,Schedule_Hours,2)

let Schedule_Occupation=[]
let Schedule_Occupation_Counter=[]
let Schedule_Load=[]
let Schedule_Load_In_Job=[]
let Schedule_Occupation_Log=[]
let Schedule_Load_Log=[]
let Schedule_Load_In_Job_Log=[]
let Schedule_Empty=[]
let Schedule_is_Done=[]
let Schedule_Empty_Job=[]

function Schedule_day_and_hour_array(Day,Hour,Value){
    let currarray=[]
    for(var i=1;i<Day+1;i++){
        for(var j=0;j<Hour+1;j++){
            if(Value==1){
                currarray.push(i)
            }
            else if(Value==2){
                currarray.push(j)
            }
        }
    }
    return currarray
}

Schedule_Initilization()

function Schedule_Initilization(){
    Schedule_Occupation_Counter_Func()
    Schedule_Occupation=Schedule_Occupation_Array_Initial_Creator()
    for(var i=0;i<NumberOfPawn;i++){
        Schedule_Occupation_Assigning(Schedule_Occupation_Checker(Schedule_Occupation,i),1)
    }
    for(var i=0;i<NumberOfPawn;i++){
        Schedule_Occupation_Assigning(Schedule_Occupation_Checker(Schedule_Occupation,i),2)
    }
    for(var i=0;i<NumberOfPawn;i++){
        Schedule_Occupation_Assigning(Schedule_Occupation_Checker(Schedule_Occupation,i),3)
    }
    for(var i=0;i<NumberOfPawn;i++){
        Schedule_Occupation_Assigning(Schedule_Occupation_Checker(Schedule_Occupation,i),4)
    }
    Schedule_Load_Func()
    Schedule_Empty=Schedule_Empty_Array(NumberOfPawn)
    Schedule_Empty_is_Done=Schedule_Empty_Array(NumberofJobs)
    Schedule_Empty_Job=Schedule_Empty_Array(NumberofJobs)
    Schedule_Load_In_Job_Func()
}

function Schedule_Occupation_Counter_Func(){
    if(Schedule_Occupation_Counter.length==0){
        let currarray=[]
        for(var i=0;i<NumberofJobs;i++){
            currarray[i]=Simulation_Inputs[i].SlotofJob
        }
        Schedule_Occupation_Counter=JSON.parse(JSON.stringify(currarray))
    }
    else{}
    //console.log("Here")
}

function Schedule_Occupation_Array_Initial_Creator(NumberofPawn){
    let currarray=[]
    for(var i=0;i<NumberOfPawn;i++){
        currarray.push(0)
    }
    return currarray
}

function Schedule_Occupation_Checker(Occupation,index){
        if(Occupation[index]==0){           
            return index
        }
        else{
            return -1
        }
    
}

function Schedule_Occupation_Assigning(index,value){
    if(index!=-1){
        for(var i=0;i<NumberofJobs;i++){
            if(AssignedJobsofPawns[index][i]==value&&Schedule_Occupation_Counter[i]>0&&Schedule_is_Done[i]!=1){ 
                Schedule_Occupation_Counter[i]-- 
                Schedule_Occupation[index]=Schedule_Get_Job(i)       
            }          
        }
    }
}

function Schedule_Occupation_Assigning_for_All_Pawn(){
    for(var i=0;i<NumberOfPawn;i++){
        Schedule_Occupation_Assigning(Schedule_Occupation_Checker(Schedule_Occupation,i),1)
    }
}

//Tool
function Schedule_Get_Job(indexofJob){
    for(var i=0;i<JobList.length;i++){
        if(i==indexofJob){
            return JobList[i]
        }
    }
}
//Tool

function Schedule_Load_Func(){
    let Name_Job=""
    let IndexofName_Job=0
    for(var i=0;i<Schedule_Occupation.length;i++){
        Name_Job=Schedule_Occupation[i]
        if(Name_Job!=0){
            IndexofName_Job=GetIndex(Name_Job)
            Schedule_Load[i]=JSON.parse(JSON.stringify(Simulation_Inputs[IndexofName_Job].Load)) 
        }
        else{
            Schedule_Load[i]=0
        }     
    }
}

function Schedule_Empty_Array(Size){
    let currarray=[]
    for(var i=0;i<Size;i++){
        currarray[i]=0
    }
    return currarray
}

function Schedule_Load_In_Job_Func(){

    let currarray=[]


    for(var i=0;i<NumberofJobs;i++){
    
        
        currarray[i]=JSON.parse(JSON.stringify(Simulation_Inputs[i].Load))
            //console.log("currarray")
            //console.log(currarray)   
                    
    }
    Schedule_Load_In_Job=JSON.parse(JSON.stringify(currarray))
    //console.log("Schedule_Load_In_Job")
    //console.log(Schedule_Load_In_Job) 
}



Schedule_Sim_Run()
//Simulation Run
function Schedule_Sim_Run(){
    for(var i=0;i<Schedule_Hours_Array.length;i++){
        /*
        console.log("Day")
        console.log(Schedule_Days_Array[i])
        console.log("Hour")
        console.log(Schedule_Hours_Array[i])
        */
        //console.log("i")
        //console.log(i)
        //console.log("Schedule_Hours_Array[i]")
        //console.log(Schedule_Hours_Array[i])
        
        //console.log("--------------------------------------------------------------------------")

        
        if(Schedule_Hours_Array[i]<Schedule_Starting_Time){
            Schedule_Occupation_Log[i]=Schedule_Empty
            Schedule_Load_Log[i]=Schedule_Empty
            if(i==0){
                Schedule_Load_In_Job_Log[i]=JSON.parse(JSON.stringify(Schedule_Load_In_Job))
            }
            else{
                //console.log("i")
                //console.log(i)
                Schedule_Load_In_Job_Log[i]=JSON.parse(JSON.stringify(Schedule_Load_In_Job_Log[i-1]))
                //console.log("Schedule_Load_In_Job_Log[i]")
                //console.log(Schedule_Load_In_Job_Log[i])
            }
            //console.log("here1")
        }
        else if(Schedule_Hours_Array[i]==Schedule_Starting_Time&&Schedule_Days_Array[i]!=1){
            Schedule_Occupation_Log[i-(Schedule_Finishing_Time-Schedule_Starting_Time)]
            Schedule_Occupation_Log[i]=JSON.parse(JSON.stringify(Schedule_Occupation_Log[i-(Schedule_Finishing_Time-Schedule_Starting_Time)]))
            Schedule_Load_Log[i]=JSON.parse(JSON.stringify(Schedule_Load_Log[i-(Schedule_Finishing_Time-Schedule_Starting_Time)]))
            Schedule_Load_In_Job_Log[i]=JSON.parse(JSON.stringify(Schedule_Load_In_Job_Log[i-(Schedule_Finishing_Time-Schedule_Starting_Time)]))
            //console.log("here2")
        }
        else if(Schedule_Hours_Array[i]==Schedule_Starting_Time&&Schedule_Days_Array[i]==1){
            Schedule_Occupation_Log[i]=JSON.parse(JSON.stringify(Schedule_Occupation))
            Schedule_Load_Log[i]=JSON.parse(JSON.stringify(Schedule_Load))
            Schedule_Load_In_Job_Log[i]=JSON.parse(JSON.stringify(Schedule_Load_In_Job))
            //console.log("Schedule_Load_Log[i]")
            //console.log(Schedule_Load_Log[i])
            //console.log("Schedule_Load_In_Job_Log[i]")
            //console.log(Schedule_Load_In_Job_Log[i])
            //console.log("here3")
        }
        else if(Schedule_Hours_Array[i]>=Schedule_Starting_Time&&Schedule_Hours_Array[i]<=Schedule_Finishing_Time){
            
            Schedule_Load_Log[i]=Schedule_Decrease_Load(Schedule_Load_Log[i-1],Schedule_Occupation_Log[i-1],1)
            //console.log("Schedule_Load_Log[i]")
            //console.log(Schedule_Load_Log[i])
            Schedule_Occupation_Log[i]=Schedule_Decrease_Occupation(Schedule_Load_Log[i],Schedule_Occupation_Log[i-1],i-1)
            Schedule_Load_In_Job_Log[i]=Schedule_Decrease_Load_In_Job(Schedule_Load_Log[i],Schedule_Occupation_Log[i],Schedule_Occupation_Log[i-1],Schedule_Load_In_Job_Log[i-1],i)
            //console.log("Schedule_Load_In_Job_Log[i]")
            //console.log(Schedule_Load_In_Job_Log[i])
            //console.log("-----------------------------------------------------------------------------------------------------")  
            
            //Schedule_Load_Log[i]=Schedule_Load_Reassigning_After_Occu_Change()
            //console.log("here4")
        } 
        else if(Schedule_Hours_Array[i]>Schedule_Finishing_Time){
            Schedule_Occupation_Log[i]=Schedule_Empty
            Schedule_Load_Log[i]=Schedule_Empty
            Schedule_Load_In_Job_Log[i]=JSON.parse(JSON.stringify(Schedule_Load_In_Job_Log[i-1]))
            //console.log("here5")
        }

    }
}

function Schedule_Decrease_Load(Previous_Log,Previous_Occup_Log,New_Occu_Log){
    let DecreaseValue=0
    let JobName=""
    let currarray=[]
    //console.log("here2")
    //console.log("PreviousIndex")
        //console.log(PreviousIndex)
    for(var i=0;i<Previous_Log.length;i++){
        //console.log("i")
        //console.log(i)
        JobName=Previous_Occup_Log[i]
        //console.log("JobName")
        //console.log(JobName)
        if(JobName!=0){
            JobIndex=GetIndex(JobName)
            //console.log("JobIndex")
            //console.log(JobIndex)

            if(Schedule_Change_Picking(New_Occu_Log,Previous_Occup_Log)==0){
                Factor=FactorFinding(JobName,Previous_Occup_Log)
                currarray[i]=Previous_Log[i]-(Simulation_Inputs[JobIndex].ProgressInHour*Factor)
            //console.log("currarray[i]")
            //console.log(currarray[i])
            //console.log("---------------------------------------------")
            }

            
        }
        else{
            currarray[i]=0
        }
        
    }
    return currarray
}

function Schedule_Decrease_Occupation(Current_Load_Log,Previous_Occup_Log,PreviousIndex){
    let currarray=[]
    for(var i=0;i<Current_Load_Log.length;i++){
        if(Current_Load_Log[i]>0){
            currarray[i]=JSON.parse(JSON.stringify(Previous_Occup_Log[i]))
        }
        else if(Current_Load_Log[i]==0||Current_Load_Log[i]<0){
            currarray[i]=0
            Schedule_is_Done[GetIndex(Previous_Occup_Log[i])]=1
            
            currarray[i]=Schedule_New_Job_Assigning(i,currarray)
        }
    }
    return currarray
}

function FactorFinding(JobName,Previous_Occup_Log){
    let sum=0
    for(var i=0;i<Previous_Occup_Log.length;i++){
        if(Previous_Occup_Log[i]==JobName){
            sum++
        }
    }
    return sum
}

function Schedule_New_Job_Assigning(IndexOfPawn,currarray){
    let Job=""
    Job=Schedule_Occupation_Assigning_Log(Schedule_Occupation_Checker(currarray,IndexOfPawn),1)
    if(Job!=0){
        return Job
    }
    else{
        Job=Schedule_Occupation_Assigning_Log(Schedule_Occupation_Checker(currarray,IndexOfPawn),2)
        if(Job!=0){
            return Job
        }
        else{
            Job=Schedule_Occupation_Assigning_Log(Schedule_Occupation_Checker(currarray,IndexOfPawn),3)
            if(Job!=0){
                return Job
            }
            else{
                Schedule_Occupation_Assigning_Log(Schedule_Occupation_Checker(currarray,IndexOfPawn),4)
                if(Job!=0){
                    return Job
                }
                else{
                    return 0
                }
            }
        }
    }  
}

function Schedule_Occupation_Assigning_Log(index,value){
    let Job=""
    if(index!=-1){
        for(var i=0;i<NumberofJobs;i++){
            if(AssignedJobsofPawns[index][i]==value&&Schedule_Occupation_Counter[i]>0&&Schedule_is_Done[i]!=1){ 
                Schedule_Occupation_Counter[i]-- 
                Job=Schedule_Get_Job(i)       
            }          
        }
        return Job
    }
}

/*

//to be continued
function Schedule_Load_Reassigning_After_Occu_Change(New_Occu_Log,Old_Occu_Log,Load_Log){
    let currLoad=0
    for(var i=0;i<NumberofJobs;i++){
        for(var j=0;j<NumberofJobs;j++){
            if(Schedule_Occupation_Log[i][j]==Schedule_Change_Picking(New_Occu_Log,Old_Occu_Log)){
                
            }
        }
    }


}

*/

function Schedule_Change_Picking(New_Occu_Log,Old_Occu_Log){
    if(New_Occu_Log==1){
        return 0
    }
    for(var i=0;i<New_Occu_Log.length;i++){
        console.log("New_Occu_Log[i]")
        console.log(New_Occu_Log[i])
        console.log("Old_Occu_Log[i]")
        console.log(Old_Occu_Log[i])
        if(New_Occu_Log[i]!=Old_Occu_Log[i]&&New_Occu_Log[i]!=0){
            return i
        }
        else{
            console
            return -1
        }
    }
}



function Schedule_Decrease_Load_In_Job(Load,Occupation,Old_Occupation,Load_In_Job,Index){
    let Name_Job=""
    let IndexofName_Job=0
    let currarray=JSON.parse(JSON.stringify(Load_In_Job))
        //console.log("currarray1")
        //console.log(currarray)
    for(var i=0;i<Occupation.length;i++){
        Name_Job=Occupation[i]
        if(Name_Job!=0){
            IndexofName_Job=GetIndex(Name_Job)
            //console.log("here")
            //console.log("Schedule_Change_Picking(Occupation,Old_Occupation)")
            //console.log(Schedule_Change_Picking(Occupation,Old_Occupation))
            if(Schedule_Change_Picking(Occupation,Old_Occupation)==i){
                Schedule_Load_Log[Index]=JSON.parse(JSON.stringify(Load_In_Job[IndexofName_Job]))
                console.log("i")
                console.log(i)
                console.log("Load[i]")
                console.log(Load[i]) 
            }
            
            currarray[IndexofName_Job]=JSON.parse(JSON.stringify(Load[i]))
            //console.log("currarray[IndexofName_Job]")
            //console.log(currarray[IndexofName_Job])
            //console.log("currarray2")
            //console.log(currarray) 
            //console.log("------------------------------------------------")  
        }
        else{
            currarray[IndexofName_Job]=0
        }     
    }
    return currarray
}