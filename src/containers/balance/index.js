import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as walletActions from '../../actions/wallet'
import * as walletSelectors from '../../reducers/wallet'
import { renderIf } from '../../utils/redux'
import Identicon from '../../components/identicon'

import './balance.css'

class Balance extends PureComponent {
  static propTypes = {
    balance: walletSelectors.balanceShape.isRequired,
    fetchBalance: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchBalance } = this.props
    fetchBalance()
  }

  render() {
    const { balance } = this.props

    return (
      <div className="Balance">
        <div className="Balance-message">
          <b>Hello CryptoWorld</b>
        </div>
        <br />
        <br />
        <div className="Balance-message">
          {renderIf(balance, {
            loading: 'Loading balance...',
            done: balance.data && (
              <span>
                Welcome <Identicon seed="Placeholder" />, You have{' '}
                {balance.data.toString()} ETH.
              </span>
            ),
            failedLoading: (
              <span>
                There was an error fetching your balance. Make sure{' '}
                <a
                  className="Home-message-link"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                >
                  MetaMask
                </a>{' '}
                is unlocked and refresh the page.
              </span>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    balance: state.wallet.balance
  }),
  {
    fetchBalance: walletActions.fetchBalance
  }
)(Balance)
