import { SearchBox } from "mapbox/search-js-react";
export function MapSearch() {
  const [value, setValue] = React.useState('');

  const handleChange = (d) => {
    setValue(d);
  };
  return (
    <SearchBox
      options={{
        proximity: {
          lng: -122.431297,
          lat: 37.773972,
        },
      }}
      value={value}
      onChange={handleChange}
      accessToken="pk.eyJ1Ijoic3JhY2hkaSIsImEiOiJjbTZ3ZDBlNDkwaGVsMmtza2tlbWJ1ZTl5In0.MPXsQSgDRg73oG5-oRrggw"
    />
  );
}