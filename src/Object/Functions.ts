import { Time } from "@angular/common";

// Server Date Formater
export function DateToShortDate(date: Date, number: number = 0): Date {
    var it = date.toString();
    var value = "";
    for (number; number < 10; number++) {
        value = value + it[number];
    }
    const result: any = value;
    return result;
}

export function getDateAndTimeFromServer(ServerDate: Date, number = 0) {

}

export function getTimeLocaleTime(date: Date): Time {
    var it = date.toString();
    var value = "";
    for (let number = 16; number <= 23; number++) {
        value = value + it[number]
    }
    const val: any = value;
    return val;
}


export function DateStringToDate(date: string): Date {
    let result = "";
    result = result + YearsDateString(date) + "-" + MonthDateString(date) + "-" + DayDateString(date);
    const it: any = result;
    return it;
}

export function YearsDateString(date: string, number: number = 6) {
    let result = "";
    let dateString = date.toString();
    for (number; number < 10; number++) {
        result = result + dateString[number];
    }
    return result;
}

export function DayDateString(date: string, number: number = 0) {
    let result = "";
    let dateString = date.toString();
    for (number; number < 2; number++) {
        result = result + dateString[number];
    }
    return result;
}

export function DateFormate(date: Date): string {
    let result = "";
    return result = result + Day(date) + "-" + Month(date) + "-" + Year(date);

}

export function strrev(text: string): string {
    let result = "";
    let number = text.length - 1;
    for (number; number >= 0; number--) {
        result = result + text[number];
    }
    return result;
}
export function Day(date: Date, number: number = 8): string {
    let result = "";
    let dateString = date.toString();
    for (number; number < 10; number++) {
        result = result + dateString[number];
    }
    return result;
}

export function Month(date: Date, number: number = 5): string {
    let result = "";
    let dateString = date.toString();
    for (number; number < 7; number++) {
        result = result + dateString[number];
    }
    return result;
}
export function MonthDateString(date: string, number: number = 3): string {
    let result = "";
    let dateString = date.toString();
    for (number; number < 5; number++) {
        result = result + dateString[number];
    }
    return result;
}
export function Year(date: Date, number: number = 0): string {
    let result = "";
    let dateString = date.toString();
    for (number; number <= 3; number++) {
        result = result + dateString[number];
    }
    return result;
}
let Mois = ["Janvier", "F??vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao??t", "Septembre", "Octobre", "Novembre", "D??cembre"];
let Paiement = ["Esp??ces", "Cheque", "Mobile"];

export function getMonthName(num: number): string {
    return Mois[num];
}

export function getMonth(date: Date): number {
    const month: any = Month(date);
    let num: number = month;
    return num;
}

export function getYear(date: Date): number {
    const month: any = Year(date);
    let num: number = month;
    return num;
}
export function getMonthNow() {
    let date = new Date();
    return date.getMonth();
}

export function getMonthNameNow() {
    let date = new Date();
    return Mois[date.getMonth()];
}

export function getYearNow() {
    let date = new Date();
    return date.getFullYear();
}

export function FormateDate(date: Date): Date {
    var value = "";
    let day = date.getDate();
    if (day < 10) {
        value = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-0" + date.getDate();
    }
    else {
        value = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    const result: any = value;
    return result;
}


// Some function to formate date from the server


export function GetResultTime(Date: Date, i: number = 11): Time {
    const it = Date.toString();
    var result = '';
    for (i; i <= 18; i++) {
        result = result + it[i];
    }
    const final_result: any = result;
    return final_result;
}

// Timer values getter

export function getTimeHours(Hours: Time, i = 0): number {
    const it = Hours.toString();
    var result = "";
    for (i; i < 2; i++) {
        result = result + it[i];
    }
    const hours: any = result;
    return hours;
}

export function getMinutes(Hours: Time, i = 3): number {
    const it = Hours.toString();
    var result = "";
    for (i; i < 5; i++) {
        result = result + it[i];
    }
    const minutes: any = result;
    return minutes;
}

export function getSecond(Hours: Time, i = 6): number {
    const it = Hours.toString();
    var result = "";
    for (i; i < 8; i++) {
        result = result + it[i];
    }
    const minutes: any = result;
    return minutes;
}

export function TimerUp(Hours: Time): Time {
    let it: any = "";
    let second: number = getSecond(Hours);
    let min: number = getMinutes(Hours);
    let Heure: number = getTimeHours(Hours);
    let minresult = "";
    let secondResult = "";
    let HeureRes = "";
    // check second
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

export function TimerDown(Hours: Time) {
    let it: any = "";
    let second: number = getSecond(Hours);
    let min: number = getMinutes(Hours);
    let Heure: number = getTimeHours(Hours);
    let minresult = "";
    let secondResult = "";
    let HeureRes = "";
    // check second
    let i: number = --second;
    second = i;
    secondResult = second.toString();
    minresult = min.toString();
    HeureRes = Heure.toString();
    if (second < 10) {
        secondResult = "0" + second.toString();
    }
    if (second < 0) {
        --min;
        second = 59;
        secondResult = second.toString();
        minresult = min.toString();
        if (min < 10) {
            minresult = "0" + min.toString();
        }
    }
    if (min < 0) {
        --Heure;
        min = 59;
        minresult = min.toString();
        HeureRes = Heure.toString();
        if (Heure < 0) {
            it = "00:00:00";
            return it;
        }
        if (Heure < 10) {
            HeureRes = "0" + Heure.toString();
        }
    }
    it = HeureRes + ":" + minresult + ":" + secondResult;
    return it;
}