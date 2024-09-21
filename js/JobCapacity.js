let UpdateButton=document.getElementById('UpdateButton')
UpdateButton.addEventListener("click", Update) 

let CapacityArrayPriorty1=[]
let CapacityArrayPriorty2=[]
let CapacityArrayPriorty3=[]
let CapacityArray=[]

let Cook=0
let Craft=0
let Haul=0
let Clean=0
let Research=0
let Construct=0
let Grow=0
let Mine=0
let Plant=0
let Smith=0
let Tailor=0
let Warden=0
let Handle=0
let Hunt=0
let Art=0

SetInitial()
MaintainValue()

function SetInitial(){
    if (localStorage.getItem("CapacityArray") === null) {
        LocalStorageSetting()
        console.log("I was here")
      }
}

function GetValues(){
    Cook=Number(document.getElementById('Cook').value)
    Craft=Number(document.getElementById('Craft').value)
    Haul=Number(document.getElementById('Haul').value)
    Clean=Number(document.getElementById('Clean').value)
    Research=Number(document.getElementById('Research').value)
    Construct=Number(document.getElementById('Construct').value)
    Grow=Number(document.getElementById('Grow').value)
    Mine=Number(document.getElementById('Mine').value)
    Plant=Number(document.getElementById('Plant').value)
    Smith=Number(document.getElementById('Smith').value)
    Tailor=Number(document.getElementById('Tailor').value)
    Warden=Number(document.getElementById('Warden').value)
    Handle=Number(document.getElementById('Handle').value)
    Hunt=Number(document.getElementById('Hunt').value)
    Art=Number(document.getElementById('Art').value)
}

function CapacityArrayFunc(){
    CapacityArray[0]=Warden
    CapacityArray[1]=Handle
    CapacityArray[2]=Cook
    CapacityArray[3]=Hunt
    CapacityArray[4]=Construct
    CapacityArray[5]=Grow
    CapacityArray[6]=Mine
    CapacityArray[7]=Plant
    CapacityArray[8]=Smith
    CapacityArray[9]=Tailor
    CapacityArray[10]=Art
    CapacityArray[11]=Craft
    CapacityArray[12]=Haul
    CapacityArray[13]=Clean
    CapacityArray[14]=Research
}

function CapacityArrayPriorty1Func(){
    CapacityArrayPriorty1[0]=Cook
    CapacityArrayPriorty1[1]=Craft
    CapacityArrayPriorty1[2]=Haul
    CapacityArrayPriorty1[3]=Clean
    CapacityArrayPriorty1[4]=Research
}

function CapacityArrayPriorty2Func(){
    CapacityArrayPriorty2[0]=Construct
    CapacityArrayPriorty2[1]=Grow
    CapacityArrayPriorty2[2]=Mine
    CapacityArrayPriorty2[3]=Plant
    CapacityArrayPriorty2[4]=Smith
    CapacityArrayPriorty2[5]=Tailor
}

function CapacityArrayPriorty3Func(){
    CapacityArrayPriorty3[0]=Warden
    CapacityArrayPriorty3[1]=Handle
    CapacityArrayPriorty3[2]=Hunt
    CapacityArrayPriorty3[3]=Art
}

function Update(){
    GetValues()
    CapacityArrayFunc()
    CapacityArrayPriorty1Func()
    CapacityArrayPriorty2Func()
    CapacityArrayPriorty3Func()
    LocalStorageSetting()
}

function LocalStorageSetting(){
    let CapacityArrayJson=JSON.stringify(CapacityArray)
    localStorage.setItem("CapacityArray", CapacityArrayJson)
    let CapacityArrayPriorty1Json=JSON.stringify(CapacityArrayPriorty1)
    localStorage.setItem("CapacityArrayPriorty1", CapacityArrayPriorty1Json)
    let CapacityArrayPriorty2Json=JSON.stringify(CapacityArrayPriorty2)
    localStorage.setItem("CapacityArrayPriorty2", CapacityArrayPriorty2Json)
    let CapacityArrayPriorty3Json=JSON.stringify(CapacityArrayPriorty3)
    localStorage.setItem("CapacityArrayPriorty3", CapacityArrayPriorty3Json)
}

function LocalStorageGetting(){
    let UnstringfiedCapacityArray=localStorage.getItem("CapacityArray")
    CapacityArray=JSON.parse(UnstringfiedCapacityArray)
    let UnstringfiedCapacityArrayPriorty1=localStorage.getItem("CapacityArrayPriorty1")
    CapacityArrayPriorty1=JSON.parse(UnstringfiedCapacityArrayPriorty1)
    let UnstringfiedCapacityArrayPriorty2=localStorage.getItem("CapacityArrayPriorty2")
    CapacityArrayPriorty2=JSON.parse(UnstringfiedCapacityArrayPriorty2) 
    let UnstringfiedCapacityArrayPriorty3=localStorage.getItem("CapacityArrayPriorty3")
    CapacityArrayPriorty3=JSON.parse(UnstringfiedCapacityArrayPriorty3)   
}

function MaintainValue(){
    LocalStorageGetting()

    document.getElementById('Cook').value=CapacityArrayPriorty1[0]
    document.getElementById('Craft').value=CapacityArrayPriorty1[1]
    document.getElementById('Haul').value=CapacityArrayPriorty1[2]
    document.getElementById('Clean').value=CapacityArrayPriorty1[3]
    document.getElementById('Research').value=CapacityArrayPriorty1[4]

    document.getElementById('Construct').value=CapacityArrayPriorty2[0]
    document.getElementById('Grow').value=CapacityArrayPriorty2[1]  
    document.getElementById('Mine').value=CapacityArrayPriorty2[2]
    document.getElementById('Plant').value=CapacityArrayPriorty2[3]
    document.getElementById('Smith').value=CapacityArrayPriorty2[4]
    document.getElementById('Tailor').value=CapacityArrayPriorty2[5]

    document.getElementById('Warden').value=CapacityArrayPriorty3[0]
    document.getElementById('Handle').value=CapacityArrayPriorty3[1]
    document.getElementById('Hunt').value=CapacityArrayPriorty3[2]
    document.getElementById('Art').value=CapacityArrayPriorty3[3]
}