import React from 'react';

const Locationsearchpanel = (props)=>{
    const {
  
  activeField,
  setPickup,
  setDestination,
  setPanelopen,
  setvehiclePanel,
  setpickupsuggestions,
  setdestinationsuggestions,
}=props;
//console.log(props);
const sug = Array.isArray(props.suggestions.suggestions) ? props.suggestions.suggestions : [];
const response = Array.isArray(sug) && sug.every(item => typeof item === 'object' && !Array.isArray(item));
//console.log(response); // true if suggestions is an array of plain objects

//console.log(response);

  const handleLocationClick = (location) => {
    if (activeField === 'pickup') {
      setPickup(location.display_name);
      setpickupsuggestions([]);
    } else if (activeField === 'destination') {
      setDestination(location.display_name);
      setdestinationsuggestions([]);
    }

    //setPanelopen(false);
   // setvehiclePanel(true);
  };

  return (
    <div>
      {sug.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">No suggestions</p>
      ) : (
       // console.log(sug),
        sug.map((location, index) => (
          <div
            key={index}
            onClick={() => handleLocationClick(location)}
            className="flex gap-4 border-2 py-3 border-white active:border-black items-center justify-start my-2 cursor-pointer hover:bg-gray-100 px-3 rounded"
          >
            <h2 className="bg-[#eeeeee] w-16 h-7 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location.display_name}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default Locationsearchpanel;
