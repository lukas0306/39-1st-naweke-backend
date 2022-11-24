const orderStatus = Object.freeze({
  COMPLETED: 1,
  CANCELLED: 2,
});

const orderItemStatus = Object.freeze({
  DELIVERYPREPARE: 1,
  ONDELIVERY: 2,
  DELIVERYCOMPLETED: 3,
});

module.exports = { orderStatus, orderItemStatus };
