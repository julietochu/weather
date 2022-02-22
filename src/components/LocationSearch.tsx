import React, {FC, useState} from "react";

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({onSearch}) => {
  const [locationSearch, setLocationSearch] = useState('');
  const disableSearch = locationSearch.trim() === '';

  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch('');
  };

  return (
    <div className="row ">
      <div className="col-sm-10  d-flex justify-content-center p-4 ">

      <label className="location text-primary ">
        <input className= "form-control" type="text"placeholder="Add Location " value={locationSearch}
               onChange={e => setLocationSearch(e.target.value)}/>
      </label>
      </div>
      <div className="col-sm-2 d-flex justify-content-center p-4 ">
      <button className="btn btn-primary"
              onClick={addLocation} disabled={disableSearch}>Search
      </button>
    </div>
    </div>
    
  );
}

