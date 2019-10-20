import React, { Component } from 'react';
import axios from 'axios';

import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class ShoppingList extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    axios.get('/api/items').then(res => {
      this.setState({
        items: [...res.data],
      });
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.items.length !== prevState.items.length) {
  //     axios.get('/api/items').then(res => {
  //       this.setState({
  //         items: [...res.data],
  //       });
  //     });
  //   }
  // }

  onDeleteClick = e => {
    const id = e.target.id;
    axios.delete('/api/items/' + id, { params: { id: id } }).then(() => this.fetchItems());
  };

  onAddItem = () => {
    const name = prompt('What to add?');
    axios
      .post('/api/items', {
        name: name,
      })
      .then(() => this.fetchItems());
    console.log(name);
  };

  fetchItems = () => {
    axios.get('/api/items').then(res => {
      this.setState({
        items: [...res.data],
      });
    });
  };

  render() {
    const { items } = this.state;
    const itemList = items.map(({ _id, name }) => {
      return (
        <CSSTransition timeout={500} classNames='fade' key={_id}>
          <ListGroupItem>
            <Button id={_id} className='remove-btn' color='danger' size='sm' onClick={this.onDeleteClick}>
              X
            </Button>
            {name}
          </ListGroupItem>
        </CSSTransition>
      );
    });
    return (
      <div>
        <Container>
          <ListGroup>
            <TransitionGroup className='shopping-list'>{itemList}</TransitionGroup>
          </ListGroup>
          <Button className='btn-add' onClick={this.onAddItem}>
            Add
          </Button>
        </Container>
      </div>
    );
  }
}

export default ShoppingList;
