//Get Element
let UpdateButtonSkill=document.getElementById('UpdateButtonSkills')
let UpdateButtonPawns=document.getElementById('UpdateButtonPawns')
//Get Element

//Global Variables
let NameOfPawn={"0": "Enter a Pawn"}
let SkillsOfPawns={"0": ["1","1","1","1","1","1","1","1","1","1","1","1"]}
let FlamesOfPawns={"0": [0,0,0,0,0,0,0,0,0,0,0,0]}
let SkillList=["Shooting","Melee","Construction","Mining","Cooking","Plants","Animals","Crafting","Artistic","Medical","Social","Intellectual"]
let NumberOfSkills=12
let SkillArray={}
let SkillGrades={}
let PawnsSkillGrades={}
let SkillGradesOrdered={}
let PawnsSkillGradesOrdered={}
let BestNameListofSkills={}
let NumberOfBestPawnOfSkills=2
let BestSkillListofPawns={}
let NumberOfBestSkillsOfPawns=3
let SkillLevelList={}
//Global Variables

//Pawn Info update from main page
LocalStorageGettingMainPage()
//Pawn Info update from main page

//Create SkillArray
SkillArrayCreator()
//console.log(SkillArray)
//Create SkillArray

//Grade SkillArray
SkillGrades=Grader_Skills(SkillArray,NumberOfSkills)
//console.log(SkillGrades)
//console.log("SkillGrades")
//Grade SkillArray

//Grade SkillsOfPawns
PawnsSkillGrades=Grader_Skills(SkillsOfPawns,Object.keys(NameOfPawn).length)
//console.log(PawnsSkillGrades)
//console.log("PawnsSkillGrades")
//Grade SkillsOfPawns

//Ordering Grades of Skills
SkillGradesOrdered=GradeOrderer(SkillGrades,NumberOfSkills)
//console.log(SkillGradesOrdered)
//console.log("SkillGradesOrdered")
//Ordering Grades of Skills

//Ordering Grades of Pawn's Skills
PawnsSkillGradesOrdered=GradeOrderer(PawnsSkillGrades,Object.keys(NameOfPawn).length)
//console.log(PawnsSkillGradesOrdered)
//console.log("PawnsSkillGradesOrdered")
//Ordering Grades of Pawn's Skills

//Finding Name of Best Pawns of Skills
BestNameListofSkills=BestNameList(SkillGradesOrdered,NameOfPawn,NumberOfSkills,NumberOfBestPawnOfSkills,1)
//console.log(BestNameListofSkills)
//console.log("BestNameListofSkills")
//Finding Name of Best Pawns of Skills

//Finding Skills Names of Best Skills of Pawns
BestSkillListofPawns=BestNameList(PawnsSkillGradesOrdered,SkillList,Object.keys(NameOfPawn).length,NumberOfBestSkillsOfPawns,1)
//console.log(BestSkillListofPawns)
//console.log("BestSkillListofPawns")
//Finding Skills Names of Best Skills of Pawns

//Finding Skills Names of Best Skills of Pawns
SkillLevelList=BestNameList(PawnsSkillGradesOrdered,SkillList,Object.keys(NameOfPawn).length,NumberOfBestSkillsOfPawns,2)
//console.log(SkillLevelList)
//console.log("SkillLevelList")
//Finding Skills Names of Best Skills of Pawns

//Event Listeners
UpdateButtonSkill.addEventListener("click",InnerTextChanger)
UpdateButtonPawns.addEventListener("click",ElementCreator)
//Event Listeners

//functions
function LocalStorageGettingMainPage(){
    let UnstringfiedNameOfPawn=localStorage.getItem("NameOfPawn")
    NameOfPawn=JSON.parse(UnstringfiedNameOfPawn)
    let UnstringfiedSkillsOfPawns=localStorage.getItem("SkillsOfPawns")
    SkillsOfPawns=JSON.parse(UnstringfiedSkillsOfPawns)
    //console.log(SkillsOfPawns)
    let UnstringfiedFlamesOfPawns=localStorage.getItem("FlamesOfPawns")
    FlamesOfPawns=JSON.parse(UnstringfiedFlamesOfPawns)
    let UnstringfiedPawnIndex=localStorage.getItem("PawnIndex")
    PawnIndex=JSON.parse(UnstringfiedPawnIndex)
}

function SkillArrayCreator(){
    let CurrentSkillArray=[]
    let CurrentPawn=[]
    for(let CounterOfSkills=0;CounterOfSkills<NumberOfSkills;CounterOfSkills++){
        for(let CounterOfPawns=0;CounterOfPawns<Object.keys(NameOfPawn).length;CounterOfPawns++){
            CurrentPawn=Array.from(SkillsOfPawns[CounterOfPawns])
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
            if(SkillDedicatedtoSkill[i]=="None"){
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
                if(Sorting_Value=="None"){
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

function BestNameList(ObjectGiven3,ObjectGiven4,Cycle3,Cycle4,Mode){
    let BestNameListObject={}
    let CurrentNamesArray=[]
    let OutputNameArray=[]
    let BestSkillListObject={}
    let CurrentSkillsArray=[]
    let OutputSkillArray=[]
    for(let x=0;x<Cycle3;x++){
        CurrentNamesArray=ObjectGiven3[x]
        if(Cycle3==Object.keys(NameOfPawn).length){
            CurrentSkillsArray=SkillsOfPawns[x]
        }
        for(let a=0;a<Cycle4;a++){
            OutputNameArray[a]=ObjectGiven4[CurrentNamesArray[a]]
            if(Cycle3==Object.keys(NameOfPawn).length){
                OutputSkillArray[a]=CurrentSkillsArray[CurrentNamesArray[a]]
            }
        }
        BestNameListObject[x]=OutputNameArray
        OutputNameArray=[]
        BestSkillListObject[x]=OutputSkillArray
        OutputSkillArray=[]
    }
    if(Mode==1){
        return BestNameListObject
    }
    if(Mode==2){
        return BestSkillListObject
    }
}

function InnerTextChanger(){
    console.log("I am here")
}

function ElementCreator(){
    xxx
}