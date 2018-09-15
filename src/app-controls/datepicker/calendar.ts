export interface ICalendarOptions {
    firstDay: string;
    weekends: string[];
    mode: string;
}

export interface ICalendarDayTitle {
    title: string;
    isWeekend: boolean;
}

export interface ICalendarDay {
    dayNumber: number,
    isDayInMonth: boolean,
    isDayInPreviousMonth: boolean,
    isDayInNextMonth: boolean,
    isWeekendDay: boolean,
    isToday: boolean
}

export interface ICalendarMonth {
    shortName: string,
    LongName: string,
    monthNumber: number,
    isCurrentMonth: boolean,
    isMonthInYear: boolean,
    isMonthInPrevoiusYear: boolean,
    isMonthInNextYear: boolean
}

export interface ICalendarYear {
    year: number,
    isCurrentYear: boolean,
    isLeapYear: boolean
}

export const MODE = {
    DAY: 'day',
    MONTH: 'month',
    YEAR: 'year'
}

export const WEEKDAYS = {
    SUNDAY: 'su',
    MONDAY: 'mo',
    TUESDAY: 'tu',
    WEDNESDAY: 'we',
    THURSDAY: 'th',
    FRIDAY: 'fr',
    SATURDAY: 'st'
}

export class Calendar {

    private currentDate: Date;
    private options: ICalendarOptions;
    private mode: string;
    private validModes = [MODE.DAY, MODE.MONTH, MODE.YEAR];
    private calendarTitle;
    private todaysDayOfMonth;

    private static originalWeekDays = [WEEKDAYS.SUNDAY, WEEKDAYS.MONDAY, WEEKDAYS.TUESDAY, WEEKDAYS.WEDNESDAY, WEEKDAYS.THURSDAY, WEEKDAYS.FRIDAY, WEEKDAYS.SATURDAY];
    private userDefinedWeekDays: string[] = [];

    public static shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'];

    public static fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'];

    private titles: ICalendarDayTitle[] = [];

    private currentMonth: number;
    private currentYear: number;

    private todayDate;
    private todayMonth;
    private todayYear;

    constructor() {

        this.todayDate = new Date();
        this.todayMonth = this.todayDate.getMonth();
        this.todayYear = this.todayDate.getFullYear();
        this.todaysDayOfMonth = this.todayDate.getDate();

        this.currentDate = this.todayDate;

        this.options = <ICalendarOptions>{
            firstDay: 'fr',
            weekends: ['fr', 'st'],
            mode: MODE.DAY
        }

        this.mode = this.options.mode;

        this.makeCalendarTitle();

    }

