import EStyleSheet from 'react-native-extended-stylesheet';
import {UNIT} from 'components/variables';
import {MAIN_FONT_SIZE} from 'components/common-styles';
export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$background',
  },
  info: {
    position: 'absolute',
    top: '64%',
  },
  logoImage: {
    height: UNIT * 20,
    resizeMode: 'contain',
  },
  retry: {
    textAlign: 'center',
    padding: UNIT,
    fontSize: MAIN_FONT_SIZE + 1,
    color: '$link',
  },
  message: {
    textAlign: 'center',
    color: '$text',
  },
  messageError: {
    color: '$error',
  },
  urlButton: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  urlIcon: {
    width: UNIT * 2,
    height: UNIT * 2,
    marginLeft: UNIT,
    tintColor: '$textSecondary',
  },
  url: {
    textAlign: 'center',
    marginTop: UNIT * 2,
    color: '$icon',
  },
  urlInput: {
    height: UNIT * 5,
    width: 240,
    backgroundColor: '$background',
    borderBottomColor: '$link',
    borderBottomWidth: 1,
  },
  editUrlIcon: {
    marginLeft: UNIT,
  },
});
