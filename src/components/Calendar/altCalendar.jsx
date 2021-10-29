import React from 'react';
import { DateRangePicker } from 'react-date-range';
import functions from 'date-fns';

const AltCalendar = () => {
   const handleSelect = (ranges) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  const render = () => {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
    return (
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
    )
  }
};

export default AltCalendar;