    setOptions(options: ICalendarOptions) {
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

    refresh(date: Date) {
        this.currentDate = date;
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.titles = [];
        this.makeDaysTitle()
    }

    refreshWithDay(d: ICalendarDay) {
        this.refresh(new Date(this.currentYear, this.currentMonth, d.dayNumber));
    }

    refreshWithMonth(m: ICalendarMonth) {
        this.refresh(new Date(this.currentYear, m.monthNumber));
    }

    refreshWithYear(y: ICalendarYear) {
        this.refresh(new Date(y.year, this.currentMonth));
    }

    changeMode(mode: string) {
        if (this.validModes.indexOf(mode) === -1) {
            console.log('Invalid Mode');
        } else {
            this.mode = mode;
        }
    }

    getMode() {
        return this.mode;
    }

    getCalendarTitle() {
        this.makeCalendarTitle();
        return this.calendarTitle;
    }

    toggleMode() {
        if (this.mode === MODE.DAY) {
            this.mode = MODE.MONTH;
        } else if (this.mode === MODE.MONTH) {
            this.mode = MODE.YEAR
        } else {
            this.mode = MODE.DAY;
        }
    }

    getCurrentYear() {
        return this.currentYear;
    }

    getCurrentMonth() {
        return this.currentMonth;
    }

    next() {
        if (this.mode !== MODE.YEAR) {
            this.currentMonth++;
            // js month is 0 based
            // that why 12 will be ignored
            if (this.currentMonth >= 12) {
                this.currentMonth = 0;
                this.currentYear++;
            }
        } else {
            // year mode
            // increase 16 years
            this.currentYear += 16;
        }
        this.refresh(new Date(this.currentYear, this.currentMonth));
    }

    previous() {
        if (this.mode !== MODE.YEAR) {
            this.currentMonth--;
            // js month is 0 based
            // that why 0 will be considered
            if (this.currentMonth <= -1) {
                this.currentMonth = 11;
                this.currentYear--;
            }
        } else {
            // year mode
            // decrease 16 years
            this.currentYear -= 16;
        }
        this.refresh(new Date(this.currentYear, this.currentMonth));
    }

    today() {
        this.refresh(new Date());
    }

    getTitles(): ICalendarDayTitle[] {
        return this.titles;
    }

    getDays(): ICalendarDay[][] {

        const month = this.currentDate.getMonth();
        const year = this.currentDate.getFullYear();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const totalDaysInCurrentMonth = new Date(year, month + 1, 0).getDate();
        let prevMonthDayCounter = new Date(year, month, 0).getDate();

        // subtract offset
        const offsetIndexOf = this.userDefinedWeekDays.indexOf(Calendar.originalWeekDays[firstDayOfMonth]);
        if (offsetIndexOf > -1) {
            prevMonthDayCounter = prevMonthDayCounter - offsetIndexOf;
        }

        let currentMonthDayCounter = 0;
        let nextMonthDayCounter = 0;
        let counting = false;

        const calendarDays: ICalendarDay[][] = [];

        for (let i = 0; i < 6; i++) {
            const daysRow: ICalendarDay[] = []
            for (let j = 0; j < 7; j++) {

                const _weekend = this.isWeekEnd(this.userDefinedWeekDays[j]);

                if (i === 0) {
                    // first row of calendar
                    if (!counting && this.userDefinedWeekDays[j] === Calendar.originalWeekDays[firstDayOfMonth]) {
                        counting = true;
                    }
                    if (!counting) {
                        // previous month day
                        prevMonthDayCounter++;
                        daysRow.push(<ICalendarDay>{
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
                    daysRow.push(<ICalendarDay>{
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
                    daysRow.push(<ICalendarDay>{
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
            calendarDays.push(daysRow);
        }

        return calendarDays;

    }

    getYears() {
        // generate data for month view
        const years: ICalendarYear[][] = [];
        let yearCounter = this.currentYear;
        for (let i = 0; i < 4; i++) {
            const _years: ICalendarYear[] = [];
            for (let j = 0; j < 4; j++) {
                _years.push({
                    year: yearCounter,
                    isCurrentYear: yearCounter === this.todayYear,
                    isLeapYear: new Date(yearCounter, 2, 0).getDate() === 28
                });
                yearCounter++;
            }
            years.push(_years);
        }
        return years;
    }

    getMonths() {
        // generate data for month view
        const months: ICalendarMonth[][] = [];
        let monthCounter = 0;
        for (let i = 0; i < 4; i++) {
            const _months: ICalendarMonth[] = [];
            for (let j = 0; j < 4; j++) {
                if (i === 0 && (j === 0 || j === 1)) {
                    // previous year month
                    _months.push({
                        shortName: Calendar.shortMonths[10 + j],
                        LongName: Calendar.fullMonths[10 + j],
                        monthNumber: 10 + j,
                        isCurrentMonth: false,
                        isMonthInNextYear: false,
                        isMonthInPrevoiusYear: true,
                        isMonthInYear: false
                    });
                } else if (i === 3 && (j === 2 || j === 3)) {
                    // next year month
                    _months.push({
                        shortName: Calendar.shortMonths[j - 2],
                        LongName: Calendar.fullMonths[j - 2],
                        monthNumber: j - 2,
                        isCurrentMonth: false,
                        isMonthInNextYear: true,
                        isMonthInPrevoiusYear: false,
                        isMonthInYear: false
                    });
                } else {
                    // current year month
                    _months.push({
                        shortName: Calendar.shortMonths[monthCounter],
                        LongName: Calendar.fullMonths[monthCounter],
                        monthNumber: monthCounter,
                        isCurrentMonth: monthCounter === this.todayMonth
                            && this.currentMonth === this.todayMonth
                            && this.currentYear === this.todayYear,
                        isMonthInNextYear: false,
                        isMonthInPrevoiusYear: false,
                        isMonthInYear: true
                    });
                    monthCounter++;
                }
            }
            months.push(_months);
        }
        return months;
    }

    private makeDaysTitle(): void {

        this.userDefinedWeekDays = [];
        let _days = [];

        const firstDayIndexOf = Calendar.originalWeekDays.indexOf(this.options.firstDay);
        if (firstDayIndexOf > -1) {
            _days = _days.concat(Calendar.originalWeekDays.slice(firstDayIndexOf));
            if (firstDayIndexOf !== 0) {
                _days = _days.concat(Calendar.originalWeekDays.slice(0, firstDayIndexOf));
            }
        }

        for (let i = 0; i < _days.length; i++) {
            this.titles.push(<ICalendarDayTitle>{
                title: _days[i],
                isWeekend: this.isWeekEnd(_days[i])
            })
            this.userDefinedWeekDays.push(_days[i])
        }

    }

    private makeCalendarTitle() {
        if (this.mode === MODE.DAY) {
            this.calendarTitle = `${Calendar.fullMonths[this.currentMonth]}, ${this.currentYear}`;
        } else if (this.mode === MODE.MONTH) {
            this.calendarTitle = `${Calendar.fullMonths[this.currentMonth]}, ${this.currentYear}`;
        } else if (this.mode === MODE.YEAR) {
            this.calendarTitle = `${this.currentYear} - ${this.currentYear + 16}`;
        }
    }

    private isWeekEnd(day) {
        return this.options.weekends.indexOf(day) > -1;
    }

}