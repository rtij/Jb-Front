export class ServerTimes{
    hour:number;
    minute:number;
    second:number;
    constructor(hour:number,minute:number,second:number){
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    private getServerHours(Hours : String,i:number = 0){
        const it = Hours.toString();
    var result = "";
    for (i; i < 2; i++) {
        result = result + it[i];
    }
    const hours: any = result;
    return hours;
    }
}