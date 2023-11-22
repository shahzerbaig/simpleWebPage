console.log("Containers Loaded");

const body = document.body



// Concrete 
function laborDaysEstimationBox(data){
    const container = makeHtmlElement('div');
    const laborInputContainer = makeHtmlElement('div')
    const rangeSlider = makeHtmlElement('input');
    const noOfDays = makeHtmlElement('input')
    rangeSlider.setAttribute('type','range');
    rangeSlider.setAttribute('min',2);
    rangeSlider.setAttribute('max',8);
    container.classList.add('laborDaysEstimationBox');
    
    laborInputContainer.appendChild(rangeSlider);
    laborInputContainer.appendChild(noOfDays);
    noOfDays.setAttribute('type','number');
    container.textContent = "Customize Labor";
    container.appendChild(laborInputContainer)

    container.classList.add('laborDaysEstimationBoxContainer')
    return container
}

    //Recomendation box for the paint -> HTMLElement(Image,Title,descripton,price) 
function makeRecommendationBox(title,imgSrc,desc,price){
    const recommendationBoxContainer = makeHtmlElement('div');
    const h4 = makeHtmlElement('h4');
    const img = makeHtmlElement('img');
    const p = makeHtmlElement('p');
    const pricing = makeHtmlElement('div')
    const inputBox = makeHtmlElement('input')

    h4.textContent = title;
    img.src = imgSrc;
    p.textContent = desc;

    pricing.textContent = 'MRP'
    inputBox.setAttribute('value',price)
    console.log("Input Type Number Inserted");
    
    pricing.appendChild(inputBox)

    recommendationBoxContainer.appendChild(img);
    recommendationBoxContainer.appendChild(h4);
    recommendationBoxContainer.appendChild(p);
    recommendationBoxContainer.appendChild(pricing);

    recommendationBoxContainer.classList.add("recommendationBoxContainer");
    
    // Change Value
    function changeValue(value){
        inputBox.setAttribute('value',price)
    };

    return recommendationBoxContainer;

}

    // Cost Label function -> name - Value
function makeCostLabel(labelName,value,idName){
    // declatations
    const box = makeHtmlElement('div')
    const label = makeHtmlElement('label')
    const inputBox = makeHtmlElement('span')
    const attributeValues = new Map()

    // Configurations
    box.classList.add('costBox')
    label.textContent = labelName;
    attributeValues.set("type","number");
    attributeValues.set("id",idName);
    attributeValues.set("placeholder", labelName);
    attributeValues.set('value',value);

    // execution
    attributeValues.forEach((value,key) => {
        inputBox.setAttribute(key,value)
    });
    inputBox.textContent = "र" + value
    label.appendChild(inputBox);
    box.appendChild(label);

    return box
}

    // Cost Box Generator -> 
function makeCostBox(dataObj){
    // Declaration
    const box = makeCostBox('div')
    dataObj.forEach()

}
const paintBox1 = makeRecommendationBox('Grasim Background',
                                        './Grasim.png',
                                        "This is a beautiful Image Background",
                                        200);

const laborDays = laborDaysEstimationBox();
const laborDays1 = laborDaysEstimationBox();
const costBox1 = makeCostLabel('Material Cost',200,'materialCost')



body.appendChild(laborDays);
body.appendChild(paintBox1);
body.appendChild(costBox1)