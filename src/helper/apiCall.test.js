import React from 'react';
import * as api from './apiCall'

describe('fetchData', () => {
  let mockReturnData;
  let mockURL;

  beforeEach(() => {
    mockReturnData = [{}, {}]
    mockURL = 'http://localhost:3000'
  })
  it('should call fetch with the correct paramaters', () => {
    //setup
    window.fetch = jest.fn()
    //execution
    api.fetchData(mockURL)
    //expectation
    expect(window.fetch).toHaveBeenCalledWith(mockURL)
  })

  it('should return the expected data', async () => {
    //setup
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockReturnData),
      ok: true
    }))
    //execution
    const results = await api.fetchData(mockURL)
    //expectation
    expect(results).toEqual(mockReturnData)
  })

  it('throws an error when the fetch fails', async () => {
    //setup
    const expectedError = Error('Error fetching, code: 500')
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 500,
      ok: false
    }))
    //execution and expectation
    await expect(api.fetchData(mockURL)).rejects.toEqual(expectedError)
  })
})

describe('fetchPost', () => {

  let mockURL;
  let mockReturnData;
  let mockOptions;

  beforeEach(() => {
    mockReturnData = [{}, {}]
    mockURL = 'http://localhost:3000'
    mockOptions = { method: 'post' }
  })
  it('should call fetch with the correct parameters', () => {
    //setup
    window.fetch = jest.fn()
    //execution
    api.fetchPost(mockURL, mockOptions)
    //expectation
    expect(window.fetch).toHaveBeenCalledWith(mockURL, mockOptions)
  })

  it('should return the expected data', async () => {
    //setup
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockReturnData),
      ok: true
    }))
    //execution
    const results = await api.fetchPost(mockURL, mockOptions)
    //expectation
    expect(results).toEqual(mockReturnData)
  })

    it('should throw an error when the fetch fails', async () => {
      //setup
      const expectedError = Error('Error fetching, code: 500')
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500,
        ok: false
      }))
      //exectution and expectation
      await expect(api.fetchPost(mockURL, mockOptions)).rejects.toEqual(expectedError)
    })

})