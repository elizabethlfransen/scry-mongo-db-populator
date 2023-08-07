import {Duration} from "luxon";

export function sleep(time: Duration): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(
            () => resolve(),
            time.toMillis()
        );
    })
}