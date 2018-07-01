import { getItem } from "../util/util";

export const Team = {
    description: async (obj) => {
        return getPropertyOfTeam(obj.id, 'description')
    },
    players: async (obj) => {
        return getPropertyOfTeam(obj.id, 'players')
    },
    social: async (obj) => {
        return getPropertyOfTeam(obj.id, 'social')
    }
}

const getPropertyOfTeam = async (teamId, propertyName) => {
    const team = await getItem('lol', 'superliga', teamId, 'team')
    return team[propertyName]
}