//Get Element
let UpdateButtonSkill=document.getElementById('UpdateButtonSkills')
let UpdateButtonPawns=document.getElementById('UpdateButtonPawns')

const ListBody=document.querySelectorAll(".listbody")
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
BestNameListofSkills=BestNameList(SkillGradesOrdered,NameOfPawn,0,NumberOfSkills,NumberOfBestPawnOfSkills,0,1)
//console.log(BestNameListofSkills)
//console.log("BestNameListofSkills")
//Finding Name of Best Pawns of Skills

//Finding Skills Names of Best Skills of Pawns
BestSkillListofPawns=BestNameList(PawnsSkillGradesOrdered,SkillList,0,Object.keys(NameOfPawn).length,NumberOfBestSkillsOfPawns,0,1)
//console.log(BestSkillListofPawns)
//console.log("BestSkillListofPawns")
//Finding Skills Names of Best Skills of Pawns

//Finding Skills Names of Best Skills of Pawns
SkillLevelList=BestNameList(PawnsSkillGradesOrdered,SkillsOfPawns,SkillGradesOrdered,NumberOfSkills,Object.keys(NameOfPawn).length,NumberOfBestSkillsOfPawns,2)
//console.log(SkillLevelList)
//console.log("SkillLevelList")
//Finding Skills Names of Best Skills of Pawns

//Event Listeners
UpdateButtonSkill.addEventListener("click",ElementCreator(1))
UpdateButtonPawns.addEventListener("click",ElementCreator(2))
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

function BestNameList(ObjectGiven3,ObjectGiven4,ObjectGiven5,Cycle3,Cycle4,Cycle5,Mode){
    let BestNameListObject={}
    let CurrentNamesArray=[]
    let OutputNameArray=[]
    let BestSkillListObject={}
    let CurrentSkillsArray=[]
    let OutputSkillArray=[]
    let CurrentSkillOfPawnArray=[]
    let HoldingIndex=0
    let HoldingIndexOfPawn=0
    let CurrentPawnIndex=[]
    for(let x=0;x<Cycle3;x++){
        if(Mode==1){
            CurrentNamesArray=ObjectGiven3[x]
            for(let a=0;a<Cycle4;a++){
                OutputNameArray[a]=ObjectGiven4[CurrentNamesArray[a]]
            }
        }

        if(Mode==2){
            CurrentPawnIndex=ObjectGiven5[x]
                //console.log(CurrentPawnIndex)
                //console.log("CurrentPawnIndex")
            for(let a=0;a<Cycle4;a++){
                HoldingIndexOfPawn=CurrentPawnIndex[a]
                    //console.log(HoldingIndexOfPawn)
                    //console.log("HoldingIndexOfPawn")
                CurrentSkillArray=ObjectGiven3[HoldingIndexOfPawn]
                    //console.log(CurrentSkillArray)
                    //console.log("CurrentSkillArray")
                CurrentSkillOfPawnArray=ObjectGiven4[a]
                    console.log(CurrentSkillOfPawnArray)
                    console.log("CurrentSkillOfPawnArray")
                for(let b=0;b<Cycle5;b++){
                    HoldingIndex=CurrentSkillArray[b]
                        console.log(HoldingIndex)
                        console.log("HoldingIndex")
                    OutputSkillArray[b]=CurrentSkillOfPawnArray[HoldingIndex]
                        console.log(OutputSkillArray)
                        console.log("OutputSkillArray")
                }
                
               
            }
            BestSkillListObject[x]=OutputSkillArray
                console.log(BestSkillListObject)
                console.log("BestSkillListObject")
        }


        BestNameListObject[x]=OutputNameArray
        OutputNameArray=[]
        
        OutputSkillArray=[]
        CurrentSkillOfPawnArray=[]
        HoldingIndex=0
    }
    
    if(Mode==1){
        return BestNameListObject
    }
    else if(Mode==2){
        return BestSkillListObject
    }
}

function ElementCreator(Mode){
    if(Mode==1){
            let InternalName=""
            let InternalLevel=0
        if(Object.keys(BestNameListofSkills).length>0){

            let LiList=document.querySelectorAll('.a')

            for(var x=0;x<LiList.length;x++){
                LiList[x].remove(LiList.firstChild)
                //console.log("I was here")
                }

            for(let i=0;i<NumberOfSkills;i++){
                InternalName=BestNameListofSkills[i]
                InternalLevel=SkillLevelList[i]

                //console.log(InternalName)
                //console.log(InternalLevel)

                for(let a=0;a<NumberOfBestPawnOfSkills;a++){
                    let Li= document.createElement('li')
                    Li.classList.add('list-group-item')
                    Li.classList.add('d-flex')
                    Li.classList.add('justify-content-between')
                    Li.classList.add('align-items-start')
                    Li.classList.add('a')
                    //console.log(ListBody)
                    ListBody[i].append(Li)

                    let UpperDiv= document.createElement('div')
                    UpperDiv.classList.add('ms-2')
                    UpperDiv.classList.add('me-auto')
                    Li.append(UpperDiv)

                    let InnerDiv= document.createElement('div')
                    InnerDiv.classList.add('fw-bold')
                    UpperDiv.append(InnerDiv)

                    let Span= document.createElement('span')
                    Span.innerHTML = `${InternalName[a]}`
                    InnerDiv.append(Span)

                    let SpanButton= document.createElement('span')
                    SpanButton.classList.add('badge')
                    SpanButton.classList.add('bg-success')
                    SpanButton.classList.add('rounded-pill')
                    //SpanButton.classList.add('btn')
                    //SpanButton.classList.add('btn-outline-danger')
                    //SpanButton.classList.add('btn-sm')
                    //SpanButton.setAttribute('id',i)
                    SpanButton.innerHTML = `${InternalLevel[a]}`
                    Li.append(SpanButton)
                }
            }

        }
    }
    else if(Mode==2){

    }
}