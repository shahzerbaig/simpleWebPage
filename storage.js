console.log("This is Storage Layer");


// Creating an Interface for the storage layer 

// There should be only one single Instance of the class at all the time

export class storageClass{
    // this is a storage class
    constructor(name){
        if(storageClass.instance){
            throw new Error("You can Create Only one Instance of this class")
        }
        else{
            storageClass.instance = this;
        }
        this.name = name;
        this.rooms = []
        let stringyfyRooms = JSON.stringify(this.rooms)
        sessionStorage.setItem('rooms',stringyfyRooms)
    }

    // Get all Rooms in the session Storage. 
    // The output should return an Array of room Objects.
    getRooms(){
        if(!sessionStorage.getItem('rooms')){
            throw new Error("No Rooms present")
        }
        let parsedRoomsArray = JSON.parse(sessionStorage.getItem('rooms'))
        return parsedRoomsArray;
    }


    // Get a Single Room from
    getRoom(roomName){
        if(!this.getRooms){
            throw new Error("No Rooms are Present")
        };

        let rooms = this.getRooms();
        
//      rooms.filter(()=>{});
    }


    // Add a Room
    addRoom(roomObject){
        if(!this.getRooms){
            throw new Error("Can't add a room as No rooms are present")
        }
        let rooms = this.getRooms()

        rooms.push(roomObject)
        let stringifyRooms = JSON.stringify(rooms);
        sessionStorage.setItem('rooms',stringifyRooms)
    }


    // Updating a Room
    updateRoom(roomId){

    }


    // Deleting a Room
    deleteRoom(roomId){

    }


    searchRoom(roomName){

    }


}

