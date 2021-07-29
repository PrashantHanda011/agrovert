export default (state,action) =>{
    switch (action.type){
        case 'TOGGLE':
            return {
                ...state,
                toggle:!state.toggle
            }
            case 'ADD_USER':
                return {
                    ...state,
                    user:action.payload
                }
        }
    }
    