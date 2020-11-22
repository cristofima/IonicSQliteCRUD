export class DateUtil{

    static getUnixTime(txtDate: string): number{
        if(txtDate){
            const date = new Date(txtDate);

            return Math.floor(date.getTime() / 1000);
        }

        return null;
    }

    static getStringDateFromUnixTimeStamp(unixTimeStamp: number): string{
        if(unixTimeStamp){
            const date = new Date(unixTimeStamp * 1000);

            return date.toISOString().split("T")[0];
        }
        
        return null;
    }
}