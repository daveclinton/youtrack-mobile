/* @flow */

import React from 'react';

import Router from '../../components/router/router';
import {createBreadCrumbs} from '../../components/articles/articles-tree-helper';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import styles from './article.styles';

import type {Article, Article as ArticleEntity, ArticlesList} from '../../flow/Article';
import type {IssueProject} from '../../flow/CustomFields';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  article: Article,
  articlesList: ArticlesList,
  extraDepth?: number,
  withSeparator?: boolean,
  excludeProject?: boolean,
  styles?: ViewStyleProp
};

const maxBreadcrumbTextLength: number = 24;
const renderSeparator = () => <Text style={styles.breadCrumbsButtonTextSeparator}>/</Text>;

export const ArticleBreadCrumbsItem = (props: { article: Article, onPress: Function, noSeparator?: boolean }) => {
  const breadcrumbText: string = props.article.name || props.article.summary;
  return (
    <View
      style={styles.breadCrumbsItem}
    >
      {!props.noSeparator && renderSeparator()}
      <TouchableOpacity
        style={styles.breadCrumbsButton}
        onPress={props.onPress}
      >
        <Text style={styles.breadCrumbsButtonText}>
          {breadcrumbText.substr(0, maxBreadcrumbTextLength)}
          {breadcrumbText.length > maxBreadcrumbTextLength && '…'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ArticleBreadCrumbs = (props: Props) => {
  const {article, articlesList, extraDepth = 0, withSeparator = true, excludeProject} = props;
  const breadCrumbs: Array<ArticleEntity | IssueProject> = createBreadCrumbs(article, articlesList, excludeProject);

  if (breadCrumbs.length === 0) {
    return null;
  }

  return (
    <View style={[styles.breadCrumbs, props.styles]}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.breadCrumbsContent}
      >
        {excludeProject && <View style={styles.breadCrumbsItem}>{renderSeparator()}</View>}
        {breadCrumbs.map((it: ArticleEntity | IssueProject, index: number) =>
          <ArticleBreadCrumbsItem
            key={it.id}
            noSeparator={index === 0}
            article={it}
            onPress={() => Router.backTo(breadCrumbs.length - index + extraDepth)}
          />
        )}
      </ScrollView>
      {withSeparator && <View style={styles.breadCrumbsSeparator}/>}
    </View>
  );
};

export default React.memo<Props>(ArticleBreadCrumbs);
