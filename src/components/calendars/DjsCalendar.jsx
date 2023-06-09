import { useState, useEffect } from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { add, format, isSameDay, parseISO, startOfToday } from "date-fns";
import { BookingFormModal } from "../modals";
import Calendar from "./Calendar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DjsCalendar({ djName, djRate }) {
  const today = startOfToday();
  const [isOpen, setIsOpen] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [selectedDay, setSelectedDay] = useState(today);

  const { id } = useParams();

  const { djCalendarList } = useSelector((state) => state.calendarBookingList);
  library.add(faAngleLeft, faAngleRight);

  useEffect(() => {
    if (selectedDay) {
      setEventDate(format(selectedDay, "yyyy-MM-dd"));
    }
  }, [selectedDay, setEventDate]);

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
      if (!djName && Number(djRate) === 0) {
        return;
      }
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

      const isBooked = djCalendarList.some((booking) => {
        return isSameDay(parseISO(booking.date), day);
      });
      if (isStatusOff || isBooked) return;

      setSelectedDay(day);
      setIsOpen(true);
    }
  }
  return (
    <div>
      <div>
        {/* calenddar component */}
        <Calendar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          id={id}
          selectAppropriateDate={selectAppropriateDate}
        />
      </div>
      <BookingFormModal
        setEventDate={setEventDate}
        eventDate={eventDate}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </div>
  );
}
