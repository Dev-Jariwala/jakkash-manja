import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const OptionButton = ({ selectedFilters, setSelectedFilters, filters }) => {
  const handleFilterToggle = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span className="material-icons">tune</span>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {filters?.length > 0 &&
                filters.map((filter, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <label className="flex items-center px-4 py-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(filter.value)}
                          onChange={() => handleFilterToggle(filter.value)}
                          className="mr-2"
                        />
                        {filter.title}
                      </label>
                    )}
                  </Menu.Item>
                ))}
              {/* Additional menu items for brand names, sorting, and category can be added here */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default OptionButton;
