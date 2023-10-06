import { describe, expect } from '@jest/globals';
import { ConnectWidgetViews } from './ConnectViewContextTypes';
import {
  ViewActions,
  viewReducer,
  initialViewState,
  UpdateViewPayload,
  SharedViews,
} from './ViewContext';

describe('view-context', () => {
  it('should update view and history with correct view when reducer called with UPDATE_VIEW action', () => {
    const updateViewPayload: UpdateViewPayload = {
      type: ViewActions.UPDATE_VIEW,
      view: {
        type: ConnectWidgetViews.READY_TO_CONNECT,
      },
    };

    expect(initialViewState).toEqual({
      view: {
        type: SharedViews.LOADING_VIEW,
      },
      history: [],
    });

    const state = viewReducer(initialViewState, { payload: updateViewPayload });
    expect(state).toEqual({
      view: {
        type: ConnectWidgetViews.READY_TO_CONNECT,
      },
      history: [{ type: ConnectWidgetViews.READY_TO_CONNECT }],
    });
  });

  it('should not add view to history if view is the current view when reducer called with UPDATE_VIEW action', () => {
    const state = viewReducer(
      {
        view: {
          type: ConnectWidgetViews.CONNECT_WALLET,
        },
        history: [{ type: ConnectWidgetViews.CONNECT_WALLET }],
      },
      {
        payload: {
          type: ViewActions.UPDATE_VIEW,
          view: {
            type: ConnectWidgetViews.CONNECT_WALLET,
          },
        },
      },
    );

    expect(state).toEqual({
      view: {
        type: ConnectWidgetViews.CONNECT_WALLET,
      },
      history: [
        {
          type: ConnectWidgetViews.CONNECT_WALLET,
        },
      ],
    });
  });

  it('should add view to history if view is not the current view when reducer called with UPDATE_VIEW action', () => {
    const state = viewReducer(
      {
        view: {
          type: ConnectWidgetViews.CONNECT_WALLET,
        },
        history: [{ type: ConnectWidgetViews.CONNECT_WALLET }],
      },
      {
        payload: {
          type: ViewActions.UPDATE_VIEW,
          view: {
            type: ConnectWidgetViews.READY_TO_CONNECT,
          },
        },
      },
    );

    expect(state).toEqual({
      view: {
        type: ConnectWidgetViews.READY_TO_CONNECT,
      },
      history: [
        { type: ConnectWidgetViews.CONNECT_WALLET },
        { type: ConnectWidgetViews.READY_TO_CONNECT },
      ],
    });
  });

  it('should add currentViewData to the existing view before pushing a new view', () => {
    const state = viewReducer(
      {
        view: {
          type: ConnectWidgetViews.CONNECT_WALLET,
        },
        history: [{ type: ConnectWidgetViews.CONNECT_WALLET }],
      },
      {
        payload: {
          type: ViewActions.UPDATE_VIEW,
          view: {
            type: ConnectWidgetViews.READY_TO_CONNECT,
          },
          currentViewData: {
            tokenAddress: '0xsomeTestAddress',
          },
        },
      },
    );

    expect(state).toEqual({
      view: {
        type: ConnectWidgetViews.READY_TO_CONNECT,
      },
      history: [
        { type: ConnectWidgetViews.CONNECT_WALLET, data: { tokenAddress: '0xsomeTestAddress' } },
        { type: ConnectWidgetViews.READY_TO_CONNECT },
      ],
    });
  });

  it('should update view to previous history when reducer called with GO_BACK action', () => {
    const state = viewReducer(
      {
        view: {
          type: ConnectWidgetViews.READY_TO_CONNECT,
        },
        history: [
          { type: ConnectWidgetViews.READY_TO_CONNECT },
          { type: ConnectWidgetViews.CONNECT_WALLET },
          { type: ConnectWidgetViews.SUCCESS },
        ],
      },
      {
        payload: {
          type: ViewActions.GO_BACK,
        },
      },
    );

    expect(state).toEqual({
      view: {
        type: ConnectWidgetViews.CONNECT_WALLET,
      },
      history: [
        { type: ConnectWidgetViews.READY_TO_CONNECT },
        { type: ConnectWidgetViews.CONNECT_WALLET },
      ],
    });
  });

  it('should not change state if reducer called with GO_BACK action and only one item in history', () => {
    const state = viewReducer(
      {
        view: {
          type: ConnectWidgetViews.READY_TO_CONNECT,
        },
        history: [{ type: ConnectWidgetViews.READY_TO_CONNECT }],
      },
      { payload: { type: ViewActions.GO_BACK } },
    );

    expect(state).toEqual({
      view: {
        type: ConnectWidgetViews.READY_TO_CONNECT,
      },
      history: [
        {
          type: ConnectWidgetViews.READY_TO_CONNECT,
        },
      ],
    });
  });
});