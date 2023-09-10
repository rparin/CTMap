export default function Dropdown(
{
    setPageSize
}:{
    setPageSize: React.Dispatch<React.SetStateAction<string>>
}) {
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(event.target.value);
    };
    return (
        <section className="flex items-center justify-end p-3 gap-2 bg-blue-400/20 rounded-md mb-2">
            <label htmlFor="page-options">Page Size</label>
            <select
                id="page-options"
                onChange={(event) => selectChange(event)}
                className="w-auto bg-slate-200 border border-slate-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1">
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
            </select>
        </section>
    );
  }