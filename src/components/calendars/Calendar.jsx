import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  isAfter,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { getCalendarForDjProfile } from "../../reducers/calendarBookingSlice";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GrLocation } from "react-icons/gr";
import { BiTime } from "react-icons/bi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TooltipItem = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0px 6px 13px 1px rgba(0, 0, 0, 0.2)",
    minWidth: "260px",
  },
}));

export default function Calendar({
  isOpen,
  selectedDay,
  id,
  selectAppropriateDate,
}) {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [showPrevBtn, setShowprevBtn] = useState(false);
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { djCalendarList } = useSelector((state) => state.calendarBookingList);
  library.add(faAngleLeft, faAngleRight);

  // memoizing the days of the entire month
  const days = useMemo(() => {
    return eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  useEffect(() => {
    if (user) {
      dispatch(
        getCalendarForDjProfile({
          currentUserId: id,
          accessToken: user.data.token,
        })
      );
    }
  }, [user, dispatch, isOpen, id]);

  useEffect(() => {
    if (
      firstDayCurrentMonth.getFullYear() ===
        new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).getFullYear() &&
      firstDayCurrentMonth.getMonth() ===
        new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).getMonth()
    ) {
      setShowNextBtn(true);
    } else if (
      firstDayCurrentMonth.getFullYear() ===
        new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        ).getFullYear() &&
      firstDayCurrentMonth.getMonth() ===
        new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        ).getMonth()
    ) {
      setShowprevBtn(true);
    } else {
      setShowNextBtn(false);
      setShowprevBtn(false);
    }
  }, [currentMonth, firstDayCurrentMonth]);

  function previousMonth() {
    let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="md:grid">
      <div className="">
        <div className="flex justify-between pb-[16px]">
          <div className="flex">
            <button
              type="button"
              onClick={previousMonth}
              className={`outline-none ${
                showPrevBtn ? "invisible" : "visible"
              }`}
            >
              <span className="sr-only">Previous month</span>
              <FontAwesomeIcon icon={faAngleLeft} className="h-5 w-5" />
            </button>
            <h2 className=" font-inter text-[19px] font-semibold">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={nextMonth}
              type="button"
              className={`outline-none ${
                showNextBtn ? "invisible" : "visible"
              }`}
            >
              <span className="sr-only">Next month</span>
              <FontAwesomeIcon icon={faAngleRight} className="h-5 w-5" />
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="text-[9px] flex items-center space-x-2">
              <span className="bg-mid-blue inline-block rounded-sm w-[13px] h-[10px]"></span>
              <span className="font-semibold">Open</span>
            </div>
            <div className="text-[9px] flex items-center space-x-2">
              <span className=" inline-block w-[13px] h-[10px]">
                <img
                  src="../assets/images/mount.jpg"
                  alt="booked"
                  className="object-cover rounded-sm "
                />
              </span>
              <span className="font-semibold">Booked</span>
            </div>
            <div className="text-[9px] flex items-center space-x-2">
              <span className="bg-gray-light inline-block rounded-sm w-[13px] h-[10px]"></span>
              <span className="font-semibold">OFF</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 font-inter text-black-darkest font-semibold text-xs ">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="mt-2 grid gap-1 grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "relative"
              )}
            >
              <TooltipContainer
                day={day}
                djCalendarList={djCalendarList}
                selectAppropriateDate={selectAppropriateDate}
                selectedDay={selectedDay}
                firstDayCurrentMonth={firstDayCurrentMonth}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TooltipContainer = ({
  day,
  djCalendarList,
  selectAppropriateDate,
  selectedDay,
  firstDayCurrentMonth,
}) => {
  const [showTool, setShowTool] = useState(false);

  return (
    <TooltipItem
      open={showTool}
      title={<CalendarTooltip day={day} />}
      onOpen={() => {
        const res = djCalendarList.some((booking) => {
          const result =
            booking.status === "Accepted" &&
            isSameDay(parseISO(booking.date), day) &&
            !isAfter(new Date(), day);
          return result;
        });
        setShowTool(res);
      }}
      onClose={() => setShowTool(false)}
    >
      <button
        type="button"
        onClick={() => selectAppropriateDate(day)}
        className={classNames(
          isEqual(day, selectedDay) && "text-black-darkest",
          !isEqual(day, selectedDay) && isToday(day) && "text-red-light",
          !isEqual(day, selectedDay) &&
            !isToday(day) &&
            isSameMonth(day, firstDayCurrentMonth) &&
            "text-gray-light",
          !isEqual(day, selectedDay) &&
            !isToday(day) &&
            !isSameMonth(day, firstDayCurrentMonth) &&
            "text-gray-dark",
          isEqual(day, selectedDay) && isToday(day) && "bg-red-light",
          isEqual(day, selectedDay) && !isToday(day) && "bg-gray-light",
          !isEqual(day, selectedDay) && "hover:bg-gray-dark",
          (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
          "rounded-xl"
        )}
      >
        {isAfter(new Date(), day) ? (
          <div className="relative">
            <div className="absolute left-0 right-0 top-[25%] text-black-darkest">
              {format(day, "dd")}
            </div>
            <img
              src="../assets/images/gray.png"
              alt="day"
              className="w-[54px] h-[41px] rounded-xl"
            />
          </div>
        ) : djCalendarList.some((booking) => {
            if (isAfter(new Date(), day)) return true;
            const result =
              (booking.status === "Off" &&
                isSameDay(parseISO(booking.date), day)) ||
              isAfter(new Date(), day);
            return result;
          }) ? (
          <div className="relative">
            <div className="absolute left-0 right-0 top-[25%] text-black-darkest">
              {format(day, "dd")}
            </div>
            <img
              src="../assets/images/gray.png"
              alt="day"
              className="w-[54px] h-[41px] rounded-xl"
            />
          </div>
        ) : djCalendarList &&
          djCalendarList.some((booking) => {
            const result =
              booking.status === "Accepted" &&
              isSameDay(parseISO(booking.date), day);
            return result;
          }) ? (
          <div className="relative">
            <div className="absolute left-0 right-0 top-[25%] text-white">
              {format(day, "dd")}
            </div>
            <img
              src="../assets/images/mount.jpg"
              alt="day"
              className="w-[54px] h-[41px] rounded-xl"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-0 right-0 top-[25%] text-white">
              {format(day, "dd")}
            </div>
            <img
              src="../assets/images/blue.png"
              alt="day"
              className="w-[54px] h-[41px] rounded-xl"
            />
          </div>
        )}
      </button>
    </TooltipItem>
  );
};

const CalendarTooltip = ({ day }) => {
  const { djCalendarList } = useSelector((state) => state.calendarBookingList);
  // console.log(djCalendarList);
  let location = "";
  let eventName = "";
  let time = "";
  let duration = "";
  djCalendarList.some((djEvent) => {
    const locationResult =
      djEvent?.location && isSameDay(parseISO(djEvent.date), day);
    const eventResult =
      djEvent?.event && isSameDay(parseISO(djEvent.date), day);

    const timeResult = djEvent?.time && isSameDay(parseISO(djEvent.date), day);
    const durationResult =
      djEvent?.eventDuration && isSameDay(parseISO(djEvent.date), day);
    time = timeResult ? djEvent.time : "00:00 PM";
    duration = durationResult ? djEvent.eventDuration : "0";
    // console.log("duration", duration);
    const eventTotalTime =
      parseInt(time.split(" ")[0].split(":")[0]) + parseInt(duration);
    let hours = eventTotalTime > 12 ? eventTotalTime - 12 : eventTotalTime;
    // console.log("hours", hours);
    let am_pm = hours <= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    // const hrs = time.split(" ")[0].split(":")[0];
    duration = hours + ":" + time.split(" ")[0].split(":")[1] + " " + am_pm;
    // console.log(eventTotalTime);
    location = locationResult ? djEvent.location : "No Location";
    eventName = eventResult ? djEvent.event : "No  Name";
    return locationResult;
  });

  return (
    <>
      <div className="bg-white p-[1rem]">
        <h3 className="font-inter text-[28px] text-black-darkest">
          {format(day, "MMM dd")}th
        </h3>
        <h1 className="font-inter text-[38px] text-black-darkest leading-none">
          {`${
            eventName.length > 10 ? `${eventName.substr(0, 10)}...` : eventName
          }`}
        </h1>
        <p className="font-inter text-sm text-gray">showcase</p>
        <div className="flex items-center">
          <GrLocation className="w-[1rem] h-[1rem]" />
          <p className="ml-[12px] font-inter text-[20px] text-black-darkest">
            {/* 14 Thermas St */}
            {`${
              location.length > 10 ? `${location.substr(0, 10)}...` : location
            }`}
          </p>
        </div>
        <div className="flex items-center">
          <BiTime className="w-[1rem] h-[1rem] text-black-darkest" />
          <p className="ml-[12px] font-inter text-[20px] text-black-darkest">
            {time}
            {/* - {duration} */}
          </p>
        </div>
      </div>
    </>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
