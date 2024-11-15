import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRangeComp.scss'; // Import custom styles

const DateRangeComp = ({ onDateChange }) => {
  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle 
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // handle date change
  const handleSelect = (item) => {
    setRange([item.selection]);
    onDateChange(item.selection.startDate, item.selection.endDate);
  };

  return (
    <div className="calendarWrap">
      <input
        placeholder='Data Range'
        value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(range[0].endDate, "dd/MM/yyyy")}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen(open => !open)}
      />
      <div ref={refOne}>
        {open && 
          <DateRange
            onChange={handleSelect}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
            minDate={new Date()} // Prevent selecting past dates
          />
        }
      </div>
    </div>
  );
}

export default DateRangeComp;
