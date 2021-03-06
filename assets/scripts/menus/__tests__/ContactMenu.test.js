/* eslint-env jest */
import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithReduxAndIntl } from '../../../../test/helpers/render'
import ContactMenu from '../ContactMenu'
import { trackEvent } from '../../app/event_tracking'
import { showDialog } from '../../store/slices/dialogs'

jest.mock('../../app/event_tracking', () => ({
  trackEvent: jest.fn()
}))
jest.mock('../../store/slices/dialogs', () => ({
  showDialog: jest.fn(() => ({ type: 'MOCK_ACTION' }))
}))

describe('ContactMenu', () => {
  it('renders', () => {
    const wrapper = renderWithReduxAndIntl(<ContactMenu />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('handles clicked menu items', () => {
    const wrapper = renderWithReduxAndIntl(<ContactMenu />)

    fireEvent.click(wrapper.getByText('Discord', { exact: false }))
    fireEvent.click(wrapper.getByText('GitHub', { exact: false }))
    fireEvent.click(wrapper.getByText('newsletter', { exact: false }))

    expect(trackEvent).toBeCalledTimes(3)
    expect(showDialog).toBeCalledTimes(1)
  })
})
