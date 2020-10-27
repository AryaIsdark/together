import * as actions from "./actions"
import {ApiOkResponse, ApiErrorResponse} from 'apisauce'
import * as api from 'api/apiFunctions'
import { ActionTypes } from "./types";

jest.mock('api/apiFunctions', () => ({
  getPosts: jest.fn()
}));

describe("store/posts/actions", () => {
  it("can load data", async() => {
    const mockData = [{id:1,title:'testPost'}]
    const getPostsSpy = jest
      .spyOn(api, 'getPosts')
      .mockImplementation(() =>
          Promise.resolve({
            data: mockData,
          } as ApiOkResponse<any>),
        );

    const dispatch = jest.fn();

    await actions.loadData()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(actions.setHasError(false));
    expect(dispatch).toHaveBeenCalledWith(actions.setIsLoading(true));
    expect(dispatch).toHaveBeenCalledWith({type:ActionTypes.SET_DATA, payload: {data: mockData} })
    expect(dispatch).toHaveBeenCalledWith(actions.setIsLoading(false));
    expect(dispatch).toHaveBeenCalledTimes(4);
    
    getPostsSpy.mockRestore()

  });

  it("can return error when loading the data fails", async() => {
    const mockData = [{id:1,title:'testPost'}]
    const getPostsSpy = jest
      .spyOn(api, 'getPosts')
      .mockImplementation(() =>
          Promise.reject({
            data: mockData,
          } as ApiErrorResponse<any>),
        );

    const dispatch = jest.fn();

    await actions.loadData()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(actions.setHasError(false));
    expect(dispatch).toHaveBeenCalledWith(actions.setIsLoading(true));
    expect(dispatch).toHaveBeenCalledWith(actions.setHasError(true))
    expect(dispatch).toHaveBeenCalledWith(actions.setIsLoading(false));
    expect(dispatch).toHaveBeenCalledTimes(4);
    
    getPostsSpy.mockRestore()

  });

  it('can set isLoading', ()=>{
    expect(actions.setIsLoading(true))
      .toMatchObject({type: ActionTypes.SET_LOADING, payload: {isLoading: true}})
    expect(actions.setIsLoading(false))
    .toMatchObject({type: ActionTypes.SET_LOADING, payload: {isLoading: false}})
  })
  
  it('can set hasError', ()=>{
    expect(actions.setHasError(true))
      .toMatchObject({type: ActionTypes.SET_HAS_ERROR, payload: {hasError: true}})
    expect(actions.setHasError(false))
    .toMatchObject({type: ActionTypes.SET_HAS_ERROR, payload: {hasError: false}})
  })
});
