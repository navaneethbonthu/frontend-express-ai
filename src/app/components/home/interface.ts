
export interface LogEntry {
    id: number,
    timestamp: Date;
    message: string,
    level: 'INFO' | 'ERROR' | 'WARN'
}
