import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RegisterForm } from "../../../components";

const Register = () => {
  useEffect(() => {
    document.title = "DJ-register";
  }, []);

  return (
    <main className="bg-background-register font-roboto  bg-cover bg-center bg-no-repeat h-screen w-full text-white">
      <div className=" flex justify-center  flex-col items-center relative h-full">
        {/* Transparent card */}
        <div
          className="w-[57.688rem] h-[27.625rem] max-lg:w-[30rem] max-lg:h-[40rem] max-sm:w-[100%] max-sm:h-[40%]
           border border-[#FFFFFF] rounded-[76px] relative bg-trans-card"
        >
          <div
            className="flex   max-sm:hidden flex-col justify-center max-lg:relative  
           h-full text-black-dark ml-[3.563rem] flex-wrap"
          >
            <h2
              className="leading-[2.7rem]  max-lg:absolute  bottom-[1rem] font-bold w-[max-content] 
          max-sm:text-[2rem] text-[2.5rem] "
            >
              <span>Have</span> <span className="block">An Account?</span>
            </h2>
            <span className="leading-[3rem] max-lg:absolute bottom-[1rem] left-[15rem] w-[max-content]">
              <Link
                to="/login"
                className="border font-semibold transition-colors ease-in duration-200 px-2 py-1 w-full m-auto rounded hover:text-white
               hover:bg-black-darkest hover:border-black-darkest"
              >
                Sign In
              </Link>
            </span>
          </div>

          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

// const Modal = ({ emailForVerification, setIsShow, setShowModal }) => {
//   // const [showModal, setShowModal] = useState(true);

//   const handleModalForSkip = () => {
//     setShowModal(false);
//     // setFlag(false);
//   };
//   const handleModalForVerification = () => {
//     setIsShow(4);
//     setShowModal(false);
//     // setFlag(false);
//   };
//   return (
//     <>
//       {/* {showModal ? ( */}
//       <div className="absolute">
//         <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed bg-trans-card inset-0 z-50 outline-none focus:outline-none">
//           <div className=" w-[20rem] max-sm:w-[95%]  my-6 mx-auto absolute top-0 max-w-3xl">
//             {/*content*/}
//             <div className="border-0 rounded-lg   shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//               <div className="relative  flex-auto border-b-2 border-gray mb-4 ">
//                 <p className="my-4  text-slate-500 text-center text-xl font-bold leading-relaxed text-black-darkest">
//                   verification link has been {emailForVerification}
//                 </p>
//               </div>
//               <div className="w-full mb-4 flex px-1 justify-between">
//                 <button
//                   onClick={() => handleModalForSkip()}
//                   className="h-[3.125rem] w-full bg-white text-black-darkest rounded-3xl text-center text-black "
//                 >
//                   Skip
//                 </button>
//                 <button
//                   onClick={() => handleModalForVerification()}
//                   className="h-[3.125rem] font-bold rounded-3xl w-full bg-blue
//                 text-center  text-white"
//                 >
//                   verify
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//       </div>
//       {/* ) : null} */}
//     </>
//   );
// };

export default Register;
