"use client";

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div></div>
//   );
// }
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  Switch,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

const people = [
  {
    email: "lindsay.walton@example.com",
    number: "+216 58609473",
    from: "09:00",
    to: "17:00",
    type: "L1",
  },
  {
    email: "jhondoe@email.com",
    number: "+216 55509473",
    from: "17:00",
    to: "20:00",
    type: "L2",
  },
  {
    email: "helloWorld@email.com",
    number: "+216 55509473",
    from: "17:00",
    to: "20:00",
    type: "L1",
  },
  // More people...
];

const utcOptions = [
  "UTC-12:00",
  "UTC-11:00",
  "UTC-10:00",
  "UTC-09:00",
  "UTC-08:00",
  "UTC-07:00",
  "UTC-06:00",
  "UTC-05:00",
  "UTC-04:00",
  "UTC-03:00",
  "UTC-02:00",
  "UTC-01:00",
  "UTC+00:00",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+04:00",
  "UTC+05:00",
  "UTC+06:00",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+09:00",
  "UTC+10:00",
  "UTC+11:00",
  "UTC+12:00",
  "UTC+13:00",
  "UTC+14:00",
];

const escaltions = ["L1", "L2"];

interface SupportRow {
  // id: number;
  phoneCode: string;
  email: string;
  escalation: string;
  phoneNumber: string;
  fromTime: string;
  toTime: string;
  utc: string;
}

