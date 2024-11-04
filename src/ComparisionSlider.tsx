import React, { ReactElement, ReactNode, CSSProperties } from 'react'
import './ComparisionSlider.css'

interface ComparisonSliderProps {
  children: ReactNode
  width?: number | string
  height?: number | string
}

const ComparisonSlider: React.FC<ComparisonSliderProps> & {
  Before: React.FC<{ children: ReactNode }>
  After: React.FC<{ children: ReactNode }>
} = ({ children, height = '100%', width = '100%' }) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    document.body.style.setProperty(
      '--pos',
      Number(event.target.value) + 0.3 + '%',
    )
  }

  const beforeContent = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.type as React.ComponentType).displayName === 'Before',
  ) as ReactElement

  const afterContent = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.type as React.ComponentType).displayName === 'After',
  ) as ReactElement

  const containerStyle: CSSProperties = {
    width,
    height,
    '--slider-thumb-height':
      typeof height === 'number' ? `${height}px` : height,
  } as React.CSSProperties

  return (
    <div
      className="compare"
      style={containerStyle}
    >
      <section className="before">{beforeContent}</section>
      <section className="after">{afterContent}</section>
      <input
        type="range"
        id="range"
        step="0.1"
        onChange={handleSliderChange}
      />
    </div>
  )
}

const Before: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
)
Before.displayName = 'Before'

const After: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
)
After.displayName = 'After'

ComparisonSlider.Before = Before
ComparisonSlider.After = After

export default ComparisonSlider
