import { Component } from 'react'

import reduxApi, { withDiamonds } from '../redux/reduxApi.js'

import { Link } from '../server/routes.js'
import PageHead from '../components/PageHead'
import MinMaxFilter from '../components/MinMaxFilter'

import Table from 'react-bootstrap/Table'
import MultipleFilter from '../components/MultipleFilter'

class IndexPage extends Component {
  static async getInitialProps ({ store, isServer, pathname, query }) {
    // Get all kittens
    const diamonds = await store.dispatch(reduxApi.actions.diamonds.sync())
    return { diamonds, query }
  }

  constructor (props) {
    super(props)
    this.state = { name: '', query: {} }
  }

  handleChangeInputText (event) {
    this.setState({ name: event.target.value })
  }
  async handleUpdateGallery (prop, val) {
    let query = { ...this.state.query }
    query[prop] = val
    this.setState({ query })
    const removeEmpty = (obj) => {
      Object.keys(obj).forEach((key) => (obj[key] == null || !obj[key].length) && delete obj[key])
    }
    removeEmpty(query)
    this.props.dispatch(reduxApi.actions.diamonds.get(query))
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
          <div className='col-md-3'>
            <div>Shape</div>
          </div>
          <div className='col-md-3'>
            <MinMaxFilter updateGallery={this.handleUpdateGallery.bind(this)} />
          </div>
          <div className='col-md-3'>
            <MultipleFilter updateGallery={this.handleUpdateGallery.bind(this)} field='Color' options={[
              'E', 'F', 'G', 'H', 'D', 'FANCY', 'I', 'S-T', 'Q-R'
            ]} />
          </div>
          <div className='col-md-3'>
            <MultipleFilter updateGallery={this.handleUpdateGallery.bind(this)} field='Clarity' options={[
              'VVS1', 'VVS2', 'SI1', 'VS1', 'I2', 'VS2', 'SI2', 'IF'
            ]} />
          </div>
          <div className='col-md-3'>
            <MultipleFilter updateGallery={this.handleUpdateGallery.bind(this)} field='Cut' options={[
              'EX', 'VG', 'GD'
            ]} />
          </div>
          <div className='col-md-3'>
            <MultipleFilter updateGallery={this.handleUpdateGallery.bind(this)} field='Polish' options={[
              'EX', 'VG', 'GD'
            ]} />
          </div>
          <div className='col-md-3'>
            <MultipleFilter updateGallery={this.handleUpdateGallery.bind(this)} field='Symmetry' options={[
              'EX', 'VG', 'GD'
            ]} />
          </div>
          <div className='col-md-3'>
            <MultipleFilter updateGallery={this.handleUpdateGallery.bind(this)} field='Fluorescent' options={[
              'M', 'N', 'ST', 'F'
            ]} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <span>Number of diamonds:</span> {diamonds.data.length}
          </div>
          <div className='col-md-3'>
            <span>Total price:</span> ${diamonds.data.reduce((total, diamond) => total + diamond['Total Price'], 0).toFixed(3)}
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
            { diamonds.data.map((diamond, index) =>
              <tr key={index}>
                <td>{diamond['Stock NO']}</td>
                <td>{diamond.Shape}</td>
                <td>{diamond.Carat}</td>
                <td>{diamond.Clarity}</td>
                <td>{diamond.Color}</td>
                <td>{diamond.Cut}</td>
                <td>{diamond.Polish}</td>
                <td>{diamond.Symmetry}</td>
                <td>{diamond.Fluorescent}</td>
                <td>{diamond.CULET}</td>
                <td>{diamond.Location}</td>
                <td align='center'><img src={diamond.ImageLink} width='70' /></td>
                <td><a href={diamond.CertificateLink}>Link</a></td>
                <td><a href={diamond.VideoLink}>Link</a></td>
                <td>{diamond.PPC}</td>
                <td>{diamond['Total Price']}</td>
              </tr>
            )


            }
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
