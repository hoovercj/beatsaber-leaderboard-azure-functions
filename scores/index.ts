import { Context, HttpRequest, HttpMethod } from 'azure-functions-ts-essentials';
import { BeatsaberLeaderboardParser, BeatSaber } from 'beatsaber-leaderboard-parser';

import {
    handleGenericError
} from '../shared/function-utilities';

export async function run(context: Context, req: HttpRequest): Promise<void> {
    if (req.method === HttpMethod.Post) {
        const scores = req.body;

        try {
            // Validate that we can parse the file
            const scoresObject = typeof scores === 'string' ?
                JSON.parse(scores) :
                scores;
            BeatsaberLeaderboardParser.ParseFile(scoresObject);

            // If we can, store it as a blob
            context.bindings.currentLeaderboardBlobOutput = scores;

            context.res = {
                status: 200,
                body: '',
            };

            return Promise.resolve();
        } catch (e) {
            context.log.error(e);
            handleGenericError(context, 'Unable to parse scores.');
        }
    } else {
        context.res = {
            status: 200,
            body: context.bindings.currentLeaderboardBlobInput,
        };

        return Promise.resolve();
    }

};
