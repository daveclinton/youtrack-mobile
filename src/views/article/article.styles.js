import {Platform} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import {summaryTitle} from '../../components/common-styles/issue';
import {UNIT} from '../../components/variables/variables';
import {MAIN_FONT_SIZE, mainText} from '../../components/common-styles/typography';
import {elevation1, elevationBottom} from '../../components/common-styles/shadow';

const INPUT_BORDER_RADIUS = UNIT;
const MIN_INPUT_SIZE = UNIT * 4;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$background'
  },
  articleDetails: {
    padding: UNIT * 2,
    paddingTop: UNIT * 3
  },
  articleActivities: {
    padding: UNIT * 2,
    paddingLeft: UNIT
  },
  description: {
    ...mainText
  },
  summaryEdit: {
    ...Platform.select({
      ios: {
        marginTop: 3
      },
      android: {
        marginTop: 1
      }
    })
  },
  summaryText: {
    ...summaryTitle,
    color: '$text'
  },
  subArticles: {
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    marginVertical: UNIT,
    marginTop: UNIT * 2,
    marginRight: -UNIT * 2,
    paddingVertical: UNIT * 2,
    paddingRight: UNIT * 2,
    borderColor: '$textSecondary'
  },
  subArticlesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subArticlesTitle: {
    color: '$icon'
  },
  subArticlesIcon: {
    position: 'relative',
    top: -UNIT
  },
  subArticlesHeader: {
    ...elevation1
  },
  subArticleItem: {
    padding: UNIT * 2,
    paddingLeft: UNIT * 7
  },
  subArticleItemText: {
    ...mainText
  },

  commentContainer: {
    paddingVertical: UNIT,
    paddingHorizontal: UNIT * 2,
    ...elevationBottom
  },
  commentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  commentInputContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: UNIT / 4,
    marginHorizontal: UNIT,
    borderRadius: INPUT_BORDER_RADIUS,
    borderWidth: 1,
    borderColor: '$disabled'
  },
  commentInput: {
    flex: 1,
    minHeight: MIN_INPUT_SIZE,
    padding: 0,
    paddingHorizontal: UNIT,
    backgroundColor: '$background',
    ...mainText,
    color: '$text'
  },
  commentSendButton: {
    width: MIN_INPUT_SIZE,
    height: MIN_INPUT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: INPUT_BORDER_RADIUS - 1,
    backgroundColor: '$link'
  },
  commentSendButtonDisabled: {
    backgroundColor: '$textSecondary',
  },
  commentSendButtonText: {
    fontSize: MAIN_FONT_SIZE,
    color: '$link'
  },
});
