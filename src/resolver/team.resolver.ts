import { getItem } from "../util/util";

export const Team = {
    async description (obj) {
        return await getPropertyOfTeam(obj.id, 'description')
    },
    async players (obj) {
        return await getPropertyOfTeam(obj.id, 'players')
    },
    async social (obj) {
        return await getPropertyOfTeam(obj.id, 'social')
    }
}

const getPropertyOfTeam = async (teamId, propertyName) => {
    const team = await getItem('lol', 'superliga', teamId, 'team')
    return team[propertyName]
}