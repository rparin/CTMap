import { SetStateAction } from "react";

export default function Dropdown({
  items,
  label,
  setStatus,
  outerStyle,
  innerStyle,
}: {
  items: Array<any>;
  label: string;
  setStatus: React.Dispatch<SetStateAction<any>>;
  outerStyle?: string;
  innerStyle?: string;
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
      <section className={outerStyle}>
        <label>{label}</label>
        <select name="dropdown" className={innerStyle} onChange={changeStatus}>
          {options}
        </select>
      </section>
    </>
  );
}
