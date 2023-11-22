console.log("Welcome to Business Logic")

import { storageClass} from "./storage.js";
// utility 


const storageInstance = new storageClass('myStorage')

// Interface to interact with rooms Storage
export function rooms(roomName){
    const room = {
        name : roomName,
        planningFor:"",
        space:"",
        width:"",
        height:"",
        length:"",
        walls:[{wallName:"",type:"",product:""}]
    }
    storageInstance.addRoom(room)

}





export function formDataToObject(formData) {
  const object = {};
  formData.forEach((value, key) => {
    if (object.hasOwnProperty(key)) {
      if (!Array.isArray(object[key])) {
        object[key] = [object[key]];
      }
      object[key].push(value);
    } else {
      object[key] = value;
    }
  });
  return object;
}

export function calculateRoomData(data) {
    // Extract the data from the FormData object
    const formData = Object.fromEntries(data);

    // Define cost values for options
    const planingForCost = Number(formData.planingFor);
    const spaceCost = Number(formData.space);
    const ceilingCost = formData.ceiling === 'True' ? (Number(formData.width) * Number(formData.height) )  * Number(formData.paint) : 0; // Assuming a cost of 10 for the ceiling.
    //const doorCost = formData.door ? (Number(formData.door))

    // Initialize variables to store the total cost for each wall
    let totalCostA = 0;
    let totalCostB = 0;
    let totalCostC = 0;
    let totalCostD = 0;

    // Calculate costs for each wall based on the selected option
    if (formData.WallA === 'paint') {
        totalCostA += Number(formData.paint);
    } else if (formData.WallA === 'texture') {
        totalCostA += Number(formData.texture);
    } else if (formData.WallA === 'wallpaper') {
        totalCostA += Number(formData.wallpaper);
    }

    if (formData.WallB === 'paint') {
        totalCostB += Number(formData.paint);
    } else if (formData.WallB === 'texture') {
        totalCostB += Number(formData.texture);
    } else if (formData.WallB === 'wallpaper') {
        totalCostB += Number(formData.wallpaper);
    }

    if (formData.WallC === 'paint') {
        totalCostC += Number(formData.paint);
    } else if (formData.WallC === 'texture') {
        totalCostC += Number(formData.texture);
    } else if (formData.WallC === 'wallpaper') {
        totalCostC += Number(formData.wallpaper);
    }

    if (formData.WallD === 'paint') {
        totalCostD += Number(formData.paint);
    } else if (formData.WallD === 'texture') {
        totalCostD += Number(formData.texture);
    } else if (formData.WallD === 'wallpaper') {
        totalCostD += Number(formData.wallpaper);
    }

    // Calculate the total cost for all walls
    const totalWallCost = totalCostA + totalCostB + totalCostC + totalCostD;

    // Calculate the total estimated cost for the room
    const estimatedCost = planingForCost + spaceCost + ceilingCost + totalWallCost;

    // Display the estimated cost
    console.log('Estimated Cost: ₹' + estimatedCost);
}

export function Paintculate(dataObj){
  console.log(dataObj); 
  calculateRoomData(dataObj)
  // let entriesIterator = dataObj.entries()

  // for(const item of entriesIterator){
  //   console.log(item);
  // }
}



export function calculateMaterialEstimation(){
}
export function calculateEstimatedDays(){

}
export function calculateLaborCost(){

}
export function calculateTotalEstimation(){

}
