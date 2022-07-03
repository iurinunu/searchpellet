import { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice'
import styles from './Counter.module.scss'
import { Button, Input } from '@chakra-ui/react'

function Counter() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div className={styles.counterContainer}>
      <div className={styles.row}>
        <Button
        backgroundColor="primary"
        fontWeight="medium"
        color="white"
        _hover={{ bg: 'gray.500' }}
        _active={{
            bg: 'gray.400',
            transform: 'scale(0.95)'
        }}
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <span className={styles.value}>{count}</span>
        <Button
        backgroundColor="primary"
        fontWeight="medium"
        color="white"
        _hover={{ bg: 'gray.500' }}
        _active={{
            bg: 'gray.400',
            transform: 'scale(0.95)'
        }}
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </div>
      <div className={styles.row}>
        <Input
          className={styles.textbox}
          width='64px'
          backgroundColor='gray.200'
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button
            backgroundColor="primary"
            fontWeight="medium"
            color="white"
            _hover={{ bg: 'gray.500' }}
            _active={{
                bg: 'gray.400',
                transform: 'scale(0.95)'
            }}
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </Button>
        <Button
        backgroundColor="primary"
        fontWeight="medium"
        color="white"
        _hover={{ bg: 'gray.500' }}
        _active={{
            bg: 'gray.400',
            transform: 'scale(0.95)'
        }}
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </Button>
        <Button
        backgroundColor="primary"
        fontWeight="medium"
        color="white"
        _hover={{ bg: 'gray.500' }}
        _active={{
            bg: 'gray.400',
            transform: 'scale(0.95)'
        }}
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </Button>
      </div>
    </div>
  )
}

export default Counter