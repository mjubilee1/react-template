import React, { useState, useEffect, useRef } from 'react'
import FocusLock from 'react-focus-lock'
import Icon from './Icon'
import OverlayInterface from '../../interfaces/OverlayInterface'

const Overlay = ({ duration, children, dismiss, omitPadding, maxWidth, ariaLabel, ariaLabelledBy, omitDismissX, open }: OverlayInterface) => {
  const [readyToDisplay, setReadyToDisplay] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setReadyToDisplay(true)
      }, 200)
    } else {
      setTimeout(() => {
        setReadyToDisplay(false)
      }, 200)
    }
  }, [open])

  if (!open) {
    return null
  }
  // if we have aria label by, apply aria labeled by
  // else use the passed in aria label or default aria label
  const ariaLabelProps = {
    role: 'dialog',
    tabIndex: -1,
    'aria-modal': true,
    'aria-labelledby': '',
    'aria-label': ''
  }
  if (ariaLabelledBy) {
    ariaLabelProps['aria-labelledby'] = ariaLabelledBy
  } else {
    ariaLabelProps['aria-label'] = ariaLabel || 'Overlay Dialog'
  }
  const checkKeyPressESC = (e: any) => {
    if (e && e.key === 'Escape') {
      dismiss()
    }
  }
  return (
    // if autoFocus is set to true will set focus on first focusable element in module
    <FocusLock autoFocus={false} returnFocus>
      <div
        ref={containerRef}
        onKeyDown={(e: any) => checkKeyPressESC(e)}
        onClick={() => dismiss()}
        className={`fixed h-full w-full top-0 right-0 m-0 ${readyToDisplay ? 'z-[1000] bg-black bg-opacity-50' : 'bg-transparent z-0'} transition-all duration-100`}
        {...ariaLabelProps}
      >
        <div className="relative w-full h-full">
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            style={{ transition: `all ${duration || '0.5s'} ease` }}
            className={`w-[60vw] right-0 bg-white ${readyToDisplay ? 'right-0' : 'right-[-100%]'} ${
              !omitPadding ? 'py-4 px-8' : ''
            } absolute h-full m-0 overflow-y-auto z-[1001] sm:w-screen min-w-[95vw] md:w-[95vw] md:min-w-[auto] ${maxWidth || ''}`}
          >
            {!omitDismissX && (
              <div className="text-right p-4">
                <button aria-label="Dismiss Dialog" onClick={() => dismiss()}>
                  <Icon name="x" size="medium" className="cursor-pointer inline-block" color="gray" />
                </button>
              </div>
            )}
            <div className="content-container">{children}</div>
          </div>
        </div>
      </div>
    </FocusLock>
  )
}
export default Overlay
