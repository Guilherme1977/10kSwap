import { Abi, AddTransactionResponse, Contract } from 'starknet'
import { JSBI, Percent, Router, SwapParameters, Trade, TradeType } from '../sdk'
import { BIPS_BASE, DEFAULT_DEADLINE_FROM_NOW, INITIAL_ALLOWED_SLIPPAGE } from '../constants'
import { BN, getRouterContract } from '../utils'
import { computed, ComputedRef, Ref, toRaw } from 'vue'
import { useStarknet } from '../starknet-vue/providers/starknet'
import erc20 from '../constants/abis/erc20.json'
import l0k_router_abi from '../constants/abis/l0k_router_abi.json'
import { isAccountInterface } from '../starknet-vue/utils'
import { bnToUint256, isUint256 as hasUint256, Uint256 } from 'starknet/dist/utils/uint256'
import { useStarknetTransactionManager } from '../starknet-vue/providers/transaction'
import useSwapSummary from './useSwapSummary'
import useSwapApproveAmount from './useSwapApproveAmount'

const isUint256 = (value: any): value is Uint256 => {
  try {
    return hasUint256(value)
  } catch (error) {
    console.log(error, value)
    return false
  }
}

enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

interface SwapCall {
  contract: Contract
  parameters: SwapParameters
}

interface SuccessfulCall {
  call: SwapCall
  gasEstimate: BN
}

interface FailedCall {
  call: SwapCall
  error: Error
}

type EstimatedSwapCall = SuccessfulCall | FailedCall

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param deadline the deadline for the trade
 * @param recipientAddressOrName
 */
function useSwapCallArguments(
  trade: Ref<Trade | null | undefined>, // trade to execute, required
  allowedSlippage: ComputedRef<number> | number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  deadline: number = DEFAULT_DEADLINE_FROM_NOW // in seconds from now
  // recipientAddressOrName: string | null // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): ComputedRef<SwapCall[]> {
  const {
    state: { account, chainId, library },
  } = useStarknet()

  return computed(() => {
    if (!trade.value || !library.value || !account.value || !chainId.value) return []

    const contract: Contract | null = getRouterContract(chainId.value, toRaw(library.value))
    if (!contract) {
      return []
    }

    const swapMethods = []

    swapMethods.push(
      Router.swapCallParameters(trade.value, {
        feeOnTransfer: false,
        allowedSlippage: new Percent(
          JSBI.BigInt(Math.floor(typeof allowedSlippage === 'number' ? allowedSlippage : allowedSlippage.value)),
          BIPS_BASE
        ),
        recipient: account.value,
        ttl: deadline,
      })
    )

    if (trade.value.tradeType === TradeType.EXACT_INPUT) {
      swapMethods.push(
        Router.swapCallParameters(trade.value, {
          feeOnTransfer: true,
          allowedSlippage: new Percent(
            JSBI.BigInt(Math.floor(typeof allowedSlippage === 'number' ? allowedSlippage : allowedSlippage.value)),
            BIPS_BASE
          ),
          recipient: account.value,
          ttl: deadline,
        })
      )
    }

    return swapMethods.map((parameters) => ({ parameters, contract }))
  })
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  trade: Ref<Trade | null | undefined>, // trade to execute, required
  allowedSlippage: ComputedRef<number> | number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  deadline: number = DEFAULT_DEADLINE_FROM_NOW // in seconds from now
  // recipientAddressOrName: string | null // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): ComputedRef<{ state: SwapCallbackState; callback: null | (() => Promise<string>); error: string | null }> {
  const {
    state: { account, chainId, library },
  } = useStarknet()

  const { addTransaction } = useStarknetTransactionManager()
  const swapCalls = useSwapCallArguments(trade, allowedSlippage, deadline)
  const summary = useSwapSummary(trade, allowedSlippage)
  const swapApproveAmount = useSwapApproveAmount(trade, allowedSlippage)

  return computed(() => {
    if (!trade.value || !library.value || !account.value || !chainId.value) {
      return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' }
    }

    const libraryRaw = toRaw(library.value)
    if (!isAccountInterface(libraryRaw)) {
      return { state: SwapCallbackState.INVALID, callback: null, error: 'execute: library not a AccountInterface' }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onSwap(): Promise<string> {
        const {
          contract,
          parameters: { methodName, args },
        } = swapCalls.value[0]

        if (!swapApproveAmount.value) {
          throw new Error('No Approve Amount')
        }
        const approveAmount = bnToUint256(swapApproveAmount.value.raw.toString())

        return libraryRaw
          .execute(
            [
              {
                entrypoint: 'approve',
                contractAddress: trade.value!.inputAmount.currency.address,
                calldata: [contract.address, approveAmount.low, approveAmount.high],
              },
              {
                entrypoint: methodName,
                contractAddress: contract.address,
                calldata: args,
              },
            ],
            [erc20 as Abi, l0k_router_abi as Abi]
          )
          .then((response: AddTransactionResponse) => {
            addTransaction({
              status: response.code,
              transactionHash: response.transaction_hash,
              metadata: {
                message: summary.value,
              },
            })

            return response.transaction_hash
          })
          .catch((error: any) => {
            // otherwise, the error was unexpected and we need to convey that
            console.error(`Swap failed`, error, methodName, args)
            throw new Error(`Swap failed: ${error.message}`)
          })
      },
      error: null,
    }
  })
}

export default useSwapCallback