let PawnName=document.getElementById("Naming")


let Shooting=document.getElementById("Sho")
let ShootingRadio1=document.getElementById("inlineRadio1")
let ShootingRadio2=document.getElementById("inlineRadio2")
let ShootingRadio3=document.getElementById("inlineRadio3")

let Melee=document.getElementById("Mel")
let MeleeRadio1=document.getElementById("inlineRadio4")
let MeleeRadio2=document.getElementById("inlineRadio5")
let MeleeRadio3=document.getElementById("inlineRadio6")

let Construction=document.getElementById("Con")
let ConstructionRadio1=document.getElementById("inlineRadio7")
let ConstructionRadio2=document.getElementById("inlineRadio8")
let ConstructionRadio3=document.getElementById("inlineRadio9")

let Mining=document.getElementById("Min")
let MiningRadio1=document.getElementById("inlineRadio10")
let MiningRadio2=document.getElementById("inlineRadio11")
let MiningRadio3=document.getElementById("inlineRadio12")

let Cooking=document.getElementById("Coo")
let CookingRadio1=document.getElementById("inlineRadio13")
let CookingRadio2=document.getElementById("inlineRadio14")
let CookingRadio3=document.getElementById("inlineRadio15")

let Plants=document.getElementById("Pla")
let PlantsRadio1=document.getElementById("inlineRadio16")
let PlantsRadio2=document.getElementById("inlineRadio17")
let PlantsRadio3=document.getElementById("inlineRadio18")

let Animals=document.getElementById("Ani")
let AnimalsRadio1=document.getElementById("inlineRadio19")
let AnimalsRadio2=document.getElementById("inlineRadio20")
let AnimalsRadio3=document.getElementById("inlineRadio21")

let Crafting=document.getElementById("Cra")
let CraftingRadio1=document.getElementById("inlineRadio22")
let CraftingRadio2=document.getElementById("inlineRadio23")
let CraftingRadio3=document.getElementById("inlineRadio24")

let Artistic=document.getElementById("Art")
let ArtisticRadio1=document.getElementById("inlineRadio25")
let ArtisticRadio2=document.getElementById("inlineRadio26")
let ArtisticRadio3=document.getElementById("inlineRadio27")

let Medical=document.getElementById("Med")
let MedicalRadio1=document.getElementById("inlineRadio28")
let MedicalRadio2=document.getElementById("inlineRadio29")
let MedicalRadio3=document.getElementById("inlineRadio30")

let Social=document.getElementById("Soc")
let SocialRadio1=document.getElementById("inlineRadio31")
let SocialRadio2=document.getElementById("inlineRadio32")
let SocialRadio3=document.getElementById("inlineRadio33")

let Intellectual=document.getElementById("Int")
let IntellectualRadio1=document.getElementById("inlineRadio34")
let IntellectualRadio2=document.getElementById("inlineRadio35")
let IntellectualRadio3=document.getElementById("inlineRadio36")

const ListBody=document.getElementById("listbody")
//const buttonsDOM=document.querySelectorAll('.btn-sm')

// Global Variables
{
    
}
let NameOfPawn={"0": "Enter a Pawn"}
let SkillsOfPawns={"0": ["1","1","1","1","1","1","1","1","1","1","1","1"]}
let FlamesOfPawns={"0": [0,0,0,0,0,0,0,0,0,0,0,0]}
let PawnIndex=0
let indexFlag=0
let LocalStorageVeryInitial=localStorage.getItem("Initialization")
// Global Variables

//Pawn Update at initial

if(LocalStorageVeryInitial==0){
    
LocalStorageSetting()
localStorage.setItem("Initialization", 1)
console.log("I was here initial")
}

LocalStorageGetting()

PawnUpdate()

//Pawn Update at initial

//Click based actions

let submitting=document.getElementById("Adding")
submitting.addEventListener("click", PawnInfo)

//Click based actions

//X button listeners
/*
const buttonsDOM=document.querySelectorAll('.btn-sm')
for(var j=0;j<buttonsDOM.length;j++){
    buttonsDOM[j].addEventListener('click', DeletePawnInfo)
  }
*/

//X button listeners


//Functions

