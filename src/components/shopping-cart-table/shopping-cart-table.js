import React from 'react';
import { connect } from 'react-redux';
import './shopping-cart-table.css';

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
  debugger

  const renderRow = (item, idx) => {
    const { id, title, price, total } = item;
    debugger
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{price}</td>
        <td>{total}</td>
        <td>
          <button onClick={() => onDelete(idx)}
            className="btn btn-outline-danger btn-sm float-right">
            <i className="fa fa-trash-o" />
          </button>
          <button onClick={() => onIncrease(idx)}
            className="btn btn-outline-success btn-sm float-right">
            <i className="fa fa-plus-circle" />
          </button>
          <button onClick={() => onDecrease(idx)}
            className="btn btn-outline-warning btn-sm float-right">
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    )
  };
  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map(renderRow)}
        </tbody>
      </table>

      <div className="total">
        Total: ${total}
      </div>
    </div>
  );
};

const mapStateToProps = ({ cartItems, orderTotal }) => {
  return {
    items: cartItems,
    total: orderTotal
  }
};

const mapDispatchToProps = () => {
  return {
    onDecrease: (id) => {
      console.log(`Decrease ${id}`)
    },
    onIncrease: (id) => {
      console.log(`Increase ${id}`)
    },
    onDelete: (id) => {
      console.log(`Delete ${id}`)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
