export default function reducer(state, action) {
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
        products: [...state.products, action.payload],
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.map((product) => product),
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload.map((category) => category),
      };
    case "DELETE_PRODUCT":
      
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.id) {
            const id = action.payload.id;
            product = { id, ...action.payload.product };
          }
          return product;
        }),
      };

    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === action.payload.id) {
            const id = action.payload.id;
            category = { id, ...action.payload.category };
          }
          return category;
        }),
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        catgories: state.categories.splice(action.payload,1)
      };

    default:
      return { ...state };
  }
}