function PawnInfo() {
    

        LocalStorageGetting()

    //console.log(PawnName.value)

    if(PawnName.value>-1){
        alert("Enter a Pawn Name")
        return
    }

    NameOfPawn[PawnIndex]=PawnName.value
    console.log(NameOfPawn)

    SkillsOfPawns[PawnIndex]=SkillArray()
    console.log(SkillsOfPawns)

    FlamesOfPawns[PawnIndex]=FlamesArray()
    console.log(FlamesOfPawns)

    if(indexFlag==0){
        PawnIndex=PawnIndex+1    
    }
    
    //console.log("I was here")

    indexFlag=0

    PawnUpdate()

    LocalStorageSetting()
}

function SkillArray(){
    //console.log(Shooting.value)
    //console.log(parseInt(Shooting.value))
    let SkillsOfPerson=[]
    //let internalflag=0 //to prevent increasing pawnindex when an 

    if(Shooting.value>-1 && Shooting.value!=""){
        SkillsOfPerson[0]=Number(Shooting.value)
        //console.log(Shooting.value)
    }
    else if(Shooting.value=="x"){
        SkillsOfPerson[0]="None"
    }
    else{
        alert("Enter a value to Shooting")
        //PawnIndex=PawnIndex-1  //to prevent pawnindex goes up when there is invalid input
        indexFlag=indexFlag+1
        return
    }

    if(Melee.value>-1 && Melee.value!=""){
        SkillsOfPerson[1]=Number(Melee.value)
        //console.log(Melee.value)
    }
    else if(Melee.value=="x"){
        SkillsOfPerson[1]="None"
    }
    else{
        alert("Enter a value to Melee")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Construction.value>-1 && Construction.value!=""){
        SkillsOfPerson[2]=Number(Construction.value)
        //console.log(Construction.value)
    }
    else if(Construction.value=="x"){
        SkillsOfPerson[2]="None"
    }
    else{
        alert("Enter a value to Construction")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Mining.value>-1 && Mining.value!=""){
        SkillsOfPerson[3]=Number(Mining.value)
        //console.log(Mining.value)
    }
    else if(Mining.value=="x"){
        SkillsOfPerson[3]="None"
    }
    else{
        alert("Enter a value to Mining")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Cooking.value>-1 && Cooking.value!=""){
        SkillsOfPerson[4]=Number(Cooking.value)
        //console.log(Cooking.value)
    }
    else if(Cooking.value=="x"){
        SkillsOfPerson[4]="None"
    }
    else{
        alert("Enter a value to Cooking")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Plants.value>-1 && Plants.value!=""){
        SkillsOfPerson[5]=Number(Plants.value)
        //console.log(Plants.value)
    }
    else if(Plants.value=="x"){
        SkillsOfPerson[5]="None"
    }
    else{
        alert("Enter a value to Plants")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Animals.value>-1 && Animals.value!=""){
        SkillsOfPerson[6]=Number(Animals.value)
        //console.log(Animals.value)
    }
    else if(Animals.value=="x"){
        SkillsOfPerson[6]="None"
    }
    else{
        alert("Enter a value to Animals")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Crafting.value>-1 && Crafting.value!=""){
        SkillsOfPerson[7]=Number(Crafting.value)
        //console.log(Crafting.value)
    }
    else if(Crafting.value=="x"){
        SkillsOfPerson[7]="None"
    }
    else{
        alert("Enter a value to Crafting")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Artistic.value>-1 && Artistic.value!=""){
        SkillsOfPerson[8]=Number(Artistic.value)
        //console.log(Artistic.value)
    }
    else if(Artistic.value=="x"){
        SkillsOfPerson[8]="None"
    }
    else{
        alert("Enter a value to Artistic")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Medical.value>-1 && Medical.value!=""){
        SkillsOfPerson[9]=Number(Medical.value)
        //console.log(Medical.value)
    }
    else if(Medical.value=="x"){
        SkillsOfPerson[9]="None"
    }
    else{
        alert("Enter a value to Medical")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Social.value>-1 && Social.value!=""){
        SkillsOfPerson[10]=Number(Social.value)
        //console.log(Social.value)
    }
    else if(Social.value=="x"){
        SkillsOfPerson[10]="None"
    }
    else{
        alert("Enter a value to Social")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    if(Intellectual.value>-1 && Intellectual.value!=""){
        SkillsOfPerson[11]=Number(Intellectual.value)
        //console.log(Intellectual.value)
    }
    else if(Intellectual.value=="x"){
        SkillsOfPerson[11]="None"
    }
    else{
        alert("Enter a value to Intellectual")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    //console.log(SkillsOfPerson)

    return SkillsOfPerson

}

function FlamesArray(){

    let Flames=[0,0,0,0,0,0,0,0,0,0,0,0]

    if(ShootingRadio1.checked==false && ShootingRadio2.checked==false && ShootingRadio3.checked==false){
        alert("Select a flame for Shooting")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(ShootingRadio2.checked==true){
        Flames[0]=1
    }

    else if(ShootingRadio3.checked==true){
        Flames[0]=2
    }

    if(MeleeRadio1.checked==false && MeleeRadio2.checked==false && MeleeRadio3.checked==false){
        alert("Select a flame for Melee")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(MeleeRadio2.checked==true){
        Flames[1]=1
    }

    else if(MeleeRadio3.checked==true){
        Flames[1]=2
    }

    if(ConstructionRadio1.checked==false && ConstructionRadio2.checked==false && ConstructionRadio3.checked==false){
        alert("Select a flame for Construction")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(ConstructionRadio2.checked==true){
        Flames[2]=1
    }

    else if(ConstructionRadio3.checked==true){
        Flames[2]=2
    }

    if(MiningRadio1.checked==false && MiningRadio2.checked==false && MiningRadio3.checked==false){
        alert("Select a flame for Mining")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(MiningRadio2.checked==true){
        Flames[3]=1
    }

    else if(MiningRadio3.checked==true){
        Flames[3]=2
    }

    if(CookingRadio1.checked==false && CookingRadio2.checked==false && CookingRadio3.checked==false){
        alert("Select a flame for Cooking")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(CookingRadio2.checked==true){
        Flames[4]=1
    }

    else if(CookingRadio3.checked==true){
        Flames[4]=2
    }

    if(PlantsRadio1.checked==false && PlantsRadio2.checked==false && PlantsRadio3.checked==false){
        alert("Select a flame for Plants")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(PlantsRadio2.checked==true){
        Flames[5]=1
    }

    else if(PlantsRadio3.checked==true){
        Flames[5]=2
    }

    if(AnimalsRadio1.checked==false && AnimalsRadio2.checked==false && AnimalsRadio3.checked==false){
        alert("Select a flame for Animals")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(AnimalsRadio2.checked==true){
        Flames[6]=1
    }

    else if(AnimalsRadio3.checked==true){
        Flames[6]=2
    }

    if(CraftingRadio1.checked==false && CraftingRadio2.checked==false && CraftingRadio3.checked==false){
        alert("Select a flame for Crafting")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(CraftingRadio2.checked==true){
        Flames[7]=1
    }

    else if(CraftingRadio3.checked==true){
        Flames[7]=2
    }

    if(ArtisticRadio1.checked==false && ArtisticRadio2.checked==false && ArtisticRadio3.checked==false){
        alert("Select a flame for Artistic")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(ArtisticRadio2.checked==true){
        Flames[8]=1
    }

    else if(ArtisticRadio3.checked==true){
        Flames[8]=2
    }

    if(MedicalRadio1.checked==false && MedicalRadio2.checked==false && MedicalRadio3.checked==false){
        alert("Select a flame for Medical")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(MedicalRadio2.checked==true){
        Flames[9]=1
    }

    else if(MedicalRadio3.checked==true){
        Flames[9]=2
    }

    if(SocialRadio1.checked==false && SocialRadio2.checked==false && SocialRadio3.checked==false){
        alert("Select a flame for Social")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(SocialRadio2.checked==true){
        Flames[10]=1
    }

    else if(SocialRadio3.checked==true){
        Flames[10]=2
    }

    if(IntellectualRadio1.checked==false && IntellectualRadio2.checked==false && IntellectualRadio3.checked==false){
        alert("Select a flame for Intellectual")
        //PawnIndex=PawnIndex-1
        indexFlag=indexFlag+1
        return
    }

    else if(IntellectualRadio2.checked==true){
        Flames[11]=1
    }

    else if(IntellectualRadio3.checked==true){
        Flames[11]=2
    }

    return Flames
}

function PawnUpdate(){
    let InternalName=""
    if(Object.keys(NameOfPawn).length>0){

        let LiList=document.querySelectorAll('.a')

        for(var x=0;x<LiList.length;x++){
            LiList[x].remove(LiList.firstChild)
            //console.log("I was here")
            }

        for(let i=0;i<Object.keys(NameOfPawn).length;i++){
            InternalName=NameOfPawn[i]
            //console.log(InternalName)

            let Li= document.createElement('li')
            Li.classList.add('list-group-item')
            Li.classList.add('d-flex')
            Li.classList.add('justify-content-between')
            Li.classList.add('align-items-start')
            Li.classList.add('a')
            ListBody.append(Li)

            let UpperDiv= document.createElement('div')
            UpperDiv.classList.add('ms-2')
            UpperDiv.classList.add('me-auto')
            Li.append(UpperDiv)

            let InnerDiv= document.createElement('div')
            InnerDiv.classList.add('fw-bold')
            UpperDiv.append(InnerDiv)

            let Span= document.createElement('span')
            Span.innerHTML = `${InternalName}`
            InnerDiv.append(Span)

            let SpanButton= document.createElement('span')
            SpanButton.classList.add('badge')
            SpanButton.classList.add('bg-danger')
            SpanButton.classList.add('rounded-pill')
            SpanButton.classList.add('btn')
            SpanButton.classList.add('btn-outline-danger')
            SpanButton.classList.add('btn-sm')
            SpanButton.setAttribute('id',i)
            SpanButton.innerHTML = `X`
            Li.append(SpanButton)
        }
        const buttonsDOM=document.querySelectorAll('.btn-sm')
        for(var j=0;j<buttonsDOM.length;j++){
            buttonsDOM[j].addEventListener('click', DeletePawnInfo)
        } 
        
    }
    else{
        return
    }
}

function LocalStorageSetting(){
    let NameOfPawnJson=JSON.stringify(NameOfPawn)
    localStorage.setItem("NameOfPawn", NameOfPawnJson)
    let SkillsOfPawnsJson=JSON.stringify(SkillsOfPawns)
    localStorage.setItem("SkillsOfPawns", SkillsOfPawnsJson)
    let FlamesOfPawnsJson=JSON.stringify(FlamesOfPawns)
    localStorage.setItem("FlamesOfPawns", FlamesOfPawnsJson)
    let PawnIndexJson=JSON.stringify(PawnIndex)
    localStorage.setItem("PawnIndex", PawnIndexJson)
}

function LocalStorageGetting(){
    let UnstringfiedNameOfPawn=localStorage.getItem("NameOfPawn")
    NameOfPawn=JSON.parse(UnstringfiedNameOfPawn)
    let UnstringfiedSkillsOfPawns=localStorage.getItem("SkillsOfPawns")
    SkillsOfPawns=JSON.parse(UnstringfiedSkillsOfPawns)
    let UnstringfiedFlamesOfPawns=localStorage.getItem("FlamesOfPawns")
    FlamesOfPawns=JSON.parse(UnstringfiedFlamesOfPawns)
    let UnstringfiedPawnIndex=localStorage.getItem("PawnIndex")
    PawnIndex=JSON.parse(UnstringfiedPawnIndex)
}

function DeletePawnInfo(e){
    LocalStorageGetting()
    let DeletedIndex=e.target.id
    let c=0
    for(c<DeletedIndex;c<Object.keys(NameOfPawn).length;c++){
        NameOfPawn[c]=NameOfPawn[c+1]
        SkillsOfPawns[c]=SkillsOfPawns[c+1]
        FlamesOfPawns[c]=FlamesOfPawns[c+1]
    }
    delete NameOfPawn[Object.keys(NameOfPawn).length-1]
    delete SkillsOfPawns[Object.keys(SkillsOfPawns).length-1]
    delete FlamesOfPawns[Object.keys(FlamesOfPawns).length-1]
    PawnIndex=PawnIndex-1
    PawnUpdate()
    LocalStorageSetting()
}