import React from "react";

const Row = ({ showIndex, row, rowIndex, actions, mainKeys }) => {
  const renderRowData = () => {
    return mainKeys.map((mainKey, index) => {
      return (
        <td key={index} className="px-4 py-3 font-medium">
          {row[mainKey]}
        </td>
      );
    });
  };

  return (
    <>
      {showIndex && <td className="px-4 py-3 font-medium">{rowIndex + 1}</td>}
      {renderRowData()}
      <td className="px-4 py-3">
        <div className="">
          {actions?.length > 0 &&
            actions.map((action, index) => (
              <button
                key={index}
                className={action.classNames.join(" ")}
                onClick={(e) => action.onSmash(e, row._id)}
              >
                {action.button}
              </button>
            ))}
        </div>
      </td>
    </>
  );
};

export default Row;
