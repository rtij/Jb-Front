export class ServerTimes {
    hour: number;
    minute: number;
    second: number;
    constructor(hour: number, minute: number, second: number) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

     getHour(i: number = 0): number {
        let it = this.toString();
        var result = "";
        for (i; i < 2; i++) {
            result = result + it[i];
        }
        const hours: any = result;
        return hours;
    }

    getMinutes(i = 3): number {
        let it = this.toString();
        var result = "";
        for (i; i < 5; i++) {
            result = result + it[i];
        }
        const minutes: any = result;
        return minutes;
    }


     getSecond(i = 6): number {
        let it = this.toString();
        var result = "";
        for (i; i < 8; i++) {
            result = result + it[i];
        }
        const minutes: any = result;
        return minutes;
    }

     FormateTimes(): string {
        let it = ""
        let secondString = this.second.toString();
        if (this.second < 10) {
            secondString = "0" + this.second.toString();
        }
        let MinuteString = this.minute.toString()
        if (this.minute < 10) {
            MinuteString = "0" + this.minute.toString()
        }
        let hourString = this.hour.toString();
        if (this.hour < 10) {
            hourString = "0" + this.hour.toString();
        }
        it = hourString + ":" + MinuteString + ":" + secondString
        return it;
    }

     TimerUp() {
        let it: any = "";
        let second: number = this.getSecond();
        let min: number = this.getMinutes();
        let Heure: number = this.getHour();
        let minresult = "";
        let secondResult = "";
        let HeureRes = "";
        let i: number = ++second;
        second = i;
        secondResult = second.toString();
        minresult = min.toString();
        HeureRes = Heure.toString();
        if (second < 10) {
            secondResult = "0" + second.toString();
        }
        if (second == 60) {
            ++min;
            second = 0;
            secondResult = "0" + second.toString();
            minresult = min.toString();
            if (min < 10) {
                minresult = "0" + min.toString();
            }
        }
        if (min == 60) {
            ++Heure;
            min = 0;
            minresult = "0" + min.toString();
            HeureRes = Heure.toString();
            if (Heure < 10) {
                HeureRes = "0" + Heure.toString();
            }
        }
        if (Heure == 24) {
            it = "00:00:00";
            return it;
        }
        it = HeureRes + ":" + minresult + ":" + secondResult;
        return it;
    }
    
}

export function TimeDiff(a:ServerTimes,b:ServerTimes):string|boolean{
    // second 
    let secondA = a.second;
    let secondB= b.second;
    let secondR = secondA - secondB;
    
    let minuteA = a.minute;
    let minuteB = b.minute;
    let minuteR = minuteA - minuteB;
    if(secondR <0){
        minuteR = minuteR + secondR;
        secondR = 0;
    }
    let hoursa = a.hour;
    let hoursb= b.hour;
    let hourR = hoursa - hoursb
    if(minuteR <0){
        hourR = hourR + minuteR
        minuteR = 0;
    }
    if(hourR<0){
        return false;
    }
    var result:any =  new ServerTimes(hourR,minuteR,secondR);
    result = result.FormateTimes();
    return result;

}