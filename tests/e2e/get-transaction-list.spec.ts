import { prepareNock, mockCredentials, mockResolveCallback } from '../helpers'
import CoinpaymentsClient from '../../src'

import { CMDS } from '../../src/constants'

describe('Get transaction list e2e test', () => {
  let client
  beforeAll(() => {
    client = new CoinpaymentsClient(mockCredentials)
  })
  it('Should catch valid payload', async done => {
    const VALID_PAYLOAD_MOCK = {
      cmd: CMDS.GET_TX_LIST,
    }
    const scope1 = prepareNock(mockCredentials, VALID_PAYLOAD_MOCK)
    await client.getTxList()
    expect(scope1.isDone()).toBeTruthy()

    const scope2 = prepareNock(mockCredentials, VALID_PAYLOAD_MOCK)
    await client.getTxList(mockResolveCallback(scope2, done))

    const scope3 = prepareNock(mockCredentials, VALID_PAYLOAD_MOCK)
    await client.getTxList({}, mockResolveCallback(scope2, done))
    expect(scope3.isDone()).toBeTruthy()
  })
})