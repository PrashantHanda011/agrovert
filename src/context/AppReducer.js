export default function reducer(state, action){
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        toggle: !state.toggle,
      };
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products,action.payload],
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories,action.payload],
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.map(product=>product),
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload.map(category=>category),
      };
    case "DELETE_PRODUCT":
      console.log(state,action.payload)
      return{
        ...state,
        products: state.products.filter(product=> product.id!==action.payload)
      }

      case "UPDATE_PRODUCT":
        return{
          ...state,
          products: state.products.map(product=>{
            if(product.id===action.payload.id){
              product = action.payload.product
            }
            return product
          })
        }

      default:
        return {...state}
  }
};
