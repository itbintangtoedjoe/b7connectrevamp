import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import GeneralMaterialIcons from '../../general/components/GeneralMaterialIcons';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

const dimensionWidth = Dimensions.get('window').width;
const dimensionHeight = Dimensions.get('window').height;
function TARADocumentCarousel({data}) {
  const navigation = useNavigation();
  const tabHeight = useBottomTabBarHeight();
  const progressValue = useSharedValue(0);
  const [currentPage, setCurrentPage] = React.useState(0);

  const renderItem = ({item}) => {
    function DetailHandler() {
      navigation.navigate('TARAHomeDocumentViewer', {
        uri: item.AccessiblePath,
        title: item.Judul,
      });
    }
    return (
      <Pressable
        onPress={DetailHandler}
        style={({pressed}) => [
          styles.itemContainer,
          Styles.shadow,
          pressed && Styles.pressed,
        ]}>
        <View style={styles.itemHeaderContainer}>
          <GeneralMaterialIcons name="file-pdf-box" size={82} color="white" />
        </View>
        <View style={styles.itemBodyContainer}>
          <View>
            <PoppinsText
              weight="Bold"
              style={styles.itemTitleText}
              numberOfLines={3}>
              {item.Judul}
            </PoppinsText>
            <PoppinsText style={styles.itemDescText} numberOfLines={3}>
              {item.Deskripsi}
            </PoppinsText>
          </View>
          <View>
            <PoppinsText weight="Bold" style={styles.itemCategoryText}>
              {item.Category.NamaKategori}
            </PoppinsText>
            <PoppinsText weight="Medium" style={styles.itemSubCategoryText}>
              {item.Subcategory.NamaSubkategori}
            </PoppinsText>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.carouselContainer, {paddingBottom: tabHeight}]}>
      <Carousel
        style={styles.carouselItemContainer}
        loop={false}
        pagingEnabled={true}
        snapEnabled={true}
        width={dimensionWidth}
        onSnapToItem={index => setCurrentPage(index)}
        data={data}
        renderItem={renderItem}
        scrollAnimationDuration={500}
      />
      <View style={styles.paginationContainer}>
        {data.map((_, index) => {
          return (
            <PaginationItem
              backgroundColor={Colors.primaryColor50}
              animValue={progressValue}
              index={index}
              key={index}
              length={data.length}
              currentPage={currentPage}
            />
          );
        })}
      </View>
    </View>
  );
}

const PaginationItem = props => {
  const {index, backgroundColor, currentPage} = props;
  const width = 12;

  return (
    <View
      style={{
        backgroundColor,
        width: currentPage === index ? width * 2 : width,
        height: width,
        borderRadius: 50,
        opacity: currentPage === index ? 1 : 0.5,
        marginHorizontal: 12,
      }}></View>
  );
};

export default TARADocumentCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    //borderWidth: 1,
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  paginationContainer: {
    //borderWidth: 1,
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  carouselItemContainer: {
    //borderWidth: 1,
    width: dimensionWidth,
    height: '90%',
    alignItems: 'center',
  },
  itemContainer: {
    height: '100%',
    width: dimensionWidth * 0.9,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: Colors.primaryColor50,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  itemHeaderContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor50,
  },
  itemBodyContainer: {
    width: '100%',
    height: '70%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  itemTitleText: {
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 4,
    color: Colors.primaryColor50,
  },
  itemDescText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'justify',
  },
  itemCategoryText: {
    color: Colors.primaryGray,
    fontSize: 16,
    textAlign: 'right',
  },
  itemSubCategoryText: {
    color: Colors.primaryGray,
    //fontSize: 16,
    textAlign: 'right',
  },
});