function FormModal({ addUser, controlModal, isEdit, editUser, user }) {
  console.log(user);
  // const [editingRow, setEditingRow] = useState<SupportRow | null>({
  //   // id: 2,
  //   email: "",
  //   escalation: "L1",
  //   phoneCode: "",
  //   phoneNumber: "",
  //   fromTime: "",
  //   toTime: "",
  //   utc: "UTC+00:00",
  // });

  // email: "jhondoe@email.com",
  // number: "+216 55509473",
  // from: "17:00",
  // to: "20:00",
  // type: "L2",
  const [editingRow, setEditingRow] = useState<SupportRow | null>(() => {
    if (isEdit)
      return {
        email: user.email,
        escalation: user.type,
        phoneCode: "852",
        phoneNumber: user.number,
        fromTime: user.from,
        toTime: user.to,
        utc: "UTC+00:00",
      };
    return {
      // id: 2,
      email: "",
      escalation: "L1",
      phoneCode: "",
      phoneNumber: "",
      fromTime: "",
      toTime: "",
      utc: "UTC+00:00",
    };
  });
  const [errors, setErrors] = useState({
    email: "",
    escalation: "",
    phoneCode: "",
    phoneNumber: "",
    fromTime: "",
    toTime: "",
    utc: "",
  });
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      escalation: "",
      phoneCode: "",
      phoneNumber: "",
      fromTime: "",
      toTime: "",
      utc: "",
    };

    if (!editingRow?.phoneCode.trim()) {
      newErrors.phoneCode = "Phone code is required";
      isValid = false;
    }

    if (!editingRow?.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }

    if (!editingRow?.fromTime) {
      newErrors.fromTime = "From time is required";
      isValid = false;
    }

    if (!editingRow?.toTime) {
      newErrors.toTime = "To time is required";
      isValid = false;
    }

    if (!editingRow?.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (editingRow?.email.trim() && !editingRow.email.endsWith("@clsa.com")) {
      newErrors.email = "CLSA Email is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  return (
    editingRow && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg w-96">
          <h3 className="text-lg font-semibold mb-4 text-[rgb(0,0,99)]">
            Edit Support Contact
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* email input */}
              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    defaultValue={isEdit ? user.email : ""}
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) =>
                      setEditingRow({
                        ...editingRow,
                        email: e.target.value,
                      })
                    }
                    placeholder="you@example.com"
                    aria-invalid="true"
                    aria-describedby="email-error"
                    className={`block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ${
                      errors.email
                        ? "text-red-900  ring-red-300 placeholder:text-red-300 focus:ring-red-500"
                        : ""
                    }
                       focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`}
                  />
                  {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-red-500"
                    />
                  </div> */}
                </div>
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* esclation here */}
              <div className="col-span-2">
                <Listbox
                  value={editingRow.escalation}
                  onChange={(e) =>
                    setEditingRow({
                      ...editingRow,
                      escalation: e,
                    })
                  }
                >
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Escalation Level
                  </Label>
                  <div className="relative mt-2">
                    <ListboxButton
                      className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                    >
                      <span className="block truncate">
                        {editingRow.escalation}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400"
                        />
                      </span>
                    </ListboxButton>

                    <ListboxOptions
                      transition
                      className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                      {escaltions.map((type) => (
                        <ListboxOption
                          key={type}
                          value={type}
                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white"
                        >
                          <span className="block truncate font-normal group-data-[selected]:font-semibold">
                            {type}
                          </span>

                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>
              <div className="col-span-2 grid grid-cols-3 gap-2">
                <div>
                  <label
                    htmlFor="phoneCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Code
                  </label>
                  <input
                    id="phoneCode"
                    value={editingRow.phoneCode}
                    onChange={(e) =>
                      setEditingRow({
                        ...editingRow,
                        phoneCode: e.target.value,
                      })
                    }
                    className={`text-gray-900 w-full px-3 py-1.5 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ${
                      errors.phoneCode ? "border-red-500" : ""
                    } focus:outline-none focus:ring-2 ring-gray-300`}
                  />
                  {errors.phoneCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneCode}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    value={editingRow.phoneNumber}
                    onChange={(e) =>
                      setEditingRow({
                        ...editingRow,
                        phoneNumber: e.target.value,
                      })
                    }
                    className={`text-gray-900 w-full px-3 py-1.5 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ${
                      errors.phoneCode ? "border-red-500" : ""
                    } focus:outline-none focus:ring-2 ring-gray-300`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="fromTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  From Time
                </label>
                <input
                  id="fromTime"
                  type="time"
                  value={editingRow.fromTime}
                  onChange={(e) =>
                    setEditingRow({ ...editingRow, fromTime: e.target.value })
                  }
                  className={`text-gray-900 w-full px-3 py-1.5 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ${
                    errors.phoneCode ? "border-red-500" : ""
                  } focus:outline-none focus:ring-2 ring-gray-300`}
                />
                {errors.fromTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.fromTime}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="toTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  To Time
                </label>
                <input
                  id="toTime"
                  type="time"
                  value={editingRow.toTime}
                  onChange={(e) =>
                    setEditingRow({ ...editingRow, toTime: e.target.value })
                  }
                  className={`text-gray-900 w-full px-3 py-1.5 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ${
                    errors.phoneCode ? "border-red-500" : ""
                  } focus:outline-none focus:ring-2 ring-gray-300`}
                />
                {errors.toTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.toTime}</p>
                )}
              </div>
              <div className="col-span-2">
                <Listbox
                  value={editingRow.utc}
                  onChange={(e) => {
                    console.log(e);
                    setEditingRow({ ...editingRow, utc: e });
                  }}
                >
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </Label>
                  <div className="relative mt-2">
                    <ListboxButton
                      className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset
                     ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                    >
                      <span className="block truncate">{editingRow.utc}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400"
                        />
                      </span>
                    </ListboxButton>

                    <ListboxOptions
                      transition
                      className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 
                      text-base shadow-lg ring-1 ring-black ring-opacity-5 
                      focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                      {utcOptions.map((utc) => (
                        <ListboxOption
                          key={utc}
                          value={utc}
                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white"
                        >
                          <span className="block truncate font-normal group-data-[selected]:font-semibold">
                            {utc}
                          </span>

                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => {
                setEditingRow(null);
                controlModal(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (validateForm()) {
                  // const tableId = tables.find((table) =>
                  //   table.rows.some((row) => row.id === editingRow.id)
                  // )?.id;
                  // if (tableId) {
                  //   updateRow(tableId, editingRow.id, editingRow);
                  // }
                  addUser((currentUsers: any) => {
                    return [
                      ...currentUsers,
                      {
                        email: editingRow.email,
                        number: `+${editingRow.phoneCode} ${editingRow.phoneNumber}`,
                        from: `${editingRow.fromTime}`,
                        to: `${editingRow.toTime}`,
                        type: editingRow.escalation,
                      },
                    ];
                  });
                  controlModal(false);
                }
              }}
              className="px-4 py-2 bg-[rgb(0,0,99)] text-white rounded-md text-sm font-medium hover:bg-[rgb(0,0,150)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
}

function Toggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 data-[checked]:bg-blue-600"
    >
      <span className="sr-only">Use setting</span>
      <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
        >
          {/* <svg
            fill="none"
            viewBox="0 0 12 12"
            className="h-3 w-3 text-gray-400"
          >
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
          <EnvelopeIcon className="size-3 text-gray-400" />
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
        >
          {/* <svg
            fill="currentColor"
            viewBox="0 0 12 12"
            className="h-3 w-3 text-blue-600"
          >
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg> */}
          <PhoneIcon className="size-3 text-blue-600" />
        </span>
      </span>
    </Switch>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([...people]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="sm:flex sm:items-center justify-between">
        {/* <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div> */}
        <Toggle />
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="flex flex-row w-32 justify-center items-center  rounded-md bg-blue-600  py-2 text-center text-sm font-medium 
            text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => {
              console.log("heint");
              setAddUser(true);
            }}
          >
            <PlusIcon className="size-4 mr-2"></PlusIcon>
            Add Contact
          </button>
        </div>
      </div>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 rounded-2xl ">
              <thead className="bg-blue-500 ">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 rounded-tl-md "
                  >
                    <a href="#" className="group inline-flex">
                      Email
                      <span className="invisible ml-2 flex-none rounded text-gray-900 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Number
                      <span className="invisible ml-2 flex-none rounded bg-blue-500 text-gray-900 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      From
                      <span className="invisible ml-2 flex-none rounded text-gray-900 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-900 group-hover:visible group-focus:visible"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      To
                      <span className="invisible ml-2 flex-none rounded text-gray-900 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-900 group-hover:visible group-focus:visible"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Type
                      <span className="invisible ml-2 flex-none rounded text-gray-900 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-900 group-hover:visible group-focus:visible"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-0 rounded-tr-md"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 ">
                      {person.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.from}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.to}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.type}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm ">
                      <a
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          console.log("we are going to edit ");
                          setUser({ ...person });
                          setEditUser(true);
                        }}
                      >
                        Edit<span className="sr-only">, {person.number}</span>
                      </a>
                      <a className="pl-2 text-red-600 hover:text-red-900">
                        Delete<span className="sr-only">, {person.number}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <div>
                  <nav
                    aria-label="Pagination"
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                    </a>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      9
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      10
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addUser && (
        <FormModal
          addUser={setUsers}
          controlModal={setAddUser}
          isEdit={false}
        />
      )}
      {editUser && (
        <FormModal
          editUser={setUser}
          user={user}
          controlModal={setEditUser}
          isEdit={true}
        />
      )}
    </div>
  );
}
