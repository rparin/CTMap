export default function Loader ({
    loader,
  }: {
    loader: boolean;
  }
) {
    return <>
        {
            loader==true &&
            <div className="fixed flex h-screen w-screen bg-black bg-opacity-50">
                <div className="flex space-x-4 items-center justify-center m-auto h-fit w-fit p-10 text-black bg-slate-200 rounded-md">
                    
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-700 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading results...
                        </span>
                    </div>
                    <b>Loading results...</b>
                </div>
            </div>
        }
    </>;
}