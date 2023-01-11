
export interface Device {
    uid: number,
    vendor: string,
    createdAt: string,
    status: "ONLINE" | "OFFLINE",
}