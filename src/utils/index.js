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
  const date = new Date(dateStr)
  return date.toLocaleDateString(
    'ru-RU',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}

export function getAbsoluteCoords(elem) {
  const box = elem.getBoundingClientRect()

  return {
    top: Math.round(box.top + window.pageYOffset),
    left: Math.round(box.left + window.pageXOffset)
  }
}
