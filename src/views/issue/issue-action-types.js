/* @flow */

import {commandDialogActionMap} from '../../components/command-dialog/command-dialog-action-types';
import {createCommandDialogTypeMap} from '../../components/command-dialog/command-dialog-reducer';

export const commandDialogNamespace: string = 'issue';
export const commandDialogTypes: typeof commandDialogActionMap = createCommandDialogTypeMap(commandDialogNamespace);

export const SET_ISSUE_ID = 'issue.SET_ISSUE_ID';
export const RECEIVE_ISSUE = 'issue.RECEIVE_ISSUE';
export const RECEIVE_ISSUE_VISIBILITY = 'issue.RECEIVE_ISSUE_VISIBILITY';
export const RECEIVE_ISSUE_LINKS = 'issue.RECEIVE_ISSUE_LINKS';
export const RECEIVE_ISSUE_ERROR = 'issue.RECEIVE_ISSUE_ERROR';
export const RECEIVE_COMMENTS_ERROR = 'issue.RECEIVE_COMMENTS_ERROR';
export const START_ISSUE_REFRESHING = 'issue.START_ISSUE_REFRESHING';
export const STOP_ISSUE_REFRESHING = 'issue.STOP_ISSUE_REFRESHING';
export const RESET_SINGLE_ISSUE = 'issue.RESET_SINGLE_ISSUE';

export const UNLOAD_ACTIVE_ISSUE_VIEW = 'issue.UNLOAD_ACTIVE_ISSUE_VIEW';

export const DELETE_COMMENT = 'issue.DELETE_COMMENT';

export const OPEN_ISSUE_SELECT = 'issue.OPEN_ISSUE_SELECT';
export const CLOSE_ISSUE_SELECT = 'issue.CLOSE_ISSUE_SELECT';

export const SET_EDITING_COMMENT = 'issue.SET_EDITING_COMMENT';
export const RECEIVE_UPDATED_COMMENT = 'issue.RECEIVE_UPDATED_COMMENT';

export const START_EDITING_ISSUE = 'issue.START_EDITING_ISSUE';
export const STOP_EDITING_ISSUE = 'issue.STOP_EDITING_ISSUE';
export const SET_ISSUE_SUMMARY_AND_DESCRIPTION = 'issue.SET_ISSUE_SUMMARY_AND_DESCRIPTION';
export const SET_ISSUE_SUMMARY_COPY = 'issue.SET_ISSUE_SUMMARY_COPY';
export const SET_ISSUE_DESCRIPTION_COPY = 'issue.SET_ISSUE_DESCRIPTION_COPY';
export const START_SAVING_EDITED_ISSUE = 'issue.START_SAVING_EDITED_ISSUE';
export const STOP_SAVING_EDITED_ISSUE = 'issue.STOP_SAVING_EDITED_ISSUE';
export const ISSUE_UPDATED = 'issue.ISSUE_UPDATED';

export const SET_ISSUE_FIELD_VALUE = 'issue.SET_ISSUE_FIELD_VALUE';
export const SET_PROJECT = 'issue.SET_PROJECT';

export const SET_VOTED = 'issue.SET_VOTED';
export const SET_STARRED = 'issue.SET_STARRED';

export const START_LOADING_COMMENT_SUGGESTIONS = 'issue.START_LOADING_COMMENT_SUGGESTIONS';
export const STOP_LOADING_COMMENT_SUGGESTIONS = 'issue.STOP_LOADING_COMMENT_SUGGESTIONS';
export const RECEIVE_COMMENT_SUGGESTIONS = 'issue.RECEIVE_COMMENT_SUGGESTIONS';

export const RECEIVE_ACTIVITY_PAGE = 'issue.RECEIVE_ACTIVITY_PAGE';
export const RECEIVE_ACTIVITY_ERROR = 'issue.RECEIVE_ACTIVITY_ERROR';
export const RECEIVE_ACTIVITY_API_AVAILABILITY = 'issue.RECEIVE_ACTIVITY_API_AVAILABILITY';
export const RECEIVE_ACTIVITY_CATEGORIES = 'issue.RECEIVE_ACTIVITY_CATEGORIES';

export const RECEIVE_WORK_TIME_SETTINGS = 'issue.RECEIVE_WORK_TIME_SETTINGS';
