
import { lpHead } from './searchHead.js';

export const jorkoWaiterHead = (prop) => {

    let source = "jorkowaiter"
    let columns = [
        {
            name: '#',
            field: "id"
        },
        {
            name: "ნომერი",
            field: "number"
        },
        {
            name: "სახელი",
            field: "sender_name"
        },
        {
            name: "ფეხების რაოდენობა",
            field: "footCount"
        }
    ]
   
    return lpHead(source, columns, prop)
}

 export const jorkoTakenHead = (prop) => {
         
        let source = "jorkotaken"
        let columns = [
            {
                name: 'id',
                field: "id",
                hide: true
            },
            {
                name: "ოპერატორი",
                field: "operator.text",
                filter: true
            },
            {
                name: "ნომერი",
                field: "number"
            },
            {
                name: "სახელი",
                field: "sender_name"
            },
            {
                name: "ფეხების რაოდენობა",
                field: "footCount"
            },
            {
                name: "ხანგრძლივობა",
                field: "waitingTime"
            }
        ]
    
        return lpHead(source, columns, prop)
    }