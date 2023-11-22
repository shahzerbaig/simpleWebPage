import {calculateRoomData, rooms} from './business.mjs'
// Utility 
function makeHtmlElement(tagName){
    const element = document.createElement(tagName)
    return element;
}
// Render Logic 

function renderExterior(){
    const element = `<div id="exterior"><label for="carpetArea">Carpet Area <input type="number" name="carpetArea"> Sq Ft</label></div>`
    let div = document.createElement('div')
    div.id = "exterior"
    
    let label = document.createElement('label')
    label.setAttribute('for','carpetArea')
    label.textContent = 'Carpet Area'

    let input = document.createElement('input')
    input.setAttribute('type','number')
    input.setAttribute('name','carpetArea')
    label.appendChild(input)
    div.appendChild(label)

    return div
}


function setSessionRoom(roomData){
    if(!sessionStorage.getItem('rooms')){
        let tempData = []
        tempData.push(roomData)
        localStorage.setItem('rooms',JSON.stringify(tempData))
    }else{
        let tempStorage = localStorage.getItem('rooms')
        tempStorage = JSON.parse(tempStorage)
        
    }
}

window.proto = setSessionRoom()



// // Add New Room
// const addRoomsButton = document.getElementById('addRooms')
// addRoomsButton.addEventListener('click',function(event){
//     console.log(event);
// });


function submitForm(){

    console.log("Form Submitted");
}

//Checkboxs
const checkboxes1 = document.querySelectorAll('.checkboxgroup1');

        checkboxes1.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                checkboxes1.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
            });
        });
        const checkboxes2 = document.querySelectorAll('.checkboxgroup2');

        checkboxes2.forEach(checkbox => {
            checkbox.addEventListener('change', function(event) {
                checkboxes2.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                        renderSpace(event.target.id)
                    
                    }
                });
            });
        });


// Radio Buttons
let setState = new Set()

function refresh(){
        let rwalls = document.getElementsByClassName('walls')
        let allRadioButton = document.querySelectorAll('input[type="radio"]')
        allRadioButton.forEach(ele => ele.setAttribute('disabled','True'))
        let rwallA = rwalls.item(0)
        let rwallB = rwalls.item(1)
        let rwallC = rwalls.item(2)
        let rwallD = rwalls.item(3)

        let tempState = [rwallA.value,rwallB.value,rwallC.value,rwallD.value]
        tempState.forEach(function(element) {
            try {

            
                let radioButtons = element && document.querySelectorAll(`input[type="radio"].${element}`);

                radioButtons && radioButtons.forEach(function(ele) {
                    ele.removeAttribute('disabled');
                });
            } catch (error) {
                console.error("An error occurred:", error);
                // You can add more error handling or logging here if needed.
            }
        });
        
    }
    


// Form Submition

const form = document.getElementById('myform')

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    let form = document.getElementById('myform')
    console.log(form.name);
    let formObject = new FormData(form)
    formObject.forEach((i,j)=>{
        console.log(i,j);
    })
    let formObjectEntries = Array.from(formObject.entries())
    console.log(formObjectEntries);
    for (let [i,k] of formObjectEntries){
        console.log(i,k);
    }

    calculateRoomData(formObject)
})


// roomNavWrapper Functions 
let roomsArray = []
const addRoomElement = document.getElementById('addRoom')
const roomNavigationWrapper = document.getElementById('roomNavigationWrapper')
const addRoomNameBox = document.getElementById('addRoomNameBox')

function makeRoomTab(){
    let roomName = addRoomNameBox.value
    if(roomName == ''){
        throw new Error('No Room Name')
    } 
    rooms(roomName);


    let div = document.createElement('div')
    let selectButton = document.createElement('button')
    let deleteButton = document.createElement('button')
    selectButton.id = roomName;
    div.classList = 'border'
    selectButton.textContent = roomName;
    deleteButton.textContent = 'X'


    div.appendChild(selectButton)
    div.appendChild(deleteButton)
    addRoomNameBox.value = ''

    return div
}

addRoomElement.addEventListener('click',function(){
    roomNavigationWrapper.appendChild(makeRoomTab())
})



// Decision

