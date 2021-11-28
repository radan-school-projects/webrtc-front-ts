import React from "react";

export interface FormBaseProps {
  labelText: string;
  name: string;
  buttonText: string;
  placeholder: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  buttonAction: React.MouseEventHandler<HTMLButtonElement>;
  isUserForm?: boolean;
  generateUsername?: () => void;
}

export const FormBase = ({
  // name,
  // textOnTop,
  // title,
  // textOnBottom,
  labelText,
  name,
  buttonText,
  placeholder,
  handleInputChange,
  buttonAction,
  isUserForm = true,
  generateUsername,
}: FormBaseProps) => (
  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
        <div>
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              {labelText}
              <div className="mt-1">
                <input onChange={handleInputChange} value={name} className="w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" type="text" name="username" placeholder={placeholder} id="userId" />
              </div>
            </label>
          </div>
        </div>

        {(isUserForm)
          ? (
            <div>
              <button onClick={generateUsername} type="button" className="w-full flex justify-center py-2 px-4 border border-indigo-700 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Generate a username
              </button>
            </div>
          ) : null}

        <div>
          <button onClick={buttonAction} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{buttonText}</button>
        </div>
      </form>
    </div>
  </div>
);
