import { lpHead } from './searchHead.js';
import Helpers from '../../helpers/helper.class.js'

export const PhoneWaiterHead = (prop) => {
    let source = "phonewaiter";
    let columns = [
        {
            name: '#',
            field: "id"
        },
        {
            name: "რიგი & ენა",
            field: "queue",
            filter: true,
            callback: async  () => {
                
                return await new Helpers().getResponse({
                     route: "queue",
                     act: 'get_queue',
                     ns: "Helpers"
                 })
             }
        },
        {
            name: "ტელ.ნომერი",
            field: "number",
            filter: true
        },
        {
            name: "მომ. ავტორი",
            field: "incomming_author",
            filter: true
        },
        {
            name: "დამატებითი ინფო",
            field: "comment",
            filter: true
        },
        {
            name: "დრო",
            field: "time",
            filter: false
        }
    ]
   
    return lpHead(source, columns, prop)
}

export const PhoneTakenHead = (prop) => {
    let source = "phonetaken";

    let columns = [
        {
            name: 'id',
            field: "id",
            hide: true
        },
        {
            name: self.Flashpanel.state.langData.OPERATOR,
            field: "operator.text",
            filter: true
        },
        {
            name: "ექაუნთი",
            field: "astNumber",
            filter: true,
            callback: async  () => {
                
               return await new Helpers().getResponse({
                    route: "queue",
                    act: 'get_queue_list',
                    ns: "Helpers"
                })
            }
        },
        {
            name: "კომუნიკაციის არხი",
            field: "sources",
            filter: false
        },
        {
            name: "მომართვის ავტორი",
            field: "author.number.text",
            filter: true
        },
        {
            name: "ხ-ბა",
            field: "totalDuration",
            filter: false
        },
    ]

   
    return lpHead(source, columns, prop)
    }

    