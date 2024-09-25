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
    console.log("Here")
    
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