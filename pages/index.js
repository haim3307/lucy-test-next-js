import { Component } from 'react'

import reduxApi, { withDiamonds } from '../redux/reduxApi.js'

import { Link } from '../server/routes.js'
import PageHead from '../components/PageHead'
import MinMaxFilter from '../components/MinMaxFilter'

import Table from 'react-bootstrap/Table'

class IndexPage extends Component {
  static async getInitialProps ({ store, isServer, pathname, query }) {
    // Get all kittens
    const diamonds = await store.dispatch(reduxApi.actions.diamonds.sync())
    console.log(diamonds)
    return { diamonds, query }
  }

  constructor (props) {
    super(props)
    this.state = { name: '' }
  }

  handleChangeInputText (event) {
    this.setState({ name: event.target.value })
  }

  handleAdd (event) {
    const { name } = this.state
    if (!name) return
    const callbackWhenDone = () => this.setState({ name: '', inProgress: false })
    this.setState({ inProgress: true })
    // Actual data request
    const newKitten = { name }
    this.props.dispatch(reduxApi.actions.kittens.post({}, { body: JSON.stringify(newKitten) }, callbackWhenDone))
  }

  handleUpdate (kitten, index, kittenId, event) {
    const name = window.prompt('New name?', kitten.name)
    if (!name) return
    const callbackWhenDone = () => this.setState({ inProgress: false })
    this.setState({ inProgress: kittenId })
    // Actual data request
    const newKitten = { id: kittenId, name }
    this.props.dispatch(reduxApi.actions.kittens.put({ id: kittenId }, { body: JSON.stringify(newKitten) }, callbackWhenDone))
  }

  handleDelete (index, kittenId, event) {
    const callbackWhenDone = () => this.setState({ inProgress: false })
    this.setState({ inProgress: kittenId })
    // Actual data request
    this.props.dispatch(reduxApi.actions.kittens.delete({ id: kittenId }, callbackWhenDone))
  }
  async handleUpdateGallery () {
    const diamonds = await this.props.dispatch(reduxApi.actions.diamonds.sync())
    debugger;
  }
  render () {
    const { diamonds } = this.props// dd
    return <main>
      <PageHead
        title='Next.js (React) + Express REST API + MongoDB + Mongoose-Crudify boilerplate'
        description='Demo of nextjs-express-mongoose-crudify-boilerplate'
      />

      <div className='container-fluid'>
        <div className='row filters justify-content-between'>
          <div className='col-md-3'><div>Shape</div></div>
          <div className='col-md-3'>
              <MinMaxFilter updateGallery={this.handleUpdateGallery.bind(this)}>

              </MinMaxFilter>
          </div>
          <div className='col-md-3'><div>Color</div></div>
          <div className='col-md-3'><div>Clarity</div></div>
          <div className='col-md-3'><div>Cut</div></div>
          <div className='col-md-3'><div>Polish</div></div>
          <div className='col-md-3'><div>Symmetry</div></div>
          <div className='col-md-3'><div>Fluorescent</div></div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <span>Number of diamonds:</span> 113
          </div>
          <div className='col-md-3'>
            <span>Total price:</span> $555420.15
          </div>
        </div>
        <Table striped bordered hover className='mt-3'>
          <thead>
            <tr>
              <th>Stock No</th>
              <th>Shape</th>
              <th>Carat</th>
              <th>Clarity</th>
              <th>Color</th>
              <th>Cut</th>
              <th>Polish</th>
              <th>Symmetry</th>
              <th>Fluorescent</th>
              <th>CULET</th>
              <th>Location</th>
              <th>Image</th>
              <th>CertificateLink</th>
              <th>VideoLink</th>
              <th>PPC</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>



      <style jsx>
        {`
          div {
            margin-top: 1em;
          }
        `}
      </style>
    </main>
  };
}

export default withDiamonds(IndexPage)
