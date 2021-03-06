import { combineReducers } from 'redux';

import {
  RESTAURANTS_REJECTED,
  RESTAURANTS_REQUESTED,
  RESTAURANTS_RESOLVED,
  ADD_ITEM,
  PLACE_ORDER,
  DELETE_ORDER,
  REMOVE_ITEM,
} from './actions';

const restaurants = (state = null, action) => {
  switch (action.type) {
    case RESTAURANTS_RESOLVED:
      return action.payload.data;
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case RESTAURANTS_REQUESTED:
      return true;
    case RESTAURANTS_REJECTED:
    case RESTAURANTS_RESOLVED:
      return false;
    default:
      return state;
  }
};

const networkError = (state = false, action) => {
  switch (action.type) {
    case RESTAURANTS_REJECTED:
      return true;
    case RESTAURANTS_REQUESTED:
    case RESTAURANTS_RESOLVED:
      return false;
    default:
      return state;
  }
};

const activeOrder = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      return {
        ...state,
        [payload.name]: {
          price: payload.price,
          quantity: state[payload.name] ? state[payload.name].quantity + 1 : 1,
        },
      };
    case REMOVE_ITEM:
      // order 0 refers to active order
      if (payload.orderId === 0) {
        const { [payload.name]: value, ...withoutItem } = state;
        return withoutItem;
      }
      return state;
    case PLACE_ORDER:
      return {};
    default:
      return state;
  }
};

const orderId = (state = 1, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return state + 1;
    default:
      return state;
  }
};

const orders = (state = {}, { type, payload }) => {
  switch (type) {
    case PLACE_ORDER:
      return {
        ...state,
        [payload.id]: payload.order,
      };
    case DELETE_ORDER: {
      const { [payload]: value, ...withoutOrder } = state;
      return withoutOrder;
    }
    case REMOVE_ITEM:
      if (payload.orderId !== 0) {
        const { [payload.orderId]: order, ...rest } = state;
        const { [payload.name]: value, ...withoutItem } = order;
        return {
          ...rest,
          [payload.orderId]: {
            ...withoutItem,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  restaurants,
  loading,
  networkError,
  activeOrder,
  orderId,
  orders,
});
export default rootReducer;
