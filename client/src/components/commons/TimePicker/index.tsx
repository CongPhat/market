import moment from "moment";
import React, { Component, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

interface Iprops {
  type?: string;
  format?: string;
  defaultValue?: moment.Moment;
  value?: moment.Moment;
  disabled?: boolean;
  onChange?: (value, dateString) => void;
}

const TimePicker = (props: Iprops) => {
  let inputRef = useRef(null);
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  let oneDay = 60 * 60 * 24 * 1000;
  let todayTimestamp =
    Date.now() -
    (Date.now() % oneDay) +
    new Date().getTimezoneOffset() * 1000 * 60;

  const daysMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthMap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getNumberOfDays = (year, month) => {
    return 40 - new Date(year, month, 40).getDate();
  };

  const getDayDetails = (args) => {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }

    let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    let _date =
      (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    let timestamp = new Date(args.year, args.month, _date).getTime();
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: daysMap[day],
    };
  };

  const getMonthDetails = (year, month) => {
    let firstDay = new Date(year, month).getDay();
    let numberOfDays = getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 6;
    let currentDay = null;
    let index = 0;
    let cols = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  };

  const [state, setState] = useState({
    rangeYear: year,
    year,
    month,
    selectedDay: todayTimestamp,
    monthDetails: getMonthDetails(year, month),
    showDatePicker: false,
    status: false,
    timestamp: new Date(year, month),
  });

  props.onChange &&
    state.showDatePicker == false &&
    props.onChange(moment(inputRef.current?.value), inputRef.current?.value);

  let yearMap = [];
  let rangeYearMap = [];

  for (let i = 0; i < 12; i++) {
    yearMap.push(new Date(state.rangeYear, 1).getFullYear() + i - 1);
  }
  for (let i = 0; i < 12; i++) {
    rangeYearMap.push(new Date(state.rangeYear, 1).getFullYear() + i * 10);
  }

  useEffect(() => {
    props.value && setDateToInput(props.value?._d);
    props.defaultValue && setDateToInput(props.defaultValue?._d);
  }, []);

  const showDatePicker = () => {
    setState((pre) => ({ ...pre, showDatePicker: !state.showDatePicker }));
  };

  const isCurrentDay = (day) => {
    return day.timestamp === todayTimestamp;
  };

  const isSelectedDay = (day) => {
    return day.timestamp === state.selectedDay;
  };

  const isSelectedMonth = (month) => {
    const selectedMonth = new Date(state.year, month).getTime();
    const inputedMonth = new Date(state.timestamp).getTime();
    return selectedMonth == inputedMonth;
  };

  const isMonthNow = (month) => {
    let date = new Date();
    let yearNow = date.getFullYear();
    let monthNow = date.getMonth();
    const selectedMonth = new Date(state.year, month).getTime();
    const dateNow = new Date(yearNow, monthNow).getTime();
    return selectedMonth == dateNow;
  };

  const isSelectedYear = (year) => {
    const selectedYear = year;
    const inputedYear = new Date(state.timestamp).getFullYear();
    return selectedYear == inputedYear;
  };

  const isYearNow = (year) => {
    let date = new Date();
    let yearNow = date.getFullYear();
    const selectedYear = year;
    const dateNow = new Date(yearNow, 1).getFullYear();
    return selectedYear == dateNow;
  };

  const getDateFromDateString = (dateValue) => {
    let dateData = dateValue.split("-").map((d) => parseInt(d, 10));
    if (dateData.length < 3) return null;

    let year = dateData[2];
    let month = dateData[1];
    let date = props.type == "month" ? null : dateData[0];
    return { year, month, date };
  };

  const getMonthStr = (month) =>
    monthMap[Math.max(Math.min(11, month), 0)] || "Month";

  const getDateStringFromTimestamp = (timestamp) => {
    let dateObject = new Date(timestamp);
    let month = dateObject.getMonth() + 1;
    let date = dateObject.getDate();
    return (
      (props.type != "day" ? "" : (date < 10 ? "0" + date : date) + "-") +
      (props.type == "year" ? "" : (month < 10 ? "0" + month : month) + "-") +
      dateObject.getFullYear()
    );
  };

  const setDate = (dateData) => {
    let selectedDay = new Date(
      dateData.year,
      dateData.month - 1,
      dateData.date
    ).getTime();
    setState((pre) => ({ ...pre, selectedDay }));
  };

  const updateDateFromInput = () => {
    let dateValue = inputRef.current.value;
    let dateData = getDateFromDateString(dateValue);
    if (dateData !== null) {
      setDate(dateData);
      setState((pre) => ({
        ...pre,
        year: dateData.year,
        month: dateData.month - 1,
        monthDetails: getMonthDetails(dateData.year, dateData.month - 1),
      }));
    }
  };

  const setDateToInput = (timestamp) => {
    setState((pre) => ({ ...pre, timestamp }));
    let dateString = getDateStringFromTimestamp(timestamp);
    inputRef.current.value =
      props.type == "year"
        ? dateString
        : props.type == "month"
        ? moment(new Date(timestamp)).format(props.format || "MM-YYYY")
        : moment(new Date(timestamp)).format(props.format || "DD-MM-YYYY");
  };

  const onDateClick = (day) => {
    setState((pre) => ({
      ...pre,
      selectedDay: day.timestamp,
      showDatePicker: false,
    })),
      setDateToInput(day.timestamp);
  };

  const onMonthClick = (month) => {
    setState((pre) => ({ ...pre, selectedDay: month, showDatePicker: false })),
      setDateToInput(month);
  };

  const onYearClick = (year) => {
    state.status
      ? setState((pre) => ({
          ...pre,
          year: new Date(year).getFullYear(),
          status: false,
          rangeYear: new Date(year).getFullYear(),
        }))
      : setState((pre) => ({
          ...pre,
          year: new Date(year).getFullYear(),
          showDatePicker: false,
        }));
    setDateToInput(year);
  };

  const setYear = (offset, yearParams, monthParams) => {
    let year = yearParams + offset;
    let month = monthParams;
    setState((pre) => ({
      ...pre,
      year,
      monthDetails: getMonthDetails(year, month),
    }));
  };

  const setRangeYear = (offset, rangeYearParams) => {
    let rangeYear = rangeYearParams + offset;
    setState((pre) => ({
      ...pre,
      rangeYear,
      year: rangeYear,
    }));
  };

  const setMonth = (offset, yearParams, monthParams) => {
    let month = monthParams + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    setState((pre) => ({
      ...pre,
      year: yearParams,
      month,
      monthDetails: getMonthDetails(year, month),
    }));
  };

  const setStatus = () => {
    setState((pre) => ({ ...pre, status: !status }));
  };

  /**
   *  Renderers
   */

  const renderCalendar = () => {
    let days = state.monthDetails.map((day, index) => {
      return (
        <div
          className={
            "c-day-container " +
            (day.month !== 0 ? " disabled" : "") +
            (isCurrentDay(day) ? " highlight" : "") +
            (isSelectedDay(day) ? " highlight-green" : "")
          }
          key={index}
        >
          <div className="cdc-day">
            <span onClick={() => onDateClick(day)}>{day.date}</span>
          </div>
        </div>
      );
    });

    return (
      <div className="c-container">
        {props.type == "day" && (
          <div className="cc-head">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => (
              <div key={i} className="cch-name">
                {d}
              </div>
            ))}
          </div>
        )}

        {props?.type == "month" ? (
          monthMap.map((item, index) => (
            <div
              className={
                "cdc-month" +
                (isSelectedMonth(index)
                  ? "-highlight-green"
                  : "" + (isMonthNow(index) ? "-monthNow" : ""))
              }
            >
              <span
                onClick={() =>
                  onMonthClick(new Date(state.year, index).getTime())
                }
              >
                {item}
              </span>
            </div>
          ))
        ) : props?.type == "year" ? (
          (state.status ? rangeYearMap : yearMap).map((year, index) => (
            <div
              className={
                "cdc-year" +
                (isSelectedYear(year) ? "-highlight-green" : "") +
                (isYearNow(year) ? "-yearNow" : "")
              }
            >
              <span
                onClick={() => {
                  onYearClick(new Date(year, 1).getTime());
                }}
              >
                {state.status ? `${year} - ${year + 9}` : year}
              </span>
            </div>
          ))
        ) : (
          <div className="cc-body">{days}</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="MyDatePicker">
        <div className="mdp-input" onClick={() => showDatePicker()}>
          <input
            style={
              props.disabled && {
                backgroundColor: "#f0f0f0",
                cursor: "not-allowed",
              }
            }
            onChange={updateDateFromInput}
            ref={inputRef}
            placeholder={
              props.type == "year"
                ? "Select Year"
                : props.type == "month"
                ? "Select Month"
                : "Select Day"
            }
          />
        </div>
        {state.showDatePicker && !props.value ? (
          <div className="mdp-container">
            <div className="mdpc-head">
              <div className="mdpch-button">
                <div
                  className="mdpchb-inner"
                  onClick={() =>
                    props.type == "year"
                      ? setRangeYear(state.status ? -100 : -10, state.rangeYear)
                      : setYear(-1, state.year, state.month)
                  }
                >
                  <span className="mdpchbi-left-arrows"></span>
                </div>
              </div>
              {props.type == "day" && (
                <div className="mdpch-button">
                  <div
                    className="mdpchb-inner"
                    onClick={() => setMonth(-1, state.year, state.month)}
                  >
                    <span className="mdpchbi-left-arrow"></span>
                  </div>
                </div>
              )}
              <div className="mdpch-container">
                <div
                  className="mdpchc-year"
                  onClick={() => {
                    setStatus();
                  }}
                >
                  {props.type == "year"
                    ? `${state.status ? state.year : state.rangeYear} - ${
                        state.status ? state.year + 9 : state.rangeYear + 9
                      }`
                    : state.year}
                </div>
                {props.type == "day" && (
                  <div className="mdpchc-month">{getMonthStr(state.month)}</div>
                )}
              </div>

              {props.type == "day" && (
                <div className="mdpch-button">
                  <div
                    className="mdpchb-inner"
                    onClick={() => setMonth(1, state.year, state.month)}
                  >
                    <span className="mdpchbi-right-arrow"></span>
                  </div>
                </div>
              )}

              <div
                className="mdpch-button"
                onClick={() =>
                  props.type == "year"
                    ? setRangeYear(state.status ? 100 : 10, state.rangeYear)
                    : setYear(-1, state.year, state.month)
                }
              >
                <div className="mdpchb-inner">
                  <span className="mdpchbi-right-arrows"></span>
                </div>
              </div>
            </div>
            <div className="mdpc-body">{renderCalendar()}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TimePicker;
