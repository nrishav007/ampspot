import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  LandingPage,
  LogIn,
  Register,
  SocialLinks,
  SetUpDjProfile,
  SoundPreference,
  DjDashboard,
  // UserDashboard,
  UserProfile,
  DjUserProfile,
  DjWeek,
  BookingRequest,
  Messages,
  ReviewsRatings,
  Notification,
  // Djs,
  MyDjBookings,
  Transactions,
  UnAuthorized,
  NotFound,
  LandingPage1,
  LandingPage2,
} from "./pages";
import { Layout } from "./layouts";
import ProtectedRoutes from "./helper/ProtectedRoutes";
import { ClipLoader } from "react-spinners";

// lazy loading routes
const LazyUserDashboard = React.lazy(() =>
  import("./pages/dashboards/UserDashboard")
);
const LazyDjs = React.lazy(() => import("./pages/djs/Djs"));

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<ProtectedRoutes />}> */}
        <Route element={<Layout />}>
          {/* Dj routes */}
          <Route element={<ProtectedRoutes userType={"dj"} />}>
            <Route index path="/dj-dashboard" element={<DjDashboard />}></Route>

            <Route path="/Notification" element={<Notification />}></Route>
            <Route path="/dj-transactions" element={<Transactions />}></Route>
            <Route path="/dj-week" element={<DjWeek />}></Route>
            <Route path="/reviews-ratings" element={<ReviewsRatings />}></Route>
            <Route path="/dj-profile" element={<DjUserProfile />}></Route>
          </Route>

          {/* user routes */}
          <Route element={<ProtectedRoutes userType={"user"} />}>
            <Route
              index
              path="/user-dashboard"
              element={
                <React.Suspense
                fallback={
                  <div className="flex justify-center">
                      <ClipLoader />
                    </div>
                  }
                  >
                  <LazyUserDashboard />
                </React.Suspense>
              }
            ></Route>
            <Route
              path="/djs"
              element={
                <React.Suspense
                fallback={
                  <div className="flex justify-center">
                      <ClipLoader />
                    </div>
                  }
                  >
                  <LazyDjs />
                </React.Suspense>
              }
            ></Route>
            <Route
              path="/djs/:id"
              e
              element={
                <React.Suspense
                fallback={
                  <div className="flex justify-center">
                      <ClipLoader />
                    </div>
                  }
                  >
                  <LazyDjs />
                </React.Suspense>
              }
            ></Route>
            <Route path="/my-dj-bookings" element={<MyDjBookings />}></Route>
            <Route path="/transactions" element={<Transactions />}></Route>
            <Route path="/user-profile" element={<UserProfile />}></Route>
          </Route>

          {/* routes belongs to user and dj */}
          <Route path="/messages" element={<Messages />}></Route>
          <Route path="/booking-request" element={<BookingRequest />}></Route>

          {/* handling unappropriate routes */}
          <Route path="/unauthorized" element={<UnAuthorized />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        {/* </Route> */}

        {/* public routes */}
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/social-links" element={<SocialLinks />}></Route>
        <Route path="/sound-preference" element={<SoundPreference />}></Route>
        <Route path="/setup-dj-profile" element={<SetUpDjProfile />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/intro-1" element={<LandingPage1 />}></Route>
        <Route path="/intro-2" element={<LandingPage2 />}></Route>
      </Routes>
    </>
  );
}

export default App;
