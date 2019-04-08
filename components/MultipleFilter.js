import reduxApi from '../redux/reduxApi.js'

export default class MultipleFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showFilterContent: false, min: 0.3, max: 15, selected: [] }
  }
  toggleFilter () {
    this.setState({
      showFilterContent: !this.state.showFilterContent
    })
  }
  toggleOption (event) {
    let option = event.target.dataset.field
    let selected = [...this.state.selected]
    if (selected.includes(option)) {
      selected = selected.filter(selectedOption => selectedOption !== option)
    } else {
      selected.push(option)
    }
    this.setState({ selected })
    this.props.updateGallery(this.props.field, selected.join(','))
  }
  render () {
    return (
      <>
        <div className='btn' onClick={this.toggleFilter.bind(this)}>{this.props.field}</div>
        { this.state.showFilterContent
          ? (
            <div className='filterContent container-fluid'>
              <div className='row'>
                {this.props.options.map((option, index) =>
                  <div data-field={option} key={option} onClick={this.toggleOption.bind(this)} className={(this.state.selected.includes(option) ? 'active' : '') + ' col-md-4 btn text-center filter-option d-flex justify-content-center align-items-center'}>
                    {option}
                  </div>
                )}
              </div>
            </div>
          )
          : null }
        <style jsx>
          {`
          *{
            transition:0.4s all;
          }
          .btn{
            margin-top: inherit;
            font-size: inherit;
            line-height: inherit;
          }
          div.filterContent{
            position: absolute;
            top: 63px;
            z-index: 9999;
            width: 85%;
            background: white;
          }
          div.filterContent .filter-option{
            margin: 0px auto;
            border:0.5px solid #efefef;
            height:35px;
          }
          .filter-option.active{
            color:white;
            background:#5757ff;
          }
          `}
        </style>
      </>
    )
  }
}
