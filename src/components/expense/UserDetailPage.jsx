import React, { useEffect, useRef, useState } from "react";

const UserDetailsUpdate = () => {
  const nameRef = useRef();
  const urlRef = useRef();
  const [imageSrc, setImageSrc] = useState(""); // State to handle the image source

  const autoGetData = async () => {
    const token = localStorage.getItem("JWTTOKEN");
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAxNRatg_aaFZF_iZMzpdqW0HLlPws8RH8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        data.users.forEach((element) => {
          nameRef.current.value = element.displayName;
          urlRef.current.value = element.photoUrl;
          setImageSrc(element.photoUrl); // Set the image source
        });
      } else {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log("Auto fetch error");
    }
  };

  useEffect(() => {
    autoGetData();
  }, []);

  const updateHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredUrl = urlRef.current.value;
    const token = localStorage.getItem("JWTTOKEN");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAxNRatg_aaFZF_iZMzpdqW0HLlPws8RH8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: enteredName,
            photoUrl: enteredUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setImageSrc(enteredUrl); // Update the image source on successful update
        alert("Wohoo! Your data has been saved.");
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
    } catch (error) {
      console.log("Something went wrong during the update!");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl text-slate-600 p-4 flex-initial">
          Winners never quit, Quitters never win.
        </p>
      </div>
      <hr className="border-gray-300 border-1"></hr>

      <div className="flex justify-center p-10">
        <form>
          <div className="text-xl py-5">Contact Details</div>

          <div className="flex flex-col items-center">
            {/* Circular Image */}
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
              />
            )}

            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              className="border p-2 rounded mb-4 w-full"
            />

            <label htmlFor="url">Photo Profile URL:</label>
            <input
              type="text"
              id="url"
              ref={urlRef}
              className="border p-2 rounded mb-4 w-full"
              onChange={(e) => setImageSrc(e.target.value)} // Update image preview on input
            />
          </div>

          <div className="py-4 text-center">
            <button
              onClick={updateHandler}
              className="bg-red-400 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsUpdate;
