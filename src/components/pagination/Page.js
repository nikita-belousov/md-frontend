import { Controls, Items } from './'

const Page = ({
  api,
  sort,
  itemsOnPage,
  totalPages,
  currentPage
}, {
  onPageNotFound
}) => {
  if (!_.times(totalPages).includes(currentPage)) {
    onPageNotFound()
    return null
  }

  return (
    <div className={styles['page']}>
      <div className={styles['items-wrapper']}>
        <Items
          api={api}
          query={`_start=${itemsOnPage * currentPage}
                 &_limit=${itemsOnPage}`
            + (sort ? `&_sort=${sort}` : '')}
        />
      </div>
      {(totalPages > 1) &&
        <div className={styles['controls-wrapper']}>
          <Controls
            api={api}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>}
    </div>
  )
}

Page.contextTypes = {
  onPageNotFound: PropTypes.func
}

export default withFetch(Page)
