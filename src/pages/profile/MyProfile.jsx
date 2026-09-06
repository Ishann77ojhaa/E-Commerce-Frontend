import { useState } from "react";

export default function MyProfile() {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your account information
          </p>
        </div>


        {/* Profile Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">

          {/* Top Section */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gray-200">
              <span className="text-3xl font-semibold text-gray-500">
                I
              </span>
            </div>


            {/* Name */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Ishan Ojha
              </h2>

              <p className="text-gray-500">
                ishan@gmail.com
              </p>
            </div>

          </div>


          {/* Divider */}
          <div className="my-8 border-t"></div>


          {/* Personal Information */}
          <div>

            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              Personal Information
            </h3>


            <div className="grid gap-6 sm:grid-cols-2">

              {/* Name */}
              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  Ishan Ojha
                </p>
              </div>


              {/* Email */}
              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  ishan@gmail.com
                </p>
              </div>


              {/* Phone */}
              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  +977 98XXXXXXXX
                </p>
              </div>

            </div>

          </div>


          {/* Edit Button */}
          <div className="mt-8 flex justify-end">

            <button
              onClick={() => setEditMode(true)}
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Edit Profile
            </button>

          </div>

        </div>


        {/* Security */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="text-lg font-semibold text-gray-900">
            Account Security
          </h3>

          <div className="mt-5 flex items-center justify-between gap-4">

            <div>
              <p className="font-medium text-gray-900">
                Password
              </p>

              <p className="text-sm text-gray-500">
                Change your account password
              </p>
            </div>

            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
              Change Password
            </button>

          </div>

        </div>


        {/* Danger Zone */}
        <div className="mt-6 rounded-2xl border border-red-200 bg-white p-6">

          <h3 className="text-lg font-semibold text-red-600">
            Danger Zone
          </h3>

          <div className="mt-5 flex items-center justify-between gap-4">

            <div>
              <p className="font-medium text-gray-900">
                Delete Account
              </p>

              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>

            <button className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
              Delete Account
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}