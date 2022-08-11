

import { lpHead } from './searchHead.js';

export const chatWaiterHead = (prop) => {
    
    let source = prop.fp.waiter.toLowerCase();
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
            field: "incomming_author"
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

export const chatTakenHead = (prop) => {

    
    let source = prop.fp.taken.toLowerCase();

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

    