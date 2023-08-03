import { CSSProperties } from 'react'

const styles: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  height: 'min-content',
  padding: '50px',
  border: '1px solid #ccc',

}

// @ts-ignore
export const StoriesWrapper = ({ children }) => {
  return <div style={styles}>{children}</div>
}
