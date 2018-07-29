import { teamLvpResolver } from "./lvp/team.lvp.resolver";

export const Team = {
    async description ({id, game}) {
        return (await teamLvpResolver(game, id)).description
    },
    async players ({id, game}) {
        return (await teamLvpResolver(game, id)).players
    },
    async social ({id, game}) {
        return (await teamLvpResolver(game, id)).social
    },
}