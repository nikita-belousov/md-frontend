import { Page } from './'

class Pagination extends Component {
  static propTypes = {
    api: PropTypes.string.isRequired,
    pageToShow: PropTypes.number.isRequired,
    itemsComponent: PropTypes.func,
    itemComponent: PropTypes.func,
    itemsOnPage: PropTypes.number,
    sort: PropTypes.string
  }
  static defaultProps = {
    itemsOnPage: 7
  }
  
  static contextTypes = {
    onPageNotFound: PropTypes.func
  }

  this.state = {
    totalItems: null
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_ROOT}/${this.props.api}-quantity`)
      .then(data => data.json())
      .then(json => this.setState({ totalItems: json.quantity }))
  }

  render() {
    const { totalItems } = this.state
    const { itemsOnPage } = this.props

    if (!totalItems) return null
    totalPages = Math.ceil(totalItems / itemsOnPage)

    return
      <Page
        {...this.props}
        totalPages={totalPages}
      />
  }
}

export default Pagination
