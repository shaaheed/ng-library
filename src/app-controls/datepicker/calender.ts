export interface ICalenderOptions {
    firstDay: string;
    weekends: string[];
}

export interface ICalenderDayTitle {
    title: string;
    isWeekend: boolean;
}

export interface ICalenderDay {
    dayNumber: number,
    isDayInMonth: boolean,
    isDayInPreviousMonth: boolean,
    isDayInNextMonth: boolean,
    isWeekendDay: boolean,
    isToday: boolean
}

export class Calender {

    private currentDate = new Date();

    private options = <ICalenderOptions>{
        firstDay: 'fr',
        weekends: ['fr', 'st']
    }

    private todaysDayOfMonth = new Date().getDate();

    private originalWeekDays = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'st'];
    private requestedWeekDays: string[] = [];

    private titles: ICalenderDayTitle[] = [];

    private currentMonth: number;
    private currentYear: number;

    private todayDate = new Date();
    private todayMonth = this.todayDate.getMonth();
    private todayYear = this.todayDate.getFullYear();

    setOptions(options: ICalenderOptions) {
        this.options = options;
    }

    setFirstDay(firstDay: string) {
        this.options.firstDay = firstDay;
    }

    setWeekends(weekends: string[]) {
        this.options.weekends = weekends;
    }

    getCurrentDate() {
        return this.currentDate;
    }

    setCurrentDate(date: Date) {
        this.currentDate = date;
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.titles = [];
        this.makeDaysTitle()
    }

    next() {
        this.currentMonth++;
        // js month is 0 based
        // that why 12 will be ignored
        if (this.currentMonth >= 12) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.setCurrentDate(new Date(this.currentYear, this.currentMonth));
    }

    previous() {
        this.currentMonth--;
        // js month is 0 based
        // that why 0 will be considered
        if (this.currentMonth <= -1) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.setCurrentDate(new Date(this.currentYear, this.currentMonth));
    }

    today() {
        this.setCurrentDate(new Date());
    }

    getTitles(): ICalenderDayTitle[] {
        return this.titles;
    }

    getDays(): ICalenderDay[][] {

        const month = this.currentDate.getMonth();
        const year = this.currentDate.getFullYear();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const totalDaysInCurrentMonth = new Date(year, month + 1, 0).getDate();
        let prevMonthDayCounter = new Date(year, month, 0).getDate();

        // subtract offset
        const offsetIndexOf = this.requestedWeekDays.indexOf(this.originalWeekDays[firstDayOfMonth]);
        if (offsetIndexOf > -1) {
            prevMonthDayCounter = prevMonthDayCounter - offsetIndexOf;
        }

        let currentMonthDayCounter = 0;
        let nextMonthDayCounter = 0;
        let counting = false;

        const calenderDays: ICalenderDay[][] = [];

        for (let i = 0; i < 6; i++) {
            const daysRow: ICalenderDay[] = []
            for (let j = 0; j < 7; j++) {

                const _weekend = this.isWeekEnd(this.requestedWeekDays[j]);

                if (i === 0) {
                    // first row of calender
                    if (!counting && this.requestedWeekDays[j] === this.originalWeekDays[firstDayOfMonth]) {
                        counting = true;
                    }
                    if (!counting) {
                        // previous month day
                        prevMonthDayCounter++;
                        daysRow.push(<ICalenderDay>{
                            dayNumber: prevMonthDayCounter,
                            isDayInMonth: false,
                            isDayInPreviousMonth: true,
                            isDayInNextMonth: false,
                            isWeekendDay: _weekend,
                            isToday: false
                        });
                    }
                }

                if (counting) {
                    currentMonthDayCounter++;
                    daysRow.push(<ICalenderDay>{
                        dayNumber: currentMonthDayCounter,
                        isDayInMonth: true,
                        isDayInPreviousMonth: false,
                        isDayInNextMonth: false,
                        isWeekendDay: _weekend,
                        isToday: this.todayMonth === this.currentMonth
                            && this.todayYear === this.currentYear
                            && this.todaysDayOfMonth === currentMonthDayCounter
                    });
                }

                if (i !== 0 && !counting) {
                    nextMonthDayCounter++;
                    daysRow.push(<ICalenderDay>{
                        dayNumber: nextMonthDayCounter,
                        isDayInMonth: false,
                        isDayInPreviousMonth: false,
                        isDayInNextMonth: true,
                        isWeekendDay: _weekend,
                        isToday: false
                    });
                }

                if (currentMonthDayCounter >= totalDaysInCurrentMonth) {
                    counting = false;
                }

            }
            calenderDays.push(daysRow);
        }

        return calenderDays;

    }

    private makeDaysTitle(): void {

        this.requestedWeekDays = [];
        let _days = [];

        const firstDayIndexOf = this.originalWeekDays.indexOf(this.options.firstDay);
        if (firstDayIndexOf > -1) {
            _days = _days.concat(this.originalWeekDays.slice(firstDayIndexOf));
            if (firstDayIndexOf !== 0) {
                _days = _days.concat(this.originalWeekDays.slice(0, firstDayIndexOf));
            }
        }

        for (let i = 0; i < _days.length; i++) {
            this.titles.push(<ICalenderDayTitle>{
                title: _days[i],
                isWeekend: this.isWeekEnd(_days[i])
            })
            this.requestedWeekDays.push(_days[i])
        }

    }

    private isWeekEnd(day) {
        return this.options.weekends.indexOf(day) > -1;
    }

}