function renderSpace(decision){
    let renderSpace = document.getElementById('render-space')
    while (renderSpace.firstChild) {
        renderSpace.removeChild(renderSpace.firstChild);
    }
    
    if(decision === "interior"){
        const p = document.createElement("p")
        p.innerHTML = "This is Interior"
        let interiorHTML = showSpace(decision)
        renderSpace.appendChild(interiorHTML)
        wallEventListener()
    }
    else{
        const exterior =  renderExterior()
        renderSpace.appendChild(exterior)
    }
}

// Structure
function makeInterior(){
    const interior = makeHtmlElement('fieldset')
    interior.className = "paint-form"
    interior.id = 'interior'
    interior.style.width = "fit-content"
    interior.style.height = "100%"
    interior.style.border = "2px solid black"

    const dimensions = makeHtmlElement('div')
    dimensions.id = 'dimensions'
    dimensions.classList.add('paint-form')
    const roomAtrributes = makeHtmlElement('div')
    roomAtrributes.id = 'room_atrributes'
    roomAtrributes.classList.add('paint-form')

    let width = makeInputBox("width","widthId","number");
    let height = makeInputBox("height","heightId","number");
    let length = makeInputBox("length","lengthId","number");
    let window = makeInputBox("window","windowId","number");
    let door = makeInputBox("door","doorId","number");
    let ceiling = makeInputBox("ceiling","ceilingId","checkbox")

    width.setAttribute('type','number');
    width.setAttribute('placeholder','width');
    length.setAttribute('type','number');
    length.setAttribute('placeholder','length');
    height.setAttribute('type','number');
    height.setAttribute('placeholder','height');
    window.setAttribute('type','number');
    window.setAttribute('placeholder','window');
    door.setAttribute('type','number');
    door.setAttribute('placeholder','door');
    dimensions.appendChild(width);
    dimensions.appendChild(length);
    dimensions.appendChild(height);
    roomAtrributes.appendChild(window);
    roomAtrributes.appendChild(door);
    roomAtrributes.appendChild(ceiling);

    interior.appendChild(dimensions)
    interior.appendChild(roomAtrributes)

    const walls = makeHtmlElement('div')
    walls.classList.add('walls_wrapper','paint-form')

    const wallName = ['wallA','wallB','wallC','wallD'];
    const wallDropDownArray = []

    wallName.forEach((wall)=>{
       const tempWall =  makeDropDown(wall,['paint','texture','wallpaper'])
       wallDropDownArray.push(tempWall)
    })
    
    wallDropDownArray.forEach(wallElement => {
        walls.appendChild(wallElement)
    })

    interior.appendChild(walls)
    
    // make Inout Box
    function makeInputBox(name,id,type){
        const label = document.createElement('label')
        label.id = id
        label.innerText = name
        label.className = "paint-form"
        label.setAttribute("name",name)
        const inputBox = document.createElement('input')
        inputBox.setAttribute("for",name)
        inputBox.setAttribute("type",type)
        inputBox.setAttribute("id",id)
        inputBox.setAttribute("name",name)
        inputBox.className = "paint-form"
        label.appendChild(inputBox)

        return label
    }
    // make Drop Down
    function makeDropDown(name,optionArray){
        const dropDown = makeHtmlElement('select');
        dropDown.id = name;
        dropDown.setAttribute('name',name);
        optionArray.unshift(name);
        optionArray.forEach(item =>{
            const option = makeHtmlElement('option');
            option.setAttribute('value',item);
            option.setAttribute('name',item);
            option.textContent = item;
            dropDown.appendChild(option);
        })

        return dropDown
    }

    function makeRadioGroup(name,optionArray){
        
    }
    return interior
}
function showSpace(decision){
    return makeInterior()
}



function wallEventListener(){
    
let wallA = document.getElementById('wallA')
let wallB = document.getElementById('wallB')
let wallC = document.getElementById('wallC')
let wallD = document.getElementById('wallD')

wallA.addEventListener('change',(event)=>{
    setState.add(event.target.value)
    refresh()
})

wallB.addEventListener('change',(event)=>{
    setState.add(event.target.value)
    refresh()
})

wallC.addEventListener('change',(event)=>{
    setState.add(event.target.value)
    refresh()
})

wallD.addEventListener('change',(event)=>{
    setState.add(event.target.value)
    refresh()
})

}