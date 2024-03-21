import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function GeneralMaterialIcons({name, size, color}) {
  MaterialIcons.loadFont().then();
  return (
    <MaterialIcons
      name={name ? name : 'person-circle'}
      size={size ? size : 24}
      color={color ? color : 'black'}
    />
  );
}

export default GeneralMaterialIcons;
