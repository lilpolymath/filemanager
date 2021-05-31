import { reducers } from './index';
import * as types from '../store/constants'


describe('file reducer', () => {

  const list = [{
    "id": 1234,
    "name": "test.txt",
    "kind": "file",
    "parentId": null,
    "size": 3,
    "content": "Test content."
  }];

  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual({
      files: {
        file: {
          list: [],
          hasError: null,
          isLoading: false
        }
      },
      filemanager: {
        selectedFile: null
      }
    })
  })

  it('should handle RECIEVE_FILES_ERR', () => {
    expect(
      reducers([], {
        type: types.RECIEVE_FILES_ERR,
        error: 'An error occured.'
      })
    ).toEqual({ filemanager: { selectedFile: null }, files: { file: { hasError: 'An error occured.', isLoading: false, list: [] } } })
  })

  it('should handle RECIEVE_FILES', () => {
    expect(
      reducers({ filemanager: { selectedFile: null }, files: { file: { hasError: 'An error occured.', isLoading: false, list: [] } } }, {
        type: types.RECIEVE_FILES,
        files: list
      })
    ).toEqual({ filemanager: { selectedFile: null }, files: { file: { hasError: null, isLoading: false, list } } })
  })

  it('should handle RECIEVE_FILES_SRART', () => {
    expect(
      reducers({ filemanager: { selectedFile: null }, files: { file: { hasError: null, isLoading: false, list: [] } } }, {
        type: types.RECIEVE_FILES_START,
      })
    ).toEqual({ filemanager: { selectedFile: null }, files: { file: { hasError: null, isLoading: true, list: [] } } })
  })


})