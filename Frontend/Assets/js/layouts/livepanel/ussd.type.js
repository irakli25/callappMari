

import { lpHead } from './searchHead.js';

export const ussdWaiterHead = (prop) => {
    
    let source = "ussdwaiter"
    let columns = [
        {
            name: '#',
            field: "id"
        },
        {
            name: "ნომერი",
            field: "name"
        },
        {
            name: "მომ. ავტორი",
            field: "sender_name"
        },
        {
            name: "დრო",
            field: "time"
        }
    ]
   
    return lpHead(source, columns, prop)
}

export const ussdTakenHead = (prop) => {
    let source = "ussdtaken";

    let columns = [
        {
            name: '#',
            field: "id",
            hide: true
        },
        {
            name: "ოპერატორი",
            field: "operator_name"
        },
        {
            name: "ექაუნთი",
            field: "account"
        },
        {
            name: "კომუნიკაციის არხი",
            field: "sources",
            filter: false
        },
        {
            name: "ხ-ბა",
            field: "duration"
        }, 
        {
            name: "მომართვის ავტორი",
            field: "sender_name"
        }
    ]

   
    return lpHead(source, columns, prop)
}

    