import Axios from "axios";
import { ILadder } from "../ladder.interface";


const client = Axios.create({
    baseURL: "https://www.lvp.es/api/superliga/"
});

export const getLadders = (game: string): Promise<ILadder[]> => {
    const url = `${game}/temporada/ladder`
    return client
        .get(url)
        .then(({data}) => {
            return data.map((ladder) => ladderTransform(ladder, game))
        })
}

const ladderTransform = (ladder: ILadder, game: string): ILadder => {
    return {
        ...ladder,
        game,
        competition: 'superliga',
    }
}