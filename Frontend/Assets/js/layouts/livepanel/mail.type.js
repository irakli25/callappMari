

import { lpHead } from './searchHead.js';

export const mailWaiterHead = (prop) => {
    
    let source = "mailwaiter"
    let columns = [
        {
            name: '#',
            field: "id"
        },
        {
            name: "ექაუნთი",
            field: "account"
        },
        {
            name: "მომ. ავტორი",
            field: "sender_name"
        },
        {
            name: "დამატებითი ინფო",
            field: "comment"
        },
        {
            name: "დრო",
            field: "time"
        }
    ]
   
    return lpHead(source, columns, prop)
}

export const mailTakenHead = (prop) => {
    let source = "mailtaken";

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
            name: "ექაუნთი",
            field: "account",
            filter: false
        },
        {
            name: "კომუნიკაციის არხი",
            field: "sourceKey",
            filter: true
        },
        {
            name: "ხ-ბა",
            field: "duration",
            filter: false
        },
        {
            name: "მომართვის ავტორი",
            field: "author.text",
            filter: true
        },
        {
            name: "დამატებითი ინფო",
            field: "comment"
        }
    ]

   
    return lpHead(source, columns, prop)
    }

    