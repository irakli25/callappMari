

export const entitiesReducer = ( state = {movies: [], moviesDetails: {}}, action = { entity: string, value: {}, type: string }) => {

  const { entity, value, type } = action;

  switch (type) {
      case "ACTION":
          return update(state, {
              [entity]: {
                  $set: value
              }
          });

      default:
          return state;
  }
  
};