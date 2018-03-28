import { withFetch } from './../HOCs'

const Items = ({ dataItems, itemComponent }) => (
  <div>
    {dataItems.map(item =>
      <div key={item.id}>
        {React.createElement(itemComponent, { ...item, api })}
      </div>
    )}
  </div>
)

export default withFetch(Items)
