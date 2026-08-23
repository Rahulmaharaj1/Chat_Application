// Import React and useState Hook.
// useState is used to store and update form data.
import React, { useState } from 'react'

// Import Link for navigation using links.
// Import useNavigate for programmatic navigation after signup.
import { Link, useNavigate } from 'react-router-dom';

// Import Axios to make HTTP requests to the backend.
import axios from "axios";

// Import Toast library to show success and error notifications.
import toast from "react-hot-toast";

// Import Backend Base URL.
import { BASE_URL } from '..';


// =======================================================
// Signup Component
// =======================================================

const Signup = () => {

  // Store all signup form values inside one state object.
  const [user, setUser] = useState({

    // User's full name.
    fullName: "",

    // Username for login.
    username: "",

    // User password.
    password: "",

    // Confirm password.
    confirmPassword: "",

    // Selected gender.
    gender: "",

  });

  // Hook used to navigate to another page.
  const navigate = useNavigate();


  // =======================================================
  // Handle Gender Selection
  // =======================================================

  // Update gender when user clicks Male/Female checkbox.
  const handleCheckbox = (gender) => {

    // Copy old object and change only gender.
    setUser({

      ...user,

      gender

    });

  };


  // =======================================================
  // Signup Form Submit
  // =======================================================

  const onSubmitHandler = async (e) => {

    // Prevent page refresh after clicking Submit.
    e.preventDefault();

    try {

      // Send signup request to backend.
      const res = await axios.post(

        // Backend API URL.
        `${BASE_URL}/api/v1/user/register`,

        // Request Body
        user,

        {

          // Request headers.
          headers: {

            // Send JSON data.
            'Content-Type': 'application/json'

          },

          // Allow cookies.
          withCredentials: true

        }

      );

      // If registration is successful.
      if (res.data.success) {

        // Redirect user to Login page.
        navigate("/login");

        // Display success message.
        toast.success(res.data.message);

      }

    }

    catch (error) {

      // Display error message received from backend.
      toast.error(error.response.data.message);

      // Print error in console.
      console.log(error);

    }


    // Clear all input fields after request.
    setUser({

      fullName: "",

      username: "",

      password: "",

      confirmPassword: "",

      gender: "",

    });

  };


  // =======================================================
  // JSX UI
  // =======================================================

  return (

    // Main container.
    <div className="min-w-96 mx-auto">

      {/* Signup Card */}

      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>

        {/* Page Heading */}

        <h1 className='text-3xl font-bold text-center'>

          Signup

        </h1>


        {/* Signup Form */}

        <form onSubmit={onSubmitHandler} action="">


          {/* Full Name Input */}

          <div>

            <label className='label p-2'>

              <span className='text-base label-text'>

                Full Name

              </span>

            </label>

            <input

              // Input value from state.
              value={user.fullName}

              // Update fullName whenever user types.
              onChange={(e) =>

                setUser({

                  ...user,

                  fullName: e.target.value

                })

              }

              className='w-full input input-bordered h-10'

              type="text"

              placeholder='Full Name'

            />

          </div>


          {/* Username Input */}

          <div>

            <label className='label p-2'>

              <span className='text-base label-text'>

                Username

              </span>

            </label>

            <input

              value={user.username}

              onChange={(e) =>

                setUser({

                  ...user,

                  username: e.target.value

                })

              }

              className='w-full input input-bordered h-10'

              type="text"

              placeholder='Username'

            />

          </div>


          {/* Password Input */}

          <div>

            <label className='label p-2'>

              <span className='text-base label-text'>

                Password

              </span>

            </label>

            <input

              value={user.password}

              onChange={(e) =>

                setUser({

                  ...user,

                  password: e.target.value

                })

              }

              className='w-full input input-bordered h-10'

              type="password"

              placeholder='Password'

            />

          </div>


          {/* Confirm Password Input */}

          <div>

            <label className='label p-2'>

              <span className='text-base label-text'>

                Confirm Password

              </span>

            </label>

            <input

              value={user.confirmPassword}

              onChange={(e) =>

                setUser({

                  ...user,

                  confirmPassword: e.target.value

                })

              }

              className='w-full input input-bordered h-10'

              type="password"

              placeholder='Confirm Password'

            />

          </div>


          {/* Gender Selection */}

          <div className='flex items-center my-4'>

            {/* Male */}

            <div className='flex items-center'>

              <p>Male</p>

              <input

                type="checkbox"

                // Checkbox checked if gender is male.
                checked={user.gender === "male"}

                // Update gender.
                onChange={() => handleCheckbox("male")}

                defaultChecked

                className="checkbox mx-2"

              />

            </div>


            {/* Female */}

            <div className='flex items-center'>

              <p>Female</p>

              <input

                type="checkbox"

                // Checkbox checked if gender is female.
                checked={user.gender === "female"}

                // Update gender.
                onChange={() => handleCheckbox("female")}

                defaultChecked

                className="checkbox mx-2"

              />

            </div>

          </div>


          {/* Login Link */}

          <p className='text-center my-2'>

            Already have an account?

            <Link to="/login">

              login

            </Link>

          </p>


          {/* Submit Button */}

          <div>

            <button

              type='submit'

              className='btn btn-block btn-sm mt-2 border border-slate-700'

            >

              Signup

            </button>

          </div>

        </form>

      </div>

    </div>

  )

}

// Export Signup Component.
export default Signup;