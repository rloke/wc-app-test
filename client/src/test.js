import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './Navbar';

class InventoryEdit extends Component {
    emptyInventory = {
        prodname: '',
        qty: '',
        price: '',
        status: ''
    };
    constructor(props) {
        super(props);
        this.state = {
          item: this.emptyInventory
        };
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
          const inventory = 
            await (await fetch(`/api/inventory/${this.props.match.params.id}`)).json();
          this.setState({item: inventory});
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('/api/inventory', {
          method: (item._id) ? 'PUT' : 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
        });
        this.props.history.push('/inventories');
      }

      render() {
        const {item} = this.state;
        const title = 
          <h2 className="mt-3">
            {/* if item has an id number, otherwise..*/}
            {item._id ? 'Edit Inventory' : 'Add Inventory'}
          </h2>;
          return (
            <div>
                <AppNavbar />
                <Container fluid>
                    
                </Container>
            </div>
          )
      }
}

export default withRouter(InventoryEdit);