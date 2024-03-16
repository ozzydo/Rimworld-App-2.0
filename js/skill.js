//Get Element
let UpdateButtonSkill=document.getElementById('UpdateButtonSkills')
let UpdateButtonPawns=document.getElementById('UpdateButtonPawns')

const ListBody=document.querySelectorAll(".listbody")

let TopRow=document.getElementById('toprow')
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
let NumberOfBestPawnOfSkills=5
let BestSkillListofPawns={}
let NumberOfBestSkillsOfPawns=5
let SkillLevelList={"0":[0],"1":[0],"2":[0],"3":[0],"4":[0],"5":[0],"6":[0],"7":[0],"8":[0],"9":[0],"10":[0],"11":[0],}
let FlameLevelList={"0":[0],"1":[0],"2":[0],"3":[0],"4":[0],"5":[0],"6":[0],"7":[0],"8":[0],"9":[0],"10":[0],"11":[0],}
let IndexOfBestSkillOfPawns={}
let SkillLevelListOfPawns1={}
let FlameLevelListOfPawns1={}
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
console.log(PawnsSkillGradesOrdered)
console.log("PawnsSkillGradesOrdered")
//Ordering Grades of Pawn's Skills

//Finding Name of Best Pawns of Skills
BestNameListofSkills=BestNameList(SkillGradesOrdered,NameOfPawn,NumberOfSkills,NumberOfBestPawnOfSkills,1)
console.log(BestNameListofSkills)
console.log("BestNameListofSkills")
//Finding Name of Best Pawns of Skills

//Finding Skills Names of Best Skills of Pawns
BestSkillListofPawns=BestNameList(PawnsSkillGradesOrdered,SkillList,Object.keys(NameOfPawn).length,NumberOfBestSkillsOfPawns,1)
console.log(BestSkillListofPawns)
console.log("BestSkillListofPawns")
//Finding Skills Names of Best Skills of Pawns

//Finding Skills Names of Best Skills of Pawns
//SkillLevelList=BestNameList(PawnsSkillGradesOrdered,SkillList,Object.keys(NameOfPawn).length,NumberOfBestSkillsOfPawns,2)
SkillLevelGetter()
console.log(SkillLevelList)
console.log("SkillLevelList")
//Finding Skills Names of Best Skills of Pawns

//Finding Flame Levels of Best Skills of Pawns
FlameLevelGetter()
console.log(FlameLevelList)
console.log("FlameLevelList")
//Finding Flame Levels of Best Skills of Pawns

//Finding Index of Best Skills of Pawns
IndexOfBestSkillOfPawns=GetIndexOfBestSkillOfPawns()
console.log(IndexOfBestSkillOfPawns)
console.log("IndexOfBestSkillOfPawns")
//Finding Index of Best Skills of Pawns

GetLevelOfSkillsOfPawns()

GetLevelOfFlamesOfPawns()

//Event Listeners
UpdateButtonSkill.addEventListener("click",ElementCreator())
UpdateButtonPawns.addEventListener("click",CardCreator())
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

function ElementCreator(){
  
            let InternalName=""
            let InternalLevel=0
            let InternalFlameLevel=0
        if(Object.keys(BestNameListofSkills).length>0){

            let LiList=document.querySelectorAll('.a')

            for(var x=0;x<LiList.length;x++){
                LiList[x].remove(LiList.firstChild)
                //console.log("I was here")
                }

            for(let i=0;i<NumberOfSkills;i++){
                InternalName=BestNameListofSkills[i]
                    //console.log(InternalName)
                InternalLevel=SkillLevelList[i]
                InternalFlameLevel=FlameLevelList[i]


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
                    SpanButton.classList.add('bg-secondary')
                    SpanButton.classList.add('rounded-pill')
                    //SpanButton.classList.add('btn')
                    //SpanButton.classList.add('btn-outline-danger')
                    //SpanButton.classList.add('btn-sm')
                    //SpanButton.setAttribute('id',i)
                    SpanButton.innerHTML = `${InternalLevel[a]}`                 
                    Li.append(SpanButton)

                    if(InternalFlameLevel[a]>0){
                        let FlameImg=document.createElement('img')
                        if(InternalFlameLevel[a]==1){
                            FlameImg.setAttribute('src','/Images/fire.png')             
                        }
                        if(InternalFlameLevel[a]==2){
                            FlameImg.setAttribute('src','/Images/doublefire.png')
                        }
                        FlameImg.setAttribute('width','16rem')
                        FlameImg.classList.add('mb-1')
                        FlameImg.classList.add('ms-1')
                        SpanButton.append(FlameImg)
                    }
                }
            }

        }
}

function SkillLevelGetter(){
    let MiddleArray=[]
    for(let a=0;a<NumberOfSkills;a++){
        //console.log(a)
        for(let b=0;b<NumberOfBestPawnOfSkills;b++){
            MiddleArray[b]=SkillsOfPawns[SkillGradesOrdered[a][b]][a]   
        }
        SkillLevelList[a]=MiddleArray
        //console.log(SkillLevelList)
        MiddleArray=[]
    }
}

function FlameLevelGetter(){
    let MiddleArray=[]
    for(let a=0;a<NumberOfSkills;a++){
        //console.log(a)
        for(let b=0;b<NumberOfBestSkillsOfPawns;b++){
            MiddleArray[b]=FlamesOfPawns[SkillGradesOrdered[a][b]][a]   
        }
        FlameLevelList[a]=MiddleArray
        //console.log(SkillLevelList)
        MiddleArray=[]
    }
}

