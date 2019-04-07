import reduxApi from '../redux/reduxApi.js'

export default class MinMaxFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showFilterContent: false, min: 0.3, max: 15 }
  }
  async handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
    this.props.updateGallery('carat', '0.3-3')
  }
  toggleFilter () {
    this.setState({
      showFilterContent: !this.state.showFilterContent
    })
  }
  render () {
    return (
      <>
        <div className='btn' onClick={this.toggleFilter.bind(this)}>Carat</div>
        { this.state.showFilterContent
          ? <div className='filterContent'>
            <input type='number' min='0.3' max='15' placeholder='Min' name='min' value={this.state.min} onChange={this.handleInputChange.bind(this, event)} />
            <input type='number' min='0.3' max='15' placeholder='Max' name='max' value={this.state.max} onChange={this.handleInputChange.bind(this, event)} />
          </div>
          : null }
        <style jsx>
          {`
          .btn{
            margin-top: inherit;
            font-size: inherit;
            line-height: inherit;
          }
          div.filterContent{
            position: absolute;
            bottom: -160%;
            z-index: 9999;
            width: 100%;
            background: white;
          }
          div.filterContent input{
            border-radius: 3px;
            display: block;
            width: 70%;
            margin: 5px auto;
            text-align: center;
          }
          `}
        </style>
      </>
    )
  }
}
