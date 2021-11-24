//All functions related to manipulation of Dates, and setting/clearing the DateRange
const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		]


    //format date
export const formatDate=  (date) => {
        return parseInt( date.split("-").join('') );
    }



    //set dates
const formatCalendarDate = (date) => {
        let thisDate = date;
		let day = thisDate[2];
		let month = thisDate[1];
        let year = parseInt(thisDate[3]);
		
		month = months.indexOf(month) +1;
        if (month < 10) {
           month = '0'.concat(month.toString());
        }
		return parseInt( `${year}`.concat(month).concat(day) );
    }

export const setDates = async (data, setDateRange) => {
	if(!data) return setDateRange(null);
		 let startVal = await data.startDate.toString().split(' ');
         let endVal = await data.endDate.toString().split(' ');

         startVal = formatCalendarDate(startVal);
         endVal = formatCalendarDate(endVal);
        setDateRange(previousState => {
            return {...previousState, start: startVal, end: endVal}
        });
    }



 //filter by date   
const checkDate = (date, dateRange) => {
    console.log('date: ', date);
    console.log('dateRange: ', dateRange);
        if(!dateRange) return true;
        else if (date >= dateRange.start && date <= dateRange.end) return true;
        else return false;
    }


export const filterByDate = async(array, dateRange) => {
       return await array.filter( (event) =>  checkDate(event.dateInFormat, dateRange))
    }