import { useState } from "react";
import LocationSearch from "../LocationSearch";
import Dropdown from "../Dropdown";

export default function Filters({
  setFilter,
  place,
  setPlace,
}: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  place: {} | null;
  setPlace: React.Dispatch<React.SetStateAction<{} | null>>;
}) {
  // ELIGIBILITY CRITERION
  const [sex, setSex] = useState(""); //blank = all
  const [isCustom, setIsCustom] = useState(false);
  const [ageRange, setAgeRange] = useState({
    child: false,
    adult: false,
    older_adult: false,
  });
  const [customRange, setCustomAgeRange] = useState({ min: null, max: null });
  const [acceptsVolunteers, setAcceptsVolunteers] = useState("");
  const [location, setLocation] = useState({
    city: false,
    zip: false,
  });
  const [distance, setDis] = useState<string | null>(null);

  const toggleIsCustom = (isCustom: boolean) => {
    setIsCustom(isCustom);
    if (!isCustom) {
      setCustomAgeRange({ min: null, max: null });
    } else {
      setAgeRange({ child: false, adult: false, older_adult: false });
    }
  };

  const setValue = (
    e: any,
    jObj: any,
    type: any,
    jValue: any,
    value: string
  ) => {
    if (e.target.checked) {
      jObj({
        ...type,
        [jValue]: value,
      });
    } else {
      jObj({
        ...type,
        [jValue]: "",
      });
    }
  };

  // STUDY PHASE
  const [studyPhase, setStudyPhase] = useState({
    early: "",
    phase1: "",
    phase2: "",
    phase3: "",
    phase4: "",
  });

  //STUDY TYPE
  const [studyType, setStudyType] = useState({
    interventional: "",
    observational: "",
    expanded_access: "",
  });

  //STUDY RESULTS
  const [studyResults, setStudyResults] = useState({
    with: false,
    without: false,
  });

  // CLEAR/ APPLY BUTTON HANDLERS
  const handleClear = () => {
    setSex("");
    setIsCustom(false);
    setAgeRange({ child: false, adult: false, older_adult: false });
    setCustomAgeRange({ min: null, max: null });
    setAcceptsVolunteers("");
    setStudyPhase({
      early: "",
      phase1: "",
      phase2: "",
      phase3: "",
      phase4: "",
    });
    setStudyType({
      interventional: "",
      observational: "",
      expanded_access: "",
    });
    setLocation({
      city: false,
      zip: false,
    });
    setStudyResults({ with: true, without: true });
    setPlace(null);
  };
  const handleApply = () => {
    setFilter(compileFilters());
  };

  const compileFilters = () => {
    var eligibility = {
      sex: sex,
      age: {
        isCustom: isCustom,
        min: customRange.min,
        max: customRange.max,
        child: ageRange.child,
        adult: ageRange.adult,
        older_adult: ageRange.older_adult,
      },
      volunteers: acceptsVolunteers,
    };
    var phase = {
      early: studyPhase.early,
      phase1: studyPhase.phase1,
      phase2: studyPhase.phase2,
      phase3: studyPhase.phase3,
      phase4: studyPhase.phase4,
    };
    var type = {
      interventional: studyType.interventional,
      observational: studyType.observational,
      expanded_access: studyType.expanded_access,
    };
    var results = {
      with: studyResults.with,
      without: studyResults.without,
    };
    var loc = {
      ...place,
      city: location.city,
      zip: location.zip,
      dist: distance,
    };

    return JSON.stringify({
      eligibility: eligibility,
      phase: phase,
      type: type,
      results: results,
      location: loc,
    });
  };

  return (
    <form id="filters">
      <fieldset
        name="study-phase"
        className="p-3 bg-blue-400/20 rounded-md mb-2">
        <h1 className="mb-2 mt-0 text-base uppercase font-medium leading-tight text-primary">
          Location
        </h1>
        <LocationSearch setPlace={setPlace} place={place} />
        <p className="text-sky-500 font-bold text-xs border-b-2 border-solid border-x-2 border-transparent border-b-sky-600/20">
          Marker Area
        </p>
        <p>
          <input
            type="checkbox"
            name="loc-city"
            id="loc-city"
            value="loc-city"
            onClick={() => {
              setLocation({
                ...location,
                city: !location.city,
              });
            }}
          />{" "}
          <label htmlFor="loc-city">City</label>
        </p>
        <p>
          <input
            type="checkbox"
            name="loc-zip"
            id="loc-zip"
            value="loc-zip"
            onClick={() => {
              setLocation({
                ...location,
                zip: !location.zip,
              });
            }}
          />{" "}
          <label htmlFor="loc-zip">Zip</label>
        </p>
        <p className="text-sky-500 font-bold text-xs border-b-2 border-solid border-x-2 border-transparent border-b-sky-600/20">
          Proximity
        </p>
        <Dropdown
          items={[5, 10, 20, 50, 80, 100]}
          label={"Select max distance (miles)"}
          setStatus={setDis}
          outerStyle="flex items-center rounded-md mb-2 gap-2"
          innerStyle="w-auto bg-slate-200 border border-slate-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
        />
      </fieldset>

      <fieldset
        name="eligibility-criteria"
        className="p-3 bg-blue-400/20 rounded-md mb-2">
        <h1 className="mb-2 mt-0 text-base uppercase font-medium leading-tight text-primary">
          Eligibility Criterion
        </h1>
        <p className="text-sky-500 font-bold text-xs border-b-2 border-solid border-x-2 border-transparent border-b-sky-600/20">
          Sex
        </p>
        <p>
          <input
            type="radio"
            name="sex"
            id="all"
            value="all"
            onClick={() => setSex("")}
          />{" "}
          <label htmlFor="all">All</label>
        </p>
        <p>
          <input
            type="radio"
            name="sex"
            id="male"
            value="male"
            onClick={() => setSex("m")}
          />{" "}
          <label htmlFor="male">Male</label>
        </p>
        <p>
          <input
            type="radio"
            name="sex"
            id="female"
            value="female"
            onClick={() => setSex("f")}
          />{" "}
          <label htmlFor="female">Female</label>
        </p>

        <p className="text-sky-500 font-bold text-xs border-b-2 border-solid border-x-2 border-transparent border-b-sky-600/20">
          Age
        </p>
        <p>
          <input
            type="checkbox"
            name="age"
            id="child"
            value="child"
            onClick={() => setAgeRange({ ...ageRange, child: !ageRange.child })}
          />{" "}
          <label htmlFor="child">Child (birth-17)</label>
        </p>
        <p>
          <input
            type="checkbox"
            name="age"
            id="adult"
            value="adult"
            onClick={() => setAgeRange({ ...ageRange, adult: !ageRange.adult })}
          />{" "}
          <label htmlFor="adult">Adult (18-64)</label>
        </p>
        <p>
          <input
            type="checkbox"
            name="age"
            id="older-adult"
            value="older_adult"
            onClick={() =>
              setAgeRange({ ...ageRange, older_adult: !ageRange.older_adult })
            }
          />{" "}
          <label htmlFor="older-adult">Older Adult (65+)</label>
        </p>
        <p className="text-sky-500 font-bold text-xs border-b-2 border-solid border-x-2 border-transparent border-b-sky-600/20">
          Accepts healthy volunteers
        </p>
        <p>
          <input
            type="checkbox"
            name="volunteers"
            id="healthy-volunteers"
            value="healthy-volunteers"
            onClick={(e: any) => {
              if (e.target.checked) {
                setAcceptsVolunteers("y");
              } else {
                setAcceptsVolunteers("");
              }
            }}
          />{" "}
          <label htmlFor="healthy-volunteers">Yes</label>
        </p>
      </fieldset>

      <fieldset
        name="study-phase"
        className="p-3 bg-blue-400/20 rounded-md mb-2">
        <h1 className="mb-2 mt-0 text-base uppercase font-medium leading-tight text-primary">
          Study Phase
        </h1>
        <p>
          <input
            type="checkbox"
            name="phase"
            id="early-phase-1"
            value="early-phase-1"
            onClick={(e: any) => {
              setValue(e, setStudyPhase, studyPhase, "early", "0");
            }}
          />{" "}
          <label htmlFor="early-phase-1">Early Phase 1</label>
        </p>
        <p>
          <input
            type="checkbox"
            name="phase"
            id="phase-1"
            value="phase-1"
            onClick={(e: any) => {
              setValue(e, setStudyPhase, studyPhase, "phase1", "1");
            }}
          />{" "}
          <label htmlFor="phase-1">Phase 1</label>
        </p>
        <p>
          <input
            type="checkbox"
            name="phase"
            id="phase-2"
            value="phase-2"
            onClick={(e: any) => {
              setValue(e, setStudyPhase, studyPhase, "phase2", "2");
            }}
          />{" "}
          <label htmlFor="phase-2">Phase 2</label>
        </p>
        <p>
          <input
            type="checkbox"
            name="phase"
            id="phase-3"
            value="phase-3"
            onClick={(e: any) => {
              setValue(e, setStudyPhase, studyPhase, "phase3", "3");
            }}
          />{" "}
          <label htmlFor="phase-3">Phase 3</label>
        </p>
        <p>
          <input
            type="checkbox"
            name="phase"
            id="phase-4"
            value="phase-4"
            onClick={(e: any) => {
              setValue(e, setStudyPhase, studyPhase, "phase4", "4");
            }}
          />{" "}
          <label htmlFor="phase-4">Phase 4</label>
        </p>
      </fieldset>

      <fieldset
        name="study-type"
        className="p-3 bg-blue-400/20 rounded-md mb-2">
        <h1 className="mb-2 mt-0 text-base uppercase font-medium leading-tight text-primary">
          Study Type
        </h1>
        <p>
          <input
            type="checkbox"
            name="type"
            id="interventional"
            value="interventional"
            onClick={(e: any) => {
              setValue(e, setStudyType, studyType, "interventional", "int");
            }}
          />{" "}
          <label htmlFor="interventional">Interventional</label>
        </p>

        <p>
          <input
            type="checkbox"
            name="type"
            id="observational"
            value="observational"
            onClick={(e: any) => {
              setValue(e, setStudyType, studyType, "observational", "obs");
            }}
          />{" "}
          <label htmlFor="observational">Observational</label>
        </p>

        <p>
          <input
            type="checkbox"
            name="type"
            id="expanded-access"
            value="expanded_access"
            onClick={(e: any) => {
              setValue(e, setStudyType, studyType, "expanded_access", "exp");
            }}
          />{" "}
          <label htmlFor="expanded-access">Expanded Access</label>
        </p>
      </fieldset>

      <fieldset
        name="study-results"
        className="p-3 bg-blue-400/20 rounded-md mb-2">
        <h1 className="mb-2 mt-0 text-base uppercase font-medium leading-tight text-primary">
          Study Results
        </h1>
        <p>
          <input
            type="checkbox"
            name="results"
            id="with-results"
            value="with_results"
            onClick={() => {
              setStudyResults({ ...studyResults, with: !studyResults.with });
            }}
          />{" "}
          <label htmlFor="with-results">With Results</label>
        </p>
        <p>
          <input
            type="checkbox"
            name="results"
            id="without-results"
            value="without_results"
            onClick={() => {
              setStudyResults({
                ...studyResults,
                without: !studyResults.without,
              });
            }}
          />{" "}
          <label htmlFor="without-results">Without Results</label>
        </p>
      </fieldset>

      <div id="filter-buttons" className="flex justify-end">
        <button
          className="bg-none hover:text-blue-700 text-blue-500 font-bold py-2 px-4 rounded"
          type="reset"
          id="clear-button"
          onClick={handleClear}>
          Clear Filters
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          id="apply-button"
          onClick={handleApply}>
          Apply Filters
        </button>
      </div>
    </form>
  );
}
