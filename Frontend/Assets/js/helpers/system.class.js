
export default class System {

    constructor(){

        self.System = this;

        this.state = {
            store: ''
        };


    }









































    // createStore(reducer) {
    //     var state;
    //     var listeners = []
    
    //     function getState() {
    //         return state
    //     }
        
    //     function subscribe(listener) {
    //         listeners.push(listener)
    //         return function unsubscribe() {
    //             var index = listeners.indexOf(listener)
    //             listeners.splice(index, 1)
    //         }
    //     }
        
    //     function dispatch(action) {
    //         state = reducer(state, action)
    //         listeners.forEach(listener => listener())
    //     }
    
    //     dispatch({})
    
    //     return { dispatch, subscribe, getState }
    // }



    // setState = (action) => {

    //     this.state.store = this.createStore(this.rootReducer)

    //     this.state.store.dispatch({type: "SET_STATE", state: action})

    //     this.state = this.state.store.getState();

    //     this.state.store.subscribe(this.renderer)
    // }

    

    // configureStore = (reducers) => {

    //     let combined = (state = {}, action) => {
            
    //         console.log(...reducers)

    //         return { ...this.rootReducer(state.a, action) };
    //     }
    //     let store = Redux.createStore(combined);
    //     this.state = store.getState()
    //     this.state.store = store
    //     // this.state.store.subscribe(this.renderer)
       
        
    // }

    // rootReducer = (state = this.state, action) => {
    //     // console.log(state)
    //             switch (action.type){
    //                 case "SET_STATE":
    //                     return {...state, ...action.state}
    //                 default: 
    //                     return state;
    //             }
    //         }

        
    // renderer = () => {

        

    // }


    // Create Event
    // stateUpdated = new Event('stateUpdate');

    // define State

    // StateManager = function(initialState) {

    //     this.state =  initialState

    //     const setStateInternal = (newState) => {
    //         console.log(`In the setting. Setting state now with value ${JSON.stringify(newState)}.`)
    //         this.state = newState;
    //         console.log(`New state is ${JSON.stringify(this.state)}`);
    //     }

    //     this.setState = new Proxy(setStateInternal, {
    //         apply: function(target, thisArgs, argumentList){
    //             console.log(arguments)
    //             console.log('Now setting the state');
    //             target(...argumentList);
    //             let eventFired  = dispatchEvent(self.System.stateUpdated);
    //             console.log(`Event Fired : ${eventFired}`);
    //         }
    //     });

    // }

    // createState = function(initialState) {
    //     console.log('initializing state')
    //     let tempState = new StateManager(initialState);
    
    //     return tempState;
    // };
    

}