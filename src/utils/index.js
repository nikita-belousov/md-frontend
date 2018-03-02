import React from 'react'

export function recursiveReactMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveReactMap(child.props.children, fn)
      })
    }

    return fn(child)
  })
}

export function formatDate(dateStr) {
  const date = new Date
  return date.toLocaleDateString(
    'ru-RU',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}
