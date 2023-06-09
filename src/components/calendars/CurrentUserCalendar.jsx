import { useState } from "react";
import { add, format, isSameDay, parseISO, startOfToday } from "date-fns";
import { CurrentUserBookingModal } from "../modals";
import Calendar from "./Calendar";
import { useSelector } from "react-redux";

export default function CurrentUserCalendar() {
  const today = startOfToday();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(today);
  const { user } = useSelector((state) => state.auth);
  const { djCalendarList } = useSelector((state) => state.calendarBookingList);

  function selectAppropriateDate(day) {
    if (
      new Date(
        format(
          add(new Date(), {
            days: 1,
          }),
          "yyyy-MM-dd"
        )
      ) <= new Date(format(day, "yyyy-MM-dd"))
    ) {
      const isStatusDecline = djCalendarList.some((booking) => {
        const res =
          (booking.status === "Decline" || booking.status === "Pending") &&
          isSameDay(parseISO(booking.date), day);
        return res;
      });
      if (isStatusDecline) {
        setSelectedDay(day);
        setIsOpen(true);
        return;
      }
      const isStatusOff = djCalendarList.some((booking) => {
        const res =
          booking.status === "Off" && isSameDay(parseISO(booking.date), day);
        return res;
      });
      if (isStatusOff) {
        setSelectedDay(day);
        setIsOpen(true);
      }
      const isBooked = djCalendarList.some((booking) => {
        return isSameDay(parseISO(booking.date), day);
      });
      if (isBooked) return;
      setSelectedDay(day);
      setIsOpen(true);
    }
  }

  return (
    <div className="rounded-3xl shadow-item-shadow max-2xl:mt-4 w-full min-w-[10.375rem]">
      <div className=" w-[85%] mx-auto mt-[32px] mb-[27px] ">
        {/* calenddar component */}
        <Calendar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          id={user.data.user._id}
          selectAppropriateDate={selectAppropriateDate}
        />
      </div>
      <CurrentUserBookingModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedDay={selectedDay}
      />
    </div>
  );
}
