import { getLadders } from "./ladder.lvp.api";

export const ladderLvpResolver = (game: string) => {
    return getLadders(game)
}