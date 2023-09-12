import { SetStateAction } from "react";

export default function Dropdown({
  items,
  label,
  setStatus,
}: {
  items: Array<any>;
  label: string;
  setStatus: React.Dispatch<SetStateAction<any>>;
}) {
  var options = [];
  function changeStatus(e: any) {
    setStatus(e.target.value);
  }

  for (var i = 0; i < items.length; i++) {
    options.push(
      <option value={items[i]} key={i}>
        {items[i]}
      </option>
    );
  }

  return (
    <>
      <label className="mr-1">{label}</label>
      <select name="dropdown" className=" text-center" onChange={changeStatus}>
        {options}
      </select>
    </>
  );
}
