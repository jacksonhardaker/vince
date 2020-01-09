import { Generic } from 'react-structured-data';

const LocationSchema = (name) => <Generic type="location" jsonldtype="Place" schema={{
  name
}} />;

export default LocationSchema;
