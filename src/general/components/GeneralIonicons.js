import Ionicons from 'react-native-vector-icons/Ionicons';

function GeneralIonicons({name, size, color}) {
  Ionicons.loadFont().then();
  return (
    <Ionicons
      name={name ? name : 'person-circle'}
      size={size ? size : 24}
      color={color ? color : 'black'}
    />
  );
}

export default GeneralIonicons;