function CardCreator(){
    let InternalSkill=""
    let InternalLevel=0
    let InternalFlameLevel=0

    if(Object.keys(BestSkillListofPawns).length>0){
    
        let Div=document.querySelectorAll('.Remove')
    
        for(var x=0;x<Div.length;x++){
            Div[x].remove(Div.firstChild)
            console.log("I was here")
            }
    
 
                InternalSkill=BestSkillListofPawns[x]
                //InternalLevel=SkillLevelListOfPawns1[x]
                //InternalFlameLevel=FlameLevelList[x]

            
    
                for(let a=0;a<Object.keys(NameOfPawn).length;a++){
                    
                    InternalSkill=BestSkillListofPawns[a]
                    InternalLevel=SkillLevelListOfPawns1[a]
                    InternalFlameLevel=FlameLevelListOfPawns1[a]

                    let UpperDiv1=document.createElement('div')
                    UpperDiv1.classList.add('col-3')
                    UpperDiv1.classList.add('mb-2')
                    UpperDiv1.classList.add('Remove')
                    TopRow.append(UpperDiv1)

                    let Card=document.createElement('div')
                    Card.classList.add('card')
                    UpperDiv1.append(Card)

                    let CardBody=document.createElement('div')
                    CardBody.classList.add('card-body')
                    Card.append(CardBody)

                    let CardTitle=document.createElement('h5')
                    CardTitle.classList.add('card-title')
                    CardTitle.innerHTML = `${NameOfPawn[a]}`
                    CardBody.append(CardTitle)

                    let CardSubtitle=document.createElement('p')
                    CardSubtitle.classList.add('card-subtitle')
                    CardSubtitle.classList.add('mb-2')
                    CardSubtitle.classList.add('text-body-secondary')
                    CardSubtitle.innerHTML = "Best Skills"
                    CardBody.append(CardSubtitle)

                    let LiGroup=document.createElement('ol')
                    LiGroup.classList.add('list-group')
                    LiGroup.classList.add('list-group-numbered')
                    CardBody.append(LiGroup)

                    for(let c=0;c<NumberOfBestSkillsOfPawns;c++){
                        let Li= document.createElement('li')
                        Li.classList.add('list-group-item')
                        Li.classList.add('d-flex')
                        Li.classList.add('justify-content-between')
                        Li.classList.add('align-items-start')
                        Li.classList.add('a')
                        LiGroup.append(Li)

                        let UpperDiv= document.createElement('div')
                        UpperDiv.classList.add('ms-2')
                        UpperDiv.classList.add('me-auto')
                        Li.append(UpperDiv)

                        let InnerDiv= document.createElement('div')
                        InnerDiv.classList.add('fw-bold')
                        UpperDiv.append(InnerDiv)

                        let Span= document.createElement('span')
                        Span.innerHTML = `${InternalSkill[c]}`
                        InnerDiv.append(Span)

                        let SpanButton= document.createElement('span')
                        SpanButton.classList.add('badge')
                        SpanButton.classList.add('bg-dark')
                        SpanButton.classList.add('rounded-pill')
                        //SpanButton.classList.add('btn')
                        //SpanButton.classList.add('btn-outline-danger')
                        //SpanButton.classList.add('btn-sm')
                        //SpanButton.setAttribute('id',i)
                        SpanButton.innerHTML = `${InternalLevel[c]}`                 
                        Li.append(SpanButton)

                        if(InternalFlameLevel[c]>0){
                            let FlameImg=document.createElement('img')
                            if(InternalFlameLevel[c]==1){
                                FlameImg.setAttribute('src','/Images/fire.png')             
                            }
                            if(InternalFlameLevel[c]==2){
                                FlameImg.setAttribute('src','/Images/doublefire.png')
                            }
                            FlameImg.setAttribute('width','16rem')
                            FlameImg.classList.add('mb-1')
                            FlameImg.classList.add('ms-1')
                            SpanButton.append(FlameImg)
                        }
                    }
                }    
            
    }
}

function GetIndexOfBestSkillOfPawns(){
    let ListOfPawn=[]
    let OutputArray=[]
    let OutputObject={}
    let SkillOfPawn=''

    for(let x=0;x<Object.keys(NameOfPawn).length;x++){
        for(let a=0;a<NumberOfBestSkillsOfPawns;a++){
            SkillOfPawn=BestSkillListofPawns[x][a]
            //console.log(SkillOfPawn)
            //console.log("SkillOfPawn")
            for(let b=0;b<NumberOfSkills;b++){
                if(SkillOfPawn===SkillList[b]){
                    //console.log(SkillList[b])
                    //console.log("SkillList[b]")
                    OutputArray[a]=b
                    //console.log(OutputArray[a])
                    //console.log("OutputArray[a]")
                    //console.log(OutputArray)
                    //console.log("OutputArray")
                }
            }
            OutputObject[x]=OutputArray          
        }
        OutputArray=[]
    }
    return OutputObject
}
//Object.keys(NameOfPawn).length
function GetLevelOfSkillsOfPawns(){
    let MiddleArray=[]
    for(let a=0;a<Object.keys(NameOfPawn).length;a++){
        //console.log(a)
        for(let b=0;b<NumberOfBestSkillsOfPawns;b++){
            MiddleArray[b]=SkillsOfPawns[a][IndexOfBestSkillOfPawns[a][b]]   
        }
        SkillLevelListOfPawns1[a]=MiddleArray
        //console.log(SkillLevelList)
        MiddleArray=[]
    }
}

function GetLevelOfFlamesOfPawns(){
    let MiddleArray=[]
    for(let a=0;a<Object.keys(NameOfPawn).length;a++){
        //console.log(a)
        for(let b=0;b<NumberOfBestSkillsOfPawns;b++){
            MiddleArray[b]=FlamesOfPawns[a][IndexOfBestSkillOfPawns[a][b]]   
        }
        FlameLevelListOfPawns1[a]=MiddleArray
        //console.log(SkillLevelList)
        MiddleArray=[]
    }
}