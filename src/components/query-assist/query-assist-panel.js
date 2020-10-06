/* @flow */

import {View, TouchableOpacity, TextInput, Text} from 'react-native';
import React, {PureComponent} from 'react';

import EStyleSheet from 'react-native-extended-stylesheet';

import QueryAssistSuggestionsList from './query-assist__suggestions-list';
import {IconBack, IconClose, IconSearch} from '../icon/icon';
import ModalView from '../modal-view/modal-view';
import throttle from 'lodash.throttle';
import {View as AnimatedView} from 'react-native-animatable';
import KeyboardSpacerIOS from '../platform/keyboard-spacer.ios';
import {HIT_SLOP} from '../common-styles/button';

import styles from './query-assist.styles';

import type {TransformedSuggestion, SavedQuery} from '../../flow/Issue';

const SEARCH_THROTTLE = 30;
const SHOW_LIST_ANIMATION_DURATION = 500;

type Props = {
  suggestions: Array<TransformedSuggestion | SavedQuery>,
  currentQuery: string,
  onApplyQuery: (query: string) => any,
  onChange: (query: string, caret: number) => any,
  onClearQuery: () => any,
  disabled: boolean
};

type State = {
  inputValue: string,
  caret: number,
  queryCopy: string,
  suggestionsListTop: number,
  isSuggestionsVisible: boolean
}

export default class QueryAssist extends PureComponent<Props, State> {
  queryAssistContainer: ?Object;
  lastQueryParams: { query: string, caret: number } = {query: '', caret: 0};
  initialState: State = {
    inputValue: '',
    caret: 0,
    queryCopy: '',
    suggestionsListTop: 0,
    isSuggestionsVisible: false
  };
  onSearch = throttle((query: string, caret: number) => {
    if (this.lastQueryParams.query === query || this.lastQueryParams.caret === caret) {
      return;
    }

    this.lastQueryParams = {query, caret};
    this.setState({inputValue: query, caret});
    this.props.onChange(query, caret);

  }, SEARCH_THROTTLE);

  constructor(props: Props) {
    super(props);
    this.state = Object.assign({}, this.initialState);
  }

  resetState = () => this.setState(this.initialState);

  blurInput() {
    this.refs.searchInput.blur();
  }

  cancelSearch() {
    this.blurInput();
    this.setState({inputValue: this.state.queryCopy});
  }

  beginEditing() {
    let {inputValue} = this.state;
    inputValue = inputValue || '';
    this.setState({
      queryCopy: inputValue,
      suggestionsListTop: 0
    });

    this.props.onChange(inputValue, inputValue.length);
  }

  onSubmitEditing() {
    this.blurInput();
    this.resetState();
    this.props.onApplyQuery(this.state.inputValue || '');
  }

  UNSAFE_componentWillReceiveProps(newProps: Props) {
    if (newProps.currentQuery !== this.props.currentQuery) {
      this.setState({inputValue: newProps.currentQuery});
    }
  }

  componentDidMount() {
    this.setState({inputValue: this.props.currentQuery});
  }

  onApplySuggestion = (suggestion: TransformedSuggestion) => {
    const suggestionText = `${suggestion.prefix}${suggestion.option}${suggestion.suffix}`;
    const oldQuery = this.state.inputValue || '';
    const leftPartAndNewQuery = oldQuery.substring(0, suggestion.completionStart) + suggestionText;
    const newQuery = leftPartAndNewQuery + oldQuery.substring(suggestion.completionEnd);
    this.setState({inputValue: newQuery});
    this.props.onChange(newQuery, leftPartAndNewQuery.length);
    this.setSuggestsVisibility(false);
  };

  onApplySavedQuery = (savedQuery?: SavedQuery) => {
    const {inputValue} = this.state;
    // this.setState({inputValue});
    this.blurInput();
    this.props.onApplyQuery(inputValue);
    this.setSuggestsVisibility(false);
  };

  renderClearIcon() {
    return (
      <TouchableOpacity
        onPress={this.resetState}
        hitSlop={HIT_SLOP}
        style={styles.clearIcon}
      >
        <IconClose size={21} color={EStyleSheet.value('$link')}/>
      </TouchableOpacity>
    );
  }

  onClear = () => {
    if (!this.props.disabled) {
      this.resetState();
      this.props.onClearQuery();
      this.setSuggestsVisibility(true);
    }
  }

  setSuggestsVisibility = (isSuggestionsVisible: boolean) => {
    this.setState({isSuggestionsVisible});
  }

  clearSearch = () => {
    !this.props.disabled && this.setSuggestsVisibility(true);
  }

  renderQueryPreview = () => {
    const {inputValue} = this.state;

    return (
      <View style={styles.placeHolder}>
        <View style={styles.inputWrapper}>
          <IconSearch style={styles.searchIcon} size={20} color={styles.searchIcon.color}/>

          <Text
            onPress={this.clearSearch}
            testID="queryAssistPreview"
            style={[
              styles.searchInput,
              styles.searchInputPlaceholder,
              inputValue ? styles.searchInputHasText : null
            ]}
          >
            {inputValue || 'Enter search request'}
          </Text>

          {!!inputValue && (
            <TouchableOpacity
              hitSlop={HIT_SLOP}
              onPress={this.onClear}
              style={styles.clearIcon}
            >
              <IconClose size={18} color={styles.clearIcon.color}/>
            </TouchableOpacity>
          )}

        </View>
      </View>
    );
  };

  _renderInput() {
    const {inputValue} = this.state;

    return (
      <View
        style={[
          styles.inputWrapper,
          this.props.disabled ? styles.inputWrapperDisabled : null
        ]}
        ref={node => this.queryAssistContainer = node}
      >

        <TouchableOpacity
          testID="query-assist-cancel"
          onPress={() => {
            this.cancelSearch();
            this.onSubmitEditing();
          }}
        >
          <IconBack/>
        </TouchableOpacity>

        <TextInput
          ref="searchInput"

          testID="query-assist-input"
          style={styles.searchInput}

          placeholderTextColor={EStyleSheet.value('$resolved')}
          placeholder="Enter search request"

          clearButtonMode="always"
          returnKeyType="search"
          autoFocus={true}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          autoCapitalize="none"

          onFocus={() => this.beginEditing()}

          onSubmitEditing={() => this.onSubmitEditing()}
          onChangeText={text => this.setState({inputValue: text})}
          onSelectionChange={event => this.onSearch(inputValue, event.nativeEvent.selection.start)}

          value={inputValue}
        />

        {!!inputValue && this.renderClearIcon()}
      </View>
    );
  }

  _renderSuggestions() {
    const {suggestions} = this.props;

    return (
      <AnimatedView
        style={styles.suggestContainer}
        animation="fadeIn"
        useNativeDriver
        duration={SHOW_LIST_ANIMATION_DURATION}
      >
        <QueryAssistSuggestionsList
          suggestions={suggestions}
          onApplySuggestion={this.onApplySuggestion}
          onApplySavedQuery={this.onApplySavedQuery}
        />
      </AnimatedView>
    );
  }

  render() {
    if (!this.state.isSuggestionsVisible) {
      return this.renderQueryPreview();
    }

    return (
      <ModalView
        visible={true}
        animationType="fade"
        style={styles.modal}
      >


        {this._renderInput()}
        {this._renderSuggestions()}
        <KeyboardSpacerIOS/>

      </ModalView>
    );
  }
}
