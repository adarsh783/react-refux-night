import { InitialState } from "./initialState";
import { TeamActions } from "./action";
export const TeamReducer = (state = InitialState, action) => {
  switch (action.type) {
    case TeamActions.ADD_PLAYER:
      return {
        TeamDetails: {
          ...state.TeamDetails,
          [action.payload.team]: [
            ...state.TeamDetails[action.payload.team],
            (state.TeamDetails[action.payload.team] = action.payload),
          ],
        },
      };

    case TeamActions.ADD_TEAM:
      return {
        TeamDetails: {
          ...state.TeamDetails,
          [action.payload.team_name]: [],
        },
      };

    case TeamActions.REMOVE_PLAYER:
      return {
        TeamDetails: {
          ...state.TeamDetails,
          [action.payload.teamName]: [
            ...state.TeamDetails[action.payload.teamName].filter(
              playerList => playerList.player_id !== action.payload.player_id
            ),
          ],
        },
      };

    case TeamActions.REMOVE_TEAM:
      delete state.TeamDetails[action.payload.team_name];
      return {
        ...state.TeamDetails,
        TeamDetails: { ...state.TeamDetails },
      };
    default:
      return state;
  }
};
