import { Generic } from 'react-structured-data';

const VincentHardakerSchema = type => <Generic {...{ type }} jsonldtype="Person" schema={{
  givenName: 'Vincent',
  familyName: 'Hardaker',
  email: 'vincenthardaker@gmail.com',
  jobTitle: 'Conductor',
  nationality: 'New Zealand',
}} />;

export default VincentHardakerSchema;
