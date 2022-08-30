export const STORE_OPEN_HOURS = "open_hours/initialize";

export type ActionOpenHours = {
    type: string,
    payload: {}
}

export const storeOpenHours = (payload: {}): ActionOpenHours => ({
    type: STORE_OPEN_HOURS,
    payload
})
