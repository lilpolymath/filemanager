import React from 'react'
import * as reactRedux from 'react-redux';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, getByText } from '../utils/test-utils';

import FileExplorer from './FileExplorer';

describe('FileExplorer Component', () => {
  const dummyDispatch = jest.fn();
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it('should render defaults', () => {
    const { getByText } = render(<FileExplorer />)
    const textElement = getByText(/the root folder is empty/i)
    expect(textElement).toBeInTheDocument();
  });

  it('renders content when available', () => {
    const list = [{
      "id": 1234,
      "name": "test.txt",
      "kind": "file",
      "parentId": null,
      "size": 3,
      "content": "Test content."
    }];
    useSelectorMock.mockReturnValue({
      selectedFile: null,
    })
    useDispatchMock.mockReturnValue(dummyDispatch)

    render(<FileExplorer files={list} />);
    expect(useDispatchMock).toHaveBeenCalled();
    expect(screen.getByText(new RegExp(list[0].name, 'i'))).toBeInTheDocument();

    fireEvent.click(screen.getByText(new RegExp(list[0].name)));
    expect(dummyDispatch).toHaveBeenCalled();
  })
});

