import { useState, useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import styles from './PlacesAutocomplete.module.scss';
import useOnclickOutside from "react-cool-onclickoutside";
import { Input } from "@chakra-ui/react";



export default function PlacesAutocomplete({ setPropertyDetails, isLoaded }: any) {
 const [selected, setSelected] = useState(null);
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY!,
  //   libraries: ["places"],
  // });

  if (!isLoaded) return <div>Loading...</div>;

  
  return (
    <>
      <div className="places-container">
        <PlacesAutocompleteTest setSelected={setPropertyDetails} />
      </div>
    </>
  );
}

const PlacesAutocompleteTest = ({ setSelected }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: 'it',
      },
      // specify that we are looking just for towns/cities etc
      types: ['locality']
    }   
  });

  // const handleSelect2 = async (address: any) => {
  //   setValue(address, false);
  //   clearSuggestions();

  //   const results = await getGeocode({ address });
  //   const { lat, lng } = await getLatLng(results[0]);
  //   setSelected({ lat, lng });
  // };

  const handleSelect =
    ({ description }: any) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        try {
          const { lat, lng } = getLatLng(results[0]);
          setSelected({ lat, lng, description });
          console.log("📍 Coordinates: ", { lat, lng });
        } catch (error) {
          console.log("😱 Error: ", error);
        }
      });
    };

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
		<div ref={ref}>
			{/* <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">Search Place</h1> */}
      <div className={styles.wrapper}>
        <div className={styles.searchInput + ' ' + ((status === "OK" && data.length) ? styles.active : "")}>
          <a href="" target="_blank" hidden></a>
              <Input
                  size='md'
                  backgroundColor='gray.200'
									value={value}
									onChange={(e) => setValue(e.target.value)}
									disabled={!ready}
									placeholder="Search an address"
							/>

          <div className={styles.autocomBox}>
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
          </div>
          {/* <div class="icon"><i class="fas fa-search"></i></div> */}
        </div>
      </div>
		</div>
  );
};
